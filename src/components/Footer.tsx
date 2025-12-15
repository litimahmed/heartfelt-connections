/**
 * @file Footer.tsx
 * @description Minimal footer with copyright and legal links.
 */

import { motion } from "framer-motion";
import { useTranslation } from "@/contexts/TranslationContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <motion.div
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span>© 2025 Toorrii. All rights reserved.</span>
          </motion.div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/privacy-policy"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {t("footer.privacyPolicy")}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/terms-of-service"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {t("footer.termsOfService")}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
