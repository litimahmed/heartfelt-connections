/**
 * @file Features.tsx
 * @description This component displays a section showcasing the key features of the Toorrii platform.
 * It features a grid of feature cards with icons, titles, and descriptions, all animated with Framer Motion.
 */

// Import necessary libraries and components.
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  Users, 
  BarChart3, 
  Smartphone, 
  Shield,
  Zap,
  Globe,
  MessageSquare
} from "lucide-react";

// An array of feature objects, each containing details about a feature.
const features = [
  {
    icon: Calendar,
    title: "AI-Powered Scheduling",
    description: "Machine learning algorithms optimize appointment slots, predict no-shows, and automatically prevent overbooking while maximizing capacity.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Clock,
    title: "Real-time Queue Intelligence",
    description: "Dynamic wait time predictions, capacity monitoring, and automated customer notifications that adapt to real-time conditions.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Users,
    title: "Customer Experience Platform",
    description: "Self-service portal with booking, rescheduling, payment processing, and personalized preferences management.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics Suite",
    description: "Deep insights into customer behavior, revenue optimization, staff utilization, and predictive demand forecasting.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Smartphone,
    title: "Omnichannel Access",
    description: "Native mobile apps, responsive web interface, WhatsApp booking, and voice assistant integration for seamless access.",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "SOC 2 Type II compliance, HIPAA-ready, end-to-end encryption, and advanced audit trails for complete data protection.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Zap,
    title: "Intelligent Automation",
    description: "Smart workflows with conditional logic, automated follow-ups, and ML-driven optimization that learns from your business patterns.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Globe,
    title: "Multi-Location Management",
    description: "Centralized control for multiple locations with role-based access, cross-location reporting, and unified customer profiles.",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    icon: MessageSquare,
    title: "Communication Ecosystem",
    description: "Integrated messaging, video consultations, automated surveys, and multi-channel notifications in one platform.",
    gradient: "from-rose-500 to-pink-500"
  }
];

/**
 * @component Features
 * @description The main component for the features section.
 */
const Features = () => {
  return (
    <section className="py-24 bg-background" id="features">
      <div className="container mx-auto px-6">
        {/* Animated section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="bg-gradient-primary bg-clip-text text-transparent block mt-2">
              Optimize Your Operations
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to transform how you manage appointments and queues, 
            backed by enterprise-grade reliability and security.
          </p>
        </motion.div>

        {/* Grid of feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Animated card with hover effects */}
              <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-elegant group relative overflow-hidden">
                {/* Background gradient overlay that appears on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Animated feature icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-glow`}
                  whileHover={{ rotate: 10, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300 relative z-10">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  {feature.description}
                </p>

                {/* Animated floating accent elements for a decorative effect */}
                <motion.div
                  className="absolute top-6 right-6 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-6 right-8 w-1 h-1 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Animated footer section with a message about additional features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-accent/30 backdrop-blur-sm rounded-full px-6 py-3 border border-primary/20">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              Plus 50+ more features to discover
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
