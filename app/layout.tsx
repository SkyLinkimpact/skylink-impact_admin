import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./_components/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Admin - Skylink Impact",
  description:
    "Skylink Impact Admin: A Next.js web interface for managing the Skylink Impact system.",
  icons: [
    { rel: "icon", url: "/assets/favicon/favicon.ico" },
    { rel: "icon", sizes: "16x16", url: "/assets/favicon/favicon-16x16.png" },
    { rel: "icon", sizes: "32x32", url: "/assets/favicon/favicon-32x32.png" },
    { rel: "icon", url: "/assets/favicon/android-chrome-192x192.png" },
    { rel: "icon", url: "/assets/favicon/android-chrome-512x512.png" },
    { rel: "icon", url: "/assets/favicon/favicon.ico" },
    { rel: "apple-touch-icon", url: "/assets/favicon/apple-touch-icon.png" },
  ],
  manifest: "/assets/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
