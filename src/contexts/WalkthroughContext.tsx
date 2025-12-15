import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface TourStep {
  target: string;
  route: string;
  titleKey: string;
  contentKey: string;
  placement?: "top" | "bottom" | "left" | "right";
  isSmallElement?: boolean; // For nav links, buttons - no highlight box
  scrollPosition?: "top" | "center"; // How to scroll to element
}

interface WalkthroughContextType {
  isRunning: boolean;
  stepIndex: number;
  currentRoute: string;
  startTour: () => void;
  stopTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStepIndex: (index: number) => void;
  tourSteps: TourStep[];
}

const WalkthroughContext = createContext<WalkthroughContextType | undefined>(undefined);

// Define the complete tour flow with routes - outside component to avoid recreation
const TOUR_STEPS: TourStep[] = [
  // Welcome & Sidebar (Dashboard)
  {
    target: '[data-tour="sidebar"]',
    route: "/admin/dashboard",
    titleKey: "tourWelcomeTitle",
    contentKey: "tourWelcomeContent",
    placement: "right",
    scrollPosition: "top",
  },
  {
    target: '[data-tour="dashboard"]',
    route: "/admin/dashboard",
    titleKey: "tourDashboardTitle",
    contentKey: "tourDashboardContent",
    placement: "right",
    isSmallElement: true,
  },
  // Overview Page
  {
    target: '[data-tour="overview-stats"]',
    route: "/admin/dashboard",
    titleKey: "tourOverviewStatsTitle",
    contentKey: "tourOverviewStatsContent",
    placement: "bottom",
    scrollPosition: "top",
  },
  {
    target: '[data-tour="overview-activity"]',
    route: "/admin/dashboard",
    titleKey: "tourOverviewActivityTitle",
    contentKey: "tourOverviewActivityContent",
    placement: "top",
    scrollPosition: "top",
  },
  // Manage Queues Page
  {
    target: '[data-tour="manage-queues"]',
    route: "/admin/dashboard",
    titleKey: "tourManageTitle",
    contentKey: "tourManageContent",
    placement: "right",
    isSmallElement: true,
  },
  {
    target: '[data-tour="create-queue-btn"]',
    route: "/admin/manage",
    titleKey: "tourCreateQueueTitle",
    contentKey: "tourCreateQueueContent",
    placement: "bottom",
    isSmallElement: true,
  },
  {
    target: '[data-tour="queue-list"]',
    route: "/admin/manage",
    titleKey: "tourQueueListTitle",
    contentKey: "tourQueueListContent",
    placement: "top",
    scrollPosition: "top",
  },
  // Analytics Page
  {
    target: '[data-tour="analytics"]',
    route: "/admin/manage",
    titleKey: "tourAnalyticsTitle",
    contentKey: "tourAnalyticsContent",
    placement: "right",
    isSmallElement: true,
  },
  {
    target: '[data-tour="analytics-charts"]',
    route: "/admin/analytics",
    titleKey: "tourAnalyticsChartsTitle",
    contentKey: "tourAnalyticsChartsContent",
    placement: "top",
    scrollPosition: "top",
  },
  {
    target: '[data-tour="analytics-export"]',
    route: "/admin/analytics",
    titleKey: "tourAnalyticsExportTitle",
    contentKey: "tourAnalyticsExportContent",
    placement: "bottom",
    isSmallElement: true,
  },
  // Settings Page
  {
    target: '[data-tour="settings"]',
    route: "/admin/analytics",
    titleKey: "tourSettingsTitle",
    contentKey: "tourSettingsContent",
    placement: "right",
    isSmallElement: true,
  },
  {
    target: '[data-tour="settings-theme"]',
    route: "/admin/settings",
    titleKey: "tourSettingsThemeTitle",
    contentKey: "tourSettingsThemeContent",
    placement: "bottom",
    scrollPosition: "top",
  },
  // Profile
  {
    target: '[data-tour="profile"]',
    route: "/admin/settings",
    titleKey: "tourProfileTitle",
    contentKey: "tourProfileContent",
    placement: "right",
    isSmallElement: true,
  },
  // Content Management
  {
    target: '[data-tour="content"]',
    route: "/admin/settings",
    titleKey: "tourContentTitle",
    contentKey: "tourContentContent",
    placement: "right",
    isSmallElement: true,
  },
  {
    target: '[data-tour="about-us"]',
    route: "/admin/settings",
    titleKey: "tourAboutUsTitle",
    contentKey: "tourAboutUsContent",
    placement: "right",
    isSmallElement: true,
  },
  {
    target: '[data-tour="partners"]',
    route: "/admin/settings",
    titleKey: "tourPartnersTitle",
    contentKey: "tourPartnersContent",
    placement: "right",
    isSmallElement: true,
  },
  {
    target: '[data-tour="contacts"]',
    route: "/admin/settings",
    titleKey: "tourContactsTitle",
    contentKey: "tourContactsContent",
    placement: "right",
    isSmallElement: true,
  },
  // Header Actions
  {
    target: '[data-tour="header-actions"]',
    route: "/admin/settings",
    titleKey: "tourHeaderActionsTitle",
    contentKey: "tourHeaderActionsContent",
    placement: "bottom",
    isSmallElement: true,
  },
  {
    target: '[data-tour="language-selector"]',
    route: "/admin/settings",
    titleKey: "tourLanguageSelectorTitle",
    contentKey: "tourLanguageSelectorContent",
    placement: "bottom",
    isSmallElement: true,
  },
];

export function WalkthroughProvider({ children }: { children: ReactNode }) {
  const [isRunning, setIsRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [pendingNavigation, setPendingNavigation] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const tourSteps = TOUR_STEPS;

  // Handle pending navigation after route change
  useEffect(() => {
    if (pendingNavigation !== null) {
      const timer = setTimeout(() => {
        setStepIndex(pendingNavigation);
        setPendingNavigation(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, pendingNavigation]);

  const startTour = useCallback(() => {
    setStepIndex(0);
    const firstStep = tourSteps[0];
    if (location.pathname !== firstStep.route) {
      navigate(firstStep.route);
      setTimeout(() => {
        setIsRunning(true);
      }, 400);
    } else {
      setIsRunning(true);
    }
  }, [navigate, location.pathname, tourSteps]);

  const stopTour = useCallback(() => {
    setIsRunning(false);
    setStepIndex(0);
    setPendingNavigation(null);
  }, []);

  const nextStep = useCallback(() => {
    const nextIndex = stepIndex + 1;
    if (nextIndex >= tourSteps.length) {
      stopTour();
      return;
    }

    const nextStepData = tourSteps[nextIndex];
    const currentPath = location.pathname;

    if (nextStepData.route !== currentPath) {
      navigate(nextStepData.route);
      setPendingNavigation(nextIndex);
    } else {
      setStepIndex(nextIndex);
    }
  }, [stepIndex, tourSteps, location.pathname, navigate, stopTour]);

  const prevStep = useCallback(() => {
    const prevIndex = stepIndex - 1;
    if (prevIndex < 0) return;

    const prevStepData = tourSteps[prevIndex];
    const currentPath = location.pathname;

    if (prevStepData.route !== currentPath) {
      navigate(prevStepData.route);
      setPendingNavigation(prevIndex);
    } else {
      setStepIndex(prevIndex);
    }
  }, [stepIndex, tourSteps, location.pathname, navigate]);

  return (
    <WalkthroughContext.Provider
      value={{
        isRunning,
        stepIndex,
        currentRoute: location.pathname,
        startTour,
        stopTour,
        nextStep,
        prevStep,
        setStepIndex,
        tourSteps,
      }}
    >
      {children}
    </WalkthroughContext.Provider>
  );
}

export function useWalkthrough() {
  const context = useContext(WalkthroughContext);
  if (!context) {
    throw new Error("useWalkthrough must be used within a WalkthroughProvider");
  }
  return context;
}