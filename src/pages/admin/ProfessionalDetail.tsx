import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Globe, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useProfessional } from "@/hooks/admin/useProfessionals";

const ProfessionalDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { professional, isLoading, error } = useProfessional(id || "");

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Info Card */}
          <Card className="shadow-elegant border-0">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Address Card */}
          <Card className="shadow-elegant border-0">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card className="md:col-span-2 shadow-elegant border-0">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <Skeleton className="h-5 w-28" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>

          {/* Links Card */}
          <Card className="md:col-span-2 shadow-elegant border-0">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <Skeleton className="h-5 w-20" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-5 w-24" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metadata Card */}
          <Card className="md:col-span-2 shadow-elegant border-0">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !professional) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
        <Card className="shadow-elegant border-0">
          <CardContent className="p-6">
            <p className="text-destructive">Erreur lors du chargement du professionnel</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/professionals")}
            className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {professional.prenom} {professional.nom}
            </h2>
            <p className="text-muted-foreground text-sm">Détails du professionnel</p>
          </div>
        </div>
        <Button 
          onClick={() => navigate(`/admin/professionals/${id}/edit`)}
          className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <Edit className="h-4 w-4" />
          Modifier
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-elegant border-0">
          <CardHeader className="border-b border-border/50 bg-muted/30">
            <CardTitle className="text-lg">Informations Personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <p className="text-sm text-muted-foreground">Nom complet</p>
              <p className="font-medium">{professional.prenom} {professional.nom}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{professional.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p className="font-medium">{professional.telephone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Catégorie</p>
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">{professional.categorie}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant border-0">
          <CardHeader className="border-b border-border/50 bg-muted/30">
            <CardTitle className="text-lg">Adresse</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <p className="text-sm text-muted-foreground">Adresse</p>
              <p className="font-medium">{professional.adresse}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ville</p>
              <p className="font-medium">{professional.ville}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pays</p>
              <p className="font-medium">{professional.pays}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-elegant border-0">
          <CardHeader className="border-b border-border/50 bg-muted/30">
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-muted-foreground">
              {professional.description || "Aucune description"}
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-elegant border-0">
          <CardHeader className="border-b border-border/50 bg-muted/30">
            <CardTitle className="text-lg">Liens</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-4">
              {professional.siteweb && (
                <a
                  href={professional.siteweb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  Site Web
                </a>
              )}
              {professional.facebook && (
                <a
                  href={professional.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              )}
              {professional.instagram && (
                <a
                  href={professional.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              )}
              {professional.tiktok && (
                <a
                  href={professional.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  TikTok
                </a>
              )}
              {!professional.siteweb &&
                !professional.facebook &&
                !professional.instagram &&
                !professional.tiktok && (
                  <p className="text-muted-foreground">Aucun lien disponible</p>
                )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-elegant border-0">
          <CardHeader className="border-b border-border/50 bg-muted/30">
            <CardTitle className="text-lg">Métadonnées</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">ID</p>
                <p className="font-mono text-sm">{professional.professionnel_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date de création</p>
                <p className="font-medium">
                  {new Date(professional.date_creation).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDetail;
