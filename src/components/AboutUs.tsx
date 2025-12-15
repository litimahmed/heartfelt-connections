/**
 * @file AboutUs.tsx
 * @description This component renders the "About Us" section on the homepage.
 * It provides a brief overview of the company's mission, values, and a call-to-action to learn more.
 * The component is animated with Framer Motion for a dynamic and engaging user experience.
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import { useAboutUs } from "@/hooks/useAboutUs";
import { Skeleton } from "@/components/ui/skeleton";

const AboutUs = () => {
    const { t, language } = useTranslation();
    const { data: aboutData, isLoading } = useAboutUs();

    // Helper to get translated value from array-based translations
    const getTranslated = (field: { lang: string; value: string }[] | undefined): string => {
        if (!field || !Array.isArray(field)) return '';
        const entry = field.find(item => item.lang === language) || field.find(item => item.lang === 'fr');
        return entry?.value || '';
    };

    const MAX_LENGTH = 100;

    const isTextTruncated = (text: string): boolean => {
        return text && text.length > MAX_LENGTH;
    };

    const truncateText = (text: string): string => {
        if (!text || text.length <= MAX_LENGTH) return text;
        return text.substring(0, MAX_LENGTH).trim() + '...';
    };

    // Only use API data - no fallback
    const features = [
        {
            icon: Target,
            titleKey: "mission",
            title: language === 'fr' ? "Notre Mission" : language === 'ar' ? "مهمتنا" : "Our Mission",
            fullText: getTranslated(aboutData?.mission)
        },
        {
            icon: Eye,
            titleKey: "vision",
            title: language === 'fr' ? "Notre Vision" : language === 'ar' ? "رؤيتنا" : "Our Vision",
            fullText: getTranslated(aboutData?.vision)
        },
        {
            icon: Heart,
            titleKey: "values",
            title: language === 'fr' ? "Nos Valeurs" : language === 'ar' ? "قيمنا" : "Our Values",
            fullText: getTranslated(aboutData?.valeurs)
        }
    ];

    if (isLoading) {
        return (
            <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <Skeleton className="h-8 w-32 mx-auto mb-4" />
                        <Skeleton className="h-12 w-64 mx-auto mb-6" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                                <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                                <Skeleton className="h-6 w-32 mb-2" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block mb-4"
                    >
                        <div className="px-4 py-2 bg-primary/10 rounded-full">
                            <span className="text-sm font-semibold text-primary">{t("about.tagline")}</span>
                        </div>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                        {t("about.title")}
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        {t("about.subtitle")}
                    </p>
                </motion.div>

                {/* Grid of feature cards - always show with static or API data */}
                {features.some(f => f.fullText) && (
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg h-full">
                                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <feature.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {truncateText(feature.fullText)}
                                            {isTextTruncated(feature.fullText) && (
                                                <Link to="/about-us" className="text-primary hover:underline ml-1 font-medium">
                                                    {language === 'fr' ? 'En savoir plus' : language === 'ar' ? 'اقرأ المزيد' : 'Read more'}
                                                </Link>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <Link to="/about-us">
                        <Button variant="cta" size="lg" className="group">
                            {t("about.readMore")}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
