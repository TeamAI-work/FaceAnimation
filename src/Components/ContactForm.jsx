import { motion } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

export default function ContactForm({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-none"
    >
      <motion.div 
        className="w-full max-w-md bg-zinc-900/95 border border-white/10 rounded-3xl shadow-2xl p-6 pointer-events-auto backdrop-blur-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="text-pink-400" size={20} />
            Contact Support
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer border-0"
          >
            <X size={16} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">Your Name</label>
            <input 
              type="text" 
              placeholder="John Doe"
              className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/50 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/50 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">Message</label>
            <textarea 
              rows={4}
              placeholder="How can we help you?"
              className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/50 transition-all resize-none"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 mt-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-[0_12px_24px_rgba(244,63,94,0.3)] cursor-pointer border-0"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
