import { useState } from "react";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  MoreVertical, 
  Pause, 
  Play, 
  Trash2, 
  Search,
  Users,
  Clock,
  TrendingUp,
  Settings,
  Eye,
  Edit,
  Copy,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  Timer,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw,
  Download,
  Bell
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminTranslation } from "@/contexts/AdminTranslationContext";

function ManageContent() {
  const { t } = useAdminTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const stats = [
    {
      title: t.totalQueues,
      value: "24",
      change: "+4",
      trend: "up",
      icon: Users,
      description: t.activeServiceQueues
    },
    {
      title: t.totalCustomers,
      value: "1 247",
      change: "+18,2%",
      trend: "up",
      icon: TrendingUp,
      description: t.currentlyInQueues
    },
    {
      title: t.avgWaitTime,
      value: "6,8m",
      change: "-1,5m",
      trend: "down",
      icon: Clock,
      description: t.acrossAllQueues
    },
    {
      title: t.serviceRateStat,
      value: "96,4%",
      change: "+2,1%",
      trend: "up",
      icon: BarChart3,
      description: t.customerSatisfaction
    },
  ];

  const queues = [
    { 
      id: 1, 
      name: "Service Général", 
      description: "Bureau d'accueil principal",
      customers: 15, 
      served: 142,
      status: "active", 
      avgWait: "8 min",
      priority: "normal",
      capacity: 30,
      agents: 4,
      createdAt: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Service Prioritaire", 
      description: "Clients VIP et prioritaires",
      customers: 5, 
      served: 48,
      status: "active", 
      avgWait: "4 min",
      priority: "high",
      capacity: 15,
      agents: 2,
      createdAt: "2024-01-12"
    },
    { 
      id: 3, 
      name: "Support Client", 
      description: "Assistance technique et demandes",
      customers: 23, 
      served: 189,
      status: "active", 
      avgWait: "12 min",
      priority: "normal",
      capacity: 50,
      agents: 6,
      createdAt: "2024-01-10"
    },
    { 
      id: 4, 
      name: "Support Technique", 
      description: "Problèmes techniques avancés",
      customers: 8, 
      served: 67,
      status: "paused", 
      avgWait: "0 min",
      priority: "high",
      capacity: 20,
      agents: 3,
      createdAt: "2024-01-08"
    },
    { 
      id: 5, 
      name: "Facturation", 
      description: "Support paiement et facturation",
      customers: 12, 
      served: 98,
      status: "active", 
      avgWait: "6 min",
      priority: "normal",
      capacity: 25,
      agents: 3,
      createdAt: "2024-01-05"
    },
    { 
      id: 6, 
      name: "Nouveaux Comptes", 
      description: "Création de compte et intégration",
      customers: 7, 
      served: 34,
      status: "active", 
      avgWait: "5 min",
      priority: "low",
      capacity: 20,
      agents: 2,
      createdAt: "2024-01-02"
    },
  ];

  const filteredQueues = queues.filter(queue => {
    const matchesSearch = queue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         queue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || queue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">{t.active}</Badge>;
      case "paused":
        return <Badge className="bg-muted text-muted-foreground border-muted hover:bg-muted/80">{t.paused}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="border-destructive/30 text-destructive bg-destructive/5">{t.high}</Badge>;
      case "normal":
        return <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">{t.normal}</Badge>;
      case "low":
        return <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground bg-muted/30">{t.low}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{t.queueManagement}</h1>
          <p className="text-muted-foreground text-lg">{t.queueManagementDescription}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t.refresh}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            {t.export}
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button data-tour="create-queue-btn" className="gap-2">
                <Plus className="h-4 w-4" />
                {t.createQueue}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t.createNewQueue}</DialogTitle>
                <DialogDescription>
                  {t.createNewQueueDescription}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t.queueName}</Label>
                  <Input id="name" placeholder={t.queueNamePlaceholder} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">{t.description}</Label>
                  <Input id="description" placeholder={t.descriptionPlaceholder} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="priority">{t.priorityLevel}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectPriority} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">{t.high}</SelectItem>
                        <SelectItem value="normal">{t.normal}</SelectItem>
                        <SelectItem value="low">{t.low}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">{t.maxCapacity}</Label>
                    <Input id="capacity" type="number" placeholder="50" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="agents">{t.assignedAgents}</Label>
                  <Input id="agents" type="number" placeholder={t.numberOfAgents} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  {t.cancel}
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  {t.createQueue}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className={`flex items-center gap-0.5 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-primary' : 'text-destructive'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="grid" className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search and Filters */}
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.searchQueues}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allStatus}</SelectItem>
                <SelectItem value="active">{t.active}</SelectItem>
                <SelectItem value="paused">{t.paused}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <TabsList className="bg-muted/50">
            <TabsTrigger value="grid" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              {t.cards}
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-2">
              <Settings className="h-4 w-4" />
              {t.table}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Grid View */}
        <TabsContent value="grid" className="mt-0">
          <div data-tour="queue-list" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredQueues.map((queue) => (
              <Card 
                key={queue.id} 
                className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {queue.name}
                      </CardTitle>
                      <CardDescription>{queue.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          {t.viewDetails}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          {t.editQueue}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Copy className="h-4 w-4" />
                          {t.duplicate}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Bell className="h-4 w-4" />
                          {t.notifications}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          {queue.status === "active" ? (
                            <>
                              <Pause className="h-4 w-4" />
                              {t.pauseQueue}
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" />
                              {t.resumeQueue}
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          {t.deleteQueue}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    {getStatusBadge(queue.status)}
                    {getPriorityBadge(queue.priority)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Capacity Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t.queueCapacity}</span>
                      <span className="font-medium">{queue.customers}/{queue.capacity}</span>
                    </div>
                    <Progress 
                      value={(queue.customers / queue.capacity) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Users className="h-3 w-3" />
                      </div>
                      <p className="text-lg font-bold text-foreground">{queue.customers}</p>
                      <p className="text-xs text-muted-foreground">{t.waiting}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Clock className="h-3 w-3" />
                      </div>
                      <p className="text-lg font-bold text-foreground">{queue.avgWait}</p>
                      <p className="text-xs text-muted-foreground">{t.avgWait}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <p className="text-lg font-bold text-foreground">{queue.served}</p>
                      <p className="text-xs text-muted-foreground">{t.served}</p>
                    </div>
                  </div>

                  {/* Agents */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{queue.agents} {t.agentsAssigned}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      {t.manage}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Table View */}
        <TabsContent value="table" className="mt-0">
          <Card className="border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-semibold">{t.queueName}</TableHead>
                    <TableHead className="font-semibold">{t.status}</TableHead>
                    <TableHead className="font-semibold">{t.priority}</TableHead>
                    <TableHead className="font-semibold text-center">{t.waiting}</TableHead>
                    <TableHead className="font-semibold text-center">{t.served}</TableHead>
                    <TableHead className="font-semibold">{t.avgWait}</TableHead>
                    <TableHead className="font-semibold text-center">{t.agents}</TableHead>
                    <TableHead className="font-semibold text-center">{t.capacity}</TableHead>
                    <TableHead className="font-semibold text-right">{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQueues.map((queue) => (
                    <TableRow key={queue.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{queue.name}</p>
                          <p className="text-xs text-muted-foreground">{queue.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(queue.status)}</TableCell>
                      <TableCell>{getPriorityBadge(queue.priority)}</TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold">{queue.customers}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-muted-foreground">{queue.served}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Timer className="h-3 w-3 text-muted-foreground" />
                          <span>{queue.avgWait}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{queue.agents}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(queue.customers / queue.capacity) * 100} 
                            className="h-1.5 w-16"
                          />
                          <span className="text-xs text-muted-foreground">{queue.capacity}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" />
                              {t.viewDetails}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              {t.editQueue}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                              {queue.status === "active" ? (
                                <>
                                  <Pause className="h-4 w-4" />
                                  {t.pauseQueue}
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4" />
                                  {t.resumeQueue}
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                              <Trash2 className="h-4 w-4" />
                              {t.deleteQueue}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {filteredQueues.length === 0 && (
        <Card className="border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 rounded-full bg-muted/50 mb-4">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.noQueuesFound}</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-6">
              {searchQuery || statusFilter !== "all" 
                ? t.adjustSearchCriteria
                : t.getStartedCreateQueue
              }
            </p>
            <Button className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              {t.createQueue}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function Manage() {
  return (
    <DashboardLayout>
      <ManageContent />
    </DashboardLayout>
  );
}
