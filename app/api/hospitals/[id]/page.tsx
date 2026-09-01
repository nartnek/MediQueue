"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WaitTimeHistory from "@/components/WaitTimeHistory";

interface Hospital {
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

interface HospitalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function HospitalPage({
  params,
}: HospitalPageProps) {
  const [hospitalId, setHospitalId] = useState<string | null>(
    null
  );

  const [hospital, setHospital] = useState<Hospital | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHospital = async () => {
      try {
        const { id } = await params;

        setHospitalId(id);

        const response = await fetch(
          `/api/hospitals/${id}`
        );

        if (response.status === 404) {
          setError("Hospital not found.");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch hospital.");
        }

        const data = await response.json();

        setHospital(data.hospital);
      } catch (error) {
        console.error(error);
        setError("Unable to load hospital information.");
      } finally {
        setIsLoading(false);
      }
    };

    loadHospital();
  }, [params]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mt-8 h-48 animate-pulse rounded-xl bg-white" />
        </div>
      </main>
    );
  }

  if (error || !hospital || !hospitalId) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to hospitals
          </Link>

          <div className="mt-8 rounded-xl border border-red-200 bg-white p-8 text-center">
            <h1 className="text-xl font-bold text-gray-900">
              {error ?? "Hospital not found."}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              We couldn't retrieve the requested hospital.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const mapsUrl =
    `https://www.google.com/maps/dir/?api=1` +
    `&destination=${hospital.latitude},${hospital.longitude}`;

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900"
          >
            MediQueue
          </Link>

          <span className="text-sm text-gray-500">
            British Columbia
          </span>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to hospitals
        </Link>

        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Emergency Department
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {hospital.name}
              </h1>

              <p className="mt-3 text-gray-600">
                {hospital.address}
              </p>

              <p className="text-gray-600">
                {hospital.city}, {hospital.province}
              </p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get Directions
            </a>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <p className="text-sm font-medium text-gray-500">
              Current estimated wait
            </p>

            {hospital.wait_time_minutes !== null ? (
              <>
                <p className="mt-2 text-5xl font-bold text-gray-900">
                  {hospital.wait_time_minutes}
                  <span className="ml-2 text-xl font-medium text-gray-500">
                    min
                  </span>
                </p>

                {hospital.recorded_at && (
                  <p className="mt-2 text-sm text-gray-400">
                    Updated{" "}
                    {new Date(
                      hospital.recorded_at
                    ).toLocaleString()}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-2 text-lg text-gray-500">
                No wait-time information available
              </p>
            )}
          </div>
        </section>

        <WaitTimeHistory hospitalId={hospitalId} />
      </div>
    </main>
  );
}