import { motion } from "framer-motion";
import { X, FileText, AlertCircle, ShieldCheck } from "lucide-react";

export default function TermsOfService({ onClose }) {
  const points = [
    "Evo is an assistant designed to aid driving, not replace driver responsibility. Always keep your eyes on the road.",
    "System access requires integration with vehicle hardware. Improper modification of Evo files may void vehicle warranty.",
    "Subscriptions are billed monthly. Features like 'Pro Tier' require an active data connection.",
    "User is responsible for ensuring all app permissions granted to Evo are in compliance with local privacy laws."
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
            <FileText className="text-amber-400" size={24} />
            Terms of Service
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer border-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8 text-white/70">
          <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex gap-4">
            <AlertCircle className="text-amber-400 shrink-0" size={20} />
            <p className="text-[13px] font-medium leading-relaxed text-amber-200/80">
              IMPORTANT: Using Evo while operating a vehicle requires full compliance with your local traffic safety regulations.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">1. Service Usage</h3>
            <p className="text-[14px] leading-relaxed">
              Evo provides a personalized interface and assistant for your car. By using Evo, you agree to allow the system to interface with your vehicle's CAN bus and onboard systems.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">2. Core Guidelines</h3>
            <div className="space-y-3">
              {points.map((p, i) => (
                <div key={i} className="flex gap-3 text-[13px] leading-relaxed">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">3. Liability</h3>
            <p className="text-[13px] leading-relaxed italic">
              GMS and the Evo developers are not liable for any accidents, damages, or legal violations occurring while the Evo system is active. The user maintains 100% control and responsibility for the vehicle.
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
