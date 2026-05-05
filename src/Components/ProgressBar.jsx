import { motion } from "framer-motion";
import gif from "../assets/Doraemon.gif"
/**
 * ProgressBar Component
 * @param {number} progress - Current progress percentage (0-100)
 * @param {string} label - Optional label text to display above the bar
 * @param {string} color - Custom accent color (defaults to theme cyan)
 */
export default function ProgressBar({ progress = 0, label = "", color = "#67e8f9" }) {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className="w-full space-y-1">
            {/* Optional Label and Percentage */}
            {label && (
                <div className="flex justify-between items-end px-4">
                    <span className="text-zinc-400 text-[10px] font-medium tracking-widest uppercase">
                        {label}
                    </span>
                    <span className="text-zinc-100 text-xs font-bold tabular-nums">
                        {Math.round(clampedProgress)}%
                    </span>
                </div>
            )}

            {/* Progress Track */}
            <div className="relative h-5.5 w-full bg-zinc-900/30 border-y border-white/5">
                {/* Background Glow */}
                <div 
                    className="absolute inset-0 opacity-10 blur-md"
                    style={{ background: color }}
                />

                {/* Progress Fill */}
                <motion.div
                    className="absolute inset-y-0 left-0 overflow-hidden rounded-full"
                    style={{ 
                        background: `linear-gradient(90deg, ${color}aa 0%, ${color} 100%)`,
                        boxShadow: `0 0 15px ${color}33`,
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${clampedProgress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                >
                    {/* Animated "Light" Stream Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ 
                            x: ["-100%", "200%"],
                        }}
                        transition={{ 
                            duration: 2.5, 
                            repeat: Infinity, 
                            ease: "linear",
                        }}
                        style={{ width: "60%" }}
                    />
                </motion.div>

                {/* --- Accelerating Avatar (Car) --- */}
                <motion.div
                    className="absolute bottom-full mb-1 z-20 pointer-events-none flex justify-center items-center"
                    style={{ 
                        left: `${clampedProgress}%`, 
                        x: "-70%",
                        translateX: "-10px",
                        width: "120px" 
                    }}
                    animate={{ 
                        rotate: [0, -2, 0], // subtle vibration/tilt
                    }}
                    transition={{ 
                        duration: 0.1, 
                        repeat: Infinity,
                        left: { duration: 0.1, ease: "linear" } 
                    }}
                >
                    {/* <div className="text-xl filter drop-shadow-[0_0_8px_rgba(103,232,249,0.6)]">
                        <img src={gif} width={300} />
                    </div> */}
                </motion.div>
            </div>
        </div>
    );
}