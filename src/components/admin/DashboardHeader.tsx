import { useNavigate } from "react-router-dom";
import { Bell, Search, HelpCircle, Settings, LogOut, User, Loader2, Globe, Check, Sun, Moon, Monitor, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout } from "@/hooks/admin/useLogout";
import { useProfile } from "@/hooks/admin/useProfile";
import { useAdminTranslation } from "@/contexts/AdminTranslationContext";
import { useTheme, ThemeMode, AccentColor } from "@/contexts/ThemeContext";
import { useWalkthrough } from "@/contexts/WalkthroughContext";

const accentColors: { id: AccentColor; label: string; color: string }[] = [
    { id: "teal", label: "Teal", color: "hsl(182, 86%, 14%)" },
    { id: "blue", label: "Blue", color: "hsl(217, 91%, 50%)" },
    { id: "green", label: "Green", color: "hsl(142, 71%, 35%)" },
    { id: "purple", label: "Purple", color: "hsl(271, 81%, 50%)" },
    { id: "orange", label: "Orange", color: "hsl(25, 95%, 53%)" },
];

export function DashboardHeader() {
    const navigate = useNavigate();
    const { logout, isLoading: isLoggingOut } = useLogout();
    const { profile, isLoading: isLoadingProfile } = useProfile();
    const { t, language, setLanguage, isRTL } = useAdminTranslation();
    const { themeMode, setThemeMode, isDark, accentColor, setAccentColor } = useTheme();
    const { isRunning, startTour, stopTour } = useWalkthrough();

    const handleHelpClick = () => {
        if (isRunning) {
            stopTour();
        } else {
            startTour();
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getAccessLevelLabel = (level: string) => {
        const levels: Record<string, string> = {
            'Super_A': t.superAdmin,
            'Admin': 'Admin',
            'Moderator': 'Moderator',
            'User': 'User',
        };
        return levels[level] || level;
    };

    const handleLogout = () => {
        logout();
    };

    const handleProfileClick = () => {
        navigate("/admin/profile");
    };

    const handleSettingsClick = () => {
        navigate("/admin/settings");
    };

    const themeOptions: { mode: ThemeMode; icon: typeof Sun; label: string }[] = [
        { mode: "light", icon: Sun, label: "Light" },
        { mode: "dark", icon: Moon, label: "Dark" },
        { mode: "system", icon: Monitor, label: "System" },
    ];

    const CurrentThemeIcon = themeMode === "dark" ? Moon : themeMode === "system" ? Monitor : Sun;

    return (
        <header className={`h-16 bg-[hsl(var(--header-background))] border-b border-[hsl(var(--header-border))] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50 shadow-[var(--shadow-header)] backdrop-blur-xl ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                {/* Search Bar */}
                <div className={`relative hidden md:flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="relative group">
                        <Search className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors`} />
                        <Input
                            placeholder={t.search}
                            className={`w-64 lg:w-80 ${isRTL ? "pr-9 pl-12" : "pl-9 pr-12"} h-9 bg-muted/40 border-transparent rounded-lg text-sm placeholder:text-muted-foreground/50 focus:bg-background focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all`}
                        />
                        <div className={`absolute ${isRTL ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 text-xs text-muted-foreground/50`}>
                            <kbd className="px-1.5 py-0.5 bg-muted/60 rounded text-[10px] font-medium">⌘K</kbd>
                        </div>
                    </div>
                </div>
            </div>

            <div data-tour="header-actions" className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                {/* Theme Switcher */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
                        >
                            <CurrentThemeIcon className="h-[18px] w-[18px]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36 bg-popover border border-border">
                        <DropdownMenuLabel className="text-xs text-muted-foreground">Theme</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {themeOptions.map((option) => (
                            <DropdownMenuItem
                                key={option.mode}
                                onClick={() => setThemeMode(option.mode)}
                                className="cursor-pointer flex items-center justify-between"
                            >
                <span className="flex items-center gap-2">
                  <option.icon className="h-4 w-4" />
                    {option.label}
                </span>
                                {themeMode === option.mode && <Check className="h-4 w-4 text-primary" />}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Color Palette Switcher */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200 relative"
                        >
                            <Palette className="h-[18px] w-[18px]" />
                            <span 
                                className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full ring-2 ring-[hsl(var(--header-background))]"
                                style={{ backgroundColor: accentColors.find(c => c.id === accentColor)?.color || accentColors[0].color }}
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-popover border border-border">
                        <DropdownMenuLabel className="text-xs text-muted-foreground">{t.colorPalette}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="p-3">
                            <div className="flex gap-3 justify-center">
                                {accentColors.map((color) => (
                                    <button
                                        key={color.id}
                                        title={color.label}
                                        onClick={() => setAccentColor(color.id)}
                                        className={`w-7 h-7 rounded-full ring-2 ring-offset-2 ring-offset-popover transition-all duration-200 flex-shrink-0 aspect-square ${
                                            accentColor === color.id
                                                ? "ring-foreground scale-110"
                                                : "ring-transparent hover:ring-muted-foreground/50"
                                        }`}
                                        style={{ backgroundColor: color.color, minWidth: '28px', minHeight: '28px' }}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground text-center mt-2 capitalize">
                                {accentColor}
                            </p>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            data-tour="language-selector"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
                        >
                            <Globe className="h-[18px] w-[18px]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 bg-popover border border-border">
                        <DropdownMenuLabel className="text-xs text-muted-foreground">{t.language}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => setLanguage("en")}
                            className="cursor-pointer flex items-center justify-between"
                        >
              <span className="flex items-center gap-2">
                <span>🇬🇧</span>
                English
              </span>
                            {language === "en" && <Check className="h-4 w-4 text-primary" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setLanguage("fr")}
                            className="cursor-pointer flex items-center justify-between"
                        >
              <span className="flex items-center gap-2">
                <span>🇫🇷</span>
                Français
              </span>
                            {language === "fr" && <Check className="h-4 w-4 text-primary" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setLanguage("ar")}
                            className="cursor-pointer flex items-center justify-between"
                        >
              <span className="flex items-center gap-2">
                <span>🇩🇿</span>
                العربية
              </span>
                            {language === "ar" && <Check className="h-4 w-4 text-primary" />}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Help Button - Walkthrough Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleHelpClick}
                    className={`h-9 w-9 rounded-lg transition-all duration-200 ${
                        isRunning 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                    <HelpCircle className="h-[18px] w-[18px]" />
                </Button>

                {/* Notifications Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200 relative"
                >
                    <Bell className="h-[18px] w-[18px]" />
                    <span className={`absolute top-1.5 ${isRTL ? "left-1.5" : "right-1.5"} h-2 w-2 bg-destructive rounded-full ring-2 ring-[hsl(var(--header-background))]`} />
                </Button>

                {/* Divider */}
                <div className="w-px h-6 bg-border/60 mx-2 hidden sm:block" />

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className={`flex items-center gap-2.5 h-9 px-2 rounded-lg hover:bg-muted/50 transition-all duration-200 group ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                            <div className="relative">
                                <Avatar className="h-7 w-7 ring-1 ring-border/50 group-hover:ring-primary/30 transition-all">
                                    <AvatarImage src="" alt={profile?.nom || "Admin"} />
                                    <AvatarFallback className="bg-primary text-primary-foreground font-medium text-xs">
                                        {isLoadingProfile ? "..." : profile ? getInitials(profile.nom) : "AD"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className={`absolute -bottom-0.5 ${isRTL ? "-left-0.5" : "-right-0.5"} w-2.5 h-2.5 bg-emerald-500 border-2 border-[hsl(var(--header-background))] rounded-full`} />
                            </div>
                            <div className={`hidden lg:flex flex-col ${isRTL ? "items-end" : "items-start"}`}>
                                {isLoadingProfile ? (
                                    <>
                                        <Skeleton className="h-4 w-20 mb-0.5" />
                                        <Skeleton className="h-3 w-16" />
                                    </>
                                ) : (
                                    <>
                                        <span className="text-sm font-medium text-foreground leading-tight">{profile?.nom || "Admin"}</span>
                                        <span className="text-[11px] text-muted-foreground leading-tight">
                      {profile ? getAccessLevelLabel(profile.niveau_acces) : t.superAdmin}
                    </span>
                                    </>
                                )}
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-1" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal p-3">
                            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <Avatar className="h-10 w-10 ring-1 ring-primary/20">
                                    <AvatarImage src="" alt={profile?.nom || "Admin"} />
                                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                                        {isLoadingProfile ? "..." : profile ? getInitials(profile.nom) : "AD"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className={`flex flex-col space-y-0.5 ${isRTL ? "items-end" : ""}`}>
                                    {isLoadingProfile ? (
                                        <>
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-3 w-32" />
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm font-medium leading-none">{profile?.nom || "Admin User"}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{profile?.email || "admin@toorrii.com"}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem
                            onClick={handleProfileClick}
                            className={`py-2 px-3 cursor-pointer rounded-md ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                            <User className={`${isRTL ? "ml-2" : "mr-2"} h-4 w-4 text-muted-foreground`} />
                            <span>{t.profile}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleSettingsClick}
                            className={`py-2 px-3 cursor-pointer rounded-md ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                            <Settings className={`${isRTL ? "ml-2" : "mr-2"} h-4 w-4 text-muted-foreground`} />
                            <span>{t.settings}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem
                            data-tour="logout-btn"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className={`py-2 px-3 cursor-pointer rounded-md text-destructive focus:text-destructive focus:bg-destructive/10 ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                            {isLoggingOut ? (
                                <Loader2 className={`${isRTL ? "ml-2" : "mr-2"} h-4 w-4 animate-spin`} />
                            ) : (
                                <LogOut className={`${isRTL ? "ml-2" : "mr-2"} h-4 w-4`} />
                            )}
                            <span>{isLoggingOut ? t.signingOut : t.signOut}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}