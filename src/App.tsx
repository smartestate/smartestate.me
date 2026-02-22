import { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import About from "./pages/About";
import Docs from "./pages/Docs";
import Index from "./pages/Index";
import Downloads from "./pages/Download";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Team from "./pages/Team";

import Footer from "@/components/landing/Footer";
import IPadCursor from "./components/IPadCursor/IPadCursor";
import Navbar from "@/components/landing/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

  // explicit content routes (do not include removed routes like /updates or /changelog)

function App(): JSX.Element {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const handleJoinWaitlistClick = useCallback((): void => {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser && window.location.pathname !== "/") {
      // Navigate to home and indicate we want the waitlist open
      window.location.href = "/?waitlist=1";
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setWaitlistOpen(true), 400);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <IPadCursor />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar onJoinWaitlistClick={handleJoinWaitlistClick} />
          <Routes>
            <Route path="/" element={<Index waitlistOpen={waitlistOpen} onWaitlistOpenChange={setWaitlistOpen} />} />
            <Route path="/download" element={<Downloads />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/product" element={<Product />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
