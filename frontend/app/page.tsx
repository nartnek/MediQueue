import LocationSearch from "@/components/LocationSearch";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">
            MediQueue
          </h1>

          <button className="text-sm text-gray-600 hover:text-gray-900">
            About
          </button>
        </div>
      </nav>

      <section className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-blue-600">
            Emergency care, simplified
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Find the nearest ER
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Find nearby hospitals, compare estimated emergency room
            wait times, and get directions from your location.
          </p>

          <LocationSearch />
        </div>
      </section>
    </main>
  );
}