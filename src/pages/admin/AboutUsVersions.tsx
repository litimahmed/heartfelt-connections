import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAboutUs } from "@/hooks/admin/useAboutUs";
import { ArrowLeft, Plus, Check, X, Pencil, Power, Loader2, FileText, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton, StatCardsSkeleton } from "@/components/admin/TableSkeleton";

export default function AboutUsVersions() {
  const navigate = useNavigate();
  const { versions, isLoadingVersions, toggleActive, isToggling } = useAboutUs();

  // Helper to extract title from multilingual array
  const getTitle = (titre: any): string => {
    if (!titre) return "Untitled";
    if (typeof titre === "string") return titre;
    if (Array.isArray(titre)) {
      const enTitle = titre.find((t: any) => t.lang === "en")?.value;
      const frTitle = titre.find((t: any) => t.lang === "fr")?.value;
      return enTitle || frTitle || titre[0]?.value || "Untitled";
    }
    if (typeof titre === "object") {
      return titre.en || titre.fr || titre.ar || "Untitled";
    }
    return "Untitled";
  };

  // Helper to format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "-";
    }
  };

  const handleActivate = async (aboutId: string) => {
    try {
      await toggleActive(aboutId);
    } catch (error) {
      // Error handled in hook
    }
  };

  const activeCount = versions?.filter((v: any) => v.active === "true" || v.active === "1" || v.active === true).length || 0;
  const inactiveCount = versions?.filter((v: any) => !(v.active === "true" || v.active === "1" || v.active === true)).length || 0;

  return (
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
            <h2 className="text-2xl font-semibold tracking-tight">About Us</h2>
            <p className="text-muted-foreground text-sm">Manage your about us content versions</p>
          </div>
        </div>
        <Button 
          data-tour="create-version-btn"
          onClick={() => navigate("/admin/about-us/create")}
          className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            label: "Total Versions",
            value: versions?.length || 0,
            icon: FileText,
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
                <FileText className="h-5 w-5 text-primary" />
                Content Versions
              </CardTitle>
              <CardDescription className="mt-1">
                {versions?.length || 0} versions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoadingVersions ? (
            <TableSkeleton columns={6} rows={4} showAvatar={true} />
          ) : !versions || versions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 ring-1 ring-primary/20">
                <FileText className="h-16 w-16 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">No Versions Yet</h3>
                <p className="text-muted-foreground max-w-md">
                  No about us versions found. Create a new version to get started.
                </p>
              </div>
              <Button 
                onClick={() => navigate("/admin/about-us/create")}
                className="gap-2 rounded-xl"
              >
                <Plus className="h-4 w-4" />
                Create First Version
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableHead className="w-[50px] font-semibold">#</TableHead>
                    <TableHead className="font-semibold">Title</TableHead>
                    <TableHead className="w-[100px] font-semibold">Version</TableHead>
                    <TableHead className="w-[100px] font-semibold">Status</TableHead>
                    <TableHead className="w-[150px] font-semibold">Created</TableHead>
                    <TableHead className="w-[180px] text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {versions.map((version: any, index: number) => {
                    const isActive = version.active === "true" || version.active === "1" || version.active === true;
                    const versionId = version.about_id || (version as any).pk || (version.id ? String(version.id) : null);
                    
                    return (
                      <TableRow key={version.id || index} className="group hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <span>{getTitle(version.titre)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">v{version.version || 1}</Badge>
                        </TableCell>
                        <TableCell>
                          {isActive ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-lg">
                              <Check className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-muted text-muted-foreground rounded-lg">
                              <X className="h-3 w-3 mr-1" />
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(version.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => versionId && navigate(`/admin/about-us/edit/${versionId}`)}
                              disabled={!versionId}
                              className="gap-1.5 h-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                            {!isActive && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => versionId && handleActivate(versionId)}
                                disabled={isToggling || !versionId}
                                className="gap-1.5 h-8 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                              >
                                {isToggling ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Power className="h-3.5 w-3.5" />
                                )}
                                Activate
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}