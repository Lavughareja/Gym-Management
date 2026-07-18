import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  FileText, Send, Printer, 
  Download, FileDigit, Smartphone
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface InvoicesBillingProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <FileDigit size={22} color="#06b6d4" />,
    title: "Messy receipt books",
    desc: "Writing paper receipts is slow, error-prone, and looks unprofessional to high-paying members.",
  },
  {
    icon: <Send size={22} color="#06b6d4" />,
    title: "Tax compliance nightmares",
    desc: "Come tax season, compiling all the scattered payments and calculating GST/VAT is a massive headache.",
  },
  {
    icon: <Printer size={22} color="#06b6d4" />,
    title: "Lost historical records",
    desc: "When a member asks for their payment history from 6 months ago, finding it in the old filing cabinet takes forever.",
  },
];

const tabs = [
  {
    label: "Auto-Invoicing",
    sub: "Generated instantly",
    title: "Professional invoices, zero effort.",
    desc: "Every time a member makes a payment (online or offline), Trainix instantly generates a beautiful, branded PDF invoice complete with your gym's logo and tax details.",
    bullets: ["Auto-emailed to members", "Branded PDF generation", "Tax-compliant formatting"],
  },
  {
    label: "Digital Records",
    sub: "Searchable history",
    title: "Never lose a transaction.",
    desc: "Every invoice is securely stored in the cloud. You can search by member name, date, or invoice number, and resend it with a single click.",
    bullets: ["Unlimited cloud storage", "Advanced search & filters", "One-click resend"],
  },
  {
    label: "Tax Ready",
    sub: "Export for accountants",
    title: "Make your accountant happy.",
    desc: "Generate comprehensive billing reports for any date range. Export detailed CSVs that break down base prices, taxes collected, and discounts applied.",
    bullets: ["Detailed tax breakdowns", "CSV/Excel exports", "Custom date ranges"],
  },
];

const scenarios = [
  {
    icon: <FileText size={22} color="#0891b2" />,
    title: "Corporate Reimbursements",
    desc: "A member needs a formal invoice to get their gym membership reimbursed by their company. They log into their app, download the PDF instantly, and submit it.",
  },
  {
    icon: <Download size={22} color="#06b6d4" />,
    title: "End of Month Accounting",
    desc: "On the 1st of the month, you click 'Export', select last month's date range, and email the perfectly formatted CSV to your accountant in 30 seconds.",
  },
  {
    icon: <Smartphone size={22} color="#22d3ee" />,
    title: "The WhatsApp Receipt",
    desc: "A member hands you cash at the front desk. You log it on your tablet, and their phone buzzes immediately with a WhatsApp message containing a link to their digital receipt.",
  },
];

const faqs = [
  {
    q: "Can I customize the invoice with my own logo?",
    a: "Yes, you can upload your gym's logo, set your brand color, and add custom footer notes (like terms and conditions) to every invoice.",
  },
  {
    q: "Does it support multiple tax rates?",
    a: "Yes. You can configure multiple tax rates (e.g., State Tax, Federal Tax) and apply them dynamically based on the plan sold.",
  },
  {
    q: "Can I generate invoices for physical products?",
    a: "Absolutely. If you sell supplements, apparel, or water bottles, you can generate Point-of-Sale (POS) invoices for those items as well.",
  },
  {
    q: "Can members view their own invoice history?",
    a: "Yes, members have a 'Billing' tab in their app where they can view and download all their past invoices at any time.",
  },
];

export const InvoicesBilling: React.FC<InvoicesBillingProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<FileText size={20} />, <Download size={20} />, <Printer size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Cyan gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #083344 0%, #0e7490 50%, #06b6d4 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(34,211,238,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(6,182,212,0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#cffafe' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22d3ee', display: 'inline-block' }} />
                Invoices & Billing
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Professional billing.{' '}
                <span style={{ background: 'linear-gradient(90deg, #67e8f9, #ecfeff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Zero friction.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#cffafe', marginBottom: 40, maxWidth: 480 }}>
                Generate stunning, tax-compliant PDF invoices instantly. Deliver them via email or WhatsApp and keep your accountants happy.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#06b6d4', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(6,182,212,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  View Sample Invoice
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Branded PDFs', 'Tax Reports', 'WhatsApp delivery'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#cffafe' }}>
                    <CheckCircle2 size={14} color="#22d3ee" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — App Mockup for Invoice */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 340, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative' }}>
                
                {/* Invoice Mockup */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #f1f5f9', paddingBottom: 16, marginBottom: 16 }}>
                  <div>
                    <div style={{ width: 40, height: 40, background: '#0e7490', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                      <FileText size={20} color="#fff" />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>IRON GYM</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>123 Fitness Street</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 24, fontWeight: 300, color: '#cbd5e1', letterSpacing: -1 }}>INVOICE</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>#INV-2024-089</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>Oct 15, 2024</div>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>Billed To:</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Alex Johnson</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>alex.johnson@email.com</div>
                </div>

                <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', marginBottom: 20 }}>
                  <div style={{ background: '#f8fafc', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: '#64748b' }}>
                    <span>Description</span>
                    <span>Amount</span>
                  </div>
                  <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#0f172a', borderBottom: '1px solid #f1f5f9' }}>
                    <span>Annual Membership (Gold)</span>
                    <span style={{ fontWeight: 600 }}>$500.00</span>
                  </div>
                  <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#0f172a' }}>
                    <span>Locker Rental</span>
                    <span style={{ fontWeight: 600 }}>$50.00</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 32 }}>
                  <div style={{ width: '60%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 8 }}>
                      <span>Subtotal</span>
                      <span>$550.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 12 }}>
                      <span>Tax (10%)</span>
                      <span>$55.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, color: '#0f172a', borderTop: '2px solid #f1f5f9', paddingTop: 8 }}>
                      <span>Total</span>
                      <span>$605.00</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ flex: 1, padding: '10px', background: '#0e7490', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Download size={16} /> Download
                  </button>
                  <button style={{ flex: 1, padding: '10px', background: '#f1f5f9', color: '#0f172a', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Send size={16} /> Send via WA
                  </button>
                </div>

              </div>
              <div style={{ position: 'absolute', zIndex: -1, right: -20, top: '10%', width: 160, height: 160, borderRadius: '50%', background: '#06b6d4', filter: 'blur(60px)', opacity: 0.4 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: -20, bottom: -20, width: 200, height: 200, borderRadius: '50%', background: '#22d3ee', filter: 'blur(70px)', opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: 'Instantly', label: 'PDF Generation' },
            { val: 'Unlimited', label: 'Cloud Storage' },
            { val: 'Tax Ready', label: 'Accounting Exports' },
            { val: 'Branded', label: 'Professional Look' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#0891b2', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Paper receipts look amateur.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>Handwriting receipts on a notepad doesn't match the premium experience your gym provides. Plus, manually compiling them for tax season is a nightmare.</p>
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
            <span style={{ background: '#cffafe', color: '#0891b2', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Automated invoicing flow.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#0891b2' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                      <CheckCircle2 size={17} color="#22d3ee" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                {activeTab === 0 ? <FileText size={40} color="#334155" /> : activeTab === 1 ? <Download size={40} color="#334155" /> : <Printer size={40} color="#334155" />}
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>
                  {activeTab === 0 ? 'PDF Generation' : activeTab === 1 ? 'Cloud Storage' : 'Tax Exports'}
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
      <section style={{ background: 'linear-gradient(135deg, #083344 0%, #020617 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <FileText size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Upgrade your billing.</h2>
          <p style={{ fontSize: 18, color: '#cffafe', lineHeight: 1.7, marginBottom: 40 }}>Impress your members with professional invoices and streamline your accounting process.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#083344', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
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

export default InvoicesBilling;
