import React from 'react';
import { ArrowRight, Calendar, Check, Smartphone, Users, MessageSquare, Receipt, ScanLine, Users2, ShieldCheck, ActivitySquare, CalendarDays, UserPlus, Salad, CreditCard, Sparkles, Dumbbell, TrendingUp, Flame, X } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <>
      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="cta-banner">
          <div className="cta-lightning"><Flame size={16}/> READY WHEN YOU ARE</div>
          <h2 className="cta-title">Ready to transform your gym?</h2>
          <p className="cta-subtitle">Join 1,000+ gym owners who've made the switch.</p>
          
          <div className="hero-actions" style={{ marginBottom: '24px' }}>
            <button className="btn-primary-large" style={{ background: 'white', color: '#3b82f6' }}>
              Start Your Free Trial &rarr;
            </button>
            <button className="btn-secondary-large" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              Book a Demo
            </button>
          </div>
          
          <div className="cta-features">
            <span><Check size={14}/> No credit card required</span>
            <span><Check size={14}/> Setup in 5 minutes</span>
            <span><Check size={14}/> Cancel anytime</span>
          </div>
        </div>
      </section>
    </>
  );
};
