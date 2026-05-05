import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Zap, Star, Shield, Crown } from "lucide-react";

export default function UpgradeModal({ isOpen, onClose }) {
  const plans = [
    {
      name: "Free",
      price: "0",
      color: "emerald",
      icon: Zap,
      features: [
        "Basic Evo Assistant",
        "Standard Voice Response",
        "Up to 50 queries/day",
        "Local Car Control",
        "Community Support"
      ],
      current: true
    },
    {
      name: "Pro",
      price: "499",
      color: "purple",
      icon: Crown,
      features: [
        "Advanced Evo Neural Model",
        "Ultra-low latency Response",
        "Unlimited Conversations",
        "Custom Voice & Personality",
        "Predictive Car Maintenance",
        "Priority 24/7 Support"
      ],
      current: false,
      recommended: true
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-xl"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed inset-0 z-[260] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden pointer-events-auto flex flex-col md:flex-row shadow-2xl">
              
              {/* Left Side: Illustration / Branding */}
              <div className="md:w-1/3 bg-gradient-to-br from-purple-600/20 to-zinc-900 p-8 flex flex-col justify-center items-center text-center border-r border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent)] pointer-events-none" />
                <Star className="text-purple-400 mb-6 animate-pulse" size={48} />
                <h2 className="text-3xl font-bold text-white mb-4">Unlock Evo Pro</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Experience the future of car assistance. Faster, smarter, and completely personalized for your journey.
                </p>
                <div className="mt-8 flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
                  ))}
                </div>
              </div>

              {/* Right Side: Plans */}
              <div className="flex-1 p-8 md:p-12 relative">
                <button 
                  onClick={onClose}
                  className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer border-0"
                >
                  <X size={20} />
                </button>

                <div className="grid md:grid-cols-2 gap-8 mt-4">
                  {plans.map((plan) => (
                    <div 
                      key={plan.name}
                      className={`relative p-6 rounded-3xl border transition-all ${
                        plan.recommended 
                          ? "bg-purple-500/5 border-purple-500/30 ring-1 ring-purple-500/20" 
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 text-[10px] font-bold text-white rounded-full uppercase tracking-widest shadow-lg shadow-purple-500/30">
                          Recommended
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className={`text-[11px] font-bold uppercase tracking-widest ${
                            plan.color === 'emerald' ? 'text-emerald-400' : 'text-purple-400'
                          }`}>
                            {plan.name} Plan
                          </p>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-3xl font-bold text-white">₹{plan.price}</span>
                            <span className="text-zinc-500 text-sm">/mo</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-2xl ${
                          plan.color === 'emerald' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-purple-400/10 text-purple-400'
                        }`}>
                          <plan.icon size={24} />
                        </div>
                      </div>

                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-[13px] text-zinc-300">
                            <Check size={16} className={plan.recommended ? "text-purple-400" : "text-emerald-400"} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={plan.current}
                        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all cursor-pointer border-0 ${
                          plan.current 
                            ? "bg-zinc-800 text-zinc-500 cursor-default" 
                            : plan.recommended
                              ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40"
                              : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                      </motion.button>
                    </div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-2">
                    <Shield size={12} /> Secure encrypted payments powered by Stripe
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
