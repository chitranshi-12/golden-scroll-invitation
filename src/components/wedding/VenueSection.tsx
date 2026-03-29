import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import venueImg from "@/assets/venue.jpg";
import ornateFrame from "@/assets/ornate-frame.png";
import { MapPin, Calendar, Clock } from "lucide-react";

const VenueSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 gradient-wedding overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <MapPin className="w-6 h-6 mx-auto mb-4 text-wedding-rose" />
          <h2 className="font-script text-5xl md:text-6xl text-gradient-gold">The Venue</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Venue image with parallax */}
          <motion.div
            className="relative"
            style={{ y: imgY, scale: imgScale }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-wedding">
              <img
                src={venueImg}
                alt="Wedding venue"
                className="w-full h-72 md:h-96 object-cover"
                loading="lazy"
                width={600}
                height={400}
              />
            </div>
            {/* Decorative frame overlay */}
            <img
              src={ornateFrame}
              alt=""
              className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] object-contain opacity-20 pointer-events-none"
              loading="lazy"
              width={400}
              height={300}
            />
          </motion.div>

          {/* Details */}
          <motion.div
            className="text-center md:text-left space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-3xl md:text-4xl text-foreground">
              The Grand Rose Garden
            </h3>
            <p className="font-body text-lg text-foreground/70 leading-relaxed">
              Nestled amidst centuries-old trees and fragrant rose beds, this enchanting garden
              provides the perfect backdrop for our celebration of love.
            </p>

            <div className="space-y-4">
              {[
                { icon: MapPin, text: "42 Rose Garden Lane, Jaipur, Rajasthan 302001" },
                { icon: Calendar, text: "Saturday, December 15, 2026" },
                { icon: Clock, text: "Ceremony begins at 5:00 PM" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 justify-center md:justify-start">
                  <item.icon className="w-5 h-5 text-wedding-gold mt-0.5 shrink-0" />
                  <p className="font-body text-foreground/80">{item.text}</p>
                </div>
              ))}
            </div>

            <motion.button
              className="mt-4 px-8 py-3 rounded-full font-display text-sm tracking-wider uppercase gradient-gold text-accent-foreground shadow-wedding glow-gold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Directions
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
