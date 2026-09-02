import { NextRequest, NextResponse } from "next/server";
import { getHospitalById } from "@/lib/hospitals";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Hospital ID is required." },
        { status: 400 }
      );
    }

    const hospital = await getHospitalById(id);

    if (!hospital) {
      return NextResponse.json(
        { error: "Hospital not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      hospital: {
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        city: hospital.city,
        province: hospital.province,
        latitude: Number(hospital.latitude),
        longitude: Number(hospital.longitude),
        waitTime:
          hospital.wait_time_minutes !== null
            ? Number(hospital.wait_time_minutes)
            : null,
        lastUpdated: hospital.recorded_at,
      },
    });
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve hospital." },
      { status: 500 }
    );
  }
}