import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

export type AccentColor = "teal" | "blue" | "green" | "purple" | "orange";
export type ThemeMode = "light" | "dark" | "system";

interface ThemeColors {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    success: string;
    ring: string;
    foreground: string;
    cardForeground: string;
    popoverForeground: string;
    muted: string;
    mutedForeground: string;
    accentForeground: string;
    border: string;
    sidebarForeground: string;
    sidebarPrimary: string;
    sidebarAccent: string;
    sidebarAccentForeground: string;
    sidebarBorder: string;
    sidebarRing: string;
    headerBorder: string;
}

interface DarkThemeColors {
    primary: string;
    primaryLight: string;
    primaryDark: string;
}

const lightColorThemes: Record<AccentColor, ThemeColors> = {
    teal: {
        primary: "182 86% 14%",
        primaryLight: "176 28% 35%",
        primaryDark: "182 90% 10%",
        secondary: "176 28% 35%",
        accent: "174 19% 57%",
        success: "174 19% 57%",
        ring: "182 86% 14%",
        foreground: "182 86% 14%",
        cardForeground: "182 86% 14%",
        popoverForeground: "182 86% 14%",
        muted: "182 27% 85%",
        mutedForeground: "182 40% 30%",
        accentForeground: "182 86% 14%",
        border: "182 27% 85%",
        sidebarForeground: "182 86% 14%",
        sidebarPrimary: "182 86% 14%",
        sidebarAccent: "182 60% 96%",
        sidebarAccentForeground: "182 86% 14%",
        sidebarBorder: "182 20% 92%",
        sidebarRing: "182 86% 14%",
        headerBorder: "182 20% 92%",
    },
    blue: {
        primary: "217 91% 50%",
        primaryLight: "217 80% 60%",
        primaryDark: "217 91% 40%",
        secondary: "217 70% 55%",
        accent: "217 60% 65%",
        success: "217 60% 65%",
        ring: "217 91% 50%",
        foreground: "217 91% 20%",
        cardForeground: "217 91% 20%",
        popoverForeground: "217 91% 20%",
        muted: "217 27% 90%",
        mutedForeground: "217 40% 40%",
        accentForeground: "217 91% 20%",
        border: "217 27% 88%",
        sidebarForeground: "217 91% 20%",
        sidebarPrimary: "217 91% 50%",
        sidebarAccent: "217 80% 96%",
        sidebarAccentForeground: "217 91% 20%",
        sidebarBorder: "217 20% 92%",
        sidebarRing: "217 91% 50%",
        headerBorder: "217 20% 92%",
    },
    green: {
        primary: "142 71% 35%",
        primaryLight: "142 60% 45%",
        primaryDark: "142 71% 25%",
        secondary: "142 55% 45%",
        accent: "142 45% 55%",
        success: "142 45% 55%",
        ring: "142 71% 35%",
        foreground: "142 71% 15%",
        cardForeground: "142 71% 15%",
        popoverForeground: "142 71% 15%",
        muted: "142 27% 88%",
        mutedForeground: "142 40% 35%",
        accentForeground: "142 71% 15%",
        border: "142 27% 88%",
        sidebarForeground: "142 71% 15%",
        sidebarPrimary: "142 71% 35%",
        sidebarAccent: "142 60% 96%",
        sidebarAccentForeground: "142 71% 15%",
        sidebarBorder: "142 20% 92%",
        sidebarRing: "142 71% 35%",
        headerBorder: "142 20% 92%",
    },
    purple: {
        primary: "271 81% 50%",
        primaryLight: "271 70% 60%",
        primaryDark: "271 81% 40%",
        secondary: "271 65% 55%",
        accent: "271 55% 65%",
        success: "271 55% 65%",
        ring: "271 81% 50%",
        foreground: "271 81% 20%",
        cardForeground: "271 81% 20%",
        popoverForeground: "271 81% 20%",
        muted: "271 27% 90%",
        mutedForeground: "271 40% 40%",
        accentForeground: "271 81% 20%",
        border: "271 27% 88%",
        sidebarForeground: "271 81% 20%",
        sidebarPrimary: "271 81% 50%",
        sidebarAccent: "271 70% 96%",
        sidebarAccentForeground: "271 81% 20%",
        sidebarBorder: "271 20% 92%",
        sidebarRing: "271 81% 50%",
        headerBorder: "271 20% 92%",
    },
    orange: {
        primary: "25 95% 53%",
        primaryLight: "25 85% 60%",
        primaryDark: "25 95% 43%",
        secondary: "25 80% 55%",
        accent: "25 70% 60%",
        success: "25 70% 60%",
        ring: "25 95% 53%",
        foreground: "25 95% 20%",
        cardForeground: "25 95% 20%",
        popoverForeground: "25 95% 20%",
        muted: "25 27% 90%",
        mutedForeground: "25 50% 40%",
        accentForeground: "25 95% 20%",
        border: "25 30% 88%",
        sidebarForeground: "25 95% 20%",
        sidebarPrimary: "25 95% 53%",
        sidebarAccent: "25 80% 96%",
        sidebarAccentForeground: "25 95% 20%",
        sidebarBorder: "25 20% 92%",
        sidebarRing: "25 95% 53%",
        headerBorder: "25 20% 92%",
    },
};

const darkColorThemes: Record<AccentColor, DarkThemeColors> = {
    teal: {
        primary: "182 70% 45%",
        primaryLight: "176 50% 55%",
        primaryDark: "182 80% 35%",
    },
    blue: {
        primary: "217 80% 60%",
        primaryLight: "217 70% 70%",
        primaryDark: "217 80% 50%",
    },
    green: {
        primary: "142 60% 50%",
        primaryLight: "142 50% 60%",
        primaryDark: "142 60% 40%",
    },
    purple: {
        primary: "271 70% 60%",
        primaryLight: "271 60% 70%",
        primaryDark: "271 70% 50%",
    },
    orange: {
        primary: "25 85% 55%",
        primaryLight: "25 75% 65%",
        primaryDark: "25 85% 45%",
    },
};

interface ThemeContextType {
    accentColor: AccentColor;
    setAccentColor: (color: AccentColor) => void;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): boolean => {
    if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
        const saved = sessionStorage.getItem("accent-color");
        return (saved as AccentColor) || "teal";
    });

    const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem("theme-mode");
        return (saved as ThemeMode) || "light";
    });

    const [isDark, setIsDark] = useState<boolean>(() => {
        const saved = localStorage.getItem("theme-mode");
        if (saved === "dark") return true;
        if (saved === "system") return getSystemTheme();
        return false;
    });

    // CSS variables that need to be cleared when switching themes
    const cssVariablesToManage = [
        "--primary", "--primary-light", "--primary-dark", "--secondary", "--accent",
        "--success", "--ring", "--foreground", "--card-foreground", "--popover-foreground",
        "--muted", "--muted-foreground", "--accent-foreground", "--border", "--input",
        "--background", "--card", "--popover",
        "--sidebar-foreground", "--sidebar-primary", "--sidebar-accent",
        "--sidebar-accent-foreground", "--sidebar-border", "--sidebar-ring",
        "--sidebar-background", "--header-border", "--header-background",
        "--gradient-primary", "--gradient-hero", "--gradient-subtle",
        "--shadow-elegant", "--shadow-glow", "--shadow-card", "--shadow-header", "--shadow-sidebar"
    ];

    const applyTheme = (color: AccentColor, dark: boolean, forceLight: boolean = false) => {
        const root = document.documentElement;

        // First, clear all inline style overrides so CSS cascade takes effect
        cssVariablesToManage.forEach(variable => {
            root.style.removeProperty(variable);
        });

        // Only apply dark mode on admin routes
        const shouldBeDark = dark && !forceLight;

        // Toggle dark class - this activates .dark CSS variables from index.css
        if (shouldBeDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        // Apply accent colors based on theme mode
        if (shouldBeDark) {
            const darkTheme = darkColorThemes[color];
            // Only set primary-related colors, let CSS handle the rest
            root.style.setProperty("--primary", darkTheme.primary);
            root.style.setProperty("--primary-light", darkTheme.primaryLight);
            root.style.setProperty("--primary-dark", darkTheme.primaryDark);
            root.style.setProperty("--ring", darkTheme.primary);
            root.style.setProperty("--sidebar-primary", darkTheme.primary);
            root.style.setProperty("--sidebar-ring", darkTheme.primary);

            // Update gradients for dark mode with accent color
            root.style.setProperty(
                "--gradient-primary",
                `linear-gradient(135deg, hsl(${darkTheme.primary}), hsl(${darkTheme.primaryDark}))`
            );
            root.style.setProperty(
                "--gradient-hero",
                `linear-gradient(135deg, hsl(${darkTheme.primaryLight}) 0%, hsl(${darkTheme.primary}) 100%)`
            );
            root.style.setProperty(
                "--shadow-glow",
                `0 0 60px hsl(${darkTheme.primary} / 0.15)`
            );
        } else {
            const theme = lightColorThemes[color];

            // Apply all color variables for light mode
            root.style.setProperty("--primary", theme.primary);
            root.style.setProperty("--primary-light", theme.primaryLight);
            root.style.setProperty("--primary-dark", theme.primaryDark);
            root.style.setProperty("--secondary", theme.secondary);
            root.style.setProperty("--accent", theme.accent);
            root.style.setProperty("--success", theme.success);
            root.style.setProperty("--ring", theme.ring);
            root.style.setProperty("--foreground", theme.foreground);
            root.style.setProperty("--card-foreground", theme.cardForeground);
            root.style.setProperty("--popover-foreground", theme.popoverForeground);
            root.style.setProperty("--muted", theme.muted);
            root.style.setProperty("--muted-foreground", theme.mutedForeground);
            root.style.setProperty("--accent-foreground", theme.accentForeground);
            root.style.setProperty("--border", theme.border);
            root.style.setProperty("--sidebar-foreground", theme.sidebarForeground);
            root.style.setProperty("--sidebar-primary", theme.sidebarPrimary);
            root.style.setProperty("--sidebar-accent", theme.sidebarAccent);
            root.style.setProperty("--sidebar-accent-foreground", theme.sidebarAccentForeground);
            root.style.setProperty("--sidebar-border", theme.sidebarBorder);
            root.style.setProperty("--sidebar-ring", theme.sidebarRing);
            root.style.setProperty("--header-border", theme.headerBorder);

            // Update gradients
            root.style.setProperty(
                "--gradient-primary",
                `linear-gradient(135deg, hsl(${theme.primary}), hsl(${theme.primaryDark}))`
            );
            root.style.setProperty(
                "--gradient-hero",
                `linear-gradient(135deg, hsl(${theme.primaryLight}) 0%, hsl(${theme.primary}) 100%)`
            );
            root.style.setProperty(
                "--shadow-elegant",
                `0 10px 40px -10px hsl(${theme.primary} / 0.20)`
            );
            root.style.setProperty(
                "--shadow-glow",
                `0 0 60px hsl(${theme.accent} / 0.20)`
            );
            root.style.setProperty(
                "--shadow-card",
                `0 4px 20px hsl(${theme.primary} / 0.10)`
            );
            root.style.setProperty(
                "--shadow-header",
                `0 4px 30px -4px hsl(${theme.primary} / 0.12), 0 0 0 1px hsl(${theme.primary} / 0.05)`
            );
            root.style.setProperty(
                "--shadow-sidebar",
                `4px 0 30px -4px hsl(${theme.primary} / 0.10), 0 0 0 1px hsl(${theme.primary} / 0.05)`
            );
        }
    };

    const setAccentColor = (color: AccentColor) => {
        setAccentColorState(color);
        sessionStorage.setItem("accent-color", color);
        applyTheme(color, isDark, !isAdminRoute);
    };

    const setThemeMode = (mode: ThemeMode) => {
        setThemeModeState(mode);
        localStorage.setItem("theme-mode", mode);

        let dark = false;
        if (mode === "dark") {
            dark = true;
        } else if (mode === "system") {
            dark = getSystemTheme();
        }

        setIsDark(dark);
        applyTheme(accentColor, dark, !isAdminRoute);
    };

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e: MediaQueryListEvent) => {
            if (themeMode === "system") {
                setIsDark(e.matches);
                applyTheme(accentColor, e.matches, !isAdminRoute);
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [themeMode, accentColor, isAdminRoute]);

    // Apply theme on mount and when route changes
    useEffect(() => {
        applyTheme(accentColor, isDark, !isAdminRoute);
    }, [isAdminRoute]);

    return (
        <ThemeContext.Provider value={{ accentColor, setAccentColor, themeMode, setThemeMode, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
};