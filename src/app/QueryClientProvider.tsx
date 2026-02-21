"use client";

import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getQueryClient } from "@/app/get-query-client";

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
