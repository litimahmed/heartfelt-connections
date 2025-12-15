/**
 * Home Page Component
 * 
 * This is the main landing page of the Toorrii application.
 * It combines multiple section components to create a complete marketing page.
 * 
 * Page Sections:
 * - Header: Navigation and branding
 * - Hero: Main call-to-action and value proposition
 * - Partnerships: Showcase of partner organizations
 * - AboutUs: Company information and mission
 * - PrivacyPolicy: Privacy and security information
 * - ContactUs: Contact form and information
 * - Footer: Site navigation and links
 * 
 * Features:
 * - Smooth scroll navigation for anchor links
 * - Responsive design for all screen sizes
 * - Multi-language support
 * 
 * @component
 */

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partnerships from "@/components/Partnerships";
import AboutUs from "@/components/AboutUs";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import TermsOfService from "@/components/TermsOfService";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * Index Page Component
 * 
 * Implements smooth scrolling for anchor links and renders all homepage sections.
 */
const Index = () => {
  /**
   * Effect: Setup smooth scroll behavior for anchor links
   * 
   * Intercepts clicks on links starting with '#' and implements
   * smooth scrolling to the target section instead of instant jump.
   */
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      // Check if link is an anchor link (starts with #)
      if (target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    // Add event listener for smooth scrolling
    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  /**
   * Render homepage with all sections
   * Sections are displayed in order from top to bottom
   */
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Partnerships />
      <AboutUs />
      <PrivacyPolicy />
      <TermsOfService />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
