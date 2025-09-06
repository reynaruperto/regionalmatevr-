import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type FormData = z.infer<typeof formSchema>;

const WHVOnboardingDebug: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  // 🔎 Toggle which test you want to run
  const TEST_MODE: "minimal" | "redirectOnly" | "metadataOnly" = "minimal";

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      let response;
      if (TEST_MODE === "minimal") {
        // ✅ No redirect, no metadata
        response = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
      } else if (TEST_MODE === "redirectOnly") {
        // ✅ Only redirect
        response = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/whv/profile-setup`,
          },
        });
      } else if (TEST_MODE === "metadataOnly") {
        // ✅ Only metadata
        response = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: { user_type: "whv" },
          },
        });
      }

      const { error, data: supaData } = response;

      console.log("Supabase signup response:", supaData);
      if (error) {
        console.error("Supabase signup error:", error);
        toast({
          title: "Registration failed",
          description: error.message || "Unexpected error",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Signup success (check DB)",
        description: "See console for Supabase response",
      });

    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Unexpected failure",
        description: "Check console logs",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/lets-begin')}>
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Button>

        <h1 className="text-xl font-bold mb-6">WHV Debug Signup ({TEST_MODE})</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Signing up..." : "Test Signup"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WHVOnboardingDebug;


