import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Target, Eye, Award, Users, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";
import { useAboutUs } from "@/hooks/useAboutUs";
import { useContactInfo } from "@/hooks/useContactInfo";
import { Skeleton } from "@/components/ui/skeleton";

const AboutUs = () => {
    const { t, language } = useTranslation();
    const { data: apiData, isLoading } = useAboutUs();
    const { data: contactData } = useContactInfo();

    const getText = (key: string) => {
        const texts: Record<string, Record<string, string>> = {
            backToHome: {
                en: "Back to home",
                fr: "Retour à l'accueil",
                ar: "العودة إلى الصفحة الرئيسية",
            },
            title: {
                en: "About Us",
                fr: "À propos",
                ar: "من نحن",
            },
            subtitle: {
                en: "Learn more about our mission and values",
                fr: "En savoir plus sur notre mission et nos valeurs",
                ar: "تعرف على مهمتنا وقيمنا",
            },
            noContent: {
                en: "No About Us content available at the moment.",
                fr: "Aucun contenu À propos disponible pour le moment.",
                ar: "لا يوجد محتوى من نحن متاح حالياً.",
            },
        };
        return texts[key]?.[language] || texts[key]?.en || "";
    };

    const getTranslatedValue = (field?: { lang: string; value: string }[]) => {
        if (!field) return '';
        const translation = field.find(t => t.lang === language);
        return translation ? translation.value : (field.find(t => t.lang === 'en')?.value || '');
    };

    const getContactTranslation = (field?: { fr: string; ar: string; en: string }) => {
        if (!field) return '';
        const lang = language as 'en' | 'fr' | 'ar';
        return field[lang] || field.en || field.fr || '';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex-1">
                    <div className="max-w-4xl mx-auto">
                        <Skeleton className="h-10 w-32 mb-8" />
                        <div className="text-center">
                            <Skeleton className="w-20 h-20 rounded-2xl mx-auto mb-6" />
                            <Skeleton className="h-12 w-64 mx-auto mb-6" />
                            <Skeleton className="h-6 w-96 mx-auto" />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    if (!apiData) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
                    <div className="max-w-4xl mx-auto">
                        <Link to="/">
                            <Button variant="ghost" className="mb-8">
                                <ArrowLeft className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                                {getText('backToHome')}
                            </Button>
                        </Link>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
                                <Info className="w-10 h-10 text-primary" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {getText("title")}
                            </h1>
                            <p className="text-xl text-muted-foreground mb-4">
                                {getText("subtitle")}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Empty Content Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 flex-1">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center py-16"
                        >
                            <p className="text-xl text-muted-foreground">
                                {getText("noContent")}
                            </p>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Link to="/">
                        <Button variant="ghost" className="mb-8">
                            <ArrowLeft className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                            {t('aboutPage.backToHome')}
                        </Button>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {getTranslatedValue(apiData.titre) || t('aboutPage.title')}
                        </h1>

                        <div className="space-y-12">
                            {/* Content Section */}
                            {getTranslatedValue(apiData.contenu) && (
                                <section>
                                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {getTranslatedValue(apiData.contenu)}
                                    </p>
                                </section>
                            )}

                            {/* Mission Section */}
                            {getTranslatedValue(apiData.mission) && (
                                <section>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-3 rounded-lg bg-primary/10">
                                            <Target className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-semibold mb-3">{t('aboutPage.missionTitle')}</h2>
                                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                                {getTranslatedValue(apiData.mission)}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Vision Section */}
                            {getTranslatedValue(apiData.vision) && (
                                <section>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-3 rounded-lg bg-primary/10">
                                            <Eye className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-semibold mb-3">{t('aboutPage.visionTitle')}</h2>
                                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                                {getTranslatedValue(apiData.vision)}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Values Section */}
                            {getTranslatedValue(apiData.valeurs) && (
                                <section>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-3 rounded-lg bg-primary/10">
                                            <Award className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-semibold mb-3">{t('aboutPage.valuesTitle')}</h2>
                                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                                {getTranslatedValue(apiData.valeurs)}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Who We Serve Section */}
                            {getTranslatedValue(apiData.qui_nous_servons) && (
                                <section>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-3 rounded-lg bg-primary/10">
                                            <Users className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-semibold mb-3">{t('aboutPage.whoWeServeTitle')}</h2>
                                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                                {getTranslatedValue(apiData.qui_nous_servons)}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Why Choose Us Section */}
                            {getTranslatedValue(apiData.pourquoi_choisir_nous) && (
                                <section className="pt-8 border-t border-border">
                                    <h2 className="text-2xl font-semibold mb-4">{t('aboutPage.whyChooseTitle')}</h2>
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {getTranslatedValue(apiData.pourquoi_choisir_nous)}
                                    </p>
                                </section>
                            )}

                            {/* Contact Section */}
                            {contactData && (
                                <section className="pt-8 border-t border-border">
                                    <h2 className="text-2xl font-semibold mb-4">{t('aboutPage.getInTouchTitle')}</h2>
                                    {getContactTranslation(contactData.message_acceuil) && (
                                        <p className="text-muted-foreground leading-relaxed mb-4">
                                            {getContactTranslation(contactData.message_acceuil)}
                                        </p>
                                    )}
                                    <div className="space-y-2 text-muted-foreground">
                                        {contactData.email && <p>Email : {contactData.email}</p>}
                                        {contactData.telephone_1 && (
                                            <p>{language === 'fr' ? 'Téléphone 1' : language === 'ar' ? 'هاتف 1' : 'Phone 1'} : {contactData.telephone_1}</p>
                                        )}
                                        {contactData.telephone_2 && (
                                            <p>{language === 'fr' ? 'Téléphone 2' : language === 'ar' ? 'هاتف 2' : 'Phone 2'} : {contactData.telephone_2}</p>
                                        )}
                                        {(contactData.adresse || contactData.ville) && (
                                            <p>
                                                {language === 'fr' ? 'Adresse' : language === 'ar' ? 'عنوان' : 'Address'} : 
                                                {getContactTranslation(contactData.adresse)}
                                                {contactData.ville && `, ${getContactTranslation(contactData.ville)}`}
                                            </p>
                                        )}
                                    </div>
                                </section>
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutUs;
