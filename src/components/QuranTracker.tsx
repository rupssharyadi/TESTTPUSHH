import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";

interface QuranTrackerProps {
  currentJuz: number;
  onUpdateJuz: (juz: number) => void;
}

const QuranTracker = ({ currentJuz, onUpdateJuz }: QuranTrackerProps) => {
  const totalJuz = 30;
  const progress = (currentJuz / totalJuz) * 100;

  return (
    <div className="rounded-xl bg-card p-6 shadow-islamic">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="h-6 w-6 text-accent" />
        <h2 className="text-xl font-semibold text-foreground">your Quran Progress</h2>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Juz {currentJuz} of {totalJuz}</span>
          <span className="font-medium text-accent">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gold-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdateJuz(i + 1)}
            className={`h-9 rounded-md text-xs font-medium transition-all ${
              i + 1 <= currentJuz
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent/20"
            }`}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground text-center font-amiri text-base">
        "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ"
      </p>
      <p className="text-xs text-muted-foreground text-center mt-1">
        Read in the name of your Lord who created — Al-Alaq 96:1
      </p>
    </div>
  );
};

export default QuranTracker;
