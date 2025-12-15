/**
 * @file PrivacyPolicy.tsx
 * @description Modern corporate Privacy Policy page with sections support
 */

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/contexts/TranslationContext";
import { Shield, ArrowLeft, CheckCircle2, Lock, Eye, Database } from "lucide-react";
import { usePrivacyPolicy } from "@/hooks/usePrivacyPolicy";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const PrivacyPolicy = () => {
  const { language } = useTranslation();
  const { data: privacyData, isLoading } = usePrivacyPolicy();
  const location = useLocation();

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      backToHome: {
        en: "Back to home",
        fr: "Retour à l'accueil",
        ar: "العودة إلى الصفحة الرئيسية"
      },
      title: {
        en: "Privacy Policy",
        fr: "Politique de Confidentialité",
        ar: "سياسة الخصوصية"
      },
      subtitle: {
        en: "Your privacy matters to us. Learn how we protect and handle your data.",
        fr: "Votre confidentialité nous tient à cœur. Découvrez comment nous protégeons vos données.",
        ar: "خصوصيتك تهمنا. تعرف على كيفية حماية بياناتك."
      },
      noContent: {
        en: "No privacy policy content available yet.",
        fr: "Aucun contenu de politique de confidentialité disponible pour le moment.",
        ar: "لا يوجد محتوى لسياسة الخصوصية متاح حتى الآن."
      },
      lastUpdated: {
        en: "Last updated",
        fr: "Dernière mise à jour",
        ar: "آخر تحديث"
      },
      version: {
        en: "Version",
        fr: "Version",
        ar: "الإصدار"
      },
      tableOfContents: {
        en: "Table of Contents",
        fr: "Table des matières",
        ar: "جدول المحتويات"
      }
    };
    return texts[key]?.[language] || texts[key]?.en || "";
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  type TranslatableField = { fr?: string; ar?: string; en?: string; } | undefined | {};
  type Language = 'en' | 'fr' | 'ar';

  const getTranslated = (field: TranslatableField, fallback: string = ''): string => {
    if (!field || typeof field !== 'object') return fallback;
    const translated = field[language as Language] || field['en'] || field['fr'] || field['ar'];
    return translated || fallback;
  };

  const getTitleFromData = (titleData: any, fallback: string = ''): string => {
    if (!titleData) return fallback;
    if (Array.isArray(titleData)) {
      const titleObj = titleData.find(t => t.lang === language) || titleData.find(t => t.lang === 'en') || titleData[0];
      return titleObj?.value || fallback;
    }
    if (typeof titleData === 'object') {
      return getTranslated(titleData, fallback);
    }
    return fallback;
  };

  const getContentSections = () => {
    if (!privacyData?.contenu) return [];
    if (Array.isArray(privacyData.contenu)) {
      return privacyData.contenu.filter(section => section.type === 'section');
    }
    return [];
  };

  const getIntroText = () => {
    if (!privacyData?.contenu) return '';
    if (Array.isArray(privacyData.contenu)) {
      const intro = privacyData.contenu.find(section => section.type === 'intro');
      return intro?.text ? getTranslated(intro.text) : '';
    }
    if (typeof privacyData.contenu === 'object' && !Array.isArray(privacyData.contenu)) {
      return getTranslated(privacyData.contenu);
    }
    return '';
  };

  const sections = getContentSections();
  const hasContent = privacyData && (getIntroText() || sections.length > 0);

  const sectionIcons = [Shield, Lock, Eye, Database, CheckCircle2];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-10 w-32 mb-8" />
            <div className="text-center">
              <Skeleton className="w-24 h-24 rounded-3xl mx-auto mb-8" />
              <Skeleton className="h-14 w-96 mx-auto mb-6" />
              <Skeleton className="h-6 w-[500px] mx-auto" />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Modern Corporate */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/3" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-8 gap-2 hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4" />
              {getText('backToHome')}
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.div 
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-8 shadow-xl shadow-primary/10"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Shield className="w-12 h-12 text-primary" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
              {getTitleFromData(privacyData?.titre, getText("title"))}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {getText("subtitle")}
            </p>
            
            {privacyData?.version && (
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm text-muted-foreground">
                <span>{getText("version")} {privacyData.version}</span>
                {privacyData.date_creation && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>{getText("lastUpdated")}: {new Date(privacyData.date_creation).toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US')}</span>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {hasContent ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Table of Contents */}
              {sections.length > 0 && (
                <motion.aside
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="lg:col-span-1"
                >
                  <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                      {getText("tableOfContents")}
                    </h3>
                    <nav className="space-y-2">
                      {sections.map((section, index) => (
                        <a
                          key={index}
                          href={`#section-${index}`}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          <span className="line-clamp-1">{getTranslated(section.titre)}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </motion.aside>
              )}

              {/* Main Content Area */}
              <div className={sections.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
                {/* Introduction */}
                {getIntroText() && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
                  >
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line break-words">
                      {getIntroText()}
                    </p>
                  </motion.div>
                )}

                {/* Sections */}
                {sections.length > 0 && (
                  <div className="space-y-8">
                    {sections.map((section, index) => {
                      const IconComponent = sectionIcons[index % sectionIcons.length];
                      return (
                        <motion.article
                          key={index}
                          id={`section-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 * index }}
                          className="group scroll-mt-24"
                        >
                          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                            <div className="flex items-start gap-5">
                              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="text-xs font-medium text-primary/70 bg-primary/10 px-2 py-1 rounded-full">
                                    Section {index + 1}
                                  </span>
                                </div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">
                                  {getTranslated(section.titre)}
                                </h2>
                                <div className="prose prose-muted max-w-none">
                                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line break-words">
                                    {getTranslated(section.paragraphe)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted mb-8">
                <Shield className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                {getText("noContent")}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
