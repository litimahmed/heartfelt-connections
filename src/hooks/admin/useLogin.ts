import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoginPayload } from "@/types/admin/auth";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { loginAdmin } from "@/services/admin/authService";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setAuthenticated } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await loginAdmin(payload);
      
      // Store tokens from backend response
      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      
      // Update auth context
      setAuthenticated(true);
      
      const { dismiss } = toast({ 
        title: "Login Successful", 
        description: "Welcome back! Redirecting to your dashboard...", 
        variant: "success",
        duration: 2000
      });
      
      // Wait for user to see the toast, then dismiss and redirect
      setTimeout(() => {
        dismiss();
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err: any) {
      const errorMessage = err?.message || "The email or password you entered is incorrect. Please try again.";
      setError(errorMessage);
      toast({ 
        title: "Invalid Credentials", 
        description: errorMessage, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
