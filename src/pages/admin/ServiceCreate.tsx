/**
 * Service Create Page
 * 
 * Admin page for creating a new service.
 */

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateService } from "@/hooks/admin/useServices";
import { useCategories } from "@/hooks/admin/useCategories";
import { 
  Briefcase,
  ArrowLeft,
  Loader2,
  Upload,
  X,
  Save
} from "lucide-react";

const DAYS_OF_WEEK = [
  { id: "lundi", label: "Lundi" },
  { id: "mardi", label: "Mardi" },
  { id: "mercredi", label: "Mercredi" },
  { id: "jeudi", label: "Jeudi" },
  { id: "vendredi", label: "Vendredi" },
  { id: "samedi", label: "Samedi" },
  { id: "dimanche", label: "Dimanche" },
];

export default function ServiceCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const proffessionnelId = searchParams.get("proffessionnel_id") || "";
  
  const { mutate: createService, isPending } = useCreateService();
  const { categories, isLoading: categoriesLoading } = useCategories();

  const [formData, setFormData] = useState({
    nom_service: "",
    description_service: "",
    prix_service: 0,
    duree_moyenne: 30,
    actif: true,
    options: [] as string[],
    jours_de_travail: [] as string[],
    jours_de_repos: [] as string[],
    jours_de_conge: [] as string[],
    categorie: "",
  });

  const [optionInput, setOptionInput] = useState("");
  const [holidayInput, setHolidayInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "prix_service" || name === "duree_moyenne" ? Number(value) : value
    }));
  };

  const handleDayToggle = (day: string, field: "jours_de_travail" | "jours_de_repos") => {
    setFormData(prev => {
      const currentDays = prev[field];
      const otherField = field === "jours_de_travail" ? "jours_de_repos" : "jours_de_travail";
      
      if (currentDays.includes(day)) {
        return { ...prev, [field]: currentDays.filter(d => d !== day) };
      } else {
        // Remove from other field if present and add to current field
        return {
          ...prev,
          [field]: [...currentDays, day],
          [otherField]: prev[otherField].filter(d => d !== day)
        };
      }
    });
  };

  const addOption = () => {
    if (optionInput.trim() && !formData.options.includes(optionInput.trim())) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, optionInput.trim()]
      }));
      setOptionInput("");
    }
  };

  const removeOption = (option: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter(o => o !== option)
    }));
  };

  const addHoliday = () => {
    if (holidayInput.trim() && !formData.jours_de_conge.includes(holidayInput.trim())) {
      setFormData(prev => ({
        ...prev,
        jours_de_conge: [...prev.jours_de_conge, holidayInput.trim()]
      }));
      setHolidayInput("");
    }
  };

  const removeHoliday = (holiday: string) => {
    setFormData(prev => ({
      ...prev,
      jours_de_conge: prev.jours_de_conge.filter(h => h !== holiday)
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
    
    const data = new FormData();
    data.append("nom_service", formData.nom_service);
    data.append("description_service", formData.description_service);
    data.append("prix_service", formData.prix_service.toString());
    data.append("duree_moyenne", formData.duree_moyenne.toString());
    data.append("actif", formData.actif.toString());
    
    // Convert arrays to JSON strings for the API
    data.append("options", JSON.stringify(formData.options));
    data.append("jours_de_travail", JSON.stringify(formData.jours_de_travail));
    data.append("jours_de_repos", JSON.stringify(formData.jours_de_repos));
    data.append("jours_de_conge", JSON.stringify(formData.jours_de_conge));
    data.append("categorie", formData.categorie);
    data.append("professionnel_id", proffessionnelId);
    
    if (imageFile) {
      data.append("photo_principale", imageFile);
    }

    createService(data, {
      onSuccess: () => {
        navigate(`/admin/services?proffessionnel_id=${proffessionnelId}`);
      },
    });
  };

  if (!proffessionnelId) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
        <Card className="shadow-elegant border-0">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <Briefcase className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">ID professionnel requis</h3>
            <p className="text-muted-foreground">Veuillez fournir un ID professionnel pour créer un service.</p>
            <Button onClick={() => navigate("/admin/services")} className="rounded-xl">
              Aller aux services
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
          onClick={() => navigate(`/admin/services?proffessionnel_id=${proffessionnelId}`)}
          className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Créer un service</h2>
          <p className="text-muted-foreground text-sm">Professionnel: {proffessionnelId}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="shadow-elegant border-0">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Détails du service
            </CardTitle>
            <CardDescription>Remplissez les informations du service ci-dessous</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nom_service">Nom du service *</Label>
                <Input
                  id="nom_service"
                  name="nom_service"
                  value={formData.nom_service}
                  onChange={handleInputChange}
                  placeholder="Entrez le nom du service"
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categorie">Catégorie *</Label>
                <Select
                  value={formData.categorie}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, categorie: value }))}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder={categoriesLoading ? "Chargement..." : "Sélectionner une catégorie"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem 
                        key={category.categorie_id} 
                        value={String(category.categorie_id)}
                      >
                        {category.nom_categorie}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_service">Description</Label>
              <Textarea
                id="description_service"
                name="description_service"
                value={formData.description_service}
                onChange={handleInputChange}
                placeholder="Entrez la description du service"
                rows={4}
                className="rounded-xl resize-none"
              />
            </div>

            {/* Price and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="prix_service">Prix (DZD) *</Label>
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
                <Label htmlFor="duree_moyenne">Durée moyenne (minutes) *</Label>
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

            {/* Working Days */}
            <div className="space-y-3">
              <Label>Jours de travail</Label>
              <div className="flex flex-wrap gap-3">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`work-${day.id}`}
                      checked={formData.jours_de_travail.includes(day.id)}
                      onCheckedChange={() => handleDayToggle(day.id, "jours_de_travail")}
                    />
                    <Label htmlFor={`work-${day.id}`} className="text-sm font-normal cursor-pointer">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Sélectionnez les jours où ce service est disponible</p>
            </div>

            {/* Rest Days */}
            <div className="space-y-3">
              <Label>Jours de repos</Label>
              <div className="flex flex-wrap gap-3">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rest-${day.id}`}
                      checked={formData.jours_de_repos.includes(day.id)}
                      onCheckedChange={() => handleDayToggle(day.id, "jours_de_repos")}
                    />
                    <Label htmlFor={`rest-${day.id}`} className="text-sm font-normal cursor-pointer">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Sélectionnez les jours de fermeture réguliers</p>
            </div>

            {/* Holiday Days */}
            <div className="space-y-3">
              <Label>Jours de congé</Label>
              <div className="flex gap-2">
                <Input
                  value={holidayInput}
                  onChange={(e) => setHolidayInput(e.target.value)}
                  placeholder="ex: 25 Déc, 1 Jan"
                  className="rounded-xl flex-1"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHoliday())}
                />
                <Button type="button" onClick={addHoliday} variant="outline" className="rounded-xl">
                  Ajouter
                </Button>
              </div>
              {formData.jours_de_conge.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.jours_de_conge.map((holiday) => (
                    <span
                      key={holiday}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                    >
                      {holiday}
                      <button
                        type="button"
                        onClick={() => removeHoliday(holiday)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">Ajoutez les jours fériés ou vacances spécifiques</p>
            </div>

            {/* Service Options/Add-ons */}
            <div className="space-y-3">
              <Label>Options supplémentaires</Label>
              <div className="flex gap-2">
                <Input
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                  placeholder="ex: Livraison express, Emballage cadeau"
                  className="rounded-xl flex-1"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addOption())}
                />
                <Button type="button" onClick={addOption} variant="outline" className="rounded-xl">
                  Ajouter
                </Button>
              </div>
              {formData.options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.options.map((option) => (
                    <span
                      key={option}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {option}
                      <button
                        type="button"
                        onClick={() => removeOption(option)}
                        className="text-primary/60 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">Options supplémentaires que les clients peuvent choisir</p>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Image du service</Label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Aperçu"
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
                        <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF jusqu'à 10 Mo</p>
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
                <Label htmlFor="actif" className="font-medium">Statut actif</Label>
                <p className="text-sm text-muted-foreground">Activer ce service pour les clients</p>
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
                onClick={() => navigate(`/admin/services?proffessionnel_id=${proffessionnelId}`)}
                className="rounded-xl"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isPending || !formData.nom_service || !formData.categorie}
                className="rounded-xl gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Créer le service
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
