/**
 * @file Partners.tsx
 * @description This component displays a section showcasing the trusted partners of the Toorrii platform.
 * It features a grid of partner cards with logos, names, and descriptions, all animated with Framer Motion.
 */

// Import necessary libraries and components.
import { motion } from "framer-motion";

// Import partner logos from the assets directory.
import DjezzyLogo from "@/assets/Djezzy_Logo.png";
import Logo_Mobilis from "@/assets/Logo_Mobilis.png";
import Flag_of_Sonatrach from "@/assets/Flag_of_Sonatrach.png";
import Ooredoo_logo from "@/assets/Ooredoo_logo.svg";
import Bank_of_Algeria from "@/assets/Bank_of_Algeria.png";
import Sonlgaz from "@/assets/Sonlgaz.png";
import Air_Algérie_logo from "@/assets/Air_Algérie_logo.png";
import cnas from "@/assets/cnas.png";

// Define a type for the icon to support both Lucide components and image sources.
type IconType = React.ComponentType<{ className?: string }> | string;

/**
 * @interface Partner
 * @description Defines the structure for a partner object.
 */
interface Partner {
  name: string;
  description: string;
  icon: IconType;
  color: string;
  bgColor: string;
}

// An array of partner objects, each containing details about a partner.
const partners: Partner[] = [
  {
    name: "Djezzy",
    description: "Leading Telecom Provider",
    icon: DjezzyLogo,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
  },
  {
    name: "Mobilis",
    description: "National Mobile Network",
    icon: Logo_Mobilis,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    name: "Ooredoo",
    description: "Digital Communications",
    icon: Ooredoo_logo,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
  {
    name: "Sonatrach",
    description: "National Oil & Gas Company",
    icon: Flag_of_Sonatrach,
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    name: "Banque d'Algérie",
    description: "Central Bank",
    icon: Bank_of_Algeria,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    name: "Sonelgaz",
    description: "Electricity & Gas",
    icon: Sonlgaz,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
  },
  {
    name: "Air Algérie",
    description: "National Airline",
    icon: Air_Algérie_logo,
    color: "from-sky-500 to-sky-600",
    bgColor: "bg-sky-50 dark:bg-sky-950/20",
  },
  {
    name: "CNAS",
    description: "Social Security",
    icon: cnas,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
];

/**
 * @component Partners
 * @description The main component for the partners section.
 */
const Partners = () => {
  return (
    <section className="py-24 bg-gradient-subtle border-y border-primary/10">
      <div className="container mx-auto px-6">
        {/* Animated section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Trusted Partners in Algeria
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Toorrii powers appointment management for leading corporations and
            institutions across Algeria
          </p>
        </motion.div>

        {/* Grid of partner cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => {
            const isImage = typeof partner.icon === "string";
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="group"
              >
                {/* Animated card with hover effects */}
                <motion.div
                  className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 relative overflow-hidden h-full flex flex-col items-center text-center"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Background gradient that appears on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Animated partner logo */}
                  <motion.div
                    className={`${partner.bgColor} p-4 rounded-xl mb-4 relative z-10`}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {isImage ? (
                      <img
                        src={partner.icon as string}
                        alt={`${partner.name} logo`}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <partner.icon className="w-8 h-8 text-foreground" />
                    )}
                  </motion.div>

                  {/* Animated partner name */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-xl font-bold text-foreground mb-2 relative z-10"
                  >
                    {partner.name}
                  </motion.h3>

                  {/* Animated partner description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                    className="text-sm text-muted-foreground relative z-10"
                  >
                    {partner.description}
                  </motion.p>

                  {/* Animated trust indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                    viewport={{ once: true }}
                    className="mt-4 flex items-center space-x-1 relative z-10"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-muted-foreground">
                      Active Partner
                    </span>
                  </motion.div>

                  {/* Animated floating particles for a subtle decorative effect */}
                  <motion.div
                    className="absolute top-4 right-4 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated footer section with a trust message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 bg-white/30 backdrop-blur-sm rounded-full px-8 py-4 border border-primary/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Trusted partnerships
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <span className="text-sm text-muted-foreground">
              Serving millions of citizens
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
