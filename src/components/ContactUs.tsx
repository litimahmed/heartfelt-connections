/**
 * @file ContactUs.tsx
 * @description This component renders the "Contact Us" section on the homepage.
 * It displays contact information such as email, phone, address, and business hours,
 * along with a call-to-action to navigate to the full contact page. The component is animated with Framer Motion.
 */

// Import necessary libraries and components.
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Printer, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";
import { useContactInfo } from "@/hooks/useContactInfo";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * @component ContactUs
 * @description The main "Contact Us" section component.
 */
const ContactUs = () => {
    // Hook to get the translation function.
    const { t } = useTranslation();
    const { data: apiData, isLoading } = useContactInfo();
    const { language } = useTranslation();

    type TranslatableField = { fr: string; ar: string; en: string; } | undefined;
    type Language = 'en' | 'fr' | 'ar';

    const getTranslated = (field: TranslatableField) => {
        if (!field) return '';
        return field[language as Language] || field['en'] || '';
    };

    const contactItems = [
        { icon: Mail, label: t("contact.email"), value: apiData?.email },
        {
            icon: Phone,
            label: t("contact.phone"),
            value: (
                <div className="flex flex-col items-center">
                    {apiData?.telephone_1 && <span>{apiData.telephone_1}</span>}
                    {apiData?.telephone_2 && <span>{apiData.telephone_2}</span>}
                </div>
            )
        },
        { icon: Printer, label: "Fax", value: apiData?.telephone_fixe },
        {
            icon: MapPin,
            label: t("contact.location"),
            value: apiData?.adresse ? `${getTranslated(apiData.adresse)}, ${getTranslated(apiData.ville)}` : undefined
        },
        { icon: Clock, label: t("contact.hours"), value: apiData?.horaires }
    ];

    // Check if we have any contact data
    const hasContactData = apiData && (
        apiData.email || 
        apiData.telephone_1 || 
        apiData.telephone_2 || 
        apiData.telephone_fixe || 
        apiData.adresse || 
        apiData.horaires
    );

    // Loading state
    if (isLoading) {
        return (
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Skeleton className="h-10 w-48 mx-auto mb-4" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Card key={i} className="h-full">
                                <CardContent className="pt-6 text-center">
                                    <Skeleton className="w-12 h-12 rounded-full mx-auto mb-4" />
                                    <Skeleton className="h-5 w-20 mx-auto mb-2" />
                                    <Skeleton className="h-4 w-32 mx-auto" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Animated section header. */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {t("contact.title")}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {getTranslated(apiData?.message_acceuil) || t("contact.subtitle")}
                    </p>
                </motion.div>

                {/* Grid of contact information cards - only show if we have data */}
                {hasContactData && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                        {contactItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-6 text-center">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="font-semibold mb-2">{item.label}</h3>
                                        <div className="text-sm text-muted-foreground break-words">{item.value}</div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Animated call-to-action section to send a message. */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-lg p-8 text-center"
                >
                    <h3 className="text-2xl font-bold mb-4">{t("contact.getStarted")}</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        {t("contact.getStartedDesc")}
                    </p>
                    <Link to="/contact">
                        <Button size="lg" className="group">
                            {t("contact.title")}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactUs;
