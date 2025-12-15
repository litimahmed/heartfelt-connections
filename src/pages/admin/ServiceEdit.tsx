/**
 * Service Edit Page
 * 
 * Admin page for editing an existing service.
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useService, useUpdateService } from "@/hooks/admin/useServices";
import { 
  Briefcase,
  ArrowLeft,
  Loader2,
  Upload,
  X,
  Save
} from "lucide-react";

export default function ServiceEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const proffessionnelId = searchParams.get("proffessionnel_id") || "";
  
  const { service, isLoading: isLoadingService } = useService(id || "");
  const { mutate: updateService, isPending } = useUpdateService();

  const [formData, setFormData] = useState({
    nom_service: "",
    description_service: "",
    prix_service: 0,
    duree_moyenne: 30,
    actif: true,
    options: "",
    jours_de_travail: "",
    jours_de_repos: "",
    jours_de_conge: "",
    categorie: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setFormData({
        nom_service: service.nom_service || "",
        description_service: service.description_service || "",
        prix_service: service.prix_service || 0,
        duree_moyenne: service.duree_moyenne || 30,
        actif: service.actif ?? true,
        options: service.options || "",
        jours_de_travail: service.jours_de_travail || "",
        jours_de_repos: service.jours_de_repos || "",
        jours_de_conge: service.jours_de_conge || "",
        categorie: service.categorie || "",
      });
      if (service.photo_principale) {
        setImagePreview(service.photo_principale);
      }
    }
  }, [service]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "prix_service" || name === "duree_moyenne" ? Number(value) : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    const data = new FormData();
    data.append("nom_service", formData.nom_service);
    data.append("description_service", formData.description_service);
    data.append("prix_service", formData.prix_service.toString());
    data.append("duree_moyenne", formData.duree_moyenne.toString());
    data.append("actif", formData.actif.toString());
    data.append("options", formData.options);
    data.append("jours_de_travail", formData.jours_de_travail);
    data.append("jours_de_repos", formData.jours_de_repos);
    data.append("jours_de_conge", formData.jours_de_conge);
    data.append("categorie", formData.categorie);
    data.append("proffessionnel_id", proffessionnelId || service?.proffessionnel_id || "");
    
    if (imageFile) {
      data.append("photo_principale", imageFile);
    }

    updateService(
      { serviceId: id, formData: data },
      {
        onSuccess: () => {
          navigate(`/admin/services?proffessionnel_id=${proffessionnelId || service?.proffessionnel_id}`);
        },
      }
    );
  };

  if (isLoadingService) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Form Card Skeleton */}
        <Card className="shadow-elegant border-0">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-4 w-48 mt-1" />
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>

            {/* Price and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>

            {/* Scheduling Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>

            {/* Options */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-40 w-full rounded-xl" />
            </div>

            {/* Active Status */}
            <Skeleton className="h-16 w-full rounded-xl" />

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Skeleton className="h-10 w-20 rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!service && !isLoadingService) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
        <Card className="shadow-elegant border-0">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <Briefcase className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">Service Not Found</h3>
            <p className="text-muted-foreground">The requested service could not be found.</p>
            <Button onClick={() => navigate("/admin/services")} className="rounded-xl">
              Go to Services
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/admin/services?proffessionnel_id=${proffessionnelId || service?.proffessionnel_id}`)}
          className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Edit Service</h2>
          <p className="text-muted-foreground text-sm">Service ID: {id}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="shadow-elegant border-0">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Service Details
            </CardTitle>
            <CardDescription>Update the service information below</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nom_service">Service Name *</Label>
                <Input
                  id="nom_service"
                  name="nom_service"
                  value={formData.nom_service}
                  onChange={handleInputChange}
                  placeholder="Enter service name"
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categorie">Category</Label>
                <Input
                  id="categorie"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleInputChange}
                  placeholder="Enter category"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_service">Description</Label>
              <Textarea
                id="description_service"
                name="description_service"
                value={formData.description_service}
                onChange={handleInputChange}
                placeholder="Enter service description"
                rows={4}
                className="rounded-xl resize-none"
              />
            </div>

            {/* Price and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="prix_service">Price (DZD) *</Label>
                <Input
                  id="prix_service"
                  name="prix_service"
                  type="number"
                  min="0"
                  value={formData.prix_service}
                  onChange={handleInputChange}
                  placeholder="0"
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duree_moyenne">Average Duration (minutes) *</Label>
                <Input
                  id="duree_moyenne"
                  name="duree_moyenne"
                  type="number"
                  min="1"
                  value={formData.duree_moyenne}
                  onChange={handleInputChange}
                  placeholder="30"
                  required
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Scheduling Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jours_de_travail">Working Days</Label>
                <Input
                  id="jours_de_travail"
                  name="jours_de_travail"
                  value={formData.jours_de_travail}
                  onChange={handleInputChange}
                  placeholder="e.g., Mon-Fri"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jours_de_repos">Rest Days</Label>
                <Input
                  id="jours_de_repos"
                  name="jours_de_repos"
                  value={formData.jours_de_repos}
                  onChange={handleInputChange}
                  placeholder="e.g., Sat-Sun"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jours_de_conge">Holiday Days</Label>
                <Input
                  id="jours_de_conge"
                  name="jours_de_conge"
                  value={formData.jours_de_conge}
                  onChange={handleInputChange}
                  placeholder="e.g., 25 Dec"
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2">
              <Label htmlFor="options">Options</Label>
              <Textarea
                id="options"
                name="options"
                value={formData.options}
                onChange={handleInputChange}
                placeholder="Enter service options (JSON or comma-separated)"
                rows={3}
                className="rounded-xl resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Service Image</Label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-40 w-40 object-cover rounded-xl border border-border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between rounded-xl border border-border p-4">
              <div>
                <Label htmlFor="actif" className="font-medium">Active Status</Label>
                <p className="text-sm text-muted-foreground">Enable this service for customers</p>
              </div>
              <Switch
                id="actif"
                checked={formData.actif}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, actif: checked }))}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/admin/services?proffessionnel_id=${proffessionnelId || service?.proffessionnel_id}`)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !formData.nom_service}
                className="rounded-xl gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Service
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
