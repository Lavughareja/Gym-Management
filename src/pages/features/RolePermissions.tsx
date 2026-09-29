import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Shield, Users, Key, Lock, Settings, UserCog, UserX, AlertTriangle, EyeOff, Search, Edit3 } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./RolePermissions.css";
export interface RolePermissionsProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <UserX size={22} color="#f87171" />,
  title: "Staff deleting data intentionally",
  desc: "A disgruntled trainer leaves and deletes 50 member profiles before you notice. Since everyone shares the admin password, you don't even know who did it."
}, {
  icon: <EyeOff size={22} color="#f87171" />,
  title: "Front desk sees your financial data",
  desc: "Your receptionist needs to mark attendance, but because they have full access, they can also see your total revenue, profit margins, and owner payouts."
}, {
  icon: <AlertTriangle size={22} color="#f87171" />,
  title: "Accidental plan price modifications",
  desc: "A new staff member accidentally changes the annual plan from ₹12,000 to ₹1,200. Three members buy it online before you spot the error."
}, {
  icon: <Lock size={22} color="#f87171" />,
  title: "Account sharing risk",
  desc: "Staff share the admin login credentials on WhatsApp. Former employees still have access to your gym's data months after leaving."
}];
const tabs = [{
  label: "Access Roles",
  sub: "Manager, Trainer, Desk",
  title: "Give them what they need. Nothing more.",
  desc: "Create unlimited custom roles. Want the front desk to only see check-ins? Done. Want trainers to only see their own PT clients? Done. Want managers to see sales but not delete members? Done. Granular control at the click of a toggle.",
  bullets: ["Pre-built roles: Admin, Manager, Trainer, Desk", "Custom role creation builder", "Module-level read/write toggles"]
}, {
  label: "Audit Logs",
  sub: "Track every single action",
  title: "Know exactly who did what, and when.",
  desc: "Every action in Trainix is logged. If a member's expiry date is extended, the audit log shows exactly which staff member did it and at what exact time. Total accountability, zero finger-pointing.",
  bullets: ["Timestamped action tracking", "Filter logs by staff member", "Undelete / Restore capabilities"]
}, {
  label: "Data Masking",
  sub: "Hide sensitive financials",
  title: "Keep your money your business.",
  desc: "Restrict the billing and reports modules entirely. Mask member contact numbers so staff can WhatsApp them through the app without actually seeing or copying their phone number to their personal device.",
  bullets: ["Financial reporting locks", "Member phone number masking", "Export/Download restrictions"]
}];
const scenarios = [{
  icon: <Settings size={22} color="#0f766e" />,
  title: "Front desk logs in",
  desc: "They see the attendance scanner, member list (masked numbers), and daily walk-ins. The 'Reports' and 'Billing' tabs literally don't exist on their screen."
}, {
  icon: <Search size={22} color="#0369a1" />,
  title: "Investigating a deleted invoice",
  desc: "You open the Audit Log, filter by 'Deleted Invoices', and see exactly which staff account deleted it at 4:12 PM yesterday."
}, {
  icon: <UserCog size={22} color="#6d28d9" />,
  title: "Trainer sees only their PT clients",
  desc: "When a trainer opens the app, they only see members assigned to them. They cannot browse the entire gym database or poach clients."
}, {
  icon: <Edit3 size={22} color="#b45309" />,
  title: "Price edits are locked",
  desc: "A manager tries to offer a custom discount to a friend. The system blocks it because they don't have 'Override Pricing' permission. They must request your approval."
}, {
  icon: <Key size={22} color="#be185d" />,
  title: "Staff member quits",
  desc: "One click on 'Deactivate Account'. They instantly lose access to the app, web panel, and all member data. Secure in 2 seconds."
}, {
  icon: <Users size={22} color="#4338ca" />,
  title: "Multi-branch manager",
  desc: "Assign a manager access to Branch A and Branch B, but not Branch C. They can pull consolidated reports only for the branches they manage."
}];
const faqs = [{
  q: "Can I create a custom role from scratch?",
  a: "Yes. You can create a role (e.g., 'Weekend Receptionist') and manually toggle read, write, edit, and delete permissions for every single module in the system."
}, {
  q: "What happens if a staff member tries to access a blocked page via URL?",
  a: "The server verifies permissions on every request. If they try to force-navigate to an unauthorized URL, they will hit a hard 'Access Denied' screen, and the attempt is logged."
}, {
  q: "Can trainers export the member list?",
  a: "By default, no. The 'Export CSV/Excel' permission is disabled for all roles except Super Admin. You can choose to grant it if needed."
}, {
  q: "How does phone number masking work?",
  a: "Staff can click a 'WhatsApp' or 'Call' button in the app to contact the member, but the actual 10-digit number is replaced with asterisks (e.g., 98****4321) on their screen."
}];
export const RolePermissions: React.FC<RolePermissionsProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<Shield size={20} />, <Search size={20} />, <EyeOff size={20} />];
  return <div className="role-permissions-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Slate / Teal gradient ══ */}
      <section className="role-permissions-inline-2">
        <div className="role-permissions-inline-3" />
        <div className="role-permissions-inline-4" />

        <div className="role-permissions-inline-5">
          <div className="role-permissions-inline-6">

            {/* Left */}
            <div>
              <div className="role-permissions-inline-7">
                <span className="role-permissions-inline-8" />
                Role Permissions
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="role-permissions-inline-9">
                Your data.{' '}
                <span className="role-permissions-inline-10">
                  Your rules.
                </span>
              </h1>

              <p className="role-permissions-inline-11">
                Stop sharing the admin password. Give your staff individual logins with granular access control. Hide financials, block data exports, and track every action in the audit log.
              </p>

              <div className="role-permissions-inline-12">
                <button className="role-permissions-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="role-permissions-inline-14">
                  Book a Demo
                </button>
              </div>

              <div className="role-permissions-inline-15">
                {['Granular toggles', 'Audit logging', 'Number masking'].map(t => <span key={t} className="role-permissions-inline-16">
                    <CheckCircle2 size={14} color="#2dd4bf" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — Permissions Mockup */}
            <div className="role-permissions-inline-17">
              <div className="role-permissions-inline-18">
                
                {/* Header */}
                <div className="role-permissions-inline-19">
                  <div className="role-permissions-inline-20">
                    <div className="role-permissions-inline-21">
                      <div className="role-permissions-inline-22">
                        <Shield size={20} color="#fff" />
                      </div>
                      <div>
                        <div className="role-permissions-inline-23">Edit Role</div>
                        <div className="role-permissions-inline-24">Front Desk Executive</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="role-permissions-inline-25">
                  <div className="role-permissions-inline-26">Members Module</div>
                  
                  {[{
                  label: 'View Member Profiles',
                  on: true
                }, {
                  label: 'Add New Members',
                  on: true
                }, {
                  label: 'Edit Member Details',
                  on: false
                }, {
                  label: 'Delete Members',
                  on: false,
                  danger: true
                }].map((p, i) => <div key={i} className="role-permissions-inline-27">
                      <span style={{
                    color: p.danger ? '#ef4444' : '#334155'
                  }} className="role-permissions-inline-28">{p.label}</span>
                      <div style={{
                    background: p.on ? '#0d9488' : '#e2e8f0'
                  }} className="role-permissions-inline-29">
                        <div style={{
                      left: p.on ? 22 : 2
                    }} className="role-permissions-inline-30" />
                      </div>
                    </div>)}

                  <div className="role-permissions-inline-31">Financials & Reports</div>
                  
                  {[{
                  label: 'View Total Revenue',
                  on: false
                }, {
                  label: 'Export Data (Excel/CSV)',
                  on: false,
                  danger: true
                }].map((p, i) => <div key={i} style={{
                  borderBottom: i === 0 ? '1px solid #f1f5f9' : 'none'
                }} className="role-permissions-inline-32">
                      <span style={{
                    color: p.danger ? '#ef4444' : '#334155'
                  }} className="role-permissions-inline-33">{p.label}</span>
                      <div style={{
                    background: p.on ? '#0d9488' : '#e2e8f0'
                  }} className="role-permissions-inline-34">
                        <div style={{
                      left: p.on ? 22 : 2
                    }} className="role-permissions-inline-35" />
                      </div>
                    </div>)}
                </div>
                
                <div className="role-permissions-inline-36">
                  <button className="role-permissions-inline-37">
                    Save Role Permissions
                  </button>
                </div>
              </div>

              <div style={{
              zIndex: -1,
              right: -40
            }} className="role-permissions-inline-38" />
              <div style={{
              zIndex: -1,
              left: -30,
              bottom: -20
            }} className="role-permissions-inline-39" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="role-permissions-inline-40">
        <div className="role-permissions-inline-41">
          {[{
          val: 'Unlimited',
          label: 'Custom staff roles'
        }, {
          val: '100%',
          label: 'Actions audit logged'
        }, {
          val: 'Masked',
          label: 'Member phone numbers'
        }, {
          val: '0',
          label: 'Data leak anxiety'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="role-permissions-inline-42">
              <div style={{
            letterSpacing: -1
          }} className="role-permissions-inline-43">{s.val}</div>
              <div className="role-permissions-inline-44">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="role-permissions-inline-45">
        <div className="role-permissions-inline-46">
          <div className="role-permissions-inline-47">
            <span className="role-permissions-inline-48">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="role-permissions-inline-49">One password for everyone is dangerous.</h2>
            <p className="role-permissions-inline-50">When all staff use the same admin login, you can't protect your financials, you can't stop data theft, and you can't prove who made a mistake.</p>
          </div>
          <div className="role-permissions-inline-51">
            {painPoints.map((p, i) => <div key={i} className="role-permissions-inline-52">
                <div className="role-permissions-inline-53">{p.icon}</div>
                <h3 className="role-permissions-inline-54">{p.title}</h3>
                <p className="role-permissions-inline-55">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="role-permissions-inline-56">
        <div className="role-permissions-inline-57">
          <div className="role-permissions-inline-58">
            <span className="role-permissions-inline-59">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="role-permissions-inline-60">Total control over your gym's brain.</h2>
          </div>

          <div className="role-permissions-inline-61">
            <div className="role-permissions-inline-62">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="role-permissions-inline-63">
                  <div style={{
                background: activeTab === i ? '#0d9488' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="role-permissions-inline-64">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="role-permissions-inline-65">{t.label}</span>
                  <span className="role-permissions-inline-66">{t.sub}</span>
                </button>)}
            </div>
            <div className="role-permissions-inline-67">
              <div className="role-permissions-inline-68">
                <h3 className="role-permissions-inline-69">{tabs[activeTab].title}</h3>
                <p className="role-permissions-inline-70">{tabs[activeTab].desc}</p>
                <ul className="role-permissions-inline-71">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="role-permissions-inline-72">
                      <CheckCircle2 size={17} color="#2dd4bf" className="role-permissions-inline-73" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="role-permissions-inline-74">
                <Lock size={40} color="#334155" />
                <span className="role-permissions-inline-75">📷 Add screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="role-permissions-inline-76">
        <div className="role-permissions-inline-77">
          <div className="role-permissions-inline-78">
            <span className="role-permissions-inline-79">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="role-permissions-inline-80">Peace of mind, finally.</h2>
          </div>
          <div className="role-permissions-inline-81">
            {scenarios.map((s, i) => <div key={i} className="role-permissions-inline-82">
                <div className="role-permissions-inline-83">{s.icon}</div>
                <h3 className="role-permissions-inline-84">{s.title}</h3>
                <p className="role-permissions-inline-85">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="role-permissions-inline-86">
        <div className="role-permissions-inline-87">
          <h2 style={{
          letterSpacing: -1.5
        }} className="role-permissions-inline-88">Frequently asked</h2>
          <div className="role-permissions-inline-89">
            {faqs.map((f, i) => <div key={i} className="role-permissions-inline-90">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="role-permissions-inline-91">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="role-permissions-inline-92" />
                </button>
                {openFaq === i && <div className="role-permissions-inline-93">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="role-permissions-inline-94">
        <div className="role-permissions-inline-95">
          <div className="role-permissions-inline-96">
            <Shield size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="role-permissions-inline-97">Lock down your gym's data today.</h2>
          <p className="role-permissions-inline-98">Stop sharing passwords. Give every staff member exactly the access they need, and track every move they make.</p>
          <div className="role-permissions-inline-99">
            <button className="role-permissions-inline-100">
              Start Free Trial <ArrowRight size={17} className="role-permissions-inline-101" />
            </button>
            <button className="role-permissions-inline-102">Book a Demo</button>
          </div>
          <p className="role-permissions-inline-103">No setup fees • Cancel anytime • Bank-grade security</p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default RolePermissions;