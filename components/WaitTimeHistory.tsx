"use client";

import { useEffect, useState } from "react";

interface WaitTimeRecord {
  waitTime: number;
  recordedAt: string;
}

interface WaitTimeHistoryProps {
  hospitalId: string;
}

export default function WaitTimeHistory({
  hospitalId,
}: WaitTimeHistoryProps) {
  const [waitTimes, setWaitTimes] = useState<WaitTimeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWaitTimes = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/hospitals/${hospitalId}/wait-times`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wait-time history.");
        }

        const data = await response.json();

        // API returns newest first, so reverse for chart display
        setWaitTimes([...data.waitTimes].reverse());
      } catch (error) {
        console.error(error);
        setError("Unable to load wait-time history.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWaitTimes();
  }, [hospitalId]);

  if (isLoading) {
    return (
      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Wait-Time History
        </h2>

        <div className="mt-6 h-48 animate-pulse rounded-lg bg-gray-100" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Wait-Time History
        </h2>

        <p className="mt-4 text-sm text-red-600">{error}</p>
      </section>
    );
  }

  if (waitTimes.length === 0) {
    return (
      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Wait-Time History
        </h2>

        <p className="mt-4 text-sm text-gray-500">
          No wait-time history is available yet.
        </p>
      </section>
    );
  }

  const maxWaitTime = Math.max(
    ...waitTimes.map((record) => record.waitTime),
    60
  );

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Wait-Time History
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Recent estimated emergency department wait times
        </p>
      </div>

      <div className="flex h-64 items-end gap-3 overflow-x-auto border-b border-l border-gray-200 px-4 pb-0">
        {waitTimes.map((record, index) => {
          const height = Math.max(
            (record.waitTime / maxWaitTime) * 100,
            5
          );

          const date = new Date(record.recordedAt);

          return (
            <div
              key={`${record.recordedAt}-${index}`}
              className="flex h-full min-w-12 flex-col items-center justify-end"
            >
              <span className="mb-2 text-xs font-medium text-gray-600">
                {record.waitTime}m
              </span>

              <div
                className="w-8 rounded-t-md bg-blue-500 transition-all hover:bg-blue-600"
                style={{
                  height: `${height}%`,
                }}
                title={`${record.waitTime} minutes`}
              />

              <span className="mt-2 whitespace-nowrap text-[10px] text-gray-400">
                {date.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between text-xs text-gray-400">
        <span>
          {waitTimes.length} recorded{" "}
          {waitTimes.length === 1 ? "reading" : "readings"}
        </span>

        <span>Minutes</span>
      </div>
    </section>
  );
}