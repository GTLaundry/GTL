"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchLocations } from "@/lib/api";
import Link from "next/link";

export default function HomePage() {
  const { data, isLoading, error } = useQuery({ queryKey: ["locations"], queryFn: fetchLocations });

  if (isLoading) return <div className="p-6">Loading locations…</div>;
  if (error) return <div className="p-6 text-red-600">Failed to load locations</div>;

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Laundry Locations</h1>
      <ul className="space-y-2">
        {data?.map((loc) => (
          <li key={loc.id} className="border rounded p-4 hover:bg-gray-50">
            <Link href={`/machines/${loc.id}`} className="font-medium">{loc.name}</Link>
            <div className="text-sm text-gray-500">{loc.address}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
