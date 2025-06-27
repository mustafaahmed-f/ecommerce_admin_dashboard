"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SidebarProvider } from "./_components/ui/sidebar";
import NextNavigationProvider from "./_context/NextNavigationProvider";

interface ProvidersProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Providers({ children, defaultOpen }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24,
          },
        },
      }),
  );
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <QueryClientProvider client={queryClient}>
        <NextNavigationProvider>{children}</NextNavigationProvider>
      </QueryClientProvider>
    </SidebarProvider>
  );
}

export default Providers;
