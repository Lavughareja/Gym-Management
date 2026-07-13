import React, { useState } from 'react';
import { 
  ChevronDown, 
  MonitorSmartphone, 
  Globe, 
  Dumbbell, 
  Building2, 
  Flame, 
  Users, 
  Heart, 
  ActivitySquare, 
  Music, 
  Swords,
  Sparkles,
  Users2,
  UserPlus,
  Smartphone,
  ShieldCheck,
  BrainCircuit,
  Fingerprint,
  CalendarDays,
  CreditCard,
  Receipt,
  Salad,
  ScanLine,
  Menu,
  X
} from 'lucide-react';

interface TopNavLayoutProps {
  onLoginClick?: () => void;
  children: (
    activeTab: string, 
    setActiveTab: (tab: string) => void
  ) => React.ReactNode;
}

export const TopNavLayout: React.FC<TopNavLayoutProps> = ({ children, onLoginClick }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  let timeoutId: ReturnType<typeof setTimeout>;

  const handleMouseEnter = (menu: string) => {
    clearTimeout(timeoutId);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const navTo = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <div className="topnav-layout">
      {/* Top Navigation Bar */}
      <header className="topnav-header">
        <div className="topnav-container">
          
          {/* Logo */}
          <div className="topnav-brand" onClick={() => navTo('home')} style={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="Trainix Logo" className="topnav-logo-img" />
            <span className="topnav-logo-text">Trainix</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="topnav-desktop">
            {/* Products */}
            <div 
              className="topnav-item"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`topnav-btn ${activeDropdown === 'products' ? 'active' : ''}`}>
                Products <ChevronDown size={14} className="topnav-chevron" />
              </button>
              
              {activeDropdown === 'products' && (
                <div className="mega-menu products-menu">
                  <div className="mega-menu-header">OUR PRODUCTS</div>
                  <div className="mega-menu-grid-1">
                    <div className="mega-item">
                      <div className="mega-icon"><MonitorSmartphone size={20} /></div>
                      <div>
                        <h4>Gym Management Software</h4>
                        <p>All-in-one solution to manage members, billing, attendance & more</p>
                      </div>
                    </div>
                    <div className="mega-item">
                      <div className="mega-icon"><Globe size={20} /></div>
                      <div>
                        <h4>Member App & Portal</h4>
                        <p>Branded app for plans, payments & class bookings</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions */}
            <div 
              className="topnav-item"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`topnav-btn ${activeDropdown === 'solutions' ? 'active' : ''}`}>
                Solutions <ChevronDown size={14} className="topnav-chevron" />
              </button>
              
              {activeDropdown === 'solutions' && (
                <div className="mega-menu solutions-menu">
                  <div className="solutions-grid">
                    <div>
                      <div className="mega-menu-header">GYM & FITNESS</div>
                      <div className="mega-item"><div className="mega-icon-small"><Dumbbell size={16} /></div> <h4>Gym</h4></div>
                      <div className="mega-item"><div className="mega-icon-small"><Building2 size={16} /></div> <h4>Fitness Center</h4></div>
                      <div className="mega-item"><div className="mega-icon-small"><Flame size={16} /></div> <h4>CrossFit Box</h4></div>
                      <div className="mega-item"><div className="mega-icon-small"><Users size={16} /></div> <h4>Personal Training</h4></div>
                    </div>
                    <div>
                      <div className="mega-menu-header">STUDIOS & SPECIALTY</div>
                      <div className="mega-item"><div className="mega-icon-small"><Heart size={16} /></div> <h4>Yoga Studio</h4></div>
                      <div className="mega-item"><div className="mega-icon-small"><ActivitySquare size={16} /></div> <h4>Pilates Studio</h4></div>
                      <div className="mega-item"><div className="mega-icon-small"><Music size={16} /></div> <h4>Dance Studio</h4></div>
                      <div className="mega-item"><div className="mega-icon-small"><Swords size={16} /></div> <h4>MMA & Martial Arts</h4></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div 
              className="topnav-item"
              onMouseEnter={() => handleMouseEnter('features')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`topnav-btn ${activeDropdown === 'features' || activeTab === 'features' ? 'active' : ''}`} onClick={() => navTo('features')}>
                Features <ChevronDown size={14} className="topnav-chevron" />
              </button>

              {activeDropdown === 'features' && (
                <div className="mega-menu features-menu">
                  <div className="features-grid">
                    <div>
                      <div className="mega-menu-header">MEMBER MANAGEMENT</div>
                      <div className="mega-item"><div className="mega-icon-small"><Sparkles size={16} /></div> <div><h4>Member Self-Serve <span className="badge">NEW</span></h4></div></div>
                      <div className="mega-item"><div className="mega-icon-small"><Users2 size={16} /></div> <div><h4>Member Profiles & History</h4></div></div>
                      <div className="mega-item"><div className="mega-icon-small"><UserPlus size={16} /></div> <div><h4>Lead Management</h4></div></div>
                      <div className="mega-item"><div className="mega-icon-small"><Smartphone size={16} /></div> <div><h4>Member Portal</h4></div></div>
                    </div>
                    <div>
                      <div className="mega-menu-header">OPERATIONS</div>
                      <div className="mega-item"><div className="mega-icon-small"><BrainCircuit size={16} /></div> <div><h4>AI Business Pack</h4></div></div>
                      <div className="mega-item"><div className="mega-icon-small"><Fingerprint size={16} /></div> <div><h4>Biometric Attendance</h4></div></div>
                      <div className="mega-item"><div className="mega-icon-small"><ScanLine size={16} /></div> <div><h4>QR Attendance</h4></div></div>
                      <div className="mega-item"><div className="mega-icon-small"><CalendarDays size={16} /></div> <div><h4>Class Scheduling</h4></div></div>
                    </div>
                    <div>
                      <div className="mega-menu-header">BILLING & EXTRAS</div>
                      <div className="mega-item"><div className="mega-icon-small"><CreditCard size={16} /></div> <div><h4>Payment Gateway</h4></div></div>
                      <div className="mega-item"><div className="mega-icon-small"><Receipt size={16} /></div> <div><h4>Billing & Invoicing</h4></div></div>
                      <div className="mega-item"><div className="mega-icon-small"><Salad size={16} /></div> <div><h4>Diet & Workout Plans</h4></div></div>
                      <div className="mega-item"><div className="mega-icon-small"><ShieldCheck size={16} /></div> <div><h4>Staff Management</h4></div></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div 
              className="topnav-item"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`topnav-btn ${activeDropdown === 'resources' ? 'active' : ''}`}>
                Resources <ChevronDown size={14} className="topnav-chevron" />
              </button>

              {activeDropdown === 'resources' && (
                <div className="mega-menu resources-menu">
                  <div className="mega-menu-grid-1">
                    <div className="mega-item" onClick={() => navTo('about')}>
                      <div>
                        <h4>About Us</h4>
                        <p>Learn more about our mission and team.</p>
                      </div>
                    </div>
                    <div className="mega-item" onClick={() => navTo('contact')}>
                      <div>
                        <h4>Contact Us</h4>
                        <p>Get in touch with our support team.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Pricing */}
            <div className="topnav-item">
               <button className={`topnav-btn ${activeTab === 'pricing' ? 'active' : ''}`} onClick={() => navTo('pricing')}>
                 Pricing
               </button>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="topnav-actions">
            {onLoginClick && (
              <button className="topnav-login-btn" onClick={onLoginClick}>Login</button>
            )}
            <button className="topnav-cta-btn" onClick={() => navTo('pricing')}>Start Free Trial</button>
            
            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu">
          <button onClick={() => navTo('home')}>Home</button>
          <button onClick={() => navTo('features')}>Features</button>
          <button onClick={() => navTo('pricing')}>Pricing</button>
          <button onClick={() => navTo('about')}>About Us</button>
          <button onClick={() => navTo('contact')}>Contact Us</button>
          {onLoginClick && (
            <button onClick={onLoginClick} style={{ color: 'var(--primary)', fontWeight: 600 }}>Login</button>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <main className="topnav-main-content">
        {children(activeTab, setActiveTab)}
      </main>

      {/* Massive Multi-Column Footer */}
      <footer className="mega-footer">
        <div className="mega-footer-container">
          <div className="footer-col-main">
            <div className="footer-brand-logo">
              <img src="/logo.png" alt="Trainix Logo" />
              <span>Trainix</span>
            </div>
            <p className="footer-tagline">The most intuitive platform for fitness businesses in India.</p>
            <p className="footer-address">
              Trainix Technologies Private Limited<br/>
              Aparna Sarovar Ziron, Nallagandla,<br/>
              Serilingampally, Hyderabad, 500019, Telangana
            </p>
            
            <div className="social-links">
              <a href="#" className="social-btn">in</a>
              <a href="#" className="social-btn">f</a>
              <a href="#" className="social-btn">X</a>
              <a href="#" className="social-btn">ig</a>
            </div>

            <div className="footer-apps">
              <div className="app-download-btn">
                <Smartphone size={20} className="app-icon" />
                <div>
                  <strong>Business App</strong>
                  <div style={{fontSize: '0.7rem', color: '#9ca3af'}}>Run from your phone</div>
                </div>
                <div style={{marginLeft: 'auto'}}>&rarr;</div>
              </div>
              <div className="app-download-btn">
                <Smartphone size={20} className="app-icon" />
                <div>
                  <strong>Member App</strong>
                  <div style={{fontSize: '0.7rem', color: '#9ca3af'}}>iOS &middot; Android</div>
                </div>
                <div style={{marginLeft: 'auto'}}>&rarr;</div>
              </div>
            </div>
          </div>

          <div className="footer-col-links">
            <h4>Products</h4>
            <a href="#">Gym Management Software</a>
            <a href="#">Premium Gym Websites</a>
            <a href="#">Payroll Management</a>
            <a href="#">Custom Software Development</a>
          </div>

          <div className="footer-col-links">
            <h4>Features</h4>
            <a href="#">AI Business Pack <span className="badge-new" style={{fontSize: '0.6rem', padding: '2px 6px'}}>NEW</span></a>
            <a href="#">WhatsApp Marketing <span className="badge-new" style={{fontSize: '0.6rem', padding: '2px 6px', background: '#10b981'}}>NEW</span></a>
            <a href="#">WhatsApp Automation</a>
            <a href="#">Member Management</a>
            <a href="#">Staff Management</a>
            <a href="#">Billing & Invoicing</a>
            <a href="#">Biometric Attendance</a>
            <a href="#">Member App & Portal</a>
            <a href="#">Class Scheduling</a>
            <a href="#">Lead Management</a>
            <a href="#">Diet & Workout Plans</a>
            <a href="#">Payment Integration</a>
          </div>

          <div className="footer-col-links">
            <h4>Solutions</h4>
            <a href="#">Gym</a>
            <a href="#">Yoga Studio</a>
            <a href="#">Pilates Studio</a>
            <a href="#">Personal Training</a>
            <a href="#">MMA & Martial Arts</a>
            <a href="#">Fitness Center</a>
            <a href="#">CrossFit Box</a>
            <a href="#">Dance Studio</a>
          </div>

          <div className="footer-col-links">
            <h4>Legal</h4>
            <a href="#">About</a>
            <a href="#">Partner Program</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
            <a href="#">Contact</a>
            <a href="#">Cookie Preferences</a>
          </div>
        </div>
        
        <div className="footer-bottom-bar">
          <div className="fb-text">&copy; {new Date().getFullYear()} Trainix - Trainix Technologies Private Limited</div>
          <div className="cookie-banner-inline">
            <span style={{fontSize: '0.8rem'}}>🍪 We use cookies to improve your experience.</span>
            <button className="btn-primary-small" style={{padding: '4px 12px', fontSize: '0.75rem', background: 'white', color: 'black'}}>Got it</button>
          </div>
          <div className="fb-text">All rights reserved. &nbsp;&middot;&nbsp; Built in India <Heart size={12} fill="#ef4444" color="#ef4444" style={{display: 'inline', margin: '0 4px'}}/> for the world.</div>
        </div>
      </footer>
    </div>
  );
};
