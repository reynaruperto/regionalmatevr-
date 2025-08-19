
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LetsBegin from "./pages/LetsBegin";
import EmployerOnboarding from "./pages/EmployerOnboarding";
import EmployerSignIn from "./pages/EmployerSignIn";
import BusinessOnboarding from "./pages/BusinessOnboarding";
import BusinessAddress from "./pages/BusinessAddress";
import PhotoUpload from "./pages/PhotoUpload";
import Dashboard from "./pages/Dashboard";
import AccountConfirmation from "./pages/AccountConfirmation";
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
          <Route path="/lets-begin" element={<LetsBegin />} />
          <Route path="/employer-onboarding" element={<EmployerOnboarding />} />
          <Route path="/employer-sign-in" element={<EmployerSignIn />} />
          <Route path="/business-onboarding" element={<BusinessOnboarding />} />
          <Route path="/business-address" element={<BusinessAddress />} />
          <Route path="/photo-upload" element={<PhotoUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account-confirmation" element={<AccountConfirmation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
