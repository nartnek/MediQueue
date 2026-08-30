import { Hospital } from "@/types/hospital";
import HospitalCard from "./HospitalCard";

interface HospitalListProps {
  hospitals: Hospital[];
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

export default function HospitalList({
  hospitals,
  userLocation,
}: HospitalListProps) {
  if (hospitals.length === 0) {
    return (
      <section
        aria-live="polite"
        className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm"
      >
        <div
          className="text-4xl"
          aria-hidden="true"
        >
          🏥
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          No hospitals found
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          We could not find any hospitals near your
          selected location. Try searching for another
          address or city in British Columbia.
        </p>
      </section>
    );
  }

  return (
    <section aria-live="polite">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Nearby Hospitals
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Hospitals closest to your selected location
          </p>
        </div>

        <span className="hidden rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 sm:block">
          {hospitals.length}{" "}
          {hospitals.length === 1 ? "hospital" : "hospitals"}
        </span>
      </div>

      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <HospitalCard
            key={hospital.id}
            hospital={hospital}
            userLocation={userLocation}
          />
        ))}
      </div>
    </section>
  );
}