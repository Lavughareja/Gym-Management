import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

export const LargeDashboardFeature: React.FC = () => {
  return (
    <>
      {/* Dashboard Feature Section */}
      <section className="dashboard-feature-section">
        <div className="section-eyebrow text-center">BUILT FOR OWNERS</div>
        <h2 className="section-title text-center">
          Beautifully designed. <span className="text-primary-gradient">Incredibly powerful.</span>
        </h2>
        <p className="section-subtitle text-center">Every active member, recent check-in, and revenue metric — at a glance. Built so an owner<br/>can monitor their business from anywhere.</p>
        
        <Tilt tiltMaxAngleX={1} tiltMaxAngleY={1} scale={1.01} transitionSpeed={2000} className="large-dashboard-showcase premium-hover-card">
          <div className="ld-header">
            <div className="ld-dots"><span></span><span></span><span></span></div>
            <div className="ld-url">app.trainix.com/dashboard</div>
          </div>
          <div className="ld-body">
            {/* Top Cards Row */}
            <div className="ld-cards">
              <div className="ld-card">
                <div className="ld-card-title">ACTIVE MEMBERS</div>
                <div className="ld-card-val">1,247 <span className="text-primary">+12.4%</span></div>
                <div className="ld-sparkline"></div>
              </div>
              <div className="ld-card">
                <div className="ld-card-title">ACTIVE TODAY</div>
                <div className="ld-card-val">324 <span className="text-primary">76% peak</span></div>
                <div className="ld-sparkline"></div>
              </div>
              <div className="ld-card">
                <div className="ld-card-title">REVENUE</div>
                <div className="ld-card-val">$84.2K <span className="text-primary">+18.2%</span></div>
                <div className="ld-sparkline"></div>
              </div>
              <div className="ld-card">
                <div className="ld-card-title">RETENTION</div>
                <div className="ld-card-val">97.9% <span className="text-primary">+0.4%</span></div>
                <div className="ld-sparkline" style={{borderBottomColor: '#10b981'}}></div>
              </div>
            </div>
            
            {/* Main Area */}
            <div className="ld-main">
              <div className="ld-chart-box">
                <div className="ld-box-header">Recent Check-ins</div>
                <div className="ld-big-chart"></div>
              </div>
              <div className="ld-mix-box">
                <div className="ld-box-header">Member Roles Mix</div>
                <div className="ld-donut-chart"></div>
              </div>
            </div>
          </div>
          
          {/* Floating UI Elements */}
          <div className="floating-ui-element left-float">
            <Sparkles size={16}/> <strong>24 new signups</strong><br/><span style={{fontSize: '0.7rem', color: '#6b7280'}}>This week</span>
          </div>
          <div className="floating-ui-element right-float">
            <TrendingUp size={16}/> <strong>Peak hours 6-8 PM</strong><br/><span style={{fontSize: '0.7rem', color: '#6b7280'}}>Based on QR scans</span>
          </div>
        </Tilt>
      </section>
    </>
  );
};
