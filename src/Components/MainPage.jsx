import { ArrowBigLeft, Menu, Mic, MicOff, Volume2, VolumeOff } from "lucide-react";
import Face from "./Face";
import { motion,AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import OptionsModal from "./OptionsModal";
import ProgressBar from "./ProgressBar";

export default function MainPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [miceOn, setMiceOn] = useState(true);
  const [voiceOn, setVoiceOn] = useState(true);
  const [progress, setProgress] = useState(0);
  const [emotion, setEmotion] = useState("neutral");

  // Auto-advance progress 0→100 only when in 'loading' state
  useEffect(() => {
    if (emotion !== "loading") {
      setProgress(0); // Reset progress when not loading
      return;
    }

    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : Math.min(100, p + 1)));
    }, 80);
    return () => clearInterval(interval);
  }, [emotion]);

  return (
    <div className="relative">
      {/* Back button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-10 left-10 z-50 text-white">
        <ArrowBigLeft size={30} className="cursor-pointer" />
      </motion.div>

      {/* Menu button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-10 top-10 z-50 text-white"
        onClick={() => setOpenMenu(v => !v)}>
        <Menu size={30} className="cursor-pointer" />
      </motion.div>

      <Face progress={progress} emotion={emotion} setEmotion={setEmotion} />

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-10 right-20 z-50 text-white">
        <button onClick={() => setVoiceOn(v => !v)}>
          {voiceOn ? <Volume2 size={40} className="cursor-pointer" /> : <VolumeOff size={40} className="cursor-pointer text-red-500" />}
        </button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-10 left-20 z-50 text-white">
        <button onClick={() => setMiceOn(v => !v)}>
          {miceOn ? <Mic size={40} className="cursor-pointer" /> : <MicOff size={40} className="cursor-pointer text-red-500" />}
        </button>
      </motion.div>

      {/* Progress bar — pinned to bottom edge, only visible when loading */}
      <AnimatePresence>
        {emotion === "loading" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 w-full z-50"
          >
            <ProgressBar progress={progress} label="Processing" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Options modal */}
      <OptionsModal isOpen={openMenu} onClose={() => setOpenMenu(false)} />
    </div>
  );
}