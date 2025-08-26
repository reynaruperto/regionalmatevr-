import { SignIn } from '@clerk/clerk-react';
import AustraliaIcon from '@/components/AustraliaIcon';

const EmployerSignInPage = () => {
  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4 pt-safe pb-safe">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-8 overflow-y-auto max-h-[calc(100svh-2rem)]">
          {/* Logo */}
          <div className="flex justify-center pt-4">
            <AustraliaIcon />
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to your employer account
            </p>
          </div>

          {/* Clerk SignIn Component */}
          <div className="w-full flex justify-center pb-4">
            <SignIn
              forceRedirectUrl="/employer/dashboard"
              fallbackRedirectUrl="/employer/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-none bg-transparent w-full",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm py-3 px-4",
                  formButtonPrimary: "w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-3 px-4",
                  footerActionLink: "text-orange-500 hover:text-orange-600 text-sm",
                  formFieldInput: "w-full text-sm py-3 px-4",
                  formFieldLabel: "text-sm text-gray-700",
                  identityPreview: "text-sm",
                  formHeaderTitle: "text-lg",
                  formHeaderSubtitle: "text-sm",
                  footer: "text-center text-xs text-gray-500 mt-4"
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignInPage;