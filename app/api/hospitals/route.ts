import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

interface HospitalRow {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  wait_time_minutes: number | null;
  recorded_at: string | null;
}

interface HospitalResult {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  distance: number;
  waitTime: number | null;
  lastUpdated: string | null;
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");

  // Validate required parameters
  if (latParam === null || lngParam === null) {
    return NextResponse.json(
      {
        error: "Latitude and longitude are required.",
      },
      { status: 400 }
    );
  }

  const latitude = Number(latParam);
  const longitude = Number(lngParam);

  // Validate number format
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json(
      {
        error: "Latitude and longitude must be valid numbers.",
      },
      { status: 400 }
    );
  }

  // Validate coordinate ranges
  if (latitude < -90 || latitude > 90) {
    return NextResponse.json(
      {
        error: "Latitude must be between -90 and 90.",
      },
      { status: 400 }
    );
  }

  if (longitude < -180 || longitude > 180) {
    return NextResponse.json(
      {
        error: "Longitude must be between -180 and 180.",
      },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query<HospitalRow>(`
      SELECT
        h.id,
        h.name,
        h.address,
        h.city,
        h.province,
        h.latitude,
        h.longitude,
        w.wait_time_minutes,
        w.recorded_at
      FROM hospitals h

      LEFT JOIN LATERAL (
        SELECT
          wait_time_minutes,
          recorded_at
        FROM er_wait_times
        WHERE hospital_id = h.id
        ORDER BY recorded_at DESC
        LIMIT 1
      ) w ON true

      WHERE h.province = 'BC'
    `);

    const hospitals: HospitalResult[] = result.rows
      .map((hospital: HospitalRow) => ({
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        city: hospital.city,
        province: hospital.province,
        latitude: Number(hospital.latitude),
        longitude: Number(hospital.longitude),

        distance: calculateDistance(
          latitude,
          longitude,
          Number(hospital.latitude),
          Number(hospital.longitude)
        ),

        waitTime:
          hospital.wait_time_minutes !== null
            ? Number(hospital.wait_time_minutes)
            : null,

        lastUpdated: hospital.recorded_at,
      }))
      .sort(
        (a: HospitalResult, b: HospitalResult) =>
          a.distance - b.distance
      );

    return NextResponse.json({
      hospitals,
    });
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      {
        error: "Unable to retrieve hospitals.",
      },
      { status: 500 }
    );
  }
}