import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  BrainCircuit, Utensils, Carrot, 
  Settings2, Activity, Heart, Beef
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface AIDietGenerationProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <Utensils size={22} color="#f87171" />,
    title: "Manual diet plans take hours",
    desc: "Your trainers spend 2 hours in Excel calculating macros and picking recipes for a single client, wasting valuable time they could spend on the floor.",
  },
  {
    icon: <Heart size={22} color="#f87171" />,
    title: "Generic 'cookie-cutter' diets",
    desc: "Giving the exact same chicken and rice diet to a 20-year-old male and a 45-year-old female. Members know it's not personalized and ignore it.",
  },
  {
    icon: <Carrot size={22} color="#f87171" />,
    title: "Ignoring dietary preferences",
    desc: "A vegetarian member gets assigned a diet with fish, gets frustrated, and assumes your gym doesn't care about their specific needs.",
  },
];

const tabs = [
  {
    label: "Instant Generation",
    sub: "Powered by AI",
    title: "A full week of meals in 10 seconds.",
    desc: "Input the member's age, weight, goal (e.g., lose 5kg), and dietary preferences. Our AI engine instantly generates a 7-day meal plan perfectly balanced for their macro targets.",
    bullets: ["Uses scientifically backed formulas", "Accounts for allergies", "Zero manual calculation needed"],
  },
  {
    label: "Smart Food Swaps",
    sub: "Ultimate flexibility",
    title: "Don't like broccoli? Swap it.",
    desc: "If a member dislikes a specific meal, they can tap 'Swap' in their app. The AI instantly finds a replacement meal that exactly matches the protein, carb, and fat profile of the original.",
    bullets: ["Maintains daily macro goals", "Hundreds of recipe options", "Reduces diet abandonment"],
  },
  {
    label: "Grocery List Export",
    sub: "Convenience is key",
    title: "From the app to the supermarket.",
    desc: "The app automatically aggregates all the ingredients needed for the week's diet plan and generates a clean, checkable grocery list for the member.",
    bullets: ["Categorized by aisle", "Exact portion sizes", "1-tap PDF export"],
  },
];

const scenarios = [
  {
    icon: <Beef size={22} color="#f43f5e" />,
    title: "The High-Protein Vegan",
    desc: "A member wants 150g of protein daily but eats strictly vegan. The AI builds a complex meal plan using seitan, tempeh, and lentils that hits the exact macro target.",
  },
  {
    icon: <Activity size={22} color="#10b981" />,
    title: "Adjusting for a Cut",
    desc: "A member shifts from a bulk to a cut. With one click, the trainer drops the target calories by 500, and the AI regenerates the entire meal plan instantly.",
  },
  {
    icon: <Settings2 size={22} color="#3b82f6" />,
    title: "Trainer Oversight",
    desc: "The AI generates the base diet, but the trainer manually overrides Tuesday's dinner to include the client's favorite cheat meal while keeping macros balanced.",
  },
];

const faqs = [
  {
    q: "Is the AI giving medical advice?",
    a: "No. The AI generates meal suggestions based on standard fitness nutrition formulas (like Harris-Benedict) for macronutrient distribution. It does not provide clinical dietetics.",
  },
  {
    q: "Can trainers edit the AI-generated plans?",
    a: "Yes! The AI does the heavy lifting, but trainers have full manual control to edit meals, adjust macros, or completely rewrite specific days before sending it to the client.",
  },
  {
    q: "What cuisines does the AI support?",
    a: "The AI is localized. If your gym is in India, it will prioritize local diets (roti, dal, paneer). If you're in the US, it adapts to standard western diets, along with keto, paleo, etc.",
  },
  {
    q: "How do members track what they actually ate?",
    a: "Members simply open their daily plan in the app and check off the meals they ate. If they went off-plan, they can log custom calories which updates their daily progress bar.",
  },
];

export const AIDietGeneration: React.FC<AIDietGenerationProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<BrainCircuit size={20} />, <Settings2 size={20} />, <Utensils size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Emerald / Teal gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(167,243,208,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(52,211,153,0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#d1fae5' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6ee7b7', display: 'inline-block' }} />
                AI Diet Generation
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Custom diets.{' '}
                <span style={{ background: 'linear-gradient(90deg, #6ee7b7, #ecfdf5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  In 10 seconds.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#ecfdf5', marginBottom: 40, maxWidth: 480 }}>
                Stop wasting hours on Excel. Let our AI engine generate hyper-personalized meal plans based on macros, allergies, and local cuisine preferences instantly.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#059669', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(5,150,105,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  See a sample diet
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Precise Macro Splitting', 'Smart Food Swaps', 'Grocery Lists'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#d1fae5' }}>
                    <CheckCircle2 size={14} color="#6ee7b7" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — App Mockup for Diet */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 280, background: '#1e293b', borderRadius: 40, padding: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative', border: '2px solid #334155' }}>
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 24, background: '#000', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10 }}></div>
                
                <div style={{ background: '#f8fafc', borderRadius: 32, overflow: 'hidden', height: 580, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <div style={{ background: '#059669', padding: '48px 20px 24px', color: '#fff' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Today's Target</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
                      <div style={{ fontSize: 32, fontWeight: 800 }}>2,200</div>
                      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>kcal</div>
                    </div>
                    
                    {/* Macros */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                       <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px', borderRadius: 8, textAlign: 'center' }}>
                         <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#a7f3d0' }}>Protein</div>
                         <div style={{ fontSize: 14, fontWeight: 700 }}>150g</div>
                       </div>
                       <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px', borderRadius: 8, textAlign: 'center' }}>
                         <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#a7f3d0' }}>Carbs</div>
                         <div style={{ fontSize: 14, fontWeight: 700 }}>220g</div>
                       </div>
                       <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px', borderRadius: 8, textAlign: 'center' }}>
                         <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#a7f3d0' }}>Fat</div>
                         <div style={{ fontSize: 14, fontWeight: 700 }}>80g</div>
                       </div>
                    </div>
                  </div>

                  {/* Meals Area */}
                  <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
                    
                    {/* Meal 1 */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 12, position: 'relative' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#059669', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Breakfast</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Oatmeal & Whey</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>50g Oats, 1 scoop Whey, 10g Almonds</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>380 kcal</div>
                        <button style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', background: '#eff6ff', border: 'none', padding: '4px 10px', borderRadius: 100 }}>Swap</button>
                      </div>
                    </div>

                    {/* Meal 2 */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #10b981', boxShadow: '0 4px 12px rgba(16,185,129,0.1)', marginBottom: 12, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 12, right: 12, color: '#10b981' }}><CheckCircle2 size={20} /></div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#059669', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lunch</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Grilled Chicken Salad</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>150g Breast, Mixed greens, Olive oil</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>420 kcal</div>
                    </div>

                    {/* Meal 3 */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 12, position: 'relative' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#059669', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dinner</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Salmon & Quinoa</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>120g Salmon, 100g Quinoa, Asparagus</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>550 kcal</div>
                        <button style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', background: '#eff6ff', border: 'none', padding: '4px 10px', borderRadius: 100 }}>Swap</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 20, top: '20%', width: 160, height: 160, borderRadius: '50%', background: '#10b981', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: 0, bottom: 20, width: 200, height: 200, borderRadius: '50%', background: '#059669', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '10s', label: 'To generate a weekly plan' },
            { val: '100%', label: 'Macro accurate' },
            { val: 'Auto', label: 'Grocery list export' },
            { val: 'Zero', label: 'Math required' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#10b981', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Nutrition is the bottleneck.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Diet is 70% of the result, but writing custom meal plans for 100 different members is a mathematical nightmare for your trainers. So they give up and hand out generic PDFs.</p>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Let the machine do the math.</h2>
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
                      <CheckCircle2 size={17} color="#6ee7b7" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <BrainCircuit size={40} color="#334155" />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>📷 App Diet Plan</span>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Built for real life.</h2>
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
      <section style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <BrainCircuit size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Scale your PT business.</h2>
          <p style={{ fontSize: 18, color: '#a7f3d0', lineHeight: 1.7, marginBottom: 40 }}>Deliver high-quality, customized nutrition plans to hundreds of members without spending your entire weekend in Excel.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#064e3b', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>See a Demo</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIDietGeneration;
