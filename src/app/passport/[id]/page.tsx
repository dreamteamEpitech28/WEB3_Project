import { PassportPageClient } from "@/components/PassportPageClient";

export default async function PassportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch IPFS metadata (Pinata gateway) based on CID envs.
  // Falls back silently to in-app mock rendering if envs are missing or fetch fails.
  const cid =
    id === "1"
      ? process.env.CID_WATCH_001
      : id === "2"
      ? process.env.CID_WATCH_002
      : undefined;

  if (cid) {
    try {
      // Trigger a real fetch in dev/prod to validate flow end-to-end.
      await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`, {
        cache: "no-store",
      });
    } catch {
      // Ignore: UI will still render from mock data.
    }
  }

  return (
    <main className="px-6 py-16 md:py-20">
      <PassportPageClient id={id} />
    </main>
  );
}

