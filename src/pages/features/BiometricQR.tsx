import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Fingerprint, ScanFace, QrCode, ShieldCheck,
  UserX, Clock, Database, Smartphone, Shield
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface BiometricQRProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <UserX size={22} color="#f87171" />,
    title: "Unauthorized access & tailgating",
    desc: "Ex-members or friends using active members' RFID cards to sneak into the gym, costing you hundreds of dollars in lost revenue every month.",
  },
  {
    icon: <Clock size={22} color="#f87171" />,
    title: "Bottlenecks during peak hours",
    desc: "Staff manually checking every member's subscription status at the desk while a line builds up outside the door.",
  },
  {
    icon: <Database size={22} color="#f87171" />,
    title: "Software and hardware don't talk",
    desc: "Your biometric machine records the punch, but you have to manually download the Excel logs and match them with your gym management software.",
  },
  {
    icon: <QrCode size={22} color="#f87171" />,
    title: "The 'I forgot my card' excuse",
    desc: "Members constantly forgetting or losing their physical access cards, forcing your staff to manually override the turnstile 20 times a day.",
  },
];

const tabs = [
  {
    label: "QR Code Entry",
    sub: "Zero hardware cost",
    title: "Dynamic QR codes on the Member App.",
    desc: "Members simply open their Trainix app, scan the dynamic QR code at the reception tablet or turnstile, and walk right in. The code refreshes every 10 seconds to prevent screenshot sharing.",
    bullets: ["No physical cards required", "Anti-screenshot protection", "Real-time subscription check"],
  },
  {
    label: "Face Recognition",
    sub: "Frictionless access",
    title: "Walk in without slowing down.",
    desc: "Integrate with top-tier face recognition terminals. The camera scans the member's face, verifies their active status in Trainix, and opens the door in under 0.3 seconds.",
    bullets: ["Zero touch entry", "Eliminates buddy-punching", "Fastest check-in method"],
  },
  {
    label: "Fingerprint Biometrics",
    sub: "Reliable & standard",
    title: "Direct cloud sync with eSSL & Matrix.",
    desc: "We integrate directly with standard biometric devices via cloud push. Enroll a fingerprint once, and it syncs across all your gym branches automatically.",
    bullets: ["Direct cloud API sync", "Multi-branch synchronization", "Fall-back local storage"],
  },
];

const scenarios = [
  {
    icon: <ScanFace size={22} color="#3b82f6" />,
    title: "The 6 PM Rush Hour",
    desc: "50 members walk in within 15 minutes. Face scanners process them instantly, opening the turnstiles without a single manual check by your staff.",
  },
  {
    icon: <ShieldCheck size={22} color="#10b981" />,
    title: "Subscription Expired",
    desc: "A member tries to scan their fingerprint, but their plan expired yesterday. The turnstile stays locked, and a red light gently reminds them to renew at the desk.",
  },
  {
    icon: <Smartphone size={22} color="#d946ef" />,
    title: "Lost RFID Card",
    desc: "Member lost their card? No need to charge them for a new one. They just use the Trainix mobile app QR scanner to get in.",
  },
];

const faqs = [
  {
    q: "Which biometric machines do you support?",
    a: "We support a wide range of cloud-enabled devices from brands like eSSL, Matrix, ZKTeco, and Hikvision. If your device supports cloud push APIs, we can integrate it.",
  },
  {
    q: "Can I use QR codes without a physical turnstile?",
    a: "Yes! You can simply place an iPad or Android tablet at the reception desk showing the 'QR Scanner Mode'. Members scan their phones against the tablet camera to check in.",
  },
  {
    q: "What happens if the internet goes down?",
    a: "Our supported biometric devices have local memory. They will continue to allow active members in based on the last sync, and push the attendance logs to Trainix once the internet is restored.",
  },
  {
    q: "Do QR codes prevent screenshot sharing?",
    a: "Yes. The QR code in the Trainix Member App is dynamic and refreshes every few seconds. A screenshot sent to a friend will be invalid by the time they try to use it.",
  },
];

export const BiometricQR: React.FC<BiometricQRProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<QrCode size={20} />, <ScanFace size={20} />, <Fingerprint size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Blue / Cyan gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0369a1 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(56,189,248,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(37,99,235,0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#bae6fd' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
                Biometric & QR Access
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Bulletproof access.{' '}
                <span style={{ background: 'linear-gradient(90deg, #7dd3fc, #e0f2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Zero friction.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#e0f2fe', marginBottom: 40, maxWidth: 480 }}>
                Stop revenue leaks from buddy-punching and unauthorized access. Integrate seamless face scanners, fingerprint biometrics, and dynamic mobile QR codes.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(59,130,246,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  View Compatible Devices
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Direct cloud integration', 'Anti-screenshot QR codes', 'Turnstile ready'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#bae6fd' }}>
                    <CheckCircle2 size={14} color="#38bdf8" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Access Device Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 320, background: '#1e293b', borderRadius: 24, padding: 16, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative', border: '2px solid #334155' }}>
                
                <div style={{ background: '#0f172a', borderRadius: 16, overflow: 'hidden', height: 420, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 140, height: 140, borderRadius: '50%', border: '2px dashed #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, position: 'relative' }}>
                     <div style={{ position: 'absolute', inset: 0, border: '4px solid transparent', borderTopColor: '#38bdf8', borderRadius: '50%', animation: 'spin 2s linear infinite' }} />
                     <ScanFace size={64} color="#38bdf8" />
                  </div>
                  
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Scanning...</div>
                  <div style={{ fontSize: 14, color: '#94a3b8' }}>Please look at the camera</div>
                  
                  {/* Success Overlay Simulation */}
                  <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={20} color="#fff" />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Access Granted</div>
                      <div style={{ fontSize: 12, color: '#a7f3d0' }}>Pro Membership Active</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 10, top: '10%', width: 200, height: 200, borderRadius: '50%', background: '#3b82f6', filter: 'blur(70px)', opacity: 0.5 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: -20, bottom: 40, width: 180, height: 180, borderRadius: '50%', background: '#0ea5e9', filter: 'blur(80px)', opacity: 0.4 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '< 0.3s', label: 'Face scan speed' },
            { val: '100%', label: 'Cloud synced' },
            { val: 'Zero', label: 'Manual check-ins' },
            { val: '24/7', label: 'Unsupervised access' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#3b82f6', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Turnstiles aren't enough.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>If your access control hardware doesn't talk instantly to your billing software, you're either letting unpaid members in, or creating a bottleneck at the desk.</p>
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
            <span style={{ background: '#dbeafe', color: '#3b82f6', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Multiple ways to verify.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#3b82f6' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                      <CheckCircle2 size={17} color="#7dd3fc" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Shield size={40} color="#334155" />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>📷 Add scanner image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#dbeafe', color: '#3b82f6', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Real Scenarios</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Access control in action.</h2>
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
      <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <ScanFace size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Stop revenue leakage at the door.</h2>
          <p style={{ fontSize: 18, color: '#bfdbfe', lineHeight: 1.7, marginBottom: 40 }}>Upgrade your access control with Trainix and ensure only paying members step onto the gym floor.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#1e40af', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Talk to Sales</button>
          </div>
          <p style={{ fontSize: 13, color: '#bfdbfe', fontWeight: 500 }}>Compatible with eSSL, Matrix, and generic QR tablets</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BiometricQR;
