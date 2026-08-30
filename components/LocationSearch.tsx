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

  const searching = isSearching || isLoading;

  const handleAddressSearch = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      setError("Please enter an address or city.");
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(
          trimmedAddress
        )}`
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
              "Location permission was denied. You can search for an address instead."
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

  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      <form
        onSubmit={handleAddressSearch}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <label
            htmlFor="address"
            className="sr-only"
          >
            Address or city
          </label>

          <input
            id="address"
            type="text"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);

              if (error) {
                setError(null);
              }
            }}
            placeholder="Enter an address or city in BC"
            disabled={searching}
            autoComplete="street-address"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={searching}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-xs text-gray-400">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        onClick={handleUseCurrentLocation}
        disabled={searching}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span aria-hidden="true">📍</span>

        {isLoading
          ? "Finding nearby hospitals..."
          : "Use my current location"}
      </button>

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700"
        >
          <p className="font-medium">
            Something went wrong
          </p>

          <p className="mt-1">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}