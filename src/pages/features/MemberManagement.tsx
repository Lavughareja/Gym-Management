import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, CheckCircle2, ArrowRight, Clock, Phone, MessageSquare, TrendingUp,
  Store, Megaphone, Moon, Users, UserMinus, Gift, ChevronDown, Smartphone,
  Activity, CreditCard, Calendar, QrCode
} from 'lucide-react';
import { featuresData } from '../../data/featuresData';
import { Navbar, Footer } from '../Home';

export interface MemberManagementProps {
  onBack: () => void;
}

const iconColors: Record<string, string> = {
  clock: '#f87171', phone: '#f87171', message: '#f87171', trending: '#f87171',
  store: '#3b82f6', megaphone: '#ec4899', moon: '#facc15',
  users: '#22c55e', 'user-minus': '#a855f7', gift: '#f97316',
};

const getIcon = (iconName: string) => {
  const color = iconColors[iconName] || '#4f46e5';
  const props = { size: 22, color };
  switch (iconName) {
    case 'clock': return <Clock {...props} />;
    case 'phone': return <Phone {...props} />;
    case 'message': return <MessageSquare {...props} />;
    case 'trending': return <TrendingUp {...props} />;
    case 'store': return <Store {...props} />;
    case 'megaphone': return <Megaphone {...props} />;
    case 'moon': return <Moon {...props} />;
    case 'users': return <Users {...props} />;
    case 'user-minus': return <UserMinus {...props} />;
    case 'gift': return <Gift {...props} />;
    default: return <CheckCircle2 {...props} />;
  }
};

const tabIcons = [<Calendar size={20} />, <Activity size={20} />, <CreditCard size={20} />];
const tabSubs = ['Warm lead capture', 'Class + PT slots', 'Full membership'];

export const MemberManagement: React.FC<MemberManagementProps> = ({ onBack }) => {
  const feature = featuresData['member-management'];
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!feature || !feature.marketing) return null;
  const m = feature.marketing;

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1e1145 0%, #2D1B69 60%, #3b1fa8 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 96,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(79,70,229,0.18)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(236,72,153,0.1)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>


          {/* 2-col grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#e2e8f0'
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                {feature.title}
              </div>

              <h1 style={{ fontSize: 62, fontWeight: 900, lineHeight: 1.07, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                {(m.headline || '').split('while you sleep')[0]}
                <span style={{ background: 'linear-gradient(90deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  while you sleep.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#c4b5fd', marginBottom: 40, maxWidth: 480 }}>
                {m.subHeadline}
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{
                  padding: '14px 32px', background: '#8b5cf6', color: '#fff', border: 'none',
                  borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(139,92,246,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>Start Free Trial <ArrowRight size={18} /></button>
                <button style={{
                  padding: '14px 32px', background: 'transparent', color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 14,
                  fontSize: 15, fontWeight: 700, cursor: 'pointer',
                }}>Book a Demo</button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Fully white-labeled', 'Razorpay powered'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#ddd6fe' }}>
                    <CheckCircle2 size={15} color="#4ade80" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - Phone mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{
                width: 300, borderRadius: 40, border: '8px solid #1a0f3c',
                background: '#fff', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', overflow: 'hidden',
              }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)', padding: '28px 24px 24px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 80, height: 20, background: '#000', borderRadius: 100 }} />
                  <div style={{ width: 44, height: 44, background: '#fff', color: '#7c3aed', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, marginBottom: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>FX</div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: '#fff' }}>FRX Premium</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Unlimited Access + Diet</div>
                </div>

                {/* Body */}
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid #f1f5f9', paddingBottom: 12, marginBottom: 16 }}>
                    <span style={{ color: '#4f46e5', borderBottom: '2px solid #4f46e5', paddingBottom: 4, fontWeight: 700, fontSize: 13 }}>Join Now</span>
                    <span style={{ color: '#9ca3af', fontWeight: 700, fontSize: 13 }}>Free Trial</span>
                  </div>
                  <div style={{ border: '1.5px solid #4f46e5', background: '#ede9fe', borderRadius: 14, padding: '12px 14px', marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ background: '#4f46e5', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Selected</span>
                      <span style={{ fontWeight: 900, fontSize: 16, color: '#111' }}>₹19,999</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#111' }}>Annual Elite</div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>12 Months Access • No setup fee</div>
                  </div>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '10px 12px', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
                    <Gift size={13} /> Coupon NEW10 applied!
                  </div>
                  <button style={{ width: '100%', background: '#4f46e5', color: '#fff', fontWeight: 700, padding: '14px 0', borderRadius: 12, border: 'none', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>
                    Pay ₹17,999 <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              {/* Glow behind phone */}
              <div style={{ position: 'absolute', zIndex: -1, right: -40, top: '30%', width: 120, height: 120, borderRadius: '50%', background: '#ec4899', filter: 'blur(50px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: -30, bottom: -20, width: 150, height: 150, borderRadius: '50%', background: '#8b5cf6', filter: 'blur(60px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      {m.painPoints && (
        <section style={{ background: '#f8fafc', padding: '96px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
              <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>The Real Cost</span>
              <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>{m.painPointsHeadline}</h2>
              <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>{m.painPointsSub}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 900, margin: '0 auto' }}>
              {m.painPoints.map((p, i) => (
                <div key={i} style={{ background: '#fff', padding: 32, borderRadius: 20, border: '1px solid #fee2e2', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'box-shadow 0.2s' }}>
                  <div style={{ width: 48, height: 48, background: '#fff1f2', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    {getIcon(p.icon)}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURE TABS ── */}
      {m.featureTabs && (
        <section style={{ background: '#fff', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
              <span style={{ background: '#dbeafe', color: '#2563eb', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>The Fix</span>
              <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>{m.tabsHeadline}</h2>
              <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>{m.tabsSub}</p>
            </div>

            <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
              {/* Tab Nav */}
              <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
                {m.featureTabs.map((t, i) => (
                  <button key={i} onClick={() => setActiveTab(i)} style={{
                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    padding: '20px 12px', borderRadius: 16, border: '1px solid transparent',
                    background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent',
                    borderColor: activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: activeTab === i ? '#4f46e5' : 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: activeTab === i ? '#fff' : '#64748b',
                    }}>
                      {tabIcons[i]}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 16, color: activeTab === i ? '#fff' : '#475569' }}>{t.label}</span>
                    <span style={{ fontSize: 11, color: '#475569', fontWeight: 500 }}>{tabSubs[i]}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ padding: 48, display: 'flex', gap: 64, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 30, fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>{m.featureTabs[activeTab].title}</h3>
                  <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>{m.featureTabs[activeTab].desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {m.featureTabs[activeTab].bulletPoints.map((b, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 600, color: '#cbd5e1' }}>
                        <CheckCircle2 size={17} color="#4ade80" style={{ flexShrink: 0 }} /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Placeholder for screenshot */}
                <div style={{ width: 240, flexShrink: 0, aspectRatio: '9/16', background: '#1e293b', borderRadius: 28, border: '6px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                  <Smartphone size={44} color="#334155" />
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>
                    📷 Add screenshot here
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SCENARIOS ── */}
      {m.scenarios && (
        <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
              <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Real Scenarios</span>
              <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>{m.scenariosHeadline}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
              {m.scenarios.map((s, i) => (
                <div key={i} style={{ background: '#fff', padding: 28, borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.02)', transition: 'box-shadow 0.2s, transform 0.2s' }}>
                  <div style={{ width: 40, height: 40, background: '#f8fafc', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    {getIcon(s.icon)}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STEPS ── */}
      {m.steps && (
        <section style={{ background: '#fff', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
              <span style={{ background: '#ede9fe', color: '#7c3aed', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>For The Owner</span>
              <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>{m.stepsHeadline}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, maxWidth: 1100, margin: '0 auto 48px' }}>
              {m.steps.map((s, i) => (
                <div key={i} style={{ background: '#fff', padding: '32px 24px 28px', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', position: 'relative', marginTop: 20 }}>
                  <div style={{ position: 'absolute', top: -18, left: 24, width: 36, height: 36, borderRadius: '50%', background: '#4f46e5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, boxShadow: '0 4px 12px rgba(79,70,229,0.3)', border: '3px solid #fff' }}>
                    {i + 1}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 10, marginTop: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* QR Banner */}
            <div style={{ maxWidth: 1100, margin: '0 auto', background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', borderRadius: 28, padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, boxShadow: '0 24px 64px rgba(124,58,237,0.25)' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ddd6fe', marginBottom: 20 }}>
                  <QrCode size={13} /> QR Poster Generator
                </div>
                <h3 style={{ fontSize: 30, fontWeight: 900, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>Stick a poster. Watch leads roll in.</h3>
                <p style={{ fontSize: 16, color: '#ddd6fe', lineHeight: 1.65, maxWidth: 540, margin: 0 }}>Generate a print-ready A4, A5 or 4x6 PDF poster with your QR code, logo and tagline. Pin it at the front desk, in changing rooms, on flyers.</p>
              </div>
              <div style={{ background: '#fff', padding: 20, borderRadius: 20, boxShadow: '0 16px 48px rgba(0,0,0,0.2)', transform: 'rotate(3deg)', flexShrink: 0, transition: 'transform 0.2s', cursor: 'pointer' }}>
                <QrCode size={96} color="#4f46e5" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {m.faqs && (
        <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px' }}>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', textAlign: 'center', letterSpacing: -1.5, marginBottom: 48 }}>Frequently asked</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {m.faqs.map((f, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: '100%', padding: '20px 24px', textAlign: 'left', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', fontWeight: 700, fontSize: 15, color: '#0f172a',
                    background: 'none', border: 'none', cursor: 'pointer',
                  }}>
                    {f.q}
                    <ChevronDown size={20} color="#94a3b8" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 24px 20px', fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <TrendingUp size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Turn every quiet hour into a paying member.</h2>
          <p style={{ fontSize: 18, color: '#ddd6fe', lineHeight: 1.7, marginBottom: 40 }}>Spin up your gym's branded self-serve page in 15 minutes. The next walk-in lead at midnight could be paid before you wake up.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#7c3aed', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Book a Demo
            </button>
          </div>
          <p style={{ fontSize: 13, color: '#c4b5fd', fontWeight: 500 }}>No setup fees • Cancel anytime • Built for modern gyms</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MemberManagement;
