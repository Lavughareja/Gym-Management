import React, { useState, useEffect } from 'react';
import '../components/landing/landing.css';

// Icons
import {
  Users, UserCheck, CalendarCheck, Fingerprint,
  CreditCard, FileText, Dumbbell, Salad,
  Building2, LineChart, PieChart, MessageSquare,
  Mail, QrCode, ClipboardList, Target,
  Wallet, Banknote, Shield, Cloud, Smartphone,
  MessageCircle, Calendar, Video, FileSpreadsheet, Server,
  CheckCircle2, XCircle, Star, ChevronLeft, ChevronRight,
  Plus, Minus, ArrowRight, Play, TrendingUp, Activity,
  Send, Monitor, UserCog, Bell, ShieldCheck
} from 'lucide-react';

/* ===================== DATA ===================== */
const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Screenshots', href: '#screenshots' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Integrations', href: '#integrations' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const features = [
  // Management & Staff
  { icon: Users, title: 'Member Management', desc: 'Complete profiles, history, and engagement tracking.' },
  { icon: UserCheck, title: 'Trainer Management', desc: 'Assign clients, track sessions, and calculate payouts.' },
  { icon: UserCog, title: 'PT Management', desc: 'Assign and track personal training sessions.' },
  { icon: Bell, title: 'Announcements', desc: 'Broadcast updates and alerts to all members.' },
  { icon: Shield, title: 'Role Permissions', desc: 'Granular access control for managers and trainers.' },
  { icon: Building2, title: 'Branch Management', desc: 'Control multiple locations from a single dashboard.' },
  { icon: Smartphone, title: 'Mobile Friendly', desc: 'Manage your gym on-the-go from any device.' },
  
  // Operations & Tracking
  { icon: Target, title: 'CRM & Leads', desc: 'Track inquiries and convert prospects into members.' },
  { icon: CalendarCheck, title: 'Attendance Tracking', desc: 'Real-time tracking of staff and member visits.' },
  { icon: Fingerprint, title: 'Biometric Integration', desc: 'Seamlessly sync with fingerprint and face scanners.' },
  { icon: QrCode, title: 'QR Check-in', desc: 'Contactless entry using mobile app QR codes.' },
  { icon: Play, title: 'Workout Library', desc: 'Extensive library of exercise video tutorials.' },
  { icon: Activity, title: 'Workout Timing', desc: 'Live workout logging and session timing.' },
  { icon: ShieldCheck, title: 'Daily Challenges', desc: 'Engage members with goals, streaks, and XP.' },

  // Health & Billing
  { icon: Dumbbell, title: 'Workout Plans', desc: 'Create and assign custom exercise routines.' },
  { icon: Salad, title: 'AI Diet Generation', desc: 'Generate customized diet plans based on goals.' },
  { icon: FileSpreadsheet, title: 'BMI & Macro Reports', desc: 'Track progress photos, BMI, and calorie consumption.' },
  { icon: CreditCard, title: 'Payment Tracking', desc: 'Monitor dues, collect payments, and send reminders.' },
  { icon: FileText, title: 'Invoices & Billing', desc: 'Automated billing and professional invoice generation.' },
  { icon: Wallet, title: 'Expense Tracking', desc: 'Log daily expenses to calculate true profit.' },
  { icon: LineChart, title: 'Analytics & Reports', desc: 'Deep insights into revenue, growth, and retention.' },
];

const screenTabs = [
  'Owner Dashboard', 'Member Management', 'Attendance', 'Billing', 'Reports',
];

const oldWay = [
  'Using Excel for everything',
  'Paper attendance registers',
  'Manual billing and follow-ups',
  'No insights or reports',
  'No member tracking',
];

const newWay = [
  'Everything fully automated',
  'Real-time Reports & Analytics',
  'Cloud based and highly secure',
  'Fast, lightning performance',
  'Professional member experience',
];

const steps = [
  { num: '01', title: 'Book Demo', desc: 'Schedule a personalized walkthrough of the platform with our fitness tech experts.' },
  { num: '02', title: 'Create Gym', desc: 'Set up your branches, define membership plans, and configure your dashboard.' },
  { num: '03', title: 'Add Members', desc: 'Import your existing members via CSV or start adding them one by one.' },
  { num: '04', title: 'Manage Everything', desc: 'Sit back and watch your gym run efficiently on autopilot with GymCore.' },
];

const integrations = [
  { icon: MessageCircle, name: 'WhatsApp', desc: 'Automated messaging' },
  { icon: Mail, name: 'Email', desc: 'Campaigns & alerts' },
  { icon: CreditCard, name: 'Razorpay', desc: 'Indian payments' },
  { icon: CreditCard, name: 'Stripe', desc: 'Global payments' },
  { icon: Calendar, name: 'Google Calendar', desc: 'Sync schedules' },
  { icon: Video, name: 'Zoom', desc: 'Online classes' },
  { icon: Fingerprint, name: 'Biometrics', desc: 'Device integration' },
  { icon: FileSpreadsheet, name: 'CSV Import', desc: 'Easy migration' },
  { icon: Cloud, name: 'Cloud Backup', desc: 'AWS integration' },
  { icon: Server, name: 'API Access', desc: 'Custom integrations' },
];

const plans = [
  {
    name: 'Starter',
    desc: 'For small gyms just getting started.',
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: ['Up to 100 Members', 'Basic Reports', 'Email Support', '1 Branch', '1 Admin'],
  },
  {
    name: 'Plus',
    desc: 'Perfect for growing fitness centers.',
    monthlyPrice: 79,
    yearlyPrice: 69,
    features: ['Up to 500 Members', 'Advanced Analytics', 'Priority Support', '2 Branches', '5 Staff Members'],
  },
  {
    name: 'Professional',
    desc: 'Everything you need to scale rapidly.',
    monthlyPrice: 149,
    yearlyPrice: 129,
    isPopular: true,
    features: ['Unlimited Members', 'Biometric Integration', 'WhatsApp Automation', '5 Branches', 'Unlimited Staff'],
  },
  {
    name: 'Enterprise',
    desc: 'For large franchises and networks.',
    monthlyPrice: 299,
    yearlyPrice: 249,
    features: ['Unlimited Everything', 'Custom Development', 'Dedicated Account Manager', 'White-label App', 'API Access'],
  },
];

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Owner, Elevate Fitness Studio',
    image: 'https://i.pravatar.cc/150?img=44',
    text: 'GymCore completely transformed how we run our daily operations. The biometric integration alone saved us hours of manual work every week.',
    rating: 5,
    type: 'Fitness Studio',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head Coach, Iron & Chalk CrossFit',
    image: 'https://i.pravatar.cc/150?img=11',
    text: 'Moving our 300+ members from spreadsheets to GymCore was seamless. The automated WhatsApp reminders for payments have reduced our outstanding dues by 80%.',
    rating: 5,
    type: 'CrossFit',
  },
  {
    name: 'Elena Rostova',
    role: 'Founder, Zen Flow Yoga',
    image: 'https://i.pravatar.cc/150?img=5',
    text: 'We needed something simple yet powerful for our boutique studio. GymCore\'s beautiful interface and member portal is exactly what our high-end clients expect.',
    rating: 5,
    type: 'Yoga Studio',
  },
];

const faqs = [
  {
    q: 'How long does it take to set up GymCore?',
    a: 'Most gyms are fully set up within 24 hours. Our onboarding team will help you import your existing member data, set up your branches, and configure your biometric devices during your first onboarding call.',
  },
  {
    q: 'Can I import my existing members from Excel?',
    a: 'Yes! We have a one-click CSV import tool. You can easily migrate all your members, their active plans, and billing history without losing any data.',
  },
  {
    q: 'Do you support biometric fingerprint scanners?',
    a: 'Absolutely. GymCore integrates natively with most popular biometric devices (Fingerprint, Face Recognition, RFID). Attendance is synced to the cloud in real-time.',
  },
  {
    q: 'Can I manage multiple branches?',
    a: 'Yes, our Plus, Professional, and Enterprise plans support multi-branch management. You can view consolidated reports or switch between branches with a single click.',
  },
  {
    q: 'How do automated WhatsApp notifications work?',
    a: 'GymCore automatically sends WhatsApp messages for payment reminders, successful renewals, birthday greetings, and attendance alerts. You don\'t have to lift a finger.',
  },
  {
    q: 'Is my data secure in the cloud?',
    a: 'We use bank-level AES-256 encryption. Your data is backed up daily across multiple secure AWS servers, ensuring 99.99% uptime and complete data safety.',
  },
];

/* ===================== COMPONENTS ===================== */

const featuresMenu = {
  management: [
    { title: 'Member Management', desc: 'Complete profiles, history & tracking', icon: <Users style={{ width: 18, height: 18 }} /> },
    { title: 'Trainer Management', desc: 'Assign trainers & calculate payouts', icon: <UserCheck style={{ width: 18, height: 18 }} /> },
    { title: 'PT Management', desc: 'Assign & track personal training', icon: <UserCog style={{ width: 18, height: 18 }} /> },
    { title: 'Announcements', desc: 'Broadcast updates to members', icon: <Bell style={{ width: 18, height: 18 }} /> },
    { title: 'Role Permissions', desc: 'Granular access control', icon: <Shield style={{ width: 18, height: 18 }} /> },
    { title: 'Branch Management', desc: 'Control multiple locations', icon: <Building2 style={{ width: 18, height: 18 }} /> },
    { title: 'Mobile Friendly', desc: 'Manage your gym on-the-go', icon: <Smartphone style={{ width: 18, height: 18 }} /> },
  ],
  operations: [
    { title: 'CRM & Leads', desc: 'Track inquiries & convert prospects', icon: <Target style={{ width: 18, height: 18 }} /> },
    { title: 'Attendance Tracking', desc: 'Real-time tracking of visits', icon: <CalendarCheck style={{ width: 18, height: 18 }} /> },
    { title: 'Biometric & QR', desc: 'Fingerprint, face scanners & QR', icon: <Fingerprint style={{ width: 18, height: 18 }} /> },
    { title: 'Workout Library', desc: 'Member exercise video tutorials', icon: <Play style={{ width: 18, height: 18 }} /> },
    { title: 'Workout Timing', desc: 'Live workout logging & timing', icon: <Activity style={{ width: 18, height: 18 }} /> },
    { title: 'Daily Challenges', desc: 'Goals, streaks, and XP rewards', icon: <ShieldCheck style={{ width: 18, height: 18 }} /> },
    { title: 'AI Diet Generation', desc: 'Custom diets based on goals', icon: <Salad style={{ width: 18, height: 18 }} /> },
  ],
  billing: [
    { title: 'BMI & Macro Reports', desc: 'Progress photos & calories tracking', icon: <FileSpreadsheet style={{ width: 18, height: 18 }} /> },
    { title: 'Workout Plans', desc: 'Create custom exercise routines', icon: <Dumbbell style={{ width: 18, height: 18 }} /> },
    { title: 'Payment Tracking', desc: 'Monitor dues & collect payments', icon: <CreditCard style={{ width: 18, height: 18 }} /> },
    { title: 'Invoices & Billing', desc: 'Automated billing & invoices', icon: <FileText style={{ width: 18, height: 18 }} /> },
    { title: 'Expense Tracking', desc: 'Log expenses to calculate profit', icon: <Wallet style={{ width: 18, height: 18 }} /> },
    { title: 'Analytics & Reports', desc: 'Deep insights into revenue', icon: <LineChart style={{ width: 18, height: 18 }} /> },
  ]
};

const primaryLinks = [
  { name: 'Pricing',   href: '#pricing' },
  { name: 'Contact',   href: '#contact' },
];

const resourcesLinks = [
  {
    href: '#screenshots',
    icon: <Monitor style={{ width: 18, height: 18 }} />,
    title: 'Screenshots',
    desc: 'See every screen of the platform in detail',
  },
  {
    href: '#integrations',
    icon: <Cloud style={{ width: 18, height: 18 }} />,
    title: 'Integrations',
    desc: 'WhatsApp, Zoom, Stripe, Biometrics & more',
  },
  {
    href: '#testimonials',
    icon: <Star style={{ width: 18, height: 18 }} />,
    title: 'Testimonials',
    desc: 'What gym owners say about GymCore',
  },
  {
    href: '#faq',
    icon: <MessageSquare style={{ width: 18, height: 18 }} />,
    title: 'FAQ',
    desc: 'Common questions answered quickly',
  },
];

const Navbar: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className="gc-navbar" style={{ boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none' }}>
      <div className="gc-container gc-navbar-container">
        <div className="gc-navbar-inner">
          {/* Logo */}
          <div className="gc-navbar-logo">
            <div className="gc-navbar-logo-icon">
              <Dumbbell style={{ width: 20, height: 20, color: 'white' }} />
            </div>
            <span className="gc-navbar-logo-text">GymCore</span>
          </div>

          {/* Nav links */}
          <nav>
            <ul className="gc-navbar-nav">
              {/* Features Mega Menu */}
              <li
                className="gc-nav-more"
                onMouseEnter={() => setFeaturesOpen(true)}
                onMouseLeave={() => setFeaturesOpen(false)}
              >
                <button className="gc-nav-more-btn">
                  Features <span className={`gc-nav-more-chevron${featuresOpen ? ' open' : ''}`}>^</span>
                </button>

                {featuresOpen && (
                  <div className="gc-mega-dropdown gc-mega-dropdown-large">
                    <div className="gc-mega-columns">
                      <div className="gc-mega-column">
                        <p className="gc-mega-label">MANAGEMENT & STAFF</p>
                        {featuresMenu.management.map(l => (
                          <a key={l.title} href="#features" className="gc-mega-item" onClick={() => setFeaturesOpen(false)}>
                            <span className="gc-mega-icon">{l.icon}</span>
                            <span className="gc-mega-text">
                              <span className="gc-mega-title">
                                {l.title}
                              </span>
                              <span className="gc-mega-desc">{l.desc}</span>
                            </span>
                          </a>
                        ))}
                      </div>
                      <div className="gc-mega-column">
                        <p className="gc-mega-label">OPERATIONS & TRACKING</p>
                        {featuresMenu.operations.map(l => (
                          <a key={l.title} href="#features" className="gc-mega-item" onClick={() => setFeaturesOpen(false)}>
                            <span className="gc-mega-icon">{l.icon}</span>
                            <span className="gc-mega-text">
                              <span className="gc-mega-title">
                                {l.title}
                              </span>
                              <span className="gc-mega-desc">{l.desc}</span>
                            </span>
                          </a>
                        ))}
                      </div>
                      <div className="gc-mega-column">
                        <p className="gc-mega-label">BILLING & ANALYTICS</p>
                        {featuresMenu.billing.map(l => (
                          <a key={l.title} href="#features" className="gc-mega-item" onClick={() => setFeaturesOpen(false)}>
                            <span className="gc-mega-icon">{l.icon}</span>
                            <span className="gc-mega-text">
                              <span className="gc-mega-title">
                                {l.title}
                              </span>
                              <span className="gc-mega-desc">{l.desc}</span>
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {primaryLinks.map(l => (
                <li key={l.name}><a href={l.href}>{l.name}</a></li>
              ))}

              {/* Resources dropdown */}
              <li
                className="gc-nav-more"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button className="gc-nav-more-btn">
                  Resources <span className={`gc-nav-more-chevron${resourcesOpen ? ' open' : ''}`}>^</span>
                </button>

                {resourcesOpen && (
                  <div className="gc-mega-dropdown">
                    <p className="gc-mega-label">LEARN & TOOLS</p>
                    {resourcesLinks.map(l => (
                      <a
                        key={l.title}
                        href={l.href}
                        className="gc-mega-item"
                        onClick={() => setResourcesOpen(false)}
                      >
                        <span className="gc-mega-icon">{l.icon}</span>
                        <span className="gc-mega-text">
                          <span className="gc-mega-title">{l.title}</span>
                          <span className="gc-mega-desc">{l.desc}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="gc-navbar-actions">
            <button className="gc-btn-ghost" onClick={onLogin}>Login</button>
            <button className="gc-btn-primary" onClick={onLogin}>
              Get Started <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero
const Hero: React.FC = () => {
  const bars = [35, 60, 45, 80, 65, 90, 55, 75, 50, 85];
  return (
    <section className="gc-hero">
      <div className="gc-hero-glow"></div>
      <div className="gc-container">
        <div className="gc-hero-inner">
          <div>
            <div className="gc-hero-badge">
              <span className="gc-hero-badge-dot"></span>
              GymCore 2.0 is now live
            </div>
            <h1 className="gc-hero-title">
              Everything Your Gym Needs.<br />
              <span className="gc-hero-title-accent">One Powerful Platform.</span>
            </h1>
            <p className="gc-hero-desc">
              Manage members, trainers, attendance, billing, biometric devices, branches, reports, WhatsApp notifications and much more from one powerful cloud platform.
            </p>
            <div className="gc-hero-btns">
              <button className="gc-hero-btn-main">
                Start Free Demo <ArrowRight style={{ width: 18, height: 18 }} />
              </button>
              <button className="gc-hero-btn-sec">
                <Play style={{ width: 18, height: 18, color: 'var(--gc-primary)' }} /> Watch Video
              </button>
            </div>
            <div className="gc-hero-checks">
              <span className="gc-hero-check-item">
                <CheckCircle2 /> No credit card required
              </span>
              <span className="gc-hero-check-item">
                <CheckCircle2 /> 14-day free trial
              </span>
            </div>
          </div>

          {/* Right Visual */}
          <div className="gc-hero-visual">
            <div className="gc-hero-laptop">
              <div className="gc-hero-screen">
                <div className="gc-hero-screen-bar">
                  <span className="gc-screen-dot gc-screen-dot-r"></span>
                  <span className="gc-screen-dot gc-screen-dot-y"></span>
                  <span className="gc-screen-dot gc-screen-dot-g"></span>
                </div>
                <div className="gc-hero-screen-content">
                  <div className="gc-screen-row">
                    <div className="gc-screen-card gc-screen-card-1"></div>
                    <div className="gc-screen-card gc-screen-card-2"></div>
                    <div className="gc-screen-card gc-screen-card-3"></div>
                  </div>
                  <div className="gc-screen-row">
                    <div className="gc-screen-card gc-screen-chart">
                      <div className="gc-screen-chart-bars">
                        {bars.map((h, i) => (
                          <div key={i} className="gc-screen-bar" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="gc-screen-card gc-screen-table"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="gc-float-card gc-float-card-1">
              <div className="gc-float-icon gc-float-icon-green"><TrendingUp /></div>
              <div>
                <div className="gc-float-label">Today's Revenue</div>
                <div className="gc-float-value">$4,250</div>
              </div>
            </div>
            <div className="gc-float-card gc-float-card-2">
              <div className="gc-float-icon gc-float-icon-blue"><Users /></div>
              <div>
                <div className="gc-float-label">New Members</div>
                <div className="gc-float-value">+24</div>
              </div>
            </div>
            <div className="gc-float-card gc-float-card-3">
              <div className="gc-float-icon gc-float-icon-red"><CreditCard /></div>
              <div>
                <div className="gc-float-label">Pending Payments</div>
                <div className="gc-float-value">3</div>
              </div>
            </div>
            <div className="gc-float-card gc-float-card-4">
              <div className="gc-float-icon gc-float-icon-gray"><Activity /></div>
              <div>
                <div className="gc-float-label">Today's Check-ins</div>
                <div className="gc-float-value">342</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Trust
const Trust: React.FC = () => (
  <section className="gc-trust">
    <div className="gc-container">
      <p className="gc-trust-label">Trusted by Industry Leaders Worldwide</p>
      <div className="gc-trust-grid">
        {[
          { name: 'GoldsGym',   number: '20+',     sub: 'Gyms' },
          { name: 'AnytimeFit', number: '50,000+', sub: 'Members Managed' },
          { name: 'CrossFit',   number: '500+',    sub: 'Trainers Onboarded' },
          { name: 'Equinox',    number: '24/7',    sub: 'Support Available' },
        ].map((s) => (
          <div className="gc-trust-item" key={s.name}>
            <div className="gc-trust-name">{s.name}</div>
            <div className="gc-trust-number">{s.number}</div>
            <div className="gc-trust-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Features
const Features: React.FC = () => (
  <section className="gc-section gc-section-gray" id="features">
    <div className="gc-container">
      <div className="gc-section-head">
        <h2 className="gc-section-title">
          Everything you need.<br /><span>Nothing you don't.</span>
        </h2>
        <p className="gc-section-subtitle">
          A comprehensive suite of tools designed specifically for fitness businesses. We handle the heavy lifting so you can focus on your members.
        </p>
      </div>
      <div className="gc-features-grid">
        {features.map((f, i) => (
          <div className="gc-feature-card" key={i}>
            <div className="gc-feature-icon"><f.icon /></div>
            <div className="gc-feature-name">{f.title}</div>
            <div className="gc-feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Screenshots
const Screenshots: React.FC = () => {
  const [active, setActive] = useState(0);
  const bars = [40, 70, 45, 90, 65, 80, 55, 100, 75, 85];
  return (
    <section className="gc-screenshots" id="screenshots">
      <div className="gc-container">
        <div className="gc-section-head">
          <h2 className="gc-section-title">Designed for clarity.<br /><span>Built for speed.</span></h2>
          <p className="gc-section-subtitle">Every screen in GymCore is meticulously designed to give you exactly what you need, exactly when you need it.</p>
        </div>
        <div className="gc-screen-tabs">
          {screenTabs.map((t, i) => (
            <button key={i} className={`gc-screen-tab ${active === i ? 'gc-screen-tab-active' : ''}`} onClick={() => setActive(i)}>{t}</button>
          ))}
        </div>
        <div className="gc-dashboard-laptop">
          <div className="gc-laptop-shell">
            <div className="gc-laptop-screen-wrap">
              <div className="gc-dashboard-ui">
                <div className="gc-dash-topbar">
                  <div className="gc-dash-topbar-left">
                    <div className="gc-dash-nav-link" style={{ width: 80 }}></div>
                    <div className="gc-dash-nav-link" style={{ width: 60 }}></div>
                    <div className="gc-dash-nav-link" style={{ width: 70 }}></div>
                  </div>
                  <div className="gc-dash-topbar-right">
                    <div className="gc-dash-nav-link" style={{ width: 80 }}></div>
                    <div className="gc-dash-avatar"></div>
                  </div>
                </div>
                <div className="gc-dash-body">
                  <div className="gc-dash-sidebar">
                    {[0,1,2,3,4,5].map(i => (
                      <div key={i} className={`gc-dash-sidebar-item ${i === 0 ? 'gc-dash-sidebar-item-active' : ''}`}></div>
                    ))}
                  </div>
                  <div className="gc-dash-main">
                    <div className="gc-dash-cards">
                      {[0,1,2,3].map(i => (
                        <div className="gc-dash-stat-card" key={i}>
                          <div className="gc-dash-stat-label"></div>
                          <div className="gc-dash-stat-val"></div>
                        </div>
                      ))}
                    </div>
                    <div className="gc-dash-bottom">
                      <div className="gc-dash-chart-wrap">
                        <div className="gc-dash-chart-title"></div>
                        <div className="gc-dash-bars">
                          {bars.map((h, i) => (
                            <div key={i} className="gc-dash-bar" style={{ height: `${h}%` }}></div>
                          ))}
                        </div>
                      </div>
                      <div className="gc-dash-table">
                        {[0,1,2,3,4].map(i => (
                          <div key={i} className="gc-dash-table-row"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gc-laptop-base"><div className="gc-laptop-notch"></div></div>
        </div>
      </div>
    </section>
  );
};

// Comparison
const Comparison: React.FC = () => (
  <section className="gc-compare" id="compare">
    <div className="gc-container">
      <div className="gc-section-head">
        <h2 className="gc-section-title gc-section-title-white">Stop doing it the hard way.</h2>
        <p className="gc-section-subtitle gc-section-subtitle-white">See why modern gym owners are switching from spreadsheets to GymCore.</p>
      </div>
      <div className="gc-compare-grid">
        <div className="gc-compare-card">
          <div className="gc-compare-label gc-compare-label-red">
            <XCircle style={{ width: 18, height: 18 }} /> The Old Way
          </div>
          <ul className="gc-compare-list gc-compare-list-red">
            {oldWay.map((item, i) => (
              <li key={i}><XCircle style={{ color: '#ef4444' }} /> {item}</li>
            ))}
          </ul>
        </div>
        <div className="gc-compare-card gc-compare-card-accent">
          <div className="gc-compare-label gc-compare-label-green">
            <CheckCircle2 style={{ width: 18, height: 18 }} /> Using GymCore
          </div>
          <ul className="gc-compare-list gc-compare-list-white">
            {newWay.map((item, i) => (
              <li key={i}><CheckCircle2 style={{ color: 'var(--gc-success)' }} /> {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// Steps
const Steps: React.FC = () => (
  <section className="gc-section gc-section-white" id="how-it-works">
    <div className="gc-container">
      <div className="gc-section-head">
        <h2 className="gc-section-title">Get started in minutes.</h2>
        <p className="gc-section-subtitle">Transitioning to GymCore is frictionless. We handle the heavy lifting.</p>
      </div>
      <div className="gc-steps-grid">
        <div className="gc-steps-line"></div>
        {steps.map((s, i) => (
          <div className="gc-step-card" key={i}>
            <div className="gc-step-num">{s.num}</div>
            <div className="gc-step-title">{s.title}</div>
            <div className="gc-step-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Integrations
const Integrations: React.FC = () => (
  <section className="gc-section gc-section-gray" id="integrations">
    <div className="gc-container">
      <div className="gc-section-head">
        <h2 className="gc-section-title">Plays well with others.</h2>
        <p className="gc-section-subtitle">Connect GymCore with the tools you already use. Powerful integrations make managing your business seamless.</p>
      </div>
      <div className="gc-int-grid">
        {integrations.map((int, i) => (
          <div className="gc-int-card" key={i}>
            <div className="gc-int-icon"><int.icon /></div>
            <div className="gc-int-name">{int.name}</div>
            <div className="gc-int-desc">{int.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Pricing
const Pricing: React.FC = () => {
  const [yearly, setYearly] = useState(true);
  return (
    <section className="gc-section gc-section-white" id="pricing">
      <div className="gc-container">
        <div className="gc-section-head">
          <h2 className="gc-section-title">Simple, transparent pricing.</h2>
          <p className="gc-section-subtitle">No hidden fees. No surprise charges. Upgrade, downgrade, or cancel anytime.</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
            <div className="gc-pricing-toggle">
              <button className={`gc-pricing-toggle-btn ${!yearly ? 'gc-pricing-toggle-btn-active' : ''}`} onClick={() => setYearly(false)}>Monthly</button>
              <button className={`gc-pricing-toggle-btn ${yearly ? 'gc-pricing-toggle-btn-active' : ''}`} onClick={() => setYearly(true)}>
                Yearly <span className="gc-pricing-toggle-badge">Save 20%</span>
              </button>
            </div>
          </div>
        </div>
        <div className="gc-pricing-grid">
          {plans.map((p, i) => (
            <div key={i} className={`gc-pricing-card ${p.isPopular ? 'gc-pricing-card-popular' : ''}`}>
              {p.isPopular && <div className="gc-pricing-popular-badge">Most Popular</div>}
              <div className="gc-pricing-name">{p.name}</div>
              <div className="gc-pricing-desc">{p.desc}</div>
              <div className="gc-pricing-price">
                <span className="gc-pricing-amount">${yearly ? p.yearlyPrice : p.monthlyPrice}</span>
                <span className="gc-pricing-period">/mo</span>
                {yearly && <div className="gc-pricing-annual-note">Billed annually at ${(yearly ? p.yearlyPrice : p.monthlyPrice) * 12}/yr</div>}
              </div>
              <ul className="gc-pricing-features">
                {p.features.map((f, j) => (
                  <li key={j}><CheckCircle2 /> {f}</li>
                ))}
              </ul>
              <button className={`gc-pricing-cta ${p.isPopular ? 'gc-pricing-cta-primary' : 'gc-pricing-cta-dark'}`}>
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials
const Testimonials: React.FC = () => {
  const [cur, setCur] = useState(0);
  const next = () => setCur((cur + 1) % testimonials.length);
  const prev = () => setCur((cur - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[cur];
  return (
    <section className="gc-testimonials" id="testimonials">
      <div className="gc-container">
        <div className="gc-section-head">
          <h2 className="gc-section-title gc-section-title-white">Loved by gym owners everywhere.</h2>
        </div>
        <div className="gc-testimonial-carousel">
          <div className="gc-testimonial-card">
            <span className="gc-testimonial-quote">"</span>
            <div className="gc-testimonial-stars">
              {[...Array(t.rating)].map((_, i) => <Star key={i} />)}
            </div>
            <p className="gc-testimonial-text">"{t.text}"</p>
            <img src={t.image} alt={t.name} className="gc-testimonial-avatar" />
            <div className="gc-testimonial-name">{t.name}</div>
            <div className="gc-testimonial-role">{t.role}</div>
            <span className="gc-testimonial-tag">{t.type}</span>
          </div>
          <div className="gc-testimonial-nav">
            <button className="gc-testimonial-btn" onClick={prev}><ChevronLeft /></button>
            <div className="gc-testimonial-dots">
              {testimonials.map((_, i) => (
                <div key={i} className={`gc-testimonial-dot ${i === cur ? 'gc-testimonial-dot-active' : 'gc-testimonial-dot-inactive'}`} onClick={() => setCur(i)}></div>
              ))}
            </div>
            <button className="gc-testimonial-btn" onClick={next}><ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ
const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="gc-section gc-section-gray" id="faq">
      <div className="gc-container">
        <div className="gc-section-head">
          <h2 className="gc-section-title">Frequently Asked Questions</h2>
          <p className="gc-section-subtitle">Got questions? We've got answers.</p>
        </div>
        <div className="gc-faq-list">
          {faqs.map((f, i) => (
            <div className="gc-faq-item" key={i}>
              <button className="gc-faq-question" onClick={() => setOpen(open === i ? null : i)}>
                <span className="gc-faq-question-text">{f.q}</span>
                <span className={`gc-faq-icon ${open === i ? 'gc-faq-icon-active' : ''}`}>
                  {open === i ? <Minus /> : <Plus />}
                </span>
              </button>
              {open === i && <div className="gc-faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact
const Contact: React.FC = () => (
  <section className="gc-contact" id="contact">
    <div className="gc-container">
      <div className="gc-contact-grid">
        <div>
          <h2 className="gc-contact-title">Ready to scale your gym?</h2>
          <p className="gc-contact-desc">Book a free 30-minute personalized demo with our fitness tech experts. See how GymCore can transform your business.</p>
          <div className="gc-contact-points">
            {[
              'Customized walkthrough of the platform',
              'Pricing discussion based on your needs',
              'Data migration from your current system',
              'No commitment required',
            ].map((item, i) => (
              <div className="gc-contact-point" key={i}>
                <CheckCircle2 /> {item}
              </div>
            ))}
          </div>
        </div>
        <div className="gc-contact-form-wrap">
          <div className="gc-contact-form-title">Book your free demo</div>
          <form className="gc-form" onSubmit={e => e.preventDefault()}>
            <div className="gc-form-row">
              <div className="gc-form-group">
                <label className="gc-form-label">Full Name</label>
                <input type="text" className="gc-form-input" placeholder="John Doe" />
              </div>
              <div className="gc-form-group">
                <label className="gc-form-label">Gym Name</label>
                <input type="text" className="gc-form-input" placeholder="Iron Fitness" />
              </div>
            </div>
            <div className="gc-form-group">
              <label className="gc-form-label">Email Address</label>
              <input type="email" className="gc-form-input" placeholder="john@example.com" />
            </div>
            <div className="gc-form-row">
              <div className="gc-form-group">
                <label className="gc-form-label">Phone Number</label>
                <input type="tel" className="gc-form-input" placeholder="+1 555 000 0000" />
              </div>
              <div className="gc-form-group">
                <label className="gc-form-label">Country</label>
                <select className="gc-form-select">
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Canada</option>
                </select>
              </div>
            </div>
            <button className="gc-form-submit" type="submit">
              Schedule Demo <Send />
            </button>
            <p className="gc-form-note">By submitting, you agree to our Terms and Privacy Policy.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// Footer
const Footer: React.FC = () => (
  <footer className="gc-footer">
    <div className="gc-container">
      <div className="gc-footer-top">
        <div>
          <div className="gc-footer-brand-name">
            <div className="gc-footer-brand-icon"></div>
            GymCore
          </div>
          <p className="gc-footer-brand-desc">The modern gym management platform built for fitness businesses that want to grow smarter, not harder.</p>
        </div>
        <div>
          <div className="gc-footer-col-title">Product</div>
          <ul className="gc-footer-links">
            {['Features', 'Pricing', 'Screenshots', 'Integrations', 'Changelog'].map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="gc-footer-col-title">Company</div>
          <ul className="gc-footer-links">
            {['About', 'Blog', 'Careers', 'Contact', 'Partners'].map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="gc-footer-col-title">Legal</div>
          <ul className="gc-footer-links">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'GDPR'].map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="gc-footer-bottom">
        <span className="gc-footer-copy">© {new Date().getFullYear()} GymCore. All rights reserved.</span>
        <span className="gc-footer-copy">Built with ❤️ for gym owners worldwide</span>
      </div>
    </div>
  </footer>
);

/* ===================== MAIN HOME PAGE ===================== */
export const Home: React.FC = () => {
  return (
    <div className="gc-landing">
      <Navbar onLogin={() => { window.location.href = '/login'; }} />
      <Hero />
      <Trust />
      <Features />
      <Screenshots />
      <Comparison />
      <Steps />
      <Integrations />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};
