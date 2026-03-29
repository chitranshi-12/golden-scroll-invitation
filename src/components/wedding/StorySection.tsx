import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import { Heart } from "lucide-react";

const events = [
  {
    date: "June 2020",
    title: "First Meeting",
    desc: "A chance encounter at a friend's gathering turned into a conversation that lasted hours. We knew something magical had begun.",
    image: couple1,
  },
  {
    date: "February 2022",
    title: "First Trip Together",
    desc: "Our first adventure to the mountains — where we discovered that together, every path leads to something beautiful.",
    image: couple2,
  },
  {
    date: "August 2025",
    title: "The Proposal",
    desc: "Under a canopy of stars, with a heart full of love, the question was asked — and the answer was forever yes.",
    image: couple3,
  },
];

const TimelineItem = ({ event, index }: { event: typeof events[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${isEven ? "" : "md:flex-row-reverse"}`}>
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="overflow-hidden rounded-lg shadow-wedding">
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-64 md:h-80 object-cover"
            loading="lazy"
            width={600}
            height={400}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="font-body text-sm tracking-[0.2em] uppercase text-wedding-mauve mb-1">{event.date}</p>
        <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">{event.title}</h3>
        <p className="font-body text-base md:text-lg text-foreground/70 leading-relaxed">{event.desc}</p>
      </motion.div>
    </div>
  );
};

const StorySection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section className="py-20 md:py-32 px-4 bg-wedding-ivory">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={titleRef}
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-6 h-6 mx-auto mb-4 text-wedding-rose" />
          <h2 className="font-script text-5xl md:text-6xl text-gradient-gold">Our Love Story</h2>
          <p className="font-body text-lg text-foreground/60 mt-3 tracking-wider">
            A journey written in the stars
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {events.map((event, i) => (
            <TimelineItem key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
