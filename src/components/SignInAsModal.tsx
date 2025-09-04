import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AustraliaIcon from "./AustraliaIcon"; // logo component

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
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

    // 👇 TS fix: tell supabase this table can be any type
    const { data: userData, error } = await supabase
      .from<any>("users")
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[48px] flex flex-col">
          {/* Dynamic Island */}
          <div className="w-32 h-6 bg-black rounded-full mx-auto mt-2 mb-6 flex-shrink-0"></div>

          {/* Logo */}
          <div className="px-6 pt-8 pb-6">
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <AustraliaIcon className="w-[108px] h-[108px]" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="px-6 text-center mb-6">
            <h1 className="text-2xl font-medium text-gray-600">Sign In</h1>
            <p className="text-sm text-gray-500 mt-2">
              Access your account to continue
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto px-6">
            <form onSubmit={handleSignIn} className="space-y-6">
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

              {/* Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 pb-10 text-center text-sm text-gray-600">
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
