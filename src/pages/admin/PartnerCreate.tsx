import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createPartner } from "@/services/admin/partnerService";
import type { PartnerPayload, MultilingualField, AddressField, ExternalLink } from "@/types/admin/partner";
import { TYPE_PARTENAIRE_OPTIONS } from "@/types/admin/partner";
import { LanguageSelectorProvider, useLanguageSelector } from "@/contexts/LanguageSelectorContext";
import { GlobalLanguageSelector } from "@/components/admin/GlobalLanguageSelector";
import { MultilingualArrayField } from "@/components/admin/MultilingualArrayField";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Translations for form labels
const formTranslations = {
  fr: {
    editingLanguage: "Langue d'édition:",
    partnerIdentity: "Identité du Partenaire",
    partnerName: "Nom du Partenaire",
    partnerNamePlaceholder: "Entrez le nom de l'organisation partenaire",
    description: "Description",
    descriptionPlaceholder: "Décrivez la mission, les services et les détails de collaboration du partenaire...",
    addressInfo: "Informations d'Adresse",
    streetAddress: "Adresse",
    streetPlaceholder: "Nom et numéro de rue",
    city: "Ville",
    cityPlaceholder: "Nom de la ville",
    country: "Pays",
    countryPlaceholder: "Nom du pays",
    mediaAssets: "Médias",
    required: "Requis",
    partnerLogo: "Logo du Partenaire",
    bannerImage: "Image de Bannière",
    clickToUploadLogo: "Cliquez pour télécharger le logo",
    clickToUploadBanner: "Cliquez pour télécharger la bannière",
    contactSocial: "Contact & Réseaux Sociaux",
    email: "Email",
    phone: "Téléphone",
    phoneFormat: "Format: +213XXXXXXXXX",
    website: "Site Web",
    externalLinks: "Liens Externes",
    addLink: "Ajouter un lien",
    noExternalLinks: "Aucun lien externe ajouté",
    linkTitle: "Titre du lien",
    partnerSettings: "Paramètres du Partenaire",
    partnerType: "Type de Partenaire",
    selectType: "Sélectionner le type...",
    companyFounded: "Date de Création",
    displayPriority: "Priorité d'Affichage",
    lowerHigher: "Plus bas = Priorité plus haute",
    activeStatus: "Statut Actif",
    visibleOnPublic: "Partenaire visible sur les pages publiques",
    partnershipPeriod: "Période de Partenariat",
    startDate: "Date de Début",
    endDate: "Date de Fin",
    tips: "Conseils pour les partenaires",
    tip1: "Utilisez le sélecteur de langue pour le contenu multilingue",
    tip2: "Le logo et la bannière sont requis",
    tip3: "Définissez la période de partenariat pour la durée du contrat",
    addNewPartner: "Ajouter un Nouveau Partenaire",
    createProfile: "Créer un profil partenaire avec support multilingue",
    cancel: "Annuler",
    creating: "Création...",
    createPartner: "Créer le Partenaire",
  },
  ar: {
    editingLanguage: "لغة التحرير:",
    partnerIdentity: "هوية الشريك",
    partnerName: "اسم الشريك",
    partnerNamePlaceholder: "أدخل اسم المنظمة الشريكة",
    description: "الوصف",
    descriptionPlaceholder: "صف مهمة الشريك وخدماته وتفاصيل التعاون...",
    addressInfo: "معلومات العنوان",
    streetAddress: "عنوان الشارع",
    streetPlaceholder: "اسم ورقم الشارع",
    city: "المدينة",
    cityPlaceholder: "اسم المدينة",
    country: "البلد",
    countryPlaceholder: "اسم البلد",
    mediaAssets: "الوسائط",
    required: "مطلوب",
    partnerLogo: "شعار الشريك",
    bannerImage: "صورة البانر",
    clickToUploadLogo: "انقر لتحميل الشعار",
    clickToUploadBanner: "انقر لتحميل البانر",
    contactSocial: "الاتصال ووسائل التواصل الاجتماعي",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    phoneFormat: "الصيغة: +213XXXXXXXXX",
    website: "الموقع الإلكتروني",
    externalLinks: "روابط خارجية",
    addLink: "إضافة رابط",
    noExternalLinks: "لم يتم إضافة روابط خارجية",
    linkTitle: "عنوان الرابط",
    partnerSettings: "إعدادات الشريك",
    partnerType: "نوع الشريك",
    selectType: "اختر النوع...",
    companyFounded: "تاريخ التأسيس",
    displayPriority: "أولوية العرض",
    lowerHigher: "أقل = أولوية أعلى",
    activeStatus: "الحالة النشطة",
    visibleOnPublic: "الشريك مرئي على الصفحات العامة",
    partnershipPeriod: "فترة الشراكة",
    startDate: "تاريخ البدء",
    endDate: "تاريخ الانتهاء",
    tips: "نصائح للشركاء",
    tip1: "استخدم محدد اللغة للمحتوى متعدد اللغات",
    tip2: "الشعار والبانر مطلوبان",
    tip3: "حدد فترة الشراكة لمدة العقد",
    addNewPartner: "إضافة شريك جديد",
    createProfile: "إنشاء ملف شريك مع دعم متعدد اللغات",
    cancel: "إلغاء",
    creating: "جاري الإنشاء...",
    createPartner: "إنشاء الشريك",
  },
  en: {
    editingLanguage: "Editing language:",
    partnerIdentity: "Partner Identity",
    partnerName: "Partner Name",
    partnerNamePlaceholder: "Enter partner organization name",
    description: "Description",
    descriptionPlaceholder: "Describe the partner's mission, services, and collaboration details...",
    addressInfo: "Address Information",
    streetAddress: "Street Address",
    streetPlaceholder: "Street name and number",
    city: "City",
    cityPlaceholder: "City name",
    country: "Country",
    countryPlaceholder: "Country name",
    mediaAssets: "Media Assets",
    required: "Required",
    partnerLogo: "Partner Logo",
    bannerImage: "Banner Image",
    clickToUploadLogo: "Click to upload logo",
    clickToUploadBanner: "Click to upload banner",
    contactSocial: "Contact & Social Media",
    email: "Email",
    phone: "Phone",
    phoneFormat: "Format: +213XXXXXXXXX",
    website: "Website",
    externalLinks: "External Links",
    addLink: "Add Link",
    noExternalLinks: "No external links added",
    linkTitle: "Link title",
    partnerSettings: "Partner Settings",
    partnerType: "Partner Type",
    selectType: "Select type...",
    companyFounded: "Company Founded",
    displayPriority: "Display Priority",
    lowerHigher: "Lower = Higher priority",
    activeStatus: "Active Status",
    visibleOnPublic: "Partner visible on public pages",
    partnershipPeriod: "Partnership Period",
    startDate: "Start Date",
    endDate: "End Date",
    tips: "Tips for partners",
    tip1: "Use the language selector for multilingual content",
    tip2: "Both logo and banner images are required",
    tip3: "Set partnership period for contract duration",
    addNewPartner: "Add New Partner",
    createProfile: "Create a partner profile with multilingual support",
    cancel: "Cancel",
    creating: "Creating...",
    createPartner: "Create Partner",
  },
};
import { 
  Building2,
  Phone, 
  Mail, 
  Globe, 
  Facebook,
  Instagram,
  Calendar,
  Save,
  Loader2,
  ArrowLeft,
  MapPin,
  Link2,
  Shield,
  Clock,
  Plus,
  Trash2,
  Upload,
  Image,
  X,
  Settings
} from "lucide-react";

const createEmptyMultilingual = (): MultilingualField => [
  { lang: "fr", value: "" },
  { lang: "ar", value: "" },
  { lang: "en", value: "" },
];

const createEmptyAddress = (): AddressField => ({
  rue: createEmptyMultilingual(),
  ville: createEmptyMultilingual(),
  pays: createEmptyMultilingual(),
});

// Helper to check if a multilingual field has content
const hasMultilingualContent = (field: MultilingualField, lang: "fr" | "ar" | "en"): boolean => {
  const item = field.find((i) => i.lang === lang);
  return !!(item?.value?.trim());
};

function PartnerForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentLanguage, getCurrentLanguageInfo } = useLanguageSelector();
  const t = formTranslations[currentLanguage];
  const langInfo = getCurrentLanguageInfo();
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState<PartnerPayload>({
    nom_partenaire: createEmptyMultilingual(),
    description: createEmptyMultilingual(),
    adresse: [createEmptyAddress()],
    email: "",
    telephone: "+213",
    site_web: "",
    actif: true,
    facebook: "",
    instagram: "",
    tiktok: "",
    type_partenaire: "",
    date_deb: "",
    date_fin: "",
    liens_externes: [],
    date_creation_entreprise: "",
    priorite_affichage: 1,
  });

  const [externalLinks, setExternalLinks] = useState<ExternalLink[]>([]);
  
  // File upload states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Calculate completion status for each language
  const completionStatus = {
    fr: hasMultilingualContent(formData.nom_partenaire, "fr") && hasMultilingualContent(formData.description, "fr"),
    ar: hasMultilingualContent(formData.nom_partenaire, "ar") && hasMultilingualContent(formData.description, "ar"),
    en: hasMultilingualContent(formData.nom_partenaire, "en") && hasMultilingualContent(formData.description, "en"),
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setPreview: (preview: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearFile = (
    setFile: (file: File | null) => void,
    setPreview: (preview: string | null) => void,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!logoFile || !bannerFile) {
      toast({
        title: "Missing Images",
        description: "Please upload both logo and banner images.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreating(true);
    try {
      await createPartner(
        {
          ...formData,
          liens_externes: externalLinks.filter(link => link.url && link.titre),
        },
        logoFile,
        bannerFile
      );
      toast({
        title: "Success",
        description: "Partner created successfully",
      });
      navigate("/admin/partners");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create partner",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = <K extends keyof PartnerPayload>(field: K, value: PartnerPayload[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === "" ? null : value
    }));
  };

  const handleAddressChange = (field: keyof AddressField, value: MultilingualField) => {
    setFormData(prev => ({
      ...prev,
      adresse: [{
        ...prev.adresse[0],
        [field]: value
      }]
    }));
  };

  const addExternalLink = () => {
    setExternalLinks(prev => [...prev, { url: "", titre: "" }]);
  };

  const updateExternalLink = (index: number, field: keyof ExternalLink, value: string) => {
    setExternalLinks(prev => prev.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    ));
  };

  const removeExternalLink = (index: number) => {
    setExternalLinks(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-muted/30" dir={langInfo.dir}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin/partners")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {t.addNewPartner}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t.createProfile}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/partners")}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                {t.cancel}
              </Button>
              <Button
                type="submit"
                form="partner-form"
                disabled={isCreating}
                className="gap-2"
              >
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isCreating ? t.creating : t.createPartner}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <form id="partner-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Language Selector Card */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{t.editingLanguage}</span>
                    </div>
                    <GlobalLanguageSelector completionStatus={completionStatus} />
                  </div>
                </CardContent>
              </Card>

              {/* Partner Identity Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">{t.partnerIdentity}</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <MultilingualArrayField
                    label={t.partnerName}
                    value={formData.nom_partenaire}
                    onChange={(value) => handleChange("nom_partenaire", value)}
                    required
                    maxLength={255}
                    placeholder={t.partnerNamePlaceholder}
                  />

                  <MultilingualArrayField
                    label={t.description}
                    value={formData.description}
                    onChange={(value) => handleChange("description", value)}
                    type="textarea"
                    required
                    rows={6}
                    placeholder={t.descriptionPlaceholder}
                  />
                </CardContent>
              </Card>

              {/* Address Information Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">{t.addressInfo}</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="grid gap-4 md:grid-cols-3">
                    <MultilingualArrayField
                      label={t.streetAddress}
                      value={formData.adresse[0]?.rue || createEmptyMultilingual()}
                      onChange={(value) => handleAddressChange("rue", value)}
                      required
                      placeholder={t.streetPlaceholder}
                    />
                    <MultilingualArrayField
                      label={t.city}
                      value={formData.adresse[0]?.ville || createEmptyMultilingual()}
                      onChange={(value) => handleAddressChange("ville", value)}
                      required
                      placeholder={t.cityPlaceholder}
                    />
                    <MultilingualArrayField
                      label={t.country}
                      value={formData.adresse[0]?.pays || createEmptyMultilingual()}
                      onChange={(value) => handleAddressChange("pays", value)}
                      required
                      placeholder={t.countryPlaceholder}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Media Assets Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Image className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">{t.mediaAssets}</h2>
                    <Badge variant="outline" className="text-xs">{t.required}</Badge>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{t.partnerLogo}</Label>
                      <div 
                        onClick={() => logoInputRef.current?.click()}
                        className={cn(
                          "relative border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer",
                          "hover:border-primary/50 hover:bg-primary/5",
                          logoPreview ? "border-primary/30 bg-primary/5" : "border-border"
                        )}
                      >
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, setLogoFile, setLogoPreview)}
                          className="hidden"
                        />
                        {logoPreview ? (
                          <div className="relative">
                            <img 
                              src={logoPreview} 
                              alt="Logo preview" 
                              className="w-full h-24 object-contain rounded"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearFile(setLogoFile, setLogoPreview, logoInputRef);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                            <p className="text-xs text-muted-foreground">{t.clickToUploadLogo}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Banner Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{t.bannerImage}</Label>
                      <div 
                        onClick={() => bannerInputRef.current?.click()}
                        className={cn(
                          "relative border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer",
                          "hover:border-primary/50 hover:bg-primary/5",
                          bannerPreview ? "border-primary/30 bg-primary/5" : "border-border"
                        )}
                      >
                        <input
                          ref={bannerInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, setBannerFile, setBannerPreview)}
                          className="hidden"
                        />
                        {bannerPreview ? (
                          <div className="relative">
                            <img 
                              src={bannerPreview} 
                              alt="Banner preview" 
                              className="w-full h-24 object-cover rounded"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearFile(setBannerFile, setBannerPreview, bannerInputRef);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                            <p className="text-xs text-muted-foreground">{t.clickToUploadBanner}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>


              {/* Contact & Social Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Mail className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">{t.contactSocial}</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t.email} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="contact@partner.com"
                        className="border-border bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t.phone} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="tel"
                        required
                        value={formData.telephone}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^\d+]/g, '');
                          if (val.includes('+')) {
                            val = '+' + val.replace(/\+/g, '');
                          }
                          handleChange("telephone", val);
                        }}
                        placeholder="+213781913776"
                        className="border-border bg-background"
                      />
                      <p className="text-xs text-muted-foreground">{t.phoneFormat}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t.website} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="url"
                        required
                        value={formData.site_web}
                        onChange={(e) => handleChange("site_web", e.target.value)}
                        placeholder="https://partner.com"
                        className="border-border bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Facebook className="h-4 w-4" /> Facebook
                      </Label>
                      <Input
                        type="url"
                        value={formData.facebook || ""}
                        onChange={(e) => handleChange("facebook", e.target.value)}
                        placeholder="https://facebook.com/..."
                        className="border-border bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Instagram className="h-4 w-4" /> Instagram
                      </Label>
                      <Input
                        type="url"
                        value={formData.instagram || ""}
                        onChange={(e) => handleChange("instagram", e.target.value)}
                        placeholder="https://instagram.com/..."
                        className="border-border bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">TikTok</Label>
                      <Input
                        type="url"
                        value={formData.tiktok || ""}
                        onChange={(e) => handleChange("tiktok", e.target.value)}
                        placeholder="https://tiktok.com/@..."
                        className="border-border bg-background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* External Links Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-foreground">
                      <Link2 className="h-5 w-5 text-primary" />
                      <h2 className="font-semibold">{t.externalLinks}</h2>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addExternalLink}
                      className="gap-1.5"
                    >
                      <Plus className="h-4 w-4" />
                      {t.addLink}
                    </Button>
                  </div>

                  <Separator className="bg-border/50" />

                  {externalLinks.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <Link2 className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      <p className="text-sm">{t.noExternalLinks}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {externalLinks.map((link, index) => (
                        <div key={index} className="flex gap-3 items-start p-3 rounded-lg bg-muted/30 border border-border/40">
                          <div className="flex-1 grid gap-2 md:grid-cols-2">
                            <Input
                              type="text"
                              value={link.titre}
                              onChange={(e) => updateExternalLink(index, "titre", e.target.value)}
                              placeholder={t.linkTitle}
                              className="border-border bg-background"
                            />
                            <Input
                              type="url"
                              value={link.url}
                              onChange={(e) => updateExternalLink(index, "url", e.target.value)}
                              placeholder="https://..."
                              className="border-border bg-background"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeExternalLink(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Settings */}
            <div className="space-y-6">
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Settings className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">{t.partnerSettings}</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{t.partnerType}</Label>
                    <Select
                      value={formData.type_partenaire}
                      onValueChange={(value) => handleChange("type_partenaire", value)}
                    >
                      <SelectTrigger className="border-border bg-background">
                        <SelectValue placeholder={t.selectType} />
                      </SelectTrigger>
                      <SelectContent>
                        {TYPE_PARTENAIRE_OPTIONS.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {t.companyFounded} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="date"
                      required
                      value={formData.date_creation_entreprise}
                      onChange={(e) => handleChange("date_creation_entreprise", e.target.value)}
                      className="border-border bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{t.displayPriority}</Label>
                    <Input
                      type="number"
                      min={1}
                      required
                      value={formData.priorite_affichage}
                      onChange={(e) => handleChange("priorite_affichage", parseInt(e.target.value) || 1)}
                      className="border-border bg-background"
                    />
                    <p className="text-xs text-muted-foreground">{t.lowerHigher}</p>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">{t.activeStatus}</Label>
                      <p className="text-xs text-muted-foreground">
                        {t.visibleOnPublic}
                      </p>
                    </div>
                    <Switch
                      checked={formData.actif}
                      onCheckedChange={(checked) => handleChange("actif", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Partnership Period Card */}
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">{t.partnershipPeriod}</h2>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {t.startDate} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="datetime-local"
                      required
                      value={formData.date_deb}
                      onChange={(e) => handleChange("date_deb", e.target.value)}
                      className="border-border bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {t.endDate} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="datetime-local"
                      required
                      value={formData.date_fin}
                      onChange={(e) => handleChange("date_fin", e.target.value)}
                      className="border-border bg-background"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="border-border/50 bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="font-medium text-sm text-foreground mb-2">
                    {t.tips}
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li>• {t.tip1}</li>
                    <li>• {t.tip2}</li>
                    <li>• {t.tip3}</li>
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

export default function PartnerCreate() {
  return (
    <LanguageSelectorProvider>
      <PartnerForm />
    </LanguageSelectorProvider>
  );
}
