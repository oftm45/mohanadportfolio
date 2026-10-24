import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import SmartGreenhouse from "./pages/SmartGreenhouse";
import NotFound from "./pages/NotFound";
import ShapeWaves from "@/components/ui/ShapeWaves";
import MaintenancePage from "@/components/MaintenancePage";

const queryClient = new QueryClient();

/**
 * Maintenance gate: public visitors (published site) see the maintenance page;
 * the Lovable editor preview and localhost keep the full site.
 * Append ?maintenance=1 to force the maintenance page anywhere.
 */
const MAINTENANCE_MODE = true;
const showMaintenance = (() => {
  if (typeof window === "undefined") return false;
  if (new URLSearchParams(window.location.search).has("maintenance")) return true;
  if (!MAINTENANCE_MODE) return false;
  const host = window.location.hostname;
  const isOwnerPreview =
    host.startsWith("id-preview") || host === "localhost" || host === "127.0.0.1";
  return !isOwnerPreview;
})();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="site-shell">
            <div className="site-waves" aria-hidden="true">
              <ShapeWaves
                shapes="mixed"
                cellSize={14}
                speed={0.7}
                flow={0.12}
                scale={1.4}
                fade={0.25}
                glow={0.15}
                interactive
                splashRadius={60}
                splashStrength={0.5}
                intro={false}
              />
            </div>
            <div className="site-content">
          {showMaintenance ? (
            <MaintenancePage />
          ) : (
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/smart-greenhouse" element={<SmartGreenhouse />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          )}
            </div>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
