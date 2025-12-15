import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Users,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap
} from "lucide-react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { useAdminTranslation } from "@/contexts/AdminTranslationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useMemo } from "react";

// Sample data for Nivo charts
const weeklyLineData = [
  {
    id: "customers",
    data: [
      { x: "Lun", y: 120 },
      { x: "Mar", y: 145 },
      { x: "Mer", y: 168 },
      { x: "Jeu", y: 152 },
      { x: "Ven", y: 189 },
      { x: "Sam", y: 210 },
      { x: "Dim", y: 95 },
    ]
  }
];

const efficiencyLineData = [
  {
    id: "efficiency",
    data: [
      { x: "Lun", y: 92 },
      { x: "Mar", y: 94 },
      { x: "Mer", y: 89 },
      { x: "Jeu", y: 96 },
      { x: "Ven", y: 85 },
      { x: "Sam", y: 78 },
      { x: "Dim", y: 98 },
    ]
  }
];

const hourlyBarData = [
  { hour: "8h", customers: 12 },
  { hour: "9h", customers: 28 },
  { hour: "10h", customers: 45 },
  { hour: "11h", customers: 52 },
  { hour: "12h", customers: 38 },
  { hour: "13h", customers: 42 },
  { hour: "14h", customers: 58 },
  { hour: "15h", customers: 62 },
  { hour: "16h", customers: 48 },
  { hour: "17h", customers: 35 },
  { hour: "18h", customers: 22 },
];

const queueDistributionPie = [
  { id: "Bureau d'accueil", label: "Bureau d'accueil", value: 35 },
  { id: "Support technique", label: "Support technique", value: 25 },
  { id: "Réception", label: "Réception", value: 20 },
  { id: "Service VIP", label: "Service VIP", value: 12 },
  { id: "Autres", label: "Autres", value: 8 },
];

const monthlyTrendData = [
  {
    id: "served",
    data: [
      { x: "Jan", y: 2840 },
      { x: "Fév", y: 3120 },
      { x: "Mar", y: 3580 },
      { x: "Avr", y: 3420 },
      { x: "Mai", y: 3890 },
      { x: "Juin", y: 4250 },
    ]
  }
];

function AnalyticsContent() {
  const { t } = useAdminTranslation();
  const { accentColor, isDark } = useTheme();

  // Create a unique key that changes when theme or accent changes
  const themeKey = `${accentColor}-${isDark ? 'dark' : 'light'}`;

  // Memoize theme and colors based on current CSS variables
  const { nivoTheme, primaryColor, accentColorValue, secondaryColor, mutedColor, ringColor } = useMemo(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const getCSSVariable = (variable: string): string => {
      const value = computedStyle.getPropertyValue(variable).trim();
      return value ? `hsl(${value})` : "hsl(182, 86%, 14%)";
    };

    const primary = getCSSVariable("--primary");
    const accent = getCSSVariable("--accent");
    const secondary = getCSSVariable("--secondary");
    const muted = getCSSVariable("--muted-foreground");
    const ring = getCSSVariable("--ring");
    const foreground = getCSSVariable("--foreground");
    const border = getCSSVariable("--border");
    const card = getCSSVariable("--card");

    const theme = {
      background: "transparent",
      textColor: foreground,
      fontSize: 12,
      axis: {
        domain: {
          line: {
            stroke: border,
            strokeWidth: 1
          }
        },
        ticks: {
          line: {
            stroke: border,
            strokeWidth: 1
          },
          text: {
            fill: muted
          }
        },
        legend: {
          text: {
            fill: foreground,
            fontSize: 12
          }
        }
      },
      grid: {
        line: {
          stroke: border,
          strokeWidth: 1,
          strokeDasharray: "3 3"
        }
      },
      legends: {
        text: {
          fill: foreground
        }
      },
      tooltip: {
        container: {
          background: card,
          color: foreground,
          fontSize: 12,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          border: `1px solid ${border}`
        }
      }
    };

    return {
      nivoTheme: theme,
      primaryColor: primary,
      accentColorValue: accent,
      secondaryColor: secondary,
      mutedColor: muted,
      ringColor: ring
    };
  }, [themeKey]); // Recalculate when theme changes

  // Generate pie chart colors based on theme
  const pieColors = useMemo(() => [
    primaryColor,
    accentColorValue,
    secondaryColor,
    ringColor,
    mutedColor
  ], [primaryColor, accentColorValue, secondaryColor, ringColor, mutedColor]);

  const stats = [
    {
      title: t.totalServed,
      value: "12 847",
      change: "+18,2%",
      trend: "up",
      icon: Users,
      description: t.thisMonth
    },
    {
      title: t.avgWaitTime,
      value: "6,4m",
      change: "-2,1m",
      trend: "down",
      icon: Clock,
      description: t.vsLastMonth
    },
    {
      title: t.efficiencyRate,
      value: "94,7%",
      change: "+5,3%",
      trend: "up",
      icon: Zap,
      description: t.serviceEfficiency
    },
    {
      title: t.satisfaction,
      value: "4,7/5,0",
      change: "+0,3",
      trend: "up",
      icon: Target,
      description: t.customerRating
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{t.analyticsTitle}</h1>
          <p className="text-muted-foreground text-lg">{t.analyticsDescription}</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t.period} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">{t.last7Days}</SelectItem>
              <SelectItem value="30d">{t.last30Days}</SelectItem>
              <SelectItem value="90d">{t.last90Days}</SelectItem>
              <SelectItem value="1y">{t.lastYear}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t.refresh}
          </Button>
          <Button data-tour="analytics-export" variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            {t.export}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-primary' : 'text-destructive'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            {t.overview}
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <Activity className="h-4 w-4" />
            {t.performance}
          </TabsTrigger>
          <TabsTrigger value="distribution" className="gap-2">
            <PieChart className="h-4 w-4" />
            {t.distribution}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div data-tour="analytics-charts" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Customer Traffic - Nivo Line Chart */}
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">{t.customerTraffic}</CardTitle>
                    <CardDescription>{t.weeklyCustomerFlow}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[280px]" key={`line-weekly-${themeKey}`}>
                  <ResponsiveLine
                    data={weeklyLineData}
                    theme={nivoTheme}
                    margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
                    curve="catmullRom"
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                    }}
                    enableGridX={false}
                    colors={[primaryColor]}
                    lineWidth={3}
                    pointSize={8}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    enableArea={true}
                    areaOpacity={0.15}
                    useMesh={true}
                    enableSlices="x"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Peak Hours - Nivo Bar Chart */}
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">{t.peakHours}</CardTitle>
                    <CardDescription>{t.hourlyDistribution}</CardDescription>
                  </div>
                  <Badge variant="outline">{t.today}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[280px]" key={`bar-hourly-${themeKey}`}>
                  <ResponsiveBar
                    data={hourlyBarData}
                    theme={nivoTheme}
                    keys={['customers']}
                    indexBy="hour"
                    margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={[primaryColor]}
                    borderRadius={4}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: -45,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                    }}
                    enableGridY={true}
                    enableLabel={false}
                    animate={true}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend - Full Width Nivo Line Chart */}
          <Card className="border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">{t.monthlyTrend}</CardTitle>
                  <CardDescription>{t.sixMonthOverview}</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{t.customersServed}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[300px]" key={`line-monthly-${themeKey}`}>
                <ResponsiveLine
                  data={monthlyTrendData}
                  theme={nivoTheme}
                  margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
                  curve="catmullRom"
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: t.customers,
                    legendOffset: -50,
                    legendPosition: 'middle'
                  }}
                  enableGridX={false}
                  colors={[primaryColor]}
                  lineWidth={3}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  useMesh={true}
                  enableSlices="x"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Efficiency Chart - Nivo Line */}
            <Card className="lg:col-span-2 border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">{t.efficiencyMetrics}</CardTitle>
                    <CardDescription>{t.weeklyEfficiencyAnalysis}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px]" key={`line-efficiency-${themeKey}`}>
                  <ResponsiveLine
                    data={efficiencyLineData}
                    theme={nivoTheme}
                    margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 70, max: 100, stacked: false }}
                    curve="catmullRom"
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      format: (v) => `${v}%`
                    }}
                    enableGridX={false}
                    colors={[primaryColor]}
                    lineWidth={3}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    enableArea={true}
                    areaOpacity={0.15}
                    useMesh={true}
                    enableSlices="x"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <CardTitle className="text-xl font-semibold">{t.summary}</CardTitle>
                <CardDescription>{t.keyPerformanceIndicators}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{t.avgServiceTime}</span>
                      <span className="text-sm font-bold text-primary">4,2 min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "78%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{t.customerSatisfaction}</span>
                      <span className="text-sm font-bold text-primary">94%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "94%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{t.firstCallResolution}</span>
                      <span className="text-sm font-bold text-primary">87%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "87%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{t.agentUtilization}</span>
                      <span className="text-sm font-bold text-primary">82%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "82%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Queue Distribution - Nivo Pie Chart */}
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">{t.queueDistribution}</CardTitle>
                    <CardDescription>{t.customersByQueue}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[350px]" key={`pie-queue-${themeKey}`}>
                  <ResponsivePie
                    data={queueDistributionPie}
                    theme={nivoTheme}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={4}
                    activeOuterRadiusOffset={8}
                    colors={pieColors}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor={nivoTheme.textColor}
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                    legends={[
                      {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: nivoTheme.textColor,
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 12,
                        symbolShape: 'circle'
                      }
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Service Type Stats */}
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <CardTitle className="text-xl font-semibold">{t.serviceStats}</CardTitle>
                <CardDescription>{t.detailedBreakdown}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {queueDistributionPie.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: pieColors[index] }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground truncate">{item.label}</span>
                          <span className="text-sm font-bold text-primary">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${item.value}%`,
                              backgroundColor: pieColors[index]
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Distribution Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t.busiestDay}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{t.friday}</div>
                <p className="text-xs text-muted-foreground mt-1">189 {t.customersAvg}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t.peakHour}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">14:00 - 15:00</div>
                <p className="text-xs text-muted-foreground mt-1">62 {t.customersAvg}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t.topPerformingQueue}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{t.vipService}</div>
                <p className="text-xs text-muted-foreground mt-1">98% {t.satisfaction}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Analytics() {
  return (
    <DashboardLayout>
      <AnalyticsContent />
    </DashboardLayout>
  );
}
