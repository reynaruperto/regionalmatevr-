
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
import EditProfile from "./pages/EditProfile";
import ProfileCardPreview from "./pages/ProfileCardPreview";
import Security from "./pages/Security";
import EditBusinessProfile from "./pages/EditBusinessProfile";
import Notifications from "./pages/Notifications";
import Privacy from "./pages/Privacy";
import HelpSupport from "./pages/HelpSupport";
import TermsPolicies from "./pages/TermsPolicies";
import PostJobs from "./pages/PostJobs";
import BrowseCandidates from "./pages/BrowseCandidates";
import CandidateProfile from "./pages/CandidateProfile";
import FullCandidateProfile from "./pages/FullCandidateProfile";
import Matches from "./pages/Matches";
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
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/profile-preview" element={<ProfileCardPreview />} />
          <Route path="/security" element={<Security />} />
          <Route path="/edit-business-profile" element={<EditBusinessProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/terms-policies" element={<TermsPolicies />} />
          <Route path="/post-jobs" element={<PostJobs />} />
          <Route path="/browse-candidates" element={<BrowseCandidates />} />
          <Route path="/candidate-profile/:id" element={<CandidateProfile />} />
          <Route path="/full-candidate-profile/:id" element={<FullCandidateProfile />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/account-confirmation" element={<AccountConfirmation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
