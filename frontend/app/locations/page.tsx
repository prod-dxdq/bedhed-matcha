import { locations } from "@/data/locations";

export default function Locations() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">Upcoming Pop-Ups</h1>

      <div className="grid gap-4">
        {locations.map((event, i) => (
          <div key={i} className="border rounded-xl p-4 shadow">
            <h2 className="text-2xl font-semibold">{event.venue}</h2>
            <p>{event.address}</p>
            <p className="font-medium">{event.date} — {event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
