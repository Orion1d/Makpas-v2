import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect, Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";

// Lazy load routes
const Products = lazy(() => import("./pages/Products"));
const Contact = lazy(() => import("./pages/Contact"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      // Add caching configuration
      cacheTime: 10 * 60 * 1000, // Cache for 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col bg-background">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route
                      path="/products"
                      element={
                        <Suspense fallback={
                          <div className="flex items-center justify-center min-h-screen">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                          </div>
                        }>
                          <Products />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/product/:id"
                      element={
                        <Suspense fallback={
                          <div className="flex items-center justify-center min-h-screen">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                          </div>
                        }>
                          <ProductDetail />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/contact"
                      element={
                        <Suspense fallback={
                          <div className="flex items-center justify-center min-h-screen">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                          </div>
                        }>
                          <Contact />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/about"
                      element={
                        <Suspense fallback={
                          <div className="flex items-center justify-center min-h-screen">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                          </div>
                        }>
                          <About />
                        </Suspense>
                      }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;