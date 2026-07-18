import React, { useEffect, useState } from 'react';
import { Navbar, Footer } from './Home';
import { Play, ArrowRight, Monitor, Smartphone, Maximize2, ShieldCheck, Activity, Search } from 'lucide-react';
import './PlatformScreenshots.css';

const TABS = ['All', 'Dashboard', 'Member App', 'Billing', 'Trainers', 'Reports'];

const SCREENSHOTS = [
  { id: 1, title: 'Super Admin Dashboard', category: 'Dashboard', desc: 'Overview of all your gym branches and total revenue.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Member Profile View', category: 'Member App', desc: 'Detailed view of a member\'s attendance and workout history.', img: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Automated Billing & Invoices', category: 'Billing', desc: 'Track pending payments and send reminders instantly.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Trainer Assignment', category: 'Trainers', desc: 'Assign PTs to members and track their session counts.', img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Revenue Analytics', category: 'Reports', desc: 'Deep dive into your financial growth with beautiful charts.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Mobile App Interface', category: 'Member App', desc: 'The mobile view where members can check in via QR code.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80' },
];

export const PlatformScreenshots: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [filtered, setFiltered] = useState(SCREENSHOTS);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeTab === 'All') {
      setFiltered(SCREENSHOTS);
    } else {
      setFiltered(SCREENSHOTS.filter(s => s.category === activeTab));
    }
  }, [activeTab]);

  return (
    <div className="ps-page">
      <Navbar onLogin={() => { window.location.href = '/login'; }} />

      {/* Hero Section */}
      <section className="ps-hero">
        <div className="ps-hero-bg"></div>
        <div className="ps-hero-particles"></div>
        <div className="gc-container ps-hero-content">
          <div className="ps-badge">
            <Monitor className="ps-badge-icon" /> 
            <span>Inside Trainix</span>
          </div>
          <h1 className="ps-title">See the Platform in Action</h1>
          <p className="ps-subtitle">
            Take a visual tour of the most advanced gym management software. Designed to be intuitive, lightning-fast, and beautiful on every device.
          </p>
          <div className="ps-hero-actions">
            <button className="ps-btn ps-btn-primary">
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button className="ps-btn ps-btn-outline" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
              <Play size={18} /> View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Stats/Showcase Banner */}
      <section className="ps-stats">
        <div className="gc-container">
          <div className="ps-stats-grid">
            <div className="ps-stat-card">
              <Activity className="ps-stat-icon" />
              <div>
                <h4>Real-time Sync</h4>
                <p>Changes reflect instantly across all screens.</p>
              </div>
            </div>
            <div className="ps-stat-card">
              <Smartphone className="ps-stat-icon" />
              <div>
                <h4>Mobile Optimized</h4>
                <p>Manage your gym flawlessly from your phone.</p>
              </div>
            </div>
            <div className="ps-stat-card">
              <ShieldCheck className="ps-stat-icon" />
              <div>
                <h4>Bank-level Security</h4>
                <p>Your data is encrypted and safely backed up.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="ps-gallery-section" id="gallery">
        <div className="gc-container">
          <div className="ps-gallery-header">
            <h2>Explore the Interfaces</h2>
            <div className="ps-tabs">
              {TABS.map(tab => (
                <button 
                  key={tab} 
                  className={`ps-tab ${activeTab === tab ? 'ps-tab-active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="ps-gallery-grid">
            {filtered.map(shot => (
              <div className="ps-gallery-item" key={shot.id} onClick={() => setSelectedImg(shot.img)}>
                <div className="ps-gallery-img-wrap">
                  <img src={shot.img} alt={shot.title} className="ps-gallery-img" />
                  <div className="ps-gallery-overlay">
                    <Maximize2 className="ps-overlay-icon" />
                  </div>
                </div>
                <div className="ps-gallery-info">
                  <span className="ps-gallery-cat">{shot.category}</span>
                  <h3 className="ps-gallery-title">{shot.title}</h3>
                  <p className="ps-gallery-desc">{shot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImg && (
        <div className="ps-lightbox" onClick={() => setSelectedImg(null)}>
          <div className="ps-lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="ps-lightbox-close" onClick={() => setSelectedImg(null)}>×</button>
            <img src={selectedImg} alt="Enlarged screenshot" />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="ps-cta">
        <div className="gc-container">
          <div className="ps-cta-inner">
            <div className="ps-cta-content">
              <h2>Ready to see it with your own data?</h2>
              <p>Book a personalized demo and let our experts show you how Trainix can transform your gym operations.</p>
            </div>
            <div className="ps-cta-actions">
              <button className="ps-btn ps-btn-white">Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlatformScreenshots;
