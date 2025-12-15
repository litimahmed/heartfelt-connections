/**
 * @file Partnerships.tsx
 * @description This component displays a section showcasing the company's partnerships - fetches from API only.
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import { usePartners } from "@/hooks/usePartners";
import { Skeleton } from "@/components/ui/skeleton";

const Partnerships = () => {
    const { t, language } = useTranslation();
    const { data: partners, isLoading } = usePartners();

    type TranslationItem = { lang: string; value: string; };
    type TranslatableField = TranslationItem[] | undefined;

    const getTranslated = (field: TranslatableField): string => {
        if (!field || !Array.isArray(field)) return '';
        const translation = field.find(item => item.lang === language) 
            || field.find(item => item.lang === 'en') 
            || field.find(item => item.lang === 'fr')
            || field[0];
        return translation?.value || '';
    };

    const getImageUrl = (path: string | undefined): string => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
        const cleanBase = BASE_URL.replace(/\/api\/?$/, '');
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${cleanBase}${cleanPath}`;
    };

    if (isLoading) {
        return (
            <section id="partnerships" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Skeleton className="h-10 w-48 mx-auto mb-4" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>
                    <div className="flex gap-6 justify-center">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="w-48 h-32 rounded-xl" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Don't render section if no partners
    if (!partners || partners.length === 0) {
        return null;
    }

    return (
        <section id="partnerships" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {t("partnerships.title")}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t("partnerships.subtitle")}
                    </p>
                </motion.div>

                <div className="relative overflow-hidden py-4">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

                    <div className="flex w-max gap-6 animate-scroll-infinite">
                        {Array(8).fill(partners).flat().map((partner, index) => {
                            const partnerName = getTranslated(partner.nom_partenaire);
                            const logoUrl = getImageUrl(partner.logo);
                            
                            return (
                                <Link
                                    key={`${partner.partenaire_id || partner.id}-${index}`}
                                    to={`/partner/${partner.partenaire_id || partner.id}`}
                                    className="flex-shrink-0"
                                >
                                    <motion.div
                                        className="group relative cursor-pointer"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl blur-xl transition-opacity duration-500" />
                                        <div className="relative flex items-center justify-center w-48 h-32 border border-border/50 rounded-xl bg-background/80 backdrop-blur-md transition-all duration-300 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            {logoUrl && (
                                                <img
                                                    src={logoUrl}
                                                    alt={partnerName}
                                                    className="w-40 h-24 object-contain relative z-10 transition-all duration-300"
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partnerships;
