import { ArrowBigLeft, Menu } from "lucide-react";
import Face from "./Face";
import { motion } from "framer-motion";
import { useState } from "react";
import OptionsModal from "./OptionsModal";

export default function MainPage() {
  const [openMenu, setOpenMenu] = useState(false);

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

      <Face />

      {/* Options modal */}
      <OptionsModal isOpen={openMenu} onClose={() => setOpenMenu(false)} />
    </div>
  );
}