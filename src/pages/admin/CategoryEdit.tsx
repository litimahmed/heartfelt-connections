/**
 * Category Edit Page
 * 
 * Admin page for editing an existing category.
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCategories, useUpdateCategory } from "@/hooks/admin/useCategories";
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  FolderTree,
  Palette,
  Image,
  Hash,
  FileText,
  ToggleLeft,
  Calendar,
  Upload,
  X
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const categorySchema = z.object({
  nom_categorie: z.string().min(1, "Category name is required").max(100, "Name must be less than 100 characters"),
  description_categorie: z.string().max(500, "Description must be less than 500 characters"),
  couleur_theme: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (e.g., #FF3355)"),
  ordre_affichage: z.number().min(0, "Order must be positive").max(2147483647, "Order exceeds maximum value"),
  active: z.boolean(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CategoryEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { mutate: updateCategory, isPending } = useUpdateCategory();
  const [colorPreview, setColorPreview] = useState("#3B82F6");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const category = categories.find((c) => c.categorie_id.toString() === id);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nom_categorie: "",
      description_categorie: "",
      couleur_theme: "#3B82F6",
      ordre_affichage: 1,
      active: true,
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        nom_categorie: category.nom_categorie,
        description_categorie: category.description_categorie,
        couleur_theme: category.couleur_theme,
        ordre_affichage: category.ordre_affichage,
        active: category.active,
      });
      setColorPreview(category.couleur_theme);
      if (category.photo_principale_cat) {
        setExistingImageUrl(category.photo_principale_cat);
      }
    }
  }, [category, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setExistingImageUrl(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setExistingImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: CategoryFormData) => {
    if (!id) return;
    
    const formData = new FormData();
    formData.append("nom_categorie", data.nom_categorie);
    formData.append("description_categorie", data.description_categorie);
    formData.append("couleur_theme", data.couleur_theme);
    formData.append("ordre_affichage", data.ordre_affichage.toString());
    formData.append("active", data.active.toString());
    
    if (selectedFile) {
      formData.append("photo_principale_cat", selectedFile);
    }

    updateCategory(
      { categoryId: id, formData },
      {
        onSuccess: () => {
          navigate("/admin/categories");
        },
      }
    );
  };

  if (isLoadingCategories) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-36" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16 rounded-lg" />
            <Skeleton className="h-6 w-12 rounded-lg" />
          </div>
        </div>

        {/* Metadata Card Skeleton */}
        <Card className="shadow-md border-0 bg-gradient-to-br from-muted/30 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center gap-6">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
          </CardContent>
        </Card>

        {/* Form Card Skeleton */}
        <Card className="shadow-elegant border-0">
          <CardHeader className="border-b border-border/50 bg-muted/30">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-52" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Category Name */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-3 w-48" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-3 w-56" />
            </div>

            {/* Two Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 flex-1 rounded-xl" />
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
                <Skeleton className="h-3 w-44" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-3 w-44" />
              </div>
            </div>

            {/* Photo */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-40 w-full max-w-xs rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
            </div>

            {/* Active Status */}
            <Skeleton className="h-16 w-full rounded-xl" />

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
              <Skeleton className="h-10 w-20 rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/categories")}
            className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Category Not Found</h2>
            <p className="text-muted-foreground text-sm">The requested category does not exist</p>
          </div>
        </div>
      </div>
    );
  }

  const displayImageUrl = previewUrl || existingImageUrl;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/categories")}
            className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Edit Category</h2>
            <p className="text-muted-foreground text-sm">Modify category details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={category.active ? "default" : "secondary"} className="rounded-lg">
            {category.active ? "Active" : "Inactive"}
          </Badge>
          <Badge variant="outline" className="rounded-lg font-mono">
            #{category.categorie_id}
          </Badge>
        </div>
      </div>

      {/* Metadata Card */}
      <Card className="shadow-md border-0 bg-gradient-to-br from-muted/30 to-transparent">
        <CardContent className="p-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Created:</span>
              <span className="font-medium">{format(new Date(category.date_creation), "MMM d, yyyy HH:mm")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Card */}
      <Card className="shadow-elegant border-0">
        <CardHeader className="border-b border-border/50 bg-muted/30">
          <div className="flex items-center gap-3">
            <div 
              className="rounded-xl p-2.5"
              style={{ backgroundColor: `${colorPreview}20` }}
            >
              <FolderTree className="h-5 w-5" style={{ color: colorPreview }} />
            </div>
            <div>
              <CardTitle className="text-lg">Category Details</CardTitle>
              <CardDescription>Update the information for this category</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Category Name */}
              <FormField
                control={form.control}
                name="nom_categorie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Category Name *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter category name" 
                        className="rounded-xl"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      The display name for this category
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description_categorie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter category description" 
                        className="rounded-xl min-h-[100px] resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description of what this category contains
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Theme Color */}
                <FormField
                  control={form.control}
                  name="couleur_theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-muted-foreground" />
                        Theme Color *
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-3">
                          <Input 
                            placeholder="#FF3355" 
                            className="rounded-xl flex-1"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                                setColorPreview(e.target.value);
                              }
                            }}
                          />
                          <div 
                            className="h-10 w-10 rounded-xl border border-border shadow-sm transition-colors"
                            style={{ backgroundColor: colorPreview }}
                          />
                          <input 
                            type="color" 
                            value={colorPreview}
                            onChange={(e) => {
                              const color = e.target.value.toUpperCase();
                              field.onChange(color);
                              setColorPreview(color);
                            }}
                            className="h-10 w-10 rounded-xl cursor-pointer border-0"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Hex color code for the category theme
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Display Order */}
                <FormField
                  control={form.control}
                  name="ordre_affichage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        Display Order *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min={0}
                          placeholder="1" 
                          className="rounded-xl"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Order in which the category appears
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Photo Principale */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Image className="h-4 w-4 text-muted-foreground" />
                  Photo Principale
                </Label>
                
                <div className="flex flex-col gap-4">
                  {displayImageUrl ? (
                    <div className="relative w-full max-w-xs">
                      <img 
                        src={displayImageUrl} 
                        alt="Preview" 
                        className="w-full h-40 object-cover rounded-xl border border-border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-lg"
                        onClick={removeFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="w-full max-w-xs h-40 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to upload image</span>
                      <span className="text-xs text-muted-foreground/70">PNG, JPG up to 10MB</span>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-fit rounded-xl gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    {displayImageUrl ? "Change Image" : "Choose File"}
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Upload the main image for this category
                </p>
              </div>

              {/* Active Status */}
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <ToggleLeft className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <Label className="font-medium">Active Status</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable or disable this category
                          </p>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/categories")}
                  className="rounded-xl"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="gap-2 rounded-xl shadow-md"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
