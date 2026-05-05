import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   BLINK CONSTANTS
───────────────────────────────────────────── */
const DOUBLE_BLINK_KEYFRAMES  = [1, 0, 1, 0, 1];
const DOUBLE_BLINK_TIMES      = [0, 0.15, 0.3, 0.45, 0.6];
const NEUTRAL_BLINK_KEYFRAMES = [1, 0, 1, 1];
const NEUTRAL_BLINK_TIMES     = [0, 0.05, 0.1, 1];

/* ─────────────────────────────────────────────
   SINGLE EYE  (iris + clip-path + blink)
───────────────────────────────────────────── */
function UnifiedEye({ emotion, side, blinkKey }) {
    const eyeColor = "#67e8f9";

    const getClipPath = (emo, s) => {
        let topLeft = [0, 0], topMid = [50, 0], topRight = [100, 0];
        if (emo === "angry") {
            if (s === "left") { topRight = [100, 26]; topMid = [50, 13]; }
            else              { topLeft  = [0, 26];   topMid = [50, 13]; }
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

    const clipPath      = getClipPath(emotion, side);
    const isNeutral     = emotion === "neutral";
    const blinkKFs      = isNeutral ? NEUTRAL_BLINK_KEYFRAMES : DOUBLE_BLINK_KEYFRAMES;
    const blinkTimes    = isNeutral ? NEUTRAL_BLINK_TIMES     : DOUBLE_BLINK_TIMES;
    const blinkDuration = isNeutral ? 3 : 1.2;
    const blinkRepeat   = isNeutral ? Infinity : 0;

    return (
        <motion.div
            className="relative mx-[3vw]"
            style={{ width: "12vw", maxWidth: "80px", height: "30vw", maxHeight: "150px", transformOrigin: "center" }}
            initial={false}
            animate={{ x: "0vw", scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <motion.div
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{ clipPath }}
                animate={{ clipPath }}
                transition={{ duration: 0.4 }}
            >
                <motion.div
                    key={blinkKey + (isNeutral ? "N" : "D")}
                    className="absolute inset-0 origin-center"
                    style={{
                        background: `radial-gradient(ellipse at 38% 32%, ${eyeColor}ff 0%, ${eyeColor}cc 40%, ${eyeColor}55 100%)`,
                        boxShadow: `inset 0 0 20px ${eyeColor}44`,
                        transition: "background 0.5s",
                    }}
                    animate={{ scaleY: blinkKFs }}
                    transition={{ duration: blinkDuration, times: blinkTimes, ease: "easeInOut", repeat: blinkRepeat }}
                />
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   EYES ROW  — shown for all non-loading emotions
   Props: emotion, blinkKey
───────────────────────────────────────────── */
export default function EyesRow({ emotion, blinkKey }) {
    return (
        <motion.div
            key="eyes"
            className="flex items-center justify-center gap-12"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{ position: "absolute", width: "100%", height: "100%" }}
        >
            <UnifiedEye emotion={emotion} side="left"  blinkKey={blinkKey} />
            <UnifiedEye emotion={emotion} side="right" blinkKey={blinkKey} />
        </motion.div>
    );
}