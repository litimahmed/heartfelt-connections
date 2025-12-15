import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { logoutAdmin } from "@/services/admin/authService";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export const useLogout = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { logout: contextLogout } = useAdminAuth();
    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        setIsLoading(true);
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            // Try to call backend logout (may fail if token blacklist not configured)
            try {
                await logoutAdmin(accessToken || undefined, refreshToken || undefined);
            } catch (apiError) {
                // Backend logout failed - continue with local logout anyway
                console.warn("Backend logout failed, proceeding with local logout");
            }

            // Clear tokens and update auth context state
            contextLogout();

            toast({
                title: "Logged Out",
                description: "You have been signed out successfully.",
                variant: "default"
            });

            // Navigate after state is cleared
            navigate("/admin/login", { replace: true });
        } catch (err) {
            // Fallback: clear tokens and redirect even on unexpected errors
            contextLogout();

            toast({
                title: "Logged Out",
                description: "Session ended.",
                variant: "default"
            });

            navigate("/admin/login", { replace: true });
        } finally {
            setIsLoading(false);
        }
    };

    return { logout, isLoading };
};