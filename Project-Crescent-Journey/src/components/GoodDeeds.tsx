import { motion } from "framer-motion";
import { Star, Droplets, HandHeart } from "lucide-react";

interface GoodDeedsProps {
  deeds: { charity: number; quranPages: number; extraPrayers: number };
  onIncrement: (type: "charity" | "quranPages" | "extraPrayers") => void;
}

const items = [
  { key: "charity" as const, label: "Charity Acts", icon: HandHeart, color: "text-accent" },
  { key: "quranPages" as const, label: "Extra Prayers", icon: Star, color: "text-primary" },
  { key: "extraPrayers" as const, label: "Good Deeds", icon: Droplets, color: "text-emerald-light" },
];

const GoodDeeds = ({ deeds, onIncrement }: GoodDeedsProps) => {
  return (
    <div className="rounded-xl bg-card p-6 shadow-islamic">
      <h2 className="text-xl font-semibold text-foreground mb-4">Good Deeds Counter</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            <item.icon className={`h-5 w-5 ${item.color}`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-foreground w-8 text-center">
                {deeds[item.key]}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => onIncrement(item.key)}
                className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-medium"
              >
                +
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GoodDeeds;
