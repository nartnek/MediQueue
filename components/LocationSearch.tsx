"use client";

import { useState } from "react";

interface LocationSearchProps {
  onLocationFound: (
    latitude: number,
    longitude: number
  ) => void;
  isLoading: boolean;
}

export default function LocationSearch({
  onLocationFound,
  isLoading,
}: LocationSearchProps) {
  const [address, setAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressSearch = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!address.trim()) {
      setError("Please enter an address or city.");
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(address)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to find that address."
        );
      }

      onLocationFound(data.latitude, data.longitude);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to find that address."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleUseCurrentLocation = () => {
    setError(null);

    if (!navigator.geolocation) {
      setError(
        "Your browser does not support location services."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationFound(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError(
              "Location permission was denied. Please allow location access or search for an address instead."
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setError(
              "Your location could not be determined. Try searching for an address instead."
            );
            break;

          case error.TIMEOUT:
            setError(
              "The location request timed out. Please try again."
            );
            break;

          default:
            setError(
              "Unable to determine your location. Please search for an address instead."
            );
        }
      }
    );
  };

  const searching = isSearching || isLoading;

  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      <form
        onSubmit={handleAddressSearch}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Enter an address or city in BC"
          disabled={searching}
          className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
        />

        <button
          type="submit"
          disabled={searching}
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-3">
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={searching}
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Use my current location
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 text-left text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}