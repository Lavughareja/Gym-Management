import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Wallet, TrendingDown, Receipt, 
  PieChart, Building2, ListOrdered
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface ExpenseTrackingProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <Receipt size={22} color="#f43f5e" />,
    title: "Shoebox full of receipts",
    desc: "Gym owners often stuff physical receipts for equipment maintenance or cleaning supplies in a drawer, losing track of real costs.",
  },
  {
    icon: <TrendingDown size={22} color="#f43f5e" />,
    title: "Fake profitability",
    desc: "You might see $10k in revenue, but without tracking your $6k in operating expenses, you have a false sense of how much money you actually made.",
  },
  {
    icon: <Building2 size={22} color="#f43f5e" />,
    title: "Staff spending leaks",
    desc: "When staff buy petty cash items for the gym, it's difficult to track who spent what, when, and if it was approved.",
  },
];

const tabs = [
  {
    label: "Easy Logging",
    sub: "Log in seconds",
    title: "Record expenses on the go.",
    desc: "Whether you just paid the electricity bill or bought new resistance bands, log it instantly from your phone or desktop. Categorize it to keep your ledger organized.",
    bullets: ["Mobile-friendly logging", "Custom expense categories", "Attach photo receipts"],
  },
  {
    label: "Profit Dashboard",
    sub: "Revenue vs Expenses",
    title: "Know your true bottom line.",
    desc: "Trainix automatically subtracts your logged expenses from your membership revenue, giving you a real-time view of your actual net profit for the day, week, or month.",
    bullets: ["Real-time P&L calculation", "Visual breakdown charts", "Compare month-over-month"],
  },
  {
    label: "Staff Approvals",
    sub: "Petty cash control",
    title: "Track what your team spends.",
    desc: "Allow managers to log expenses, but require owner approval for amounts over a certain limit. Keep a clear audit trail of who bought what.",
    bullets: ["Role-based access", "Audit logs", "Approval workflows"],
  },
];

const scenarios = [
  {
    icon: <Receipt size={22} color="#fb7185" />,
    title: "The Broken Cable",
    desc: "A machine breaks and a technician charges $150 to fix it. You snap a photo of the invoice, log it under 'Maintenance', and toss the paper.",
  },
  {
    icon: <PieChart size={22} color="#f43f5e" />,
    title: "End of Month Review",
    desc: "You look at your pie chart and realize you spent 30% of your expenses on marketing this month but only 5% on maintenance. You adjust next month's budget.",
  },
  {
    icon: <ListOrdered size={22} color="#e11d48" />,
    title: "Recurring Utilities",
    desc: "Your rent and electricity are due. You quickly duplicate last month's expense entry, update the amount slightly, and hit save.",
  },
];

const faqs = [
  {
    q: "Can I create my own expense categories?",
    a: "Yes, you can fully customize the categories (e.g., Rent, Utilities, Equipment, Marketing, Salaries) to match how you run your business.",
  },
  {
    q: "Does it calculate staff salaries automatically?",
    a: "If you use the Trainer Management module, trainer payouts can automatically be routed into your expenses ledger.",
  },
  {
    q: "Can I export this data for my accountant?",
    a: "Absolutely. You can export a CSV of all expenses within any date range, categorized perfectly for tax purposes.",
  },
  {
    q: "Is there a limit on how many receipts I can upload?",
    a: "No, there are no storage limits. You can attach a photo or PDF to every single expense you log.",
  },
];

export const ExpenseTracking: React.FC<ExpenseTrackingProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<Receipt size={20} />, <PieChart size={20} />, <ListOrdered size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Rose gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #881337 0%, #e11d48 50%, #f43f5e 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(251,113,133,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(244,63,94,0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#fecdd3' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fb7185', display: 'inline-block' }} />
                Expense Tracking
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Track every{' '}
                <span style={{ background: 'linear-gradient(90deg, #fda4af, #fff1f2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  penny.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#ffe4e6', marginBottom: 40, maxWidth: 480 }}>
                Know your true profitability by logging and categorizing every gym expense in one central place.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(225,29,72,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  View Sample P&L
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Receipt uploads', 'Real-time Profit', 'Custom categories'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#fecdd3' }}>
                    <CheckCircle2 size={14} color="#fb7185" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — App Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 280, background: '#1e293b', borderRadius: 40, padding: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative', border: '2px solid #334155' }}>
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 24, background: '#000', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10 }}></div>
                
                <div style={{ background: '#f8fafc', borderRadius: 32, overflow: 'hidden', height: 580, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <div style={{ background: '#0f172a', padding: '48px 20px 24px', color: '#fff' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>October Overview</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>Net Profit: $4,250.00</div>
                  </div>

                  {/* Content Area */}
                  <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
                    
                    {/* Summary Chart */}
                    <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
                      <div style={{ width: 80, height: 80, borderRadius: '50%', border: '8px solid #f1f5f9', borderTopColor: '#e11d48', borderRightColor: '#fb7185', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>$6.2k</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Expenses</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e11d48' }}></span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>Rent (45%)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fb7185' }}></span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>Equip. (30%)</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Recent Logged</div>
                    
                    {/* Expense Item 1 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Building2 size={18} color="#e11d48" />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Monthly Rent</div>
                          <div style={{ fontSize: 11, color: '#64748b' }}>Oct 1st</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>$2,500.00</div>
                    </div>

                    {/* Expense Item 2 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fef08a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <TrendingDown size={18} color="#ca8a04" />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>New Dumbbells</div>
                          <div style={{ fontSize: 11, color: '#64748b' }}>Sep 28th</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>$850.00</div>
                    </div>

                    {/* Expense Item 3 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Receipt size={18} color="#4f46e5" />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Cleaning Supplies</div>
                          <div style={{ fontSize: 11, color: '#64748b' }}>Sep 25th</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>$125.50</div>
                    </div>

                  </div>

                  <div style={{ padding: 16, background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                    <button style={{ width: '100%', padding: '12px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700 }}>+ Add Expense</button>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: 20, top: '20%', width: 160, height: 160, borderRadius: '50%', background: '#be123c', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: 0, bottom: 20, width: 200, height: 200, borderRadius: '50%', background: '#f43f5e', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: 'Real-time', label: 'Profit Calculations' },
            { val: 'Unlimited', label: 'Receipt Uploads' },
            { val: '100%', label: 'Tax Deductible Tracking' },
            { val: 'Visual', label: 'Spending Charts' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#e11d48', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Revenue isn't profit.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Tracking how much money comes in is easy, but if you aren't tracking what goes out, you have no idea if your gym is actually making money.</p>
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
            <span style={{ background: '#fecdd3', color: '#e11d48', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>A crystal clear ledger.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#e11d48' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                      <CheckCircle2 size={17} color="#fb7185" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                {activeTab === 0 ? <Receipt size={40} color="#334155" /> : activeTab === 1 ? <PieChart size={40} color="#334155" /> : <ListOrdered size={40} color="#334155" />}
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>
                  {activeTab === 0 ? 'Logging UI' : activeTab === 1 ? 'Charts & Data' : 'Approval Board'}
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
      <section style={{ background: 'linear-gradient(135deg, #881337 0%, #4c0519 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <Wallet size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Master your margins.</h2>
          <p style={{ fontSize: 18, color: '#fda4af', lineHeight: 1.7, marginBottom: 40 }}>Stop guessing your profit. Track every expense easily and keep your gym financially healthy.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#881337', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
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

export default ExpenseTracking;
