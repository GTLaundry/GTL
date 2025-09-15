import MachinesList from "@/components/MachinesList";

// For static export, we need to generate static params
export async function generateStaticParams() {
  // This will be populated at build time
  return [];
}

export default function MachinesPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Machines</h1>
      <MachinesList />
    </main>
  );
}
