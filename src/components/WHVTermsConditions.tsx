import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail } from 'lucide-react';

const WHVTermsConditions: React.FC = () => {
  const navigate = useNavigate();

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
              <h1 className="text-lg font-medium text-gray-900">Terms & Conditions</h1>
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
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Welcome to RegionalMate</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  By using our platform, you agree to these Terms and Conditions. RegionalMate connects Working Holiday Visa holders with regional employers across Australia.
                </p>
              </div>

              {/* User Accounts */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">User Accounts</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• You must be at least 18 years old to use our services</li>
                  <li>• You must hold a valid Working Holiday Visa (417 or 462)</li>
                  <li>• Provide accurate and up-to-date information</li>
                  <li>• Keep your login credentials secure</li>
                </ul>
              </div>

              {/* Platform Usage */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Platform Usage</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Use the platform for legitimate employment purposes only</li>
                  <li>• No harassment, discrimination, or inappropriate behavior</li>
                  <li>• Respect other users' privacy and personal information</li>
                  <li>• Report any suspicious or inappropriate activity</li>
                </ul>
              </div>

              {/* Employment Matching */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Employment Matching</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• RegionalMate facilitates connections but doesn't guarantee employment</li>
                  <li>• Employment terms are between you and the employer</li>
                  <li>• Verify all job details directly with employers</li>
                  <li>• Report any fraudulent job postings immediately</li>
                </ul>
              </div>

              {/* Privacy */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Privacy & Data</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                </p>
              </div>

              {/* Prohibited Activities */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Prohibited Activities</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Creating fake profiles or providing false information</li>
                  <li>• Posting discriminatory or offensive content</li>
                  <li>• Attempting to bypass platform safety measures</li>
                  <li>• Using the platform for commercial purposes outside employment</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  RegionalMate is not liable for any employment disputes, workplace incidents, or financial losses arising from connections made through our platform. Users engage with employers at their own risk.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Mail className="w-5 h-5 text-gray-600 mr-2" />
                  <h3 className="text-base font-semibold text-gray-900">Contact Legal Team</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Questions about these terms? Our legal team is here to help.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:legal@regionalmate.com.au'}
                >
                  Contact Legal Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHVTermsConditions;