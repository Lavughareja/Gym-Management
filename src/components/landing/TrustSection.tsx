import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Gyms' },
  { value: '50,000+', label: 'Members Managed' },
  { value: '99.99%', label: 'Uptime' },
  { value: '20+', label: 'Countries' },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-20 bg-dark text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-dark to-dark"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-8">
            Trusted by industry leaders worldwide
          </p>
          
          {/* Logo Carousel Placeholder */}
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text placeholders instead of images for now */}
            <div className="text-2xl font-bold tracking-tight">FitnessFirst</div>
            <div className="text-2xl font-bold tracking-tight">GoldsGym</div>
            <div className="text-2xl font-bold tracking-tight">AnytimeFit</div>
            <div className="text-2xl font-bold tracking-tight">CrossFit</div>
            <div className="text-2xl font-bold tracking-tight">Equinox</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-800">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
