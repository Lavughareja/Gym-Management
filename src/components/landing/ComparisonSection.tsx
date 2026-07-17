import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

const oldWay = [
  "Using Excel for everything",
  "Paper Attendance registers",
  "Manual Billing and follow-ups",
  "No insights or reports",
  "No member tracking",
];

const newWay = [
  "Everything fully automated",
  "Real-time Reports & Analytics",
  "Cloud Based & highly secure",
  "Fast, lightning performance",
  "Professional member experience",
];

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Stop doing it the hard way.
          </h2>
          <p className="text-lg text-gray-400">
            See why modern gym owners are switching from spreadsheets to Trainix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* Old Way Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#14151a] border border-gray-800 rounded-3xl p-8 lg:p-12"
          >
            <div className="text-red-500 font-semibold tracking-wider uppercase mb-8 text-sm">The Old Way</div>
            <ul className="space-y-6">
              {oldWay.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-gray-400">
                  <XCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* New Way Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-b from-primary/20 to-[#14151a] border border-primary/30 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            {/* Glow effect inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

            <div className="text-primary font-semibold tracking-wider uppercase mb-8 text-sm relative z-10">Using Trainix</div>
            <ul className="space-y-6 relative z-10">
              {newWay.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-white">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
