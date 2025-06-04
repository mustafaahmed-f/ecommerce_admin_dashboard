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
        className={`${inter.variable} max-w-screen flex flex-col min-h-screen antialiased`}
      >
        <Providers defaultOpen={defaultOpen}>
          <ReactQueryDevtools initialIsOpen={false} />
          <SideBar />
          <div className="flex flex-col flex-grow">
            <Header />
            <main className="flex bg-gradient-to-b from-primary-foreground to-white flex-grow overflow-hidden overflow-x-auto pb-2 pt-[124px] max-sm:px-2 sm:pt-0">
              {children}
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
