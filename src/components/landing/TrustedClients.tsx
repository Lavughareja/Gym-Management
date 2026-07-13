import React from 'react';
import { ArrowRight, Calendar, Check, Smartphone, Users, MessageSquare, Receipt, ScanLine, Users2, ShieldCheck, ActivitySquare, CalendarDays, UserPlus, Salad, CreditCard, Sparkles, Dumbbell, TrendingUp, Flame, X } from 'lucide-react';

export const TrustedClients: React.FC = () => {
  return (
    <>
      {/* Trusted Clients Section */}
      <section className="trusted-clients-section">
        <div className="trusted-header-container">
          <div className="trusted-header-left">
            <div className="section-eyebrow">OUR TRUSTED CLIENTS</div>
            <h2 className="section-title">
              <span className="text-primary-gradient">1,000+</span> studios run their day on Trainix.
            </h2>
          </div>
          <div className="trusted-stats">
            <div className="stat-block">
              <div className="stat-number">1,000+</div>
              <div className="stat-label">active studios</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-block">
              <div className="stat-number">4.8</div>
              <div className="stat-label">average rating</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-block">
              <div className="stat-number">2.4M+</div>
              <div className="stat-label">members managed</div>
            </div>
          </div>
        </div>
        
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Dummy Logos - duplicated for infinite scroll effect */}
            {[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8].map((num, i) => (
              <div key={i} className={`client-logo logo-style-${num}`}>
                {num === 1 && <span>IRON FIT</span>}
                {num === 2 && <span>VITALITY STUDIO</span>}
                {num === 3 && <span>APEX GYM</span>}
                {num === 4 && <span>CORE PILATES</span>}
                {num === 5 && <span>ZEN YOGA</span>}
                {num === 6 && <span>BEAST BOX</span>}
                {num === 7 && <span>FLEX NATION</span>}
                {num === 8 && <span>VELOCITY</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
