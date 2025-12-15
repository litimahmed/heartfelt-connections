import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Edit, Trash2, UserCheck, UserX, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    useProfessionals,
    useDeleteProfessional,
    useActivateProfessional,
    useDeactivateProfessional,
} from "@/hooks/admin/useProfessionals";
import { TableSkeleton } from "@/components/admin/TableSkeleton";

const ProfessionalList = () => {
    const navigate = useNavigate();
    const { professionals, isLoading, error } = useProfessionals();
    const deleteMutation = useDeleteProfessional();
    const activateMutation = useActivateProfessional();
    const deactivateMutation = useDeactivateProfessional();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setSelectedId(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedId) {
            deleteMutation.mutate(selectedId);
            setDeleteDialogOpen(false);
            setSelectedId(null);
        }
    };

    const handleActivate = (id: string) => {
        activateMutation.mutate(id);
    };

    const handleDeactivate = (id: string) => {
        deactivateMutation.mutate(id);
    };

    // Show loading state with skeleton
    if (isLoading) {
        return (
            <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate("/admin/dashboard")}
                        className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">Professionnels</h2>
                        <p className="text-muted-foreground text-sm">Gérer les professionnels</p>
                    </div>
                </div>
                <Card className="shadow-elegant border-0">
                    <CardHeader className="border-b border-border/50 bg-muted/30">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Users className="h-5 w-5 text-primary" />
                            Liste des Professionnels
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <TableSkeleton columns={6} rows={5} showAvatar={true} />
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Only show error for actual network/server errors, not 404 (empty state)
    if (error) {
        return (
            <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate("/admin/dashboard")}
                        className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">Professionnels</h2>
                        <p className="text-muted-foreground text-sm">Gérer les professionnels</p>
                    </div>
                </div>
                <Card className="shadow-elegant border-0 bg-gradient-to-br from-card to-card/80">
                    <CardContent className="flex flex-col items-center justify-center py-16 space-y-6">
                        <div className="rounded-2xl bg-gradient-to-br from-destructive/10 to-destructive/5 p-8 ring-1 ring-destructive/20">
                            <Users className="h-16 w-16 text-destructive" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-semibold">Erreur de chargement</h3>
                            <p className="text-muted-foreground max-w-md">
                                Impossible de charger les professionnels. Veuillez vérifier votre connexion et réessayer.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => navigate("/admin/dashboard")}
                                variant="outline"
                                className="gap-2 rounded-xl"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Retour
                            </Button>
                            <Button
                                onClick={() => window.location.reload()}
                                variant="default"
                                className="gap-2 rounded-xl"
                            >
                                Réessayer
                            </Button>
                        </div>
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
                        onClick={() => navigate("/admin/dashboard")}
                        className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">Professionnels</h2>
                        <p className="text-muted-foreground text-sm">Gérer les professionnels</p>
                    </div>
                </div>
                <Button
                    onClick={() => navigate("/admin/professionals/create")}
                    className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                    <Plus className="h-4 w-4" />
                    Ajouter
                </Button>
            </div>

            <Card className="shadow-elegant border-0">
                <CardHeader className="border-b border-border/50 bg-muted/30">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Users className="h-5 w-5 text-primary" />
                                Liste des Professionnels
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                {professionals?.length || 0} professionnels
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {professionals && professionals.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/20 hover:bg-muted/20">
                                        <TableHead className="font-semibold">Nom</TableHead>
                                        <TableHead className="font-semibold">Email</TableHead>
                                        <TableHead className="font-semibold">Téléphone</TableHead>
                                        <TableHead className="font-semibold">Ville</TableHead>
                                        <TableHead className="font-semibold">Catégorie</TableHead>
                                        <TableHead className="text-right font-semibold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {professionals.map((professional) => (
                                        <TableRow key={professional.professionnel_id} className="group hover:bg-muted/50 transition-colors">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Users className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <span>{professional.prenom} {professional.nom}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{professional.email}</TableCell>
                                            <TableCell className="text-muted-foreground">{professional.telephone}</TableCell>
                                            <TableCell className="text-muted-foreground">{professional.ville}</TableCell>
                                            <TableCell>
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {professional.categorie}
                        </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            navigate(`/admin/professionals/${professional.professionnel_id}`)
                                                        }
                                                        title="Voir"
                                                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            navigate(`/admin/professionals/${professional.professionnel_id}/edit`)
                                                        }
                                                        title="Modifier"
                                                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleActivate(professional.professionnel_id)}
                                                        title="Activer"
                                                        disabled={professional.actif === true}
                                                        className={`h-8 w-8 rounded-lg ${
                                                            professional.actif === true
                                                                ? "text-muted-foreground/50 cursor-not-allowed"
                                                                : "text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600"
                                                        }`}
                                                    >
                                                        <UserCheck className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDeactivate(professional.professionnel_id)}
                                                        title="Désactiver"
                                                        disabled={professional.actif === false}
                                                        className={`h-8 w-8 rounded-lg ${
                                                            professional.actif === false
                                                                ? "text-muted-foreground/50 cursor-not-allowed"
                                                                : "text-amber-600 hover:bg-amber-500/10 hover:text-amber-600"
                                                        }`}
                                                    >
                                                        <UserX className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(professional.professionnel_id)}
                                                        title="Supprimer"
                                                        className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 space-y-6">
                            <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 ring-1 ring-primary/20">
                                <Users className="h-16 w-16 text-primary" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-semibold">Aucun professionnel</h3>
                                <p className="text-muted-foreground max-w-md">
                                    Il n'y a pas encore de professionnels enregistrés. Commencez par en créer un.
                                </p>
                            </div>
                            <Button
                                onClick={() => navigate("/admin/professionals/create")}
                                className="gap-2 rounded-xl"
                            >
                                <Plus className="h-4 w-4" />
                                Créer un professionnel
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer ce professionnel ? Cette action est
                            irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ProfessionalList;
