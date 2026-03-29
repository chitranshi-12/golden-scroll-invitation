import { motion } from "framer-motion";
import butterflyImg from "@/assets/butterfly.png";
import floralImg from "@/assets/floral-divider.png";

const FooterSection = () => (
  <footer className="py-16 md:py-24 px-4 bg-wedding-ivory text-center relative overflow-hidden">
    {/* Floating butterflies */}
    <motion.img
      src={butterflyImg}
      alt=""
      className="absolute top-8 right-[10%] w-10 h-10 opacity-30"
      animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      loading="lazy"
      width={40}
      height={40}
    />
    <motion.img
      src={butterflyImg}
      alt=""
      className="absolute bottom-12 left-[15%] w-8 h-8 opacity-20"
      animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
      loading="lazy"
      width={32}
      height={32}
    />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="font-script text-5xl md:text-7xl text-gradient-gold">Arjun & Priya</p>
      <p className="font-display text-lg tracking-[0.3em] uppercase text-foreground/50 mt-4">
        15 · 12 · 2026
      </p>

      <img src={floralImg} alt="" className="w-40 mx-auto mt-6 opacity-40" loading="lazy" width={160} height={68} />

      <p className="font-body text-sm text-foreground/40 mt-8">
        Made with ♥ · Powered by <span className="font-display font-semibold">Shyara</span>
      </p>
    </motion.div>
  </footer>
);

export default FooterSection;
