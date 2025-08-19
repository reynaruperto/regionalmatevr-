import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  const privacyItems = [
    {
      icon: Shield,
      title: "Data Protection",
      description: "We protect your personal information with industry-standard security measures."
    },
    {
      icon: Eye,
      title: "Information We Collect",
      description: "We collect information you provide, usage data, and device information to improve our services."
    },
    {
      icon: Lock,
      title: "How We Use Your Data",
      description: "Your data helps us provide better matching, improve our platform, and ensure security."
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      description: "You can access, update, or delete your personal information at any time through your account settings."
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
                  onClick={() => navigate('/dashboard')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <h1 className="text-lg font-semibold text-gray-900">Privacy</h1>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto">
              
              {/* Privacy Policy Overview */}
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  At Regional Mate, we are committed to protecting your privacy and ensuring 
                  the security of your personal information. This policy explains how we collect, 
                  use, and safeguard your data.
                </p>
                <p className="text-sm text-gray-500">
                  Last updated: January 2025
                </p>
              </div>

              {/* Privacy Items */}
              <div className="space-y-4">
                {privacyItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-[#1E293B]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#1E293B]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Contact Section */}
              <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Questions about Privacy?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you have any questions about our privacy policy or how we handle your data, 
                  please don't hesitate to contact us.
                </p>
                <Button className="bg-[#1E293B] hover:bg-[#1E293B]/90 text-white rounded-xl">
                  Contact Privacy Team
                </Button>
              </div>

              <div className="h-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;