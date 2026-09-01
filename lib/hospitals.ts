import { pool } from "@/lib/db";

export interface HospitalRow {
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

export async function getHospitals(): Promise<HospitalRow[]> {
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

  return result.rows;
}

export async function getHospitalById(
  id: string
): Promise<HospitalRow | null> {
  const result = await pool.query<HospitalRow>(
    `
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

      WHERE h.id = $1
        AND h.province = 'BC'

      LIMIT 1
    `,
    [id]
  );

  return result.rows[0] ?? null;
}