import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    desc: 'For small gyms just getting started.',
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: ['Up to 100 Members', 'Basic Reports', 'Email Support', '1 Branch', '1 Admin'],
  },
  {
    name: 'Plus',
    desc: 'Perfect for growing fitness centers.',
    monthlyPrice: 79,
    yearlyPrice: 69,
    features: ['Up to 500 Members', 'Advanced Analytics', 'Priority Support', '2 Branches', '5 Staff Members'],
  },
  {
    name: 'Professional',
    desc: 'Everything you need to scale rapidly.',
    monthlyPrice: 149,
    yearlyPrice: 129,
    isPopular: true,
    features: ['Unlimited Members', 'Biometric Integration', 'WhatsApp Automation', '5 Branches', 'Unlimited Staff'],
  },
  {
    name: 'Enterprise',
    desc: 'For large franchises and networks.',
    monthlyPrice: 299,
    yearlyPrice: 249,
    features: ['Unlimited Everything', 'Custom Development', 'Dedicated Account Manager', 'White-label App', 'API Access'],
  }
];

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark mb-6 tracking-tight">
            Simple, transparent pricing.
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            No hidden fees. No surprise charges. Upgrade, downgrade, or cancel anytime.
          </p>
          
          {/* Toggle */}
          <div className="inline-flex items-center gap-4 bg-gray-100 p-1.5 rounded-full">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${!isYearly ? 'bg-white shadow-sm text-dark' : 'text-gray-500 hover:text-dark'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${isYearly ? 'bg-white shadow-sm text-dark' : 'text-gray-500 hover:text-dark'}`}
            >
              Yearly <span className="ml-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 transition-all duration-300 ${
                plan.isPopular 
                  ? 'border-2 border-primary shadow-2xl shadow-primary/10 scale-100 lg:scale-105 z-10' 
                  : 'border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 z-0'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-dark mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-500 h-10 mb-6">{plan.desc}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-dark">${isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                <span className="text-gray-500">/mo</span>
                {isYearly && (
                  <p className="text-xs text-success mt-1">Billed annually at ${plan.yearlyPrice * 12}</p>
                )}
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check size={18} className="text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.isPopular 
                    ? 'bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30' 
                    : 'bg-dark text-white hover:bg-gray-800'
                }`}
              >
                Start Free Trial
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
