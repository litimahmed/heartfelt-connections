import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { AdminTranslationProvider, useAdminTranslation } from "@/contexts/AdminTranslationContext";
import { WalkthroughTour } from "@/components/admin/WalkthroughTour";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isRTL } = useAdminTranslation();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-8 overflow-auto">
            {children}
          </main>
        </div>
        <WalkthroughTour />
      </div>
    </SidebarProvider>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AdminTranslationProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AdminTranslationProvider>
  );
}