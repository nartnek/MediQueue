export default function LocationSearch() {
  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      <button className="mb-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
        📍 Use my current location
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
    </div>
  );
}