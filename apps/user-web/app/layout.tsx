import { Toaster } from "@lynkeer/ui/components/sonner";
import { Geist, Geist_Mono } from "next/font/google";

import { apiMockingEnv } from "@/lib/utils/environmentValues";
import { Providers } from "@/providers/providers";

import type { Metadata } from "next";
import type React from "react";
import "@lynkeer/ui/globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Lynkeer | User",
};

if (apiMockingEnv === "enabled") {
  import("@/mocks/startClient").then((mod) => mod.startClient());
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
