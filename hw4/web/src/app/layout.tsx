import type { Metadata } from "next";
// import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messenger clone",
  description: "NextJs Messenger Clone",
  icons: "/messenger.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* <SessionProvider session={null}> */}
          {children}
          <Toaster />
          {/* </SessionProvider> */}
        </Providers>
      </body>
    </html>
  );
}
