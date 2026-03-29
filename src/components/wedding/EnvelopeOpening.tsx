import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import envelopeImg from "@/assets/envelope.png";
import butterflyImg from "@/assets/butterfly.png";
import coupleImg from "@/assets/couple-1.jpg";

interface EnvelopeOpeningProps {
  onComplete: () => void;
}

const EnvelopeOpening = ({ onComplete }: EnvelopeOpeningProps) => {
  const [stage, setStage] = useState<"idle" | "opening" | "invite" | "couple" | "done">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("opening"), 1500);
    const t2 = setTimeout(() => setStage("invite"), 3500);
    const t3 = setTimeout(() => setStage("couple"), 6500);
    const t4 = setTimeout(() => setStage("done"), 9000);
    const t5 = setTimeout(onComplete, 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onComplete]);

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

          <AnimatePresence mode="wait">
            {(stage === "idle" || stage === "opening") && (
              <motion.div
                key="envelope"
                className="relative flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={
                  stage === "opening"
                    ? { scale: [1, 1.1, 0.2], opacity: [1, 1, 0], y: [0, -30, -150], rotate: [0, 5, -10] }
                    : { scale: 1, opacity: 1, y: 0 }
                }
                transition={{ duration: stage === "opening" ? 1.8 : 1, ease: "easeInOut" }}
              >
                <img
                  src={envelopeImg}
                  alt="Wedding Envelope"
                  className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
                  width={320}
                  height={320}
                />
                {stage === "idle" && (
                  <motion.p
                    className="mt-4 font-script text-wedding-rose text-xl whitespace-nowrap"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Opening your invitation...
                  </motion.p>
                )}
              </motion.div>
            )}

            {stage === "invite" && (
              <motion.div
                key="invite-card"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.7, rotateX: 30 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -40 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <div className="bg-wedding-ivory rounded-2xl shadow-wedding p-8 md:p-12 text-center max-w-md mx-4 border-2 border-wedding-gold/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-wedding-gold/5 to-wedding-rose/5" />
                  <div className="relative">
                    <motion.p className="font-script text-wedding-gold text-3xl md:text-4xl mb-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>You're Invited</motion.p>
                    <motion.p className="font-display text-foreground/80 text-base tracking-[0.2em] uppercase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>to the wedding of</motion.p>
                    <motion.p className="font-script text-wedding-rose text-5xl md:text-6xl mt-4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>Arjun & Priya</motion.p>
                    <motion.p className="font-display text-wedding-gold text-lg mt-4 tracking-wider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>December 15, 2026</motion.p>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === "couple" && (
              <motion.div
                key="couple-reveal"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-4"
                  initial={{ scale: 0.8, rotateY: 15 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <img src={coupleImg} alt="The happy couple" className="w-full h-auto max-h-[70vh] object-cover" width={600} height={800} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <motion.div className="absolute bottom-0 left-0 right-0 p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
                    <p className="font-script text-white text-3xl md:text-4xl drop-shadow-lg">Arjun & Priya</p>
                    <p className="font-display text-white/90 text-sm tracking-[0.2em] uppercase mt-1">A love story begins</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOpening;
