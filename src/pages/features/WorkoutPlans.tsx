import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Dumbbell, ClipboardList, Target, 
  CalendarRange, Flame, Activity, ListChecks
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface WorkoutPlansProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <ClipboardList size={22} color="#a78bfa" />,
    title: "Messy paper cards",
    desc: "Trainers write workouts on paper that members lose, sweat on, or misread. There's no proper tracking of past performance.",
  },
  {
    icon: <CalendarRange size={22} color="#a78bfa" />,
    title: "One-size-fits-all routines",
    desc: "Gyms often give the exact same generic 3-day split to a 20-year-old athlete and a 55-year-old beginner.",
  },
  {
    icon: <Activity size={22} color="#a78bfa" />,
    title: "No progression tracking",
    desc: "Members don't know what weight they lifted last week, leading to plateaued results and eventually, canceled memberships.",
  },
];

const tabs = [
  {
    label: "Custom Builder",
    sub: "Drag & drop workouts",
    title: "Build perfectly tailored plans in minutes.",
    desc: "Use our visual workout builder to drag and drop exercises, set sets, reps, rest times, and RPE. Create anything from a simple full-body circuit to a complex powerlifting block.",
    bullets: ["Drag & drop interface", "Set specific rest timers", "Superset & circuit support"],
  },
  {
    label: "Template Library",
    sub: "Save time for trainers",
    title: "Stop reinventing the wheel.",
    desc: "Create and save master templates for common goals (e.g., '12-Week Hypertrophy', 'Beginner Fat Loss'). Trainers can assign these templates to clients and make minor tweaks as needed.",
    bullets: ["Save unlimited templates", "One-click assignment", "Standardize your gym's coaching"],
  },
  {
    label: "Member App View",
    sub: "Interactive logging",
    title: "A digital logbook they'll actually use.",
    desc: "Members see their assigned workout beautifully formatted in their app. They can tap to log their weights, check off sets, and see exactly what they lifted last time.",
    bullets: ["Historical performance data", "Automatic rest timers", "Confetti upon workout completion"],
  },
];

const scenarios = [
  {
    icon: <Dumbbell size={22} color="#8b5cf6" />,
    title: "The VIP Client",
    desc: "Your premium PT client gets a bespoke 5-day split. When they log their Monday squats, the trainer immediately gets a notification and can send an encouraging message.",
  },
  {
    icon: <ListChecks size={22} color="#10b981" />,
    title: "The Group Class Prep",
    desc: "The head coach publishes the 'Workout of the Day' (WOD) to the entire gym. Members check their app before arriving so they know exactly what to expect.",
  },
  {
    icon: <Flame size={22} color="#f43f5e" />,
    title: "Breaking Plateaus",
    desc: "A member is stuck on their bench press. The app shows their progression chart flatlining, prompting their trainer to swap the exercise for a dumbbell variation.",
  },
];

const faqs = [
  {
    q: "Can members create their own workout plans?",
    a: "Yes! While trainers can assign locked plans, members can also use the builder to create their own custom routines if they prefer to train independently.",
  },
  {
    q: "Does it support supersets and drop sets?",
    a: "Absolutely. You can group exercises into supersets, giant sets, or designate sets as drop sets, AMRAPs, or warm-ups.",
  },
  {
    q: "Can I sell premium workout programs?",
    a: "Yes, you can create a 12-week program and put it behind a paywall. Members can purchase it directly through the app, unlocking a new revenue stream for your gym.",
  },
  {
    q: "Is the exercise database customizable?",
    a: "Trainix comes with 500+ built-in exercises, but you can add your own custom movements, complete with your own video demonstrations.",
  },
];

export const WorkoutPlans: React.FC<WorkoutPlansProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<ClipboardList size={20} />, <Target size={20} />, <Dumbbell size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Purple gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(167,139,250,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#ddd6fe' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a78bfa', display: 'inline-block' }} />
                Workout Plans
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Smarter programming.{' '}
                <span style={{ background: 'linear-gradient(90deg, #c4b5fd, #f5f3ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Better results.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#ede9fe', marginBottom: 40, maxWidth: 480 }}>
                Build, assign, and track custom workout routines. Ditch the paper logbooks and give your members a premium digital coaching experience.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(124,58,237,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  View Demo Plan
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Drag-and-drop builder', 'Superset support', 'In-app logging'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#ddd6fe' }}>
                    <CheckCircle2 size={14} color="#a78bfa" /> {t}
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
                    <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Hypertrophy Block</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>Week 4 • Day 1: Push</div>
                  </div>

                  {/* Content Area */}
                  <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
                    
                    {/* Exercise Card 1 */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                         <div>
                           <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Bench Press</div>
                           <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>4 sets • 8-10 reps</div>
                         </div>
                         <div style={{ background: '#f3e8ff', color: '#9333ea', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>A</div>
                       </div>
                       
                       {/* Sets */}
                       <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                         <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 1fr 30px', gap: 8, alignItems: 'center', fontSize: 12 }}>
                           <span style={{ color: '#94a3b8', fontWeight: 600 }}>1</span>
                           <input type="text" value="60 kg" readOnly style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: 6, textAlign: 'center', fontWeight: 600, color: '#0f172a' }} />
                           <input type="text" value="10 reps" readOnly style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: 6, textAlign: 'center', fontWeight: 600, color: '#0f172a' }} />
                           <div style={{ width: 24, height: 24, borderRadius: 6, background: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={14} /></div>
                         </div>
                         <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 1fr 30px', gap: 8, alignItems: 'center', fontSize: 12 }}>
                           <span style={{ color: '#94a3b8', fontWeight: 600 }}>2</span>
                           <input type="text" value="65 kg" readOnly style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: 6, textAlign: 'center', fontWeight: 600, color: '#0f172a' }} />
                           <input type="text" value="8 reps" readOnly style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: 6, textAlign: 'center', fontWeight: 600, color: '#0f172a' }} />
                           <div style={{ width: 24, height: 24, borderRadius: 6, background: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={14} /></div>
                         </div>
                         <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 1fr 30px', gap: 8, alignItems: 'center', fontSize: 12 }}>
                           <span style={{ color: '#94a3b8', fontWeight: 600 }}>3</span>
                           <input type="text" placeholder="kg" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '8px', borderRadius: 6, textAlign: 'center' }} />
                           <input type="text" placeholder="reps" style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '8px', borderRadius: 6, textAlign: 'center' }} />
                           <div style={{ width: 24, height: 24, borderRadius: 6, border: '2px solid #cbd5e1' }}></div>
                         </div>
                       </div>
                    </div>

                    {/* Superset indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{ height: 1, background: '#e2e8f0', flex: 1 }}></div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.05em', background: '#f3e8ff', padding: '4px 12px', borderRadius: 100 }}>Superset B</div>
                      <div style={{ height: 1, background: '#e2e8f0', flex: 1 }}></div>
                    </div>

                    {/* Exercise Card 2 */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                         <div>
                           <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Incline DB Press</div>
                           <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>3 sets • 10-12 reps</div>
                         </div>
                       </div>
                    </div>
                    
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                         <div>
                           <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Pec Deck Fly</div>
                           <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>3 sets • 12-15 reps</div>
                         </div>
                       </div>
                    </div>

                  </div>
                  
                  {/* Finish Button */}
                  <div style={{ padding: 16, background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                    <button style={{ width: '100%', padding: '14px', background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700 }}>Finish Workout</button>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 20, top: '20%', width: 160, height: 160, borderRadius: '50%', background: '#7c3aed', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: 0, bottom: 20, width: 200, height: 200, borderRadius: '50%', background: '#c026d3', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#f3e8ff', color: '#8b5cf6', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Real Scenarios</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Workouts without friction.</h2>
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

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: 'Minutes', label: 'To build a full program' },
            { val: 'Unlimited', label: 'Workout templates' },
            { val: '100%', label: 'Digital logging' },
            { val: 'Visual', label: 'Progress tracking' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#8b5cf6', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Paper cards belong in the 90s.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Relying on paper logbooks or scattered WhatsApp messages leads to lost data, confused members, and trainers wasting hours on manual programming.</p>
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
            <span style={{ background: '#f3e8ff', color: '#8b5cf6', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Precision programming.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#8b5cf6' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                      <CheckCircle2 size={17} color="#a78bfa" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                {activeTab === 0 ? <ClipboardList size={40} color="#334155" /> : activeTab === 1 ? <Target size={40} color="#334155" /> : <Dumbbell size={40} color="#334155" />}
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>
                  {activeTab === 0 ? 'Builder UI' : activeTab === 1 ? 'Template List' : 'Member Logbook'}
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
      <section style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #3b0764 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <ClipboardList size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Train smarter today.</h2>
          <p style={{ fontSize: 18, color: '#d8b4fe', lineHeight: 1.7, marginBottom: 40 }}>Transform how your gym programs and tracks workouts with our powerful builder and member app.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#4c1d95', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
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

export default WorkoutPlans;
