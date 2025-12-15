/**
 * @file ContactSection.tsx
 * @description Minimal contact section for homepage - fetches from API only.
 */

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import { useContactInfo } from "@/hooks/useContactInfo";
import { Button } from "@/components/ui/button";
import { TbBrandTiktok } from "react-icons/tb";
import { Skeleton } from "@/components/ui/skeleton";

const ContactSection = () => {
  const { t, language } = useTranslation();
  const { data: contactData, isLoading } = useContactInfo();

  type TranslatableField = { fr: string; ar: string; en: string } | undefined;
  type Language = "en" | "fr" | "ar";
  const lang = language as Language;

  const getTranslated = (field: TranslatableField) => {
    if (!field) return "";
    return field[lang] || field["en"] || "";
  };

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: {
        en: "Contact Us",
        fr: "Contactez-Nous",
        ar: "اتصل بنا",
      },
      subtitle: {
        en: "Get in touch with our team",
        fr: "Prenez contact avec notre équipe",
        ar: "تواصل مع فريقنا",
      },
      cta: {
        en: "Send us a message",
        fr: "Envoyez-nous un message",
        ar: "أرسل لنا رسالة",
      },
    };
    return texts[key]?.[language] || texts[key]?.en || "";
  };

  // Only use API data - no fallback
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: contactData?.email,
      href: contactData?.email ? `mailto:${contactData.email}` : "#",
    },
    {
      icon: Phone,
      label: language === "fr" ? "Téléphone" : language === "ar" ? "هاتف" : "Phone",
      value: contactData?.telephone_1,
      href: contactData?.telephone_1 ? `tel:${contactData.telephone_1}` : "#",
    },
    {
      icon: MapPin,
      label: language === "fr" ? "Adresse" : language === "ar" ? "عنوان" : "Address",
      value: contactData?.adresse ? `${getTranslated(contactData.adresse)}, ${getTranslated(contactData.ville)}` : undefined,
      href: "#",
    },
    {
      icon: Clock,
      label: language === "fr" ? "Horaires" : language === "ar" ? "ساعات العمل" : "Hours",
      value: contactData?.horaires,
      href: "#",
    },
  ].filter(item => item.value);

  const socialLinks = [
    contactData?.facebook && { icon: Facebook, href: contactData.facebook, label: "Facebook" },
    contactData?.instagram && { icon: Instagram, href: contactData.instagram, label: "Instagram" },
    contactData?.linkedin && { icon: Linkedin, href: contactData.linkedin, label: "LinkedIn" },
    contactData?.x && { icon: Twitter, href: contactData.x, label: "X" },
    contactData?.tiktok && { icon: TbBrandTiktok, href: contactData.tiktok, label: "TikTok" },
  ].filter(Boolean) as { icon: any; href: string; label: string }[];

  // Check if we have any contact data
  const hasContactData = contactData && contactItems.length > 0;

  if (isLoading) {
    return (
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4 p-4">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Don't render section if no data
  if (!hasContactData) {
    return null;
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{getText("title")}</h2>
          <p className="text-lg text-muted-foreground">{getText("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {contactItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">{item.label}</span>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.value}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {socialLinks.length > 0 && (
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border pt-6 mt-6 flex justify-center">
            <Button asChild size="lg" className="group">
              <Link to="/contact">
                {getText("cta")}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
