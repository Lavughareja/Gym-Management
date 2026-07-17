import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '20+', label: 'Gyms', icon: '🏋️' },
  { value: '10,000+', label: 'Members Managed', icon: '👥' },
  { value: '500+', label: 'Trainers Onboarded', icon: '🎯' },
  { value: '24/7', label: 'Support Available', icon: '🛡️' },
];

const logos = [
  'GoldsGym',
  'AnytimeFit',
  'CrossFit',
  'Equinox',
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

          {/* Logo row — matches 20+ gyms */}
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {logos.map((name) => (
              <div key={name} className="text-2xl font-bold tracking-tight">{name}</div>
            ))}
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
              <div className="text-3xl mb-2">{stat.icon}</div>
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
