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
    setHospitals([]);

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
      setError("Unable to find nearby hospitals. Please try again.");
      setHospitals([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            MediQueue
          </h1>

          <span className="hidden text-sm text-gray-500 sm:block">
            British Columbia
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-16 pt-20 text-center sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            🏥 Emergency care in British Columbia
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Find the nearest ER
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Find nearby emergency departments in BC, compare
            estimated wait times, and get directions to the
            hospital that works best for you.
          </p>

          <LocationSearch
            onLocationFound={findNearbyHospitals}
            isLoading={isLoading}
          />

          {error && (
            <div
              role="alert"
              className="mx-auto mt-5 max-w-xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <p className="mt-5 text-xs text-gray-400">
            Currently serving hospitals in British Columbia
          </p>
        </div>
      </section>

      {/* Loading state */}
      {isLoading && (
        <section className="mx-auto max-w-5xl px-6 pb-12">
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="mt-4 font-medium text-gray-900">
              Finding nearby hospitals...
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Checking hospitals around your location.
            </p>
          </div>
        </section>
      )}

      {/* Empty state */}
      {!isLoading && userLocation && hospitals.length === 0 && !error && (
        <section className="mx-auto max-w-5xl px-6 pb-12">
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="text-3xl">🏥</div>

            <h3 className="mt-3 font-semibold text-gray-900">
              No hospitals found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              We could not find any hospitals for this location.
              Try searching for another BC city or address.
            </p>
          </div>
        </section>
      )}

      {/* Results */}
      {!isLoading && userLocation && hospitals.length > 0 && (
        <div className="mx-auto max-w-5xl px-6 pb-16">
          <HospitalList
            hospitals={hospitals}
            userLocation={userLocation}
          />
        </div>
      )}
    </main>
  );
}