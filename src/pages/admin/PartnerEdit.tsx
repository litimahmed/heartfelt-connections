import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { usePartners } from "@/hooks/admin/usePartners";
import type { PartnerPayload, MultilingualField } from "@/types/admin/partner";
import { TYPE_PARTENAIRE_OPTIONS } from "@/types/admin/partner";
import { MultilingualInput } from "@/components/admin/MultilingualInput";
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
  CalendarDays,
  Share2
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const emptyMultilingual: MultilingualField = { ar: "", fr: "", en: "" };

export default function PartnerEdit() {
  const navigate = useNavigate();
  const { id: partnerId } = useParams();
  const { toast } = useToast();
  const { getPartner, updatePartner: updatePartnerMutation, isUpdating } = usePartners();
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<PartnerPayload>({
    nom_partenaire: { ...emptyMultilingual },
    description: { ...emptyMultilingual },
    adresse: { ...emptyMultilingual },
    email: "",
    telephone: "",
    site_web: "",
    actif: true,
    facebook: "",
    instagram: "",
    tiktok: "",
    type_partenaire: "",
    date_deb: "",
    date_fin: "",
    liens_externes: { ...emptyMultilingual },
    date_creation_entreprise: "",
    priorite_affichage: 0,
  });

  useEffect(() => {
    if (partnerId) {
      fetchPartnerData();
    }
  }, [partnerId]);

  const fetchPartnerData = async () => {
    if (!partnerId) return;
    
    try {
      setFetching(true);
      const data = await getPartner(parseInt(partnerId));
      
      const formattedData: PartnerPayload = {
        ...data,
        nom_partenaire: typeof data.nom_partenaire === 'object' 
          ? data.nom_partenaire 
          : { ar: "", fr: "", en: String(data.nom_partenaire || "") },
        description: typeof data.description === 'object' 
          ? data.description 
          : { ar: "", fr: "", en: String(data.description || "") },
        adresse: typeof data.adresse === 'object' 
          ? data.adresse 
          : { ar: "", fr: "", en: String(data.adresse || "") },
        liens_externes: typeof data.liens_externes === 'object' && data.liens_externes
          ? data.liens_externes as MultilingualField
          : { ...emptyMultilingual },
        date_deb: data.date_deb ? data.date_deb.slice(0, 16) : "",
        date_fin: data.date_fin ? data.date_fin.slice(0, 16) : "",
        date_creation_entreprise: data.date_creation_entreprise ? data.date_creation_entreprise.slice(0, 10) : "",
      };
      
      setFormData(formattedData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load partner information",
        variant: "destructive",
      });
      navigate("/admin/partners");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId) return;

    try {
      await updatePartnerMutation(parseInt(partnerId), formData);
      navigate("/admin/partners");
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleChange = (field: keyof PartnerPayload, value: string | boolean | number | MultilingualField) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === "" ? null : value
    }));
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/partners")}
          className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Edit Partner
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update partner information and details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Partner Information Section */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">Partner Information</CardTitle>
                <CardDescription className="text-sm">Name and description in multiple languages</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="space-y-6">
            <MultilingualInput
              label="Partner Name"
              value={formData.nom_partenaire}
              onChange={(value) => handleChange("nom_partenaire", value)}
              required
              maxLength={255}
              placeholder={{ 
                fr: "Nom en français", 
                ar: "الاسم بالعربية", 
                en: "Name in English" 
              }}
            />

            <MultilingualInput
              label="Description"
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
              type="textarea"
              required
              placeholder={{ 
                fr: "Description en français", 
                ar: "الوصف بالعربية", 
                en: "Description in English" 
              }}
            />

            <MultilingualInput
              label="Address"
              value={formData.adresse}
              onChange={(value) => handleChange("adresse", value)}
              required
              placeholder={{ 
                fr: "Adresse en français", 
                ar: "العنوان بالعربية", 
                en: "Address in English" 
              }}
            />

            <MultilingualInput
              label="External Links"
              value={formData.liens_externes || emptyMultilingual}
              onChange={(value) => handleChange("liens_externes", value)}
              placeholder={{ 
                fr: "Liens en français", 
                ar: "الروابط بالعربية", 
                en: "Links in English" 
              }}
            />
          </CardContent>
        </Card>

        {/* Contact Information Section */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">Contact Information</CardTitle>
                <CardDescription className="text-sm">How to reach this partner</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
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
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="partner@example.com"
                  maxLength={254}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone" className="text-sm font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone Number
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="telephone"
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={(e) => handleChange("telephone", e.target.value)}
                  placeholder="+213 XXX XXX XXX"
                  maxLength={128}
                  className="h-11"
                />
              </div>
            </div>

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
                onChange={(e) => handleChange("site_web", e.target.value)}
                placeholder="https://example.com"
                maxLength={200}
                className="h-11"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Details Section */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">Business Details</CardTitle>
                <CardDescription className="text-sm">Partner type, status, and display settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type_partenaire" className="text-sm font-medium">
                  Partner Type
                </Label>
                <Select
                  value={formData.type_partenaire}
                  onValueChange={(value) => handleChange("type_partenaire", value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select type" />
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
                <Label htmlFor="date_creation_entreprise" className="text-sm font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  Company Creation Date
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="date_creation_entreprise"
                  type="date"
                  required
                  value={formData.date_creation_entreprise}
                  onChange={(e) => handleChange("date_creation_entreprise", e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="priorite_affichage" className="text-sm font-medium">
                  Display Priority
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="priorite_affichage"
                  type="number"
                  required
                  value={formData.priorite_affichage}
                  onChange={(e) => handleChange("priorite_affichage", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <div className="flex items-center gap-3 h-11 px-4 rounded-lg border border-border/50 bg-muted/20">
                  <Switch
                    id="actif"
                    checked={formData.actif}
                    onCheckedChange={(checked) => handleChange("actif", checked)}
                  />
                  <Label htmlFor="actif" className="text-sm cursor-pointer">
                    {formData.actif ? (
                      <span className="flex items-center gap-2 text-green-600">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Active Partner
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                        Inactive Partner
                      </span>
                    )}
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partnership Period Section */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">Partnership Period</CardTitle>
                <CardDescription className="text-sm">Start and end dates for this partnership</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date_deb" className="text-sm font-medium">
                  Start Date
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="date_deb"
                  type="datetime-local"
                  required
                  value={formData.date_deb}
                  onChange={(e) => handleChange("date_deb", e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_fin" className="text-sm font-medium">
                  End Date
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="date_fin"
                  type="datetime-local"
                  required
                  value={formData.date_fin}
                  onChange={(e) => handleChange("date_fin", e.target.value)}
                  className="h-11"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Section */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">Social Media</CardTitle>
                <CardDescription className="text-sm">Social media profiles (optional)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="facebook" className="text-sm font-medium flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-muted-foreground" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  type="url"
                  value={formData.facebook || ""}
                  onChange={(e) => handleChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/..."
                  maxLength={200}
                  className="h-11"
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
                  onChange={(e) => handleChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/..."
                  maxLength={200}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok" className="text-sm font-medium">
                  TikTok
                </Label>
                <Input
                  id="tiktok"
                  type="url"
                  value={formData.tiktok || ""}
                  onChange={(e) => handleChange("tiktok", e.target.value)}
                  placeholder="https://tiktok.com/@..."
                  maxLength={200}
                  className="h-11"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-8">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/admin/partners")}
            className="h-11 px-6"
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
            Update Partner
          </Button>
        </div>
      </form>
    </div>
  );
}
