import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import envelopeClosedImg from "@/assets/envelope-closed.png";
import envelopeOpenImg from "@/assets/envelope-open.png";
import butterflyImg from "@/assets/butterfly.png";
import coupleImg from "@/assets/couple-1.jpg";

interface EnvelopeOpeningProps {
  onComplete: () => void;
}

const CARD_WIDTH = 240;
const CARD_HEIGHT = 300;
const ENV_WIDTH = 260;
const ENV_CLOSED_HEIGHT = 180;
const ENV_OPEN_HEIGHT = 240;

const EnvelopeOpening = ({ onComplete }: EnvelopeOpeningProps) => {
  const [stage, setStage] = useState<"closed" | "opening" | "card" | "couple" | "done">("closed");

  const handleClick = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => setStage("card"), 600);
    setTimeout(() => setStage("couple"), 5500);
    setTimeout(() => setStage("done"), 8000);
    setTimeout(onComplete, 9000);
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-wedding-ivory overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 2 === 0 ? "hsl(var(--wedding-gold) / 0.5)" : "hsl(var(--wedding-rose) / 0.3)",
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0, 0.6, 0] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}

          {/* Butterflies */}
          <motion.img src={butterflyImg} alt="" className="absolute w-10 h-10 md:w-14 md:h-14" style={{ top: "10%", right: "15%" }}
            animate={{ x: [0, 20, -8, 15, 0], y: [0, -12, 8, -18, 0], rotate: [0, 8, -4, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }} loading="lazy" width={56} height={56}
          />
          <motion.img src={butterflyImg} alt="" className="absolute w-8 h-8 md:w-10 md:h-10" style={{ bottom: "18%", left: "12%" }}
            animate={{ x: [0, -12, 8, -15, 0], y: [0, 10, -6, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }} loading="lazy" width={40} height={40}
          />

          {/* Couple photo stage */}
          <AnimatePresence>
            {stage === "couple" && (
              <motion.div key="couple" className="absolute inset-0 flex items-center justify-center z-30 p-6"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                <motion.div className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-xs"
                  initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
                  <img src={coupleImg} alt="The happy couple" className="w-full h-auto max-h-[55vh] object-cover" width={320} height={400} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <motion.div className="absolute bottom-0 left-0 right-0 p-4 text-center"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <p className="font-script text-white text-2xl drop-shadow-lg">Arjun & Priya</p>
                    <p className="font-display text-white/80 text-[10px] tracking-[0.2em] uppercase mt-0.5">A love story begins</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope + Card system */}
          {(stage === "closed" || stage === "opening" || stage === "card") && (
            <motion.div
              className="relative flex items-end justify-center"
              style={{ width: ENV_WIDTH, height: stage === "card" ? CARD_HEIGHT + ENV_OPEN_HEIGHT - 40 : ENV_CLOSED_HEIGHT + 40 }}
              animate={{ height: stage === "card" ? CARD_HEIGHT + ENV_OPEN_HEIGHT - 40 : ENV_CLOSED_HEIGHT + 40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Card — positioned above envelope, hidden initially */}
              <motion.div
                className="absolute left-1/2 z-10"
                style={{ marginLeft: -(CARD_WIDTH / 2) }}
                initial={{ bottom: 20, opacity: 0 }}
                animate={
                  stage === "card"
                    ? { bottom: ENV_OPEN_HEIGHT - 30, opacity: 1 }
                    : { bottom: 20, opacity: 0 }
                }
                transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div
                  className="bg-white rounded-lg shadow-xl text-center border border-wedding-gold/30 relative overflow-hidden"
                  style={{ width: CARD_WIDTH, padding: "20px 16px" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-wedding-gold/5 to-wedding-rose/5" />
                  <div className="relative space-y-2">
                    <div className="w-10 h-px bg-wedding-gold/40 mx-auto" />
                    <motion.p className="font-script text-wedding-gold text-xl" initial={{ opacity: 0 }} animate={stage === "card" ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
                      You're Invited
                    </motion.p>
                    <motion.p className="font-display text-foreground/60 text-[10px] tracking-[0.2em] uppercase" initial={{ opacity: 0 }} animate={stage === "card" ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
                      to the wedding of
                    </motion.p>
                    <motion.p className="font-script text-wedding-rose text-3xl leading-tight" initial={{ opacity: 0 }} animate={stage === "card" ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}>
                      Arjun <span className="text-wedding-gold text-xl">&</span> Priya
                    </motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={stage === "card" ? { opacity: 1 } : {}} transition={{ delay: 1.5 }}>
                      <div className="w-8 h-px bg-wedding-gold/40 mx-auto mb-1.5" />
                      <p className="font-display text-wedding-gold text-xs tracking-wider">December 15, 2026</p>
                      <p className="font-body text-foreground/50 text-[10px] mt-0.5">The Grand Rose Garden, Jaipur</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Envelope — sits at the bottom, always in front of card */}
              <motion.div
                className="absolute bottom-0 left-1/2 z-20 cursor-pointer"
                style={{ marginLeft: -(ENV_WIDTH / 2), width: ENV_WIDTH }}
                onClick={handleClick}
                whileHover={stage === "closed" ? { scale: 1.03, y: -2 } : {}}
                whileTap={stage === "closed" ? { scale: 0.97 } : {}}
              >
                <AnimatePresence mode="wait">
                  {stage === "closed" && (
                    <motion.img
                      key="closed"
                      src={envelopeClosedImg}
                      alt="Click to open"
                      className="w-full h-auto object-contain drop-shadow-lg"
                      width={ENV_WIDTH}
                      height={ENV_CLOSED_HEIGHT}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {(stage === "opening" || stage === "card") && (
                    <motion.img
                      key="open"
                      src={envelopeOpenImg}
                      alt="Opened envelope"
                      className="w-full h-auto object-contain drop-shadow-lg"
                      width={ENV_WIDTH}
                      height={ENV_OPEN_HEIGHT}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}

          {/* Tap hint — outside envelope container to avoid overflow */}
          {stage === "closed" && (
            <motion.p
              className="absolute font-script text-wedding-rose text-base"
              style={{ bottom: "12%" }}
              animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to open ✉
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOpening;
