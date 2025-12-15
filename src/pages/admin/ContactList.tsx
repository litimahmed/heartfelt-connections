import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useContacts } from "@/hooks/admin/useContacts";
import { 
  ArrowLeft, 
  Plus, 
  Edit,
  Mail,
  Phone,
  MapPin,
  Globe,
  Check,
  MessageSquare,
  Building2,
  Clock
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "@/components/admin/TableSkeleton";

export default function ContactList() {
  const navigate = useNavigate();
  const { contact, isLoading } = useContacts();

  // Helper to get multilingual value
  const getMultilingualValue = (field: any): string => {
    if (!field) return "-";
    if (typeof field === "string") return field;
    if (typeof field === "object") {
      return field.en || field.fr || field.ar || "-";
    }
    return "-";
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

  // Count filled fields for stats
  const filledFields = contact ? [
    contact.email,
    contact.telephone_1,
    contact.telephone_2,
    contact.telephone_fixe,
    contact.adresse,
    contact.site_web,
    contact.horaires
  ].filter(Boolean).length : 0;

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
            <h2 className="text-2xl font-semibold tracking-tight">Contact Information</h2>
            <p className="text-muted-foreground text-sm">Manage your organization's contact details</p>
          </div>
        </div>
        {contact ? (
          <Button 
            onClick={() => navigate("/admin/contacts/edit")} 
            className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Edit className="h-4 w-4" />
            Edit Contact
          </Button>
        ) : (
          <Button 
            onClick={() => navigate("/admin/contacts/create")} 
            className="gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Status",
            value: contact ? "Active" : "Not Set",
            icon: MessageSquare,
            color: contact ? "emerald" : "amber"
          },
          {
            label: "Fields Filled",
            value: filledFields,
            icon: Check,
            color: "primary"
          },
          {
            label: "Phone Numbers",
            value: [contact?.telephone_1, contact?.telephone_2, contact?.telephone_fixe].filter(Boolean).length,
            icon: Phone,
            color: "violet"
          },
          {
            label: "Last Updated",
            value: contact?.date_creation ? formatDate(contact.date_creation).split(",")[0] : "-",
            icon: Clock,
            color: "primary"
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
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
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
                <MessageSquare className="h-5 w-5 text-primary" />
                Contact Details
              </CardTitle>
              <CardDescription className="mt-1">
                {contact ? "1 contact record" : "No contact configured"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <TableSkeleton columns={2} rows={6} showAvatar={true} />
          ) : !contact ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 ring-1 ring-primary/20">
                <MessageSquare className="h-16 w-16 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">No Contact Information</h3>
                <p className="text-muted-foreground max-w-md">
                  Add your contact details to get started.
                </p>
              </div>
              <Button 
                onClick={() => navigate("/admin/contacts/create")}
                className="gap-2 rounded-xl"
              >
                <Plus className="h-4 w-4" />
                Add Contact Info
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableHead className="w-[200px] font-semibold">Field</TableHead>
                    <TableHead className="font-semibold">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="group hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <span>Email</span>
                      </div>
                    </TableCell>
                    <TableCell>{contact.email || "-"}</TableCell>
                  </TableRow>
                  <TableRow className="group hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <span>Phone 1</span>
                      </div>
                    </TableCell>
                    <TableCell>{contact.telephone_1 || "-"}</TableCell>
                  </TableRow>
                  {contact.telephone_2 && (
                    <TableRow className="group hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Phone className="h-4 w-4 text-primary" />
                          </div>
                          <span>Phone 2</span>
                        </div>
                      </TableCell>
                      <TableCell>{contact.telephone_2}</TableCell>
                    </TableRow>
                  )}
                  {contact.telephone_fixe && (
                    <TableRow className="group hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Phone className="h-4 w-4 text-primary" />
                          </div>
                          <span>Landline</span>
                        </div>
                      </TableCell>
                      <TableCell>{contact.telephone_fixe}</TableCell>
                    </TableRow>
                  )}
                  <TableRow className="group hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <span>Address</span>
                      </div>
                    </TableCell>
                    <TableCell>{getMultilingualValue(contact.adresse)}</TableCell>
                  </TableRow>
                  <TableRow className="group hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <span>City / Wilaya</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getMultilingualValue(contact.ville)}
                      {contact.wilaya && `, ${getMultilingualValue(contact.wilaya)}`}
                    </TableCell>
                  </TableRow>
                  {contact.site_web && (
                    <TableRow className="group hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Globe className="h-4 w-4 text-primary" />
                          </div>
                          <span>Website</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <a 
                          href={contact.site_web} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {contact.site_web}
                        </a>
                      </TableCell>
                    </TableRow>
                  )}
                  {contact.horaires && (
                    <TableRow className="group hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <span>Working Hours</span>
                        </div>
                      </TableCell>
                      <TableCell>{contact.horaires}</TableCell>
                    </TableRow>
                  )}
                  <TableRow className="group hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <Check className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span>Status</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-lg">
                        <Check className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}