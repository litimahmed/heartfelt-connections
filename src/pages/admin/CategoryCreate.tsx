/**
 * Category Create Page
 * 
 * Admin page for creating a new category.
 */

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCreateCategory } from "@/hooks/admin/useCategories";
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

const categorySchema = z.object({
  nom_categorie: z.string().min(1, "Category name is required").max(100, "Name must be less than 100 characters"),
  description_categorie: z.string().max(500, "Description must be less than 500 characters"),
  couleur_theme: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (e.g., #FF3355)"),
  ordre_affichage: z.number().min(0, "Order must be positive").max(2147483647, "Order exceeds maximum value"),
  active: z.boolean(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CategoryCreate() {
  const navigate = useNavigate();
  const { mutate: createCategory, isPending } = useCreateCategory();
  const [colorPreview, setColorPreview] = useState("#3B82F6");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: CategoryFormData) => {
    const formData = new FormData();
    formData.append("nom_categorie", data.nom_categorie);
    formData.append("description_categorie", data.description_categorie);
    formData.append("couleur_theme", data.couleur_theme);
    formData.append("ordre_affichage", data.ordre_affichage.toString());
    formData.append("active", data.active.toString());
    
    if (selectedFile) {
      formData.append("photo_principale_cat", selectedFile);
    }

    createCategory(formData, {
      onSuccess: () => {
        navigate("/admin/categories");
      },
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
      {/* Header Section */}
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
          <h2 className="text-2xl font-semibold tracking-tight">Create Category</h2>
          <p className="text-muted-foreground text-sm">Add a new category to organize content</p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="shadow-elegant border-0">
        <CardHeader className="border-b border-border/50 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <FolderTree className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Category Details</CardTitle>
              <CardDescription>Fill in the information for the new category</CardDescription>
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
                  {previewUrl ? (
                    <div className="relative w-full max-w-xs">
                      <img 
                        src={previewUrl} 
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
                  
                  {!previewUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-fit rounded-xl gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      Choose File
                    </Button>
                  )}
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
                  Create Category
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
