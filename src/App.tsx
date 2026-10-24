import type React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import { lazy, Suspense } from "react";
const SmartGreenhouse = lazy(() => import("./pages/SmartGreenhouse"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
import ShapeWaves from "@/components/ui/ShapeWaves";

const queryClient = new QueryClient();

const RouteErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  return <ErrorBoundary resetKey={pathname}>{children}</ErrorBoundary>;
};



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
          <RouteErrorBoundary>
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/smart-greenhouse" element={<SmartGreenhouse />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          </RouteErrorBoundary>
            </div>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
