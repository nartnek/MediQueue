import { NextRequest, NextResponse } from "next/server";
import { mockHospitals } from "@/lib/mockHospitals";

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

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const latitude = Number(searchParams.get("lat"));
  const longitude = Number(searchParams.get("lng"));

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json(
      { error: "Valid latitude and longitude are required." },
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
      { error: "Invalid latitude or longitude." },
      { status: 400 }
    );
  }

  const hospitals = mockHospitals
    .map((hospital) => ({
      ...hospital,
      distance: calculateDistance(
        latitude,
        longitude,
        hospital.latitude,
        hospital.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance);

  return NextResponse.json({
    hospitals,
  });
}