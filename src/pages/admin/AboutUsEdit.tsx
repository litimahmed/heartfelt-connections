import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAboutUs } from "@/hooks/admin/useAboutUs";
import { AboutNousFormData } from "@/types/admin/aboutUs";
import { 
  FileText, 
  Save, 
  Loader2, 
  ArrowLeft,
  Target,
  Lightbulb,
  Heart,
  Users,
  Award,
  MessageSquare,
  Sparkles,
  Info
} from "lucide-react";

type Language = "en" | "fr" | "ar";

const languageConfig = {
  en: { label: "English", flag: "🇬🇧", dir: "ltr" as const, nativeName: "English" },
  fr: { label: "French", flag: "🇫🇷", dir: "ltr" as const, nativeName: "Français" },
  ar: { label: "Arabic", flag: "🇩🇿", dir: "rtl" as const, nativeName: "العربية" },
};

const fieldConfig = [
  { key: "titre", label: { en: "Title", fr: "Titre", ar: "العنوان" }, icon: Sparkles, type: "input", placeholder: { en: "About Us", fr: "À propos de nous", ar: "من نحن" } },
  { key: "slogan", label: { en: "Slogan", fr: "Slogan", ar: "الشعار" }, icon: MessageSquare, type: "input", placeholder: { en: "Shaping the future together", fr: "Innovons l'avenir ensemble", ar: "نبتكر المستقبل معاً" } },
  { key: "contenu", label: { en: "Main Content", fr: "Contenu Principal", ar: "المحتوى الرئيسي" }, icon: FileText, type: "textarea", rows: 5, placeholder: { en: "We are a platform...", fr: "Nous sommes une plateforme...", ar: "نحن منصة..." } },
  { key: "mission", label: { en: "Mission", fr: "Mission", ar: "المهمة" }, icon: Target, type: "textarea", rows: 3, placeholder: { en: "Provide simple yet powerful tools...", fr: "Offrir des outils simples et puissants...", ar: "تقديم أدوات بسيطة وقوية..." } },
  { key: "vision", label: { en: "Vision", fr: "Vision", ar: "الرؤية" }, icon: Lightbulb, type: "textarea", rows: 3, placeholder: { en: "To become the leading platform...", fr: "Devenir la plateforme leader...", ar: "أن نصبح المنصة الرائدة..." } },
  { key: "valeurs", label: { en: "Values", fr: "Valeurs", ar: "القيم" }, icon: Heart, type: "textarea", rows: 2, placeholder: { en: "Transparency, innovation...", fr: "Transparence, innovation...", ar: "الشفافية، الابتكار..." } },
  { key: "pourquoi_choisir_nous", label: { en: "Why Choose Us", fr: "Pourquoi Nous Choisir", ar: "لماذا تختارنا" }, icon: Award, type: "textarea", rows: 3, placeholder: { en: "Because we offer...", fr: "Parce que nous offrons...", ar: "لأننا نقدم..." } },
  { key: "qui_nous_servons", label: { en: "Who We Serve", fr: "Qui Nous Servons", ar: "من نخدم" }, icon: Users, type: "textarea", rows: 2, placeholder: { en: "Developers, startups...", fr: "Les développeurs, les startups...", ar: "المطورون، الشركات الناشئة..." } },
];

const defaultFormData: AboutNousFormData = {
  titre: { ar: "", fr: "", en: "" },
  contenu: { ar: "", fr: "", en: "" },
  mission: { ar: "", fr: "", en: "" },
  vision: { ar: "", fr: "", en: "" },
  valeurs: { ar: "", fr: "", en: "" },
  pourquoi_choisir_nous: { ar: "", fr: "", en: "" },
  qui_nous_servons: { ar: "", fr: "", en: "" },
  slogan: { ar: "", fr: "", en: "" },
  active: false,
};

export default function AboutUsEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { useAboutUsById, updateAboutUs, isUpdating } = useAboutUs();
  const { data: currentVersion, isLoading: isLoadingVersion } = useAboutUsById(id);
  const [activeLanguage, setActiveLanguage] = useState<Language>("en");
  const [formData, setFormData] = useState<AboutNousFormData>(defaultFormData);

  useEffect(() => {
    if (currentVersion) {
      const extractValue = (field: any, lang: Language): string => {
        if (!field) return "";
        if (typeof field === "string") return field;
        if (Array.isArray(field)) {
          return field.find((f: any) => f.lang === lang)?.value || "";
        }
        return "";
      };

      setFormData({
        titre: { ar: extractValue(currentVersion.titre, "ar"), fr: extractValue(currentVersion.titre, "fr"), en: extractValue(currentVersion.titre, "en") },
        contenu: { ar: extractValue(currentVersion.contenu, "ar"), fr: extractValue(currentVersion.contenu, "fr"), en: extractValue(currentVersion.contenu, "en") },
        mission: { ar: extractValue(currentVersion.mission, "ar"), fr: extractValue(currentVersion.mission, "fr"), en: extractValue(currentVersion.mission, "en") },
        vision: { ar: extractValue(currentVersion.vision, "ar"), fr: extractValue(currentVersion.vision, "fr"), en: extractValue(currentVersion.vision, "en") },
        valeurs: { ar: extractValue(currentVersion.valeurs, "ar"), fr: extractValue(currentVersion.valeurs, "fr"), en: extractValue(currentVersion.valeurs, "en") },
        pourquoi_choisir_nous: { ar: extractValue(currentVersion.pourquoi_choisir_nous, "ar"), fr: extractValue(currentVersion.pourquoi_choisir_nous, "fr"), en: extractValue(currentVersion.pourquoi_choisir_nous, "en") },
        qui_nous_servons: { ar: extractValue(currentVersion.qui_nous_servons, "ar"), fr: extractValue(currentVersion.qui_nous_servons, "fr"), en: extractValue(currentVersion.qui_nous_servons, "en") },
        slogan: { ar: extractValue(currentVersion.slogan, "ar"), fr: extractValue(currentVersion.slogan, "fr"), en: extractValue(currentVersion.slogan, "en") },
        active: currentVersion.active === true || currentVersion.active === "true" || currentVersion.active === "1",
      });
    }
  }, [currentVersion]);

  const handleFieldChange = (fieldKey: string, lang: Language, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: {
        ...(prev[fieldKey as keyof AboutNousFormData] as { ar: string; fr: string; en: string }),
        [lang]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVersion || !id) return;

    const toTranslationArray = (field: { ar: string; fr: string; en: string }) => [
      { lang: "ar" as const, value: field.ar },
      { lang: "fr" as const, value: field.fr },
      { lang: "en" as const, value: field.en },
    ];

    const payload = {
      titre: toTranslationArray(formData.titre),
      contenu: toTranslationArray(formData.contenu),
      mission: toTranslationArray(formData.mission),
      vision: toTranslationArray(formData.vision),
      valeurs: toTranslationArray(formData.valeurs),
      pourquoi_choisir_nous: toTranslationArray(formData.pourquoi_choisir_nous),
      qui_nous_servons: toTranslationArray(formData.qui_nous_servons),
      slogan: toTranslationArray(formData.slogan),
      active: formData.active,
      version: currentVersion.version,
    };

    try {
      await updateAboutUs(id, payload);
      navigate("/admin/about-us/versions");
    } catch (err) {
      // Error handled in hook
    }
  };

  if (isLoadingVersion) {
    return (
      <div className="py-8 px-4 max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        {/* Language Tabs Skeleton */}
        <div className="flex gap-3 flex-wrap">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-md" />
          ))}
        </div>

        {/* Version & Status Card Skeleton */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-52" />
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Card Skeleton */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-52" />
                </div>
              </div>
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="space-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className={`w-full rounded-md ${i === 2 || i === 3 || i === 4 || i === 5 || i === 6 ? "h-20" : "h-11"}`} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons Skeleton */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-8">
          <Skeleton className="h-11 w-24 rounded-md" />
          <Skeleton className="h-11 w-32 rounded-md" />
        </div>
      </div>
    );
  }

  if (!currentVersion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-muted-foreground">Version not found</p>
        <Button onClick={() => navigate("/admin/about-us/versions")}>Go Back</Button>
      </div>
    );
  }

  const currentLangConfig = languageConfig[activeLanguage];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/about-us/versions")}
          className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Edit Version {currentVersion.version}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update multilingual content for this About Us version
          </p>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="flex gap-3 flex-wrap">
        {(Object.keys(languageConfig) as Language[]).map((lang) => {
          const config = languageConfig[lang];
          return (
            <Button
              key={lang}
              variant={activeLanguage === lang ? "default" : "outline"}
              onClick={() => setActiveLanguage(lang)}
              className="gap-2"
            >
              <span>{config.flag}</span>
              <span>{config.nativeName}</span>
            </Button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Version & Status Section */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">Version Information</CardTitle>
                <CardDescription className="text-sm">Version number and activation status</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Version</Label>
                <Input 
                  value={`Version ${currentVersion.version}`} 
                  disabled 
                  className="h-11 bg-muted/30 text-muted-foreground cursor-not-allowed" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <div className="flex items-center gap-3 h-11 px-4 rounded-lg border border-border/50 bg-muted/20">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                  />
                  <Label htmlFor="active" className="text-sm cursor-pointer">
                    {formData.active ? (
                      <span className="flex items-center gap-2 text-green-600">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                        Inactive
                      </span>
                    )}
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Section */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <span className="text-xl">{currentLangConfig.flag}</span>
                </div>
                <div>
                  <CardTitle className="text-lg font-medium">{currentLangConfig.nativeName} Content</CardTitle>
                  <CardDescription className="text-sm">Edit the details for the {currentLangConfig.label} version</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs">{currentLangConfig.dir.toUpperCase()}</Badge>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="space-y-6" dir={currentLangConfig.dir}>
            {fieldConfig.map((field) => {
              const Icon = field.icon;
              const fieldData = formData[field.key as keyof AboutNousFormData] as { ar: string; fr: string; en: string };
              const value = fieldData?.[activeLanguage] || "";

              return (
                <div key={field.key} className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {field.label[activeLanguage]}
                  </Label>
                  
                  {field.type === "textarea" ? (
                    <Textarea
                      value={value}
                      onChange={(e) => handleFieldChange(field.key, activeLanguage, e.target.value)}
                      placeholder={field.placeholder[activeLanguage]}
                      rows={field.rows || 3}
                      className="resize-none focus-visible:ring-1 focus-visible:ring-primary/50"
                      dir={currentLangConfig.dir}
                    />
                  ) : (
                    <Input
                      value={value}
                      onChange={(e) => handleFieldChange(field.key, activeLanguage, e.target.value)}
                      placeholder={field.placeholder[activeLanguage]}
                      className="h-11 focus-visible:ring-1 focus-visible:ring-primary/50"
                      dir={currentLangConfig.dir}
                    />
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-8">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/admin/about-us/versions")}
            className="h-11 px-6"
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isUpdating} 
            className="h-11 px-8 gap-2"
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
