import React from 'react';
import { Users, Receipt, ShieldCheck, ActivitySquare, CalendarDays, Smartphone, Sparkles, X } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

export const FeaturesBento: React.FC = () => {
  return (
    <>
      {/* Features Grid Section */}
      <section className="features-grid-section">
        <div className="section-eyebrow text-center">ONE PLATFORM - EVERY WORKFLOW</div>
        <h2 className="section-title text-center">
          Everything you need to <span className="text-primary-gradient">run your gym</span>
        </h2>
        <p className="section-subtitle text-center">All features included. Tailored specifically for modern fitness businesses.</p>

        <div className="features-bento-grid">
          {[
            { icon: <ShieldCheck size={20}/>, title: 'Role-Based Access', desc: 'Dedicated dashboards for Owners, Managers, Trainers, and Members.' },
            { icon: <Users size={20}/>, title: 'Member Management', desc: 'Complete member profiles, history, and active subscriptions at a glance.' },
            { icon: <Receipt size={20}/>, title: 'Plans & Billing', desc: 'Create and manage custom membership plans and easily track revenue.' },
            { icon: <CalendarDays size={20}/>, title: 'Attendance Tracking', desc: 'Track daily check-ins and peak hours to optimize your gym operations.' },
            { icon: <ActivitySquare size={20}/>, title: 'Owner Analytics', desc: 'Revenue, retention, dues, attendance - all essential insights.' },
            { icon: <Smartphone size={20}/>, title: 'Member Portal', desc: 'Self-serve portal where members can view their plans and profile.' }
          ].map((f, i) => (
            <Tilt key={i} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} className="premium-hover-card feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </Tilt>
          ))}
        </div>

        <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} scale={1.01} transitionSpeed={2500} className="premium-hover-card feature-card-wide">
          <div className="feature-wide-content">
            <div className="feature-icon"><Sparkles size={24}/></div>
            <div>
              <div className="badge-new" style={{ display: 'inline-block', marginBottom: 8 }}>SUPER ADMIN CONTROL</div>
              <h4>Multi-Gym Management</h4>
              <p>Built with a Super Admin view to securely register new gym owners, manage active tenants, and oversee platform-wide operations.</p>
            </div>
          </div>
          <button className="btn-outline-small" style={{ pointerEvents: 'none' }}>Included natively &rarr;</button>
        </Tilt>
      </section>
    </>
  );
};
