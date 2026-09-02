"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Hospital } from "@/types/hospital";
import WaitTimeHistory from "@/components/WaitTimeHistory";

interface HospitalDetail extends Omit<Hospital, "distance"> {
  distance?: number;
}

interface HospitalApiResponse {
  hospital: HospitalDetail;
}

export default function HospitalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [hospital, setHospital] =
    useState<HospitalDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const { id } = await params;

        const response = await fetch(
          `/api/hospitals/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to load hospital."
          );
        }

        setHospital(
          (data as HospitalApiResponse).hospital
        );
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load hospital."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospital();
  }, [params]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <nav className="border-b border-[#0F1A2B] bg-[#0F1A2B]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              MediQueue
            </Link>

          </div>
        </nav>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <div
            role="status"
            className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm"
          >
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600" />

            <p className="mt-4 font-medium text-gray-900">
              Loading hospital...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (error || !hospital) {
    return (
      <main className="min-h-screen bg-gray-50">
        <nav className="border-b border-[#0F1A2B] bg-[#0F1A2B]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              MediQueue
            </Link>

            <span className="text-sm text-slate-300">
              British Columbia
            </span>
          </div>
        </nav>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-8 text-center"
          >
            <div
              className="text-3xl"
              aria-hidden="true"
            >
              ⚠️
            </div>

            <h2 className="mt-3 font-semibold text-gray-900">
              Unable to load hospital
            </h2>

            <p className="mt-2 text-sm text-red-700">
              {error || "Hospital not found."}
            </p>

            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-[#0F1A2B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Back to hospitals
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const destination = encodeURIComponent(
    `${hospital.name}, ${hospital.address}, ${hospital.city}, ${hospital.province}`
  );

  const mapsUrl =
    `https://www.google.com/maps/dir/?api=1` +
    `&destination=${destination}`;

  const waitTime = hospital.waitTime;

  const waitLabel =
    waitTime === null
      ? "Unavailable"
      : waitTime <= 30
        ? "Short wait"
        : waitTime <= 60
          ? "Moderate wait"
          : "Long wait";

  const waitLabelClass =
    waitTime === null
      ? "text-gray-500"
      : waitTime <= 30
        ? "text-emerald-600"
        : waitTime <= 60
          ? "text-amber-600"
          : "text-red-600";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-[#0F1A2B] bg-[#0F1A2B]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white"
          >
            MediQueue
          </Link>

          <div className="text-sm text-slate-300">
            British Columbia
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Back link */}
        <Link
          href="/"
          className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          ← Back to hospitals
        </Link>

        {/* Hospital header */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">
                Emergency Department
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {hospital.name}
              </h1>

              <p className="mt-3 text-gray-600">
                {hospital.address}
              </p>

              <p className="text-gray-600">
                {hospital.city}, {hospital.province}
              </p>
            </div>

            {/* Current wait */}
            <div className="rounded-xl bg-gray-50 px-6 py-5 sm:min-w-48 sm:text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Estimated wait
              </p>

              {waitTime !== null ? (
                <p className="mt-1 text-4xl font-bold text-gray-900">
                  {waitTime}
                  <span className="ml-1 text-lg font-medium text-gray-500">
                    min
                  </span>
                </p>
              ) : (
                <p className="mt-2 text-xl font-semibold text-gray-500">
                  Unavailable
                </p>
              )}

              <p
                className={`mt-1 text-sm font-medium ${waitLabelClass}`}
              >
                {waitLabel}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#0F1A2B] px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Get directions
            </a>

            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Find another hospital
            </Link>
          </div>

          {hospital.lastUpdated && (
            <p className="mt-4 text-xs text-gray-400">
              Last updated{" "}
              {new Date(
                hospital.lastUpdated
              ).toLocaleString("en-CA", {
                weekday: "short",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          )}
        </section>

        {/* Historical wait times */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Wait time history
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Estimated emergency department wait times
              over the past 48 hours.
            </p>
          </div>

          <WaitTimeHistory
            hospitalId={hospital.id}
          />
        </section>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          Wait times shown are estimates for demonstration
          purposes and should not be used for medical
          decisions.
        </p>
      </div>
    </main>
  );
}