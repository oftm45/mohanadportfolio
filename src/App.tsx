import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import SmartGreenhouse from "./pages/SmartGreenhouse";
import NotFound from "./pages/NotFound";
import { MotionGlobalConfig } from "framer-motion";
import ShapeWaves from "@/components/ui/ShapeWaves";

// Plain site: disable all motion animations globally
MotionGlobalConfig.skipAnimations = true;

const queryClient = new QueryClient();

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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/smart-greenhouse" element={<SmartGreenhouse />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
            </div>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
