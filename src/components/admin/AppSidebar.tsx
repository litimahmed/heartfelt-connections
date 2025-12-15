import { useState, useCallback } from "react";
import { LayoutDashboard, Users, Settings, BarChart3, FileText, ChevronDown, Info, Phone, Handshake, Eye, Plus, Layers, Shield, Ban, FolderTree, Briefcase, UserCog, PanelLeftClose, PanelLeft, UserCircle } from "lucide-react";
import toorriLogo from "@/assets/toorrii-logo.png";
import { useContacts } from "@/hooks/admin/useContacts";
import { NavLink } from "@/components/admin/NavLink";
import { useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAdminTranslation } from "@/contexts/AdminTranslationContext";

export function AppSidebar() {
    const { open, toggleSidebar } = useSidebar();
    const location = useLocation();
    const currentPath = location.pathname;
    const { contact } = useContacts();
    const { t, isRTL } = useAdminTranslation();

    const isActive = useCallback((path: string) => currentPath === path, [currentPath]);
    const isPathStartsWith = useCallback((path: string) => currentPath.startsWith(path), [currentPath]);

    const isContentActive = isPathStartsWith("/admin/about-us") || isPathStartsWith("/admin/contacts") || isPathStartsWith("/admin/partners") || isPathStartsWith("/admin/terms") || isPathStartsWith("/admin/privacy-policy");
    const isAboutUsActive = isPathStartsWith("/admin/about-us");
    const isContactActive = isPathStartsWith("/admin/contacts");
    const isPartnersActive = isPathStartsWith("/admin/partners");
    const isTermsActive = isPathStartsWith("/admin/terms");
    const isPrivacyActive = isPathStartsWith("/admin/privacy-policy");
    const isCategoriesActive = isPathStartsWith("/admin/categories");
    const isServicesActive = isPathStartsWith("/admin/services");
    const isProfessionalsActive = isPathStartsWith("/admin/professionals");

    const [contentOpen, setContentOpen] = useState(true);
    const [aboutUsOpen, setAboutUsOpen] = useState(isAboutUsActive);
    const [contactOpen, setContactOpen] = useState(isContactActive);
    const [partnersOpen, setPartnersOpen] = useState(isPartnersActive);
    const [termsOpen, setTermsOpen] = useState(isTermsActive);
    const [privacyOpen, setPrivacyOpen] = useState(isPrivacyActive);
    const [categoriesOpen, setCategoriesOpen] = useState(true);
    const [servicesOpen, setServicesOpen] = useState(true);
    const [professionalsOpen, setProfessionalsOpen] = useState(true);

    const mainItems = [
        { title: t.dashboard, url: "/admin/dashboard", icon: LayoutDashboard, tourId: "dashboard" },
        { title: t.manageQueues, url: "/admin/manage", icon: Users, tourId: "manage-queues" },
        { title: t.analytics, url: "/admin/analytics", icon: BarChart3, tourId: "analytics" },
    ];

    const settingsItems = [
        { title: t.settings, url: "/admin/settings", icon: Settings, tourId: "settings" },
        { title: t.myProfile, url: "/admin/profile", icon: UserCircle, tourId: "profile" },
    ];

    const chevronClass = isRTL ? "-rotate-90" : "";
    const chevronOpenClass = isRTL ? "rotate-90" : "rotate-180";

    return (
        <Sidebar
            side={isRTL ? "right" : "left"}
            className={`${open ? "w-64" : "w-16"} transition-all duration-300 ${isRTL ? "border-l-0" : "border-r-0"} shadow-[var(--shadow-sidebar)]`}
            collapsible="icon"
            data-tour="sidebar"
        >
            <div className="flex flex-col h-full bg-[hsl(var(--sidebar-background))]">
                <SidebarContent className="flex-1 sidebar-scrollbar-auto overflow-y-auto overflow-x-hidden">
                    {/* Logo Section */}
                    <SidebarHeader className="border-b border-sidebar-border">
                        <div className={`flex items-center justify-between ${open ? "px-3 py-3" : "px-2 py-3"} transition-all duration-300 ease-in-out ${isRTL && open ? "flex-row-reverse" : ""}`}>
                            <div className={`flex items-center ${open ? "gap-3" : "justify-center w-full"} overflow-hidden ${isRTL && open ? "flex-row-reverse" : ""}`}>
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={toorriLogo}
                                        alt="Toorrii"
                                        className={`object-contain transition-all duration-300 ease-in-out ${open ? "h-14 w-auto" : "h-10 w-10"}`}
                                    />
                                </div>
                                {open && (
                                    <div className={`flex flex-col min-w-0 animate-fade-in ${isRTL ? "items-end" : ""}`}>
                                        <h1 className="text-lg font-bold text-foreground tracking-tight truncate">Toorrii</h1>
                                        <span className="text-[11px] text-muted-foreground font-medium -mt-0.5 truncate">{t.adminPortal}</span>
                                    </div>
                                )}
                            </div>
                            {open && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleSidebar}
                                            className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                                            aria-label={t.collapseSidebar}
                                        >
                                            <PanelLeftClose className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side={isRTL ? "left" : "right"} sideOffset={8}>
                                        <p>{t.collapseSidebar}</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                        {!open && (
                            <div className="px-2 pb-2">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleSidebar}
                                            className="h-8 w-full text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                                            aria-label={t.expandSidebar}
                                        >
                                            <PanelLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side={isRTL ? "left" : "right"} sideOffset={8}>
                                        <p>{t.expandSidebar}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        )}
                    </SidebarHeader>

                    {/* Main Navigation Section */}
                    <SidebarGroup className="px-3 py-2">
                        {open && (
                            <SidebarGroupLabel className={`text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1 ${isRTL ? "text-right" : ""}`}>
                                {t.navigation}
                            </SidebarGroupLabel>
                        )}

                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-0.5">
                                {mainItems.map(item => {
                                    const active = isActive(item.url);
                                    return (
                                        <SidebarMenuItem key={item.title} data-tour={item.tourId}>
                                            <SidebarMenuButton asChild>
                                                <NavLink
                                                    to={item.url}
                                                    end
                                                    className={`
                          ${open ? "px-3 py-2.5" : "px-2 py-2.5 justify-center"}
                          rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center gap-3
                          group relative
                          ${isRTL && open ? "flex-row-reverse" : ""}
                        `}
                                                    activeClassName={`
                          bg-primary text-primary-foreground font-medium
                          shadow-sm shadow-primary/20
                          hover:bg-primary hover:text-primary-foreground
                        `}
                                                >
                                                    <item.icon className={`h-[18px] w-[18px] flex-shrink-0 transition-transform group-hover:scale-105 ${active ? "text-primary-foreground" : ""}`} />
                                                    {open && <span className="text-sm">{item.title}</span>}
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Settings Section */}
                    <SidebarGroup className="px-3 py-2">
                        {open && (
                            <SidebarGroupLabel className={`text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1 ${isRTL ? "text-right" : ""}`}>
                                {t.settings}
                            </SidebarGroupLabel>
                        )}

                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-0.5">
                                {settingsItems.map(item => {
                                    const active = isActive(item.url);
                                    return (
                                        <SidebarMenuItem key={item.title} data-tour={item.tourId}>
                                            <SidebarMenuButton asChild>
                                                <NavLink
                                                    to={item.url}
                                                    end
                                                    className={`
                          ${open ? "px-3 py-2.5" : "px-2 py-2.5 justify-center"}
                          rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center gap-3
                          group relative
                          ${isRTL && open ? "flex-row-reverse" : ""}
                        `}
                                                    activeClassName={`
                          bg-primary text-primary-foreground font-medium
                          shadow-sm shadow-primary/20
                          hover:bg-primary hover:text-primary-foreground
                        `}
                                                >
                                                    <item.icon className={`h-[18px] w-[18px] flex-shrink-0 transition-transform group-hover:scale-105 ${active ? "text-primary-foreground" : ""}`} />
                                                    {open && <span className="text-sm">{item.title}</span>}
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Content Management Section */}
                    <SidebarGroup className="px-3 py-2">
                        {open && (
                            <SidebarGroupLabel className={`text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1 ${isRTL ? "text-right" : ""}`}>
                                {t.content}
                            </SidebarGroupLabel>
                        )}

                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-0.5">
                                {open ? (
                                    <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuItem data-tour="content">
                                                <SidebarMenuButton
                                                    className={`
                          px-3 py-2.5 rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center justify-between w-full
                          ${isContentActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                          ${isRTL ? "flex-row-reverse" : ""}
                        `}
                                                >
                                                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                        <FileText className={`h-[18px] w-[18px] ${isContentActive ? "text-primary" : ""}`} />
                                                        <span className="text-sm">{t.content}</span>
                                                    </div>
                                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${contentOpen ? chevronOpenClass : chevronClass}`} />
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="mt-0.5 space-y-0.5">
                                            {/* About Us Menu */}
                                            <Collapsible open={aboutUsOpen} onOpenChange={setAboutUsOpen}>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuItem data-tour="about-us">
                                                        <SidebarMenuButton
                                                            className={`
                              ${isRTL ? "mr-3" : "ml-3"} px-3 py-2 rounded-lg transition-all duration-150
                              text-muted-foreground hover:text-foreground
                              hover:bg-sidebar-accent
                              flex items-center justify-between w-[calc(100%-12px)]
                              text-sm
                              ${isAboutUsActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                              ${isRTL ? "flex-row-reverse" : ""}
                            `}
                                                        >
                                                            <div className={`flex items-center gap-2.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                                <Info className={`h-4 w-4 ${isAboutUsActive ? "text-primary" : ""}`} />
                                                                <span>{t.aboutUs}</span>
                                                            </div>
                                                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${aboutUsOpen ? chevronOpenClass : chevronClass}`} />
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="mt-0.5 space-y-0.5">
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <NavLink
                                                                to="/admin/about-us/versions"
                                                                end
                                                                className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                                activeClassName="bg-primary/10 text-primary font-medium"
                                                            >
                                                                <Layers className="h-3.5 w-3.5" />
                                                                <span>{t.allVersions}</span>
                                                            </NavLink>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <NavLink
                                                                to="/admin/about-us/create"
                                                                className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                                activeClassName="bg-primary/10 text-primary font-medium"
                                                            >
                                                                <Plus className="h-3.5 w-3.5" />
                                                                <span>{t.createNew}</span>
                                                            </NavLink>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleContent>
                                            </Collapsible>

                                            {/* Contact Menu */}
                                            <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuItem data-tour="contacts">
                                                        <SidebarMenuButton
                                                            className={`
                              ${isRTL ? "mr-3" : "ml-3"} px-3 py-2 rounded-lg transition-all duration-150
                              text-muted-foreground hover:text-foreground
                              hover:bg-sidebar-accent
                              flex items-center justify-between w-[calc(100%-12px)]
                              text-sm
                              ${isContactActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                              ${isRTL ? "flex-row-reverse" : ""}
                            `}
                                                        >
                                                            <div className={`flex items-center gap-2.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                                <Phone className={`h-4 w-4 ${isContactActive ? "text-primary" : ""}`} />
                                                                <span>{t.contact}</span>
                                                            </div>
                                                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${contactOpen ? chevronOpenClass : chevronClass}`} />
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="mt-0.5 space-y-0.5">
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <NavLink
                                                                to="/admin/contacts"
                                                                end
                                                                className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                                activeClassName="bg-primary/10 text-primary font-medium"
                                                            >
                                                                <Eye className="h-3.5 w-3.5" />
                                                                <span>{t.viewContact}</span>
                                                            </NavLink>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild={!contact}>
                                                            {contact ? (
                                                                <div className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md flex items-center gap-2.5 text-[13px] text-muted-foreground/50 cursor-not-allowed w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}>
                                                                    <Ban className="h-3.5 w-3.5" />
                                                                    <span>{t.addContact}</span>
                                                                </div>
                                                            ) : (
                                                                <NavLink
                                                                    to="/admin/contacts/create"
                                                                    className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                                    activeClassName="bg-primary/10 text-primary font-medium"
                                                                >
                                                                    <Plus className="h-3.5 w-3.5" />
                                                                    <span>{t.addContact}</span>
                                                                </NavLink>
                                                            )}
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleContent>
                                            </Collapsible>

                                            {/* Partners Menu */}
                                            <Collapsible open={partnersOpen} onOpenChange={setPartnersOpen}>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuItem data-tour="partners">
                                                        <SidebarMenuButton
                                                            className={`
                              ${isRTL ? "mr-3" : "ml-3"} px-3 py-2 rounded-lg transition-all duration-150
                              text-muted-foreground hover:text-foreground
                              hover:bg-sidebar-accent
                              flex items-center justify-between w-[calc(100%-12px)]
                              text-sm
                              ${isPartnersActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                              ${isRTL ? "flex-row-reverse" : ""}
                            `}
                                                        >
                                                            <div className={`flex items-center gap-2.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                                <Handshake className={`h-4 w-4 ${isPartnersActive ? "text-primary" : ""}`} />
                                                                <span>{t.partners}</span>
                                                            </div>
                                                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${partnersOpen ? chevronOpenClass : chevronClass}`} />
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="mt-0.5 space-y-0.5">
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <NavLink
                                                                to="/admin/partners"
                                                                end
                                                                className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                                activeClassName="bg-primary/10 text-primary font-medium"
                                                            >
                                                                <Eye className="h-3.5 w-3.5" />
                                                                <span>{t.viewPartners}</span>
                                                            </NavLink>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <NavLink
                                                                to="/admin/partners/create"
                                                                className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                                activeClassName="bg-primary/10 text-primary font-medium"
                                                            >
                                                                <Plus className="h-3.5 w-3.5" />
                                                                <span>{t.addPartner}</span>
                                                            </NavLink>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleContent>
                                            </Collapsible>

                                            {/* Terms and Conditions Menu */}
                                            <Collapsible open={termsOpen} onOpenChange={setTermsOpen}>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton
                                                            className={`
                              ${isRTL ? "mr-3" : "ml-3"} px-3 py-2 rounded-lg transition-all duration-150
                              text-muted-foreground hover:text-foreground
                              hover:bg-sidebar-accent
                              flex items-center justify-between w-[calc(100%-12px)]
                              text-sm
                              ${isTermsActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                              ${isRTL ? "flex-row-reverse" : ""}
                            `}
                                                        >
                                                            <div className={`flex items-center gap-2.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                                <Shield className={`h-4 w-4 ${isTermsActive ? "text-primary" : ""}`} />
                                                                <span>{t.terms}</span>
                                                            </div>
                                                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${termsOpen ? chevronOpenClass : chevronClass}`} />
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="mt-0.5 space-y-0.5">
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <NavLink
                                                                to="/admin/terms"
                                                                end
                                                                className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                                activeClassName="bg-primary/10 text-primary font-medium"
                                                            >
                                                                <Eye className="h-3.5 w-3.5" />
                                                                <span>{t.viewTerms}</span>
                                                            </NavLink>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <NavLink
                                                                to="/admin/terms/create"
                                                                className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                                activeClassName="bg-primary/10 text-primary font-medium"
                                                            >
                                                                <Plus className="h-3.5 w-3.5" />
                                                                <span>{t.createNew}</span>
                                                            </NavLink>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleContent>
                                            </Collapsible>

                                            {/* Privacy Policy Menu */}
                                            <Collapsible open={privacyOpen} onOpenChange={setPrivacyOpen}>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton
                                                            className={`
                              ${isRTL ? "mr-3" : "ml-3"} px-3 py-2 rounded-lg transition-all duration-150
                              text-muted-foreground hover:text-foreground
                              hover:bg-sidebar-accent
                              flex items-center justify-between w-[calc(100%-12px)]
                              text-sm
                              ${isPrivacyActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                              ${isRTL ? "flex-row-reverse" : ""}
                            `}
                                                        >
                                                            <div className={`flex items-center gap-2.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                                <Shield className={`h-4 w-4 ${isPrivacyActive ? "text-primary" : ""}`} />
                                                                <span>{t.privacy}</span>
                                                            </div>
                                                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${privacyOpen ? chevronOpenClass : chevronClass}`} />
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="mt-0.5 space-y-0.5">
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <NavLink
                                                                to="/admin/privacy-policy"
                                                                end
                                                                className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                                activeClassName="bg-primary/10 text-primary font-medium"
                                                            >
                                                                <Eye className="h-3.5 w-3.5" />
                                                                <span>{t.viewPolicies}</span>
                                                            </NavLink>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <NavLink
                                                                to="/admin/privacy-policy/create"
                                                                className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                                activeClassName="bg-primary/10 text-primary font-medium"
                                                            >
                                                                <Plus className="h-3.5 w-3.5" />
                                                                <span>{t.createNew}</span>
                                                            </NavLink>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleContent>
                                            </Collapsible>

                                        </CollapsibleContent>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <NavLink
                                                to="/admin/about-us/versions"
                                                className="px-2 py-2.5 justify-center rounded-lg transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center"
                                                activeClassName="bg-primary text-primary-foreground"
                                            >
                                                <FileText className="h-[18px] w-[18px]" />
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Categories Section */}
                    <SidebarGroup className="px-3 py-2">
                        {open && (
                            <SidebarGroupLabel className={`text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1 ${isRTL ? "text-right" : ""}`}>
                                {t.categories}
                            </SidebarGroupLabel>
                        )}

                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-0.5">
                                {open ? (
                                    <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton
                                                    className={`
                          px-3 py-2.5 rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center justify-between w-full
                          ${isCategoriesActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                          ${isRTL ? "flex-row-reverse" : ""}
                        `}
                                                >
                                                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                        <FolderTree className={`h-[18px] w-[18px] ${isCategoriesActive ? "text-primary" : ""}`} />
                                                        <span className="text-sm">{t.categories}</span>
                                                    </div>
                                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${categoriesOpen ? chevronOpenClass : chevronClass}`} />
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="mt-0.5 space-y-0.5">
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <NavLink
                                                        to="/admin/categories"
                                                        end
                                                        className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                        activeClassName="bg-primary/10 text-primary font-medium"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                        <span>{t.viewCategories}</span>
                                                    </NavLink>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <NavLink
                                                        to="/admin/categories/create"
                                                        className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                        activeClassName="bg-primary/10 text-primary font-medium"
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                        <span>{t.addCategory}</span>
                                                    </NavLink>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <NavLink
                                                to="/admin/categories"
                                                className="px-2 py-2.5 justify-center rounded-lg transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center"
                                                activeClassName="bg-primary text-primary-foreground"
                                            >
                                                <FolderTree className="h-[18px] w-[18px]" />
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Services Section */}
                    <SidebarGroup className="px-3 py-2">
                        {open && (
                            <SidebarGroupLabel className={`text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1 ${isRTL ? "text-right" : ""}`}>
                                {t.services}
                            </SidebarGroupLabel>
                        )}

                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-0.5">
                                {open ? (
                                    <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton
                                                    className={`
                          px-3 py-2.5 rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center justify-between w-full
                          ${isServicesActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                          ${isRTL ? "flex-row-reverse" : ""}
                        `}
                                                >
                                                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                        <Briefcase className={`h-[18px] w-[18px] ${isServicesActive ? "text-primary" : ""}`} />
                                                        <span className="text-sm">{t.services}</span>
                                                    </div>
                                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? chevronOpenClass : chevronClass}`} />
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="mt-0.5 space-y-0.5">
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <NavLink
                                                        to="/admin/services"
                                                        end
                                                        className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                        activeClassName="bg-primary/10 text-primary font-medium"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                        <span>{t.viewServices}</span>
                                                    </NavLink>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <NavLink
                                                        to="/admin/services/create"
                                                        className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                        activeClassName="bg-primary/10 text-primary font-medium"
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                        <span>{t.addService}</span>
                                                    </NavLink>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <NavLink
                                                to="/admin/services"
                                                className="px-2 py-2.5 justify-center rounded-lg transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center"
                                                activeClassName="bg-primary text-primary-foreground"
                                            >
                                                <Briefcase className="h-[18px] w-[18px]" />
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Professionals Section */}
                    <SidebarGroup className="px-3 py-2">
                        {open && (
                            <SidebarGroupLabel className={`text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-3 mb-1 ${isRTL ? "text-right" : ""}`}>
                                {t.professionals}
                            </SidebarGroupLabel>
                        )}

                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-0.5">
                                {open ? (
                                    <Collapsible open={professionalsOpen} onOpenChange={setProfessionalsOpen}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton
                                                    className={`
                          px-3 py-2.5 rounded-lg transition-all duration-150
                          text-muted-foreground hover:text-foreground
                          hover:bg-sidebar-accent
                          flex items-center justify-between w-full
                          ${isProfessionalsActive ? "bg-sidebar-accent text-foreground font-medium" : ""}
                          ${isRTL ? "flex-row-reverse" : ""}
                        `}
                                                >
                                                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                        <UserCog className={`h-[18px] w-[18px] ${isProfessionalsActive ? "text-primary" : ""}`} />
                                                        <span className="text-sm">{t.professionals}</span>
                                                    </div>
                                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${professionalsOpen ? chevronOpenClass : chevronClass}`} />
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="mt-0.5 space-y-0.5">
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <NavLink
                                                        to="/admin/professionals"
                                                        end
                                                        className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                        activeClassName="bg-primary/10 text-primary font-medium"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                        <span>{t.viewProfessionals}</span>
                                                    </NavLink>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <NavLink
                                                        to="/admin/professionals/create"
                                                        className={`${isRTL ? "mr-6" : "ml-6"} px-3 py-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center gap-2.5 text-[13px] w-[calc(100%-24px)] ${isRTL ? "flex-row-reverse" : ""}`}
                                                        activeClassName="bg-primary/10 text-primary font-medium"
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                        <span>{t.addProfessional}</span>
                                                    </NavLink>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <NavLink
                                                to="/admin/professionals"
                                                className="px-2 py-2.5 justify-center rounded-lg transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent flex items-center"
                                                activeClassName="bg-primary text-primary-foreground"
                                            >
                                                <UserCog className="h-[18px] w-[18px]" />
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                </SidebarContent>

                {/* Fixed Footer */}
                <div className={`flex-shrink-0 border-t border-sidebar-border bg-[hsl(var(--sidebar-background))] p-3 ${open ? "" : "px-2"}`}>
                    <div className={`flex items-center ${open ? "justify-center" : "justify-center"} gap-2`}>
                        {open ? (
                            <span className="text-xs text-muted-foreground font-medium">toorrii V 1.0.0</span>
                        ) : (
                            <span className="text-[10px] text-muted-foreground font-medium">v1.0</span>
                        )}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}