import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useContacts } from "@/hooks/admin/useContacts";
import { LanguageSelectorProvider } from "@/contexts/LanguageSelectorContext";
import { GlobalLanguageSelector } from "@/components/admin/GlobalLanguageSelector";
import { MultilingualField } from "@/components/admin/MultilingualField";
import type { ContactPayload } from "@/types/admin/contact";
import { 
  MapPin, 
  Mail, 
  Clock, 
  Globe, 
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  Save,
  Loader2,
  ArrowLeft,
  Smartphone,
  PhoneCall,
  Share2,
  X
} from "lucide-react";

function ContactForm() {
  const navigate = useNavigate();
  const { createContact: createContactMutation, isCreating } = useContacts();
  const [formData, setFormData] = useState<ContactPayload>({
    titre: { fr: "", ar: "", en: "" },
    email: "",
    telephone_1: "",
    telephone_2: "",
    telephone_fixe: "",
    adresse: { fr: "", ar: "", en: "" },
    ville: { fr: "", ar: "", en: "" },
    wilaya: { fr: "", ar: "", en: "" },
    horaires: "",
    site_web: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
    x: "",
    message_acceuil: { fr: "", ar: "", en: "" },
  });

  // Calculate completion status for each language
  const completionStatus = {
    fr: !!(formData.titre?.fr?.trim() && formData.adresse?.fr?.trim()),
    ar: !!(formData.titre?.ar?.trim() && formData.adresse?.ar?.trim()),
    en: !!(formData.titre?.en?.trim() && formData.adresse?.en?.trim()),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContactMutation(formData);
      navigate("/admin/contacts");
    } catch (error) {
      // Error handling is done in the hook
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
                onClick={() => navigate("/admin/contacts")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Create Contact Information
                </h1>
                <p className="text-sm text-muted-foreground">
                  Add your organization's contact details
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/contacts")}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                form="contact-form"
                disabled={isCreating}
                className="gap-2"
              >
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isCreating ? "Saving..." : "Save Contact"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <form id="contact-form" onSubmit={handleSubmit}>
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

              {/* Company Info Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Company Information</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <MultilingualField
                    label="Company Title"
                    value={formData.titre || { fr: "", ar: "", en: "" }}
                    onChange={(value) => setFormData(prev => ({ ...prev, titre: value }))}
                    maxLength={255}
                    placeholder={{ 
                      fr: "Titre en français", 
                      ar: "العنوان بالعربية", 
                      en: "Title in English" 
                    }}
                  />

                  <MultilingualField
                    label="Welcome Message"
                    value={formData.message_acceuil || { fr: "", ar: "", en: "" }}
                    onChange={(value) => setFormData(prev => ({ ...prev, message_acceuil: value }))}
                    type="textarea"
                    rows={4}
                    placeholder={{ 
                      fr: "Message d'accueil en français", 
                      ar: "رسالة الترحيب بالعربية", 
                      en: "Welcome message in English" 
                    }}
                  />
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Location Details</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <MultilingualField
                    label="Street Address"
                    value={formData.adresse}
                    onChange={(value) => setFormData(prev => ({ ...prev, adresse: value }))}
                    required
                    maxLength={255}
                    placeholder={{ 
                      fr: "Adresse en français", 
                      ar: "العنوان بالعربية", 
                      en: "Address in English" 
                    }}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <MultilingualField
                      label="City"
                      value={formData.ville}
                      onChange={(value) => setFormData(prev => ({ ...prev, ville: value }))}
                      required
                      maxLength={100}
                      placeholder={{ 
                        fr: "Ville en français", 
                        ar: "المدينة بالعربية", 
                        en: "City in English" 
                      }}
                    />

                    <MultilingualField
                      label="Wilaya / Province"
                      value={formData.wilaya}
                      onChange={(value) => setFormData(prev => ({ ...prev, wilaya: value }))}
                      required
                      maxLength={100}
                      placeholder={{ 
                        fr: "Wilaya en français", 
                        ar: "الولاية بالعربية", 
                        en: "Wilaya in English" 
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Share2 className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Online Presence</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="site_web" className="text-sm font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        Website
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="site_web"
                        type="url"
                        required
                        value={formData.site_web}
                        onChange={(e) => setFormData(prev => ({ ...prev, site_web: e.target.value }))}
                        placeholder="https://www.company.com"
                        className="border-border bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facebook" className="text-sm font-medium flex items-center gap-2">
                        <Facebook className="h-4 w-4 text-muted-foreground" />
                        Facebook
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="facebook"
                        type="url"
                        required
                        value={formData.facebook}
                        onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                        placeholder="https://facebook.com/company"
                        className="border-border bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-muted-foreground" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram"
                        type="url"
                        value={formData.instagram || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                        placeholder="https://instagram.com/..."
                        className="border-border bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        type="url"
                        value={formData.linkedin || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                        placeholder="https://linkedin.com/company/..."
                        className="border-border bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tiktok" className="text-sm font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        TikTok
                      </Label>
                      <Input
                        id="tiktok"
                        type="url"
                        value={formData.tiktok || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, tiktok: e.target.value }))}
                        placeholder="https://tiktok.com/@..."
                        className="border-border bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="x" className="text-sm font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        X (Twitter)
                      </Label>
                      <Input
                        id="x"
                        type="url"
                        value={formData.x || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, x: e.target.value }))}
                        placeholder="https://x.com/..."
                        className="border-border bg-background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact Details */}
            <div className="space-y-6">
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <PhoneCall className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Contact Details</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email Address
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="contact@company.com"
                      className="border-border bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="horaires" className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Working Hours
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="horaires"
                      required
                      value={formData.horaires}
                      onChange={(e) => setFormData(prev => ({ ...prev, horaires: e.target.value }))}
                      placeholder="Mon-Fri: 9:00 AM - 5:00 PM"
                      className="border-border bg-background"
                    />
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-2">
                    <Label htmlFor="telephone_1" className="text-sm font-medium flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      Mobile Phone 1
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="telephone_1"
                      type="tel"
                      required
                      value={formData.telephone_1}
                      onChange={(e) => setFormData(prev => ({ ...prev, telephone_1: e.target.value }))}
                      placeholder="+213 XXX XXX XXX"
                      className="border-border bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone_2" className="text-sm font-medium flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      Mobile Phone 2
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="telephone_2"
                      type="tel"
                      required
                      value={formData.telephone_2}
                      onChange={(e) => setFormData(prev => ({ ...prev, telephone_2: e.target.value }))}
                      placeholder="+213 XXX XXX XXX"
                      className="border-border bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone_fixe" className="text-sm font-medium flex items-center gap-2">
                      <PhoneCall className="h-4 w-4 text-muted-foreground" />
                      Landline
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm font-medium text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md">
                        +213
                      </span>
                      <Input
                        id="telephone_fixe"
                        type="tel"
                        required
                        value={formData.telephone_fixe}
                        onChange={(e) => setFormData(prev => ({ ...prev, telephone_fixe: e.target.value }))}
                        placeholder="XX XX XX XX"
                        className="rounded-l-none border-border bg-background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="border-border/50 bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="font-medium text-sm text-foreground mb-2">
                    Tips for contact info
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li>• Use the language selector for multilingual fields</li>
                    <li>• All phone numbers should include country code</li>
                    <li>• Verify all URLs are correct before saving</li>
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

export default function ContactCreate() {
  return (
    <LanguageSelectorProvider>
      <ContactForm />
    </LanguageSelectorProvider>
  );
}
