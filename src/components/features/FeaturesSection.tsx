import { motion } from "framer-motion";
import { Shield, Zap, Smartphone, TrendingUp, Users, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Fraud Protection",
    description: "Blockchain-based verification eliminates counterfeit tickets completely.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Buy, sell, or transfer tickets instantly with smart contracts.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Scan QR codes and verify tickets directly from your mobile device.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: TrendingUp,
    title: "Royalty System",
    description: "Creators earn from every resale with built-in ERC-2981 royalties.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with fellow attendees and build lasting relationships.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Lock,
    title: "Secure Storage",
    description: "Your tickets are stored securely on IPFS with metadata integrity.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NFT Tickets?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of event ticketing with blockchain technology,
            ensuring security, transparency, and ownership like never before.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;