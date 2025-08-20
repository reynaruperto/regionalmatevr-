
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LetsBegin from "./pages/LetsBegin";
import EmployerOnboarding from "./pages/EmployerOnboarding";
import EmployerSignIn from "./pages/EmployerSignIn";
import ProfileCompletion from "./pages/ProfileCompletion";
import BusinessOnboarding from "./pages/BusinessOnboarding";
import BusinessAddress from "./pages/BusinessAddress";
import PhotoUpload from "./pages/PhotoUpload";
import EmployerDashboard from "./pages/EmployerDashboard";
import WHVDashboard from "./pages/WHVDashboard";
import EditProfile from "./pages/EditProfile";
import WHVEditProfile from "./pages/WHVEditProfile";
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
import EmployerProfile from "./pages/EmployerProfile";
import FullCandidateProfile from "./pages/FullCandidateProfile";
import EmployerJobs from "./pages/EmployerJobs";
import JobDetails from "./pages/JobDetails";
import Matches from "./pages/Matches";
import MutualMatchProfile from "./pages/MutualMatchProfile";
import Messages from "./pages/Messages";
import EmployerEmailConfirmation from "./pages/EmployerEmailConfirmation";
import WHVEmailConfirmation from "./pages/WHVEmailConfirmation";
import EmployerAboutBusiness from "./pages/EmployerAboutBusiness";
import WHVAboutYou from "./pages/WHVAboutYou";
import WHVOnboarding from "./pages/WHVOnboarding";
import WHVProfileSetup from "./pages/WHVProfileSetup";
import WHVCurrentAddress from "./pages/WHVCurrentAddress";
import WHVWorkExperience from "./pages/WHVWorkExperience";
import WHVPhotoUpload from "./pages/WHVPhotoUpload";
import WHVLogin from "./pages/WHVLogin";
import WHVAccountConfirmation from "./pages/WHVAccountConfirmation";
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
          <Route path="/employer-email-confirmation" element={<EmployerEmailConfirmation />} />
          <Route path="/employer-about-business" element={<EmployerAboutBusiness />} />
          <Route path="/profile-completion" element={<ProfileCompletion />} />
          <Route path="/employer-sign-in" element={<EmployerSignIn />} />
          <Route path="/business-onboarding" element={<BusinessOnboarding />} />
          <Route path="/business-address" element={<BusinessAddress />} />
          <Route path="/photo-upload" element={<PhotoUpload />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/whv-dashboard" element={<WHVDashboard />} />
          <Route path="/dashboard" element={<WHVDashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/whv-edit-profile" element={<WHVEditProfile />} />
          <Route path="/profile-preview" element={<ProfileCardPreview />} />
          <Route path="/security" element={<Security />} />
          <Route path="/edit-business-profile" element={<EditBusinessProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/terms-policies" element={<TermsPolicies />} />
          <Route path="/post-jobs" element={<PostJobs />} />
          <Route path="/browse-candidates" element={<BrowseCandidates />} />
          <Route path="/employer-profile/:id" element={<EmployerProfile />} />
          <Route path="/mutual-match-profile/:id" element={<MutualMatchProfile />} />
          <Route path="/employer-jobs/:employerId" element={<EmployerJobs />} />
          <Route path="/job-details/:employerId/:jobId" element={<JobDetails />} />
          <Route path="/candidate-profile/:id" element={<CandidateProfile />} />
          <Route path="/full-candidate-profile/:id" element={<FullCandidateProfile />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/whv-onboarding" element={<WHVOnboarding />} />
          <Route path="/whv-email-confirmation" element={<WHVEmailConfirmation />} />
          <Route path="/whv-about-you" element={<WHVAboutYou />} />
        <Route path="/whv-profile-setup" element={<WHVProfileSetup />} />
        <Route path="/whv-current-address" element={<WHVCurrentAddress />} />
        <Route path="/whv-work-experience" element={<WHVWorkExperience />} />
        <Route path="/whv-photo-upload" element={<WHVPhotoUpload />} />
        <Route path="/whv-login" element={<WHVLogin />} />
        <Route path="/whv-account-confirmation" element={<WHVAccountConfirmation />} />
          <Route path="/account-confirmation" element={<AccountConfirmation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
