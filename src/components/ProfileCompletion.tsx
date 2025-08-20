import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Settings, User, MapPin, Building } from 'lucide-react';

interface CompletionStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: React.ReactNode;
  route?: string;
}

const ProfileCompletion: React.FC = () => {
  const navigate = useNavigate();

  // Mock completion data - in real app this would come from user profile
  const completionSteps: CompletionStep[] = [
    {
      id: 'account',
      title: 'Account Setup',
      description: 'Basic account information',
      completed: true,
      icon: <User size={20} />
    },
    {
      id: 'business',
      title: 'Business Details',
      description: 'Business name, ABN, and contact info',
      completed: true,
      icon: <Building size={20} />
    },
    {
      id: 'about',
      title: 'About Your Business',
      description: 'Tell us about your business and hiring needs',
      completed: false,
      icon: <Settings size={20} />,
      route: '/employer-about-business'
    },
    {
      id: 'address',
      title: 'Business Address',
      description: 'Location and contact details',
      completed: false,
      icon: <MapPin size={20} />,
      route: '/business-address'
    }
  ];

  const completedCount = completionSteps.filter(step => step.completed).length;
  const totalSteps = completionSteps.length;
  const completionPercentage = Math.round((completedCount / totalSteps) * 100);

  const handleStepClick = (step: CompletionStep) => {
    if (step.route) {
      navigate(step.route);
    }
  };

  const handleContinue = () => {
    const nextIncompleteStep = completionSteps.find(step => !step.completed);
    if (nextIncompleteStep && nextIncompleteStep.route) {
      navigate(nextIncompleteStep.route);
    } else {
      navigate('/whv-dashboard');
    }
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
            
            {/* Header */}
            <div className="px-6 pt-16 pb-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to RegionalMate!</h1>
                <p className="text-gray-600">Let's complete your profile to get started</p>
              </div>

              {/* Progress Circle */}
              <div className="flex justify-center mb-8">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage / 100)}`}
                      className="text-orange-500 transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{completionPercentage}%</div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps List */}
            <div className="flex-1 px-6 pb-6">
              <div className="space-y-4">
                {completionSteps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => handleStepClick(step)}
                    className={`p-4 rounded-lg border ${
                      step.completed 
                        ? 'bg-green-50 border-green-200' 
                        : step.route 
                          ? 'bg-white border-gray-200 hover:border-orange-300 cursor-pointer' 
                          : 'bg-gray-50 border-gray-200'
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 ${
                        step.completed ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle size={24} />
                        ) : (
                          <Circle size={24} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold ${
                          step.completed ? 'text-green-900' : 'text-gray-900'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm ${
                          step.completed ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      <div className={`flex-shrink-0 ${
                        step.completed ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-8 space-y-3">
              <Button 
                onClick={handleContinue}
                className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
              >
                Continue Setup
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate('/whv-dashboard')}
                className="w-full h-12 text-gray-600 hover:text-gray-900"
              >
                Skip to Dashboard
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;