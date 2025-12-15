import { useState } from "react";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { useProfile } from "@/hooks/admin/useProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    User,
    Mail,
    Phone,
    Shield,
    Calendar,
    Building2,
    MapPin,
    Globe,
    Pencil,
    Loader2
} from "lucide-react";
import { format } from "date-fns";
import { useAdminTranslation } from "@/contexts/AdminTranslationContext";

const ProfileSkeleton = () => (
    <div className="space-y-6">
        {/* Header Skeleton */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <Skeleton className="h-28 w-28 rounded-full" />
                    <div className="text-center md:text-left space-y-3 flex-1">
                        <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
                        <Skeleton className="h-5 w-64 mx-auto md:mx-0" />
                        <div className="flex gap-2 justify-center md:justify-start">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Info Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
                <Card key={i} className="border shadow-sm">
                    <CardHeader className="pb-4">
                        <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2, 3].map((j) => (
                            <div key={j} className="flex items-center gap-4">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-5 w-40" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

const ProfileContent = () => {
    const { profile, isLoading, error, updateProfile, isUpdating } = useProfile();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editForm, setEditForm] = useState({ nom: "", numero_telephone: "" });
    const { t } = useAdminTranslation();

    const getAccessLevelLabel = (level: string) => {
        const levels: Record<string, string> = {
            'Super_A': 'Super Admin',
            'Admin': 'Administrator',
            'Moderator': 'Moderator',
            'User': 'User',
        };
        return levels[level] || level;
    };

    const getAccountStatusLabel = (status: string) => {
        const statuses: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
            'A': { label: 'Active', variant: 'default' },
            'I': { label: 'Inactive', variant: 'secondary' },
            'S': { label: 'Suspended', variant: 'destructive' },
        };
        return statuses[status] || { label: status, variant: 'outline' as const };
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleOpenEditDialog = () => {
        if (profile) {
            setEditForm({
                nom: profile.nom,
                numero_telephone: profile.numero_telephone,
            });
            setIsEditDialogOpen(true);
        }
    };

    const handleSaveProfile = () => {
        updateProfile(editForm, {
            onSuccess: () => {
                setIsEditDialogOpen(false);
            },
        });
    };

    if (error) {
        return (
            <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="p-6 text-center text-destructive">
                    {t.failedToLoadProfile}
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            {isLoading ? (
                <ProfileSkeleton />
            ) : profile ? (
                <div className="space-y-6">
                    {/* Profile Header Card */}
                    <Card className="border-0 shadow-md bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
                        <CardContent className="p-8 relative">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                            <div className="relative flex flex-col md:flex-row items-center gap-6">
                                <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                                        {getInitials(profile.nom)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="text-center md:text-left flex-1">
                                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                                        {profile.nom}
                                    </h1>
                                    <p className="text-muted-foreground mb-3">{profile.email}</p>

                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                        {profile.est_super_admin ? (
                                            <Badge variant="default" className="bg-primary/90 hover:bg-primary">
                                                <Shield className="h-3 w-3 mr-1" />
                                                Super Admin
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                {getAccessLevelLabel(profile.niveau_acces)}
                                            </Badge>
                                        )}
                                        <Badge variant={getAccountStatusLabel(profile.etat_compte).variant}>
                                            {getAccountStatusLabel(profile.etat_compte).label}
                                        </Badge>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleOpenEditDialog}
                                    className="absolute top-4 right-4 md:relative md:top-0 md:right-0"
                                    variant="outline"
                                    size="sm"
                                >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    {t.editProfile}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Info Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Information */}
                        <Card className="border shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <User className="h-4 w-4 text-primary" />
                                    </div>
                                    {t.contactInformation}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.email}</p>
                                        <p className="text-sm font-medium text-foreground">{profile.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.phone}</p>
                                        <p className="text-sm font-medium text-foreground">{profile.numero_telephone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-purple-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.location}</p>
                                        <p className="text-sm font-medium text-foreground">Algeria</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Details */}
                        <Card className="border shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Shield className="h-4 w-4 text-primary" />
                                    </div>
                                    {t.accountDetails}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                        <Shield className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.accessLevel}</p>
                                        <p className="text-sm font-medium text-foreground">{getAccessLevelLabel(profile.niveau_acces)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                        <Calendar className="h-5 w-5 text-cyan-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.memberSince}</p>
                                        <p className="text-sm font-medium text-foreground">
                                            {format(new Date(profile.date_creation), 'MMMM dd, yyyy')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="h-10 w-10 rounded-lg bg-rose-500/10 flex items-center justify-center">
                                        <Building2 className="h-5 w-5 text-rose-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.organization}</p>
                                        <p className="text-sm font-medium text-foreground">Toorrii</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Additional Info Card */}
                    <Card className="border shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Globe className="h-4 w-4 text-primary" />
                                </div>
                                {t.preferences}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-4 rounded-lg bg-muted/30 text-center">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{t.languagePreference}</p>
                                    <p className="text-sm font-medium text-foreground">English</p>
                                </div>
                                <div className="p-4 rounded-lg bg-muted/30 text-center">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{t.timezone}</p>
                                    <p className="text-sm font-medium text-foreground">UTC+1 (Algiers)</p>
                                </div>
                                <div className="p-4 rounded-lg bg-muted/30 text-center">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{t.theme}</p>
                                    <p className="text-sm font-medium text-foreground">System</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : null}

            {/* Edit Profile Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{t.editProfile}</DialogTitle>
                        <DialogDescription>
                            {t.updateProfileInfo}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="nom">{t.name}</Label>
                            <Input
                                id="nom"
                                value={editForm.nom}
                                onChange={(e) => setEditForm(prev => ({ ...prev, nom: e.target.value }))}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">{t.phoneNumber}</Label>
                            <Input
                                id="phone"
                                value={editForm.numero_telephone}
                                onChange={(e) => setEditForm(prev => ({ ...prev, numero_telephone: e.target.value }))}
                                placeholder="Enter your phone number"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                            disabled={isUpdating}
                        >
                            {t.cancel}
                        </Button>
                        <Button
                            onClick={handleSaveProfile}
                            disabled={isUpdating || !editForm.nom.trim() || !editForm.numero_telephone.trim()}
                        >
                            {isUpdating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            {t.saveChanges}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

const Profile = () => {
    return (
        <DashboardLayout>
            <ProfileContent />
        </DashboardLayout>
    );
};

export default Profile;