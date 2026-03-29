import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import envelopeImg from "@/assets/envelope.png";
import butterflyImg from "@/assets/butterfly.png";

interface EnvelopeOpeningProps {
  onComplete: () => void;
}

const EnvelopeOpening = ({ onComplete }: EnvelopeOpeningProps) => {
  const [stage, setStage] = useState<"idle" | "opening" | "invite" | "couple" | "done">("idle");

  const handleClick = () => {
    if (stage !== "idle") return;
    setStage("opening");
    setTimeout(() => setStage("invite"), 2000);
    setTimeout(() => setStage("couple"), 4500);
    setTimeout(() => setStage("done"), 6500);
    setTimeout(onComplete, 7500);
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-wedding-ivory"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0
                  ? "hsl(var(--wedding-gold) / 0.6)"
                  : "hsl(var(--wedding-rose) / 0.4)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Butterflies */}
          <motion.img
            src={butterflyImg}
            alt=""
            className="absolute w-16 h-16 md:w-20 md:h-20"
            style={{ top: "15%", right: "20%" }}
            animate={{
              x: [0, 30, -10, 20, 0],
              y: [0, -20, 10, -30, 0],
              rotate: [0, 10, -5, 15, 0],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            loading="lazy"
            width={80}
            height={80}
          />
          <motion.img
            src={butterflyImg}
            alt=""
            className="absolute w-12 h-12 md:w-16 md:h-16"
            style={{ bottom: "25%", left: "15%" }}
            animate={{
              x: [0, -20, 15, -25, 0],
              y: [0, 15, -10, 20, 0],
              rotate: [0, -10, 5, -15, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            loading="lazy"
            width={64}
            height={64}
          />

          {/* Envelope */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: stage === "opening" ? [1, 1.05, 0.3] : [0.8, 1],
              opacity: stage === "opening" ? [1, 1, 0] : [0, 1],
              y: stage === "opening" ? [0, -20, -100] : [30, 0],
            }}
            transition={{
              duration: stage === "opening" ? 2.5 : 1,
              ease: "easeInOut",
            }}
          >
            <img
              src={envelopeImg}
              alt="Wedding Envelope"
              className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
              width={320}
              height={320}
            />
            {/* Tap hint */}
            {stage === "idle" && (
              <motion.p
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-script text-wedding-rose text-lg whitespace-nowrap"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Opening your invitation...
              </motion.p>
            )}
          </motion.div>

          {/* Invitation card rising */}
          {stage === "opening" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1.5 }}
            >
              <div className="bg-wedding-ivory rounded-lg shadow-wedding p-8 md:p-12 text-center max-w-sm mx-4 border border-wedding-gold/30">
                <p className="font-script text-wedding-gold text-2xl md:text-3xl mb-2">You're Invited</p>
                <p className="font-display text-foreground text-lg tracking-widest uppercase">to the wedding of</p>
                <p className="font-script text-wedding-rose text-4xl md:text-5xl mt-4">
                  Arjun & Priya
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOpening;
