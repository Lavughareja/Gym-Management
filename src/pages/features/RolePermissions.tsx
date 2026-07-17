import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Shield, Users, Key, Lock,
  Settings, UserCog, UserX, AlertTriangle,
  EyeOff, Search, Edit3
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface RolePermissionsProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <UserX size={22} color="#f87171" />,
    title: "Staff deleting data intentionally",
    desc: "A disgruntled trainer leaves and deletes 50 member profiles before you notice. Since everyone shares the admin password, you don't even know who did it.",
  },
  {
    icon: <EyeOff size={22} color="#f87171" />,
    title: "Front desk sees your financial data",
    desc: "Your receptionist needs to mark attendance, but because they have full access, they can also see your total revenue, profit margins, and owner payouts.",
  },
  {
    icon: <AlertTriangle size={22} color="#f87171" />,
    title: "Accidental plan price modifications",
    desc: "A new staff member accidentally changes the annual plan from ₹12,000 to ₹1,200. Three members buy it online before you spot the error.",
  },
  {
    icon: <Lock size={22} color="#f87171" />,
    title: "Account sharing risk",
    desc: "Staff share the admin login credentials on WhatsApp. Former employees still have access to your gym's data months after leaving.",
  },
];

const tabs = [
  {
    label: "Access Roles",
    sub: "Manager, Trainer, Desk",
    title: "Give them what they need. Nothing more.",
    desc: "Create unlimited custom roles. Want the front desk to only see check-ins? Done. Want trainers to only see their own PT clients? Done. Want managers to see sales but not delete members? Done. Granular control at the click of a toggle.",
    bullets: ["Pre-built roles: Admin, Manager, Trainer, Desk", "Custom role creation builder", "Module-level read/write toggles"],
  },
  {
    label: "Audit Logs",
    sub: "Track every single action",
    title: "Know exactly who did what, and when.",
    desc: "Every action in Trainix is logged. If a member's expiry date is extended, the audit log shows exactly which staff member did it and at what exact time. Total accountability, zero finger-pointing.",
    bullets: ["Timestamped action tracking", "Filter logs by staff member", "Undelete / Restore capabilities"],
  },
  {
    label: "Data Masking",
    sub: "Hide sensitive financials",
    title: "Keep your money your business.",
    desc: "Restrict the billing and reports modules entirely. Mask member contact numbers so staff can WhatsApp them through the app without actually seeing or copying their phone number to their personal device.",
    bullets: ["Financial reporting locks", "Member phone number masking", "Export/Download restrictions"],
  },
];

const scenarios = [
  {
    icon: <Settings size={22} color="#0f766e" />,
    title: "Front desk logs in",
    desc: "They see the attendance scanner, member list (masked numbers), and daily walk-ins. The 'Reports' and 'Billing' tabs literally don't exist on their screen.",
  },
  {
    icon: <Search size={22} color="#0369a1" />,
    title: "Investigating a deleted invoice",
    desc: "You open the Audit Log, filter by 'Deleted Invoices', and see exactly which staff account deleted it at 4:12 PM yesterday.",
  },
  {
    icon: <UserCog size={22} color="#6d28d9" />,
    title: "Trainer sees only their PT clients",
    desc: "When a trainer opens the app, they only see members assigned to them. They cannot browse the entire gym database or poach clients.",
  },
  {
    icon: <Edit3 size={22} color="#b45309" />,
    title: "Price edits are locked",
    desc: "A manager tries to offer a custom discount to a friend. The system blocks it because they don't have 'Override Pricing' permission. They must request your approval.",
  },
  {
    icon: <Key size={22} color="#be185d" />,
    title: "Staff member quits",
    desc: "One click on 'Deactivate Account'. They instantly lose access to the app, web panel, and all member data. Secure in 2 seconds.",
  },
  {
    icon: <Users size={22} color="#4338ca" />,
    title: "Multi-branch manager",
    desc: "Assign a manager access to Branch A and Branch B, but not Branch C. They can pull consolidated reports only for the branches they manage.",
  },
];

const faqs = [
  {
    q: "Can I create a custom role from scratch?",
    a: "Yes. You can create a role (e.g., 'Weekend Receptionist') and manually toggle read, write, edit, and delete permissions for every single module in the system.",
  },
  {
    q: "What happens if a staff member tries to access a blocked page via URL?",
    a: "The server verifies permissions on every request. If they try to force-navigate to an unauthorized URL, they will hit a hard 'Access Denied' screen, and the attempt is logged.",
  },
  {
    q: "Can trainers export the member list?",
    a: "By default, no. The 'Export CSV/Excel' permission is disabled for all roles except Super Admin. You can choose to grant it if needed.",
  },
  {
    q: "How does phone number masking work?",
    a: "Staff can click a 'WhatsApp' or 'Call' button in the app to contact the member, but the actual 10-digit number is replaced with asterisks (e.g., 98****4321) on their screen.",
  },
];

export const RolePermissions: React.FC<RolePermissionsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<Shield size={20} />, <Search size={20} />, <EyeOff size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Slate / Teal gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #115e59 55%, #0f766e 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-25%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'rgba(20,184,166,0.2)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '8%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#99f6e4' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#2dd4bf', display: 'inline-block' }} />
                Role Permissions
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Your data.{' '}
                <span style={{ background: 'linear-gradient(90deg, #5eead4, #99f6e4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Your rules.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#ccfbf1', marginBottom: 40, maxWidth: 480 }}>
                Stop sharing the admin password. Give your staff individual logins with granular access control. Hide financials, block data exports, and track every action in the audit log.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#0d9488', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(13,148,136,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Book a Demo
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Granular toggles', 'Audit logging', 'Number masking'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#99f6e4' }}>
                    <CheckCircle2 size={14} color="#2dd4bf" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Permissions Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 24, boxShadow: '0 40px 80px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
                
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #0f766e, #065f46)', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield size={20} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>Edit Role</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Front Desk Executive</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div style={{ padding: '12px 24px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 12 }}>Members Module</div>
                  
                  {[
                    { label: 'View Member Profiles', on: true },
                    { label: 'Add New Members', on: true },
                    { label: 'Edit Member Details', on: false },
                    { label: 'Delete Members', on: false, danger: true },
                  ].map((p, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: p.danger ? '#ef4444' : '#334155' }}>{p.label}</span>
                      <div style={{ width: 44, height: 24, borderRadius: 100, background: p.on ? '#0d9488' : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: '0.2s' }}>
                        <div style={{ position: 'absolute', top: 2, left: p.on ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: '0.2s' }} />
                      </div>
                    </div>
                  ))}

                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 24 }}>Financials & Reports</div>
                  
                  {[
                    { label: 'View Total Revenue', on: false },
                    { label: 'Export Data (Excel/CSV)', on: false, danger: true },
                  ].map((p, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i === 0 ? '1px solid #f1f5f9' : 'none' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: p.danger ? '#ef4444' : '#334155' }}>{p.label}</span>
                      <div style={{ width: 44, height: 24, borderRadius: 100, background: p.on ? '#0d9488' : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: '0.2s' }}>
                        <div style={{ position: 'absolute', top: 2, left: p.on ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: '0.2s' }} />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ padding: '16px 24px 24px', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                  <button style={{ width: '100%', padding: '12px', background: '#0d9488', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                    Save Role Permissions
                  </button>
                </div>
              </div>

              <div style={{ position: 'absolute', zIndex: -1, right: -40, top: '20%', width: 130, height: 130, borderRadius: '50%', background: '#14b8a6', filter: 'blur(50px)', opacity: 0.3 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: -30, bottom: -20, width: 160, height: 160, borderRadius: '50%', background: '#047857', filter: 'blur(60px)', opacity: 0.2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: 'Unlimited', label: 'Custom staff roles' },
            { val: '100%', label: 'Actions audit logged' },
            { val: 'Masked', label: 'Member phone numbers' },
            { val: '0', label: 'Data leak anxiety' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#0d9488', letterSpacing: -1 }}>{s.val}</div>
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
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>One password for everyone is dangerous.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>When all staff use the same admin login, you can't protect your financials, you can't stop data theft, and you can't prove who made a mistake.</p>
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
            <span style={{ background: '#ccfbf1', color: '#0d9488', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Total control over your gym's brain.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#0d9488' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
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
                      <CheckCircle2 size={17} color="#2dd4bf" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Lock size={40} color="#334155" />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>📷 Add screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#ccfbf1', color: '#0d9488', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Real Scenarios</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Peace of mind, finally.</h2>
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
      <section style={{ background: 'linear-gradient(135deg, #0f766e 0%, #065f46 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <Shield size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Lock down your gym's data today.</h2>
          <p style={{ fontSize: 18, color: '#ccfbf1', lineHeight: 1.7, marginBottom: 40 }}>Stop sharing passwords. Give every staff member exactly the access they need, and track every move they make.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#0d9488', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Book a Demo</button>
          </div>
          <p style={{ fontSize: 13, color: '#ccfbf1', fontWeight: 500 }}>No setup fees • Cancel anytime • Bank-grade security</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RolePermissions;
