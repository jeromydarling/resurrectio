// Resurrectio App Root — Reentry/Restorative Justice Platform
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { DemoModeProvider } from "@/contexts/DemoModeContext";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { AppRouter } from "@/components/routing/AppRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DemoModeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DemoBanner />
        <AppRouter />
      </BrowserRouter>
    </TooltipProvider>
    </DemoModeProvider>
  </QueryClientProvider>
);

export default App;
