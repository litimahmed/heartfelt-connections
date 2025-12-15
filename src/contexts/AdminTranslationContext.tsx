import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "fr" | "ar";

interface Translations {
  // Sidebar Navigation
  navigation: string;
  dashboard: string;
  manageQueues: string;
  analytics: string;
  settings: string;
  myProfile: string;
  content: string;
  aboutUs: string;
  allVersions: string;
  createNew: string;
  contact: string;
  viewContact: string;
  addContact: string;
  partners: string;
  viewPartners: string;
  addPartner: string;
  terms: string;
  viewTerms: string;
  privacy: string;
  viewPolicies: string;
  categories: string;
  viewCategories: string;
  addCategory: string;
  services: string;
  viewServices: string;
  addService: string;
  professionals: string;
  viewProfessionals: string;
  addProfessional: string;
  
  // Header
  language: string;
  help: string;
  notifications: string;
  profile: string;
  signOut: string;
  signingOut: string;
  search: string;
  adminPortal: string;
  superAdmin: string;
  
  // Profile Page
  profileTitle: string;
  editProfile: string;
  updateProfileInfo: string;
  contactInformation: string;
  accountDetails: string;
  preferences: string;
  email: string;
  phone: string;
  location: string;
  accessLevel: string;
  memberSince: string;
  organization: string;
  languagePreference: string;
  timezone: string;
  theme: string;
  name: string;
  phoneNumber: string;
  save: string;
  cancel: string;
  saveChanges: string;
  loadingProfile: string;
  failedToLoadProfile: string;
  
  // Settings Page
  settingsTitle: string;
  settingsDescription: string;
  unsavedChanges: string;
  reset: string;
  general: string;
  notificationsTab: string;
  appearance: string;
  security: string;
  businessInformation: string;
  organizationDetails: string;
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  businessAddress: string;
  regionalSettings: string;
  timezoneLanguage: string;
  selectTimezone: string;
  defaultLanguage: string;
  selectLanguage: string;
  dateFormat: string;
  selectFormat: string;
  timeFormat: string;
  queueConfiguration: string;
  queueBehavior: string;
  defaultQueueCapacity: string;
  avgServiceTime: string;
  autoRefreshInterval: string;
  emailNotifications: string;
  emailAlertPrefs: string;
  customerQueueUpdates: string;
  sendEmailWhenNext: string;
  dailyReports: string;
  receiveDailySummary: string;
  systemAlerts: string;
  criticalNotifications: string;
  marketingUpdates: string;
  newsAndFeatures: string;
  smsNotifications: string;
  smsAlertPrefs: string;
  queuePositionUpdates: string;
  notifyPositionChanges: string;
  turnApproaching: string;
  alertTurnComing: string;
  serviceComplete: string;
  confirmationAfterService: string;
  feedbackRequests: string;
  askForRating: string;
  inAppNotifications: string;
  dashboardNotificationPrefs: string;
  realTimeAlerts: string;
  liveQueueUpdates: string;
  desktopNotifications: string;
  showDesktopAlerts: string;
  soundAlerts: string;
  playSoundAlerts: string;
  themeMode: string;
  interfaceTheme: string;
  lightMode: string;
  darkMode: string;
  systemDefault: string;
  accentColor: string;
  colorPalette: string;
  primaryBrandColor: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  passwordRequirements: string;
  changePassword: string;
  twoFactorAuth: string;
  twoFactorDescription: string;
  enabled: string;
  disabled: string;
  enable2FA: string;
  disable2FA: string;
  sessionManagement: string;
  sessionDescription: string;
  currentSession: string;
  activeSince: string;
  signOutOtherSessions: string;
  settingsSaved: string;
  settingsReset: string;
  
  // Analytics Page
  analyticsTitle: string;
  analyticsDescription: string;
  period: string;
  last7Days: string;
  last30Days: string;
  last90Days: string;
  lastYear: string;
  refresh: string;
  export: string;
  totalServed: string;
  thisMonth: string;
  avgWaitTime: string;
  vsLastMonth: string;
  efficiencyRate: string;
  serviceEfficiency: string;
  satisfaction: string;
  customerRating: string;
  overview: string;
  performance: string;
  distribution: string;
  customerTraffic: string;
  weeklyCustomerFlow: string;
  peakHours: string;
  hourlyDistribution: string;
  today: string;
  monthlyTrend: string;
  sixMonthOverview: string;
  customersServed: string;
  customers: string;
  efficiencyMetrics: string;
  weeklyEfficiencyAnalysis: string;
  summary: string;
  keyPerformanceIndicators: string;
  serviceRate: string;
  resolutionRate: string;
  noShowRate: string;
  peakUtilization: string;
  activeToday: string;
  inQueue: string;
  queueDistribution: string;
  customerDistributionByQueue: string;
  queueDetails: string;
  performanceByQueueType: string;
  high: string;
  medium: string;
  low: string;
  totalQueuesActive: string;
  of: string;

  // Manage Queues Page
  queueManagement: string;
  queueManagementDescription: string;
  totalQueues: string;
  activeServiceQueues: string;
  totalCustomers: string;
  currentlyInQueues: string;
  acrossAllQueues: string;
  serviceRateStat: string;
  customerSatisfaction: string;
  createQueue: string;
  createNewQueue: string;
  createNewQueueDescription: string;
  queueName: string;
  queueNamePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  priorityLevel: string;
  selectPriority: string;
  normal: string;
  maxCapacity: string;
  assignedAgents: string;
  numberOfAgents: string;
  searchQueues: string;
  allStatus: string;
  paused: string;
  cards: string;
  table: string;
  viewDetails: string;
  editQueue: string;
  duplicate: string;
  pauseQueue: string;
  resumeQueue: string;
  deleteQueue: string;
  queueCapacity: string;
  waiting: string;
  avgWait: string;
  served: string;
  agentsAssigned: string;
  manage: string;
  priority: string;
  agents: string;
  capacity: string;
  noQueuesFound: string;
  adjustSearchCriteria: string;
  getStartedCreateQueue: string;
  
  // Common
  loading: string;
  active: string;
  inactive: string;
  create: string;
  edit: string;
  delete: string;
  view: string;
  back: string;
  confirm: string;
  actions: string;
  status: string;
  createdAt: string;
  collapseSidebar: string;
  expandSidebar: string;
  
  // Walkthrough Tour
  previous: string;
  next: string;
  finish: string;
  tourWelcomeTitle: string;
  tourWelcomeContent: string;
  tourDashboardTitle: string;
  tourDashboardContent: string;
  tourOverviewStatsTitle: string;
  tourOverviewStatsContent: string;
  tourOverviewActivityTitle: string;
  tourOverviewActivityContent: string;
  tourManageTitle: string;
  tourManageContent: string;
  tourCreateQueueTitle: string;
  tourCreateQueueContent: string;
  tourQueueListTitle: string;
  tourQueueListContent: string;
  tourAnalyticsTitle: string;
  tourAnalyticsContent: string;
  tourAnalyticsChartsTitle: string;
  tourAnalyticsChartsContent: string;
  tourAnalyticsExportTitle: string;
  tourAnalyticsExportContent: string;
  tourSettingsTitle: string;
  tourSettingsContent: string;
  tourSettingsTabsTitle: string;
  tourSettingsTabsContent: string;
  tourSettingsThemeTitle: string;
  tourSettingsThemeContent: string;
  tourProfileTitle: string;
  tourProfileContent: string;
  tourContentTitle: string;
  tourContentContent: string;
  tourAboutUsTitle: string;
  tourAboutUsContent: string;
  tourCreateVersionTitle: string;
  tourCreateVersionContent: string;
  tourPartnersTitle: string;
  tourPartnersContent: string;
  tourContactsTitle: string;
  tourContactsContent: string;
  tourHeaderActionsTitle: string;
  tourHeaderActionsContent: string;
  tourLanguageSelectorTitle: string;
  tourLanguageSelectorContent: string;
  tourLogoutTitle: string;
  tourLogoutContent: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Sidebar Navigation
    navigation: "Navigation",
    dashboard: "Dashboard",
    manageQueues: "Manage Queues",
    analytics: "Analytics",
    settings: "Settings",
    myProfile: "My Profile",
    content: "Content",
    aboutUs: "About Us",
    allVersions: "All Versions",
    createNew: "Create New",
    contact: "Contact",
    viewContact: "View Contact",
    addContact: "Add Contact",
    partners: "Partners",
    viewPartners: "View Partners",
    addPartner: "Add Partner",
    terms: "Terms",
    viewTerms: "View Terms",
    privacy: "Privacy",
    viewPolicies: "View Policies",
    categories: "Categories",
    viewCategories: "View Categories",
    addCategory: "Add Category",
    services: "Services",
    viewServices: "View Services",
    addService: "Add Service",
    professionals: "Professionals",
    viewProfessionals: "View Professionals",
    addProfessional: "Add Professional",
    
    // Header
    language: "Language",
    help: "Help",
    notifications: "Notifications",
    profile: "Profile",
    signOut: "Sign out",
    signingOut: "Signing out...",
    search: "Search...",
    adminPortal: "Admin Portal",
    superAdmin: "Super Admin",
    
    // Profile Page
    profileTitle: "Profile",
    editProfile: "Edit Profile",
    updateProfileInfo: "Update your profile information below.",
    contactInformation: "Contact Information",
    accountDetails: "Account Details",
    preferences: "Preferences",
    email: "Email",
    phone: "Phone",
    location: "Location",
    accessLevel: "Access Level",
    memberSince: "Member Since",
    organization: "Organization",
    languagePreference: "Language",
    timezone: "Timezone",
    theme: "Theme",
    name: "Name",
    phoneNumber: "Phone Number",
    save: "Save",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    loadingProfile: "Loading profile...",
    failedToLoadProfile: "Failed to load profile. Please try again later.",
    
    // Settings Page
    settingsTitle: "Settings",
    settingsDescription: "Manage your system preferences and configurations",
    unsavedChanges: "Unsaved changes",
    reset: "Reset",
    general: "General",
    notificationsTab: "Notifications",
    appearance: "Appearance",
    security: "Security",
    businessInformation: "Business Information",
    organizationDetails: "Your organization details",
    businessName: "Business Name",
    contactEmail: "Contact Email",
    contactPhone: "Contact Phone",
    businessAddress: "Business Address",
    regionalSettings: "Regional Settings",
    timezoneLanguage: "Timezone and language preferences",
    selectTimezone: "Select timezone",
    defaultLanguage: "Default Language",
    selectLanguage: "Select language",
    dateFormat: "Date Format",
    selectFormat: "Select format",
    timeFormat: "Time Format",
    queueConfiguration: "Queue Configuration",
    queueBehavior: "Customize queue behavior and defaults",
    defaultQueueCapacity: "Default Queue Capacity",
    avgServiceTime: "Avg. Service Time (minutes)",
    autoRefreshInterval: "Auto-refresh Interval (seconds)",
    emailNotifications: "Email Notifications",
    emailAlertPrefs: "Configure email alert preferences",
    customerQueueUpdates: "Customer Queue Updates",
    sendEmailWhenNext: "Send email when customer is next",
    dailyReports: "Daily Reports",
    receiveDailySummary: "Receive daily queue summary",
    systemAlerts: "System Alerts",
    criticalNotifications: "Critical system notifications",
    marketingUpdates: "Marketing Updates",
    newsAndFeatures: "News and feature updates",
    smsNotifications: "SMS Notifications",
    smsAlertPrefs: "Configure SMS alert preferences",
    queuePositionUpdates: "Queue Position Updates",
    notifyPositionChanges: "Notify when position changes",
    turnApproaching: "Turn Approaching",
    alertTurnComing: "Alert when turn is coming up",
    serviceComplete: "Service Complete",
    confirmationAfterService: "Confirmation after service",
    feedbackRequests: "Feedback Requests",
    askForRating: "Ask for rating after service",
    inAppNotifications: "In-App Notifications",
    dashboardNotificationPrefs: "Dashboard notification preferences",
    realTimeAlerts: "Real-time Alerts",
    liveQueueUpdates: "Live queue updates in dashboard",
    desktopNotifications: "Desktop Notifications",
    showDesktopAlerts: "Show browser notifications",
    soundAlerts: "Sound Alerts",
    playSoundAlerts: "Play sound for new events",
    themeMode: "Theme Mode",
    interfaceTheme: "Choose your interface theme",
    lightMode: "Light",
    darkMode: "Dark",
    systemDefault: "System",
    accentColor: "Accent Color",
    colorPalette: "Color Palette",
    primaryBrandColor: "Choose your primary brand color",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    passwordRequirements: "Password must be at least 8 characters with uppercase, lowercase, and numbers",
    changePassword: "Change Password",
    twoFactorAuth: "Two-Factor Authentication",
    twoFactorDescription: "Add an extra layer of security to your account",
    enabled: "Enabled",
    disabled: "Disabled",
    enable2FA: "Enable 2FA",
    disable2FA: "Disable 2FA",
    sessionManagement: "Session Management",
    sessionDescription: "Manage your active sessions",
    currentSession: "Current Session",
    activeSince: "Active since",
    signOutOtherSessions: "Sign Out Other Sessions",
    settingsSaved: "Settings saved successfully",
    settingsReset: "Settings reset to defaults",
    
    // Analytics Page
    analyticsTitle: "Analytics",
    analyticsDescription: "Insights and performance metrics for your queues",
    period: "Period",
    last7Days: "Last 7 days",
    last30Days: "Last 30 days",
    last90Days: "Last 90 days",
    lastYear: "Last year",
    refresh: "Refresh",
    export: "Export",
    totalServed: "Total Served",
    thisMonth: "This month",
    avgWaitTime: "Avg Wait Time",
    vsLastMonth: "vs last month",
    efficiencyRate: "Efficiency Rate",
    serviceEfficiency: "Service efficiency",
    satisfaction: "Satisfaction",
    customerRating: "Customer rating",
    overview: "Overview",
    performance: "Performance",
    distribution: "Distribution",
    customerTraffic: "Customer Traffic",
    weeklyCustomerFlow: "Weekly customer flow analysis",
    peakHours: "Peak Hours",
    hourlyDistribution: "Hourly customer distribution",
    today: "Today",
    monthlyTrend: "Monthly Trend",
    sixMonthOverview: "6-month performance overview",
    customersServed: "Customers Served",
    customers: "Customers",
    efficiencyMetrics: "Efficiency Metrics",
    weeklyEfficiencyAnalysis: "Weekly efficiency and wait time analysis",
    summary: "Summary",
    keyPerformanceIndicators: "Key performance indicators",
    serviceRate: "Service Rate",
    resolutionRate: "Resolution Rate",
    noShowRate: "No-Show Rate",
    peakUtilization: "Peak Utilization",
    activeToday: "Active Today",
    inQueue: "In Queue",
    queueDistribution: "Queue Distribution",
    customerDistributionByQueue: "Customer distribution by queue type",
    queueDetails: "Queue Details",
    performanceByQueueType: "Performance by queue type",
    high: "High",
    medium: "Medium",
    low: "Low",
    totalQueuesActive: "Total Queues Active",
    of: "of",

    // Manage Queues Page
    queueManagement: "Queue Management",
    queueManagementDescription: "Create, configure, and monitor your service queues",
    totalQueues: "Total Queues",
    activeServiceQueues: "Active service queues",
    totalCustomers: "Total Customers",
    currentlyInQueues: "Currently in queues",
    acrossAllQueues: "Across all queues",
    serviceRateStat: "Service Rate",
    customerSatisfaction: "Customer satisfaction",
    createQueue: "Create Queue",
    createNewQueue: "Create New Queue",
    createNewQueueDescription: "Set up a new service queue with custom settings and configurations.",
    queueName: "Queue Name",
    queueNamePlaceholder: "e.g., Customer Service",
    description: "Description",
    descriptionPlaceholder: "Brief description of the queue",
    priorityLevel: "Priority Level",
    selectPriority: "Select priority",
    normal: "Normal",
    maxCapacity: "Max Capacity",
    assignedAgents: "Assigned Agents",
    numberOfAgents: "Number of agents",
    searchQueues: "Search queues...",
    allStatus: "All Status",
    paused: "Paused",
    cards: "Cards",
    table: "Table",
    viewDetails: "View Details",
    editQueue: "Edit Queue",
    duplicate: "Duplicate",
    pauseQueue: "Pause Queue",
    resumeQueue: "Resume Queue",
    deleteQueue: "Delete Queue",
    queueCapacity: "Queue Capacity",
    waiting: "Waiting",
    avgWait: "Avg Wait",
    served: "Served",
    agentsAssigned: "Agents assigned",
    manage: "Manage",
    priority: "Priority",
    agents: "Agents",
    capacity: "Capacity",
    noQueuesFound: "No queues found",
    adjustSearchCriteria: "Try adjusting your search or filter criteria",
    getStartedCreateQueue: "Get started by creating your first service queue",
    
    // Common
    loading: "Loading...",
    active: "Active",
    inactive: "Inactive",
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    back: "Back",
    confirm: "Confirm",
    actions: "Actions",
    status: "Status",
    createdAt: "Created At",
    collapseSidebar: "Collapse sidebar",
    expandSidebar: "Expand sidebar",
    
    // Walkthrough Tour
    previous: "Previous",
    next: "Next",
    finish: "Finish",
    tourWelcomeTitle: "Welcome to Admin Dashboard",
    tourWelcomeContent: "This is your command center. The sidebar provides quick access to all sections of the admin panel. Let's explore what you can do here.",
    tourDashboardTitle: "Dashboard Overview",
    tourDashboardContent: "Start here to get a bird's-eye view of your operations. See real-time statistics, recent activity, and system health at a glance.",
    tourOverviewStatsTitle: "Key Metrics",
    tourOverviewStatsContent: "Monitor your most important KPIs here: active queues, customers served, wait times, and satisfaction scores. These update in real-time.",
    tourOverviewActivityTitle: "Live Activity Feed",
    tourOverviewActivityContent: "Track every action as it happens. This feed shows new customers, completed services, and system events chronologically.",
    tourManageTitle: "Queue Operations",
    tourManageContent: "This is where you control your service queues. Create, pause, resume, or configure queues to optimize customer flow.",
    tourCreateQueueTitle: "Create New Queue",
    tourCreateQueueContent: "Click here to set up a new service queue. Define capacity, priority level, and assign agents to start serving customers.",
    tourQueueListTitle: "Queue Dashboard",
    tourQueueListContent: "Each card shows a queue's status, capacity, wait times, and number of customers. Use the action menu to pause, edit, or delete queues.",
    tourAnalyticsTitle: "Analytics & Reports",
    tourAnalyticsContent: "Dive deep into your performance data. Analyze trends, identify peak hours, and make data-driven decisions.",
    tourAnalyticsChartsTitle: "Visual Insights",
    tourAnalyticsChartsContent: "Interactive charts display customer traffic, efficiency rates, and queue distribution. Switch between time periods to spot trends.",
    tourAnalyticsExportTitle: "Export Reports",
    tourAnalyticsExportContent: "Download your analytics data for presentations or further analysis. Reports include all metrics and can be filtered by date range.",
    tourSettingsTitle: "System Settings",
    tourSettingsContent: "Customize your experience. Configure business details, notification preferences, appearance, and security options.",
    tourSettingsTabsTitle: "Settings Categories",
    tourSettingsTabsContent: "Settings are organized into tabs: General for business info, Notifications for alerts, Appearance for theme customization, and Security for password and 2FA.",
    tourSettingsThemeTitle: "Personalize Your Theme",
    tourSettingsThemeContent: "Choose your preferred color scheme. Select from multiple accent colors and switch between light, dark, or system theme modes.",
    tourProfileTitle: "Your Profile",
    tourProfileContent: "Manage your personal account information, update contact details, and view your access permissions.",
    tourContentTitle: "Content Management",
    tourContentContent: "This section houses all your website content: About Us, Contacts, Partners, Terms & Conditions, and Privacy Policies. Each supports multiple languages.",
    tourAboutUsTitle: "About Us Versions",
    tourAboutUsContent: "Create and manage different versions of your About Us content. Use versioning to A/B test messaging or prepare updates before publishing.",
    tourCreateVersionTitle: "Create Content Version",
    tourCreateVersionContent: "Click here to create a new version. Only one version can be active at a time - the active version is displayed on your public website.",
    tourPartnersTitle: "Partner Directory",
    tourPartnersContent: "Manage your business partnerships. Add partner logos, contact information, and descriptions to showcase on your website.",
    tourContactsTitle: "Contact Management",
    tourContactsContent: "Store and organize your business contact information including addresses, phone numbers, email, and social media links.",
    tourHeaderActionsTitle: "Quick Actions",
    tourHeaderActionsContent: "Access language settings, notifications, and your profile quickly from here. The help button (which you used to start this tour) is always available.",
    tourLanguageSelectorTitle: "Switch Languages",
    tourLanguageSelectorContent: "The dashboard supports English, French, and Arabic. Switch languages instantly - all content and interface elements will update automatically.",
    tourLogoutTitle: "You're All Set!",
    tourLogoutContent: "That's the tour! You now know how to navigate the admin dashboard. Remember, you can restart this tour anytime by clicking the help button. Enjoy managing your queues!",
  },
  fr: {
    // Sidebar Navigation
    navigation: "Navigation",
    dashboard: "Tableau de bord",
    manageQueues: "Gérer les files",
    analytics: "Analytique",
    settings: "Paramètres",
    myProfile: "Mon profil",
    content: "Contenu",
    aboutUs: "À propos",
    allVersions: "Toutes les versions",
    createNew: "Créer nouveau",
    contact: "Contact",
    viewContact: "Voir contact",
    addContact: "Ajouter contact",
    partners: "Partenaires",
    viewPartners: "Voir partenaires",
    addPartner: "Ajouter partenaire",
    terms: "Conditions",
    viewTerms: "Voir conditions",
    privacy: "Confidentialité",
    viewPolicies: "Voir politiques",
    categories: "Catégories",
    viewCategories: "Voir catégories",
    addCategory: "Ajouter catégorie",
    services: "Services",
    viewServices: "Voir services",
    addService: "Ajouter service",
    professionals: "Professionnels",
    viewProfessionals: "Voir professionnels",
    addProfessional: "Ajouter professionnel",
    
    // Header
    language: "Langue",
    help: "Aide",
    notifications: "Notifications",
    profile: "Profil",
    signOut: "Déconnexion",
    signingOut: "Déconnexion...",
    search: "Rechercher...",
    adminPortal: "Portail Admin",
    superAdmin: "Super Admin",
    
    // Profile Page
    profileTitle: "Profil",
    editProfile: "Modifier le profil",
    updateProfileInfo: "Mettez à jour vos informations de profil ci-dessous.",
    contactInformation: "Informations de contact",
    accountDetails: "Détails du compte",
    preferences: "Préférences",
    email: "Email",
    phone: "Téléphone",
    location: "Localisation",
    accessLevel: "Niveau d'accès",
    memberSince: "Membre depuis",
    organization: "Organisation",
    languagePreference: "Langue",
    timezone: "Fuseau horaire",
    theme: "Thème",
    name: "Nom",
    phoneNumber: "Numéro de téléphone",
    save: "Enregistrer",
    cancel: "Annuler",
    saveChanges: "Enregistrer les modifications",
    loadingProfile: "Chargement du profil...",
    failedToLoadProfile: "Échec du chargement du profil. Veuillez réessayer plus tard.",
    
    // Settings Page
    settingsTitle: "Paramètres",
    settingsDescription: "Gérez vos préférences système et configurations",
    unsavedChanges: "Modifications non enregistrées",
    reset: "Réinitialiser",
    general: "Général",
    notificationsTab: "Notifications",
    appearance: "Apparence",
    security: "Sécurité",
    businessInformation: "Informations commerciales",
    organizationDetails: "Détails de votre organisation",
    businessName: "Nom de l'entreprise",
    contactEmail: "Email de contact",
    contactPhone: "Téléphone de contact",
    businessAddress: "Adresse commerciale",
    regionalSettings: "Paramètres régionaux",
    timezoneLanguage: "Préférences de fuseau horaire et de langue",
    selectTimezone: "Sélectionner le fuseau horaire",
    defaultLanguage: "Langue par défaut",
    selectLanguage: "Sélectionner la langue",
    dateFormat: "Format de date",
    selectFormat: "Sélectionner le format",
    timeFormat: "Format de l'heure",
    queueConfiguration: "Configuration des files",
    queueBehavior: "Personnaliser le comportement des files",
    defaultQueueCapacity: "Capacité par défaut",
    avgServiceTime: "Temps de service moyen (minutes)",
    autoRefreshInterval: "Intervalle d'actualisation (secondes)",
    emailNotifications: "Notifications par email",
    emailAlertPrefs: "Configurer les préférences d'alerte email",
    customerQueueUpdates: "Mises à jour de la file client",
    sendEmailWhenNext: "Envoyer un email quand le client est suivant",
    dailyReports: "Rapports quotidiens",
    receiveDailySummary: "Recevoir le résumé quotidien",
    systemAlerts: "Alertes système",
    criticalNotifications: "Notifications système critiques",
    marketingUpdates: "Mises à jour marketing",
    newsAndFeatures: "Actualités et nouvelles fonctionnalités",
    smsNotifications: "Notifications SMS",
    smsAlertPrefs: "Configurer les préférences d'alerte SMS",
    queuePositionUpdates: "Mises à jour de position",
    notifyPositionChanges: "Notifier lors des changements de position",
    turnApproaching: "Tour approchant",
    alertTurnComing: "Alerter quand le tour approche",
    serviceComplete: "Service terminé",
    confirmationAfterService: "Confirmation après le service",
    feedbackRequests: "Demandes de feedback",
    askForRating: "Demander une évaluation après le service",
    inAppNotifications: "Notifications dans l'app",
    dashboardNotificationPrefs: "Préférences de notification du tableau de bord",
    realTimeAlerts: "Alertes en temps réel",
    liveQueueUpdates: "Mises à jour en direct des files",
    desktopNotifications: "Notifications bureau",
    showDesktopAlerts: "Afficher les notifications du navigateur",
    soundAlerts: "Alertes sonores",
    playSoundAlerts: "Jouer un son pour les nouveaux événements",
    themeMode: "Mode thème",
    interfaceTheme: "Choisissez votre thème d'interface",
    lightMode: "Clair",
    darkMode: "Sombre",
    systemDefault: "Système",
    accentColor: "Couleur d'accent",
    colorPalette: "Palette de couleurs",
    primaryBrandColor: "Choisissez votre couleur de marque principale",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le nouveau mot de passe",
    passwordRequirements: "Le mot de passe doit contenir au moins 8 caractères avec majuscules, minuscules et chiffres",
    changePassword: "Changer le mot de passe",
    twoFactorAuth: "Authentification à deux facteurs",
    twoFactorDescription: "Ajoutez une couche de sécurité supplémentaire à votre compte",
    enabled: "Activé",
    disabled: "Désactivé",
    enable2FA: "Activer 2FA",
    disable2FA: "Désactiver 2FA",
    sessionManagement: "Gestion des sessions",
    sessionDescription: "Gérez vos sessions actives",
    currentSession: "Session actuelle",
    activeSince: "Active depuis",
    signOutOtherSessions: "Déconnecter les autres sessions",
    settingsSaved: "Paramètres enregistrés avec succès",
    settingsReset: "Paramètres réinitialisés par défaut",
    
    // Analytics Page
    analyticsTitle: "Analytique",
    analyticsDescription: "Indicateurs et métriques de performance pour vos files d'attente",
    period: "Période",
    last7Days: "7 derniers jours",
    last30Days: "30 derniers jours",
    last90Days: "90 derniers jours",
    lastYear: "Année dernière",
    refresh: "Actualiser",
    export: "Exporter",
    totalServed: "Total servis",
    thisMonth: "Ce mois",
    avgWaitTime: "Temps d'attente moy.",
    vsLastMonth: "vs mois dernier",
    efficiencyRate: "Taux d'efficacité",
    serviceEfficiency: "Efficacité du service",
    satisfaction: "Satisfaction",
    customerRating: "Note client",
    overview: "Aperçu",
    performance: "Performance",
    distribution: "Distribution",
    customerTraffic: "Trafic clients",
    weeklyCustomerFlow: "Analyse du flux clients hebdomadaire",
    peakHours: "Heures de pointe",
    hourlyDistribution: "Distribution horaire des clients",
    today: "Aujourd'hui",
    monthlyTrend: "Tendance mensuelle",
    sixMonthOverview: "Aperçu des 6 derniers mois",
    customersServed: "Clients servis",
    customers: "Clients",
    efficiencyMetrics: "Métriques d'efficacité",
    weeklyEfficiencyAnalysis: "Analyse hebdomadaire de l'efficacité et du temps d'attente",
    summary: "Résumé",
    keyPerformanceIndicators: "Indicateurs clés de performance",
    serviceRate: "Taux de service",
    resolutionRate: "Taux de résolution",
    noShowRate: "Taux d'absence",
    peakUtilization: "Utilisation maximale",
    activeToday: "Actifs aujourd'hui",
    inQueue: "En file",
    queueDistribution: "Distribution des files",
    customerDistributionByQueue: "Répartition des clients par type de file",
    queueDetails: "Détails des files",
    performanceByQueueType: "Performance par type de file",
    high: "Élevé",
    medium: "Moyen",
    low: "Faible",
    totalQueuesActive: "Total des files actives",
    of: "sur",

    // Manage Queues Page
    queueManagement: "Gestion des files d'attente",
    queueManagementDescription: "Créez, configurez et surveillez vos files de service",
    totalQueues: "Total des files",
    activeServiceQueues: "Files de service actives",
    totalCustomers: "Total clients",
    currentlyInQueues: "Actuellement en files",
    acrossAllQueues: "Toutes files confondues",
    serviceRateStat: "Taux de service",
    customerSatisfaction: "Satisfaction client",
    createQueue: "Créer une file",
    createNewQueue: "Créer une nouvelle file",
    createNewQueueDescription: "Configurez une nouvelle file de service avec des paramètres personnalisés.",
    queueName: "Nom de la file",
    queueNamePlaceholder: "ex: Service Client",
    description: "Description",
    descriptionPlaceholder: "Brève description de la file",
    priorityLevel: "Niveau de priorité",
    selectPriority: "Sélectionner la priorité",
    normal: "Normal",
    maxCapacity: "Capacité max.",
    assignedAgents: "Agents assignés",
    numberOfAgents: "Nombre d'agents",
    searchQueues: "Rechercher des files...",
    allStatus: "Tous les statuts",
    paused: "En pause",
    cards: "Cartes",
    table: "Tableau",
    viewDetails: "Voir les détails",
    editQueue: "Modifier la file",
    duplicate: "Dupliquer",
    pauseQueue: "Suspendre la file",
    resumeQueue: "Reprendre la file",
    deleteQueue: "Supprimer la file",
    queueCapacity: "Capacité de la file",
    waiting: "En attente",
    avgWait: "Attente moy.",
    served: "Servis",
    agentsAssigned: "Agents assignés",
    manage: "Gérer",
    priority: "Priorité",
    agents: "Agents",
    capacity: "Capacité",
    noQueuesFound: "Aucune file trouvée",
    adjustSearchCriteria: "Essayez d'ajuster vos critères de recherche ou de filtre",
    getStartedCreateQueue: "Commencez par créer votre première file de service",
    
    // Common
    loading: "Chargement...",
    active: "Actif",
    inactive: "Inactif",
    create: "Créer",
    edit: "Modifier",
    delete: "Supprimer",
    view: "Voir",
    back: "Retour",
    confirm: "Confirmer",
    actions: "Actions",
    status: "Statut",
    createdAt: "Créé le",
    collapseSidebar: "Réduire la barre latérale",
    expandSidebar: "Développer la barre latérale",
    
    // Walkthrough Tour
    previous: "Précédent",
    next: "Suivant",
    finish: "Terminer",
    tourWelcomeTitle: "Bienvenue dans le tableau de bord",
    tourWelcomeContent: "Voici votre centre de commande. La barre latérale vous donne un accès rapide à toutes les sections du panneau d'administration. Explorons ensemble.",
    tourDashboardTitle: "Aperçu du tableau de bord",
    tourDashboardContent: "Commencez ici pour avoir une vue d'ensemble de vos opérations. Voyez les statistiques en temps réel, l'activité récente et l'état du système.",
    tourOverviewStatsTitle: "Indicateurs clés",
    tourOverviewStatsContent: "Surveillez vos KPI les plus importants : files actives, clients servis, temps d'attente et scores de satisfaction. Mise à jour en temps réel.",
    tourOverviewActivityTitle: "Flux d'activité en direct",
    tourOverviewActivityContent: "Suivez chaque action en temps réel. Ce flux montre les nouveaux clients, services terminés et événements système chronologiquement.",
    tourManageTitle: "Opérations de files",
    tourManageContent: "C'est ici que vous contrôlez vos files d'attente. Créez, suspendez, reprenez ou configurez les files pour optimiser le flux client.",
    tourCreateQueueTitle: "Créer une nouvelle file",
    tourCreateQueueContent: "Cliquez ici pour configurer une nouvelle file. Définissez la capacité, le niveau de priorité et assignez des agents.",
    tourQueueListTitle: "Tableau des files",
    tourQueueListContent: "Chaque carte montre le statut, la capacité, les temps d'attente et le nombre de clients. Utilisez le menu d'action pour gérer les files.",
    tourAnalyticsTitle: "Analytique et rapports",
    tourAnalyticsContent: "Plongez dans vos données de performance. Analysez les tendances, identifiez les heures de pointe et prenez des décisions basées sur les données.",
    tourAnalyticsChartsTitle: "Visualisations",
    tourAnalyticsChartsContent: "Les graphiques interactifs affichent le trafic client, les taux d'efficacité et la distribution des files. Changez de période pour repérer les tendances.",
    tourAnalyticsExportTitle: "Exporter les rapports",
    tourAnalyticsExportContent: "Téléchargez vos données analytiques pour présentations ou analyses. Les rapports incluent toutes les métriques filtrables par date.",
    tourSettingsTitle: "Paramètres système",
    tourSettingsContent: "Personnalisez votre expérience. Configurez les détails commerciaux, préférences de notification, apparence et options de sécurité.",
    tourSettingsTabsTitle: "Catégories de paramètres",
    tourSettingsTabsContent: "Les paramètres sont organisés en onglets : Général pour les infos, Notifications pour les alertes, Apparence pour le thème, et Sécurité.",
    tourSettingsThemeTitle: "Personnalisez votre thème",
    tourSettingsThemeContent: "Choisissez votre palette de couleurs préférée. Sélectionnez parmi plusieurs couleurs d'accent et basculez entre les modes clair, sombre ou système.",
    tourProfileTitle: "Votre profil",
    tourProfileContent: "Gérez vos informations personnelles, mettez à jour vos coordonnées et consultez vos permissions d'accès.",
    tourContentTitle: "Gestion du contenu",
    tourContentContent: "Cette section contient tout le contenu de votre site : À propos, Contacts, Partenaires, Conditions et Confidentialité. Multilingue supporté.",
    tourAboutUsTitle: "Versions À propos",
    tourAboutUsContent: "Créez et gérez différentes versions de votre contenu À propos. Utilisez le versioning pour tester des messages ou préparer des mises à jour.",
    tourCreateVersionTitle: "Créer une version",
    tourCreateVersionContent: "Cliquez ici pour créer une nouvelle version. Une seule version peut être active - la version active s'affiche sur votre site public.",
    tourPartnersTitle: "Répertoire des partenaires",
    tourPartnersContent: "Gérez vos partenariats. Ajoutez logos, coordonnées et descriptions pour les afficher sur votre site.",
    tourContactsTitle: "Gestion des contacts",
    tourContactsContent: "Stockez et organisez vos coordonnées professionnelles : adresses, téléphones, emails et liens réseaux sociaux.",
    tourHeaderActionsTitle: "Actions rapides",
    tourHeaderActionsContent: "Accédez rapidement aux paramètres de langue, notifications et profil. Le bouton d'aide est toujours disponible.",
    tourLanguageSelectorTitle: "Changer de langue",
    tourLanguageSelectorContent: "Le tableau de bord supporte l'anglais, le français et l'arabe. Changez instantanément - tout le contenu se met à jour automatiquement.",
    tourLogoutTitle: "Vous êtes prêt !",
    tourLogoutContent: "C'est la fin de la visite ! Vous savez maintenant naviguer dans le tableau de bord. Vous pouvez relancer cette visite en cliquant sur le bouton d'aide.",
  },
  ar: {
    // Sidebar Navigation
    navigation: "التنقل",
    dashboard: "لوحة التحكم",
    manageQueues: "إدارة الطوابير",
    analytics: "التحليلات",
    settings: "الإعدادات",
    myProfile: "ملفي الشخصي",
    content: "المحتوى",
    aboutUs: "من نحن",
    allVersions: "جميع الإصدارات",
    createNew: "إنشاء جديد",
    contact: "اتصل بنا",
    viewContact: "عرض الاتصال",
    addContact: "إضافة اتصال",
    partners: "الشركاء",
    viewPartners: "عرض الشركاء",
    addPartner: "إضافة شريك",
    terms: "الشروط",
    viewTerms: "عرض الشروط",
    privacy: "الخصوصية",
    viewPolicies: "عرض السياسات",
    categories: "الفئات",
    viewCategories: "عرض الفئات",
    addCategory: "إضافة فئة",
    services: "الخدمات",
    viewServices: "عرض الخدمات",
    addService: "إضافة خدمة",
    professionals: "المهنيون",
    viewProfessionals: "عرض المهنيين",
    addProfessional: "إضافة مهني",
    
    // Header
    language: "اللغة",
    help: "مساعدة",
    notifications: "الإشعارات",
    profile: "الملف الشخصي",
    signOut: "تسجيل الخروج",
    signingOut: "جاري الخروج...",
    search: "بحث...",
    adminPortal: "بوابة الإدارة",
    superAdmin: "مدير عام",
    
    // Profile Page
    profileTitle: "الملف الشخصي",
    editProfile: "تعديل الملف الشخصي",
    updateProfileInfo: "قم بتحديث معلومات ملفك الشخصي أدناه.",
    contactInformation: "معلومات الاتصال",
    accountDetails: "تفاصيل الحساب",
    preferences: "التفضيلات",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    location: "الموقع",
    accessLevel: "مستوى الوصول",
    memberSince: "عضو منذ",
    organization: "المنظمة",
    languagePreference: "اللغة",
    timezone: "المنطقة الزمنية",
    theme: "المظهر",
    name: "الاسم",
    phoneNumber: "رقم الهاتف",
    save: "حفظ",
    cancel: "إلغاء",
    saveChanges: "حفظ التغييرات",
    loadingProfile: "جاري تحميل الملف الشخصي...",
    failedToLoadProfile: "فشل في تحميل الملف الشخصي. يرجى المحاولة مرة أخرى لاحقاً.",
    
    // Settings Page
    settingsTitle: "الإعدادات",
    settingsDescription: "إدارة تفضيلات النظام والتكوينات",
    unsavedChanges: "تغييرات غير محفوظة",
    reset: "إعادة تعيين",
    general: "عام",
    notificationsTab: "الإشعارات",
    appearance: "المظهر",
    security: "الأمان",
    businessInformation: "معلومات العمل",
    organizationDetails: "تفاصيل مؤسستك",
    businessName: "اسم العمل",
    contactEmail: "البريد الإلكتروني للاتصال",
    contactPhone: "هاتف الاتصال",
    businessAddress: "عنوان العمل",
    regionalSettings: "الإعدادات الإقليمية",
    timezoneLanguage: "تفضيلات المنطقة الزمنية واللغة",
    selectTimezone: "اختر المنطقة الزمنية",
    defaultLanguage: "اللغة الافتراضية",
    selectLanguage: "اختر اللغة",
    dateFormat: "تنسيق التاريخ",
    selectFormat: "اختر التنسيق",
    timeFormat: "تنسيق الوقت",
    queueConfiguration: "تكوين الطابور",
    queueBehavior: "تخصيص سلوك الطابور والإعدادات الافتراضية",
    defaultQueueCapacity: "السعة الافتراضية للطابور",
    avgServiceTime: "متوسط وقت الخدمة (دقائق)",
    autoRefreshInterval: "فترة التحديث التلقائي (ثواني)",
    emailNotifications: "إشعارات البريد الإلكتروني",
    emailAlertPrefs: "تكوين تفضيلات تنبيه البريد الإلكتروني",
    customerQueueUpdates: "تحديثات طابور العملاء",
    sendEmailWhenNext: "إرسال بريد إلكتروني عندما يكون العميل التالي",
    dailyReports: "التقارير اليومية",
    receiveDailySummary: "استلام ملخص الطابور اليومي",
    systemAlerts: "تنبيهات النظام",
    criticalNotifications: "إشعارات النظام الحرجة",
    marketingUpdates: "تحديثات التسويق",
    newsAndFeatures: "الأخبار وتحديثات الميزات",
    smsNotifications: "إشعارات الرسائل القصيرة",
    smsAlertPrefs: "تكوين تفضيلات تنبيه الرسائل القصيرة",
    queuePositionUpdates: "تحديثات موقع الطابور",
    notifyPositionChanges: "إعلام عند تغيير الموقع",
    turnApproaching: "الدور يقترب",
    alertTurnComing: "تنبيه عندما يقترب الدور",
    serviceComplete: "اكتملت الخدمة",
    confirmationAfterService: "تأكيد بعد الخدمة",
    feedbackRequests: "طلبات التعليقات",
    askForRating: "طلب تقييم بعد الخدمة",
    inAppNotifications: "الإشعارات داخل التطبيق",
    dashboardNotificationPrefs: "تفضيلات إشعارات لوحة التحكم",
    realTimeAlerts: "تنبيهات في الوقت الفعلي",
    liveQueueUpdates: "تحديثات الطابور المباشرة في لوحة التحكم",
    desktopNotifications: "إشعارات سطح المكتب",
    showDesktopAlerts: "عرض إشعارات المتصفح",
    soundAlerts: "تنبيهات صوتية",
    playSoundAlerts: "تشغيل صوت للأحداث الجديدة",
    themeMode: "وضع المظهر",
    interfaceTheme: "اختر مظهر الواجهة",
    lightMode: "فاتح",
    darkMode: "داكن",
    systemDefault: "النظام",
    accentColor: "اللون المميز",
    colorPalette: "لوحة الألوان",
    primaryBrandColor: "اختر لون علامتك التجارية الأساسي",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور الجديدة",
    passwordRequirements: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل مع حروف كبيرة وصغيرة وأرقام",
    changePassword: "تغيير كلمة المرور",
    twoFactorAuth: "المصادقة الثنائية",
    twoFactorDescription: "أضف طبقة أمان إضافية لحسابك",
    enabled: "مفعل",
    disabled: "معطل",
    enable2FA: "تفعيل المصادقة الثنائية",
    disable2FA: "تعطيل المصادقة الثنائية",
    sessionManagement: "إدارة الجلسات",
    sessionDescription: "إدارة جلساتك النشطة",
    currentSession: "الجلسة الحالية",
    activeSince: "نشط منذ",
    signOutOtherSessions: "تسجيل الخروج من الجلسات الأخرى",
    settingsSaved: "تم حفظ الإعدادات بنجاح",
    settingsReset: "تمت إعادة تعيين الإعدادات إلى الافتراضية",
    
    // Analytics Page
    analyticsTitle: "التحليلات",
    analyticsDescription: "رؤى ومقاييس الأداء لطوابيرك",
    period: "الفترة",
    last7Days: "آخر 7 أيام",
    last30Days: "آخر 30 يوم",
    last90Days: "آخر 90 يوم",
    lastYear: "العام الماضي",
    refresh: "تحديث",
    export: "تصدير",
    totalServed: "إجمالي الخدمات",
    thisMonth: "هذا الشهر",
    avgWaitTime: "متوسط الانتظار",
    vsLastMonth: "مقارنة بالشهر الماضي",
    efficiencyRate: "معدل الكفاءة",
    serviceEfficiency: "كفاءة الخدمة",
    satisfaction: "الرضا",
    customerRating: "تقييم العملاء",
    overview: "نظرة عامة",
    performance: "الأداء",
    distribution: "التوزيع",
    customerTraffic: "حركة العملاء",
    weeklyCustomerFlow: "تحليل تدفق العملاء الأسبوعي",
    peakHours: "ساعات الذروة",
    hourlyDistribution: "توزيع العملاء بالساعة",
    today: "اليوم",
    monthlyTrend: "الاتجاه الشهري",
    sixMonthOverview: "نظرة عامة على 6 أشهر",
    customersServed: "العملاء الذين تمت خدمتهم",
    customers: "العملاء",
    efficiencyMetrics: "مقاييس الكفاءة",
    weeklyEfficiencyAnalysis: "تحليل الكفاءة ووقت الانتظار الأسبوعي",
    summary: "ملخص",
    keyPerformanceIndicators: "مؤشرات الأداء الرئيسية",
    serviceRate: "معدل الخدمة",
    resolutionRate: "معدل الحل",
    noShowRate: "معدل الغياب",
    peakUtilization: "الاستخدام الأقصى",
    activeToday: "النشطون اليوم",
    inQueue: "في الطابور",
    queueDistribution: "توزيع الطوابير",
    customerDistributionByQueue: "توزيع العملاء حسب نوع الطابور",
    queueDetails: "تفاصيل الطوابير",
    performanceByQueueType: "الأداء حسب نوع الطابور",
    high: "عالي",
    medium: "متوسط",
    low: "منخفض",
    totalQueuesActive: "إجمالي الطوابير النشطة",
    of: "من",

    // Manage Queues Page
    queueManagement: "إدارة الطوابير",
    queueManagementDescription: "إنشاء وتكوين ومراقبة طوابير الخدمة",
    totalQueues: "إجمالي الطوابير",
    activeServiceQueues: "طوابير الخدمة النشطة",
    totalCustomers: "إجمالي العملاء",
    currentlyInQueues: "حالياً في الطوابير",
    acrossAllQueues: "عبر جميع الطوابير",
    serviceRateStat: "معدل الخدمة",
    customerSatisfaction: "رضا العملاء",
    createQueue: "إنشاء طابور",
    createNewQueue: "إنشاء طابور جديد",
    createNewQueueDescription: "قم بإعداد طابور خدمة جديد مع إعدادات مخصصة.",
    queueName: "اسم الطابور",
    queueNamePlaceholder: "مثال: خدمة العملاء",
    description: "الوصف",
    descriptionPlaceholder: "وصف مختصر للطابور",
    priorityLevel: "مستوى الأولوية",
    selectPriority: "اختر الأولوية",
    normal: "عادي",
    maxCapacity: "السعة القصوى",
    assignedAgents: "الوكلاء المعينون",
    numberOfAgents: "عدد الوكلاء",
    searchQueues: "البحث في الطوابير...",
    allStatus: "جميع الحالات",
    paused: "متوقف مؤقتاً",
    cards: "بطاقات",
    table: "جدول",
    viewDetails: "عرض التفاصيل",
    editQueue: "تعديل الطابور",
    duplicate: "تكرار",
    pauseQueue: "إيقاف الطابور مؤقتاً",
    resumeQueue: "استئناف الطابور",
    deleteQueue: "حذف الطابور",
    queueCapacity: "سعة الطابور",
    waiting: "في الانتظار",
    avgWait: "متوسط الانتظار",
    served: "تمت الخدمة",
    agentsAssigned: "وكلاء معينون",
    manage: "إدارة",
    priority: "الأولوية",
    agents: "الوكلاء",
    capacity: "السعة",
    noQueuesFound: "لم يتم العثور على طوابير",
    adjustSearchCriteria: "حاول تعديل معايير البحث أو التصفية",
    getStartedCreateQueue: "ابدأ بإنشاء أول طابور خدمة لك",
    
    // Common
    loading: "جاري التحميل...",
    active: "نشط",
    inactive: "غير نشط",
    create: "إنشاء",
    edit: "تعديل",
    delete: "حذف",
    view: "عرض",
    back: "رجوع",
    confirm: "تأكيد",
    actions: "الإجراءات",
    status: "الحالة",
    createdAt: "تاريخ الإنشاء",
    collapseSidebar: "طي الشريط الجانبي",
    expandSidebar: "توسيع الشريط الجانبي",
    
    // Walkthrough Tour
    previous: "السابق",
    next: "التالي",
    finish: "إنهاء",
    tourWelcomeTitle: "مرحباً بك في لوحة التحكم",
    tourWelcomeContent: "هذا هو مركز التحكم الخاص بك. يوفر الشريط الجانبي وصولاً سريعاً لجميع أقسام لوحة الإدارة. دعنا نستكشف ما يمكنك فعله.",
    tourDashboardTitle: "نظرة عامة على لوحة التحكم",
    tourDashboardContent: "ابدأ هنا للحصول على رؤية شاملة لعملياتك. راقب الإحصائيات في الوقت الفعلي والنشاط الأخير وصحة النظام.",
    tourOverviewStatsTitle: "المؤشرات الرئيسية",
    tourOverviewStatsContent: "راقب أهم مؤشرات الأداء: الطوابير النشطة، العملاء المخدومين، أوقات الانتظار، ودرجات الرضا. تحديث في الوقت الفعلي.",
    tourOverviewActivityTitle: "تغذية النشاط المباشر",
    tourOverviewActivityContent: "تتبع كل إجراء لحظة حدوثه. هذه التغذية تعرض العملاء الجدد والخدمات المكتملة وأحداث النظام.",
    tourManageTitle: "عمليات الطوابير",
    tourManageContent: "هنا تتحكم في طوابير الخدمة. أنشئ أو أوقف أو استأنف أو كوّن الطوابير لتحسين تدفق العملاء.",
    tourCreateQueueTitle: "إنشاء طابور جديد",
    tourCreateQueueContent: "انقر هنا لإعداد طابور خدمة جديد. حدد السعة ومستوى الأولوية وعيّن الوكلاء لبدء خدمة العملاء.",
    tourQueueListTitle: "لوحة الطوابير",
    tourQueueListContent: "كل بطاقة تعرض حالة الطابور وسعته وأوقات الانتظار وعدد العملاء. استخدم قائمة الإجراءات للإدارة.",
    tourAnalyticsTitle: "التحليلات والتقارير",
    tourAnalyticsContent: "تعمق في بيانات أدائك. حلل الاتجاهات وحدد ساعات الذروة واتخذ قرارات مبنية على البيانات.",
    tourAnalyticsChartsTitle: "رؤى بصرية",
    tourAnalyticsChartsContent: "الرسوم البيانية التفاعلية تعرض حركة العملاء ومعدلات الكفاءة وتوزيع الطوابير. بدّل بين الفترات الزمنية.",
    tourAnalyticsExportTitle: "تصدير التقارير",
    tourAnalyticsExportContent: "حمّل بيانات التحليلات للعروض التقديمية أو التحليل الإضافي. التقارير تشمل جميع المقاييس ويمكن تصفيتها.",
    tourSettingsTitle: "إعدادات النظام",
    tourSettingsContent: "خصص تجربتك. كوّن تفاصيل العمل وتفضيلات الإشعارات والمظهر وخيارات الأمان.",
    tourSettingsTabsTitle: "فئات الإعدادات",
    tourSettingsTabsContent: "الإعدادات منظمة في علامات تبويب: عام للمعلومات، الإشعارات للتنبيهات، المظهر للثيم، والأمان لكلمة المرور.",
    tourSettingsThemeTitle: "خصص ثيمك",
    tourSettingsThemeContent: "اختر نظام الألوان المفضل لديك. اختر من ألوان متعددة وبدّل بين الوضع الفاتح والداكن أو وضع النظام.",
    tourProfileTitle: "ملفك الشخصي",
    tourProfileContent: "أدر معلومات حسابك الشخصية وحدّث تفاصيل الاتصال واعرض صلاحيات الوصول الخاصة بك.",
    tourContentTitle: "إدارة المحتوى",
    tourContentContent: "يضم هذا القسم جميع محتويات موقعك: من نحن، الاتصال، الشركاء، الشروط والخصوصية. يدعم تعدد اللغات.",
    tourAboutUsTitle: "إصدارات من نحن",
    tourAboutUsContent: "أنشئ وأدر إصدارات مختلفة من محتوى من نحن. استخدم الإصدارات لاختبار الرسائل أو تحضير التحديثات.",
    tourCreateVersionTitle: "إنشاء إصدار محتوى",
    tourCreateVersionContent: "انقر هنا لإنشاء إصدار جديد. إصدار واحد فقط يمكن أن يكون نشطاً - الإصدار النشط يظهر على موقعك العام.",
    tourPartnersTitle: "دليل الشركاء",
    tourPartnersContent: "أدر شراكاتك التجارية. أضف الشعارات ومعلومات الاتصال والأوصاف لعرضها على موقعك.",
    tourContactsTitle: "إدارة جهات الاتصال",
    tourContactsContent: "خزّن ونظّم معلومات الاتصال التجارية بما في ذلك العناوين وأرقام الهاتف والبريد الإلكتروني وروابط التواصل.",
    tourHeaderActionsTitle: "إجراءات سريعة",
    tourHeaderActionsContent: "الوصول السريع لإعدادات اللغة والإشعارات وملفك الشخصي. زر المساعدة متاح دائماً.",
    tourLanguageSelectorTitle: "تبديل اللغات",
    tourLanguageSelectorContent: "لوحة التحكم تدعم الإنجليزية والفرنسية والعربية. بدّل اللغات فوراً - جميع المحتوى يتحدث تلقائياً.",
    tourLogoutTitle: "أنت جاهز!",
    tourLogoutContent: "انتهت الجولة! أنت الآن تعرف كيفية التنقل في لوحة التحكم. يمكنك إعادة تشغيل هذه الجولة بالنقر على زر المساعدة.",
  },
};

interface AdminTranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const AdminTranslationContext = createContext<AdminTranslationContextType | undefined>(undefined);

export function AdminTranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("admin-language");
    return (saved as Language) || "fr"; // Default to French
  });

  const isRTL = language === "ar";

  useEffect(() => {
    localStorage.setItem("admin-language", language);
    // Apply RTL to document when in admin
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [language, isRTL]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isRTL,
  };

  return (
    <AdminTranslationContext.Provider value={value}>
      {children}
    </AdminTranslationContext.Provider>
  );
}

export function useAdminTranslation() {
  const context = useContext(AdminTranslationContext);
  if (context === undefined) {
    throw new Error("useAdminTranslation must be used within an AdminTranslationProvider");
  }
  return context;
}
