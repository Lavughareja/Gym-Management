import React from 'react';
import { CalendarDays, TrendingUp } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

export const StepsSection: React.FC = () => {
  return (
    <>
      {/* 3 Simple Steps Section */}
      <section className="steps-section">
        <div className="steps-content">
          <div className="section-eyebrow">HOW IT WORKS</div>
          <h2 className="section-title">
            Launch your dashboard<br/><span className="text-primary-gradient">in 3 simple steps</span>
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 32px 0' }}>Get your fitness center online and organized in minutes.</p>

          <div className="step-item premium-hover-card" style={{ padding: '16px', borderRadius: '12px' }}>
            <div className="step-number">1</div>
            <div>
              <h4>Create Your Space</h4>
              <p>Register as a Gym Owner and set up your initial profile securely.</p>
            </div>
          </div>
          <div className="step-item premium-hover-card" style={{ padding: '16px', borderRadius: '12px' }}>
            <div className="step-number">2</div>
            <div>
              <h4>Add Plans & Staff</h4>
              <p>Define your membership packages and invite your managers and trainers.</p>
            </div>
          </div>
          <div className="step-item premium-hover-card" style={{ padding: '16px', borderRadius: '12px' }}>
            <div className="step-number">3</div>
            <div>
              <h4>Manage Members</h4>
              <p>Start registering members, assigning plans, and tracking attendance.</p>
            </div>
          </div>

          <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: 32 }}>
            <button className="btn-primary-large premium-hover-card" style={{ padding: '12px 24px', fontSize: '1rem', border: 'none' }}>
              Start Free Trial &rarr;
            </button>
          </div>
        </div>
        
        <div className="steps-image-container">
          <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.02} transitionSpeed={2500} className="steps-dashboard-mockup premium-hover-card">
            <div className="floating-card top-left">
              <div className="bell-icon"><CalendarDays size={14}/></div>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>Stay Organized</div>
                <div style={{ fontSize: '0.6rem', color: '#6b7280' }}>Easily monitor daily check-ins and member status...</div>
              </div>
            </div>
            <div className="floating-card top-right">
              <TrendingUp size={14} color="#10b981"/> 
              <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>Peak Analytics</div>
            </div>
            <div className="floating-card bottom-right" style={{ padding: '16px' }}>
              <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Total Members</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>845 <span style={{ color: '#10b981', fontSize: '0.7rem' }}>+12%</span></div>
            </div>
            
            <div className="internal-mockup">
              <div className="m-header"></div>
              <div className="m-body">
                <div className="m-chart"></div>
                <div className="m-donut"></div>
              </div>
              <div className="m-list"></div>
            </div>
          </Tilt>
        </div>
      </section>
    </>
  );
};
