import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371;

  const latDifference = ((lat2 - lat1) * Math.PI) / 180;
  const lonDifference = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(latDifference / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(lonDifference / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const latitude = Number(searchParams.get("lat"));
  const longitude = Number(searchParams.get("lng"));

  // Validate coordinates
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json(
      {
        error: "Valid latitude and longitude are required.",
      },
      { status: 400 }
    );
  }

  if (
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return NextResponse.json(
      {
        error: "Invalid latitude or longitude.",
      },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(`
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

    const hospitals = result.rows
      .map((hospital) => ({
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        city: hospital.city,
        province: hospital.province,
        latitude: hospital.latitude,
        longitude: hospital.longitude,

        distance: calculateDistance(
          latitude,
          longitude,
          hospital.latitude,
          hospital.longitude
        ),

        waitTime: hospital.wait_time_minutes,
        lastUpdated: hospital.recorded_at,
      }))
      .sort((a, b) => a.distance - b.distance);

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