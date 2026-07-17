import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  PlayCircle, Dumbbell, MonitorPlay, 
  HelpCircle, Video, ListVideo, Layers
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface WorkoutLibraryProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <HelpCircle size={22} color="#f87171" />,
    title: "Endless 'How do I do this?'",
    desc: "Your trainers spend 80% of their floor time demonstrating basic movements like a bicep curl over and over to beginners.",
  },
  {
    icon: <Video size={22} color="#f87171" />,
    title: "Bad form leading to injuries",
    desc: "Members looking up random exercises on YouTube, doing them wrong, and blaming the gym when they get hurt.",
  },
  {
    icon: <Layers size={22} color="#f87171" />,
    title: "Paper workout cards",
    desc: "Members walking around with flimsy paper cards trying to figure out what a 'Bulgarian Split Squat' is.",
  },
  {
    icon: <Dumbbell size={22} color="#f87171" />,
    title: "Intimidation for new members",
    desc: "Newcomers feel embarrassed to ask how to use a machine, so they just stick to the treadmill and eventually quit.",
  },
];

const tabs = [
  {
    label: "500+ Built-in Exercises",
    sub: "Ready on day one",
    title: "A massive library out of the box.",
    desc: "Trainix comes pre-loaded with over 500 high-quality exercise videos covering everything from weightlifting and machines to yoga and stretching. Assign them instantly.",
    bullets: ["Professionally shot videos", "Categorized by muscle group", "Clear written instructions"],
  },
  {
    label: "Add Custom Videos",
    sub: "Your brand, your trainers",
    title: "Upload your own exercise variations.",
    desc: "Have a unique workout flow? Record your own trainers demonstrating the exercises and upload them to the library. Members see your brand and your staff.",
    bullets: ["Upload custom MP4s", "Link YouTube videos", "Brand the experience"],
  },
  {
    label: "In-App Form Check",
    sub: "Detailed breakdowns",
    title: "Show them the right way to lift.",
    desc: "Each exercise page in the member app highlights the primary and secondary muscles targeted, along with key pointers to maintain perfect form and prevent injury.",
    bullets: ["Muscle group diagrams", "Common mistakes to avoid", "Breathing cues"],
  },
];

const scenarios = [
  {
    icon: <PlayCircle size={22} color="#f97316" />,
    title: "The 2 AM Workout",
    desc: "A member working out late at night when no trainers are around. They check their app, watch the 15-second loop of the exercise, and lift with confidence.",
  },
  {
    icon: <ListVideo size={22} color="#10b981" />,
    title: "Remote Coaching",
    desc: "You sell an online training plan to a member traveling for work. They open the app in their hotel gym and follow the exact video tutorials you assigned.",
  },
  {
    icon: <MonitorPlay size={22} color="#ef4444" />,
    title: "Unique Machine Instructions",
    desc: "You buy a complicated new glute machine. You film a 30-second tutorial on your phone, upload it, and attach a QR code to the machine. Members scan and learn.",
  },
];

const faqs = [
  {
    q: "Is the video library included in all plans?",
    a: "Yes, the core library of 500+ exercises is included for free in all Trainix plans.",
  },
  {
    q: "Do the videos take up space on the member's phone?",
    a: "No. The videos stream dynamically from our servers, meaning the Trainix app remains lightweight and fast.",
  },
  {
    q: "Can I limit who sees my custom videos?",
    a: "Yes. Custom exercises can be assigned specifically to premium PT clients, keeping your proprietary workouts exclusive.",
  },
  {
    q: "Can members log their weights directly from the video screen?",
    a: "Absolutely. While watching the form video, the member can enter their reps, sets, and weight below it to log their workout.",
  },
];

export const WorkoutLibrary: React.FC<WorkoutLibraryProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<Dumbbell size={20} />, <MonitorPlay size={20} />, <Video size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Orange / Red gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #f97316 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(253,186,116,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(239,68,68,0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#fed7aa' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fdba74', display: 'inline-block' }} />
                Workout Library
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Perfect form.{' '}
                <span style={{ background: 'linear-gradient(90deg, #fdba74, #ffedd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Every time.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#ffedd5', marginBottom: 40, maxWidth: 480 }}>
                Give your members a pocket personal trainer. A library of 500+ high-quality exercise videos with clear instructions, ready to stream instantly.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#f97316', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(249,115,22,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Browse Exercises
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['500+ HD Videos', 'Upload your own', 'Muscle group targets'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#fed7aa' }}>
                    <CheckCircle2 size={14} color="#fdba74" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — App Mockup for Video */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 280, background: '#1e293b', borderRadius: 40, padding: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative', border: '2px solid #334155' }}>
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 24, background: '#000', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10 }}></div>
                
                <div style={{ background: '#fff', borderRadius: 32, overflow: 'hidden', height: 580, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  {/* Video Player Area */}
                  <div style={{ height: 260, background: '#0f172a', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                      <PlayCircle size={32} color="#fff" style={{ marginLeft: 4 }} />
                    </div>
                    {/* Dummy progress bar */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'rgba(255,255,255,0.2)' }}>
                      <div style={{ width: '45%', height: '100%', background: '#f97316' }} />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div style={{ padding: 20, flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>Barbell Deadlift</h3>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>Hamstrings, Glutes, Back</div>
                      </div>
                      <div style={{ background: '#ffedd5', color: '#ea580c', padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>Free Weight</div>
                    </div>

                    <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 20 }}>
                      Keep your back straight and core tight. Push through your heels to lift the bar, keeping it close to your shins.
                    </div>

                    <div style={{ background: '#f8fafc', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Log Set</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input type="text" placeholder="10 reps" style={{ flex: 1, padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 13, background: '#fff' }} />
                        <input type="text" placeholder="60 kg" style={{ flex: 1, padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 13, background: '#fff' }} />
                      </div>
                      <button style={{ width: '100%', padding: '10px', background: '#f97316', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, marginTop: 12 }}>Save Set</button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 20, top: '20%', width: 160, height: 160, borderRadius: '50%', background: '#ea580c', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: 0, bottom: 20, width: 200, height: 200, borderRadius: '50%', background: '#f97316', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '500+', label: 'Pre-loaded HD Videos' },
            { val: 'Unlimited', label: 'Custom Uploads' },
            { val: '0 MB', label: 'Phone space used' },
            { val: '100%', label: 'Form confidence' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#ea580c', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Gym intimidation is real.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Members quit when they don't know what to do. If they have to wait 10 minutes to ask a busy trainer how to use a machine, they'll just jump on the treadmill instead.</p>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>A coach in every pocket.</h2>
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
                      <CheckCircle2 size={17} color="#fdba74" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Video size={40} color="#334155" />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>📷 App Video Player</span>
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
      <section style={{ background: 'linear-gradient(135deg, #c2410c 0%, #9a3412 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <PlayCircle size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Empower your members.</h2>
          <p style={{ fontSize: 18, color: '#fed7aa', lineHeight: 1.7, marginBottom: 40 }}>Give them the confidence to lift properly with 500+ HD video tutorials right in the Trainix app.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#c2410c', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Talk to Sales</button>
          </div>
          <p style={{ fontSize: 13, color: '#fed7aa', fontWeight: 500 }}>Included free in all Trainix plans</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkoutLibrary;
