import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EyesRow from "./Loading";

/* ─────────────────────────────────────────────
   EMOTION COLOR MAP
───────────────────────────────────────────── */
const EMOTION_COLOR = {
    happy: "#f472b6",
    angry: "#f87171",
    think: "#818cf8",
    neutral: "#67e8f9",
    loading: "#34d399",
};

/* ─────────────────────────────────────────────
   EMOTION BUTTON
───────────────────────────────────────────── */
const EmotionBtn = ({ label, active, onClick, color }) => (
    <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        style={{
            background: active ? color : "rgba(255,255,255,0.07)",
            border: `2px solid ${active ? color : "rgba(255,255,255,0.15)"}`,
            color: active ? "#fff" : "rgba(255,255,255,0.6)",
            boxShadow: active ? `0 0 18px ${color}80` : "none",
        }}
        className="px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer"
    >
        {label}
    </motion.button>
);

/* ─────────────────────────────────────────────────────────────
   Eye tracking geometry
   The globe (70vw wide) is centered horizontally on screen.
   The progress bar fills from left→right across the full screen.
   We map progress 0→100 to eye-container `left` 36%→64% inside
   the globe, so the eyes visually point toward the bar's leading
   edge. A spring transition gives a natural "following" feel.
────────────────────────────────────────────────────────────── */
function loadingEyeLeft(progress) {
    // 36% = far-left gaze, 64% = far-right gaze
    return `${36 + (progress / 100) * 28}%`;
}

/* ─────────────────────────────────────────────
   FACE  (main export)
   Props:
     progress (0-100) — controlled externally for loading state
     emotion — controlled externally
     setEmotion — controlled externally
───────────────────────────────────────────── */
export default function Face({ progress = 0, emotion = "neutral", setEmotion }) {
    const [blinkKey, setBlinkKey] = useState(0);

    const handleEmotion = (e) => { setEmotion(e); setBlinkKey(k => k + 1); };

    const EMOTIONS = [
        { id: "happy",   label: "😄 Happy",   color: "#f472b6" },
        { id: "angry",   label: "😠 Angry",   color: "#f87171" },
        { id: "think",   label: "🤔 Think",   color: "#818cf8" },
        { id: "neutral", label: "😐 Neutral", color: "#67e8f9" },
        { id: "loading", label: "⏳ Loading", color: "#34d399" },
    ];

    const accentColor = EMOTION_COLOR[emotion] ?? "#67e8f9";
    const isLoading   = emotion === "loading";

    /* ── Globe motion (non-loading emotions) ── */
    const globeAnimate = emotion === "angry"
        ? { rotate: [-2, 2, -2, 2, 0], scale: 1 }
        : emotion === "think"
            ? { x: [0, 4, 0], scale: 1 }
            : { rotate: 0, x: 0, scale: 1 };

    /* ── Eye container position ── */
    // During loading: track progress bar horizontally + look slightly downward
    // Otherwise: use emotion-driven position
    const eyeLeft = isLoading
        ? loadingEyeLeft(progress)
        : emotion === "think" ? "62%" : "50%";

    const eyeTop = isLoading
        ? "36%"                              // slightly lower → downward gaze
        : emotion === "think" ? "24%" : "30%";

    const eyeTransition = isLoading
        ? { duration: 0.1, ease: "linear" }  // fast tracking to match progress bar
        : { duration: 0.5, ease: "easeInOut" };

    return (
        <div
            className="relative w-full h-screen overflow-hidden bg-zinc-950 flex flex-col items-center justify-between"
            style={{ perspective: "1200px" }}
        >
            <div className="mt-10 flex gap-3 flex-wrap justify-center px-4 items-center">
                {EMOTIONS.map(({ id, label, color }) => (
                    <EmotionBtn
                        key={id}
                        label={label}
                        active={emotion === id}
                        color={color}
                        onClick={() => handleEmotion(id)}
                    />
                ))}
            </div>

            {/* ── Ambient glow ── */}
            <div
                className="pointer-events-none absolute rounded-full"
                style={{
                    width: "70vw", height: "70vw",
                    top: "5%", left: "50%", transform: "translateX(-50%)",
                    background: accentColor,
                    filter: "blur(140px)",
                    opacity: isLoading ? 0.25 : 0.15,
                    transition: "opacity 0.6s, background 0.7s",
                }}
            />

            {/* ── Face wrapper ── */}
            <div className="flex-1 -mb-120 flex items-center justify-center w-full" style={{ position: "relative" }}>

                {/* Globe — always visible */}
                <motion.div
                    key="globe"
                    onClick={() => !isLoading && setBlinkKey(k => k + 1)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, ...(!isLoading ? globeAnimate : { scale: 1 }) }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        width: "70vw", height: "70vw",
                        maxWidth: "700px", maxHeight: "700px",
                        borderRadius: "50%",
                        cursor: isLoading ? "default" : "pointer",
                        position: "relative",
                        background: `radial-gradient(ellipse at 34% 28%, #52525b 0%, #27272a 35%, #18181b 65%, #09090b 100%)`,
                        boxShadow: `
                            0 40px 100px rgba(0,0,0,0.85),
                            inset -18px -18px 40px rgba(0,0,0,0.6),
                            inset 12px 14px 30px rgba(255,255,255,0.06),
                            inset 0 0 60px ${accentColor}22,
                            0 0 40px ${accentColor}18
                        `,
                        border: "none",
                        transition: "box-shadow 0.6s ease",
                        overflow: "hidden",
                    }}
                >
                    {/* ── 3-D specular highlights (non-loading) ── */}
                    <AnimatePresence>
                        {!isLoading && (
                            <motion.div
                                key="specular"
                                style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="absolute rounded-full" style={{
                                    width: "38%", height: "38%", top: "8%", left: "10%",
                                    background: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.14) 0%, transparent 80%)",
                                    filter: "blur(6px)", transform: "rotate(-20deg)",
                                }} />
                                <div className="absolute rounded-full" style={{
                                    width: "10%", height: "10%", top: "14%", left: "18%",
                                    background: "rgba(255,255,255,0.22)", filter: "blur(3px)",
                                }} />
                                <div className="absolute rounded-full" style={{
                                    width: "60%", height: "20%", bottom: "8%", left: "20%",
                                    background: `radial-gradient(ellipse, ${accentColor}18 0%, transparent 70%)`,
                                    filter: "blur(12px)", transition: "background 0.6s",
                                }} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Eyes row — always rendered, position tracks progress during loading ── */}
                    <motion.div
                        className="absolute flex items-center justify-center"
                        animate={{ top: eyeTop, left: eyeLeft }}
                        transition={eyeTransition}
                        style={{ x: "-50%", width: "45vw", zIndex: 15 }}
                    >
                        <EyesRow emotion={isLoading ? "neutral" : emotion} blinkKey={blinkKey} />
                    </motion.div>

                    {/* Ground shadow disc */}
                    <div
                        className="absolute pointer-events-none rounded-full"
                        style={{
                            width: "80%", height: "12%",
                            bottom: "-18%", left: "10%",
                            background: "radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)",
                            filter: "blur(16px)",
                        }}
                    />
                </motion.div>

            </div>
        </div>
    );
}