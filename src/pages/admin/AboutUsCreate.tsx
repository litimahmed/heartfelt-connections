import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LanguageSelectorProvider } from "@/contexts/LanguageSelectorContext";
import { GlobalLanguageSelector } from "@/components/admin/GlobalLanguageSelector";
import { MultilingualField } from "@/components/admin/MultilingualField";
import { useAboutUs } from "@/hooks/admin/useAboutUs";
import { AboutNousFormData, formDataToPayload } from "@/types/admin/aboutUs";
import { 
  ArrowLeft, 
  Save, 
  X, 
  FileText, 
  Settings,
  Target,
  Lightbulb,
  Heart,
  Users,
  Award,
  MessageSquare
} from "lucide-react";

const defaultFormData: AboutNousFormData = {
  titre: { ar: "", fr: "", en: "" },
  contenu: { ar: "", fr: "", en: "" },
  mission: { ar: "", fr: "", en: "" },
  vision: { ar: "", fr: "", en: "" },
  valeurs: { ar: "", fr: "", en: "" },
  pourquoi_choisir_nous: { ar: "", fr: "", en: "" },
  qui_nous_servons: { ar: "", fr: "", en: "" },
  slogan: { ar: "", fr: "", en: "" },
  active: true,
};

function AboutUsForm() {
  const navigate = useNavigate();
  const { createAboutNous, isCreating, versions, isLoadingVersions } = useAboutUs();
  const [formData, setFormData] = useState<AboutNousFormData>(defaultFormData);
  const [version, setVersion] = useState<number>(1);

  const suggestedVersion = (versions?.length || 0) + 1;

  useEffect(() => {
    if (versions && !isLoadingVersions) {
      setVersion(suggestedVersion);
    }
  }, [versions, isLoadingVersions, suggestedVersion]);

  // Calculate completion status for each language (required fields: titre, contenu)
  const completionStatus = {
    fr: !!(formData.titre.fr?.trim() && formData.contenu.fr?.trim()),
    ar: !!(formData.titre.ar?.trim() && formData.contenu.ar?.trim()),
    en: !!(formData.titre.en?.trim() && formData.contenu.en?.trim()),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formDataToPayload(formData),
      version: version,
    };
    try {
      await createAboutNous(payload as any);
      navigate("/admin/about-us");
    } catch (err) {
      // Error handled in hook
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin/about-us/versions")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Create About Us
                </h1>
                <p className="text-sm text-muted-foreground">
                  Build multilingual content for your company profile
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/about-us/versions")}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                form="about-us-form"
                disabled={isCreating}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {isCreating ? "Saving..." : "Save Document"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <form id="about-us-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Language Selector Card */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Editing language:</span>
                    </div>
                    <GlobalLanguageSelector completionStatus={completionStatus} />
                  </div>
                </CardContent>
              </Card>

              {/* Basic Info Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Basic Information</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <MultilingualField
                    label="Title"
                    value={formData.titre}
                    onChange={(value) => setFormData({ ...formData, titre: value })}
                    type="input"
                    required
                    placeholder={{
                      ar: "من نحن",
                      fr: "À propos de nous",
                      en: "About Us",
                    }}
                  />

                  <MultilingualField
                    label="Slogan"
                    value={formData.slogan}
                    onChange={(value) => setFormData({ ...formData, slogan: value })}
                    type="input"
                    placeholder={{
                      ar: "نبتكر المستقبل معاً",
                      fr: "Innovons l'avenir ensemble",
                      en: "Shaping the future together",
                    }}
                  />

                  <MultilingualField
                    label="Main Content"
                    value={formData.contenu}
                    onChange={(value) => setFormData({ ...formData, contenu: value })}
                    type="textarea"
                    required
                    rows={6}
                    placeholder={{
                      ar: "نحن منصة تهدف إلى تمكين الأفراد والشركات...",
                      fr: "Nous sommes une plateforme visant à permettre aux particuliers...",
                      en: "We are a platform designed to empower individuals and businesses...",
                    }}
                  />
                </CardContent>
              </Card>

              {/* Mission & Vision Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Target className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Mission & Vision</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <MultilingualField
                    label="Mission"
                    value={formData.mission}
                    onChange={(value) => setFormData({ ...formData, mission: value })}
                    type="textarea"
                    rows={4}
                    placeholder={{
                      ar: "تقديم أدوات بسيطة وقوية...",
                      fr: "Offrir des outils simples et puissants...",
                      en: "Provide simple yet powerful tools...",
                    }}
                  />

                  <MultilingualField
                    label="Vision"
                    value={formData.vision}
                    onChange={(value) => setFormData({ ...formData, vision: value })}
                    type="textarea"
                    rows={4}
                    placeholder={{
                      ar: "أن نصبح المنصة الرائدة...",
                      fr: "Devenir la plateforme leader...",
                      en: "To become the leading platform...",
                    }}
                  />
                </CardContent>
              </Card>

              {/* Values & More Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Heart className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Values & Differentiators</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <MultilingualField
                    label="Values"
                    value={formData.valeurs}
                    onChange={(value) => setFormData({ ...formData, valeurs: value })}
                    type="textarea"
                    rows={3}
                    placeholder={{
                      ar: "الشفافية، الابتكار، الجودة، دعم المجتمع",
                      fr: "Transparence, innovation, qualité, soutien communautaire",
                      en: "Transparency, innovation, quality, community support",
                    }}
                  />

                  <MultilingualField
                    label="Why Choose Us"
                    value={formData.pourquoi_choisir_nous}
                    onChange={(value) => setFormData({ ...formData, pourquoi_choisir_nous: value })}
                    type="textarea"
                    rows={4}
                    placeholder={{
                      ar: "لأننا نقدم تجربة مستخدم سلسة...",
                      fr: "Parce que nous offrons une expérience fluide...",
                      en: "Because we offer a smooth experience...",
                    }}
                  />

                  <MultilingualField
                    label="Who We Serve"
                    value={formData.qui_nous_servons}
                    onChange={(value) => setFormData({ ...formData, qui_nous_servons: value })}
                    type="textarea"
                    rows={3}
                    placeholder={{
                      ar: "المطورون، الشركات الناشئة، ومالكو المشاريع الشخصية",
                      fr: "Les développeurs, les startups et les créateurs...",
                      en: "Developers, startups, and personal project creators",
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Settings */}
            <div className="space-y-6">
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Settings className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Document Settings</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-2">
                    <Label htmlFor="version" className="text-sm font-medium">
                      Version Number
                    </Label>
                    <Input
                      id="version"
                      type="number"
                      value={version}
                      onChange={(e) => setVersion(parseInt(e.target.value) || 1)}
                      required
                      min={1}
                      className="border-border bg-background"
                    />
                    <p className="text-xs text-muted-foreground">
                      Suggested: {suggestedVersion} (based on {versions?.length || 0} existing)
                    </p>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="active" className="text-sm font-medium">
                        Active Status
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Make this document visible to users
                      </p>
                    </div>
                    <Switch
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, active: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="border-border/50 bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="font-medium text-sm text-foreground mb-2">
                    Content sections
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2">
                      <FileText className="h-3 w-3" /> Basic Info - Title, slogan & main content
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="h-3 w-3" /> Mission & Vision - Company goals
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-3 w-3" /> Values - What makes you unique
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AboutUsCreate() {
  return (
    <LanguageSelectorProvider>
      <AboutUsForm />
    </LanguageSelectorProvider>
  );
}
