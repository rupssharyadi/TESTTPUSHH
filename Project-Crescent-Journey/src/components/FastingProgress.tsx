import { motion } from "framer-motion";

interface FastingProgressProps {
  currentDay: number;
  totalDays: number;
  isFasting: boolean;
  onToggleFasting: () => void;
}

const FastingProgress = ({ currentDay, totalDays, isFasting, onToggleFasting }: FastingProgressProps) => {
  const progress = (currentDay / totalDays) * 100;
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="rounded-xl bg-card p-6 shadow-islamic text-center">
      <h2 className="text-xl font-semibold text-foreground mb-6">Fasting Progress</h2>

      <div className="relative inline-flex items-center justify-center mb-6">
        <svg width="140" height="140" className="-rotate-90">
          <circle
            cx="70"
            cy="70"
            r="58"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <motion.circle
            cx="70"
            cy="70"
            r="58"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-foreground">{currentDay}</span>
          <span className="text-xs text-muted-foreground">of {totalDays} days</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleFasting}
        className={`w-full rounded-lg py-3 px-6 font-medium transition-all duration-300 ${
          isFasting
            ? "bg-primary text-primary-foreground shadow-islamic"
            : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        {isFasting ? "✓ Fasting Today" : "Mark as Fasting"}
      </motion.button>

      <div className="mt-4 grid grid-cols-6 gap-1">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className={`h-3 w-full rounded-sm ${
              i < currentDay
                ? "bg-accent"
                : i === currentDay
                ? "bg-primary animate-pulse-gold"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FastingProgress;
