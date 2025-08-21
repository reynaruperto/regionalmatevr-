import React from 'react';
import { ArrowLeft, MessageCircle, Mail, Phone, HelpCircle, BookOpen, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const EmployerHelpSupport: React.FC = () => {
  const navigate = useNavigate();

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our employer support team",
      action: "Start Chat",
      available: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message and we'll respond within 24 hours",
      action: "Send Email",
      available: true
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly for urgent hiring issues",
      action: "Call Now",
      available: false,
      note: "Available Mon-Fri 9AM-5PM AEST"
    }
  ];

  const helpResources = [
    {
      icon: HelpCircle,
      title: "Employer FAQ",
      description: "Find answers to common employer questions"
    },
    {
      icon: BookOpen,
      title: "Employer Guide",
      description: "Step-by-step instructions for finding and hiring workers"
    },
    {
      icon: Video,
      title: "Business Tutorials",
      description: "Watch helpful videos for employers"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-12 h-12 bg-white rounded-xl shadow-sm mr-4"
                  onClick={() => navigate('/employer-dashboard')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <h1 className="text-lg font-semibold text-gray-900">Help & Support</h1>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto">
              
              {/* Welcome Message */}
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">How can we help you?</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our employer support team is here to help you find the best workers for your business. 
                  Choose the option that works best for you.
                </p>
              </div>

              {/* Support Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 px-2">Contact Support</h3>
                <div className="space-y-4">
                  {supportOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <div key={index} className="bg-white rounded-2xl p-4 shadow-sm">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-[#1E293B]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                            <Icon className="w-5 h-5 text-[#1E293B]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{option.title}</h4>
                            <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                            {option.note && (
                              <p className="text-xs text-gray-500 mb-3">{option.note}</p>
                            )}
                            <Button 
                              className={`text-sm ${
                                option.available 
                                  ? 'bg-[#1E293B] hover:bg-[#1E293B]/90 text-white' 
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              } rounded-xl`}
                              disabled={!option.available}
                            >
                              {option.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Help Resources */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 px-2">Help Resources</h3>
                <div className="space-y-4">
                  {helpResources.map((resource, index) => {
                    const Icon = resource.icon;
                    return (
                      <button key={index} className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-[#1E293B]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                            <Icon className="w-5 h-5 text-[#1E293B]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                            <p className="text-gray-600 text-sm">{resource.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerHelpSupport;