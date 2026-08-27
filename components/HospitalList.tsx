import HospitalCard from "./HospitalCard";

export default function HospitalList() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-16">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Nearby hospitals
        </h2>

        <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500">
          <option>Distance</option>
          <option>Wait time</option>
        </select>
      </div>

      <div className="space-y-4">
        <HospitalCard
          name="Vancouver General Hospital"
          address="899 W 12th Ave, Vancouver, BC"
          distance={1.8}
          waitTime={32}
          lastUpdated="5 min ago"
        />

        <HospitalCard
          name="St. Paul's Hospital"
          address="1081 Burrard St, Vancouver, BC"
          distance={3.2}
          waitTime={51}
          lastUpdated="8 min ago"
        />

        <HospitalCard
          name="Mount Saint Joseph Hospital"
          address="3080 Prince Edward St, Vancouver, BC"
          distance={4.1}
          waitTime={24}
          lastUpdated="3 min ago"
        />
      </div>
    </section>
  );
}