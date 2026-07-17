import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Timer, History, Trophy, 
  Dumbbell, Clock, CalendarHeart, Zap
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface WorkoutTimingProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <Clock size={22} color="#f87171" />,
    title: "Scrolling Instagram between sets",
    desc: "A 1-minute rest turns into a 5-minute distraction, leading to cold muscles, a crowded gym floor, and suboptimal gains.",
  },
  {
    icon: <Dumbbell size={22} color="#f87171" />,
    title: "Forgetting last week's weight",
    desc: "Members constantly asking themselves 'Did I lift 60kg or 65kg last Tuesday?' because they don't track progressive overload.",
  },
  {
    icon: <History size={22} color="#f87171" />,
    title: "Losing track of sets",
    desc: "The classic 'Was that set 3 or set 4?' dilemma that every lifter faces when they don't actively log their workout.",
  },
  {
    icon: <Timer size={22} color="#f87171" />,
    title: "Clunky third-party apps",
    desc: "Members using separate apps for timers, another for logging, and another for their gym access. It's too much friction.",
  },
];

const tabs = [
  {
    label: "Smart Rest Timers",
    sub: "Keep the pace",
    title: "Auto-starting rest countdowns.",
    desc: "As soon as a member logs a set, a customizable rest timer automatically starts. It can even buzz their smartwatch or phone when it's time for the next set.",
    bullets: ["Auto-starts on set completion", "Haptic feedback (vibration)", "Custom rest periods per exercise"],
  },
  {
    label: "Live Logging",
    sub: "Track every rep",
    title: "Progressive overload made easy.",
    desc: "Members simply tap to log reps and weight. The app automatically pulls up their last logged weight for that exercise, ensuring they are always pushing for more.",
    bullets: ["Auto-fills previous weights", "1-tap set completion", "Volume & tonnage tracking"],
  },
  {
    label: "PR Celebrations",
    sub: "Gamify the workout",
    title: "Celebrate every milestone.",
    desc: "When a member hits a new One Rep Max (1RM) or volume record, the app explodes with confetti and awards them a digital badge they can share on social media.",
    bullets: ["Automatic 1RM calculation", "Social media share cards", "Confetti animations"],
  },
];

const scenarios = [
  {
    icon: <Zap size={22} color="#fbbf24" />,
    title: "The Perfect Superset",
    desc: "A member alternates between bench press and pull-ups. The app manages the transition, timing a strict 45-second rest before prompting the next exercise.",
  },
  {
    icon: <Trophy size={22} color="#8b5cf6" />,
    title: "Hitting a 100kg Deadlift",
    desc: "A member finally pulls 100kg. The app recognizes the PR, fires a celebration animation, and the member instantly shares the milestone to their Instagram Story.",
  },
  {
    icon: <CalendarHeart size={22} color="#ec4899" />,
    title: "Looking Back at Progress",
    desc: "After 6 months, a member opens their 'Strength Journey' tab to see a beautiful graph of their squat strength doubling since they joined your gym.",
  },
];

const faqs = [
  {
    q: "Does the timer work if the phone screen is locked?",
    a: "Yes. The timer utilizes background notifications and haptics, so it will vibrate the phone or smartwatch even when the screen is locked.",
  },
  {
    q: "Can trainers see what the members are logging?",
    a: "Absolutely. If a trainer is assigned to a member, they can view a live feed of the member's workout logs and volume tracking directly from the Trainer App.",
  },
  {
    q: "How does the app calculate 1RM?",
    a: "We use standard strength formulas (like Epley or Brzycki) based on the weight and reps logged in a set to estimate their One Rep Max dynamically.",
  },
  {
    q: "What if there is poor internet in the basement gym?",
    a: "No problem. The live logging works completely offline. As soon as the member connects to Wi-Fi upstairs, the entire workout syncs to the cloud.",
  },
];

export const WorkoutTiming: React.FC<WorkoutTimingProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<Timer size={20} />, <Dumbbell size={20} />, <Trophy size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Yellow / Amber gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #78350f 0%, #d97706 50%, #f59e0b 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(252,211,77,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(251,191,36,0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#fef3c7' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fcd34d', display: 'inline-block' }} />
                Workout Logging & Timing
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Never miss a set.{' '}
                <span style={{ background: 'linear-gradient(90deg, #fcd34d, #fef3c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Never guess the weight.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#fef3c7', marginBottom: 40, maxWidth: 480 }}>
                Keep your members engaged on the floor with smart rest timers, progressive overload tracking, and personalized PR celebrations — all built into your gym's app.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#d97706', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(217,119,6,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  See it in action
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Smart Haptic Timers', 'Offline Support', 'Auto 1RM Calcs'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#fef3c7' }}>
                    <CheckCircle2 size={14} color="#fcd34d" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — App Mockup for Logging */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 280, background: '#1e293b', borderRadius: 40, padding: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative', border: '2px solid #334155' }}>
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 24, background: '#000', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10 }}></div>
                
                <div style={{ background: '#fff', borderRadius: 32, overflow: 'hidden', height: 580, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  {/* Timer Header */}
                  <div style={{ background: '#d97706', padding: '48px 20px 24px', color: '#fff', textAlign: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 4, textTransform: 'uppercase' }}>Resting</div>
                    <div style={{ fontSize: 48, fontWeight: 800, fontFamily: 'monospace', letterSpacing: -2 }}>00:42</div>
                    <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, marginTop: 12, overflow: 'hidden' }}>
                       <div style={{ width: '60%', height: '100%', background: '#fff' }} />
                    </div>
                  </div>

                  {/* Logging Area */}
                  <div style={{ padding: 20, flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Barbell Squat</div>
                    
                    {/* Logged Sets */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                         <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#64748b' }}>1</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>80 kg × 10</div>
                         </div>
                         <CheckCircle2 size={18} color="#10b981" />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                         <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#64748b' }}>2</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>85 kg × 8</div>
                         </div>
                         <CheckCircle2 size={18} color="#10b981" />
                      </div>
                    </div>

                    {/* Current Set Input */}
                    <div style={{ padding: 16, border: '2px solid #fbbf24', borderRadius: 16, background: '#fffbeb' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#b45309', marginBottom: 12, textTransform: 'uppercase' }}>Set 3 (Target: 90kg)</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input type="text" defaultValue="90" style={{ flex: 1, padding: '10px 12px', border: '1px solid #fcd34d', borderRadius: 8, fontSize: 15, fontWeight: 700, textAlign: 'center', background: '#fff' }} />
                        <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: 14 }}>kg</div>
                        <input type="text" defaultValue="8" style={{ flex: 1, padding: '10px 12px', border: '1px solid #fcd34d', borderRadius: 8, fontSize: 15, fontWeight: 700, textAlign: 'center', background: '#fff' }} />
                        <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: 14 }}>reps</div>
                      </div>
                      <button style={{ width: '100%', padding: '12px', background: '#d97706', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 800, marginTop: 12, opacity: 0.5 }}>Finish Rest First</button>
                    </div>

                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 20, top: '20%', width: 160, height: 160, borderRadius: '50%', background: '#f59e0b', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: 0, bottom: 20, width: 200, height: 200, borderRadius: '50%', background: '#d97706', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '100%', label: 'Offline support' },
            { val: 'Auto', label: 'Rest calculation' },
            { val: '1-Tap', label: 'History recall' },
            { val: 'Smart', label: '1RM Estimates' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#d97706', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Stop guessing on the gym floor.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Members who don't track their workouts hit plateaus faster, get frustrated, and churn. Taking out a notebook or juggling 3 different apps is annoying.</p>
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
            <span style={{ background: '#fef3c7', color: '#d97706', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Everything in one flow.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#d97706' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                      <CheckCircle2 size={17} color="#fbbf24" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Timer size={40} color="#334155" />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>📷 App Timer Mockup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#fef3c7', color: '#d97706', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Real Scenarios</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Better workouts, automatically.</h2>
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
      <section style={{ background: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <Clock size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Make every set count.</h2>
          <p style={{ fontSize: 18, color: '#fcd34d', lineHeight: 1.7, marginBottom: 40 }}>Upgrade your members' experience with smart logging and auto-timers, driving better results and higher retention.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#92400e', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
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

export default WorkoutTiming;
