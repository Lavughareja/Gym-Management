import React from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-dark to-dark pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
              Ready to scale your gym?
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-md">
              Book a free 30-minute personalized demo with our fitness tech experts. See how Trainix can transform your business.
            </p>

            <div className="space-y-6">
              {[
                "Customized walkthrough of the platform",
                "Pricing discussion based on your needs",
                "Data migration strategy from your current system",
                "No commitment required"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-gray-300">
                  <CheckCircle2 className="text-primary shrink-0" size={24} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-dark mb-8">Book your free demo</h3>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gym Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Iron Fitness" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>India</option>
                    <option>Australia</option>
                    <option>Canada</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl py-4 font-bold text-lg flex items-center justify-center gap-2 mt-4 transition-all shadow-lg shadow-primary/25">
                Schedule Demo <Send size={20} />
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                By submitting, you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
