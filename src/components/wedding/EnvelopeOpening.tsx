import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import envelopeClosedImg from "@/assets/envelope-closed.png";
import envelopeOpenImg from "@/assets/envelope-open.png";
import butterflyImg from "@/assets/butterfly.png";
import coupleImg from "@/assets/couple-1.jpg";

interface EnvelopeOpeningProps {
  onComplete: () => void;
}

const EnvelopeOpening = ({ onComplete }: EnvelopeOpeningProps) => {
  const [stage, setStage] = useState<"closed" | "opening" | "card" | "couple" | "done">("closed");

  const handleClick = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => setStage("card"), 800);
    setTimeout(() => setStage("couple"), 5000);
    setTimeout(() => setStage("done"), 7500);
    setTimeout(onComplete, 8500);
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-wedding-ivory overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Floating particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0
                  ? "hsl(var(--wedding-gold) / 0.5)"
                  : "hsl(var(--wedding-rose) / 0.3)",
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0, 0.7, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}

          {/* Butterflies */}
          <motion.img src={butterflyImg} alt="" className="absolute w-12 h-12 md:w-16 md:h-16" style={{ top: "8%", right: "15%" }}
            animate={{ x: [0, 25, -10, 20, 0], y: [0, -15, 10, -25, 0], rotate: [0, 10, -5, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }} loading="lazy" width={64} height={64}
          />
          <motion.img src={butterflyImg} alt="" className="absolute w-10 h-10 md:w-12 md:h-12" style={{ bottom: "15%", left: "10%" }}
            animate={{ x: [0, -15, 10, -20, 0], y: [0, 12, -8, 15, 0], rotate: [0, -8, 5, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }} loading="lazy" width={48} height={48}
          />

          {/* Couple photo stage */}
          <AnimatePresence>
            {stage === "couple" && (
              <motion.div
                key="couple"
                className="absolute inset-0 flex items-center justify-center z-30 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm"
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <img src={coupleImg} alt="The happy couple" className="w-full h-auto max-h-[60vh] object-cover" width={400} height={500} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <motion.div className="absolute bottom-0 left-0 right-0 p-4 text-center"
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <p className="font-script text-white text-2xl md:text-3xl drop-shadow-lg">Arjun & Priya</p>
                    <p className="font-display text-white/90 text-xs tracking-[0.2em] uppercase mt-1">A love story begins</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope + Card — all contained in a centered flex column */}
          {(stage === "closed" || stage === "opening" || stage === "card") && (
            <div className="relative flex flex-col items-center justify-end" style={{ height: "80vh", maxHeight: 520 }}>

              {/* Invitation card — rises from behind envelope */}
              <motion.div
                className="absolute z-10"
                style={{ bottom: "50%" }}
                initial={{ y: 60, opacity: 0 }}
                animate={
                  stage === "card"
                    ? { y: -10, opacity: 1 }
                    : { y: 60, opacity: 0 }
                }
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="bg-white rounded-lg shadow-xl px-5 py-6 md:px-7 md:py-8 text-center border border-wedding-gold/30 relative overflow-hidden"
                  style={{ width: "min(260px, 70vw)" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-wedding-gold/5 to-wedding-rose/5" />
                  <div className="relative">
                    <div className="w-12 h-px bg-wedding-gold/40 mx-auto mb-3" />
                    <motion.p className="font-script text-wedding-gold text-xl md:text-2xl mb-1"
                      initial={{ opacity: 0 }} animate={stage === "card" ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
                      You're Invited
                    </motion.p>
                    <motion.p className="font-display text-foreground/60 text-[10px] tracking-[0.2em] uppercase"
                      initial={{ opacity: 0 }} animate={stage === "card" ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
                      to the wedding of
                    </motion.p>
                    <motion.p className="font-script text-wedding-rose text-3xl md:text-4xl mt-2 leading-tight"
                      initial={{ opacity: 0, scale: 0.9 }} animate={stage === "card" ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1, duration: 0.6 }}>
                      Arjun <span className="text-wedding-gold text-2xl">&</span> Priya
                    </motion.p>
                    <motion.div className="mt-2" initial={{ opacity: 0 }} animate={stage === "card" ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}>
                      <div className="w-8 h-px bg-wedding-gold/40 mx-auto mb-2" />
                      <p className="font-display text-wedding-gold text-sm tracking-wider">December 15, 2026</p>
                      <p className="font-body text-foreground/50 text-xs mt-0.5">The Grand Rose Garden, Jaipur</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Envelope — sized to match card width */}
              <motion.div
                className="relative z-20 cursor-pointer"
                onClick={handleClick}
                whileHover={stage === "closed" ? { scale: 1.04 } : {}}
                whileTap={stage === "closed" ? { scale: 0.97 } : {}}
                style={{ width: "min(260px, 70vw)" }}
              >
                <AnimatePresence mode="wait">
                  {stage === "closed" && (
                    <motion.img
                      key="closed"
                      src={envelopeClosedImg}
                      alt="Click to open envelope"
                      className="w-full h-auto object-contain drop-shadow-xl"
                      width={260}
                      height={180}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                  {(stage === "opening" || stage === "card") && (
                    <motion.img
                      key="open"
                      src={envelopeOpenImg}
                      alt="Opened envelope"
                      className="w-full h-auto object-contain drop-shadow-xl"
                      width={260}
                      height={180}
                      initial={{ scale: 1.08, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </AnimatePresence>

                {stage === "closed" && (
                  <motion.p
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-script text-wedding-rose text-base whitespace-nowrap"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Tap to open ✉
                  </motion.p>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOpening;
