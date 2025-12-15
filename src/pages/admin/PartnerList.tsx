import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePartners } from "@/hooks/admin/usePartners";
import { 
  Building2,
  Edit,
  Plus,
  Trash2,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { format } from "date-fns";
import { getMultilingualValue, PartnerResponse } from "@/types/admin/partner";
import { TableSkeleton } from "@/components/admin/TableSkeleton";

export default function PartnerList() {
  const navigate = useNavigate();
  const { partners, isLoading: loading, deletePartner: deletePartnerMutation, isDeleting } = usePartners();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<number | null>(null);

  const handleDeleteClick = (partnerId: number) => {
    setPartnerToDelete(partnerId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!partnerToDelete) return;

    try {
      await deletePartnerMutation(partnerToDelete);
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setDeleteDialogOpen(false);
      setPartnerToDelete(null);
    }
  };

  const getPartnerName = (partner: PartnerResponse) => {
    return getMultilingualValue(partner.nom_partenaire) || 'Unnamed';
  };

  const getPartnerDescription = (partner: PartnerResponse) => {
    return getMultilingualValue(partner.description) || '';
  };

  const getPartnerCity = (partner: PartnerResponse) => {
    if (!partner.adresse || !partner.adresse[0]) return '';
    return getMultilingualValue(partner.adresse[0].ville);
  };

  const activeCount = partners?.filter((p) => p.actif).length || 0;
  const inactiveCount = partners?.filter((p) => !p.actif).length || 0;

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
              <h2 className="text-2xl font-semibold tracking-tight">Partners</h2>
              <p className="text-muted-foreground text-sm">Manage all partner information</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate("/admin/partners/create")}
            className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Partner
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              label: "Total Partners",
              value: partners?.length || 0,
              icon: Building2,
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
                    "bg-amber-500/10 text-amber-600"
                  }`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                stat.color === "primary" ? "bg-primary" :
                stat.color === "emerald" ? "bg-emerald-500" :
                "bg-amber-500"
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
                  <Building2 className="h-5 w-5 text-primary" />
                  Partner Directory
                </CardTitle>
                <CardDescription className="mt-1">
                  {partners?.length || 0} partners
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <TableSkeleton columns={6} rows={4} showAvatar={true} />
            ) : !partners || partners.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 ring-1 ring-primary/20">
                  <Building2 className="h-16 w-16 text-primary" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">No Partners Yet</h3>
                  <p className="text-muted-foreground max-w-md">
                    Get started by adding your first partner.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate("/admin/partners/create")}
                  className="gap-2 rounded-xl"
                >
                  <Plus className="h-4 w-4" />
                  Add First Partner
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/20 hover:bg-muted/20">
                      <TableHead className="w-[280px] min-w-[200px] font-semibold">Partner Name</TableHead>
                      <TableHead className="w-[100px] font-semibold">Type</TableHead>
                      <TableHead className="w-[200px] font-semibold">Contact</TableHead>
                      <TableHead className="w-[160px] font-semibold">Location / Period</TableHead>
                      <TableHead className="w-[80px] font-semibold">Status</TableHead>
                      <TableHead className="w-[150px] text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partners.map((partner) => (
                      <TableRow key={partner.id} className="group hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Building2 className="h-4 w-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium truncate">{getPartnerName(partner)}</div>
                              <div className="text-xs text-muted-foreground line-clamp-2 max-w-[240px]">
                                {getPartnerDescription(partner)}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {partner.type_partenaire && (
                            <Badge variant="outline" className="text-xs whitespace-nowrap font-mono">{partner.type_partenaire}</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="flex items-center gap-1.5">
                              <Mail className="h-3 w-3 text-muted-foreground shrink-0" />
                              <span className="truncate text-xs">{partner.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Phone className="h-3 w-3 shrink-0" />
                              <span className="text-xs">{partner.telephone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="space-y-1">
                            {getPartnerCity(partner) && (
                              <div className="font-medium text-sm">{getPartnerCity(partner)}</div>
                            )}
                            {partner.date_deb && partner.date_fin && (
                              <div className="text-muted-foreground text-xs">
                                {format(new Date(partner.date_deb), "MMM yyyy")} - {format(new Date(partner.date_fin), "MMM yyyy")}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`rounded-lg ${partner.actif 
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                              : "bg-muted text-muted-foreground"}`}
                          >
                            {partner.actif ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/admin/partners/edit/${partner.id}`)}
                              className="h-8 px-2 rounded-lg hover:bg-primary/10 hover:text-primary"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteClick(partner.id!)}
                              className="h-8 px-2 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10"
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
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the partner.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}