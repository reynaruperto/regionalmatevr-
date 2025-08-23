import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const EmployerEmailConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit confirmation code",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Email confirmed!",
      description: "Your account has been verified successfully",
    });
    navigate('/employer/about-business');
  };

  const handleResendCode = async () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      toast({
        title: "Code resent",
        description: "Check your email for a new confirmation code",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-white">
            
            {/* Header with back button and title */}
            <div className="px-6 pt-16 pb-6">
              <div className="flex items-center justify-between mb-8">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-12 h-12 bg-gray-100 rounded-xl shadow-sm"
                  onClick={() => navigate('/employer/onboarding')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <div className="flex-1"></div>
              </div>

              {/* Progress indicator and title */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Confirm Your Email</h1>
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-600">1.5/4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 flex flex-col items-center justify-center">
              {/* Email icon */}
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-8">
                <Mail className="w-12 h-12 text-blue-600" />
              </div>

              {/* Title and description */}
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Check your email
                </h2>
                <p className="text-gray-600 leading-relaxed max-w-sm">
                  We've sent a 6-digit confirmation code to your email address. Enter it below to verify your account.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
                <div>
                  <Label htmlFor="confirmationCode" className="text-base font-medium text-gray-900 mb-2 block">
                    Confirmation Code
                  </Label>
                  <Input
                    id="confirmationCode"
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value.replace(/\D/g, ''))}
                    className="h-14 text-base bg-gray-100 border-0 rounded-xl text-center text-2xl tracking-widest"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
                >
                  Verify Email
                </Button>
              </form>

              {/* Resend code */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm mb-2">
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="text-blue-600 hover:text-blue-700 underline text-sm disabled:opacity-50"
                >
                  {isResending ? 'Sending...' : 'Resend code'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerEmailConfirmation;