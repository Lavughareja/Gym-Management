import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Smartphone, BarChart2, Bell, Shield,
  CreditCard, Calendar, QrCode, MessageSquare,
  Activity, Star, Zap, UserCheck, Users
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface MobileFriendlyProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <BarChart2 size={22} color="#f87171" />,
    title: "Tied to your reception desk",
    desc: "To check who paid, who came in today, or how much revenue you made, you have to physically sit at the gym PC.",
  },
  {
    icon: <CreditCard size={22} color="#f87171" />,
    title: "Delayed payments on weekends",
    desc: "A member wants to renew on Sunday while you are at home. They have to wait until Monday morning because your software is desktop-only.",
  },
  {
    icon: <Activity size={22} color="#f87171" />,
    title: "Trainers scribbling on paper",
    desc: "Your trainers can't log PT sessions or diet plans while on the gym floor. They have to walk back to the PC, so they just use paper instead.",
  },
  {
    icon: <Bell size={22} color="#f87171" />,
    title: "Members disconnected from the gym",
    desc: "Members don't know their expiry date, can't track their workouts, and miss announcements because they don't have a gym app in their pocket.",
  },
];

const tabs = [
  {
    label: "Owner App",
    sub: "Run your gym from anywhere",
    title: "Your entire gym, in your pocket.",
    desc: "View live attendance, check daily revenue, approve discounts, and manage staff schedules while sitting at a coffee shop. 100% cloud-based, real-time sync with the front desk.",
    bullets: ["Live revenue & attendance dashboard", "Remote discount approvals", "Staff tracking & audit logs"],
  },
  {
    label: "Member App",
    sub: "Self-service & engagement",
    title: "Give members a premium experience.",
    desc: "Members can buy/renew packages online, scan a QR code to enter, track their body progress, view assigned diet plans, and log workouts right from the gym floor.",
    bullets: ["In-app Razorpay renewals", "Mobile QR scanner for entry", "Workout & diet plan viewer"],
  },
  {
    label: "Trainer App",
    sub: "Floor management",
    title: "Keep trainers on the floor, not at a desk.",
    desc: "Trainers can log PT sessions instantly, mark their own attendance, view client profiles, and update body measurements using their own phones.",
    bullets: ["1-tap PT session logging", "Client progress photo uploads", "Trainer schedule viewer"],
  },
];

const scenarios = [
  {
    icon: <Zap size={22} color="#d946ef" />,
    title: "Sunday revenue spike",
    desc: "You send a flash discount push notification on Sunday morning. You watch renewals happen and revenue go up directly from your phone app.",
  },
  {
    icon: <QrCode size={22} color="#ec4899" />,
    title: "Forgot access card? No problem.",
    desc: "Member forgot their RFID card at home. They just open the Member App, scan the QR code at the turnstile, and walk in seamlessly.",
  },
  {
    icon: <MessageSquare size={22} color="#8b5cf6" />,
    title: "Instant feedback loop",
    desc: "A member rates their workout 5-stars in the app. The owner app immediately pings you so you know which trainers are performing best.",
  },
  {
    icon: <Shield size={22} color="#14b8a6" />,
    title: "Approving a custom discount",
    desc: "Receptionist calls you about a prospect wanting a 15% discount. You open the app, tap 'Approve', and the invoice is unlocked for the desk to process.",
  },
  {
    icon: <Calendar size={22} color="#f59e0b" />,
    title: "Booking a spin class",
    desc: "Group classes fill up fast. Members open their app on Monday morning and reserve their spot for the evening Zumba class in two taps.",
  },
  {
    icon: <UserCheck size={22} color="#3b82f6" />,
    title: "Trainer logs a PR",
    desc: "Client hits a 100kg bench press. Trainer logs it in the Trainer App immediately. Client gets a push notification celebrating the milestone.",
  },
];

const faqs = [
  {
    q: "Is the app available for both iOS and Android?",
    a: "Yes. Trainix mobile apps are natively available on both the Apple App Store for iOS devices and the Google Play Store for Android.",
  },
  {
    q: "Do members have to pay to download the app?",
    a: "No, the member app is completely free for your clients to download and use as long as they are active members of your gym.",
  },
  {
    q: "Is the mobile app a lighter version of the desktop software?",
    a: "The Owner App has about 90% of the desktop features (optimized for mobile), focusing heavily on dashboards, approvals, and communication. Heavy data entry is usually done on desktop.",
  },
  {
    q: "Can I customize the member app with my gym's logo?",
    a: "Yes! The app adapts to display your gym's branding, logo, and primary colors to give members a premium, white-labeled feel.",
  },
];

export const MobileFriendly: React.FC<MobileFriendlyProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<Shield size={20} />, <Smartphone size={20} />, <Activity size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Magenta / Purple gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #4a044e 0%, #86198f 55%, #c026d3 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-25%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'rgba(232,121,249,0.2)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '8%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(192,38,211,0.15)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#f5d0fe' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e879f9', display: 'inline-block' }} />
                Mobile Friendly
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Your entire gym.{' '}
                <span style={{ background: 'linear-gradient(90deg, #f0abfc, #f5d0fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  In your pocket.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#fdf4ff', marginBottom: 40, maxWidth: 480 }}>
                Break free from the reception desk. Trainix provides dedicated native mobile apps for owners, trainers, and members — keeping everyone connected to the gym 24/7.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#d946ef', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(217,70,239,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Book a Demo
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Owner, Trainer & Member Apps', 'iOS & Android Native', 'Real-time cloud sync'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#f5d0fe' }}>
                    <CheckCircle2 size={14} color="#e879f9" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Phone Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 280, background: '#0f172a', borderRadius: 40, padding: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative', border: '2px solid #334155' }}>
                {/* iPhone Notch */}
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 24, background: '#000', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10 }}></div>
                
                <div style={{ background: '#f8fafc', borderRadius: 32, overflow: 'hidden', height: 580, position: 'relative' }}>
                  {/* App Header */}
                  <div style={{ background: 'linear-gradient(135deg, #d946ef, #9333ea)', paddingTop: 48, paddingBottom: 24, paddingLeft: 20, paddingRight: 20, color: '#fff' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>Today's Overview</div>
                    <div style={{ fontSize: 24, fontWeight: 800 }}>₹42,500 <span style={{ fontSize: 14, fontWeight: 500, color: '#f0abfc' }}>Collected</span></div>
                  </div>

                  {/* App Content */}
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                      <div style={{ background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>124</div>
                        <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 4 }}>Walk-ins</div>
                      </div>
                      <div style={{ background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>12</div>
                        <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 4 }}>Renewals</div>
                      </div>
                    </div>

                    <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Pending Approvals</div>
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Arjun K.</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>Requests 20% Off</div>
                      </div>
                      <button style={{ background: '#d946ef', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>Approve</button>
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 8 }}>
                    <div style={{ color: '#d946ef', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}><BarChart2 size={20} /><div style={{ fontSize: 9, fontWeight: 700 }}>Home</div></div>
                    <div style={{ color: '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}><Users size={20} /><div style={{ fontSize: 9, fontWeight: 700 }}>Members</div></div>
                    <div style={{ color: '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}><Bell size={20} /><div style={{ fontSize: 9, fontWeight: 700 }}>Alerts</div></div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 20, top: '20%', width: 160, height: 160, borderRadius: '50%', background: '#d946ef', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: 0, bottom: 20, width: 200, height: 200, borderRadius: '50%', background: '#86198f', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '3', label: 'Dedicated native apps' },
            { val: 'iOS', label: 'Apple App Store ready' },
            { val: 'Android', label: 'Google Play Store ready' },
            { val: '0', label: 'Hours tied to a desk' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#d946ef', letterSpacing: -1 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>The Problem</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Desktop-only software limits growth.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>If you have to be physically at the gym to run the gym, you don't own a business — you own a job. And your members expect modern mobile experiences.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 900, margin: '0 auto' }}>
            {painPoints.map((p, i) => (
              <div key={i} style={{ background: '#fff', padding: 32, borderRadius: 20, border: '1px solid #fee2e2', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ width: 48, height: 48, background: '#fff1f2', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{p.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section style={{ background: '#fff', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#fae8ff', color: '#d946ef', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Apps for everyone.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#d946ef' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
                  <span style={{ fontWeight: 700, fontSize: 15, color: activeTab === i ? '#fff' : '#475569' }}>{t.label}</span>
                  <span style={{ fontSize: 11, color: '#475569', fontWeight: 500 }}>{t.sub}</span>
                </button>
              ))}
            </div>
            <div style={{ padding: 48, display: 'flex', gap: 64, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 30, fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>{tabs[activeTab].title}</h3>
                <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>{tabs[activeTab].desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {tabs[activeTab].bullets.map((b, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 600, color: '#cbd5e1' }}>
                      <CheckCircle2 size={17} color="#f0abfc" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Smartphone size={40} color="#334155" />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>📷 Add app screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#fae8ff', color: '#d946ef', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Real Scenarios</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Gym management from anywhere.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
            {scenarios.map((s, i) => (
              <div key={i} style={{ background: '#fff', padding: 28, borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.02)' }}>
                <div style={{ width: 40, height: 40, background: '#f8fafc', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: '#fff', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', textAlign: 'center', letterSpacing: -1.5, marginBottom: 48 }}>Frequently asked</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '20px 24px', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: 15, color: '#0f172a', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                </button>
                {openFaq === i && <div style={{ padding: '0 24px 20px', fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: 'linear-gradient(135deg, #a21caf 0%, #701a75 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <Smartphone size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Unchain yourself from the desk.</h2>
          <p style={{ fontSize: 18, color: '#f5d0fe', lineHeight: 1.7, marginBottom: 40 }}>Download the Trainix app and start running your fitness business from anywhere in the world.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#d946ef', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Book a Demo</button>
          </div>
          <p style={{ fontSize: 13, color: '#f5d0fe', fontWeight: 500 }}>Available on iOS & Android • Included in all plans</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MobileFriendly;
