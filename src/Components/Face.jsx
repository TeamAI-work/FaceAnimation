import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ─────────────────────────────────────────────
   SINE-WAVE PATH BUILDER  (module-level, computed once)
   Builds a wide SVG path string for seamless horizontal scrolling.
   viewBox assumed to be 0 0 400 400.
───────────────────────────────────────────── */
function buildWave(cy, amp, wavelength, phase = 0) {
    const pts = [];
    for (let x = -wavelength; x <= 800; x += 3) {
        const y = cy + amp * Math.sin((2 * Math.PI * (x + phase)) / wavelength);
        pts.push(`${x.toFixed(0)},${y.toFixed(1)}`);
    }
    return `M ${pts[0]} L ${pts.slice(1).join(" L ")}`;
}

const WAVE_TEAL = buildWave(195, 30, 200, 0);
const WAVE_PINK = buildWave(215, 22, 200, 60);

const DOUBLE_BLINK_KEYFRAMES = [1, 0, 1, 0, 1];
const DOUBLE_BLINK_TIMES = [0, 0.15, 0.3, 0.45, 0.6];
const NEUTRAL_BLINK_KEYFRAMES = [1, 0, 1, 1];
const NEUTRAL_BLINK_TIMES = [0, 0.05, 0.1, 1];

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
   GLASS WAVE LAYER
   Renders the two animated sine waves + glass overlays
   inside the sphere during loading.
───────────────────────────────────────────── */
function GlassWaveLayer() {
    return (
        <motion.div
            style={{ position: "absolute", inset: 0, zIndex: 8, pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            <svg
                viewBox="0 0 400 400"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            >
                <defs>
                    <filter id="wave-glow-teal" x="-20%" y="-100%" width="140%" height="300%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="wave-glow-pink" x="-20%" y="-100%" width="140%" height="300%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* Teal wave — scrolls one full period every 3 s */}
                <motion.g
                    animate={{ x: [0, -200] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    <path d={WAVE_TEAL}
                        stroke="#2dd4bf" strokeWidth="3.5" fill="none"
                        strokeLinecap="round"
                        filter="url(#wave-glow-teal)"
                        opacity="0.92"
                    />
                </motion.g>

                {/* Pink wave — different speed creates crossing effect */}
                <motion.g
                    animate={{ x: [0, -200] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
                >
                    <path d={WAVE_PINK}
                        stroke="#fb7185" strokeWidth="2.8" fill="none"
                        strokeLinecap="round"
                        filter="url(#wave-glow-pink)"
                        opacity="0.85"
                    />
                </motion.g>
            </svg>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   LOADING ANIMATION  (separate function as requested)
   Returns:
     • breathingProps — scale + glow pulse for the globe
     • waveLayer      — the glass-bubble wave JSX
───────────────────────────────────────────── */
function useLoadingAnimation(isLoading) {
    const breathingProps = isLoading
        ? {
            animate: {
                scale: [1, 1.035, 1, 1.025, 1],
                boxShadow: [
                    "0 0 60px #34d39930",
                    "0 0 100px #34d39960",
                    "0 0 60px #34d39930",
                    "0 0 90px #34d39950",
                    "0 0 60px #34d39930",
                ],
            },
            transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
        }
        : { animate: { scale: 1 }, transition: { duration: 0.5 } };

    const waveLayer = (
        <AnimatePresence>
            {isLoading && <GlassWaveLayer key="glass-wave" />}
        </AnimatePresence>
    );

    return { breathingProps, waveLayer };
}

/* ─────────────────────────────────────────────
   EYE COMPONENT  (3-D version with iris glow + highlight)
───────────────────────────────────────────── */
const UnifiedEye = ({ emotion, side, blinkKey }) => {
    const isLoading = emotion === "loading";
    const mergedX = side === "left" ? "7vw" : "-7vw";
    const targetX = isLoading ? mergedX : "0vw";
    const targetScaleY = isLoading ? 0.05 : 1;
    const targetOpacity = isLoading ? 0 : 1;
    const eyeColor = "#67e8f9";

    const getClipPath = (emo, s) => {
        let topLeft = [0, 0], topMid = [50, 0], topRight = [100, 0];
        if (emo === "angry") {
            if (s === "left") { topRight = [100, 26]; topMid = [50, 13]; }
            else { topLeft = [0, 26]; topMid = [50, 13]; }
        }
        const pts = [
            `${topLeft[0]}% ${topLeft[1]}%`,
            `${topMid[0]}% ${topMid[1]}%`,
            `${topRight[0]}% ${topRight[1]}%`,
            `100% 50%`,
        ];
        for (let i = 0; i <= 20; i++) {
            const x = 100 - i * 5;
            let y = 100;
            if (emo === "happy") { const nx = x / 100; y = 100 - 10 * Math.sin(nx * Math.PI); }
            pts.push(`${x}% ${y.toFixed(1)}%`);
        }
        pts.push(`0% 50%`);
        return `polygon(${pts.join(", ")})`;
    };

    const clipPath = getClipPath(emotion, side);

    const isNeutral = emotion === "neutral";
    const blinkKFs = isNeutral ? NEUTRAL_BLINK_KEYFRAMES : DOUBLE_BLINK_KEYFRAMES;
    const blinkTimes = isNeutral ? NEUTRAL_BLINK_TIMES : DOUBLE_BLINK_TIMES;
    const blinkDuration = isNeutral ? 3 : 1.2;
    const blinkRepeat = isNeutral ? Infinity : 0;

    return (
        <motion.div
            className="relative mx-[3vw]"
            style={{ width: "8vw", maxWidth: "60px", height: "30vw", maxHeight: "150px", transformOrigin: "center" }}
            initial={false}
            animate={{ x: targetX, scaleY: targetScaleY, opacity: targetOpacity }}
            transition={{ duration: 0.5, ease: "easeInOut", opacity: { delay: isLoading ? 0.4 : 0, duration: 0.1 } }}
        >
            <motion.div
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{ clipPath }}
                animate={{ clipPath }}
                transition={{ duration: 0.4 }}
            >
                {/* Base iris gradient */}
                <motion.div
                    key={blinkKey + (isNeutral ? "N" : "D")}
                    className="absolute inset-0 origin-center"
                    style={{
                        background: `radial-gradient(ellipse at 38% 32%, ${eyeColor}ff 0%, ${eyeColor}cc 40%, ${eyeColor}55 100%)`,
                        boxShadow: `inset 0 0 20px ${eyeColor}44`,
                        transition: "background 0.5s",
                    }}
                    animate={isLoading ? { scaleY: 1 } : { scaleY: blinkKFs }}
                    transition={isLoading ? {} : { duration: blinkDuration, times: blinkTimes, ease: "easeInOut", repeat: blinkRepeat }}
                />
            </motion.div>
        </motion.div>
    );
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

/* ─────────────────────────────────────────────
   FACE  (main export)
───────────────────────────────────────────── */
export default function Face() {
    const [emotion, setEmotion] = useState("neutral");
    const [blinkKey, setBlinkKey] = useState(0);

    const handleEmotion = (e) => { setEmotion(e); setBlinkKey(k => k + 1); };

    const EMOTIONS = [
        { id: "happy", label: "😄 Happy", color: "#f472b6" },
        { id: "angry", label: "😠 Angry", color: "#f87171" },
        { id: "think", label: "🤔 Think", color: "#818cf8" },
        { id: "neutral", label: "😐 Neutral", color: "#67e8f9" },
        { id: "loading", label: "⏳ Loading", color: "#34d399" },
    ];

    const accentColor = EMOTION_COLOR[emotion] ?? "#67e8f9";
    const isLoading = emotion === "loading";

    // ── Loading animation hook ──
    const { breathingProps, waveLayer } = useLoadingAnimation(isLoading);

    return (
        <div
            className="relative w-full h-screen overflow-hidden bg-zinc-950 flex flex-col items-center justify-between"
            style={{ perspective: "1200px" }}
        >

            <div className="mt-10 flex gap-3 flex-wrap justify-center px-4">
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
                className="pointer-events-none absolute rounded-full transition-colors duration-700"
                style={{
                    width: "70vw", height: "70vw",
                    top: "5%", left: "50%", transform: "translateX(-50%)",
                    background: accentColor,
                    filter: "blur(140px)",
                    opacity: isLoading ? 0.25 : 0.15,
                    transition: "opacity 0.6s, background 0.7s",
                }}
            />

            {/* ── Face wrapper (perspective target) ── */}
            <div className="flex-1 -mb-120 flex items-center justify-center w-full">
                <motion.div
                    onClick={() => !isLoading && setBlinkKey(k => k + 1)}
                    animate={
                        isLoading
                            ? breathingProps.animate
                            : emotion === "angry"
                                ? { rotate: [-2, 2, -2, 2, 0], scale: 1 }
                                : emotion === "think"
                                    ? { x: [0, 4, 0], scale: 1 }
                                    : { rotate: 0, x: 0, scale: 1 }
                    }
                    transition={isLoading ? breathingProps.transition : { duration: 0.5, ease: "easeInOut" }}
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
                        border: "2px solid rgba(255,255,255,0.07)",
                        transition: "box-shadow 0.6s ease",
                        overflow: "hidden",
                    }}
                >
                    {/* Primary specular highlight (top-left gloss) */}
                    <div
                        className="absolute pointer-events-none rounded-full"
                        style={{
                            width: "38%", height: "26%",
                            top: "8%", left: "10%",
                            background: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.14) 0%, transparent 80%)",
                            filter: "blur(6px)",
                            transform: "rotate(-20deg)",
                            zIndex: 20,
                        }}
                    />
                    {/* Secondary small glint */}
                    <div
                        className="absolute pointer-events-none rounded-full"
                        style={{
                            width: "10%", height: "7%",
                            top: "14%", left: "18%",
                            background: "rgba(255,255,255,0.22)",
                            filter: "blur(3px)",
                            zIndex: 20,
                        }}
                    />
                    {/* Bottom rim light (subtle colored bounce) */}
                    <div
                        className="absolute pointer-events-none rounded-full"
                        style={{
                            width: "60%", height: "20%",
                            bottom: "8%", left: "20%",
                            background: `radial-gradient(ellipse, ${accentColor}18 0%, transparent 70%)`,
                            filter: "blur(12px)",
                            transition: "background 0.6s",
                            zIndex: 5,
                        }}
                    />

                    {/* ── Glass wave animation (loading state) ── */}
                    {waveLayer}

                    {/* Eyes row */}
                    <motion.div
                        className="absolute flex items-center justify-center"
                        animate={{
                            top: emotion === "think" ? "24%" : "30%",
                            left: emotion === "think" ? "62%" : "50%",
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ x: "-50%", width: "28vw", zIndex: 15 }}
                    >
                        {/* Regular eyes — hidden during loading */}
                        <AnimatePresence>
                            {!isLoading && (
                                <motion.div
                                    key="eyes"
                                    className="flex items-center justify-center gap-12"
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                    style={{ position: "absolute", width: "100%", height: "100%" }}
                                >
                                    <UnifiedEye emotion={emotion} side="left" blinkKey={blinkKey} />
                                    <UnifiedEye emotion={emotion} side="right" blinkKey={blinkKey} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Ground shadow disc (below the sphere, for depth) */}
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