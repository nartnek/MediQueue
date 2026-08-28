"use client";

import { useState } from "react";

interface LocationSearchProps {
  onLocationFound: (latitude: number, longitude: number) => void;
  isLoading: boolean;
}

export default function LocationSearch({
  onLocationFound,
  isLoading,
}: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError(
        "Your browser does not support location services."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationError(null);

        onLocationFound(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              "Location access was denied. Please allow location access or search for a BC city or address instead."
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setLocationError(
              "We couldn't determine your location. Please try again or search for a BC city or address."
            );
            break;

          case error.TIMEOUT:
            setLocationError(
              "The location request timed out. Please try again."
            );
            break;

          default:
            setLocationError(
              "Something went wrong while getting your location. Please try again."
            );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  const searchLocation = async () => {
    if (!query.trim()) {
      setSearchError("Please enter a BC city or address.");
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setLocationError(null);

    try {
      const response = await fetch(
        `/api/geocode?q=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to find this location."
        );
      }

      onLocationFound(data.latitude, data.longitude);
    } catch (error) {
      setSearchError(
        error instanceof Error
          ? error.message
          : "Unable to find this location. Please try again."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const isBusy = isLoading || isSearching;

  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      <button
        onClick={getCurrentLocation}
        disabled={isBusy}
        className="mb-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading
          ? "Finding nearby hospitals..."
          : "📍 Use my current location"}
      </button>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSearchError(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchLocation();
            }
          }}
          placeholder="Enter a BC city or address..."
          disabled={isBusy}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
        />

        <button
          onClick={searchLocation}
          disabled={isBusy}
          className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSearching ? "..." : "Search"}
        </button>
      </div>

      {locationError && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700"
        >
          <p className="font-medium">Unable to get your location</p>
          <p className="mt-1">{locationError}</p>
        </div>
      )}

      {searchError && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700"
        >
          {searchError}
        </div>
      )}
    </div>
  );
}