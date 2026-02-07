"use client";

import { getQueryClient } from "@/lib/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="var(--primary)" height={2} showSpinner={false} />
          {children}
          <Toaster />
        </NextThemesProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
