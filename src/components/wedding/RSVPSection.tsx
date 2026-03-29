import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Send } from "lucide-react";
import floralImg from "@/assets/floral-divider.png";

const RSVPSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", guests: "1", attending: "yes", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-32 px-4 bg-wedding-ivory relative overflow-hidden">
      <div className="max-w-lg mx-auto relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Heart className="w-6 h-6 mx-auto mb-4 text-wedding-rose" />
          <h2 className="font-script text-5xl md:text-6xl text-gradient-gold">Kindly RSVP</h2>
          <p className="font-body text-lg text-foreground/60 mt-3">We would be honored by your presence</p>
          <img src={floralImg} alt="" className="w-32 mx-auto mt-4 opacity-40" loading="lazy" width={128} height={55} />
        </motion.div>

        {submitted ? (
          <motion.div
            className="text-center py-12 bg-card/80 rounded-2xl shadow-wedding border border-border/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="w-12 h-12 mx-auto text-wedding-rose fill-wedding-rose" />
            </motion.div>
            <p className="font-script text-3xl text-wedding-gold mt-4">Thank You!</p>
            <p className="font-body text-foreground/70 mt-2">We can't wait to celebrate with you</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-wedding p-6 md:p-8 space-y-5 border border-border/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { label: "Your Name", name: "name", type: "text", placeholder: "Full Name" },
              { label: "Email", name: "email", type: "email", placeholder: "your@email.com" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-display text-sm tracking-wider text-foreground/80 mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  value={form[field.name as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-display text-sm tracking-wider text-foreground/80 mb-1.5">Attending?</label>
                <select
                  value={form.attending}
                  onChange={(e) => setForm({ ...form, attending: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  <option value="yes">Joyfully Accept</option>
                  <option value="no">Regretfully Decline</option>
                </select>
              </div>
              <div>
                <label className="block font-display text-sm tracking-wider text-foreground/80 mb-1.5">Guests</label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-display text-sm tracking-wider text-foreground/80 mb-1.5">Message for the Couple</label>
              <textarea
                rows={3}
                placeholder="Your warm wishes..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full py-3 rounded-full font-display text-sm tracking-wider uppercase gradient-gold text-accent-foreground shadow-wedding glow-gold flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              Send RSVP
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;
