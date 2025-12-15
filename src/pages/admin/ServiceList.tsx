/**
 * Service List Page
 * 
 * Admin page for viewing and managing services.
 */

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useServices, useDeleteService, useSuspendService } from "@/hooks/admin/useServices";
import { 
  Briefcase,
  Edit,
  Plus,
  Trash2,
  ArrowLeft,
  Search,
  Filter,
  Pause,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Clock,
  DollarSign,
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
import { Service } from "@/types/admin/service";
import { TableSkeleton } from "@/components/admin/TableSkeleton";

export default function ServiceList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const proffessionnelId = searchParams.get("proffessionnel_id") || "";
  
  const { services, count, isLoading, refetch } = useServices(proffessionnelId);
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();
  const { mutate: suspendService, isPending: isSuspending } = useSuspendService();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [professionalIdInput, setProfessionalIdInput] = useState(proffessionnelId);

  const handleSearch = () => {
    if (professionalIdInput) {
      navigate(`/admin/services?proffessionnel_id=${professionalIdInput}`);
    }
  };

  const handleDeleteClick = (service: Service) => {
    setSelectedService(service);
    setDeleteDialogOpen(true);
  };

  const handleSuspendClick = (service: Service) => {
    setSelectedService(service);
    setSuspendDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedService) return;
    deleteService(selectedService.service_id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedService(null);
        refetch();
      },
    });
  };

  const handleSuspendConfirm = () => {
    if (!selectedService) return;
    suspendService(selectedService.service_id, {
      onSuccess: () => {
        setSuspendDialogOpen(false);
        setSelectedService(null);
        refetch();
      },
    });
  };

  const filteredServices = services.filter((service: Service) =>
    service.nom_service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description_service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = services.filter((s: Service) => s.actif).length;
  const inactiveCount = services.filter((s: Service) => !s.actif).length;

  // Show professional ID input if not provided
  if (!proffessionnelId) {
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
            <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
            <p className="text-muted-foreground text-sm">Enter Professional ID to view services</p>
          </div>
        </div>

        <Card className="shadow-elegant border-0 bg-gradient-to-br from-card to-card/80">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 ring-1 ring-primary/20">
              <Briefcase className="h-16 w-16 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold">Professional ID Required</h3>
              <p className="text-muted-foreground max-w-md">
                Enter a professional ID to view and manage their services
              </p>
            </div>
            <div className="flex items-center gap-2 w-full max-w-md">
              <Input
                placeholder="Enter Professional ID..."
                value={professionalIdInput}
                onChange={(e) => setProfessionalIdInput(e.target.value)}
                className="flex-1 rounded-xl"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} className="rounded-xl gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/services")}
            className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
            <p className="text-muted-foreground text-sm">Loading services...</p>
          </div>
        </div>
        <Card className="shadow-elegant border-0">
          <CardHeader className="border-b border-border/50 bg-muted/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5 text-primary" />
              Service Directory
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TableSkeleton columns={8} rows={5} showAvatar={true} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/services")}
            className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
            <p className="text-muted-foreground text-sm">Professional: {proffessionnelId}</p>
          </div>
        </div>

        <Card className="shadow-elegant border-0 bg-gradient-to-br from-card to-card/80">
          <CardContent className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 ring-1 ring-primary/20">
              <Briefcase className="h-16 w-16 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold">No Services Yet</h3>
              <p className="text-muted-foreground max-w-md">
                Start by creating your first service for this professional
              </p>
            </div>
            <Button 
              onClick={() => navigate(`/admin/services/create?proffessionnel_id=${proffessionnelId}`)} 
              size="lg" 
              className="gap-2 mt-4 rounded-xl px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5" />
              Create First Service
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
              onClick={() => navigate("/admin/services")}
              className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
              <p className="text-muted-foreground text-sm">Professional: {proffessionnelId}</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate(`/admin/services/create?proffessionnel_id=${proffessionnelId}`)} 
            className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Services",
              value: count,
              icon: Briefcase,
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
              label: "Avg Duration",
              value: services.length > 0 ? Math.round(services.reduce((acc: number, s: Service) => acc + s.duree_moyenne, 0) / services.length) : 0,
              icon: Clock,
              color: "violet",
              suffix: "min"
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
                    <p className="text-3xl font-bold tracking-tight">
                      {stat.value}{stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
                    </p>
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
                  <Briefcase className="h-5 w-5 text-primary" />
                  Service Directory
                </CardTitle>
                <CardDescription className="mt-1">
                  {filteredServices.length} of {count} services
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search services..."
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
                    <TableHead className="w-[100px] font-semibold text-center">
                      <div className="flex items-center justify-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        Price
                      </div>
                    </TableHead>
                    <TableHead className="w-[100px] font-semibold text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Duration
                      </div>
                    </TableHead>
                    <TableHead className="w-[90px] font-semibold text-center">Status</TableHead>
                    <TableHead className="w-[130px] font-semibold">Created</TableHead>
                    <TableHead className="w-[100px] text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service: Service) => (
                    <TableRow 
                      key={service.service_id} 
                      className="group hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>
                        <span className="font-mono text-sm font-medium text-foreground">
                          #{service.service_id}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {service.photo_principale ? (
                            <img 
                              src={service.photo_principale}
                              alt={service.nom_service}
                              className="h-8 w-8 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Briefcase className="h-4 w-4 text-primary" />
                            </div>
                          )}
                          <span className="truncate max-w-[140px]">{service.nom_service}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-[250px]">
                          {service.description_service || <span className="italic">No description</span>}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="font-mono tabular-nums">
                          {service.prix_service} DZD
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant="secondary" 
                          className="font-mono tabular-nums bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {service.duree_moyenne} min
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={service.actif ? "default" : "secondary"}
                          className={`rounded-lg ${service.actif ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : "bg-muted text-muted-foreground"}`}
                        >
                          {service.actif ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {format(new Date(service.date_creation), "MMM d, yyyy")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(service.date_creation), "HH:mm")}
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
                              onClick={() => navigate(`/admin/services/edit/${service.service_id}?proffessionnel_id=${proffessionnelId}`)}
                              className="gap-2 cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                              Edit Service
                            </DropdownMenuItem>
                            {service.actif && (
                              <DropdownMenuItem
                                onClick={() => handleSuspendClick(service)}
                                className="gap-2 cursor-pointer text-amber-600 focus:text-amber-600"
                              >
                                <Pause className="h-4 w-4" />
                                Suspend Service
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(service)}
                              className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Service
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

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedService?.nom_service}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Suspend Dialog */}
      <AlertDialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to suspend "{selectedService?.nom_service}"? This will make the service inactive.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSuspendConfirm}
              disabled={isSuspending}
              className="rounded-xl bg-amber-500 text-white hover:bg-amber-600"
            >
              {isSuspending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suspending...
                </>
              ) : (
                "Suspend"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
