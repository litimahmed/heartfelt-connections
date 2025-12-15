import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowLeft, Printer, Globe, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/contexts/TranslationContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContactInfo } from "@/hooks/useContactInfo";
import { TbBrandTiktok } from "react-icons/tb";

const ContactUsPage = () => {
    const { t, language } = useTranslation();
    const { data: apiData, isLoading } = useContactInfo();

    type TranslatableField = { fr: string; ar: string; en: string; } | undefined;
    type Language = 'en' | 'fr' | 'ar';

    const getTranslated = (field: TranslatableField) => {
        if (!field) return '';
        return field[language as Language] || field['en'] || '';
    };

    const socialLinks = [
        { icon: Facebook, url: apiData?.facebook, label: "Facebook", color: "hover:text-[#1877f2]" },
        { icon: Instagram, url: apiData?.instagram, label: "Instagram", color: "hover:text-[#e4405f]" },
        { icon: Linkedin, url: apiData?.linkedin, label: "LinkedIn", color: "hover:text-[#0a66c2]" },
        { icon: Twitter, url: apiData?.x, label: "X (Twitter)", color: "hover:text-foreground" },
        { icon: TbBrandTiktok, url: apiData?.tiktok, label: "TikTok", color: "hover:text-foreground" },
    ].filter(link => link.url);

    // Fallback contact data when no API data
    const fallbackData = {
        email: "contact@toorrii.com",
        telephone_1: "+213 XX XX XX XX",
        telephone_2: "+213 XX XX XX XX",
        horaires: "Dim - Jeu: 8h00 - 17h00",
        adresse: { fr: "Alger, Algérie", en: "Algiers, Algeria", ar: "الجزائر العاصمة، الجزائر" },
        ville: { fr: "Alger", en: "Algiers", ar: "الجزائر" },
        wilaya: { fr: "Alger", en: "Algiers", ar: "الجزائر" }
    };

    // Use API data if available, otherwise use fallback
    const displayData = apiData || fallbackData;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-pulse text-muted-foreground">Loading...</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <Header />

            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link to="/">
                            <Button variant="ghost" className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                {t("aboutPage.backToHome")}
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                            {apiData?.titre ? getTranslated(apiData.titre) : t("contact.title")}
                        </h1>
                        <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                            {apiData?.message_acceuil ? getTranslated(apiData.message_acceuil) : t("contact.subtitle")}
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        {/* Left Column - Contact Info Cards */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-7 h-7 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-2">{t("contact.email")}</h3>
                                                <a href={`mailto:${displayData?.email}`} className="text-muted-foreground hover:text-primary transition-colors text-lg">
                                                    {displayData?.email}
                                                </a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-7 h-7 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-3">{t("contact.phone")}</h3>
                                                <div className="space-y-2">
                                                    {displayData?.telephone_1 && (
                                                        <a href={`tel:${displayData.telephone_1}`} className="block text-muted-foreground hover:text-primary transition-colors text-lg">
                                                            {displayData.telephone_1}
                                                        </a>
                                                    )}
                                                    {displayData?.telephone_2 && (
                                                        <a href={`tel:${displayData.telephone_2}`} className="block text-muted-foreground hover:text-primary transition-colors text-lg">
                                                            {displayData.telephone_2}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {displayData?.telephone_fixe && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                                        <CardContent className="p-8">
                                            <div className="flex items-start gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                                                    <Printer className="w-7 h-7 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg mb-2">Fax</h3>
                                                    <a href={`tel:${displayData.telephone_fixe}`} className="text-muted-foreground hover:text-primary transition-colors text-lg">
                                                        {displayData.telephone_fixe}
                                                    </a>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}

                            {apiData?.site_web && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                                        <CardContent className="p-8">
                                            <div className="flex items-start gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                                                    <Globe className="w-7 h-7 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg mb-2">Website</h3>
                                                    <a href={apiData.site_web} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                                                        {apiData.site_web}
                                                    </a>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Column - Location & Hours */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg h-full">
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-7 h-7 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-2">{t("contact.location")}</h3>
                                            </div>
                                        </div>
                                        <div className="space-y-3 text-muted-foreground ml-[72px]">
                                            {displayData?.adresse && (
                                                <p className="text-lg leading-relaxed">{getTranslated(displayData.adresse as TranslatableField)}</p>
                                            )}
                                            {displayData?.ville && displayData?.wilaya && (
                                                <p className="text-lg">
                                                    {getTranslated(displayData.ville as TranslatableField)}, {getTranslated(displayData.wilaya as TranslatableField)}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-7 h-7 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-2">{t("contact.hours")}</h3>
                                                <p className="text-muted-foreground text-lg">
                                                    {displayData?.horaires}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Social Media Links */}
                            {socialLinks.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                                        <CardContent className="p-8">
                                            <h3 className="font-bold text-lg mb-6">Connect With Us</h3>
                                            <div className="flex flex-wrap gap-4">
                                                {socialLinks.map((link, index) => (
                                                    <a
                                                        key={index}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md ${link.color}`}
                                                        title={link.label}
                                                    >
                                                        <link.icon className="w-6 h-6" />
                                                    </a>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactUsPage;
