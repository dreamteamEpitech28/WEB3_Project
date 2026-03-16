import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletConnectInvisible } from "@/components/WalletConnectInvisible";

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "Digital Passport - ChronoX",
  description: "Passeport digital pour montre de luxe soulbound.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-black text-white">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <WalletConnectInvisible />
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}

