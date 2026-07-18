import React, { useEffect } from 'react';
import { Navbar, Footer } from './Home';
import { Star, Play, Quote, TrendingUp, Users, ShieldCheck, Heart } from 'lucide-react';
import './PlatformTestimonials.css';

const LOGOS = ['GoldsGym', 'AnytimeFit', 'CrossFit', 'Equinox', 'F45', 'Barry\'s', 'SnapFitness', 'Crunch'];

const TESTIMONIALS = [
  { id: 1, name: 'Sarah Jenkins', role: 'Owner, Elevate Studio', img: 'https://i.pravatar.cc/150?img=44', rating: 5, text: 'Trainix completely transformed how we run our daily operations. The biometric integration alone saved us hours of manual work every week. Our revenue increased by 30% in the first quarter.', type: 'Fitness Studio' },
  { id: 2, name: 'Marcus Rodriguez', role: 'Head Coach, Iron & Chalk', img: 'https://i.pravatar.cc/150?img=11', rating: 5, text: 'Moving our 300+ members from spreadsheets to Trainix was seamless. The automated WhatsApp reminders for payments have reduced our outstanding dues by 80%. Highly recommended for any serious gym owner.', type: 'CrossFit' },
  { id: 3, name: 'Elena Rostova', role: 'Founder, Zen Flow', img: 'https://i.pravatar.cc/150?img=5', rating: 5, text: 'We needed something simple yet powerful for our boutique studio. Trainix\'s beautiful interface and member portal is exactly what our high-end clients expect. The analytics dashboard is a game changer.', type: 'Yoga Studio' },
  { id: 4, name: 'David Chen', role: 'Manager, Peak Performance', img: 'https://i.pravatar.cc/150?img=33', rating: 4, text: 'The trainer management module makes commission calculations so easy. Before Trainix, it was a nightmare. Now, payouts are done in a click.', type: 'Commercial Gym' },
  { id: 5, name: 'Priya Sharma', role: 'Owner, FitLife', img: 'https://i.pravatar.cc/150?img=49', rating: 5, text: 'I love how easy it is to communicate with members via the broadcast feature. The mobile app experience is flawless, and support is incredibly responsive!', type: 'Gym Network' },
  { id: 6, name: 'James Wilson', role: 'Director, MuscleFactory', img: 'https://i.pravatar.cc/150?img=14', rating: 5, text: 'Managing 5 branches used to be chaotic. With Trainix, I get a consolidated view of all my businesses on one dashboard. I can finally sleep peacefully knowing everything is tracked.', type: 'Franchise' },
];

export const PlatformTestimonials: React.FC<{ onBack: () => void }> = ({ onBack }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ptest-page">
      <Navbar onLogin={() => { window.location.href = '/login'; }} />

      {/* Hero Section */}
      <section className="ptest-hero">
        <div className="ptest-hero-bg"></div>
        <div className="gc-container ptest-hero-inner">
          <div className="ptest-badge">
            <Heart className="ptest-badge-icon" fill="currentColor" /> Wall of Love
          </div>
          <h1 className="ptest-title">
            Trusted by the world's <br />
            <span className="ptest-gradient-text">fastest growing gyms</span>
          </h1>
          <p className="ptest-subtitle">
            Don't just take our word for it. Hear from thousands of gym owners, managers, and personal trainers who use Trainix to scale their businesses.
          </p>
          
          <div className="ptest-hero-stats">
            <div className="ptest-hstat">
              <span className="ptest-hstat-val">10,000+</span>
              <span className="ptest-hstat-lbl">Active Gyms</span>
            </div>
            <div className="ptest-hstat-divider"></div>
            <div className="ptest-hstat">
              <span className="ptest-hstat-val">4.9/5</span>
              <span className="ptest-hstat-lbl">Average Rating</span>
            </div>
            <div className="ptest-hstat-divider"></div>
            <div className="ptest-hstat">
              <span className="ptest-hstat-val">2.5M+</span>
              <span className="ptest-hstat-lbl">Members Managed</span>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="ptest-marquee-wrap">
          <div className="ptest-marquee">
            {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} className="ptest-marquee-item">{logo}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video Testimonial */}
      <section className="ptest-featured">
        <div className="gc-container">
          <div className="ptest-video-card">
            <div className="ptest-video-visual">
              <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80" alt="Featured Testimonial" />
              <div className="ptest-video-play">
                <Play size={32} fill="currentColor" />
              </div>
            </div>
            <div className="ptest-video-content">
              <Quote size={40} className="ptest-quote-icon" />
              <h3>"Trainix didn't just save us time; it actively helped us increase our member retention by 40% in just six months."</h3>
              <div className="ptest-video-author">
                <img src="https://i.pravatar.cc/150?img=68" alt="Author" />
                <div>
                  <h4>Michael Chang</h4>
                  <p>Co-Founder, Velocity Athletics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Wall of Love */}
      <section className="ptest-wall">
        <div className="gc-container">
          <div className="ptest-section-header">
            <h2>Read their stories</h2>
            <p>Real feedback from fitness professionals who made the switch.</p>
          </div>
          
          <div className="ptest-masonry">
            {TESTIMONIALS.map((t) => (
              <div className="ptest-card" key={t.id}>
                <div className="ptest-card-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="ptest-card-text">"{t.text}"</p>
                <div className="ptest-card-footer">
                  <img src={t.img} alt={t.name} className="ptest-card-avatar" />
                  <div className="ptest-card-author">
                    <div className="ptest-card-name">{t.name}</div>
                    <div className="ptest-card-role">{t.role}</div>
                  </div>
                </div>
                <div className="ptest-card-tag">{t.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="ptest-metrics">
        <div className="gc-container">
          <div className="ptest-metrics-grid">
            <div className="ptest-metric-card">
              <TrendingUp size={32} className="ptest-metric-icon" />
              <h3>+40% Revenue</h3>
              <p>Average revenue increase reported by gyms within their first year of using Trainix billing automations.</p>
            </div>
            <div className="ptest-metric-card">
              <Users size={32} className="ptest-metric-icon" />
              <h3>-25% Churn</h3>
              <p>Significant drop in member drop-offs thanks to automated engagement, challenges, and push alerts.</p>
            </div>
            <div className="ptest-metric-card">
              <ShieldCheck size={32} className="ptest-metric-icon" />
              <h3>100% Secure</h3>
              <p>Zero data breaches. We use bank-level AES-256 encryption ensuring gym and member data is always safe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ptest-cta">
        <div className="gc-container">
          <div className="ptest-cta-box">
            <h2>Join the thousands of successful gyms</h2>
            <p>Start your 14-day free trial today. No credit card required. Cancel anytime.</p>
            <div className="ptest-cta-actions">
              <button className="ptest-btn-primary">Start Free Trial</button>
              <button className="ptest-btn-outline">Talk to Sales</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
