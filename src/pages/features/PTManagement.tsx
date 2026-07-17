import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Clock, BarChart2, Calendar, Users, Star,
  Smartphone, TrendingUp, Zap, Target,
  DollarSign, ClipboardList, UserCheck, Award
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface PTManagementProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <Clock size={22} color="#f87171" />,
    title: "PT sessions tracked in paper registers",
    desc: "Trainers log sessions in notebooks or Excel. At month-end, you're manually counting sessions to calculate dues — errors guaranteed.",
  },
  {
    icon: <DollarSign size={22} color="#f87171" />,
    title: "Clients dispute session counts",
    desc: "No proof, no records. Clients argue about how many PT sessions remain, and you have no audit trail to resolve it professionally.",
  },
  {
    icon: <BarChart2 size={22} color="#f87171" />,
    title: "Zero visibility into client progress",
    desc: "Body measurements, strength milestones, and weight loss tracked in scattered WhatsApp messages. Nothing centralized, nothing shareable.",
  },
  {
    icon: <Calendar size={22} color="#f87171" />,
    title: "Renewals fall through the cracks",
    desc: "PT packages expire silently. No auto-reminder means the client stops coming. You notice only when their name vanishes from the roster.",
  },
];

const tabs = [
  {
    label: "Sessions",
    sub: "Log & track every PT",
    title: "Every session. Logged instantly.",
    desc: "Trainers mark sessions complete from their mobile app the moment they happen. Client gets notified. Balance updates automatically. No paper, no confusion — an exact audit trail you can show any client, any time.",
    bullets: ["One-tap session logging from trainer app", "Client session balance auto-updates", "Full session history with timestamps"],
  },
  {
    label: "Progress",
    sub: "Client body metrics",
    title: "Track the transformation, not just the session.",
    desc: "Log body weight, body fat %, chest, waist, hip measurements, and strength milestones after every session. Generate a visual progress chart for the client. Nothing motivates renewals like showing them their own data.",
    bullets: ["Weight, body fat, girth measurements", "Progress photos linked to session dates", "Auto-generated progress PDF for client"],
  },
  {
    label: "Billing",
    sub: "PT packages & renewals",
    title: "PT packages that sell and renew themselves.",
    desc: "Create unlimited PT package types — 8 sessions, 12 sessions, monthly, quarterly. Assign to members, track remaining sessions, and fire automatic renewal reminders 3 days before the package expires.",
    bullets: ["Flexible session-count packages", "Auto renewal WhatsApp reminder", "Online payment link on renewal nudge"],
  },
];

const scenarios = [
  {
    icon: <Award size={22} color="#f59e0b" />,
    title: "Client asks 'how many sessions left?'",
    desc: "Trainer opens the app. Shows client the remaining session count and last session date in real time. Zero arguments, zero awkwardness.",
  },
  {
    icon: <Target size={22} color="#ef4444" />,
    title: "Month-end PT billing in 2 minutes",
    desc: "Every session logged. Every package tracked. Export a clean billing report or send individual payment links — done before your morning chai.",
  },
  {
    icon: <TrendingUp size={22} color="#22c55e" />,
    title: "Progress report closes the renewal",
    desc: "Client says she's thinking about it. You pull up 3 months of body measurements and a before/after comparison. She renews on the spot.",
  },
  {
    icon: <Users size={22} color="#3b82f6" />,
    title: "Trainer assigned, client notified",
    desc: "Assign a PT trainer to a new client. Client gets a WhatsApp introducing the trainer, their bio, and schedule. Professional from day one.",
  },
  {
    icon: <Zap size={22} color="#8b5cf6" />,
    title: "Package expires → auto WhatsApp fires",
    desc: "3 days before expiry, a renewal reminder with a payment link goes out automatically. No reminder, no manual follow-up needed.",
  },
  {
    icon: <Star size={22} color="#ec4899" />,
    title: "Top PT clients get referral rewards",
    desc: "Tag high-value PT clients, export their contact list, and send a referral campaign with one click. Your best clients bring you more clients.",
  },
];

const steps = [
  { title: "Create PT packages", desc: "Define session counts, validity, and pricing once. Reuse for every client." },
  { title: "Assign trainer & client", desc: "Link a PT trainer to the member. Both get app access immediately." },
  { title: "Log sessions live", desc: "Trainer taps 'Session Done'. Balance updates. Client sees it in real time." },
  { title: "Auto-renew reminders", desc: "System sends WhatsApp 3 days before package expires. Client pays, package extends." },
];

const faqs = [
  {
    q: "Can a member have both a gym membership and a PT package?",
    a: "Yes. PT packages are completely separate from the gym membership. A member can hold an active annual membership and an 8-session PT package simultaneously, each tracked independently.",
  },
  {
    q: "What if the trainer forgets to log a session?",
    a: "Admins can manually add sessions with a date and note. Every manual addition is logged with the admin's name for full accountability.",
  },
  {
    q: "Can clients see their own session history?",
    a: "Yes. The member app shows remaining sessions, completed session history with dates, and progress measurements logged by the trainer.",
  },
  {
    q: "How does PT billing work with Razorpay?",
    a: "When a renewal reminder fires, a payment link is included. The client pays online, the package auto-extends, and the trainer is notified. Zero manual steps.",
  },
  {
    q: "Can one member have multiple active PT packages?",
    a: "Yes — for example, a strength package and a yoga package from different trainers, each with its own session balance and history.",
  },
];

export const PTManagement: React.FC<PTManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<ClipboardList size={20} />, <BarChart2 size={20} />, <DollarSign size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — deep navy + indigo gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #0a0a23 0%, #1e1b4b 55%, #312e81 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-25%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'rgba(99,102,241,0.2)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '8%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(139,92,246,0.15)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#c7d2fe' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#818cf8', display: 'inline-block' }} />
                PT Management
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Every PT session.{' '}
                <span style={{ background: 'linear-gradient(90deg, #a5b4fc, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Tracked. Billed. Renewed.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#c7d2fe', marginBottom: 40, maxWidth: 480 }}>
                Replace PT paper registers with a live session tracker. Clients see their balance, trainers log in one tap, and renewals happen automatically. Your PT revenue — finally under control.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(99,102,241,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Book a Demo
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Session audit trail', 'Auto renewal reminders', 'Progress tracking built-in'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#c7d2fe' }}>
                    <CheckCircle2 size={14} color="#818cf8" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — PT session card mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 380, background: '#fff', borderRadius: 24, boxShadow: '0 40px 80px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '20px 24px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Active PT Package</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 26, color: '#fff' }}>Priya Sharma</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>Strength & Conditioning · Ravi Kumar</div>
                    </div>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#fff' }}>PS</div>
                  </div>
                </div>

                {/* Session balance */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 32, fontWeight: 900, color: '#6366f1' }}>4</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Remaining</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 32, fontWeight: 900, color: '#0f172a' }}>8</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 32, fontWeight: 900, color: '#16a34a' }}>4</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Done</div>
                    </div>
                  </div>
                  <div style={{ height: 8, background: '#f1f5f9', borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '50%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: 100 }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'right', marginTop: 6, fontWeight: 500 }}>Expires Dec 15, 2026</div>
                </div>

                {/* Recent sessions */}
                <div style={{ padding: '12px 24px 16px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Recent Sessions</div>
                  {[
                    { date: 'Jul 17', note: 'Deadlift PR: 80kg', done: true },
                    { date: 'Jul 15', note: 'Upper body hypertrophy', done: true },
                    { date: 'Jul 13', note: 'HIIT cardio circuit', done: true },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < 2 ? '1px solid #f8fafc' : 'none' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={14} color="#6366f1" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{s.note}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.date}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '12px 24px 20px' }}>
                  <button style={{ width: '100%', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 0', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <UserCheck size={16} /> Log Today's Session
                  </button>
                </div>
              </div>

              <div style={{ position: 'absolute', zIndex: -1, right: -40, top: '20%', width: 130, height: 130, borderRadius: '50%', background: '#818cf8', filter: 'blur(50px)', opacity: 0.3 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: -30, bottom: -20, width: 160, height: 160, borderRadius: '50%', background: '#8b5cf6', filter: 'blur(60px)', opacity: 0.2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '1 tap', label: 'Session logging speed' },
            { val: '0', label: 'Session count disputes' },
            { val: 'Auto', label: 'Renewal reminders sent' },
            { val: '100%', label: 'Audit trail accuracy' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#6366f1', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>PT revenue is leaking everywhere.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Most gyms lose 20–30% of PT revenue to under-counted sessions, missed renewals, and disputes that could have been prevented.</p>
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
            <span style={{ background: '#ffedd5', color: '#ea580c', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Sessions. Progress. Billing. One system.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#ea580c' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                      <CheckCircle2 size={17} color="#fb923c" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Smartphone size={40} color="#334155" />
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
            <span style={{ background: '#ffedd5', color: '#ea580c', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Real Scenarios</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>PT management that actually pays for itself.</h2>
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

      {/* ══ STEPS ══ */}
      <section style={{ background: '#fff', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#ffedd5', color: '#ea580c', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Setup</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>PT live in 4 steps. Running forever.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, maxWidth: 1100, margin: '0 auto 48px' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: '#fff', padding: '32px 24px 28px', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', position: 'relative', marginTop: 20 }}>
                <div style={{ position: 'absolute', top: -18, left: 24, width: 36, height: 36, borderRadius: '50%', background: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, boxShadow: '0 4px 12px rgba(234,88,12,0.3)', border: '3px solid #fff' }}>{i + 1}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 10, marginTop: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', textAlign: 'center', letterSpacing: -1.5, marginBottom: 48 }}>Frequently asked</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
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
      <section style={{ background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <Target size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Stop letting PT revenue walk out the door.</h2>
          <p style={{ fontSize: 18, color: '#fed7aa', lineHeight: 1.7, marginBottom: 40 }}>Every session logged. Every package tracked. Every renewal sent automatically. Your PT business — finally running like a business.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#ea580c', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Book a Demo</button>
          </div>
          <p style={{ fontSize: 13, color: '#fed7aa', fontWeight: 500 }}>No setup fees • Cancel anytime • Built for modern gyms</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PTManagement;
