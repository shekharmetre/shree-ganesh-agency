"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import SpinnerbLoader from "@/components/spinnerLoader";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        {/* Zustand doesn't need a Provider - components use hooks directly */}
        {children}
      </PrimeReactProvider>
    </QueryClientProvider>
  );
};

export default Providers;