"use client";

import { useState } from "react";
import { mockHospitals } from "@/lib/mockHospitals";
import HospitalCard from "./HospitalCard";

type SortOption = "distance" | "waitTime";

export default function HospitalList() {
  const [sortBy, setSortBy] = useState<SortOption>("distance");

  const sortedHospitals = [...mockHospitals].sort((a, b) => {
    if (sortBy === "distance") {
      return a.distance - b.distance;
    }

    if (a.waitTime === null) return 1;
    if (b.waitTime === null) return -1;

    return a.waitTime - b.waitTime;
  });

  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-16">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Nearby hospitals
        </h2>

        <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value as SortOption)
          }
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
        >
          <option value="distance">Distance</option>
          <option value="waitTime">Wait time</option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedHospitals.map((hospital) => (
          <HospitalCard
            key={hospital.id}
            hospital={hospital}
          />
        ))}
      </div>
    </section>
  );
}