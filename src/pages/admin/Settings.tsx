import { useState } from "react";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Settings as SettingsIcon,
    Bell,
    Shield,
    Palette,
    Globe,
    Database,
    Mail,
    Smartphone,
    Clock,
    Building2,
    Save,
    RotateCcw,
    Check,
    AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { useTheme, AccentColor } from "@/contexts/ThemeContext";
import { useAdminTranslation } from "@/contexts/AdminTranslationContext";

const accentColors: { id: AccentColor; label: string; bgClass: string }[] = [
    { id: "teal", label: "Teal", bgClass: "bg-[hsl(182,86%,14%)]" },
    { id: "blue", label: "Blue", bgClass: "bg-[hsl(217,91%,50%)]" },
    { id: "green", label: "Green", bgClass: "bg-[hsl(142,71%,35%)]" },
    { id: "purple", label: "Purple", bgClass: "bg-[hsl(271,81%,50%)]" },
    { id: "orange", label: "Orange", bgClass: "bg-[hsl(25,95%,53%)]" },
];

function SettingsContent() {
    const [hasChanges, setHasChanges] = useState(false);
    const { accentColor, setAccentColor } = useTheme();
    const { t } = useAdminTranslation();

    const handleSave = () => {
        toast.success(t.settingsSaved);
        setHasChanges(false);
    };

    const handleReset = () => {
        setAccentColor("teal");
        toast.info(t.settingsReset);
        setHasChanges(false);
    };

    const markAsChanged = () => {
        if (!hasChanges) setHasChanges(true);
    };

    const handleColorSelect = (color: AccentColor) => {
        setAccentColor(color);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{t.settingsTitle}</h1>
                    <p className="text-muted-foreground text-lg">{t.settingsDescription}</p>
                </div>
                <div className="flex items-center gap-3">
                    {hasChanges && (
                        <Badge variant="outline" className="gap-1.5 text-warning border-warning/30 bg-warning/10">
                            <AlertCircle className="h-3 w-3" />
                            {t.unsavedChanges}
                        </Badge>
                    )}
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4" />
                        {t.reset}
                    </Button>
                    <Button size="sm" className="gap-2" onClick={handleSave}>
                        <Save className="h-4 w-4" />
                        {t.saveChanges}
                    </Button>
                </div>
            </div>

            {/* Settings Tabs */}
            <Tabs defaultValue="general" className="space-y-6">
                <TabsList data-tour="settings-tabs" className="bg-muted/50 p-1">
                    <TabsTrigger value="general" className="gap-2">
                        <Building2 className="h-4 w-4" />
                        {t.general}
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" />
                        {t.notificationsTab}
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="gap-2">
                        <Palette className="h-4 w-4" />
                        {t.appearance}
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                        <Shield className="h-4 w-4" />
                        {t.security}
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-border/50 bg-card">
                            <CardHeader className="border-b border-border/50 bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                                        <Building2 className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-semibold text-foreground">{t.businessInformation}</CardTitle>
                                        <CardDescription>{t.organizationDetails}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="business-name" className="text-foreground">{t.businessName}</Label>
                                    <Input
                                        id="business-name"
                                        defaultValue="Toorrii"
                                        onChange={markAsChanged}
                                        className="bg-input border-border focus:border-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground">{t.contactEmail}</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        defaultValue="admin@toorrii.com"
                                        onChange={markAsChanged}
                                        className="bg-input border-border focus:border-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-foreground">{t.contactPhone}</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        defaultValue="+213 XX XXX XXXX"
                                        onChange={markAsChanged}
                                        className="bg-input border-border focus:border-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-foreground">{t.businessAddress}</Label>
                                    <Input
                                        id="address"
                                        defaultValue="Algiers, Algeria"
                                        onChange={markAsChanged}
                                        className="bg-input border-border focus:border-primary/50"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 bg-card">
                            <CardHeader className="border-b border-border/50 bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-accent/10 dark:bg-accent/20">
                                        <Globe className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-semibold text-foreground">{t.regionalSettings}</CardTitle>
                                        <CardDescription>{t.timezoneLanguage}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="timezone" className="text-foreground">{t.timezone}</Label>
                                    <Select defaultValue="utc+1" onValueChange={markAsChanged}>
                                        <SelectTrigger className="bg-input border-border">
                                            <SelectValue placeholder={t.selectTimezone} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
                                            <SelectItem value="utc+1">UTC+1 (CET - Algeria)</SelectItem>
                                            <SelectItem value="utc+2">UTC+2 (EET)</SelectItem>
                                            <SelectItem value="utc+3">UTC+3 (MSK)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="language" className="text-foreground">{t.defaultLanguage}</Label>
                                    <Select defaultValue="en" onValueChange={markAsChanged}>
                                        <SelectTrigger className="bg-input border-border">
                                            <SelectValue placeholder={t.selectLanguage} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="fr">Français</SelectItem>
                                            <SelectItem value="ar">العربية</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date-format" className="text-foreground">{t.dateFormat}</Label>
                                    <Select defaultValue="dmy" onValueChange={markAsChanged}>
                                        <SelectTrigger className="bg-input border-border">
                                            <SelectValue placeholder={t.selectFormat} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                            <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="time-format" className="text-foreground">{t.timeFormat}</Label>
                                    <Select defaultValue="24h" onValueChange={markAsChanged}>
                                        <SelectTrigger className="bg-input border-border">
                                            <SelectValue placeholder={t.selectFormat} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="12h">12 Hour (AM/PM)</SelectItem>
                                            <SelectItem value="24h">24 Hour</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-border/50 bg-card">
                        <CardHeader className="border-b border-border/50 bg-muted/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-success/10 dark:bg-success/20">
                                    <Clock className="h-5 w-5 text-success" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-semibold text-foreground">{t.queueConfiguration}</CardTitle>
                                    <CardDescription>{t.queueBehavior}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="default-capacity" className="text-foreground">{t.defaultQueueCapacity}</Label>
                                    <Input
                                        id="default-capacity"
                                        type="number"
                                        defaultValue="50"
                                        onChange={markAsChanged}
                                        className="bg-input border-border focus:border-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="avg-service-time" className="text-foreground">{t.avgServiceTime}</Label>
                                    <Input
                                        id="avg-service-time"
                                        type="number"
                                        defaultValue="15"
                                        onChange={markAsChanged}
                                        className="bg-input border-border focus:border-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="refresh-interval" className="text-foreground">{t.autoRefreshInterval}</Label>
                                    <Input
                                        id="refresh-interval"
                                        type="number"
                                        defaultValue="30"
                                        onChange={markAsChanged}
                                        className="bg-input border-border focus:border-primary/50"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-border/50 bg-card">
                            <CardHeader className="border-b border-border/50 bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-semibold text-foreground">Email Notifications</CardTitle>
                                        <CardDescription>Configure email alert preferences</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Customer Queue Updates</Label>
                                        <p className="text-sm text-muted-foreground">Send email when customer is next</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Daily Reports</Label>
                                        <p className="text-sm text-muted-foreground">Receive daily queue summary</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">System Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Critical system notifications</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Marketing Updates</Label>
                                        <p className="text-sm text-muted-foreground">News and feature updates</p>
                                    </div>
                                    <Switch onCheckedChange={markAsChanged} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 bg-card">
                            <CardHeader className="border-b border-border/50 bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-accent/10 dark:bg-accent/20">
                                        <Smartphone className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-semibold text-foreground">SMS Notifications</CardTitle>
                                        <CardDescription>Configure SMS alert preferences</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Queue Position Updates</Label>
                                        <p className="text-sm text-muted-foreground">Notify when position changes</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Turn Approaching</Label>
                                        <p className="text-sm text-muted-foreground">Alert when turn is coming up</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Service Complete</Label>
                                        <p className="text-sm text-muted-foreground">Confirmation after service</p>
                                    </div>
                                    <Switch onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Feedback Requests</Label>
                                        <p className="text-sm text-muted-foreground">Ask for rating after service</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-border/50 bg-card">
                        <CardHeader className="border-b border-border/50 bg-muted/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-warning/10 dark:bg-warning/20">
                                    <Bell className="h-5 w-5 text-warning" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-semibold text-foreground">In-App Notifications</CardTitle>
                                    <CardDescription>Dashboard notification preferences</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Real-time Updates</Label>
                                        <p className="text-xs text-muted-foreground">Live queue changes</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Sound Alerts</Label>
                                        <p className="text-xs text-muted-foreground">Audio notifications</p>
                                    </div>
                                    <Switch onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Desktop Alerts</Label>
                                        <p className="text-xs text-muted-foreground">Browser notifications</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appearance Settings */}
                <TabsContent value="appearance" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card data-tour="settings-theme" className="border-border/50 bg-card">
                            <CardHeader className="border-b border-border/50 bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                                        <Palette className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-semibold text-foreground">Theme</CardTitle>
                                        <CardDescription>Customize the look and feel</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Dark Mode</Label>
                                        <p className="text-sm text-muted-foreground">Enable dark theme</p>
                                    </div>
                                    <Switch onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">System Theme</Label>
                                        <p className="text-sm text-muted-foreground">Follow system preferences</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-foreground">Accent Color</Label>
                                    <div className="flex gap-3">
                                        {accentColors.map((color) => (
                                            <button
                                                key={color.id}
                                                title={color.label}
                                                className={`w-8 h-8 rounded-full ${color.bgClass} ring-2 ring-offset-2 ring-offset-background ${
                                                    accentColor === color.id
                                                        ? "ring-foreground scale-110"
                                                        : "ring-transparent hover:ring-muted-foreground/50"
                                                } transition-all duration-200`}
                                                onClick={() => handleColorSelect(color.id)}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Selected: <span className="font-medium capitalize">{accentColor}</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 bg-card">
                            <CardHeader className="border-b border-border/50 bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-accent/10 dark:bg-accent/20">
                                        <SettingsIcon className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-semibold text-foreground">Display</CardTitle>
                                        <CardDescription>Layout and density settings</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Compact View</Label>
                                        <p className="text-sm text-muted-foreground">Reduce spacing</p>
                                    </div>
                                    <Switch onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Show Animations</Label>
                                        <p className="text-sm text-muted-foreground">Enable UI animations</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Sidebar Collapsed</Label>
                                        <p className="text-sm text-muted-foreground">Start with sidebar closed</p>
                                    </div>
                                    <Switch onCheckedChange={markAsChanged} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-border/50 bg-card">
                            <CardHeader className="border-b border-border/50 bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-destructive/10 dark:bg-destructive/20">
                                        <Shield className="h-5 w-5 text-destructive" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-semibold text-foreground">Authentication</CardTitle>
                                        <CardDescription>Security and login settings</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Two-Factor Authentication</Label>
                                        <p className="text-sm text-muted-foreground">Add extra security layer</p>
                                    </div>
                                    <Switch onCheckedChange={markAsChanged} />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Session Timeout</Label>
                                        <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Session Duration</Label>
                                    <Select defaultValue="8h" onValueChange={markAsChanged}>
                                        <SelectTrigger className="bg-input border-border">
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1h">1 Hour</SelectItem>
                                            <SelectItem value="4h">4 Hours</SelectItem>
                                            <SelectItem value="8h">8 Hours</SelectItem>
                                            <SelectItem value="24h">24 Hours</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 bg-card">
                            <CardHeader className="border-b border-border/50 bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-success/10 dark:bg-success/20">
                                        <Database className="h-5 w-5 text-success" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-semibold text-foreground">Data & Privacy</CardTitle>
                                        <CardDescription>Data retention and privacy</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Data Encryption</Label>
                                        <p className="text-sm text-muted-foreground">Encrypt sensitive data</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="default" className="bg-success hover:bg-success gap-1 text-success-foreground">
                                            <Check className="h-3 w-3" />
                                            Enabled
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Data Retention Period</Label>
                                    <Select defaultValue="1y" onValueChange={markAsChanged}>
                                        <SelectTrigger className="bg-input border-border">
                                            <SelectValue placeholder="Select period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="30d">30 Days</SelectItem>
                                            <SelectItem value="90d">90 Days</SelectItem>
                                            <SelectItem value="1y">1 Year</SelectItem>
                                            <SelectItem value="forever">Forever</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label className="font-medium text-foreground">Analytics Collection</Label>
                                        <p className="text-sm text-muted-foreground">Collect usage analytics</p>
                                    </div>
                                    <Switch defaultChecked onCheckedChange={markAsChanged} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default function Settings() {
    return (
        <DashboardLayout>
            <SettingsContent />
        </DashboardLayout>
    );
}
