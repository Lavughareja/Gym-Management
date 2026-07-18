import React, { useEffect, useState } from 'react';
import { Navbar, Footer } from './Home';
import { ArrowRight, CheckCircle2, Cloud, Fingerprint, Calendar, MessageCircle, Video, CreditCard, Mail, Database, Globe } from 'lucide-react';
import './PlatformIntegrationsPage.css';

const INTEGRATIONS = [
  { id: 'whatsapp', name: 'WhatsApp', desc: 'Automate payment reminders, check-in alerts, and birthday wishes directly to members\' phones.', icon: <MessageCircle />, color: '#25D366', category: 'Communication' },
  { id: 'stripe', name: 'Stripe', desc: 'Accept international payments, set up recurring subscriptions, and handle refunds seamlessly.', icon: <CreditCard />, color: '#635BFF', category: 'Payments' },
  { id: 'razorpay', name: 'Razorpay', desc: 'Optimized for Indian businesses. Accept UPI, cards, and net banking with zero setup.', icon: <CreditCard />, color: '#0753FF', category: 'Payments' },
  { id: 'biometrics', name: 'Biometric Devices', desc: 'Connect essl, ZKTeco, and other fingerprint/face scanners for real-time attendance.', icon: <Fingerprint />, color: '#4F46E5', category: 'Hardware' },
  { id: 'zoom', name: 'Zoom', desc: 'Host live virtual fitness classes and automatically email join links to enrolled members.', icon: <Video />, color: '#2D8CFF', category: 'Classes' },
  { id: 'mailchimp', name: 'Mailchimp', desc: 'Sync your leads and members for powerful email marketing campaigns.', icon: <Mail />, color: '#FFE01B', category: 'Marketing' },
  { id: 'gcal', name: 'Google Calendar', desc: 'Two-way sync for PT sessions, classes, and gym events.', icon: <Calendar />, color: '#4285F4', category: 'Productivity' },
  { id: 'api', name: 'Custom REST API', desc: 'Build your own custom integrations or connect with your existing website.', icon: <Database />, color: '#10B981', category: 'Developers' },
];

const CATEGORIES = ['All', 'Payments', 'Communication', 'Hardware', 'Classes', 'Marketing'];

export const PlatformIntegrations: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeCat, setActiveCat] = useState('All');
  const [filtered, setFiltered] = useState(INTEGRATIONS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCat === 'All') {
      setFiltered(INTEGRATIONS);
    } else {
      setFiltered(INTEGRATIONS.filter(i => i.category === activeCat));
    }
  }, [activeCat]);

  return (
    <div className="pi-page">
      <Navbar onLogin={() => { window.location.href = '/login'; }} />

      {/* Hero Section */}
      <section className="pi-hero">
        <div className="pi-hero-bg-pattern"></div>
        <div className="gc-container pi-hero-inner">
          <div className="pi-hero-content">
            <div className="pi-chip">
              <span className="pi-chip-dot"></span> Powerful Integrations
            </div>
            <h1 className="pi-title">
              Connect the tools you <span className="pi-text-gradient">already use</span>
            </h1>
            <p className="pi-subtitle">
              Trainix acts as the central nervous system for your gym. Integrate seamlessly with your favorite payment gateways, communication tools, and biometric hardware.
            </p>
            <div className="pi-hero-actions">
              <button className="pi-btn pi-btn-primary">
                Explore API Docs <ArrowRight size={18} />
              </button>
              <button className="pi-btn pi-btn-secondary">View Pricing</button>
            </div>
          </div>
          <div className="pi-hero-visual">
            <div className="pi-connection-graphic">
              <div className="pi-center-node">Trainix</div>
              {/* Orbits & Nodes */}
              <div className="pi-orbit pi-orbit-1"></div>
              <div className="pi-orbit pi-orbit-2"></div>
              <div className="pi-orbit pi-orbit-3"></div>
              
              <div className="pi-node pi-node-1"><MessageCircle size={20} color="#25D366" /></div>
              <div className="pi-node pi-node-2"><CreditCard size={20} color="#635BFF" /></div>
              <div className="pi-node pi-node-3"><Fingerprint size={20} color="#4F46E5" /></div>
              <div className="pi-node pi-node-4"><Video size={20} color="#2D8CFF" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pi-grid-section">
        <div className="gc-container">
          <div className="pi-section-header">
            <h2>Seamlessly connect your business</h2>
            <p>We've partnered with industry leaders to ensure your data flows smoothly.</p>
          </div>

          <div className="pi-filter-bar">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`pi-filter-btn ${activeCat === cat ? 'pi-filter-btn-active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pi-grid">
            {filtered.map(int => (
              <div className="pi-card" key={int.id}>
                <div className="pi-card-icon-wrap" style={{ backgroundColor: `${int.color}15`, color: int.color }}>
                  {int.icon}
                </div>
                <h3 className="pi-card-title">{int.name}</h3>
                <p className="pi-card-desc">{int.desc}</p>
                <a href="#" className="pi-card-link" style={{ color: int.color }}>Learn more <ArrowRight size={14} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="pi-highlight">
        <div className="gc-container">
          <div className="pi-highlight-box">
            <div className="pi-highlight-content">
              <h2>Plug and Play Biometrics</h2>
              <p>Don't waste time manual syncing. Trainix securely connects to your local network biometric devices (eSSL, ZKTeco, Matrix) via our lightweight desktop bridge.</p>
              <ul className="pi-highlight-list">
                <li><CheckCircle2 color="#10B981" /> Real-time attendance syncing</li>
                <li><CheckCircle2 color="#10B981" /> Automatic access control for unpaid members</li>
                <li><CheckCircle2 color="#10B981" /> Support for fingerprint, face, and RFID</li>
              </ul>
              <button className="pi-btn pi-btn-primary" style={{ marginTop: '24px' }}>Download Bridge App</button>
            </div>
            <div className="pi-highlight-image">
              <div className="pi-scanner-mockup">
                <div className="pi-scanner-screen">
                  <div className="pi-scan-line"></div>
                  <Fingerprint size={64} color="#10B981" className="pi-scan-icon" />
                  <p className="pi-scan-text">Access Granted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API CTA */}
      <section className="pi-api-cta">
        <div className="gc-container">
          <div className="pi-api-content">
            <Globe className="pi-api-icon" size={48} />
            <h2>Build your own integration</h2>
            <p>Need something custom? Our robust REST API and Webhooks allow developers to connect Trainix with virtually any software platform.</p>
            <div className="pi-api-code">
              <code>
                <span className="code-method">GET</span> /api/v1/members<br/>
                <span className="code-header">Authorization:</span> Bearer YOUR_API_KEY
              </code>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlatformIntegrations;
