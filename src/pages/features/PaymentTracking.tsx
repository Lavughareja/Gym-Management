import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  CreditCard, Clock, BellRing, 
  Smartphone, ShieldCheck, Banknote
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface PaymentTrackingProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <Clock size={22} color="#10b981" />,
    title: "Chasing late payments",
    desc: "Gym owners spend hours every week manually calling members who forgot to pay their dues, creating awkward conversations.",
  },
  {
    icon: <BellRing size={22} color="#10b981" />,
    title: "No automated reminders",
    desc: "Members simply forget when their plan expires. Without an automated nudge, they might go weeks without renewing.",
  },
  {
    icon: <ShieldCheck size={22} color="#10b981" />,
    title: "Cash mismanagement",
    desc: "Relying on a notebook or simple Excel sheet makes it easy for staff to misreport cash collections or lose track of pending amounts.",
  },
];

const tabs = [
  {
    label: "Auto Reminders",
    sub: "Set it and forget it",
    title: "Never chase a payment again.",
    desc: "Trainix automatically sends WhatsApp and Push Notification reminders to members 3 days before expiry, on the day of expiry, and post-expiry, completely removing the awkwardness of asking for money.",
    bullets: ["WhatsApp Integration", "Customizable message templates", "Multi-stage reminder logic"],
  },
  {
    label: "Pending Dues",
    sub: "One clear dashboard",
    title: "Know exactly who owes what.",
    desc: "Get a clear, sorted list of all pending payments. See exactly which members are past due, the amount owed, and when they were last contacted. Resolve dues with one click.",
    bullets: ["Sort by days overdue", "One-click payment collection", "Partial payment tracking"],
  },
  {
    label: "Online Collection",
    sub: "Frictionless renewals",
    title: "Let them pay from their couch.",
    desc: "Members receive a secure payment link via SMS or WhatsApp. They can renew their membership instantly using credit cards, UPI, or Apple/Google Pay without ever visiting the front desk.",
    bullets: ["Stripe & Razorpay support", "Instant ledger updates", "Zero manual data entry"],
  },
];

const scenarios = [
  {
    icon: <Smartphone size={22} color="#34d399" />,
    title: "The Midnight Renewal",
    desc: "A member gets a WhatsApp reminder at 8 PM. They click the link and pay via Apple Pay. Their access is instantly renewed, and the money is in your account by morning.",
  },
  {
    icon: <Banknote size={22} color="#10b981" />,
    title: "Partial Cash Payment",
    desc: "A student wants to pay half their yearly fee in cash today, and the rest next month. You easily log a partial payment, and Trainix automatically schedules a reminder for the balance.",
  },
  {
    icon: <CreditCard size={22} color="#059669" />,
    title: "Turnstile Lockout",
    desc: "A member who is 5 days overdue tries to scan their QR code at the door. Trainix gently blocks entry and prompts them to pay their pending balance right there on their phone.",
  },
];

const faqs = [
  {
    q: "Can I log manual cash payments?",
    a: "Yes, you can easily log cash, cheque, or external bank transfers. The system will instantly generate a digital receipt for the member.",
  },
  {
    q: "Does Trainix take a cut of my online payments?",
    a: "No! Trainix charges zero transaction fees. You only pay the standard processing fees of your payment gateway (e.g., Stripe or Razorpay).",
  },
  {
    q: "Are the WhatsApp messages sent from my own number?",
    a: "Yes, we integrate with the official WhatsApp Cloud API so messages are branded with your gym's name and number.",
  },
  {
    q: "Can I track post-dated cheques?",
    a: "Yes, you can log post-dated cheques and set their clearance dates. Trainix will remind you to deposit them on the correct day.",
  },
];

export const PaymentTracking: React.FC<PaymentTrackingProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<BellRing size={20} />, <Clock size={20} />, <Smartphone size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Emerald gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(52,211,153,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#a7f3d0' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                Payment Tracking
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Never miss a{' '}
                <span style={{ background: 'linear-gradient(90deg, #6ee7b7, #ecfdf5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  payment.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#d1fae5', marginBottom: 40, maxWidth: 480 }}>
                Automate your renewals, collect pending dues instantly, and let the system chase payments so you can focus on building your gym.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#059669', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(5,150,105,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  View Dashboard
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['WhatsApp Reminders', 'Partial Payments', 'Online Links'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#a7f3d0' }}>
                    <CheckCircle2 size={14} color="#34d399" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — App Mockup for Stats */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 280, background: '#1e293b', borderRadius: 40, padding: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative', border: '2px solid #334155' }}>
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 24, background: '#000', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10 }}></div>
                
                <div style={{ background: '#f8fafc', borderRadius: 32, overflow: 'hidden', height: 580, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <div style={{ background: '#0f172a', padding: '48px 20px 24px', color: '#fff' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Pending Dues</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>$3,250 outstanding</div>
                  </div>

                  {/* Content Area */}
                  <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
                    
                    {/* Member Card 1 */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #fee2e2', marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
                       <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#ef4444' }}></div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                         <div>
                           <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Alex Johnson</div>
                           <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 600, marginTop: 2 }}>5 days overdue</div>
                         </div>
                         <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>$150</div>
                       </div>
                       <div style={{ display: 'flex', gap: 8 }}>
                         <button style={{ flex: 1, padding: '8px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                           <BellRing size={14} /> Nudge
                         </button>
                         <button style={{ flex: 1, padding: '8px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                           <CreditCard size={14} /> Pay
                         </button>
                       </div>
                    </div>

                    {/* Member Card 2 */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #fef08a', marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
                       <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#eab308' }}></div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                         <div>
                           <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Sarah Smith</div>
                           <div style={{ fontSize: 12, color: '#eab308', fontWeight: 600, marginTop: 2 }}>Due today</div>
                         </div>
                         <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>$120</div>
                       </div>
                       <div style={{ display: 'flex', gap: 8 }}>
                         <button style={{ flex: 1, padding: '8px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                           <BellRing size={14} /> Nudge
                         </button>
                         <button style={{ flex: 1, padding: '8px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                           <CreditCard size={14} /> Pay
                         </button>
                       </div>
                    </div>
                    
                    {/* Member Card 3 */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
                       <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#94a3b8' }}></div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                         <div>
                           <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Marcus Cole</div>
                           <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginTop: 2 }}>Partial Balance</div>
                         </div>
                         <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>$80</div>
                       </div>
                       <div style={{ display: 'flex', gap: 8 }}>
                         <button style={{ flex: 1, padding: '8px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                           <CreditCard size={14} /> Pay Balance
                         </button>
                       </div>
                    </div>

                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 20, top: '20%', width: 160, height: 160, borderRadius: '50%', background: '#059669', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: 0, bottom: 20, width: 200, height: 200, borderRadius: '50%', background: '#34d399', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '-85%', label: 'Pending Dues' },
            { val: 'Automated', label: 'WhatsApp Reminders' },
            { val: 'Instant', label: 'Ledger Updates' },
            { val: '0%', label: 'Transaction Fees' },
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Cashflow should be predictable.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Chasing members for payments is uncomfortable and time-consuming. When renewals slip through the cracks, your gym loses money.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>A self-driving billing engine.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#10b981' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                {activeTab === 0 ? <BellRing size={40} color="#334155" /> : activeTab === 1 ? <Clock size={40} color="#334155" /> : <Smartphone size={40} color="#334155" />}
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>
                  {activeTab === 0 ? 'Automated Comms' : activeTab === 1 ? 'Ledger UI' : 'Payment Links'}
                </span>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Built for real-world gyms.</h2>
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
      <section style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <Banknote size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Take control of your cashflow.</h2>
          <p style={{ fontSize: 18, color: '#a7f3d0', lineHeight: 1.7, marginBottom: 40 }}>Stop chasing members for payments and let Trainix handle the heavy lifting of billing and collections.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#064e3b', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Talk to Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentTracking;
