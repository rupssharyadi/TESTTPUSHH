import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Moon } from "lucide-react";

const PRAYERS = [
  { name: "Fajr", time: "05:15", arabic: "الفجر" },
  { name: "Dhuhr", time: "12:30", arabic: "الظهر" },
  { name: "Asr", time: "15:45", arabic: "العصر" },
  { name: "Maghrib", time: "18:20", arabic: "المغرب" },
  { name: "Isha", time: "19:45", arabic: "العشاء" },
];

interface PrayerTrackerProps {
  completed: string[];
  onToggle: (name: string) => void;
}

const PrayerTracker = ({ completed, onToggle }: PrayerTrackerProps) => {
  return (
    <div className="rounded-xl bg-card p-6 shadow-islamic geometric-pattern">
      <div className="flex items-center gap-3 mb-6">
        <Moon className="h-6 w-6 text-accent" />
        <h2 className="text-xl font-semibold text-foreground">Daily Prayers</h2>
        <span className="ml-auto text-sm font-medium text-accent">
          {completed.length}/5
        </span>
      </div>
      <div className="space-y-3">
        {PRAYERS.map((prayer, i) => {
          const isDone = completed.includes(prayer.name);
          return (
            <motion.button
              key={prayer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onToggle(prayer.name)}
              className={`w-full flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-300 ${
                isDone
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-background border border-border hover:border-accent/40"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                  isDone
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-muted-foreground/30"
                }`}
              >
                {isDone && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className={`font-medium ${isDone ? "text-primary" : "text-foreground"}`}>
                  {prayer.name}
                </p>
                <p className="text-xs text-muted-foreground">{prayer.time}</p>
              </div>
              <span className="font-amiri text-lg text-muted-foreground">{prayer.arabic}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PrayerTracker;
