import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PrayerTracker from "@/components/PrayerTracker";
import FastingProgress from "@/components/FastingProgress";
import QuranTracker from "@/components/QuranTracker";
import DailyDua from "@/components/DailyDua";
import GoodDeeds from "@/components/GoodDeeds";

const STORAGE_KEY = "ramadan-tracker-data";

interface TrackerData {
  completedPrayers: string[];
  fastingDay: number;
  isFasting: boolean;
  quranJuz: number;
  deeds: { charity: number; quranPages: number; extraPrayers: number };
}

const defaultData: TrackerData = {
  completedPrayers: [],
  fastingDay: 3,
  isFasting: false,
  quranJuz: 0,
  deeds: { charity: 0, quranPages: 0, extraPrayers: 0 },
};

const loadData = (): TrackerData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return defaultData;
};

const Index = () => {
  const [data, setData] = useState<TrackerData>(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const togglePrayer = (name: string) => {
    setData((prev) => ({
      ...prev,
      completedPrayers: prev.completedPrayers.includes(name)
        ? prev.completedPrayers.filter((p) => p !== name)
        : [...prev.completedPrayers, name],
    }));
  };

  const toggleFasting = () => {
    setData((prev) => ({
      ...prev,
      isFasting: !prev.isFasting,
      fastingDay: !prev.isFasting ? prev.fastingDay + 1 : Math.max(0, prev.fastingDay - 1),
    }));
  };

  const updateQuranJuz = (juz: number) => {
    setData((prev) => ({ ...prev, quranJuz: juz }));
  };

  const incrementDeed = (type: "charity" | "quranPages" | "extraPrayers") => {
    setData((prev) => ({
      ...prev,
      deeds: { ...prev.deeds, [type]: prev.deeds[type] + 1 },
    }));
  };

  return (
    <div className="min-h-screen bg-background geometric-pattern">
      <div className="container max-w-5xl mx-auto px-4 py-6">
        <HeroSection />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <PrayerTracker completed={data.completedPrayers} onToggle={togglePrayer} />
            <DailyDua />
          </div>
          <div className="space-y-6">
            <FastingProgress
              currentDay={data.fastingDay}
              totalDays={30}
              isFasting={data.isFasting}
              onToggleFasting={toggleFasting}
            />
            <QuranTracker currentJuz={data.quranJuz} onUpdateJuz={updateQuranJuz} />
            <GoodDeeds deeds={data.deeds} onIncrement={incrementDeed} />
          </div>
        </div>

        <footer className="text-center mt-12 mb-6 text-muted-foreground text-sm">
          <p className="font-amiri text-lg mb-1">بارك الله فيكم</p>
          <p>May Allah bless your Ramadan 🌙</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
