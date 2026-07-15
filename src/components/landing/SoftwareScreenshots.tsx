import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const screens = [
  { id: 'owner', name: 'Owner Dashboard' },
  { id: 'manager', name: 'Manager Dashboard' },
  { id: 'trainer', name: 'Trainer Dashboard' },
  { id: 'member', name: 'Member Dashboard' },
  { id: 'attendance', name: 'Attendance Screen' },
  { id: 'payment', name: 'Payment Screen' },
  { id: 'reports', name: 'Reports & Analytics' },
  { id: 'device', name: 'Device Management' },
];

export const SoftwareScreenshots: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState(screens[0].id);

  return (
    <section id="screenshots" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark mb-6 tracking-tight">
            Designed for clarity. <br />
            Built for speed.
          </h2>
          <p className="text-lg text-gray-600">
            Every screen in GymCore is meticulously designed to give you exactly what you need, exactly when you need it.
          </p>
        </div>

        {/* Screen Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {screens.map(screen => (
            <button
              key={screen.id}
              onClick={() => setActiveScreen(screen.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeScreen === screen.id
                  ? 'bg-dark text-white shadow-lg'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {screen.name}
            </button>
          ))}
        </div>

        {/* Laptop Mockup with Dark Screen */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Outer Laptop Frame */}
          <div className="bg-gray-900 p-3 sm:p-4 rounded-t-3xl rounded-b-lg border-x-4 border-t-4 border-gray-800 shadow-2xl relative z-10 aspect-[16/10] overflow-hidden">
            {/* The Screen (Dark Theme) */}
            <div className="bg-[#09090b] w-full h-full rounded border border-gray-800 relative overflow-hidden flex flex-col">
              {/* Top Bar Fake UI */}
              <div className="h-12 border-b border-gray-800 flex items-center justify-between px-6 bg-[#09090b]/80 backdrop-blur-sm z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                </div>
                <div className="w-48 h-6 bg-gray-800 rounded-md"></div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                </div>
              </div>

              {/* Dynamic Content area */}
              <div className="flex-1 p-6 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-6 flex flex-col gap-6"
                  >
                    {/* Placeholder for complex dashboard UI, since we can't use real images yet */}
                    <div className="flex items-center justify-between">
                      <div className="h-8 bg-gray-800 rounded w-1/4"></div>
                      <div className="h-8 bg-primary/20 text-primary px-4 rounded flex items-center text-xs font-bold uppercase tracking-widest">{screens.find(s => s.id === activeScreen)?.name} ACTIVE</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-gray-800/50 h-24 rounded-xl border border-gray-800/80 p-4 flex flex-col justify-between">
                          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                          <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>

                    <div className="flex-1 flex gap-6">
                      <div className="flex-[2] bg-gray-800/50 rounded-xl border border-gray-800/80 p-6">
                         <div className="h-4 bg-gray-700 rounded w-1/3 mb-6"></div>
                         <div className="w-full h-full flex items-end gap-2 pb-6">
                            {[40, 70, 45, 90, 65, 80, 55, 100, 75, 85].map((h, i) => (
                              <div key={i} className="flex-1 bg-gradient-to-t from-primary/80 to-primary/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                            ))}
                         </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-4">
                        <div className="flex-1 bg-gray-800/50 rounded-xl border border-gray-800/80 p-6"></div>
                        <div className="flex-1 bg-gray-800/50 rounded-xl border border-gray-800/80 p-6"></div>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Laptop Base */}
          <div className="w-[110%] -ml-[5%] h-4 sm:h-6 bg-gray-300 rounded-b-3xl shadow-2xl relative z-0 border-t border-gray-400">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-b-md"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
