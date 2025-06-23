import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "./_components/ui/sonner";
import "./globals.css";
import Header from "./Header";
import Providers from "./Providers";
import { SidebarTrigger } from "./_components/ui/sidebar";
import SideBar from "./SideBar";
import { cookies } from "next/headers";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <html lang="en">
      <body
        className={`${inter.variable} flex min-h-screen max-w-screen flex-col antialiased`}
      >
        <Providers defaultOpen={defaultOpen}>
          <ReactQueryDevtools initialIsOpen={false} />
          <SideBar />
          <div className="flex max-w-full flex-grow flex-col">
            <Header />
            <main className="from-primary-foreground flex w-full max-w-full flex-grow bg-gradient-to-b to-white p-9 sm:p-10 md:p-12">
              {children}
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
