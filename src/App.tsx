import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import SmartGreenhouse from "./pages/SmartGreenhouse";
import NotFound from "./pages/NotFound";
import { MaintenancePage } from "@/components/MaintenancePage";

const queryClient = new QueryClient();

// Show the maintenance screen only on the published site;
// the preview (id-preview--*.lovable.app / localhost) stays fully working.
const isMaintenance =
  typeof window !== "undefined" &&
  !window.location.hostname.startsWith("id-preview") &&
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isMaintenance ? (
            <MaintenancePage />
          ) : (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects/smart-greenhouse" element={<SmartGreenhouse />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
