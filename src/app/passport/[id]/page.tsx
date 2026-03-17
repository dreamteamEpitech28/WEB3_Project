import { PassportPageClient } from "@/components/PassportPageClient";

export default function PassportPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <PassportPageClient id={id} />
    </main>
  );
}

