import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Music, Utensils, Heart, Camera, Sparkles } from "lucide-react";
import ornateFrame from "@/assets/ornate-frame.png";

const schedule = [
  { time: "4:00 PM", event: "Guest Arrival", desc: "Welcome drinks & mingling", icon: Sparkles },
  { time: "5:00 PM", event: "Wedding Ceremony", desc: "Exchange of vows under the arch", icon: Heart },
  { time: "6:00 PM", event: "Photo Session", desc: "Capturing beautiful memories", icon: Camera },
  { time: "7:00 PM", event: "Cocktail Hour", desc: "Live music & hors d'oeuvres", icon: Music },
  { time: "8:00 PM", event: "Reception Dinner", desc: "A feast to celebrate love", icon: Utensils },
  { time: "10:00 PM", event: "First Dance", desc: "Under a sky of lights", icon: Clock },
];

const ScheduleSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-20 md:py-32 px-4 bg-wedding-ivory relative overflow-hidden">
      {/* Decorative frame corners */}
      <img
        src={ornateFrame}
        alt=""
        className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl opacity-15 pointer-events-none"
        loading="lazy"
        width={800}
        height={600}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Clock className="w-6 h-6 mx-auto mb-4 text-wedding-gold" />
          <h2 className="font-script text-5xl md:text-6xl text-gradient-gold">Wedding Day</h2>
          <p className="font-body text-lg text-foreground/60 mt-3">December 15, 2026</p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-wedding-gold/30 to-transparent md:-translate-x-px" />

          <div className="space-y-8">
            {schedule.map((item, i) => {
              const Icon = item.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className={`relative flex items-center gap-4 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-wedding-gold -translate-x-1.5 glow-gold z-10" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-wedding border border-border/50">
                      <div className={`flex items-center gap-2 mb-1 ${isEven ? "md:justify-end" : ""}`}>
                        <Icon className="w-4 h-4 text-wedding-gold" />
                        <span className="font-display text-sm tracking-wider text-wedding-gold font-semibold">{item.time}</span>
                      </div>
                      <h3 className="font-display text-lg text-foreground">{item.event}</h3>
                      <p className="font-body text-sm text-foreground/60">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
