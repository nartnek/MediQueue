import { Suspense } from "react";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50">
          <nav className="border-b border-[#0F1A2B] bg-[#0F1A2B]">
            <div className="mx-auto max-w-6xl px-6 py-4">
              <h1 className="text-xl font-bold tracking-tight text-white">
                MediQueue
              </h1>
            </div>
          </nav>

          <section className="mx-auto max-w-5xl px-6 py-16">
            <div
              role="status"
              className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm"
            >
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600" />

              <p className="mt-4 font-medium text-gray-900">
                Loading MediQueue...
              </p>
            </div>
          </section>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}