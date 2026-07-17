import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  CalendarCheck, Clock, Fingerprint, QrCode,
  Users, BarChart3, Bell, UserX
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface AttendanceTrackingProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <Users size={22} color="#f87171" />,
    title: "Ghost members",
    desc: "Members pay for 6 months but stop coming after week 2. You don't realize they're gone until their renewal date, at which point they refuse to renew.",
  },
  {
    icon: <Clock size={22} color="#f87171" />,
    title: "Staff arriving late",
    desc: "Trainers claim they arrived at 6:00 AM, but the gym was actually opened at 6:30 AM by the cleaner. You have no verifiable proof of staff timings.",
  },
  {
    icon: <UserX size={22} color="#f87171" />,
    title: "Buddy punching",
    desc: "Members sharing ID cards or staff signing in for their friends. You are losing money to unauthorized access.",
  },
  {
    icon: <BarChart3 size={22} color="#f87171" />,
    title: "Peak hour chaos",
    desc: "You don't know exactly when your gym is most crowded, leading to understaffing during rushes and overstaffing during dead hours.",
  },
];

const tabs = [
  {
    label: "Member Tracking",
    sub: "Stop losing drop-offs",
    title: "Know exactly who is coming, and who isn't.",
    desc: "Track every single visit. Set up automated 'We miss you' WhatsApp messages when a member hasn't visited in 7 days. Catch them before they lose motivation and churn.",
    bullets: ["Automated absent alerts", "Total visits per month reporting", "Average workout duration tracking"],
  },
  {
    label: "Staff Attendance",
    sub: "Accountability matters",
    title: "Verified staff check-ins.",
    desc: "Keep your trainers and receptionists accountable. Track exact check-in and check-out times, calculate total hours worked, and automatically deduct pay for late arrivals or unapproved leaves.",
    bullets: ["Precise time-logging", "Auto-salary deduction for lates", "Shift schedule enforcement"],
  },
  {
    label: "Hardware Sync",
    sub: "Biometrics & Scanners",
    title: "Hardware that just works.",
    desc: "Trainix syncs flawlessly with biometric fingerprint scanners, face recognition devices, and QR turnstiles. The moment a finger is placed, the check-in reflects on your dashboard in 0.5 seconds.",
    bullets: ["Essl / Mantra / Realtime device support", "Face recognition ready", "Instant cloud sync via API"],
  },
];

const scenarios = [
  {
    icon: <Fingerprint size={22} color="#ea580c" />,
    title: "Member places thumb",
    desc: "BEEP. The turnstile opens. On the receptionist's screen, the member's profile pops up with a big green 'Active' badge and a 'Happy Birthday' alert.",
  },
  {
    icon: <Bell size={22} color="#3b82f6" />,
    title: "The 10-day absence",
    desc: "A member hasn't shown up for 10 days. The system automatically sends them a WhatsApp: 'Hey Priya, missing you at the gym! Let's hit a session tomorrow?'",
  },
  {
    icon: <Clock size={22} color="#e11d48" />,
    title: "Trainer is late",
    desc: "Trainer arrives at 7:15 AM for a 7:00 AM shift. The system logs a 'Late Arrival' flag and optionally deducts the penalty from their end-of-month payout.",
  },
  {
    icon: <BarChart3 size={22} color="#8b5cf6" />,
    title: "Optimizing AC usage",
    desc: "You check the 'Peak Hours' graph and see the gym is empty from 1 PM to 4 PM. You schedule the AC to power down during these hours, saving electricity.",
  },
  {
    icon: <QrCode size={22} color="#10b981" />,
    title: "Contactless QR entry",
    desc: "Instead of buying expensive biometric machines, you put an iPad at the front desk. Members open their Trainix app, scan the QR, and walk right in.",
  },
  {
    icon: <Users size={22} color="#f59e0b" />,
    title: "End of month payroll",
    desc: "No more manually counting days in a register. The system generates a single report: 'Rahul: 26 Days Present, 2 Days Late, 2 Paid Leaves'. Salary calculated instantly.",
  },
];

const faqs = [
  {
    q: "Which biometric machines are compatible?",
    a: "We integrate with 99% of cloud-push devices in the market, including Essl, Realtime, Mantra, and ZKTeco. If it supports HTTP Push APIs, it works with Trainix.",
  },
  {
    q: "Do I need a biometric machine to use Attendance?",
    a: "No! You can use our Mobile App QR Code scanner, or the receptionist can manually click 'Mark Present' on the dashboard when a member walks in.",
  },
  {
    q: "What happens if the internet goes down at the gym?",
    a: "Most modern biometric machines store attendance logs locally (up to 100,000 logs). The moment the internet is restored, the machine will push all pending logs to the Trainix cloud automatically.",
  },
  {
    q: "Can I restrict members from entering if their plan expired?",
    a: "Yes. We can link directly to turnstiles or magnetic doors. If a member's plan is expired or they have unpaid dues, the door simply will not open for them.",
  },
];

export const AttendanceTracking: React.FC<AttendanceTrackingProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<Users size={20} />, <Clock size={20} />, <Fingerprint size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Emerald / Green gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #047857 55%, #059669 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-25%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'rgba(52,211,153,0.2)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '8%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#a7f3d0' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                Attendance Tracking
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Every check-in.{' '}
                <span style={{ background: 'linear-gradient(90deg, #6ee7b7, #a7f3d0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Logged instantly.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#d1fae5', marginBottom: 40, maxWidth: 480 }}>
                Sync with biometric scanners or use mobile QR codes. Track member retention, automate staff payroll based on hours worked, and never let a member quietly drop off again.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#059669', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(5,150,105,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Book a Demo
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Biometric sync', 'QR check-ins', 'Absentee auto-alerts'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#a7f3d0' }}>
                    <CheckCircle2 size={14} color="#34d399" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Live Dashboard Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 24, boxShadow: '0 40px 80px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
                
                {/* Header */}
                <div style={{ background: '#0f172a', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Live Dashboard</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#34d399', background: 'rgba(52,211,153,0.1)', padding: '4px 10px', borderRadius: 100 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399' }} /> Online
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 12 }}>
                      <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 4 }}>Total Walk-ins</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>184</div>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 12 }}>
                      <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 4 }}>Staff Present</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>6/8</div>
                    </div>
                  </div>
                </div>

                {/* Log Feed */}
                <div style={{ padding: '0 24px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '20px 0 12px' }}>Recent Scans</div>
                  
                  {[
                    { name: 'Karan Mehra', type: 'Member', time: 'Just now', status: 'Active', bg: '#ecfdf5', text: '#059669', icon: <Fingerprint size={14} color="#059669" /> },
                    { name: 'Rahul Desai (Trainer)', type: 'Staff', time: '12 mins ago', status: 'Checked In', bg: '#f0f9ff', text: '#0284c7', icon: <Clock size={14} color="#0284c7" /> },
                    { name: 'Sneha Patel', type: 'Member', time: '18 mins ago', status: 'Expired', bg: '#fef2f2', text: '#dc2626', icon: <QrCode size={14} color="#dc2626" /> },
                    { name: 'Amit Kumar', type: 'Member', time: '45 mins ago', status: 'Active', bg: '#ecfdf5', text: '#059669', icon: <Fingerprint size={14} color="#059669" /> },
                  ].map((scan, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: scan.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {scan.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{scan.name}</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{scan.time}</div>
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: scan.text, background: scan.bg, padding: '4px 8px', borderRadius: 6 }}>
                        {scan.status}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ height: 16 }} />
              </div>

              <div style={{ position: 'absolute', zIndex: -1, right: -40, top: '20%', width: 130, height: 130, borderRadius: '50%', background: '#34d399', filter: 'blur(50px)', opacity: 0.3 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: -30, bottom: -20, width: 160, height: 160, borderRadius: '50%', background: '#059669', filter: 'blur(60px)', opacity: 0.2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '<0.5s', label: 'Scanner sync speed' },
            { val: '99%', label: 'Biometric device support' },
            { val: 'Auto', label: 'Absentee notifications' },
            { val: '0', label: 'Buddy punching incidents' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#059669', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Paper registers don't build businesses.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>If you aren't tracking exactly who is coming to your gym, you can't prevent members from churning, and you can't verify if your staff is actually showing up on time.</p>
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
            <span style={{ background: '#d1fae5', color: '#059669', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Turn data into retention.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#059669' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                      <CheckCircle2 size={17} color="#34d399" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <CalendarCheck size={40} color="#334155" />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>📷 Add screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#d1fae5', color: '#059669', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Real Scenarios</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Smarter gym operations.</h2>
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
      <section style={{ background: 'linear-gradient(135deg, #047857 0%, #064e3b 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <CalendarCheck size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Stop guessing. Start tracking.</h2>
          <p style={{ fontSize: 18, color: '#d1fae5', lineHeight: 1.7, marginBottom: 40 }}>Plug in a scanner, catch dropping members before they cancel, and track your staff's real working hours effortlessly.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#059669', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Book a Demo</button>
          </div>
          <p style={{ fontSize: 13, color: '#d1fae5', fontWeight: 500 }}>Compatible with 99% of devices • Unlimited logs • Auto-sync</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AttendanceTracking;
