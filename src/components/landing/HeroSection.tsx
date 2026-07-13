import React from 'react';
import { ArrowRight, Calendar, Check, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-badge"
        >
          <span className="badge-new">NEW</span> Trainix is now available globally &rarr;
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hero-title"
        >
          The complete <span className="hero-gradient-text">operating</span> system<br />
          for modern Gyms & Studios.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-subtitle"
        >
          From boutique studios to franchise networks — manage members, billing, attendance,<br />
          and staff all in one intuitive platform.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hero-actions"
        >
          <button className="btn-primary-large premium-hover-card" style={{ border: 'none' }}>
            Start Free Trial <ArrowRight size={18} />
          </button>
          <button className="btn-secondary-large premium-hover-card" style={{ border: 'none' }}>
            <Calendar size={18} /> Book a Free Demo &rarr;
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="hero-features-list"
        >
          <span><Check size={16} className="text-primary" /> No Credit Card</span>
          <span><Check size={16} className="text-primary" /> 7-Day Free Trial</span>
          <span><Check size={16} className="text-primary" /> Cancel Anytime</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="hero-trust-badges"
        >
          <div className="trust-badge premium-hover-card">
            <div className="trust-avatars">
              <div className="avatar avatar-1"></div>
              <div className="avatar avatar-2"></div>
              <div className="avatar avatar-3"></div>
              <div className="avatar avatar-4"></div>
            </div>
            <div className="trust-name" style={{ marginLeft: 8 }}>
              <strong>1,000+ gyms</strong> <span className="text-muted" style={{ fontWeight: 400 }}>trust us daily</span>
            </div>
          </div>
          
          <div className="trust-badge badge-simple premium-hover-card">
            <Smartphone size={18} /> Member portal included
          </div>
        </motion.div>
      </section>
    </>
  );
};
