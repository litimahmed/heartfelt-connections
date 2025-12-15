import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AdminAuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => void;
    setAuthenticated: (value: boolean) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Simple token check - just verify it exists
const hasValidToken = (): boolean => {
    const token = localStorage.getItem("accessToken");
    return !!token;
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => hasValidToken());
    const [isLoading, setIsLoading] = useState(false); // Start as false since we use simple token check

    const logout = useCallback(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        // Simple check on mount
        setIsAuthenticated(hasValidToken());
        setIsLoading(false);

        // Listen for storage changes (logout from another tab)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "accessToken") {
                setIsAuthenticated(!!e.newValue);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const setAuthenticated = (value: boolean) => {
        setIsAuthenticated(value);
    };

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, logout, setAuthenticated }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error("useAdminAuth must be used within AdminAuthProvider");
    }
    return context;
};

// Wrapper component that handles forced logout redirect
export const AdminAuthRedirectHandler = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, isLoading } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const hasRedirected = useRef(false);

    useEffect(() => {
        const isAdminRoute = location.pathname.startsWith("/admin") && !location.pathname.includes("/admin/login");

        if (!isLoading && !isAuthenticated && isAdminRoute && !hasRedirected.current) {
            hasRedirected.current = true;
            navigate("/admin/login", { replace: true });
        }

        if (isAuthenticated) {
            hasRedirected.current = false;
        }
    }, [isAuthenticated, isLoading, navigate, location.pathname]);

    return <>{children}</>;
};
