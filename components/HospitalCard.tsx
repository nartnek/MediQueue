import Link from "next/link";
import { Hospital } from "@/types/hospital";

interface HospitalCardProps {
  hospital: Hospital;
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

export default function HospitalCard({
  hospital,
  userLocation,
}: HospitalCardProps) {
  const mapsUrl =
    `https://www.google.com/maps/dir/?api=1` +
    `&origin=${userLocation.latitude},${userLocation.longitude}` +
    `&destination=${hospital.latitude},${hospital.longitude}`;

  const getWaitLabel = (waitTime: number | null) => {
    if (waitTime === null) {
      return "Wait time unavailable";
    }

    if (waitTime <= 30) {
      return "Short wait";
    }

    if (waitTime <= 60) {
      return "Moderate wait";
    }

    return "Long wait";
  };

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href={`/hospitals/${hospital.id}`}>
            <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600">
              {hospital.name}
            </h3>
          </Link>

          <p className="mt-1 text-sm text-gray-500">
            {hospital.address}
          </p>

          <p className="mt-3 text-sm font-medium text-gray-700">
            📍 {hospital.distance.toFixed(1)} km away
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 px-5 py-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            ER wait
          </p>

          {hospital.waitTime !== null ? (
            <>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {hospital.waitTime}
                <span className="ml-1 text-sm font-medium text-gray-500">
                  min
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {getWaitLabel(hospital.waitTime)}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              Unavailable
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
        <Link
          href={`/hospitals/${hospital.id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View Details
        </Link>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Directions
        </a>
      </div>

      {hospital.lastUpdated && (
        <p className="mt-3 text-xs text-gray-400">
          Updated{" "}
          {new Date(hospital.lastUpdated).toLocaleString()}
        </p>
      )}
    </article>
  );
}