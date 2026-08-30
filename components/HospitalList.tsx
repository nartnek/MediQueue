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
  return (
    <section>
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
          {hospitals.length} found
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