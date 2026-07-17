import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  LineChart, Calculator, Scale, 
  Camera, TrendingUp, Apple, Utensils
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface BMIMacroReportsProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <Scale size={22} color="#f87171" />,
    title: "Blind progress",
    desc: "Members lose motivation because they don't see day-to-day weight changes. Without data to show them they are actually making progress, they churn.",
  },
  {
    icon: <Calculator size={22} color="#f87171" />,
    title: "Disjointed tools",
    desc: "Trainers use one app for workouts, a second app for calorie tracking, and a messy Excel sheet for body measurements. Data is everywhere.",
  },
  {
    icon: <TrendingUp size={22} color="#f87171" />,
    title: "Inaccurate estimations",
    desc: "Guessing body fat percentage or relying purely on the weighing scale fails to tell the full story of muscle gain versus fat loss.",
  },
];

const tabs = [
  {
    label: "Body Metrics",
    sub: "Track everything",
    title: "A complete picture of their health.",
    desc: "Log weight, body fat percentage, muscle mass, and detailed circumferences (chest, arms, waist). Trainix automatically graphs these over time so members can visually see their transformation.",
    bullets: ["Visual progress charts", "Fat vs Muscle analysis", "Automated BMI calculation"],
  },
  {
    label: "Progress Photos",
    sub: "See the change",
    title: "Before and After, organized.",
    desc: "Members or trainers can snap front, back, and side profile photos. Trainix stores them chronologically with date overlays, making it incredibly easy to generate side-by-side comparison graphics.",
    bullets: ["Secure chronological storage", "1-click comparison collages", "Great for social media testimonials"],
  },
  {
    label: "Macro Tracking",
    sub: "Nutrition accountability",
    title: "Calories in, accurately tracked.",
    desc: "Set specific protein, carb, and fat targets for your clients. They can log their meals directly in the member app, and trainers get a dashboard view of their adherence.",
    bullets: ["Custom daily macro goals", "Adherence dashboard", "Integration with workout burn"],
  },
];

const scenarios = [
  {
    icon: <Camera size={22} color="#3b82f6" />,
    title: "The 90-Day Transformation",
    desc: "A member finishes a 12-week boot camp. You pull up their Day 1 vs Day 90 progress photos with their body fat drop overlaid. They share it on Instagram, bringing you 3 new leads.",
  },
  {
    icon: <LineChart size={22} color="#10b981" />,
    title: "Course Correction",
    desc: "A client complains they aren't losing weight. You check their macro dashboard and see they are hitting their protein but consistently exceeding their carb limit by 200g.",
  },
  {
    icon: <Apple size={22} color="#f43f5e" />,
    title: "Goal Milestone Alerts",
    desc: "When a member finally hits their target weight of 75kg, the app throws digital confetti and sends a congratulatory push notification, cementing their loyalty to your gym.",
  },
];

const faqs = [
  {
    q: "Can members log their own measurements?",
    a: "Yes, members can input their own weight and measurements via their app. However, trainers can lock this feature so that only official gym staff can enter verified data.",
  },
  {
    q: "Does it integrate with smart scales (like InBody)?",
    a: "Yes! Trainix can import CSV exports from major smart scale brands like InBody and Tanita, automatically populating the member's profile with extreme detail.",
  },
  {
    q: "Are the progress photos private?",
    a: "Absolutely. Privacy is our top priority. Progress photos are encrypted and only accessible by the member and their assigned personal trainer.",
  },
  {
    q: "How does the macro tracker compare to MyFitnessPal?",
    a: "It's built specifically for trainer-client accountability. Unlike standalone apps, when a member logs food here, the trainer instantly sees if they hit the targets set for them.",
  },
];

export const BMIMacroReports: React.FC<BMIMacroReportsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<LineChart size={20} />, <Camera size={20} />, <Utensils size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Blue / Indigo gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(147,197,253,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(96,165,250,0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#bfdbfe' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
                BMI & Macro Reports
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Data driven.{' '}
                <span style={{ background: 'linear-gradient(90deg, #93c5fd, #eff6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Results proven.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#eff6ff', marginBottom: 40, maxWidth: 480 }}>
                Give your members undeniable proof that your gym works. Track weight, body fat, progress photos, and daily calories all in one beautiful dashboard.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  View Sample Report
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Visual charts', 'Photo collages', 'Trainer oversight'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#bfdbfe' }}>
                    <CheckCircle2 size={14} color="#60a5fa" /> {t}
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
                    <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Body Metrics</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>Updated 2 days ago</div>
                  </div>

                  {/* Content Area */}
                  <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
                    
                    {/* Weight Card */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div>
                         <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Weight</div>
                         <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>76.4 <span style={{ fontSize: 14, color: '#94a3b8' }}>kg</span></div>
                       </div>
                       <div style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: 100, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                         <TrendingUp size={14} /> -1.2kg
                       </div>
                    </div>

                    {/* Chart Mockup */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>3-Month Trend</div>
                       <div style={{ display: 'flex', alignItems: 'flex-end', height: 80, gap: 12, borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
                          <div style={{ flex: 1, height: '40%', background: '#bfdbfe', borderRadius: '4px 4px 0 0' }} />
                          <div style={{ flex: 1, height: '60%', background: '#93c5fd', borderRadius: '4px 4px 0 0' }} />
                          <div style={{ flex: 1, height: '80%', background: '#60a5fa', borderRadius: '4px 4px 0 0' }} />
                          <div style={{ flex: 1, height: '70%', background: '#3b82f6', borderRadius: '4px 4px 0 0' }} />
                          <div style={{ flex: 1, height: '50%', background: '#2563eb', borderRadius: '4px 4px 0 0' }} />
                       </div>
                    </div>

                    {/* Macro Card */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Today's Macros</div>
                       
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12, fontWeight: 600 }}>
                          <span style={{ color: '#64748b' }}>Protein</span>
                          <span style={{ color: '#0f172a' }}>120 / 150g</span>
                       </div>
                       <div style={{ width: '100%', height: 6, background: '#f1f5f9', borderRadius: 4, marginBottom: 16, overflow: 'hidden' }}>
                          <div style={{ width: '80%', height: '100%', background: '#3b82f6' }} />
                       </div>

                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12, fontWeight: 600 }}>
                          <span style={{ color: '#64748b' }}>Carbs</span>
                          <span style={{ color: '#0f172a' }}>180 / 200g</span>
                       </div>
                       <div style={{ width: '100%', height: 6, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ width: '90%', height: '100%', background: '#f59e0b' }} />
                       </div>
                    </div>

                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 20, top: '20%', width: 160, height: 160, borderRadius: '50%', background: '#2563eb', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: 0, bottom: 20, width: 200, height: 200, borderRadius: '50%', background: '#8b5cf6', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '+45%', label: 'Retention rate' },
            { val: 'Visual', label: 'Progress tracking' },
            { val: '100%', label: 'Data security' },
            { val: 'Automated', label: 'Macro adherence' },
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Motivation dies in the dark.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Members work hard, but when they don't see immediate changes in the mirror, they assume they are failing. Without hard data to prove their progress, they cancel their subscription.</p>
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
            <span style={{ background: '#eff6ff', color: '#3b82f6', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Visualize success.</h2>
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
                      <CheckCircle2 size={17} color="#60a5fa" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                {activeTab === 1 ? <Camera size={40} color="#334155" /> : activeTab === 2 ? <Utensils size={40} color="#334155" /> : <LineChart size={40} color="#334155" />}
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>📷 App Dashboard UI</span>
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
      <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <LineChart size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Prove your results.</h2>
          <p style={{ fontSize: 18, color: '#93c5fd', lineHeight: 1.7, marginBottom: 40 }}>Retain members longer by showing them undeniable, data-backed proof of their transformation.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#1e3a8a', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
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

export default BMIMacroReports;
