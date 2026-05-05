import { motion } from "framer-motion";
import { X, Shield, Car, LayoutGrid, Eye } from "lucide-react";

export default function PrivacyPolicy({ onClose }) {
  const sections = [
    {
      icon: Car,
      title: "Vehicle Data",
      content: "Evo accesses real-time vehicle telemetry including speed, location, and diagnostics to provide context-aware assistance and driving optimizations."
    },
    {
      icon: LayoutGrid,
      title: "App Integration",
      content: "We collect data from connected applications (navigation, media, communication) to facilitate seamless voice control and automated routines while driving."
    },
    {
      icon: Eye,
      title: "Visual Processing",
      content: "Camera data is processed locally on the vehicle hardware to enable Evo's facial expressions and emotional awareness. We do not store or transmit raw video feeds."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-none"
    >
      <motion.div 
        className="w-full max-w-lg bg-zinc-900/95 border border-white/10 rounded-3xl shadow-2xl p-8 pointer-events-auto backdrop-blur-xl max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-zinc-900/10 backdrop-blur-md pb-4 z-10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="text-emerald-400" size={24} />
            Privacy Policy
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer border-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8 text-white/70">
          <p className="text-[14px] leading-relaxed">
            At Evo, your safety and privacy are our top priorities. This policy explains how we handle your data while you use the Evo car assistant system.
          </p>

          <div className="grid gap-6">
            {sections.map(({ icon: Icon, title, content }) => (
              <div key={title} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-3">
                <div className="flex items-center gap-3 text-emerald-400">
                  <Icon size={18} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">{title}</h3>
                </div>
                <p className="text-[13px] leading-relaxed text-white/60">{content}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Data Retention</h3>
            <p className="text-[13px] leading-relaxed">
              Diagnostic data is stored for 30 days to improve Evo's performance. You can request immediate deletion of all data through the "Account & Billing" section.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-white/30 uppercase tracking-widest">Last Updated: May 2026</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
