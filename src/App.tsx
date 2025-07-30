import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/dashboard/Statistics";
import Hotels from "./pages/dashboard/Hotels";
import Events from "./pages/dashboard/Events";
import Transport from "./pages/dashboard/Transport";
import Packages from "./pages/dashboard/Packages";
import Artisan from "./pages/dashboard/Artisan";
import Food from "./pages/dashboard/Food";
import Tickets from "./pages/dashboard/Tickets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/statistics" element={<Statistics />} />
          <Route path="/dashboard/hotels" element={<Hotels />} />
          <Route path="/dashboard/events" element={<Events />} />
          <Route path="/dashboard/transport" element={<Transport />} />
          <Route path="/dashboard/packages" element={<Packages />} />
          <Route path="/dashboard/artisan" element={<Artisan />} />
          <Route path="/dashboard/food" element={<Food />} />
          <Route path="/dashboard/tickets" element={<Tickets />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
