"use client";

import Link from "next/link";
import { Hospital } from "@/types/hospital";

interface HospitalCardProps {
  hospital: Hospital;
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

function getWaitTimeLabel(waitTime: number | null) {
  if (waitTime === null) {
    return {
      label: "Unavailable",
      className: "text-gray-500",
    };
  }

  if (waitTime <= 30) {
    return {
      label: "Short wait",
      className: "text-emerald-600",
    };
  }

  if (waitTime <= 60) {
    return {
      label: "Moderate wait",
      className: "text-amber-600",
    };
  }

  return {
    label: "Long wait",
    className: "text-red-600",
  };
}

export default function HospitalCard({
  hospital,
  userLocation,
}: HospitalCardProps) {
  const waitTime = getWaitTimeLabel(hospital.waitTime);

  const destination = encodeURIComponent(
    `${hospital.name}, ${hospital.address}, ${hospital.city}, ${hospital.province}`
  );

  const mapsUrl =
    `https://www.google.com/maps/dir/?api=1` +
    `&origin=${userLocation.latitude},${userLocation.longitude}` +
    `&destination=${destination}`;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Hospital information */}
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900">
            {hospital.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {hospital.address}, {hospital.city}, {hospital.province}
          </p>

          <p className="mt-2 text-sm font-medium text-gray-700">
            {hospital.distance.toFixed(1)} km away
          </p>
        </div>

        {/* Wait time */}
        <div className="shrink-0 sm:text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Estimated wait
          </p>

          {hospital.waitTime !== null ? (
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {hospital.waitTime} min
            </p>
          ) : (
            <p className="mt-1 text-lg font-semibold text-gray-500">
              Unavailable
            </p>
          )}

          <p className={`mt-1 text-sm font-medium ${waitTime.className}`}>
            {waitTime.label}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row">
        <Link
          href={`/hospitals/${hospital.id}?lat=${userLocation.latitude}&lng=${userLocation.longitude}`}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          View details
        </Link>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg bg-[#0F1A2B] px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Get directions
        </a>
      </div>

      {/* Last updated */}
      {hospital.lastUpdated && (
        <p className="mt-3 text-xs text-gray-400">
          Last updated{" "}
          {new Date(hospital.lastUpdated).toLocaleString("en-CA", {
            weekday: "short",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      )}
    </article>
  );
}