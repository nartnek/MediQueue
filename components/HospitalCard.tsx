import { Hospital } from "@/types/hospital";

interface HospitalCardProps {
  hospital: Hospital;
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

function getWaitTimeStatus(waitTime: number | null) {
  if (waitTime === null) {
    return "Unavailable";
  }

  if (waitTime <= 30) {
    return "Short wait";
  }

  if (waitTime <= 60) {
    return "Moderate wait";
  }

  return "Long wait";
}

export default function HospitalCard({
  hospital,
  userLocation,
}: HospitalCardProps) {
  const waitStatus = getWaitTimeStatus(hospital.waitTime);

  const directionsUrl =
  `https://www.google.com/maps/dir/?api=1` +
  `&origin=${userLocation.latitude},${userLocation.longitude}` +
  `&destination=${encodeURIComponent(
    `${hospital.address}, ${hospital.city}, ${hospital.province}`
  )}`;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {hospital.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {hospital.address}, {hospital.city}, {hospital.province}
          </p>

          <p className="mt-3 text-sm font-medium text-gray-700">
            📍 {hospital.distance.toFixed(1)} km away
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 px-4 py-3 text-center sm:min-w-32">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            ER wait
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {hospital.waitTime !== null
              ? `${hospital.waitTime} min`
              : "N/A"}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {waitStatus}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-gray-400">
          {hospital.lastUpdated
            ? `Updated ${new Date(
                hospital.lastUpdated
              ).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}`
            : "Wait time unavailable"}
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Directions
        </a>
      </div>
    </article>
  );
}