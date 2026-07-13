import React from 'react';
import { Users, Receipt, CalendarDays, ShieldCheck, Check } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

export const SeoAbout: React.FC = () => {
  return (
    <>
      {/* SEO About Section */}
      <section className="seo-about-section">
        <div className="section-eyebrow text-center" style={{color: '#9ca3af', marginBottom: 16}}>ABOUT TRAINIX</div>
        <h2 className="seo-title text-center">
          The Modern Operating System<br/>for Fitness Centers
        </h2>
        <p className="seo-subtitle text-center">
          Trainix is a streamlined, intuitive gym management platform designed specifically for modern fitness studios, CrossFit boxes, and independent gym owners. We stripped away the confusing clutter of traditional software to focus on what actually matters—helping you manage your members, staff, and revenue efficiently.
        </p>

        <Tilt tiltMaxAngleX={1} tiltMaxAngleY={1} scale={1.01} transitionSpeed={2000} className="seo-card premium-hover-card">
          <h3>The Problem We Solve</h3>
          <p>Running a gym is challenging enough without outdated software adding to your headaches. Most owners still rely on scattered spreadsheets, paper registers, and clunky legacy systems to track their members and daily attendance. This leads to missed renewals, scheduling conflicts, and hours wasted on admin work.</p>
          <p>Trainix was built to solve this. We created a clean, modern platform that you and your staff can start using within minutes. Every feature—from role-based access to membership tracking—is thoughtfully designed to save you time and reduce manual errors.</p>
        </Tilt>

        <h3 className="seo-grid-title text-center">Core Capabilities</h3>
        
        <div className="seo-features-grid">
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02} transitionSpeed={2500} className="seo-feature premium-hover-card" style={{ padding: '24px', borderRadius: '12px' }}>
            <div className="sf-icon"><Users size={20}/></div>
            <div>
              <h4>Complete Member Management</h4>
              <p>Register members in seconds. Track their journey with detailed profiles, attendance history, and active subscriptions.</p>
            </div>
          </Tilt>
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02} transitionSpeed={2500} className="seo-feature premium-hover-card" style={{ padding: '24px', borderRadius: '12px' }}>
            <div className="sf-icon"><Receipt size={20}/></div>
            <div>
              <h4>Plan & Subscription Tracking</h4>
              <p>Create customized membership plans, monitor active subscriptions, and easily track your gym's revenue.</p>
            </div>
          </Tilt>
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02} transitionSpeed={2500} className="seo-feature premium-hover-card" style={{ padding: '24px', borderRadius: '12px' }}>
            <div className="sf-icon"><ShieldCheck size={20}/></div>
            <div>
              <h4>Role-Based Dashboards</h4>
              <p>Dedicated views and permissions for Owners, Managers, Trainers, and a self-serve Portal for Members.</p>
            </div>
          </Tilt>
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02} transitionSpeed={2500} className="seo-feature premium-hover-card" style={{ padding: '24px', borderRadius: '12px' }}>
            <div className="sf-icon"><CalendarDays size={20}/></div>
            <div>
              <h4>Attendance & Operations</h4>
              <p>Log daily check-ins, monitor peak hours, and get a clear overview of your gym's daily activity.</p>
            </div>
          </Tilt>
        </div>

        <div className="seo-card mt-32 premium-hover-card" style={{ transition: 'all 0.4s ease' }}>
          <h3>And Much More...</h3>
          <div className="seo-more-grid">
            <div className="seo-more-item"><Check size={14} color="#3b82f6"/> Super Admin Multi-Gym Control</div>
            <div className="seo-more-item"><Check size={14} color="#3b82f6"/> Manager & Trainer Accounts</div>
            <div className="seo-more-item"><Check size={14} color="#3b82f6"/> Member Self-Serve Portal</div>
            <div className="seo-more-item"><Check size={14} color="#3b82f6"/> Real-time Dashboard Analytics</div>
            <div className="seo-more-item"><Check size={14} color="#3b82f6"/> Secure Cloud Data Storage</div>
            <div className="seo-more-item"><Check size={14} color="#3b82f6"/> Easy Plan Configuration</div>
          </div>
          <p style={{marginTop: 24, fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.6}}>
            Join the forward-thinking gym owners who have switched to Trainix for a simpler way to manage their business. <strong>Start your free trial today—no complicated setup, just intuitive gym management that works.</strong>
          </p>
        </div>
      </section>
    </>
  );
};
