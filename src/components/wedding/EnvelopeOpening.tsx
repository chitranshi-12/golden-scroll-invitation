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
    // After envelope opens, show card rising
    setTimeout(() => setStage("card"), 800);
    // Then couple photo
    setTimeout(() => setStage("couple"), 5000);
    // Then fade out
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
          <motion.img src={butterflyImg} alt="" className="absolute w-14 h-14 md:w-18 md:h-18" style={{ top: "12%", right: "18%" }}
            animate={{ x: [0, 25, -10, 20, 0], y: [0, -15, 10, -25, 0], rotate: [0, 10, -5, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }} loading="lazy" width={72} height={72}
          />
          <motion.img src={butterflyImg} alt="" className="absolute w-10 h-10 md:w-14 md:h-14" style={{ bottom: "20%", left: "12%" }}
            animate={{ x: [0, -15, 10, -20, 0], y: [0, 12, -8, 15, 0], rotate: [0, -8, 5, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }} loading="lazy" width={56} height={56}
          />

          {/* Couple photo stage */}
          <AnimatePresence>
            {stage === "couple" && (
              <motion.div
                key="couple"
                className="absolute inset-0 flex items-center justify-center z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-4"
                  initial={{ scale: 0.85, rotateY: 12 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <img src={coupleImg} alt="The happy couple" className="w-full h-auto max-h-[70vh] object-cover" width={600} height={800} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <motion.div className="absolute bottom-0 left-0 right-0 p-6 text-center"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <p className="font-script text-white text-3xl md:text-4xl drop-shadow-lg">Arjun & Priya</p>
                    <p className="font-display text-white/90 text-sm tracking-[0.2em] uppercase mt-1">A love story begins</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope + Card container — stays visible during closed, opening, card stages */}
          {(stage === "closed" || stage === "opening" || stage === "card") && (
            <div className="relative flex items-center justify-center" style={{ width: 320, height: 400 }}>
              
              {/* Invitation card — starts hidden behind envelope, rises up on "card" stage */}
              <motion.div
                className="absolute z-10"
                style={{ bottom: "45%" }}
                initial={{ y: 80, opacity: 0 }}
                animate={
                  stage === "card"
                    ? { y: -180, opacity: 1 }
                    : { y: 80, opacity: 0 }
                }
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 text-center border-2 border-wedding-gold/30 relative overflow-hidden"
                  style={{ width: 280, minHeight: 320 }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-wedding-gold/5 to-wedding-rose/5" />
                  <div className="relative">
                    <div className="w-16 h-0.5 bg-wedding-gold/40 mx-auto mb-4" />
                    <motion.p className="font-script text-wedding-gold text-2xl md:text-3xl mb-2"
                      initial={{ opacity: 0, y: 10 }} animate={stage === "card" ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>
                      You're Invited
                    </motion.p>
                    <motion.p className="font-display text-foreground/70 text-xs tracking-[0.25em] uppercase"
                      initial={{ opacity: 0 }} animate={stage === "card" ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
                      to the wedding of
                    </motion.p>
                    <motion.p className="font-script text-wedding-rose text-4xl md:text-5xl mt-3 leading-tight"
                      initial={{ opacity: 0, scale: 0.85 }} animate={stage === "card" ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.1, duration: 0.7 }}>
                      Arjun
                      <span className="text-wedding-gold text-3xl mx-2">&</span>
                      Priya
                    </motion.p>
                    <motion.div className="mt-3" initial={{ opacity: 0 }} animate={stage === "card" ? { opacity: 1 } : {}} transition={{ delay: 1.5 }}>
                      <div className="w-12 h-0.5 bg-wedding-gold/40 mx-auto mb-3" />
                      <p className="font-display text-wedding-gold text-base tracking-wider">December 15, 2026</p>
                      <p className="font-body text-foreground/60 text-sm mt-1">The Grand Rose Garden, Jaipur</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Envelope image — closed or open */}
              <motion.div
                className="relative z-20 cursor-pointer"
                onClick={handleClick}
                whileHover={stage === "closed" ? { scale: 1.05 } : {}}
                whileTap={stage === "closed" ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {stage === "closed" && (
                    <motion.img
                      key="closed"
                      src={envelopeClosedImg}
                      alt="Click to open envelope"
                      className="w-64 h-64 md:w-72 md:h-72 object-contain drop-shadow-2xl"
                      width={288}
                      height={288}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  {(stage === "opening" || stage === "card") && (
                    <motion.img
                      key="open"
                      src={envelopeOpenImg}
                      alt="Opened envelope"
                      className="w-64 h-64 md:w-72 md:h-72 object-contain drop-shadow-2xl"
                      width={288}
                      height={288}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>

                {/* Tap hint */}
                {stage === "closed" && (
                  <motion.p
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-script text-wedding-rose text-lg whitespace-nowrap"
                    animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
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
