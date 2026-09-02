"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Hospital } from "@/types/hospital";
import HospitalList from "@/components/HospitalList";
import LocationSearch from "@/components/LocationSearch";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Live clock
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 30_000);

    return () => clearInterval(id);
  }, []);

  const clockText = now.toLocaleString("en-CA", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });

  /**
   * Fetch hospitals from the API.
   *
   * This function owns all of the state updates associated
   * with loading hospital results.
   */
  const fetchHospitals = async (
    latitude: number,
    longitude: number
  ) => {
    setIsLoading(true);
    setError(null);
    setHospitals([]);

    try {
      const response = await fetch(
        `/api/hospitals?lat=${latitude}&lng=${longitude}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to fetch nearby hospitals."
        );
      }

      setHospitals(data.hospitals);
      setUserLocation({
        latitude,
        longitude,
      });
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to find nearby hospitals. Please try again."
      );

      setHospitals([]);
      setUserLocation(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Called when LocationSearch finds a location.
   *
   * The coordinates are stored in the URL so the search
   * can be restored when the user returns from a hospital
   * details page.
   */
  const findNearbyHospitals = (
    latitude: number,
    longitude: number
  ) => {
    const params = new URLSearchParams();

    params.set("lat", String(latitude));
    params.set("lng", String(longitude));

    router.push(`/?${params.toString()}`);
  };

  /**
   * Restore a previous search from the URL.
   *
   * The async function is created inside the effect so the
   * effect itself does not directly call a state-changing
   * function synchronously.
   */
  useEffect(() => {
    const latParam = searchParams.get("lat");
    const lngParam = searchParams.get("lng");

    if (!latParam || !lngParam) {
      return;
    }

    const latitude = Number(latParam);
    const longitude = Number(lngParam);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return;
    }

    const loadHospitals = async () => {
      setIsLoading(true);
      setError(null);
      setHospitals([]);

      try {
        const response = await fetch(
          `/api/hospitals?lat=${latitude}&lng=${longitude}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to fetch nearby hospitals."
          );
        }

        setHospitals(data.hospitals);

        setUserLocation({
          latitude,
          longitude,
        });
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to find nearby hospitals. Please try again."
        );

        setHospitals([]);
        setUserLocation(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadHospitals();
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-[#0F1A2B] bg-[#0F1A2B]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold tracking-tight text-white">
            MediQueue
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="font-mono tabular-nums">
              {clockText}
            </span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-16 pt-20 text-center sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            Across British Columbia
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Find the nearest ER
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Compare estimated wait times at nearby emergency
            departments and get directions to the hospital
            that works best for you.
          </p>

          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm">
            <LocationSearch
              onLocationFound={findNearbyHospitals}
              isLoading={isLoading}
            />
          </div>

          {error && (
            <div
              role="alert"
              className="mx-auto mt-5 max-w-xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700"
            >
              <p className="font-medium">
                Unable to load hospitals
              </p>

              <p className="mt-1">{error}</p>
            </div>
          )}

          <p className="mt-6 text-xs text-gray-400">
            Estimates update through the day based on demand
            patterns at each hospital.
          </p>
        </div>
      </section>

      {/* Loading */}
      {isLoading && (
        <section className="mx-auto max-w-5xl px-6 pb-12">
          <div
            role="status"
            className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm"
          >
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600" />

            <p className="mt-4 font-medium text-gray-900">
              Finding nearby hospitals...
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Checking hospitals around your selected location.
            </p>
          </div>
        </section>
      )}

      {/* Error retry */}
      {!isLoading && error && (
        <section className="mx-auto max-w-5xl px-6 pb-12">
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div
              className="text-3xl"
              aria-hidden="true"
            >
              ⚠️
            </div>

            <h3 className="mt-3 font-semibold text-gray-900">
              We could not load your results
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
              Please check your location and try searching
              again.
            </p>
          </div>
        </section>
      )}

      {/* Results */}
      {!isLoading && !error && userLocation && (
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