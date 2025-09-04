import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import AustraliaIcon from './AustraliaIcon';

const SignInAsModal: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'employer' | 'whv' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userType) {
      setMessage({ type: 'error', text: 'Please select a sign in type first.' });
      return;
    }

    try {
      // ✅ Replace this with supabase.auth.signInWithPassword or your auth function
      if (email === 'test@example.com' && password === 'password123') {
        setMessage({ type: 'success', text: 'Login successful!' });
        setTimeout(() => {
          navigate(userType === 'employer' ? '/employer/dashboard' : '/whv/dashboard');
        }, 1000);
      } else {
        setMessage({ type: 'error', text: 'Invalid credentials. Try again.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
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
          <div className="w-full h-full flex flex-col relative bg-gray-50">
            
            {/* Header with back button */}
            <div className="flex items-center justify-between px-6 pt-16 pb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 bg-white rounded-2xl shadow-sm"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </Button>
              <div className="flex-1"></div>
            </div>

            {/* Logo section */}
            <div className="px-6 pt-8 pb-6">
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-3xl shadow-lg">
                  <AustraliaIcon className="w-[108px] h-[108px]" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="px-6 pb-6 text-center">
              <h1 className="text-2xl font-medium text-gray-600">
                Sign In
              </h1>
            </div>

            {/* Sign in options */}
            {!userType && (
              <div className="px-6 pb-8 space-y-4">
                <Button 
                  size="lg" 
                  className="w-full h-14 text-lg rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
                  onClick={() => setUserType('employer')}
                >
                  I want to hire
                </Button>
                
                <Button 
                  size="lg" 
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => setUserType('whv')}
                >
                  I want to get hired
                </Button>
              </div>
            )}

            {/* Sign in form */}
            {userType && (
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-gray-100 border-0 text-gray-900"
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-gray-100 border-0 text-gray-900"
                  />
                </div>

                {/* Forgot password */}
                <div className="text-right">
                  <button 
                    type="button" 
                    onClick={() => navigate('/forgot-password')}
                    className="text-sm text-orange-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Notification message */}
                {message && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <Button 
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Sign In
                </Button>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInAsModal;
