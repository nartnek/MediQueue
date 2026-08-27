"use client";

import { useState } from "react";

export default function LocationSearch() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setError("Location permission was denied.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setError("Unable to determine your location.");
        } else {
          setError("Unable to get your location.");
        }
      }
    );
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      <button
        onClick={getCurrentLocation}
        disabled={isLoading}
        className="mb-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Getting location..." : "📍 Use my current location"}
      </button>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a city or address..."
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <button className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-800">
          Search
        </button>
      </div>

      {location && (
        <div className="mt-4 rounded-lg bg-green-50 p-4 text-left text-sm text-green-800">
          <p className="font-medium">Location found</p>
          <p className="mt-1">
            Latitude: {location.latitude.toFixed(6)}
          </p>
          <p>
            Longitude: {location.longitude.toFixed(6)}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-left text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}