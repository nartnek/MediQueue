import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

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

    const hospitalResult = await pool.query(
      `
        SELECT id
        FROM hospitals
        WHERE id = $1
          AND province = 'BC'
        LIMIT 1
      `,
      [id]
    );

    if (hospitalResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Hospital not found." },
        { status: 404 }
      );
    }

    const result = await pool.query(
      `
        SELECT
          wait_time_minutes,
          recorded_at
        FROM er_wait_times
        WHERE hospital_id = $1
        ORDER BY recorded_at DESC
        LIMIT 20
      `,
      [id]
    );

    const waitTimes = result.rows.map((row) => ({
      waitTime: Number(row.wait_time_minutes),
      recordedAt: row.recorded_at,
    }));

    return NextResponse.json({
      hospitalId: id,
      waitTimes,
    });
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve wait-time history." },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
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

    // Check that the hospital exists
    const hospitalResult = await pool.query(
      `
        SELECT id
        FROM hospitals
        WHERE id = $1
          AND province = 'BC'
        LIMIT 1
      `,
      [id]
    );

    if (hospitalResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Hospital not found." },
        { status: 404 }
      );
    }

    // Parse request body
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Request body must be valid JSON." },
        { status: 400 }
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      !("waitTime" in body)
    ) {
      return NextResponse.json(
        { error: "waitTime is required." },
        { status: 400 }
      );
    }

    const waitTime = (body as { waitTime: unknown }).waitTime;

    // Validate wait time
    if (
      typeof waitTime !== "number" ||
      !Number.isInteger(waitTime) ||
      waitTime < 0
    ) {
      return NextResponse.json(
        { error: "waitTime must be a non-negative integer." },
        { status: 400 }
      );
    }

    // Prevent obviously invalid mock values
    if (waitTime > 1440) {
      return NextResponse.json(
        { error: "waitTime cannot exceed 1440 minutes." },
        { status: 400 }
      );
    }

    // Insert new wait-time record
    const result = await pool.query(
      `
        INSERT INTO er_wait_times (
          hospital_id,
          wait_time_minutes
        )
        VALUES ($1, $2)
        RETURNING
          wait_time_minutes,
          recorded_at
      `,
      [id, waitTime]
    );

    const row = result.rows[0];

    return NextResponse.json(
      {
        hospitalId: id,
        waitTime: Number(row.wait_time_minutes),
        recordedAt: row.recorded_at,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      { error: "Unable to update wait time." },
      { status: 500 }
    );
  }
}