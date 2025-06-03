import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "./_components/ui/sonner";
import "./globals.css";
import Header from "./Header";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: {
    template: "%s - Dashboard",
    default: "Admin Dashboard",
  },
  description: "Welcome to Admin Dashboard.",
  icons: {
    icon: "/admin.png",
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} max-w-screen flex flex-col min-h-screen antialiased`}
      >
        <Providers>
          <ReactQueryDevtools initialIsOpen={false} />
          <Header />
          <main className="flex bg-gradient-to-b from-primary-foreground to-white flex-grow overflow-hidden overflow-x-auto pb-2 pt-[124px] max-sm:px-2 sm:pt-0">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
