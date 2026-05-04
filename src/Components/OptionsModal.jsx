import { motion, AnimatePresence } from "framer-motion";
import {
  X, CreditCard, User, ShieldCheck, HelpCircle,
  ChevronRight, ChevronLeft, Moon, Sun,
  Sparkles, Check, Bell, Camera, Mic, MapPin,
  BookOpen, MessageCircle, Code2, ExternalLink,
} from "lucide-react";
import { useState } from "react";

/* ────────────────────────────────────────
   SHARED PRIMITIVES
──────────────────────────────────────── */
function Toggle({ active, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`relative flex items-center w-11 h-6 rounded-full p-0.5 cursor-pointer border transition-all duration-300
        ${active ? "bg-gradient-to-r from-cyan-400 to-indigo-400 border-transparent" : "bg-white/10 border-white/15"}`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={`w-[18px] h-[18px] rounded-full ${active ? "ml-auto bg-white shadow-[0_0_8px_rgba(103,232,249,0.6)]" : "bg-white/40"}`}
      />
    </div>
  );
}

function Row({ icon: Icon, label, desc, iconColor = "text-cyan-400", iconBg = "bg-cyan-400/10", children }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 flex-shrink-0 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}>
          <Icon size={16} />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-zinc-100">{label}</p>
          {desc && <p className="text-[11px] text-white/40 mt-0.5">{desc}</p>}
        </div>
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}

function SectionTitle({ children }) {
  return <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-1 pt-2 pb-1">{children}</p>;
}

/* ────────────────────────────────────────
   SUB-PANEL CONTENTS
──────────────────────────────────────── */

/* BILLING & ACCOUNT (merged) */
function BillingAccountPanel() {
  const [name, setName] = useState("User");
  const [editing, setEditing] = useState(false);
  const [dark, setDark] = useState(true);
  const features = ["Unlimited conversations", "Priority response speed", "Advanced emotion states", "Cloud sync across devices", "Early feature access"];
  return (
    <div className="flex flex-col gap-3">
      {/* ── Profile ── */}
      <SectionTitle>Profile</SectionTitle>
      <div className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
          {name[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={e => e.key === "Enter" && setEditing(false)}
              className="w-full bg-white/10 border border-cyan-400/40 rounded-lg px-2 py-1 text-[13px] text-zinc-100 outline-none"
            />
          ) : (
            <p className="text-[14px] font-semibold text-zinc-100 truncate">{name}</p>
          )}
          <p className="text-[11px] text-white/40 mt-0.5">user@example.com</p>
        </div>
        <button onClick={() => setEditing(true)} className="text-[11px] text-cyan-400 hover:underline cursor-pointer border-0 bg-transparent">Edit</button>
      </div>

      <SectionTitle>Appearance</SectionTitle>
      <Row icon={dark ? Moon : Sun} label="Dark Mode" desc="Toggle light / dark theme">
        <Toggle active={dark} onToggle={() => setDark(v => !v)} />
      </Row>

      {/* ── Billing ── */}
      <SectionTitle>Current Plan</SectionTitle>
      <div className="relative px-5 py-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 border border-emerald-400/20 overflow-hidden">
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-emerald-400 blur-[50px] opacity-10" />
        <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Free Tier</p>
        <p className="text-2xl font-bold text-white">$0 <span className="text-sm font-normal text-white/40">/ month</span></p>
      </div>

      <SectionTitle>Premium Includes</SectionTitle>
      <div className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-2">
        {features.map(f => (
          <div key={f} className="flex items-center gap-2 text-[12px] text-white/60">
            <Check size={13} className="text-emerald-400 flex-shrink-0" /> {f}
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer border-0 shadow-[0_0_24px_rgba(52,211,153,0.3)]"
      >
        <Sparkles size={15} /> Upgrade to Premium
      </motion.button>

      {/* ── Danger Zone ── */}
      <SectionTitle>Danger Zone</SectionTitle>
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-[12px] font-semibold transition-all cursor-pointer"
      >
        Sign Out
      </motion.button>
    </div>
  );
}

/* PERMISSIONS */
function PermissionsPanel() {
  const [perms, setPerms] = useState({ camera: false, mic: true, notifications: true, location: false });
  const toggle = key => setPerms(p => ({ ...p, [key]: !p[key] }));
  const items = [
    { key: "camera",        icon: Camera,   label: "Camera",        desc: "Used for visual input",         color: "text-amber-400", bg: "bg-amber-400/10" },
    { key: "mic",           icon: Mic,      label: "Microphone",    desc: "Used for voice commands",       color: "text-amber-400", bg: "bg-amber-400/10" },
    { key: "notifications", icon: Bell,     label: "Notifications", desc: "Alerts & reminders",            color: "text-amber-400", bg: "bg-amber-400/10" },
    { key: "location",      icon: MapPin,   label: "Location",      desc: "Used for context-aware features", color: "text-amber-400", bg: "bg-amber-400/10" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <SectionTitle>App Permissions</SectionTitle>
      {items.map(({ key, ...rest }) => (
        <Row key={key} {...rest}>
          <Toggle active={perms[key]} onToggle={() => toggle(key)} />
        </Row>
      ))}
    </div>
  );
}

/* HELP & INFO (merged) */
function HelpInfoPanel() {
  const links = [
    { icon: BookOpen,       label: "Documentation",   desc: "Guides & API reference",   href: "#" },
    { icon: MessageCircle,  label: "Community",        desc: "Discord & forums",          href: "#" },
    { icon: Code2,          label: "GitHub",           desc: "Source code & issues",      href: "#" },
  ];
  const meta = [
    { label: "Version",  value: "1.0.0"          },
    { label: "Built By", value: "GMS"            },
    { label: "Design",   value: "Framer Motion"  },
    { label: "Library",  value: "React + Vite"   },
  ];
  return (
    <div className="flex flex-col gap-3">
      {/* ── Resources ── */}
      <SectionTitle>Resources</SectionTitle>
      {links.map(({ icon: Icon, label, desc, href }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" className="no-underline">
          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-pink-400/10 flex items-center justify-center text-pink-400">
              <Icon size={16} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-zinc-100">{label}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{desc}</p>
            </div>
            <ExternalLink size={13} className="text-white/25 group-hover:text-white/60 transition-colors" />
          </motion.div>
        </a>
      ))}

      <SectionTitle>Contact Support</SectionTitle>
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500/20 to-pink-400/10 border border-pink-400/20 hover:border-pink-400/40 text-pink-300 text-[13px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
      >
        <MessageCircle size={15} /> Send a Message
      </motion.button>

      {/* ── About ── */}
      <SectionTitle>About Animate</SectionTitle>
      <div className="px-4 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.07] space-y-3">
        {meta.map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-[12px] text-white/40">{label}</span>
            <span className="text-[12px] font-semibold text-zinc-200">{value}</span>
          </div>
        ))}
      </div>

      <SectionTitle>Legal</SectionTitle>
      {["Privacy Policy", "Terms of Service"].map(item => (
        <motion.button
          key={item}
          whileHover={{ x: 4 }}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] text-[12px] text-white/60 hover:text-white/80 transition-all cursor-pointer group"
        >
          {item}
          <ChevronRight size={13} className="text-white/25 group-hover:text-white/60 transition-colors" />
        </motion.button>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────
   MENU ITEM (main list)
──────────────────────────────────────── */
function MenuItem({ icon: Icon, label, desc, color, bg, delay = 0, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.22, ease: "easeOut" }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer group text-left"
    >
      <div className={`w-9 h-9 flex-shrink-0 rounded-xl ${bg} flex items-center justify-center ${color}`}>
        <Icon size={17} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-semibold text-zinc-100">{label}</p>
        {desc && <p className="text-[11px] text-white/40 mt-0.5 truncate">{desc}</p>}
      </div>
      <ChevronRight size={15} className="text-white/25 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
    </motion.button>
  );
}

/* ────────────────────────────────────────
   ROOT MODAL
──────────────────────────────────────── */
const MENU = [
  { id: "billing",     icon: CreditCard,  label: "Account & Billing", desc: "Profile, plan & invoices",   color: "text-emerald-400", bg: "bg-emerald-400/10", Panel: BillingAccountPanel },
  { id: "permissions", icon: ShieldCheck, label: "Permissions",        desc: "Access & privacy controls", color: "text-amber-400",   bg: "bg-amber-400/10",   Panel: PermissionsPanel    },
  { id: "help",        icon: HelpCircle,  label: "Help & Info",        desc: "Docs, support & about",     color: "text-pink-400",    bg: "bg-pink-400/10",    Panel: HelpInfoPanel       },
];

export default function OptionsModal({ isOpen, onClose }) {
  const [active, setActive] = useState(null);
  const current = MENU.find(m => m.id === active);

  const slideVariants = {
    enter: dir => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center:      { opacity: 1, x: 0 },
    exit:  dir => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setActive(null); onClose(); }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed top-[70px] right-6 z-[100] w-80 rounded-3xl overflow-hidden
                       bg-gradient-to-b from-zinc-900/95 to-zinc-950/97
                       border border-white/10
                       shadow-[0_24px_64px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Ambient glow */}
            <div className={`absolute -top-10 right-5 w-32 h-32 rounded-full blur-[70px] opacity-10 pointer-events-none transition-colors duration-500
              ${current ? current.bg : "bg-cyan-400"}`}
            />

            {/* Header */}
            <div className="flex items-center gap-3 px-5 pt-5 pb-3 border-b border-white/[0.07]">
              {active && (
                <motion.button
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setActive(null)}
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.07] text-white/60 hover:text-white transition-all cursor-pointer border-0 flex-shrink-0"
                >
                  <ChevronLeft size={15} />
                </motion.button>
              )}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active ?? "root"}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="text-[15px] font-bold text-zinc-100 leading-tight"
                  >
                    {current ? current.label : "Settings"}
                  </motion.p>
                </AnimatePresence>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {current ? "Tap back to return" : "Manage your preferences"}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }} whileTap={{ scale: 0.9 }}
                onClick={() => { setActive(null); onClose(); }}
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/[0.07] text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer border-0 flex-shrink-0"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Sliding body */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={active ? 1 : -1}>
                <motion.div
                  key={active ?? "root"}
                  custom={active ? 1 : -1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="px-4 py-4 flex flex-col gap-1.5 max-h-[70vh] overflow-y-auto"
                  style={{ scrollbarWidth: "none" }}
                >
                  {active && current ? (
                    <current.Panel />
                  ) : (
                    MENU.map((item, i) => (
                      <MenuItem
                        key={item.id}
                        {...item}
                        delay={i * 0.04}
                        onClick={() => setActive(item.id)}
                      />
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-5 pb-4 text-center border-t border-white/[0.05] pt-3">
              <span className="text-[10px] text-white/20 tracking-widest uppercase font-medium">
                v1.0.0 · Animate
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
