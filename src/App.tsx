import { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import MarketResearchSurvey from "./pages/MarketResearchSurvey";

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
      // Navigate to home and include hash so Index scrolls to the embed
      window.location.href = "/#waitlist";
      return;
    }

    // If already on the homepage, scroll to the embedded form and center it
    const el = document.getElementById("waitlist-embed");
    if (el) {
      const rect = el.getBoundingClientRect();
      const elTop = window.scrollY + rect.top;
      const target = Math.max(0, Math.round(elTop - window.innerHeight / 2 + rect.height / 2));
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }
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
            <Route path="/team" element={<Team />} />
            <Route path="/market-research-survey" element={<MarketResearchSurvey />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
