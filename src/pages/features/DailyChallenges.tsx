import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Gamepad2, Flame, Trophy, 
  Target, Medal, Gift, Star, Dumbbell
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface DailyChallengesProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <Flame size={22} color="#f87171" />,
    title: "The month 2 drop-off",
    desc: "Most new members lose their motivation exactly 6 weeks after joining. They fall out of their routine because going to the gym starts feeling like a chore.",
  },
  {
    icon: <Target size={22} color="#f87171" />,
    title: "Skipping the hard stuff",
    desc: "Members constantly skipping leg day or avoiding cardio because there's no immediate reward for pushing through the uncomfortable workouts.",
  },
  {
    icon: <Star size={22} color="#f87171" />,
    title: "Zero community engagement",
    desc: "Everyone comes in with headphones, lifts in silence, and leaves. There is no gym culture or friendly competition to make them stay long-term.",
  },
];

const tabs = [
  {
    label: "Quests & Challenges",
    sub: "Daily objectives",
    title: "Turn workouts into side quests.",
    desc: "Set up auto-generating daily quests like 'Burn 500 Calories' or 'Hit a new Leg Press PR'. Members earn XP and badges for completing them in the app.",
    bullets: ["Auto-assigned daily quests", "Gym-wide weekly challenges", "Custom XP payouts"],
  },
  {
    label: "Attendance Streaks",
    sub: "Keep them coming back",
    title: "Build unbreakable habits.",
    desc: "Members build a 'fire streak' for every consecutive day they visit the gym. The fear of losing a 30-day streak is the strongest motivation to show up.",
    bullets: ["Automatic check-in detection", "Streak milestones", "'Streak freeze' rewards"],
  },
  {
    label: "Leaderboards & Rewards",
    sub: "Friendly competition",
    title: "Reward your most active members.",
    desc: "Members rank on the gym's monthly leaderboard based on XP. Top performers can redeem XP for real-world rewards like a free protein shake or a merch t-shirt.",
    bullets: ["Monthly reset leaderboards", "Custom reward store", "Push notification announcements"],
  },
];

const scenarios = [
  {
    icon: <Medal size={22} color="#10b981" />,
    title: "The 100-Day Club",
    desc: "A member hits a 100-day gym streak. The app triggers a massive celebration, awards them the 'Centurion' badge, and gifts them a free PT session.",
  },
  {
    icon: <Gamepad2 size={22} color="#8b5cf6" />,
    title: "Cardio Tuesday Challenge",
    desc: "You notice treadmill usage is low on Tuesdays. You create a '5K Tuesday' quest with double XP. Suddenly, all your treadmills are booked.",
  },
  {
    icon: <Gift size={22} color="#ec4899" />,
    title: "Redeeming XP for Merch",
    desc: "A dedicated member cashes in 5,000 XP at the front desk for a gym hoodie. They wear it proudly, becoming a walking billboard for your brand.",
  },
];

const faqs = [
  {
    q: "Can I choose what rewards members get?",
    a: "Yes! The Reward Store is fully customizable. You can set the XP cost for anything: a free water bottle, 10% off their next renewal, or a free guest pass.",
  },
  {
    q: "Do I have to manually verify the challenges?",
    a: "Most challenges (like attendance, logging a specific exercise, or hitting a PR) are verified automatically by the app. Custom challenges can be verified by trainers.",
  },
  {
    q: "Can members opt-out of the leaderboard?",
    a: "Yes, privacy is important. Members can choose to hide their profile from the public gym leaderboard while still earning personal XP.",
  },
  {
    q: "How does the streak system handle rest days?",
    a: "You can define 'Rest Day allowances' in the settings (e.g., visiting 4 times a week maintains the streak) or offer 'Streak Freezes' they can buy with XP.",
  },
];

export const DailyChallenges: React.FC<DailyChallengesProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<Target size={20} />, <Flame size={20} />, <Trophy size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Violet / Purple gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #8b5cf6 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(196,181,253,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#ddd6fe' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a78bfa', display: 'inline-block' }} />
                Gamification
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Level up.{' '}
                <span style={{ background: 'linear-gradient(90deg, #a78bfa, #ede9fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Literally.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#ede9fe', marginBottom: 40, maxWidth: 480 }}>
                Stop gym churn by making fitness fun. Implement streaks, daily quests, XP points, and leaderboards to keep your members addicted to progress.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#a78bfa', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(167,139,250,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  View Reward Examples
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Daily Quests', 'Custom Rewards', 'Live Leaderboards'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#ddd6fe' }}>
                    <CheckCircle2 size={14} color="#a78bfa" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — App Mockup for Gamification */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 280, background: '#1e293b', borderRadius: 40, padding: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative', border: '2px solid #334155' }}>
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 24, background: '#000', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10 }}></div>
                
                <div style={{ background: '#f8fafc', borderRadius: 32, overflow: 'hidden', height: 580, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <div style={{ background: '#0f172a', padding: '48px 20px 24px', color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                         <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#4c1d95', border: '2px solid #a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👤</div>
                         <div>
                           <div style={{ fontSize: 16, fontWeight: 800 }}>Level 12</div>
                           <div style={{ fontSize: 12, color: '#94a3b8' }}>Pro Athlete</div>
                         </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f59e0b', padding: '4px 8px', borderRadius: 100, color: '#fff', fontSize: 12, fontWeight: 700 }}>
                        <Flame size={14} fill="#fff" /> 14
                      </div>
                    </div>
                    {/* XP Bar */}
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#cbd5e1', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                      <span>2,450 XP</span>
                      <span>3,000 XP to Lvl 13</span>
                    </div>
                    <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                       <div style={{ width: '80%', height: '100%', background: '#a78bfa' }} />
                    </div>
                  </div>

                  {/* Quests Area */}
                  <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      Daily Quests <span style={{ fontSize: 11, color: '#8b5cf6', background: '#ede9fe', padding: '2px 8px', borderRadius: 100 }}>Resets in 4h</span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {/* Completed Quest */}
                      <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 16, opacity: 0.6 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                           <CheckCircle2 size={24} />
                        </div>
                        <div style={{ flex: 1 }}>
                           <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', textDecoration: 'line-through' }}>Check in before 8 AM</div>
                           <div style={{ fontSize: 11, color: '#64748b' }}>+50 XP</div>
                        </div>
                      </div>

                      {/* Active Quest */}
                      <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #c4b5fd', boxShadow: '0 4px 12px rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                           <Dumbbell size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                           <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Log 4 sets of Squats</div>
                           <div style={{ width: '100%', height: 4, background: '#f1f5f9', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                              <div style={{ width: '50%', height: '100%', background: '#8b5cf6' }} />
                           </div>
                           <div style={{ fontSize: 10, color: '#8b5cf6', fontWeight: 600, marginTop: 4 }}>2 / 4 sets • +100 XP</div>
                        </div>
                      </div>

                      {/* Active Quest 2 */}
                      <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                           <Target size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                           <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Burn 400 Calories</div>
                           <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>0 / 400 • +150 XP</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 20, top: '20%', width: 160, height: 160, borderRadius: '50%', background: '#8b5cf6', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: 0, bottom: 20, width: 200, height: 200, borderRadius: '50%', background: '#c026d3', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '+40%', label: 'Retention rate' },
            { val: 'Auto', label: 'Quest generation' },
            { val: '100%', label: 'Customizable rewards' },
            { val: 'Viral', label: 'Social sharing' },
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Consistency is boring.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Building a habit is incredibly difficult. Without immediate dopamine hits and short-term goals, members inevitably lose the motivation they had on day one.</p>
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
            <span style={{ background: '#ede9fe', color: '#8b5cf6', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Make fitness addictive.</h2>
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
                <Gamepad2 size={40} color="#334155" />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>📷 App Gamification UI</span>
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
            <Gamepad2 size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Make them want to come back.</h2>
          <p style={{ fontSize: 18, color: '#d8b4fe', lineHeight: 1.7, marginBottom: 40 }}>Drive engagement and retention to all-time highs by turning their fitness journey into a game they can't put down.</p>
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

export default DailyChallenges;
