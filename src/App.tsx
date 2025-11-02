import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ListClothes from "./pages/ListClothes";
import Donate from "./pages/Donate";
import Impact from "./pages/Impact";
import NGO from "./pages/NGO";
import BulkProcurement from "./pages/BulkProcurement";
import Leaderboard from "./pages/Leaderboard";
import Trees from "./pages/Trees";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/list" element={<ListClothes />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/ngo" element={<NGO />} />
            <Route path="/bulk-procurement" element={<BulkProcurement />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/trees" element={<Trees />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
