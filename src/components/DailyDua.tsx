import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw } from "lucide-react";

const DUAS = [
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    translation: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    reference: "Al-Baqarah 2:201",
  },
  {
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    translation: "My Lord, expand for me my breast and ease for me my task.",
    reference: "Taha 20:25-26",
  },
  {
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    translation: "My Lord, increase me in knowledge.",
    reference: "Taha 20:114",
  },
  {
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    translation: "O Allah, You are the Most Forgiving, and You love forgiveness, so forgive me.",
    reference: "Hadith - Tirmidhi",
  },
  {
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    translation: "Sufficient for us is Allah, and [He is] the best Disposer of affairs.",
    reference: "Ali 'Imran 3:173",
  },
];

const DailyDua = () => {
  const [index, setIndex] = useState(0);

  const nextDua = () => {
    setIndex((prev) => (prev + 1) % DUAS.length);
  };

  const dua = DUAS[index];

  return (
    <div className="rounded-xl bg-islamic p-6 shadow-islamic text-primary-foreground">
      <div className="flex items-center gap-3 mb-5">
        <Heart className="h-5 w-5 text-gold" />
        <h2 className="text-xl font-semibold">Daily Dua</h2>
        <motion.button
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          onClick={nextDua}
          className="ml-auto p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-amiri text-xl text-center leading-relaxed mb-4 text-gold-light">
            {dua.arabic}
          </p>
          <p className="text-sm text-center opacity-90 leading-relaxed mb-3">
            {dua.translation}
          </p>
          <p className="text-xs text-center opacity-60">— {dua.reference}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DailyDua;
