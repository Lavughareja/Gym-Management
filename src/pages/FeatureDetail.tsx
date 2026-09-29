import React, { useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { featuresData } from '../data/featuresData';
import { Navbar, Footer } from './Home';

// ─────────────────────────────────────────────────────────────────────────────
// FeatureDetail — reads featureId from URL params
// ─────────────────────────────────────────────────────────────────────────────
import "./FeatureDetail.css";
export interface FeatureDetailProps {
  /** Optional fallback prop — if not provided, reads from useParams */
  featureId?: string;
  onBack?: () => void;
}
export const FeatureDetail: React.FC<FeatureDetailProps> = ({
  featureId: propFeatureId,
  onBack
}) => {
  const navigate = useNavigate();
  const params = useParams<{
    featureId: string;
  }>();
  const featureId = propFeatureId || params.featureId || '';
  const feature = featuresData[featureId];
  const handleBack = onBack || (() => navigate(-1));
  useEffect(() => {
    if (!feature) {
      handleBack();
    }
    window.scrollTo(0, 0);
  }, [feature]);
  if (!feature) return null;
  return <>
      <Navbar onLogin={() => navigate('/login')} />

      <section className="gc-hero feature-detail-inline-1">
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
              <p className="gc-hero-desc feature-detail-inline-2">
                {feature.longDesc || feature.desc}
              </p>

              <div className="gc-hero-btns">
                <button className="gc-hero-btn-main">
                  Start Free Trial <ArrowRight className="feature-detail-inline-3" />
                </button>
                <button className="gc-btn-ghost feature-detail-inline-4">
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
               <div className="feature-detail-inline-5">
                 <div className="feature-detail-inline-6">
                   <CheckCircle2 size={32} />
                 </div>
                 <h3 className="feature-detail-inline-7">
                   {feature.title} Module
                 </h3>
                 <p className="feature-detail-inline-8">
                   Manage everything seamlessly within the Trainix dashboard. No more spreadsheets.
                 </p>
                 <div className="feature-detail-inline-9">
                   <div className="feature-detail-inline-10"></div>
                   <div className="feature-detail-inline-11"></div>
                   <div className="feature-detail-inline-12"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>;
};
export default FeatureDetail;