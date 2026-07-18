import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  LineChart, PieChart, Activity, 
  TrendingUp, BarChart3, Presentation
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface AnalyticsReportsProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <LineChart size={22} color="#64748b" />,
    title: "Blind decision making",
    desc: "Gym owners guess what marketing channels work or when to hire more staff because they don't have hard data to look at.",
  },
  {
    icon: <Activity size={22} color="#64748b" />,
    title: "Unnoticed churn",
    desc: "Members slowly stop attending, but you only find out when they cancel. There's no early warning system for dropping engagement.",
  },
  {
    icon: <BarChart3 size={22} color="#64748b" />,
    title: "Excel spreadsheet hell",
    desc: "Spending every Sunday manually combining export files from 3 different software tools just to figure out last month's revenue.",
  },
];

const tabs = [
  {
    label: "Growth Metrics",
    sub: "Revenue & Acquisition",
    title: "See how fast you're growing.",
    desc: "Visualize your Monthly Recurring Revenue (MRR), new member sign-ups, and lead conversion rates. Understand exactly which plans are driving the most profit.",
    bullets: ["MRR tracking", "Lead conversion funnels", "Revenue heatmaps"],
  },
  {
    label: "Retention Data",
    sub: "Stop churn early",
    title: "Keep the members you have.",
    desc: "Track average attendance frequencies. Identify 'At-Risk' members who haven't visited in 14+ days and trigger automated re-engagement campaigns.",
    bullets: ["At-Risk member lists", "Average lifespan value (LTV)", "Attendance trends"],
  },
  {
    label: "Export & Share",
    sub: "For stakeholders",
    title: "Board-ready reports.",
    desc: "Generate beautiful PDF reports or raw CSV data for investors, partners, or accountants with a single click. Schedule them to auto-email every Monday.",
    bullets: ["Scheduled email reports", "PDF & CSV exports", "Multi-branch consolidation"],
  },
];

const scenarios = [
  {
    icon: <TrendingUp size={22} color="#475569" />,
    title: "The Marketing Pivot",
    desc: "You look at your lead source chart and realize Instagram ads bring in 3x more conversions than flyers. You instantly reallocate your budget.",
  },
  {
    icon: <Activity size={22} color="#64748b" />,
    title: "Saving a Member",
    desc: "The dashboard highlights 5 members who haven't visited in 3 weeks. You send them a personalized text, 3 of them return, saving you $150/mo in churn.",
  },
  {
    icon: <Presentation size={22} color="#94a3b8" />,
    title: "Investor Updates",
    desc: "You're opening a second location. You export a 12-month consolidated growth report that looks incredibly professional and secures your bank loan.",
  },
];

const faqs = [
  {
    q: "Can I view data across multiple gym branches?",
    a: "Yes! If you have multiple locations, you can view a consolidated dashboard or drill down into branch-specific metrics.",
  },
  {
    q: "Are the reports updated in real-time?",
    a: "Absolutely. Every time a member signs up, pays, or scans in at the door, the analytics dashboard updates instantly.",
  },
  {
    q: "Can I set goals within the dashboard?",
    a: "Yes, you can set monthly targets for Revenue, New Members, and Retention, and track your progress visually.",
  },
  {
    q: "Is there a limit to how far back I can view data?",
    a: "No, Trainix stores your historical data indefinitely, allowing you to run Year-over-Year (YoY) comparisons effortlessly.",
  },
];

export const AnalyticsReports: React.FC<AnalyticsReportsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<LineChart size={20} />, <Activity size={20} />, <Presentation size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Slate/Dark Blue gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(100,116,139,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(148,163,184,0.1)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#e2e8f0' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', display: 'inline-block' }} />
                Analytics & Reports
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Data driven.{' '}
                <span style={{ background: 'linear-gradient(90deg, #cbd5e1, #f8fafc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Gym growth.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#cbd5e1', marginBottom: 40, maxWidth: 480 }}>
                Stop guessing. Make strategic decisions based on real-time data about your revenue, attendance, and member retention.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#475569', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(71,85,105,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  View Live Dashboard
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Real-time metrics', 'Custom exports', 'Multi-branch support'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>
                    <CheckCircle2 size={14} color="#94a3b8" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — App Mockup for Stats */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 440, background: '#1e293b', borderRadius: 24, padding: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative', border: '2px solid #334155' }}>
                <div style={{ background: '#f8fafc', borderRadius: 16, overflow: 'hidden' }}>
                  
                  {/* Header */}
                  <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: '#0f172a' }}>Performance</div>
                      <div style={{ fontSize: 13, color: '#64748b' }}>Last 30 Days</div>
                    </div>
                    <div style={{ padding: '6px 12px', background: '#e2e8f0', borderRadius: 8, fontSize: 12, fontWeight: 700, color: '#475569' }}>Export</div>
                  </div>

                  {/* Content Area */}
                  <div style={{ padding: 24 }}>
                    
                    {/* Top Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                      <div style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Total Revenue</div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>$24,500</div>
                        <div style={{ fontSize: 11, color: '#10b981', fontWeight: 700, marginTop: 4 }}>+12% vs last month</div>
                      </div>
                      <div style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>New Members</div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>142</div>
                        <div style={{ fontSize: 11, color: '#10b981', fontWeight: 700, marginTop: 4 }}>+5% vs last month</div>
                      </div>
                    </div>

                    {/* Chart Mockup */}
                    <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Revenue Growth</div>
                      <div style={{ display: 'flex', alignItems: 'flex-end', height: 120, gap: 12, paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ flex: 1, height: '40%', background: '#cbd5e1', borderRadius: '4px 4px 0 0' }}></div>
                        <div style={{ flex: 1, height: '55%', background: '#94a3b8', borderRadius: '4px 4px 0 0' }}></div>
                        <div style={{ flex: 1, height: '45%', background: '#64748b', borderRadius: '4px 4px 0 0' }}></div>
                        <div style={{ flex: 1, height: '70%', background: '#475569', borderRadius: '4px 4px 0 0' }}></div>
                        <div style={{ flex: 1, height: '90%', background: '#334155', borderRadius: '4px 4px 0 0' }}></div>
                        <div style={{ flex: 1, height: '100%', background: '#0f172a', borderRadius: '4px 4px 0 0' }}></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 20, top: '20%', width: 160, height: 160, borderRadius: '50%', background: '#475569', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: 0, bottom: 20, width: 200, height: 200, borderRadius: '50%', background: '#334155', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: 'Real-time', label: 'Dashboard Updates' },
            { val: 'Unlimited', label: 'Historical Data' },
            { val: 'Automated', label: 'Email Reports' },
            { val: 'Multi', label: 'Branch Support' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#334155', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Operating in the dark.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Without clear data, gym owners make emotional decisions instead of logical ones. You can't fix what you aren't measuring.</p>
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
            <span style={{ background: '#f1f5f9', color: '#334155', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Insights at a glance.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#475569' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                      <CheckCircle2 size={17} color="#94a3b8" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                {activeTab === 0 ? <LineChart size={40} color="#64748b" /> : activeTab === 1 ? <Activity size={40} color="#64748b" /> : <Presentation size={40} color="#64748b" />}
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>
                  {activeTab === 0 ? 'Growth Charts' : activeTab === 1 ? 'Retention Data' : 'PDF Exports'}
                </span>
              </div>
            </div>
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
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <BarChart3 size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Measure what matters.</h2>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 40 }}>Make intelligent, data-driven decisions that increase revenue and decrease churn.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#0f172a', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
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

export default AnalyticsReports;
