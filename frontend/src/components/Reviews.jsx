import React from 'react';
import { motion } from 'framer-motion';

// Inline star to avoid icon version issues
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#967D6A" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const reviews = [
  {
    id: 1,
    name: "Aisha Raza",
    handle: "@aisharaza_",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    product: "Oud Royale",
    text: "Absolutely mesmerising. Oud Royale is unlike anything I've worn before — it lingers all day and I get compliments everywhere I go.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    handle: "@rahulmehta.life",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 4,
    product: "Amber Noir",
    text: "GuleAsr has completely changed how I feel about fragrance. Amber Noir is deep, mysterious, and incredibly long-lasting.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    handle: "@priya.scents",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    rating: 4,
    product: "Midnight Rose",
    text: "The Midnight Rose oil is divine. Alcohol-free, gentle, and absolutely enchanting. I wear it every single day.",
  },
  {
    id: 4,
    name: "Zara Hussain",
    handle: "@zarahussain__",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    product: "Desert Gold",
    text: "Desert Gold is warm, golden, and absolutely luxurious. The packaging is stunning too. 10/10 would recommend.",
  },
  {
    id: 5,
    name: "Kabir Nawaz",
    handle: "@kabirnawaz_official",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    rating: 3,
    product: "Oud Royale",
    text: "Premium quality at a fair price. You can feel the craftsmanship in every spritz. This is my signature scent now.",
  },
];

const Stars = ({ n }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: n }).map((_, i) => (
      <StarIcon key={i} />
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section className="py-12 md:py-28 bg-surface overflow-hidden">
      <div className="px-4 md:px-8 max-w-[1800px] mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="text-xs text-accent uppercase tracking-widest font-bold block mb-3">Real People, Real Fragrance</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary">
              WHAT THEY<br /><span className="text-secondary">SAY.</span>
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Scrolling Review Cards */}
      <div className="flex gap-6 px-4 md:px-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="vexo-card p-8 flex-shrink-0 w-[85vw] sm:w-[55vw] md:w-[40vw] lg:w-[28vw] snap-start flex flex-col bg-background"
          >
            <Stars n={r.rating} />
            <p className="text-primary text-base leading-relaxed flex-1 mb-6">"{r.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-secondary/15">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-primary text-sm">{r.name}</p>
                <p className="text-xs text-secondary">{r.handle} · Bought {r.product}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
