import { SignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AustraliaIcon from '@/components/AustraliaIcon';

const EmployerSignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="relative">
        {/* iPhone Frame */}
        <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="h-11 bg-white flex items-center justify-center">
              <div className="w-32 h-6 bg-black rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
              <button 
                onClick={() => navigate('/lets-begin')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Employer Sign Up</h1>
              <div className="w-10"></div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-8 overflow-y-auto">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <AustraliaIcon />
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Join as an Employer
                </h2>
                <p className="text-gray-600">
                  Find the perfect working holiday visa makers for your business
                </p>
              </div>

              {/* Clerk SignUp Component */}
              <div className="flex justify-center">
                <SignUp
                  forceRedirectUrl="/employer/dashboard"
                  fallbackRedirectUrl="/employer/onboarding"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-none bg-transparent",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700",
                      formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
                      footerActionLink: "text-orange-500 hover:text-orange-600"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignUp;