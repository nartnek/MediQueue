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
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">
          Nearby Hospitals
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {hospitals.length} hospitals found
        </p>
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