import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePrivacyPolicy } from "@/hooks/admin/usePrivacyPolicy";
import { ArrowLeft, Plus, Check, X, Shield, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "@/components/admin/TableSkeleton";

export default function PrivacyPolicyList() {
  const navigate = useNavigate();
  const { privacyPolicies, isLoading } = usePrivacyPolicy();

  // Helper to get title from different formats
  const getTitle = (titleData: any): string => {
    if (!titleData) return "Untitled";
    if (Array.isArray(titleData)) {
      const titleObj = titleData.find((t: any) => t.lang === "en") || 
                       titleData.find((t: any) => t.lang === "fr") || 
                       titleData[0];
      return titleObj?.value || "Untitled";
    }
    if (typeof titleData === "object") {
      return titleData.en || titleData.fr || titleData.ar || "Untitled";
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

  const activeCount = privacyPolicies?.filter((p: any) => p.active).length || 0;
  const inactiveCount = privacyPolicies?.filter((p: any) => !p.active).length || 0;

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
            <h2 className="text-2xl font-semibold tracking-tight">Privacy Policy</h2>
            <p className="text-muted-foreground text-sm">Loading privacy policies...</p>
          </div>
        </div>
        <TableSkeleton columns={5} rows={4} showAvatar={true} />
      </div>
    );
  }

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
            <h2 className="text-2xl font-semibold tracking-tight">Privacy Policy</h2>
            <p className="text-muted-foreground text-sm">Manage your privacy policy versions</p>
          </div>
        </div>
        <Button 
          onClick={() => navigate("/admin/privacy-policy/create")}
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
            value: privacyPolicies?.length || 0,
            icon: Shield,
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
                <Shield className="h-5 w-5 text-primary" />
                Policy Versions
              </CardTitle>
              <CardDescription className="mt-1">
                {privacyPolicies?.length || 0} versions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {!privacyPolicies || privacyPolicies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 ring-1 ring-primary/20">
                <Shield className="h-16 w-16 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">No Policies Yet</h3>
                <p className="text-muted-foreground max-w-md">
                  No privacy policies found. Create a new version to get started.
                </p>
              </div>
              <Button 
                onClick={() => navigate("/admin/privacy-policy/create")}
                className="gap-2 rounded-xl"
              >
                <Plus className="h-4 w-4" />
                Create First Policy
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {privacyPolicies.map((policy: any, index: number) => (
                    <TableRow key={policy.politique_id || policy.id || index} className="group hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-primary" />
                          </div>
                          <span>{getTitle(policy.titre)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">v{policy.version || 1}</Badge>
                      </TableCell>
                      <TableCell>
                        {policy.active ? (
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
                        {formatDate(policy.date_creation)}
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
  );
}