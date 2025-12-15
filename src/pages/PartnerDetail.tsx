/**
 * Partner Detail Page
 *
 * Dynamic page displaying comprehensive information about a specific partner - fetches from API only.
 */

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/contexts/TranslationContext";
import { usePartner } from "@/hooks/usePartners";
import { Skeleton } from "@/components/ui/skeleton";
import { getTranslatedValue, TranslatableField } from "@/types/partner";

const PartnerDetail = () => {
    const { partnerId } = useParams<{ partnerId: string; }>();
    const { t, language } = useTranslation();
    const { data: partner, isLoading } = usePartner(partnerId || '');

    const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"%3E%3Crect width="200" height="150" fill="%23f3f4f6"/%3E%3Ctext x="100" y="75" text-anchor="middle" dominant-baseline="middle" font-family="system-ui" font-size="14" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';

    const getTranslated = (field: TranslatableField, fallback: string = ''): string => {
        return getTranslatedValue(field, language) || fallback;
    };

    const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"%3E%3Crect width="200" height="150" fill="%23f3f4f6"/%3E%3Ctext x="100" y="75" text-anchor="middle" dominant-baseline="middle" font-family="system-ui" font-size="14" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';

    const getImageUrl = (path: string | undefined): string => {
        if (!path) return PLACEHOLDER_IMAGE;
        if (path.startsWith('http')) return path;
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
        const cleanBase = BASE_URL.replace(/\/api\/?$/, '');
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${cleanBase}${cleanPath}`;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-6 pt-32 pb-20">
                    <Skeleton className="h-8 w-32 mb-8" />
                    <div className="rounded-2xl border border-border p-12">
                        <div className="grid md:grid-cols-[1.5fr,1fr] gap-16">
                            <div className="space-y-6">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-16 w-3/4" />
                                <div className="flex gap-6">
                                    <Skeleton className="h-12 w-32" />
                                    <Skeleton className="h-12 w-32" />
                                </div>
                            </div>
                            <Skeleton className="h-64 w-full rounded-2xl" />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!partner) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-6 pt-32 pb-20">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">{t('partner.notFound')}</h1>
                        <p className="text-muted-foreground mb-8">{t('partner.notFoundDesc')}</p>
                        <Link to="/#partnerships">
                            <Button>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                {t('partner.backToPartnerships')}
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const getName = () => getTranslated(partner.nom_partenaire, `Partner ${partnerId}`);
    const getDescription = () => getTranslated(partner.description);
    const getLogo = () => getImageUrl(partner.logo);
    const getIndustry = () => partner.type_partenaire || '';
    const getWebsite = () => partner.site_web || '';

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-20">
                {/* Back Button */}
                <div className="container mx-auto px-6 mb-8">
                    <Link to="/#partnerships">
                        <Button variant="ghost" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            {t('nav.partnerships')}
                        </Button>
                    </Link>
                </div>

                {/* Hero Section */}
                <section className="container mx-auto px-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background border border-border p-12"
                    >
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />

                        <div className="relative grid md:grid-cols-[1.5fr,1fr] gap-16 items-center">
                            <div className="space-y-6">
                                {getIndustry() && (
                                    <Badge className="mb-2 text-sm px-4 py-1.5">{getIndustry()}</Badge>
                                )}
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                    {getName()}
                                </h1>

                                <div className="flex flex-wrap gap-6 pt-4">
                                    {partner.date_creation_entreprise && (
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                <Calendar className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('partner.founded')}</p>
                                                <p className="font-semibold text-lg">{new Date(partner.date_creation_entreprise).getFullYear()}</p>
                                            </div>
                                        </div>
                                    )}
                                    {partner.adresse && (
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                <MapPin className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('partner.headquarters')}</p>
                                                <p className="font-semibold text-lg">
                                                    {Array.isArray(partner.adresse) && partner.adresse.length > 0 && partner.adresse[0].ville
                                                        ? getTranslated(partner.adresse[0].ville)
                                                        : getTranslated(partner.adresse as TranslatableField)}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {partner.date_deb && (
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                <Calendar className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('partner.partnershipPeriod')}</p>
                                                <p className="font-semibold text-lg">
                                                    {new Date(partner.date_deb).getFullYear()}
                                                    {partner.date_fin && ` - ${new Date(partner.date_fin).getFullYear()}`}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-3 pt-4">
                                    {getWebsite() && (
                                        <a href={getWebsite()} target="_blank" rel="noopener noreferrer">
                                            <Button size="lg" variant="outline" className="gap-2">
                                                {t('partner.visitWebsite')}
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        </a>
                                    )}
                                    {partner.email && (
                                        <a href={`mailto:${partner.email}`}>
                                            <Button size="lg" variant="outline" className="gap-2">
                                                <Mail className="w-4 h-4" />
                                                {t('contact.email')}
                                            </Button>
                                        </a>
                                    )}
                                </div>

                                {/* Social Media Links */}
                                {(partner.facebook || partner.instagram || partner.tiktok) && (
                                    <div className="flex flex-wrap gap-3 pt-2">
                                        {partner.facebook && (
                                            <a href={partner.facebook} target="_blank" rel="noopener noreferrer">
                                                <Button size="sm" variant="ghost" className="gap-2">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                                    Facebook
                                                </Button>
                                            </a>
                                        )}
                                        {partner.instagram && (
                                            <a href={partner.instagram} target="_blank" rel="noopener noreferrer">
                                                <Button size="sm" variant="ghost" className="gap-2">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                                    Instagram
                                                </Button>
                                            </a>
                                        )}
                                        {partner.tiktok && (
                                            <a href={partner.tiktok} target="_blank" rel="noopener noreferrer">
                                                <Button size="sm" variant="ghost" className="gap-2">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                                                    TikTok
                                                </Button>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="h-full min-h-[300px] relative">
                                <div className="sticky top-8 h-full rounded-2xl flex items-center justify-center p-8">
                                    <img 
                                        src={getLogo()} 
                                        alt={getName()} 
                                        className="relative w-full h-full object-contain drop-shadow-2xl"
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (!target.dataset.errorHandled) {
                                                target.dataset.errorHandled = 'true';
                                                target.src = PLACEHOLDER_IMAGE;
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* About Section */}
                {getDescription() && (
                    <section className="mb-32">
                        <div className="container mx-auto px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="max-w-5xl mx-auto"
                            >
                                <div className="relative mb-16">
                                    <div className="absolute -left-8 top-0 text-[12rem] font-black text-primary/5 leading-none select-none">"</div>
                                    <div className="relative">
                                        <h3 className="text-5xl md:text-6xl lg:text-7xl font-black mb-12 leading-tight">
                                            {t('partner.aboutTitle')} {getName()}
                                        </h3>

                                        <div className="space-y-8">
                                            <p className="text-xl md:text-2xl text-foreground/90 leading-[1.8] font-normal tracking-wide">
                                                {getDescription()}
                                            </p>

                                            {/* Contact Information */}
                                            {(partner.email || partner.telephone || partner.adresse) && (
                                                <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-border/50 mt-8">
                                                    {partner.email && (
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 text-primary mb-3">
                                                                <Mail className="w-5 h-5" />
                                                                <span className="font-semibold text-sm uppercase tracking-wider">{t('contact.email')}</span>
                                                            </div>
                                                            <p className="text-muted-foreground leading-relaxed break-all">
                                                                {partner.email}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {partner.telephone && (
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 text-primary mb-3">
                                                                <Phone className="w-5 h-5" />
                                                                <span className="font-semibold text-sm uppercase tracking-wider">{t('contact.phone')}</span>
                                                            </div>
                                                            <p className="text-muted-foreground leading-relaxed">
                                                                {partner.telephone}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {partner.adresse && (
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 text-primary mb-3">
                                                                <MapPin className="w-5 h-5" />
                                                                <span className="font-semibold text-sm uppercase tracking-wider">{t('contact.location')}</span>
                                                            </div>
                                                            <p className="text-muted-foreground leading-relaxed">
                                                                {Array.isArray(partner.adresse) && partner.adresse.length > 0 && partner.adresse[0].rue
                                                                    ? `${getTranslated(partner.adresse[0].rue)}, ${getTranslated(partner.adresse[0].ville)}`
                                                                    : getTranslated(partner.adresse as TranslatableField)}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default PartnerDetail;
