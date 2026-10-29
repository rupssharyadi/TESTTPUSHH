import { motion } from "framer-motion";
import ramadanHero from "@/assets/ramadan-hero.jpg";

const HeroSection = () => {
  const today = new Date();
  const ramadanStart = new Date(2026, 1, 18); // Approx Ramadan 2026
  const dayOfRamadan = Math.max(1, Math.ceil((today.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);
  const clampedDay = Math.min(Math.max(dayOfRamadan, 1), 30);

  return (
    <div className="relative overflow-hidden rounded-2xl mb-8">
      <img
        src={ramadanHero}
        alt="Ramadan Kareem - Mosque silhouette with crescent moon"
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-amiri text-4xl md:text-6xl font-bold text-primary-foreground mb-2"
        >
          <span className="text-gradient-gold">Ramadan Kareem</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-amiri text-2xl md:text-3xl text-gold-light mb-1"
        >
          رمضان كريم
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 px-6 py-2 rounded-full border border-gold-light/30 backdrop-blur-sm"
        >
          <span className="text-sm text-primary-foreground/90">
            Day <span className="text-gradient-gold font-bold text-lg">{clampedDay}</span> of 30
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
