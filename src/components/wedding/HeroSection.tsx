import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/wedding-hero.jpg";
import floralImg from "@/assets/floral-divider.png";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroImg}
          alt="Wedding"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 text-center px-4" style={{ opacity }}>
        <motion.p
          className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-wedding-mauve mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Together with their families
        </motion.p>

        <motion.h1
          className="font-script text-6xl md:text-8xl lg:text-9xl text-gradient-gold leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Arjun & Priya
        </motion.h1>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="font-display text-xl md:text-2xl tracking-widest text-foreground/80">
            REQUEST THE PLEASURE OF YOUR COMPANY
          </p>
          <p className="font-display text-lg md:text-xl text-wedding-rose mt-2">
            at the celebration of their marriage
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <p className="font-script text-3xl md:text-4xl text-wedding-gold">December 15, 2026</p>
          <p className="font-body text-base md:text-lg text-foreground/70 tracking-wider">
            The Grand Rose Garden, Jaipur
          </p>
        </motion.div>

        {/* Floral divider */}
        <motion.img
          src={floralImg}
          alt=""
          className="w-48 md:w-64 mx-auto mt-8 opacity-70"
          loading="lazy"
          width={256}
          height={109}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: 1.6 }}
        />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-wedding-gold/50 flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-3 rounded-full bg-wedding-gold/60"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
