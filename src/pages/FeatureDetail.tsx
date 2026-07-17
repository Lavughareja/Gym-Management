import React, { useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { featuresData } from '../data/featuresData';
import { Navbar, Footer } from './Home';

export interface FeatureDetailProps {
  featureId: string;
  onBack: () => void;
}

export const FeatureDetail: React.FC<FeatureDetailProps> = ({ featureId, onBack }) => {
  const feature = featuresData[featureId];

  useEffect(() => {
    if (!feature) {
      onBack();
    }
    window.scrollTo(0, 0);
  }, [feature, onBack]);

  if (!feature) return null;

  return (
    <>
      <Navbar onLogin={() => {}} />

      <section className="gc-hero" style={{ minHeight: '100vh', paddingTop: '180px', paddingBottom: '120px', display: 'flex', alignItems: 'center' }}>
        <div className="gc-hero-glow"></div>
        <div className="gc-container">

          <div className="gc-hero-inner">
            <div>
              <div className="gc-hero-badge">
                <span className="gc-hero-badge-dot"></span>
                Feature Spotlight
              </div>
              <h1 className="gc-hero-title">
                {feature.title}
              </h1>
              <p className="gc-hero-desc" style={{ marginBottom: '40px' }}>
                {feature.longDesc || feature.desc}
              </p>

              <div className="gc-hero-btns">
                <button className="gc-hero-btn-main">
                  Start Free Trial <ArrowRight style={{ width: 18, height: 18 }} />
                </button>
                <button className="gc-btn-ghost" style={{ padding: '12px 24px', border: '1px solid var(--gc-border)' }}>
                  View Pricing
                </button>
              </div>

              <div className="gc-hero-checks">
                <span className="gc-hero-check-item">
                  <CheckCircle2 size={18} color="var(--gc-success)" /> No credit card
                </span>
                <span className="gc-hero-check-item">
                  <CheckCircle2 size={18} color="var(--gc-success)" /> 14-day free trial
                </span>
                <span className="gc-hero-check-item">
                  <CheckCircle2 size={18} color="var(--gc-success)" /> Cancel anytime
                </span>
              </div>
            </div>

            {/* Right Visual */}
            <div className="gc-hero-visual">
               <div style={{
                  background: 'white',
                  borderRadius: '24px',
                  boxShadow: '0 24px 48px -12px rgba(17, 24, 39, 0.15)',
                  padding: '48px 32px',
                  border: '1px solid var(--gc-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
               }}>
                 <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'var(--gc-primary-light)',
                    color: 'var(--gc-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                 }}>
                   <CheckCircle2 size={32} />
                 </div>
                 <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gc-dark)', marginBottom: '12px' }}>
                   {feature.title} Module
                 </h3>
                 <p style={{ color: 'var(--gc-text-muted)', lineHeight: '1.6', marginBottom: '32px' }}>
                   Manage everything seamlessly within the Trainix dashboard. No more spreadsheets.
                 </p>
                 <div style={{ width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                   <div style={{ height: '12px', width: '100%', background: 'var(--gc-border)', borderRadius: '100px' }}></div>
                   <div style={{ height: '12px', width: '80%', background: 'var(--gc-border)', borderRadius: '100px', margin: '0 auto' }}></div>
                   <div style={{ height: '12px', width: '60%', background: 'var(--gc-border)', borderRadius: '100px', margin: '0 auto' }}></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FeatureDetail;
