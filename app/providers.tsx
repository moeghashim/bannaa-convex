"use client";

import { ConvexProvider } from "convex/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { convex } from "@/convex";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
      </QueryClientProvider>
    </ConvexProvider>
  );
}
