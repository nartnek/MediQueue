import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (!address || address.trim().length === 0) {
    return NextResponse.json(
      { error: "Address is required." },
      { status: 400 }
    );
  }

  try {
    const query = `${address.trim()}, British Columbia, Canada`;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ca&q=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "User-Agent": "MediQueue/1.0",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to search for this address." },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Address not found. Try entering a BC city or address." },
        { status: 404 }
      );
    }

    const result = data[0];

    return NextResponse.json({
      latitude: Number(result.lat),
      longitude: Number(result.lon),
      displayName: result.display_name,
    });
  } catch (error) {
    console.error("Geocoding error:", error);

    return NextResponse.json(
      { error: "Unable to search for this address." },
      { status: 500 }
    );
  }
}