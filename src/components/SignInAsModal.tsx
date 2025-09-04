import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      toast({
        title: "Login failed",
        description: authError?.message || "Invalid email or password",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // 🔑 Fetch user_type from users table
    const { data: userData, error } = await supabase
      .from("users")
      .select("user_type")
      .eq("id", authData.user.id)
      .single();

    if (error || !userData) {
      toast({
        title: "Error",
        description: "Could not determine user type",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // 🚀 Redirect based on user_type
    if (userData.user_type === "whv") {
      navigate("/whv/dashboard");
    } else if (userData.user_type === "employer") {
      navigate("/employer/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Invalid user type",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* iPhone 16 Pro Max Frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] p-6 flex flex-col">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h1>
          <p className="text-sm text-gray-600 mb-8">
            Enter your email and password to access your account.
          </p>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-6 flex-1">
            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-gray-100 border-0 text-gray-900"
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-gray-100 border-0 text-gray-900"
              />
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/lets-begin")}
              className="text-orange-500 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
