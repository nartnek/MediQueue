import { mockHospitals } from "@/lib/mockHospitals";
import HospitalCard from "./HospitalCard";

export default function HospitalList() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-16">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Nearby hospitals
        </h2>

        <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500">
          <option>Distance</option>
          <option>Wait time</option>
        </select>
      </div>

      <div className="space-y-4">
        {mockHospitals.map((hospital) => (
          <HospitalCard
            key={hospital.id}
            hospital={hospital}
          />
        ))}
      </div>
    </section>
  );
}