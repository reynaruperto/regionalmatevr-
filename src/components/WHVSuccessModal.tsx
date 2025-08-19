import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface WHVSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHVSuccessModal: React.FC<WHVSuccessModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignIn = () => {
    onClose();
    navigate('/whv-login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          You have created your Regional Mate Account Successfully
        </h2>
        
        <p className="text-gray-600 mb-8">
          Start looking for employers and your Working Holiday visa Journey
        </p>

        {/* Sign In Button */}
        <Button 
          onClick={handleSignIn}
          className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default WHVSuccessModal;