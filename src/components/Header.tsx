/**
 * @file Header.tsx
 * @description This component renders the main header for the application.
 * It includes the logo, navigation links, a language toggle, and authentication buttons.
 * The header is responsive and provides a mobile-friendly navigation drawer.
 */

// Import necessary libraries and components.
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, LogIn, Users } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslation } from "@/contexts/TranslationContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import ToorriiLogo from "@/assets/toorrii-logo.png";

/**
 * @component Header
 * @description The main header component.
 */
const Header = () => {
  // State to manage the visibility of the mobile navigation drawer.
  const [isOpen, setIsOpen] = useState(false);
  // Hook to get the translation function and RTL status.
  const { t, isRTL } = useTranslation();
  // Hook to get the current route location
  const location = useLocation();
  // Hook to track which section is currently in viewport (only for homepage)
  const activeSection = useScrollSpy(['partnerships', 'about', 'privacy', 'terms', 'contact'], 80);

  /**
   * Handles the click event for navigation links.
   * It smoothly scrolls to the section if it's on the same page,
   * otherwise it navigates to the homepage and then scrolls.
   * @param {React.MouseEvent<HTMLAnchorElement>} e - The click event.
   * @param {string} sectionId - The ID of the section to scroll to.
   */
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    // If no sectionId, let the default navigation happen (for page routes)
    if (!sectionId) return;
    
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  /**
   * Determines if a navigation link should be in the active state.
   * For homepage sections: checks scroll position
   * For other pages: checks current route
   */
  const isLinkActive = (href: string, sectionId: string) => {
    // For page routes (non-section links)
    if (!sectionId) {
      return location.pathname === href;
    }
    // For section links on homepage
    if (href.startsWith('/#')) {
      return location.pathname === '/' && activeSection === sectionId;
    }
    return false;
  };

  // An array of navigation items to be displayed in the header.
  const navItems = [
    { name: t('nav.partnerships'), href: '/#partnerships', sectionId: 'partnerships' },
    { name: t('nav.aboutUs'), href: '/#about', sectionId: 'about' },
    { name: t('nav.privacy'), href: '/#privacy', sectionId: 'privacy' },
    { name: t('footer.termsOfService'), href: '/#terms', sectionId: 'terms' },
    { name: t('nav.contact'), href: '/#contact', sectionId: 'contact' }
  ];

  return (
    // Animated header that slides in from the top.
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40"
    >
      <div className="container mx-auto px-6 py-3.5">
        <div className="flex items-center justify-between">
          {/* Animated logo that links to the homepage. */}
          <Link to="/" className="h-14 flex-shrink-0">
            <motion.div 
              className={`flex items-center h-full relative bottom-1 ${isRTL ? '-left-4' : 'left-4'}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src={ToorriiLogo} 
                alt="Toorrii Logo" 
                className="h-full w-auto object-contain scale-[2]"
              />
            </motion.div> 
          </Link>

          {/* Desktop navigation links. */}
          <nav className="hidden xl:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item, index) => {
              const isActive = isLinkActive(item.href, item.sectionId);
              return (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={(e) => handleSectionClick(e, item.sectionId)}
                    className={`text-sm transition-colors relative group ${
                      isActive 
                        ? 'text-primary font-bold' 
                        : 'text-foreground/70 font-medium hover:text-foreground'
                    }`}
                  >
                    {item.name}
                    {/* Underline effect on hover only (not for active state). */}
                    {!isActive && (
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Animated right section of the header with language toggle and auth buttons. */}
          <motion.div
            className="flex items-center space-x-3 rtl:space-x-reverse"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LanguageToggle />
            <Button 
              variant="ghost" 
              size="default"
              className="hidden sm:inline-flex gap-2 text-sm font-medium hover:bg-muted"
            >
              <Users className="w-4 h-4" />
              {t('nav.clientPortal')}
            </Button>
            <Button 
              size="default"
              className="hidden sm:inline-flex gap-2 text-sm font-medium"
            >
              <LogIn className="w-4 h-4" />
              {t('nav.signin')}
            </Button>

            {/* Mobile menu, which is a sheet that slides in from the right. */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="xl:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => {
                    const isActive = isLinkActive(item.href, item.sectionId);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={(e) => {
                          handleSectionClick(e, item.sectionId);
                          setIsOpen(false);
                        }}
                        className={`text-lg transition-colors ${
                          isActive
                            ? 'text-primary font-bold'
                            : 'text-muted-foreground font-medium hover:text-foreground'
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                  <div className="pt-6 border-t border-border space-y-4">
                    <Button variant="outline" size="lg" className="w-full justify-center gap-2 font-semibold">
                      <Users className="w-4 h-4" />
                      {t('nav.clientPortal')}
                    </Button>
                    <Button variant="default" size="lg" className="w-full justify-center gap-2 font-semibold shadow-elegant">
                      <LogIn className="w-4 h-4" />
                      {t('nav.signin')}
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
