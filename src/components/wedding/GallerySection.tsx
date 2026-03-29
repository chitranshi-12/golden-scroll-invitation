import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import venue from "@/assets/venue.jpg";
import heroImg from "@/assets/wedding-hero.jpg";
import floralImg from "@/assets/floral-divider.png";

const photos = [
  { src: couple1, alt: "Couple portrait", span: "row-span-2" },
  { src: couple2, alt: "Walking together", span: "" },
  { src: venue, alt: "Venue", span: "" },
  { src: couple3, alt: "Dancing", span: "col-span-2" },
  { src: heroImg, alt: "Sunset", span: "" },
];

const GallerySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-20 md:py-32 px-4 gradient-wedding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-script text-5xl md:text-6xl text-gradient-gold">Moments Together</h2>
          <img src={floralImg} alt="" className="w-40 mx-auto mt-4 opacity-50" loading="lazy" width={160} height={68} />
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`overflow-hidden rounded-lg shadow-wedding ${photo.span}`}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <motion.img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                width={600}
                height={400}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
