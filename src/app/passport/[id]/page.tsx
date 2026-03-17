import { PassportPageClient } from "@/components/PassportPageClient";

export default async function PassportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <PassportPageClient id={id} />
    </main>
  );
}

