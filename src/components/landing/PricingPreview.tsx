import React from 'react';
import { Check } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

export const PricingPreview: React.FC = () => {
  return (
    <>
      {/* Pricing Section (Preview) */}
      <section className="pricing-preview-section">
        <div className="section-eyebrow text-center">PRICING</div>
        <h2 className="section-title text-center">
          Simple, transparent <span className="text-primary-gradient">pricing.</span>
        </h2>
        <p className="section-subtitle text-center">Start free. Upgrade when you're ready. No hidden fees.</p>

        <div className="pricing-cards-grid">
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02} transitionSpeed={2000} className="pricing-card premium-hover-card">
            <h4>Starter</h4>
            <p>Perfect for small gyms</p>
            <div className="price-tag">
              <span className="currency">$</span><span className="amount">29</span><span className="period">/ month</span>
            </div>
            <button className="btn-outline-large" style={{ zIndex: 2, position: 'relative' }}>Start Free Trial &rarr;</button>
            <div className="features-list">
              <div className="fl-header">WHAT'S INCLUDED</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Up to 100 members</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> 2 staff accounts</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Member Management</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Subscription Tracking</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Basic Dashboard</div>
            </div>
          </Tilt>

          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.05} transitionSpeed={2000} className="pricing-card popular premium-hover-card">
            <div className="popular-badge">★ Most Popular</div>
            <h4>Growth</h4>
            <p>For growing fitness centers</p>
            <div className="price-tag">
              <span className="currency">$</span><span className="amount">79</span><span className="period">/ month</span>
            </div>
            <button className="btn-primary-large" style={{width: '100%', justifyContent: 'center', zIndex: 2, position: 'relative'}}>Start Free Trial &rarr;</button>
            <div className="features-list">
              <div className="fl-header">WHAT'S INCLUDED</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Up to 500 members</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> 10 staff accounts</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Role-Based Access</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Member Portal</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Advanced Analytics</div>
            </div>
          </Tilt>

          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02} transitionSpeed={2000} className="pricing-card premium-hover-card">
            <h4>Pro</h4>
            <p>For established gyms</p>
            <div className="price-tag">
              <span className="currency">$</span><span className="amount">149</span><span className="period">/ month</span>
            </div>
            <button className="btn-outline-large" style={{ zIndex: 2, position: 'relative' }}>Start Free Trial &rarr;</button>
            <div className="features-list">
              <div className="fl-header">WHAT'S INCLUDED</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Unlimited members</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Unlimited staff accounts</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Super Admin Controls</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Multi-Gym Support</div>
              <div className="fl-item"><Check size={16} color="#10b981"/> Priority Support</div>
            </div>
          </Tilt>
        </div>
      </section>
    </>
  );
};
