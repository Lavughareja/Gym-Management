import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Book Demo', desc: 'Schedule a personalized walkthrough of the platform with our fitness tech experts.' },
  { num: '02', title: 'Create Gym', desc: 'Set up your branches, define membership plans, and configure your dashboard.' },
  { num: '03', title: 'Add Members', desc: 'Import your existing members via CSV or start adding them one by one.' },
  { num: '04', title: 'Manage Everything', desc: 'Sit back and watch your gym run efficiently on autopilot with GymCore.' },
];

export const StepsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark mb-6 tracking-tight">
            Get started in minutes.
          </h2>
          <p className="text-lg text-gray-600">
            Transitioning to GymCore is frictionless. We handle the heavy lifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-100 z-0"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 shadow-xl flex items-center justify-center mb-8 group-hover:border-primary group-hover:text-primary transition-colors text-2xl font-bold text-gray-300">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
