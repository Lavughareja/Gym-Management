import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, CreditCard, Calendar, Video, Fingerprint, FileSpreadsheet, Cloud } from 'lucide-react';

const integrations = [
  { icon: MessageCircle, name: 'WhatsApp', desc: 'Automated messaging' },
  { icon: Mail, name: 'Email', desc: 'Campaigns & alerts' },
  { icon: CreditCard, name: 'Razorpay', desc: 'Indian payments' },
  { icon: CreditCard, name: 'Stripe', desc: 'Global payments' },
  { icon: Calendar, name: 'Google Calendar', desc: 'Sync schedules' },
  { icon: Video, name: 'Zoom', desc: 'Online classes' },
  { icon: Fingerprint, name: 'Biometrics', desc: 'Device integration' },
  { icon: FileSpreadsheet, name: 'CSV Import', desc: 'Easy migration' },
  { icon: Cloud, name: 'Cloud Backup', desc: 'AWS integration' },
];

export const IntegrationsGrid: React.FC = () => {
  return (
    <section id="integrations" className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark mb-6 tracking-tight">
            Plays well with others.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect Trainix with the tools you already use. Powerful integrations make managing your business seamless.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {integrations.map((int, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <int.icon size={28} className="text-gray-600 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-bold text-dark mb-1">{int.name}</h3>
              <p className="text-xs text-gray-500">{int.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
