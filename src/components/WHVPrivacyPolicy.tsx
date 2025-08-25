import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Shield, Database, Users, Eye } from 'lucide-react';

const WHVPrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  const privacyItems = [
    {
      icon: <Database className="w-5 h-5 text-blue-500" />,
      title: "Data Collection",
      description: "We collect information you provide during registration, profile setup, and platform usage."
    },
    {
      icon: <Shield className="w-5 h-5 text-green-500" />,
      title: "Data Protection",
      description: "Your personal information is encrypted and stored securely using industry-standard practices."
    },
    {
      icon: <Users className="w-5 h-5 text-purple-500" />,
      title: "Data Sharing",
      description: "We only share your profile information with employers when you express interest or match."
    },
    {
      icon: <Eye className="w-5 h-5 text-orange-500" />,
      title: "Your Rights",
      description: "You can access, update, delete, or export your personal data at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-4 flex-shrink-0"></div>
          
          {/* Header */}
          <div className="px-4 py-3 border-b bg-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Privacy Policy</h1>
              <div className="w-10"></div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-6">
              {/* Last Updated */}
              <div className="text-center">
                <p className="text-sm text-gray-500">Last updated: December 2024</p>
              </div>

              {/* Introduction */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Privacy Matters</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  RegionalMate is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
                </p>
              </div>

              {/* Privacy Items */}
              <div className="space-y-4">
                {privacyItems.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Information We Collect */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Information We Collect</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Personal details (name, date of birth, nationality)</li>
                  <li>• Contact information (email, phone number, address)</li>
                  <li>• Visa information (type, expiry date)</li>
                  <li>• Work experience and skills</li>
                  <li>• Profile photos and preferences</li>
                  <li>• Platform usage and interaction data</li>
                </ul>
              </div>

              {/* How We Use Information */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">How We Use Your Information</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Facilitate employment matching between users and employers</li>
                  <li>• Verify your eligibility for Working Holiday Visa work</li>
                  <li>• Improve our platform features and user experience</li>
                  <li>• Send important updates and notifications</li>
                  <li>• Ensure platform safety and prevent fraud</li>
                </ul>
              </div>

              {/* Data Retention */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Data Retention</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We retain your personal information for as long as your account is active or as needed to provide services. You can request account deletion at any time.
                </p>
              </div>

              {/* Third Parties */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Third Party Services</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We may use trusted third-party services for analytics, payment processing, and communication. These partners are contractually bound to protect your data.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Your Privacy Rights</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Access your personal data</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Delete your account and data</li>
                  <li>• Export your data</li>
                  <li>• Opt out of non-essential communications</li>
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Mail className="w-5 h-5 text-gray-600 mr-2" />
                  <h3 className="text-base font-semibold text-gray-900">Contact Privacy Team</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Questions about your privacy or this policy? Contact our privacy team.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:privacy@regionalmate.com.au'}
                >
                  Contact Privacy Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVPrivacyPolicy;