import { useState } from "react";
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
import { SectionBuilder } from "@/components/admin/SectionBuilder";
import { usePrivacyPolicy } from "@/hooks/admin/usePrivacyPolicy";
import { PrivacyPolicyFormData, ContentSection } from "@/types/admin/privacyPolicy";
import { ArrowLeft, Save, X, Shield, Settings, ListOrdered } from "lucide-react";

function PrivacyPolicyForm() {
  const navigate = useNavigate();
  const { createPrivacyPolicy, isCreating } = usePrivacyPolicy();

  const [formData, setFormData] = useState<PrivacyPolicyFormData>({
    titre: { ar: "", fr: "", en: "" },
    introduction: { ar: "", fr: "", en: "" },
    sections: [],
    version: 1,
    active: false,
  });

  // Calculate completion status for each language
  const completionStatus = {
    fr: !!(formData.titre.fr?.trim() && (formData.introduction.fr?.trim() || formData.sections.length > 0)),
    ar: !!(formData.titre.ar?.trim() && (formData.introduction.ar?.trim() || formData.sections.length > 0)),
    en: !!(formData.titre.en?.trim() && (formData.introduction.en?.trim() || formData.sections.length > 0)),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Transform data for API - convert sections to contenu array format
    const apiData = {
      titre: formData.titre,
      contenu: [
        ...(formData.introduction.fr || formData.introduction.ar || formData.introduction.en
          ? [{ type: 'intro' as const, text: formData.introduction }]
          : []),
        ...formData.sections.map((section) => ({
          type: 'section' as const,
          titre: section.titre,
          paragraphe: section.paragraphe,
        })),
      ],
      version: formData.version,
      active: formData.active,
    };
    
    createPrivacyPolicy(apiData as any, {
      onSuccess: () => {
        navigate("/admin/privacy-policy");
      },
    });
  };

  const handleSectionsChange = (sections: ContentSection[]) => {
    setFormData({ ...formData, sections });
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
                onClick={() => navigate("/admin/privacy-policy")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Créer Politique de Confidentialité
                </h1>
                <p className="text-sm text-muted-foreground">
                  Ajoutez un nouveau document avec plusieurs sections
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/privacy-policy")}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Annuler
              </Button>
              <Button
                type="submit"
                form="privacy-policy-form"
                disabled={isCreating}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {isCreating ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <form id="privacy-policy-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Language Selector Card */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Langue d'édition:</span>
                    </div>
                    <GlobalLanguageSelector completionStatus={completionStatus} />
                  </div>
                </CardContent>
              </Card>

              {/* Header Content Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Shield className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Contenu Principal</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <MultilingualField
                    label="Titre du document"
                    value={formData.titre}
                    onChange={(value) => setFormData({ ...formData, titre: value })}
                    type="input"
                    required
                    placeholder={{
                      ar: "سياسة الخصوصية",
                      fr: "Politique de confidentialité",
                      en: "Privacy Policy",
                    }}
                  />

                  <MultilingualField
                    label="Introduction (optionnel)"
                    value={formData.introduction}
                    onChange={(value) => setFormData({ ...formData, introduction: value })}
                    type="textarea"
                    rows={4}
                    placeholder={{
                      ar: "مقدمة عن سياسة الخصوصية...",
                      fr: "Introduction à la politique de confidentialité...",
                      en: "Introduction to the privacy policy...",
                    }}
                  />
                </CardContent>
              </Card>

              {/* Sections Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-foreground">
                      <ListOrdered className="h-5 w-5 text-primary" />
                      <h2 className="font-semibold">Sections</h2>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formData.sections.length} section(s)
                    </span>
                  </div>

                  <Separator className="bg-border/50" />

                  <SectionBuilder
                    sections={formData.sections}
                    onChange={handleSectionsChange}
                    titlePlaceholder={{
                      ar: "عنوان القسم",
                      fr: "Titre de la section",
                      en: "Section title",
                    }}
                    contentPlaceholder={{
                      ar: "محتوى القسم...",
                      fr: "Contenu de la section...",
                      en: "Section content...",
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
                    <h2 className="font-semibold">Paramètres</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-2">
                    <Label htmlFor="version" className="text-sm font-medium">
                      Numéro de version
                    </Label>
                    <Input
                      id="version"
                      type="number"
                      value={formData.version}
                      onChange={(e) =>
                        setFormData({ ...formData, version: parseInt(e.target.value) || 1 })
                      }
                      required
                      min={1}
                      className="border-border bg-background"
                    />
                    <p className="text-xs text-muted-foreground">
                      Incrémentez lors de changements significatifs
                    </p>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="active" className="text-sm font-medium">
                        Statut actif
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Rendre visible aux utilisateurs
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
                    Conseils
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li>• Utilisez le sélecteur de langue pour basculer</li>
                    <li>• Ajoutez plusieurs sections pour organiser le contenu</li>
                    <li>• Chaque section a un titre et un paragraphe</li>
                    <li>• Réorganisez les sections avec les flèches</li>
                    <li>• Une seule politique active à la fois</li>
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

export default function PrivacyPolicyCreate() {
  return (
    <LanguageSelectorProvider>
      <PrivacyPolicyForm />
    </LanguageSelectorProvider>
  );
}
