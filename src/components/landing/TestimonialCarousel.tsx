import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Owner, Elevate Fitness Studio",
    image: "https://i.pravatar.cc/150?img=44",
    text: "Trainix completely transformed how we run our daily operations. The biometric integration alone saved us hours of manual work every week. It's the most polished software we've ever used.",
    rating: 5,
    type: "Fitness Studio"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Head Coach, Iron & Chalk CrossFit",
    image: "https://i.pravatar.cc/150?img=11",
    text: "Moving our 300+ members from spreadsheets to Trainix was seamless. The automated WhatsApp reminders for payments have reduced our outstanding dues by 80%. Highly recommended.",
    rating: 5,
    type: "CrossFit"
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Founder, Zen Flow Yoga",
    image: "https://i.pravatar.cc/150?img=5",
    text: "We needed something simple yet powerful for our boutique studio. Trainix's beautiful interface and member portal is exactly what our high-end clients expect.",
    rating: 5,
    type: "Yoga Studio"
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-dark text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Loved by gym owners everywhere.
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Buttons */}
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors z-20">
            <ChevronLeft size={24} />
          </button>

          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors z-20">
            <ChevronRight size={24} />
          </button>

          {/* Testimonial Card */}
          <div className="bg-[#14151a] border border-gray-800 rounded-3xl p-8 lg:p-14 relative">
            <Quote className="absolute top-8 left-8 text-gray-800" size={80} />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="flex items-center gap-1 mb-8 text-primary">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>

                <p className="text-xl lg:text-3xl font-medium leading-relaxed mb-10 text-gray-200">
                  "{testimonials[current].text}"
                </p>

                <div className="flex flex-col items-center">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-primary/50"
                  />
                  <h4 className="font-bold text-lg">{testimonials[current].name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{testimonials[current].role}</p>
                  <span className="text-xs font-bold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {testimonials[current].type}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all ${current === idx ? 'w-8 bg-primary' : 'w-2 bg-gray-800 hover:bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
