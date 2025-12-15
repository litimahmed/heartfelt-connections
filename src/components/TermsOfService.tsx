/**
 * @file TermsOfService.tsx
 * @description Terms of service section on homepage - fetches from API only.
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import { useTermsOfService } from "@/hooks/useTermsOfService";
import { Skeleton } from "@/components/ui/skeleton";

const TermsOfService = () => {
  const { t, language } = useTranslation();
  const { data: termsData, isLoading } = useTermsOfService();
  
  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      continueReading: {
        en: "Continue reading",
        fr: "Continuer la lecture",
        ar: "متابعة القراءة"
      },
      description: {
        en: "By using our services, you agree to these terms. Please read them carefully to understand your rights and responsibilities.",
        fr: "En utilisant nos services, vous acceptez ces conditions. Veuillez les lire attentivement pour comprendre vos droits et responsabilités.",
        ar: "باستخدام خدماتنا، فإنك توافق على هذه الشروط. يرجى قراءتها بعناية لفهم حقوقك ومسؤولياتك."
      },
      readMore: {
        en: "Read Full Terms",
        fr: "Lire les conditions complètes",
        ar: "اقرأ الشروط الكاملة"
      }
    };
    return texts[key]?.[language] || texts[key]?.en || "";
  };

  type Language = 'en' | 'fr' | 'ar';
  type TranslatableField = { fr?: string; ar?: string; en?: string; } | undefined | {};

  const getTranslated = (field: TranslatableField, fallback: string = ''): string => {
    if (!field || typeof field !== 'object') return fallback;
    const translated = field[language as Language] || field['en'] || field['fr'] || field['ar'];
    return translated || fallback;
  };

  const getContentSections = () => {
    if (!termsData?.contenu) return [];
    if (Array.isArray(termsData.contenu)) {
      return termsData.contenu.filter(section => section.type === 'section').slice(0, 3);
    }
    return [];
  };

  // Only use API data - no fallback
  const termsFeatures = getContentSections().map((section, index) => ({
    id: `section-${index}`,
    title: getTranslated(section.titre),
    description: getTranslated(section.paragraphe)
  }));
  
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  if (isLoading) {
    return (
      <section id="terms" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Skeleton className="w-20 h-20 rounded-2xl mx-auto mb-6" />
            <Skeleton className="h-12 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                <Skeleton className="w-14 h-14 rounded-xl mb-4" />
                <Skeleton className="h-6 w-32 mb-3" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="terms" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background">
      {/* A subtle gradient background to enhance the visual appeal. */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated section header. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("terms.title")}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t("terms.subtitle")}
          </p>
        </motion.div>

                {/* Grid of terms feature cards - always show with static or API data */}
                {termsFeatures.length > 0 && (
                  <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {termsFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                        
                        <div className="relative z-10 flex flex-col flex-1">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-7 h-7 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                            {truncateText(feature.description)}
                          </p>
                          <Link 
                            to={`/terms-of-service#${feature.id}`}
                            className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                          >
                            {getText("continueReading")}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  </div>
                )}

        {/* Animated call-to-action section to read the full terms of service. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-card border border-border rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            {getText("description")}
          </p>
          <Link to="/terms-of-service">
            <Button variant="cta" size="lg" className="group">
              {getText("readMore")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOfService;