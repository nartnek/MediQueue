"use client";

import { useState } from "react";
import { Hospital } from "@/types/hospital";
import HospitalList from "@/components/HospitalList";
import LocationSearch from "@/components/LocationSearch";

export default function Home() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const findNearbyHospitals = async (
    latitude: number,
    longitude: number
  ) => {
    setUserLocation({ latitude, longitude });
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/hospitals?lat=${latitude}&lng=${longitude}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch nearby hospitals.");
      }

      const data = await response.json();

      setHospitals(data.hospitals);
    } catch (error) {
      console.error(error);
      setError("Unable to find nearby hospitals.");
      setHospitals([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">
            MediQueue
          </h1>

          <span className="text-sm text-gray-500">
            British Columbia
          </span>
        </div>
      </nav>

      <section className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            🏥 Emergency care in British Columbia
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Find the nearest ER
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Find nearby emergency departments in BC, compare
            estimated wait times, and choose the right hospital
            for you.
          </p>

          <LocationSearch
            onLocationFound={findNearbyHospitals}
            isLoading={isLoading}
          />

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <p className="mt-5 text-xs text-gray-400">
            Currently serving hospitals in British Columbia
          </p>
        </div>
      </section>

      {userLocation && hospitals.length > 0 && (
        <div className="mx-auto max-w-5xl px-6 pb-12">
          <HospitalList
            hospitals={hospitals}
            userLocation={userLocation}
          />
        </div>
      )}
    </main>
  );
}