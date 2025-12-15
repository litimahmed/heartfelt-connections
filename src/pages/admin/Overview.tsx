import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Users,
    Clock,
    TrendingUp,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    UserPlus,
    AlertCircle,
    CheckCircle2,
    Timer,
    BarChart3,
    Zap,
    Shield,
    Globe,
    Server,
    Database,
    Wifi,
    Calendar,
    ChevronRight,
    Sparkles,
    Target,
    LineChart
} from "lucide-react";

export default function Overview() {
    // Statistiques principales
    const stats = [
        {
            title: "Files Actives",
            value: "24",
            change: "+4",
            trend: "up",
            icon: Users,
            description: "Cette semaine",
            progress: 80,
            bgGradient: "from-primary/10 via-primary/5 to-transparent"
        },
        {
            title: "Clients Aujourd'hui",
            value: "1,247",
            change: "+18.2%",
            trend: "up",
            icon: Activity,
            description: "vs. hier",
            progress: 92,
            bgGradient: "from-blue-500/10 via-blue-500/5 to-transparent"
        },
        {
            title: "Temps d'Attente Moyen",
            value: "4.2 min",
            change: "-1.8 min",
            trend: "down",
            icon: Clock,
            description: "Optimisé",
            progress: 95,
            bgGradient: "from-success/10 via-success/5 to-transparent"
        },
        {
            title: "Taux de Satisfaction",
            value: "96.8%",
            change: "+2.4%",
            trend: "up",
            icon: Target,
            description: "Excellent",
            progress: 97,
            bgGradient: "from-amber-500/10 via-amber-500/5 to-transparent"
        }
    ];

    // Activité récente
    const recentActivity = [
        {
            id: 1,
            action: "Nouveau client enregistré",
            queue: "Accueil Principal",
            time: "Il y a 2 min",
            status: "success",
            user: "Marie D."
        },
        {
            id: 2,
            action: "Client servi avec succès",
            queue: "Support Technique",
            time: "Il y a 5 min",
            status: "complete",
            user: "Ahmed K."
        },
        {
            id: 3,
            action: "Seuil d'attente atteint",
            queue: "Service VIP",
            time: "Il y a 12 min",
            status: "warning",
            user: "Système"
        },
        {
            id: 4,
            action: "Nouvelle file créée",
            queue: "Réclamations",
            time: "Il y a 18 min",
            status: "info",
            user: "Admin"
        },
        {
            id: 5,
            action: "Rapport journalier généré",
            queue: "Analytics",
            time: "Il y a 25 min",
            status: "complete",
            user: "Système"
        },
    ];

    // Actions rapides
    const quickActions = [
        {
            label: "Ajouter un Client",
            icon: UserPlus,
            variant: "default" as const,
            description: "Enregistrer un nouveau client"
        },
        {
            label: "Créer une File",
            icon: Users,
            variant: "secondary" as const,
            description: "Configurer une nouvelle file d'attente"
        },
        {
            label: "Voir les Analytics",
            icon: BarChart3,
            variant: "outline" as const,
            description: "Consulter les statistiques détaillées"
        },
    ];

    // Métriques de performance
    const performanceMetrics = [
        { label: "Capacité Serveur", value: 78, status: "normal" },
        { label: "Temps de Réponse API", value: 95, status: "excellent" },
        { label: "Disponibilité", value: 99.9, status: "excellent" },
    ];

    // État du système
    const systemStatus = [
        {
            label: "Services Cloud",
            status: "Opérationnel",
            icon: Globe,
            statusColor: "bg-success"
        },
        {
            label: "API Gateway",
            status: "En ligne",
            icon: Zap,
            statusColor: "bg-success"
        },
        {
            label: "Base de Données",
            status: "Connectée",
            icon: Database,
            statusColor: "bg-success"
        },
        {
            label: "Réseau",
            status: "Stable",
            icon: Wifi,
            statusColor: "bg-success"
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* En-tête de page avec gradient décoratif */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl -z-10" />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <LineChart className="h-5 w-5 text-primary" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                                Tableau de Bord
                            </h1>
                        </div>
                        <p className="text-muted-foreground text-base md:text-lg max-w-xl">
                            Surveillez et gérez vos opérations de file d'attente en temps réel
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border/50">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">
                {new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
              </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grille des statistiques principales */}
            <div data-tour="overview-stats" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map((stat, index) => (
                    <Card
                        key={stat.title}
                        className={`relative overflow-hidden border-border/40 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group animate-scale-in bg-gradient-to-br ${stat.bgGradient}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Élément décoratif */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <stat.icon className="h-5 w-5 text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="flex items-end justify-between mb-3">
                                <div className="text-3xl font-bold text-foreground tracking-tight">
                                    {stat.value}
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg ${
                                    stat.trend === 'up'
                                        ? 'text-success-foreground bg-success/20'
                                        : 'text-destructive bg-destructive/10'
                                }`}>
                                    {stat.trend === 'up' ? (
                                        <ArrowUpRight className="h-4 w-4" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4" />
                                    )}
                                    {stat.change}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{stat.description}</span>
                                    <span className="font-medium text-primary">{stat.progress}%</span>
                                </div>
                                <Progress value={stat.progress} className="h-1.5" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Contenu principal - Grille 3 colonnes */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Colonne gauche - Activité récente (2/3) */}
                <Card data-tour="overview-activity" className="xl:col-span-2 border-border/40 overflow-hidden">
                    <CardHeader className="border-b border-border/30 bg-muted/20 dark:bg-muted/30 px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Activity className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-semibold text-foreground">
                                        Activité Récente
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        Dernières actions sur la plateforme
                                    </CardDescription>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-1">
                                Voir tout
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/30">
                            {recentActivity.map((activity, index) => (
                                <div
                                    key={activity.id}
                                    className="p-5 hover:bg-muted/30 dark:hover:bg-muted/40 transition-all duration-200 cursor-pointer group"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl transition-transform group-hover:scale-110 ${
                                            activity.status === 'success' ? 'bg-success/10 dark:bg-success/20' :
                                                activity.status === 'complete' ? 'bg-primary/10 dark:bg-primary/20' :
                                                    activity.status === 'warning' ? 'bg-warning/10 dark:bg-warning/20' :
                                                        'bg-accent/10 dark:bg-accent/20'
                                        }`}>
                                            {activity.status === 'success' && <UserPlus className="h-4 w-4 text-success" />}
                                            {activity.status === 'complete' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                            {activity.status === 'warning' && <AlertCircle className="h-4 w-4 text-warning" />}
                                            {activity.status === 'info' && <Sparkles className="h-4 w-4 text-accent" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                                    {activity.action}
                                                </p>
                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 font-normal">
                                                    {activity.user}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-0.5">
                                                {activity.queue}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Timer className="h-3.5 w-3.5" />
                                            <span className="text-xs font-medium whitespace-nowrap">
                        {activity.time}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Colonne droite (1/3) */}
                <div className="space-y-6">

                    {/* Actions Rapides */}
                    <Card className="border-border/40 overflow-hidden">
                        <CardHeader className="border-b border-border/30 bg-muted/20 dark:bg-muted/30 px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Zap className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-semibold text-foreground">
                                        Actions Rapides
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        Accès direct aux fonctions clés
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            {quickActions.map((action) => (
                                <Button
                                    key={action.label}
                                    variant="ghost"
                                    className="w-full justify-start gap-3 h-14 text-sm font-medium bg-muted/30 hover:bg-muted/50 border border-border/40 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <action.icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-foreground group-hover:text-primary transition-colors">{action.label}</div>
                                        <div className="text-xs font-normal text-muted-foreground">
                                            {action.description}
                                        </div>
                                    </div>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>

                    {/* État du Système */}
                    <Card className="border-border/40 overflow-hidden">
                        <CardHeader className="border-b border-border/30 bg-muted/20 dark:bg-muted/30 px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-success/10 flex items-center justify-center">
                                    <Shield className="h-4 w-4 text-success" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-semibold text-foreground">
                                        État du Système
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        Tous les services fonctionnent
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            {systemStatus.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 dark:bg-muted/40 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center">
                                            <item.icon className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-2 w-2 rounded-full ${item.statusColor} animate-pulse`} />
                                        <span className="text-xs font-medium text-muted-foreground">{item.status}</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                </div>
            </div>

            {/* Section Performance */}
            <Card className="border-border/40 overflow-hidden">
                <CardHeader className="border-b border-border/30 bg-muted/20 dark:bg-muted/30 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Server className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold text-foreground">
                                    Performance Infrastructure
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    Métriques de performance en temps réel
                                </CardDescription>
                            </div>
                        </div>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                            <div className="h-1.5 w-1.5 rounded-full bg-success mr-2 animate-pulse" />
                            Excellent
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {performanceMetrics.map((metric) => (
                            <div key={metric.label} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground">{metric.label}</span>
                                    <span className={`text-sm font-bold ${
                                        metric.status === 'excellent' ? 'text-success' : 'text-primary'
                                    }`}>
                    {metric.value}%
                  </span>
                                </div>
                                <div className="relative h-3 bg-muted/50 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ${
                                            metric.status === 'excellent'
                                                ? 'bg-gradient-to-r from-success to-success/80'
                                                : 'bg-gradient-to-r from-primary to-primary-light'
                                        }`}
                                        style={{ width: `${metric.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
