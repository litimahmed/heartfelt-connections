import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/hooks/admin/useLogin";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import loginGradient from "@/assets/login-gradient-teal.jpg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "ar", label: "العربية" },
];

const translations = {
    en: {
        adminPortal: "Admin Portal",
        subtitle: "Queue & Reservation Hub",
        email: "Email Address",
        emailPlaceholder: "admin@toorrii.com",
        password: "Password",
        signIn: "Sign In to Dashboard",
        signingIn: "Signing in...",
        fillAllFields: "Please fill in all fields",
        copyright: "© 2024 Toorrii. All rights reserved.",
    },
    fr: {
        adminPortal: "Portail Administrateur",
        subtitle: "Hub de Files & Réservations",
        email: "Adresse Email",
        emailPlaceholder: "admin@toorrii.com",
        password: "Mot de passe",
        signIn: "Connexion au Tableau de Bord",
        signingIn: "Connexion en cours...",
        fillAllFields: "Veuillez remplir tous les champs",
        copyright: "© 2024 Toorrii. Tous droits réservés.",
    },
    ar: {
        adminPortal: "بوابة الإدارة",
        subtitle: "مركز الطوابير والحجوزات",
        email: "البريد الإلكتروني",
        emailPlaceholder: "admin@toorrii.com",
        password: "كلمة المرور",
        signIn: "تسجيل الدخول إلى لوحة التحكم",
        signingIn: "جاري تسجيل الدخول...",
        fillAllFields: "يرجى ملء جميع الحقول",
        copyright: "© 2024 توريي. جميع الحقوق محفوظة.",
    },
};

const LANGUAGE_STORAGE_KEY = "admin-language";

const Login = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { login, isLoading } = useLogin();
    const { isAuthenticated, isLoading: authLoading } = useAdminAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    // Read language from localStorage, default to French
    const [selectedLanguage, setSelectedLanguage] = useState<"en" | "fr" | "ar">(() => {
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return (saved as "en" | "fr" | "ar") || "fr";
    });

    // Sync language changes to localStorage
    const handleLanguageChange = (lang: "en" | "fr" | "ar") => {
        setSelectedLanguage(lang);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    };

    const t = translations[selectedLanguage];
    const isRTL = selectedLanguage === "ar";

    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [isAuthenticated, authLoading, navigate]);

    // Show nothing while checking auth
    if (authLoading) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast({ title: "Error", description: t.fillAllFields, variant: "destructive" });
            return;
        }
        await login({ email, password });
    };

    const currentLanguage = languages.find(l => l.code === selectedLanguage);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 md:p-8" style={{ background: 'var(--gradient-background)' }} dir={isRTL ? "rtl" : "ltr"}>
            {/* Language Switcher */}
            <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} z-20`}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80">
                            <Globe className="w-4 h-4" />
                            <span className="text-sm">{currentLanguage?.label}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[140px]">
                        {languages.map((lang) => (
                            <DropdownMenuItem
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code as "en" | "fr" | "ar")}
                                className={selectedLanguage === lang.code ? "bg-primary/10 text-primary" : ""}
                            >
                                {lang.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
            </div>

            <div className="w-full max-w-6xl bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden relative z-10 animate-scale-in" style={{ boxShadow: 'var(--shadow-strong)' }}>
                <div className="grid md:grid-cols-2 min-h-[600px]">
                    {/* Form Column - Right side in RTL */}
                    <div className={`flex items-center justify-center p-10 md:p-14 relative ${isRTL ? 'md:order-2' : 'md:order-1'}`}>
                        <div className="w-full max-w-md">

                            {/* Header */}
                            <div className="mb-12 animate-fade-in">
                                <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                    {t.adminPortal}
                                </div>
                                <h1 className="text-5xl text-primary mb-4 font-extrabold tracking-tight">
                                    Toorrii
                                </h1>
                                <p className="text-base text-muted-foreground">
                                    {t.subtitle}
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }} autoComplete="off">
                                <div className="group">
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2 transition-colors group-focus-within:text-primary">
                                        {t.email}
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="login-email"
                                        autoComplete="off"
                                        placeholder={t.emailPlaceholder}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="h-14 bg-muted/30 border-2 border-border/50 rounded-xl text-base placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-primary focus:bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="group">
                                    <label htmlFor="password" className="block text-sm font-medium text-foreground/70 mb-2 transition-colors group-focus-within:text-primary">
                                        {t.password}
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="login-password"
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className={`h-14 bg-muted/30 border-2 border-border/50 rounded-xl text-base placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-primary focus:bg-background ${isRTL ? 'pl-12' : 'pr-12'} focus-visible:ring-0 focus-visible:ring-offset-0`}
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>



                                <Button
                                    type="submit"
                                    className="w-full h-14 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 mt-8 relative overflow-hidden group"
                                    style={{ background: 'var(--gradient-primary)' }}
                                    disabled={isLoading}
                                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t.signingIn}
                    </> : t.signIn}
                  </span>
                                    <div className="absolute inset-0 bg-primary-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Button>
                            </form>

                            {/* Signature Section */}
                            <div className="mt-12 pt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                <Separator className="mb-8 bg-gradient-to-r from-transparent via-border to-transparent" />
                                <div className="text-center">
                                    <p className="text-xs text-muted-foreground/60">
                                        {t.copyright}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Column - Left side in RTL */}
                    <div className={`hidden md:block relative overflow-hidden ${isRTL ? 'md:order-1' : 'md:order-2'}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary"></div>
                        <img
                            src={loginGradient}
                            alt="Abstract gradient background"
                            className="absolute inset-0 w-full h-full object-cover scale-110 opacity-120"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
