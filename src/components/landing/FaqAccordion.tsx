import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "How long does it take to set up Trainix?",
    a: "Most gyms are fully set up within 24 hours. Our onboarding team will help you import your existing member data, set up your branches, and configure your biometric devices during your first onboarding call."
  },
  {
    q: "Can I import my existing members from Excel?",
    a: "Yes! We have a one-click CSV import tool. You can easily migrate all your members, their active plans, and billing history without losing any data."
  },
  {
    q: "Do you support biometric fingerprint scanners?",
    a: "Absolutely. Trainix integrates natively with most popular biometric devices (Fingerprint, Face Recognition, RFID). Attendance is synced to the cloud in real-time."
  },
  {
    q: "Can I manage multiple branches?",
    a: "Yes, our Plus, Professional, and Enterprise plans support multi-branch management. You can view consolidated reports or switch between branches with a single click."
  },
  {
    q: "How do automated WhatsApp notifications work?",
    a: "Trainix automatically sends WhatsApp messages for payment reminders, successful renewals, birthday greetings, and attendance alerts. You don't have to lift a finger."
  },
  {
    q: "Is my data secure in the cloud?",
    a: "We use bank-level AES-256 encryption. Your data is backed up daily across multiple secure AWS servers, ensuring 99.99% uptime and complete data safety."
  }
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Got questions? We've got answers. If you have some other questions, feel free to contact us.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-dark pr-8">{faq.q}</span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === idx ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
