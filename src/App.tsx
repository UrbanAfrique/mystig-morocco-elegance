import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Hotels from "./pages/products/Hotels";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/dashboard/Statistics";
import Events from "./pages/dashboard/Events";
import TransportList from "./pages/dashboard/transport/TransportList";
import CreateTransport from "./pages/dashboard/transport/CreateTransport";
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
          <Route path="/products" element={<Products />} />
          <Route path="/products/hotels" element={<Hotels />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/statistics" element={<Statistics />} />
          <Route path="/dashboard/events" element={<Events />} />
          <Route path="/dashboard/transport" element={<TransportList />} />
          <Route path="/dashboard/transport/create" element={<CreateTransport />} />
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
