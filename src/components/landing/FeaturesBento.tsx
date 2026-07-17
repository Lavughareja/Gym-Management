import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserCheck, CalendarCheck, Fingerprint, 
  CreditCard, FileText, Dumbbell, Salad, 
  Building2, LineChart, PieChart, MessageSquare, 
  Mail, QrCode, ClipboardList, Target, 
  Wallet, Banknote, Shield, Cloud, Smartphone
} from 'lucide-react';

const features = [
  { icon: Users, title: 'Member Management', desc: 'Complete profiles, history, and engagement tracking.' },
  { icon: UserCheck, title: 'Trainer Management', desc: 'Assign clients, track sessions, and calculate payouts.' },
  { icon: CalendarCheck, title: 'Attendance', desc: 'Real-time tracking of staff and member visits.' },
  { icon: Fingerprint, title: 'Biometric Integration', desc: 'Seamlessly sync with fingerprint and face scanners.' },
  { icon: CreditCard, title: 'Payment Tracking', desc: 'Monitor dues, collect payments, and send reminders.' },
  { icon: FileText, title: 'Invoices', desc: 'Automated billing and professional invoice generation.' },
  { icon: Dumbbell, title: 'Workout Plans', desc: 'Create and assign custom exercise routines.' },
  { icon: Salad, title: 'Diet Plans', desc: 'Nutrition tracking and customized meal plans.' },
  { icon: LineChart, title: 'Analytics', desc: 'Deep insights into revenue, growth, and retention.' },
  { icon: PieChart, title: 'Reports', desc: 'Exportable data on every aspect of your business.' },
  { icon: MessageSquare, title: 'WhatsApp Notifications', desc: 'Automated alerts for payments and birthdays.' },
  { icon: Mail, title: 'Email Notifications', desc: 'Newsletters and transactional email updates.' },
  { icon: QrCode, title: 'QR Check-in', desc: 'Contactless entry using mobile app QR codes.' },
  { icon: ClipboardList, title: 'Membership Plans', desc: 'Flexible packages, daily passes, and subscriptions.' },
  { icon: Target, title: 'Lead Management', desc: 'Track inquiries and convert prospects into members.' },
  { icon: Wallet, title: 'Expense Tracking', desc: 'Log daily expenses to calculate true profit.' },
  { icon: Banknote, title: 'Payroll', desc: 'Manage staff salaries and commission payouts.' },
  { icon: Shield, title: 'Role Permissions', desc: 'Granular access control for managers and trainers.' },
  { icon: Cloud, title: 'Cloud Backup', desc: 'Bank-level security with automated daily backups.' },
  { icon: Smartphone, title: 'Mobile Friendly', desc: 'Manage your gym on-the-go from any device.' },
];

export const FeaturesBento: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-6 tracking-tight">
            Everything you need. <br />
            <span className="text-gray-400">Nothing you don't.</span>
          </h2>
          <p className="text-lg text-gray-600">
            A comprehensive suite of tools designed specifically for fitness businesses. We handle the heavy lifting so you can focus on your members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[20px] shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center mb-6 transition-colors">
                <feat.icon size={24} className="text-gray-600 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">{feat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
