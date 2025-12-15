/**
 * Category List Page
 *
 * Admin page for viewing and managing categories.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCategories, useDeleteCategory, useSuspendCategory, useResumeCategory } from "@/hooks/admin/useCategories";
import {
    FolderTree,
    Edit,
    Plus,
    Trash2,
    ArrowLeft,
    ArrowUpDown,
    Search,
    Filter,
    Pause,
    Play,
    CheckCircle,
    XCircle,
    MoreHorizontal,
    Palette,
    Hash
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Category } from "@/types/admin/category";
import { TableSkeleton } from "@/components/admin/TableSkeleton";

export default function CategoryList() {
    const navigate = useNavigate();
    const { categories, count, isLoading, refetch } = useCategories();
    const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
    const { mutate: suspendCategory, isPending: isSuspending } = useSuspendCategory();
    const { mutate: resumeCategory, isPending: isResuming } = useResumeCategory();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
    const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleDeleteClick = (category: Category) => {
        setSelectedCategory(category);
        setDeleteDialogOpen(true);
    };

    const handleSuspendClick = (category: Category) => {
        setSelectedCategory(category);
        setSuspendDialogOpen(true);
    };

    const handleResumeClick = (category: Category) => {
        setSelectedCategory(category);
        setResumeDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!selectedCategory) return;
        deleteCategory(selectedCategory.categorie_id, {
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setSelectedCategory(null);
                refetch();
            },
            onError: () => {
                setDeleteDialogOpen(false);
                setSelectedCategory(null);
            },
        });
    };

    const handleSuspendConfirm = () => {
        if (!selectedCategory) return;
        suspendCategory(selectedCategory.categorie_id, {
            onSuccess: () => {
                setSuspendDialogOpen(false);
                setSelectedCategory(null);
                refetch();
            },
            onError: () => {
                setSuspendDialogOpen(false);
                setSelectedCategory(null);
            },
        });
    };

    const handleResumeConfirm = () => {
        if (!selectedCategory) return;
        resumeCategory(selectedCategory.categorie_id, {
            onSuccess: () => {
                setResumeDialogOpen(false);
                setSelectedCategory(null);
                refetch();
            },
            onError: () => {
                setResumeDialogOpen(false);
                setSelectedCategory(null);
            },
        });
    };

    const filteredCategories = categories.filter((category: Category) =>
        category.nom_categorie.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description_categorie.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeCount = categories.filter((c: Category) => c.active).length;
    const inactiveCount = categories.filter((c: Category) => !c.active).length;

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
                        <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
                        <p className="text-muted-foreground text-sm">Loading categories...</p>
                    </div>
                </div>
                <Card className="shadow-elegant border-0">
                    <CardHeader className="border-b border-border/50 bg-muted/30">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FolderTree className="h-5 w-5 text-primary" />
                            Category Directory
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <TableSkeleton columns={8} rows={5} showAvatar={true} />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!categories || categories.length === 0) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
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
                        <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
                        <p className="text-muted-foreground text-sm">No categories found</p>
                    </div>
                </div>

                <Card className="shadow-elegant border-0 bg-gradient-to-br from-card to-card/80">
                    <CardContent className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 ring-1 ring-primary/20">
                            <FolderTree className="h-16 w-16 text-primary" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-semibold">No Categories Yet</h3>
                            <p className="text-muted-foreground max-w-md">
                                Start organizing your content by creating your first category
                            </p>
                        </div>
                        <Button
                            onClick={() => navigate("/admin/categories/create")}
                            size="lg"
                            className="gap-2 mt-4 rounded-xl px-8 shadow-lg hover:shadow-xl transition-all"
                        >
                            <Plus className="h-5 w-5" />
                            Create First Category
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
                {/* Header Section */}
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
                            <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
                            <p className="text-muted-foreground text-sm">Organize and manage content categories</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => navigate("/admin/categories/create")}
                        className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                        <Plus className="h-4 w-4" />
                        Add Category
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            label: "Total Categories",
                            value: count,
                            icon: FolderTree,
                            color: "primary"
                        },
                        {
                            label: "Active",
                            value: activeCount,
                            icon: CheckCircle,
                            color: "emerald"
                        },
                        {
                            label: "Inactive",
                            value: inactiveCount,
                            icon: XCircle,
                            color: "amber"
                        },
                        {
                            label: "Max Order",
                            value: categories.length > 0 ? Math.max(...categories.map((c: Category) => c.ordre_affichage)) : 0,
                            icon: ArrowUpDown,
                            color: "violet"
                        }
                    ].map((stat) => (
                        <Card
                            key={stat.label}
                            className="relative overflow-hidden border border-border/50 bg-card hover:shadow-lg transition-all duration-300"
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                        <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                                    </div>
                                    <div className={`rounded-xl p-3 ${
                                        stat.color === "primary" ? "bg-primary/10 text-primary" :
                                            stat.color === "emerald" ? "bg-emerald-500/10 text-emerald-600" :
                                                stat.color === "amber" ? "bg-amber-500/10 text-amber-600" :
                                                    "bg-violet-500/10 text-violet-600"
                                    }`}>
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                </div>
                            </CardContent>
                            <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                                stat.color === "primary" ? "bg-primary" :
                                    stat.color === "emerald" ? "bg-emerald-500" :
                                        stat.color === "amber" ? "bg-amber-500" :
                                            "bg-violet-500"
                            }`} />
                        </Card>
                    ))}
                </div>

                {/* Main Table Card */}
                <Card className="shadow-elegant border-0">
                    <CardHeader className="border-b border-border/50 bg-muted/30">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <FolderTree className="h-5 w-5 text-primary" />
                                    Category Directory
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    {filteredCategories.length} of {count} categories
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search categories..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 w-[200px] sm:w-[260px] rounded-xl bg-background"
                                    />
                                </div>
                                <Button variant="outline" size="icon" className="rounded-xl">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/20 hover:bg-muted/20">
                                        <TableHead className="w-[100px] font-semibold">
                                            <div className="flex items-center gap-1">
                                                <Hash className="h-3.5 w-3.5" />
                                                ID
                                            </div>
                                        </TableHead>
                                        <TableHead className="w-[200px] font-semibold">Name</TableHead>
                                        <TableHead className="font-semibold">Description</TableHead>
                                        <TableHead className="w-[80px] font-semibold text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Palette className="h-3.5 w-3.5" />
                                                Color
                                            </div>
                                        </TableHead>
                                        <TableHead className="w-[80px] font-semibold text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <ArrowUpDown className="h-3.5 w-3.5" />
                                                Order
                                            </div>
                                        </TableHead>
                                        <TableHead className="w-[90px] font-semibold text-center">Status</TableHead>
                                        <TableHead className="w-[130px] font-semibold">Created</TableHead>
                                        <TableHead className="w-[100px] text-right font-semibold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCategories.map((category: Category) => (
                                        <TableRow
                                            key={category.categorie_id}
                                            className="group hover:bg-muted/50 transition-colors"
                                        >
                                            <TableCell>
                        <span className="font-mono text-sm font-medium text-foreground">
                          #{category.categorie_id}
                        </span>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-sm"
                                                        style={{ backgroundColor: category.couleur_theme }}
                                                    >
                                                        {category.nom_categorie.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="truncate max-w-[140px]">{category.nom_categorie}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-sm text-muted-foreground line-clamp-2 max-w-[250px]">
                                                    {category.description_categorie || <span className="italic">No description</span>}
                                                </p>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div
                                                        className="h-6 w-6 rounded-md border border-border shadow-sm"
                                                        style={{ backgroundColor: category.couleur_theme }}
                                                    />
                                                    <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                            {category.couleur_theme}
                          </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant="secondary"
                                                    className="font-mono tabular-nums bg-primary/10 text-primary hover:bg-primary/20"
                                                >
                                                    {category.ordre_affichage}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant={category.active ? "default" : "secondary"}
                                                    className={`rounded-lg ${category.active ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : "bg-muted text-muted-foreground"}`}
                                                >
                                                    {category.active ? "Active" : "Inactive"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div className="font-medium">
                                                        {format(new Date(category.date_creation), "MMM d, yyyy")}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {format(new Date(category.date_creation), "HH:mm")}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48 rounded-xl">
                                                        <DropdownMenuItem
                                                            onClick={() => navigate(`/admin/categories/edit/${category.categorie_id}`)}
                                                            className="gap-2 cursor-pointer"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Edit Category
                                                        </DropdownMenuItem>
                                                        {category.active ? (
                                                            <DropdownMenuItem
                                                                onClick={() => handleSuspendClick(category)}
                                                                className="gap-2 cursor-pointer text-amber-600 focus:text-amber-600"
                                                            >
                                                                <Pause className="h-4 w-4" />
                                                                Suspend Category
                                                            </DropdownMenuItem>
                                                        ) : (
                                                            <DropdownMenuItem
                                                                onClick={() => handleResumeClick(category)}
                                                                className="gap-2 cursor-pointer text-emerald-600 focus:text-emerald-600"
                                                            >
                                                                <Play className="h-4 w-4" />
                                                                Activate Category
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => handleDeleteClick(category)}
                                                            className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete Category
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-destructive" />
                            Delete Category
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to permanently delete <strong>"{selectedCategory?.nom_categorie}"</strong>?
                            This action cannot be undone and may affect related content.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting} className="rounded-xl">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl gap-2"
                        >
                            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Suspend Confirmation Dialog */}
            <AlertDialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <Pause className="h-5 w-5 text-amber-600" />
                            Suspend Category
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to suspend <strong>"{selectedCategory?.nom_categorie}"</strong>?
                            This will deactivate the category without deleting it. You can reactivate it later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isSuspending} className="rounded-xl">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleSuspendConfirm}
                            disabled={isSuspending}
                            className="bg-amber-600 text-white hover:bg-amber-700 rounded-xl gap-2"
                        >
                            {isSuspending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pause className="h-4 w-4" />}
                            Suspend
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Resume/Activate Confirmation Dialog */}
            <AlertDialog open={resumeDialogOpen} onOpenChange={setResumeDialogOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <Play className="h-5 w-5 text-emerald-600" />
                            Activate Category
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to activate <strong>"{selectedCategory?.nom_categorie}"</strong>?
                            This will make the category visible and available again.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isResuming} className="rounded-xl">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleResumeConfirm}
                            disabled={isResuming}
                            className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl gap-2"
                        >
                            {isResuming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                            Activate
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
