import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Target, Magnet, MessageSquare, PhoneCall,
  UserPlus, TrendingUp, Filter, Calendar
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface CRMLeadsProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <Magnet size={22} color="#f87171" />,
    title: "Leads scribbled on sticky notes",
    desc: "Walk-ins write their name in a notebook. You promise to call them back, but the notebook gets lost, and they join the gym across the street.",
  },
  {
    icon: <Filter size={22} color="#f87171" />,
    title: "No follow-up system",
    desc: "A prospect says 'I'll join next month'. Your sales team forgets to call them. You lose a ₹15,000 annual membership simply due to bad memory.",
  },
  {
    icon: <TrendingUp size={22} color="#f87171" />,
    title: "Zero conversion tracking",
    desc: "You spend ₹10,000 on Facebook ads, get 50 inquiries, but have absolutely no idea how many actually converted into paying members.",
  },
  {
    icon: <PhoneCall size={22} color="#f87171" />,
    title: "Cold calling without context",
    desc: "Calling a lead and asking 'Have you visited us before?' because you have no history of their previous interactions or trial classes.",
  },
];

const tabs = [
  {
    label: "Lead Capture",
    sub: "Never lose a prospect",
    title: "Capture every inquiry instantly.",
    desc: "Whether they walk in, call, or fill out a web form, log the lead in Trainix in 10 seconds. Tag the source (Instagram, Walk-in, Referral) so you know exactly where your best customers come from.",
    bullets: ["Quick-add lead form", "Lead source tracking", "Auto-assign to sales staff"],
  },
  {
    label: "Follow-ups",
    sub: "Automated pipeline",
    title: "A pipeline that actually closes sales.",
    desc: "Move leads through a visual pipeline: New → Contacted → Trial Booked → Converted. Schedule follow-up calls with reminders. The system tells your team exactly who to call today.",
    bullets: ["Visual drag-and-drop pipeline", "Scheduled follow-up reminders", "One-click WhatsApp messaging"],
  },
  {
    label: "Conversion Analytics",
    sub: "Measure your ROI",
    title: "Stop guessing your marketing ROI.",
    desc: "See exactly what percentage of leads convert into paying members. Track conversion rates by staff member to see who your best closers are, and track by source to see which ads are actually working.",
    bullets: ["Conversion rate dashboards", "Sales staff performance tracking", "Marketing source ROI reports"],
  },
];

const scenarios = [
  {
    icon: <MessageSquare size={22} color="#0284c7" />,
    title: "Lead says 'Call me on Friday'",
    desc: "You log the lead, add a note 'Interested in PT', and schedule a follow-up for Friday at 11 AM. On Friday morning, Trainix reminds you to call.",
  },
  {
    icon: <UserPlus size={22} color="#16a34a" />,
    title: "1-Click conversion to member",
    desc: "The prospect says yes! You don't have to re-enter their data. Click 'Convert to Member', pick a plan, and send them the payment link instantly.",
  },
  {
    icon: <TrendingUp size={22} color="#8b5cf6" />,
    title: "Analyzing Instagram ad spend",
    desc: "You look at the conversion report and see that Instagram brought in 40 leads but only 2 converted, while referrals brought 10 leads and 8 converted.",
  },
  {
    icon: <Calendar size={22} color="#ea580c" />,
    title: "Booking a trial class",
    desc: "Prospect wants to try before buying. You book a free trial session in the CRM. The system texts them a reminder 2 hours before the class.",
  },
  {
    icon: <Magnet size={22} color="#e11d48" />,
    title: "Re-engaging dead leads",
    desc: "Filter the CRM for all leads older than 60 days who never joined. Send them a bulk WhatsApp blast: 'Try 3 days free this weekend!'.",
  },
  {
    icon: <Target size={22} color="#059669" />,
    title: "Sales team accountability",
    desc: "At the end of the day, you see that Rahul made 15 follow-up calls and closed 3 memberships, while Amit made 0 calls. Data doesn't lie.",
  },
];

const faqs = [
  {
    q: "Can I connect my Facebook/Instagram ads directly?",
    a: "Yes! Using our Zapier integration or webhooks, leads generated from Meta ads can automatically flow into your Trainix CRM in real-time.",
  },
  {
    q: "How does the system remind staff to follow up?",
    a: "Staff have a 'Today's Tasks' dashboard. Any scheduled follow-up calls or trials for that day appear there automatically.",
  },
  {
    q: "Can I send WhatsApp messages directly from the CRM?",
    a: "Absolutely. We have a direct WhatsApp integration. Click the WhatsApp icon next to a lead, select a template (or type a custom message), and it sends instantly.",
  },
  {
    q: "Is there a limit on how many leads I can store?",
    a: "No. You can store unlimited leads in your CRM. We don't charge per lead or per contact.",
  },
];

export const CRMLeads: React.FC<CRMLeadsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<UserPlus size={20} />, <PhoneCall size={20} />, <TrendingUp size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Deep Blue / Sky gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #082f49 0%, #0369a1 55%, #0284c7 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-25%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'rgba(56,189,248,0.2)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '8%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(14,165,233,0.15)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#bae6fd' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
                CRM & Leads
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Turn inquiries.{' '}
                <span style={{ background: 'linear-gradient(90deg, #7dd3fc, #bae6fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Into members.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#e0f2fe', marginBottom: 40, maxWidth: 480 }}>
                Throw away the paper inquiry register. Capture leads digitally, automate follow-up reminders, and track your sales pipeline in real time. Never lose a potential member again.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(2,132,199,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Book a Demo
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Visual sales pipeline', 'Follow-up reminders', 'Conversion analytics'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#bae6fd' }}>
                    <CheckCircle2 size={14} color="#38bdf8" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — CRM Kanban Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 460, background: '#f8fafc', borderRadius: 24, boxShadow: '0 40px 80px rgba(0,0,0,0.4)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                
                {/* Header */}
                <div style={{ background: '#fff', padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: '#0f172a' }}>Sales Pipeline</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>43 active leads</div>
                  </div>
                  <button style={{ background: '#0ea5e9', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700 }}>+ Add Lead</button>
                </div>

                {/* Pipeline Board */}
                <div style={{ display: 'flex', gap: 12, padding: 20, overflowX: 'auto' }}>
                  {/* Column 1 */}
                  <div style={{ minWidth: 200 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>New Lead</span>
                      <span style={{ background: '#e2e8f0', color: '#475569', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>2</span>
                    </div>
                    
                    <div style={{ background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', marginBottom: 8 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Vikram Singh</div>
                      <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Source: Instagram</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, color: '#ef4444', fontSize: 11, fontWeight: 600 }}>
                        <PhoneCall size={12} /> Call ASAP
                      </div>
                    </div>
                    
                    <div style={{ background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Neha Sharma</div>
                      <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Source: Walk-in</div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div style={{ minWidth: 200 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trial Booked</span>
                      <span style={{ background: '#e0f2fe', color: '#0284c7', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>1</span>
                    </div>
                    
                    <div style={{ background: '#fff', padding: 14, borderRadius: 12, border: '2px solid #38bdf8', boxShadow: '0 4px 12px rgba(56,189,248,0.15)' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Rahul Desai</div>
                      <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Source: Referral</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, color: '#0284c7', fontSize: 11, fontWeight: 700, background: '#e0f2fe', padding: '4px 8px', borderRadius: 6 }}>
                        <Calendar size={12} /> Today, 6:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ position: 'absolute', zIndex: -1, right: -40, top: '20%', width: 130, height: 130, borderRadius: '50%', background: '#38bdf8', filter: 'blur(50px)', opacity: 0.3 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: -30, bottom: -20, width: 160, height: 160, borderRadius: '50%', background: '#0284c7', filter: 'blur(60px)', opacity: 0.2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '+35%', label: 'Average conversion lift' },
            { val: '10s', label: 'Time to add a lead' },
            { val: 'Auto', label: 'Follow-up reminders' },
            { val: '0', label: 'Lost sticky notes' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#0284c7', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>You are leaking money through bad follow-ups.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Getting leads is expensive. Losing them because your staff forgot to call them back or lost the notebook is unacceptable. You need a system.</p>
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
            <span style={{ background: '#e0f2fe', color: '#0284c7', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Capture. Nurture. Convert.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#0284c7' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                      <CheckCircle2 size={17} color="#38bdf8" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Target size={40} color="#334155" />
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
            <span style={{ background: '#e0f2fe', color: '#0284c7', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Real Scenarios</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Sales made simple.</h2>
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
      <section style={{ background: 'linear-gradient(135deg, #0369a1 0%, #0c4a6e 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <Target size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Close more memberships today.</h2>
          <p style={{ fontSize: 18, color: '#e0f2fe', lineHeight: 1.7, marginBottom: 40 }}>Throw away the paper register. Manage your sales pipeline digitally and watch your conversion rates soar.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#0284c7', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Book a Demo</button>
          </div>
          <p style={{ fontSize: 13, color: '#e0f2fe', fontWeight: 500 }}>No setup fees • Cancel anytime • Built for modern gyms</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CRMLeads;
