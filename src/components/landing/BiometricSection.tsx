import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, ScanFace, QrCode, CreditCard, Cloud, Server, FileBarChart } from 'lucide-react';

export const BiometricSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-dark mb-6 tracking-tight">
          Seamless Biometric Sync.
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-20">
          Connect your fingerprint scanners, facial recognition devices, or RFID readers directly to Trainix. Live attendance syncing with zero manual work.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 relative">

          {/* Animated Line connecting them on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-primary/50 to-gray-200 -z-10 translate-y-[-50%]">
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-1/4 h-full bg-primary blur-sm"
            />
          </div>

          {/* Devices Node */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-4 w-full max-w-xs relative z-10">
            <div className="text-dark font-bold text-lg mb-2">Biometric Devices</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center"><Fingerprint size={24} /></div>
                <span className="text-xs font-medium">Fingerprint</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center"><ScanFace size={24} /></div>
                <span className="text-xs font-medium">Face ID</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center"><QrCode size={24} /></div>
                <span className="text-xs font-medium">QR Scanner</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center"><CreditCard size={24} /></div>
                <span className="text-xs font-medium">RFID Card</span>
              </div>
            </div>
          </div>

          {/* Cloud Node */}
          <div className="w-24 h-24 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-primary relative z-10">
            <Cloud size={40} />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-primary/20"
            />
          </div>

          {/* Trainix Node */}
          <div className="w-32 h-32 rounded-3xl bg-dark shadow-2xl flex flex-col items-center justify-center text-white relative z-10">
            <Server size={32} className="mb-2" />
            <span className="font-bold text-sm tracking-widest">GYMCORE</span>
          </div>

          {/* Reports Node */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-4 w-full max-w-xs relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-2">
              <FileBarChart size={32} />
            </div>
            <div className="text-dark font-bold text-lg">Real-Time Reports</div>
            <p className="text-sm text-gray-500 text-center">
              Instant attendance updates, member alerts, and analytics.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
