import React from 'react';
import { ArrowLeft, FileText, Scale, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TermsPolicies: React.FC = () => {
  const navigate = useNavigate();

  const documents = [
    {
      icon: FileText,
      title: "Terms of Service",
      description: "Our terms and conditions for using Regional Mate",
      lastUpdated: "January 2025"
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      lastUpdated: "January 2025"
    },
    {
      icon: Scale,
      title: "Community Guidelines",
      description: "Rules and guidelines for respectful interaction on our platform",
      lastUpdated: "December 2024"
    },
    {
      icon: Users,
      title: "Employer Code of Conduct",
      description: "Standards and expectations for employers using Regional Mate",
      lastUpdated: "December 2024"
    }
  ];

  const keyPoints = [
    "By using Regional Mate, you agree to our terms and conditions",
    "We are committed to protecting your privacy and personal data",
    "All users must follow our community guidelines",
    "Employers must provide fair working conditions and accurate job descriptions",
    "We reserve the right to suspend accounts that violate our policies"
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
                <h1 className="text-lg font-semibold text-gray-900">Terms and Policies</h1>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto">
              
              {/* Overview */}
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Legal Documents</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  These documents outline the terms, policies, and guidelines that govern 
                  your use of Regional Mate. Please review them carefully.
                </p>
              </div>

              {/* Documents */}
              <div className="space-y-4 mb-6">
                {documents.map((doc, index) => {
                  const Icon = doc.icon;
                  return (
                    <button key={index} className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-[#1E293B]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#1E293B]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{doc.description}</p>
                          <p className="text-xs text-gray-500">Last updated: {doc.lastUpdated}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Key Points */}
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Key Points</h3>
                <div className="space-y-3">
                  {keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[#1E293B] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Questions?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you have any questions about our terms or policies, our legal team is here to help.
                </p>
                <Button className="bg-[#1E293B] hover:bg-[#1E293B]/90 text-white rounded-xl">
                  Contact Legal Team
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

export default TermsPolicies;