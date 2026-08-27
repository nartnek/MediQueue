import { Hospital } from "@/types/hospital";

interface HospitalCardProps {
  hospital: Hospital;
}

export default function HospitalCard({
  hospital,
}: HospitalCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {hospital.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {hospital.address}
          </p>

          <p className="mt-3 text-sm font-medium text-gray-700">
            📍 {hospital.distance.toFixed(1)} km away
          </p>
        </div>

        <div className="sm:text-right">
          {hospital.waitTime !== null ? (
            <>
              <p className="text-2xl font-bold text-green-600">
                {hospital.waitTime} min
              </p>

              <p className="text-xs text-gray-500">
                Estimated ER wait
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Wait time unavailable
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-400">
          Updated {hospital.lastUpdated}
        </p>

        <div className="flex gap-2">
          <button className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:flex-none">
            Details
          </button>

          <button className="flex-1 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 sm:flex-none">
            Directions
          </button>
        </div>
      </div>
    </div>
  );
}