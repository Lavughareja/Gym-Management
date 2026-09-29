import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, DollarSign, Calendar, BarChart2, Users, Clock, Star, Clipboard, Smartphone, TrendingUp, Zap, ShieldCheck, Award } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./TrainerManagement.css";
export interface TrainerManagementProps {
  onBack: () => void;
}

/* ─── static data ─────────────────────────────────── */
const painPoints = [{
  icon: <DollarSign size={22} color="#f87171" />,
  title: "Payout disputes every month",
  desc: "Manually calculating commission splits from raw attendance data causes errors, arguments, and delayed payments that kill trainer morale."
}, {
  icon: <Calendar size={22} color="#f87171" />,
  title: "Schedule clashes no one sees coming",
  desc: "Double-booking trainers across time slots, classes, and PT sessions — without a unified view — burns time and disappoints members."
}, {
  icon: <BarChart2 size={22} color="#f87171" />,
  title: "No visibility into trainer performance",
  desc: "You don't know which trainers are retaining members, hitting renewal rates, or slipping on attendance until it's already a problem."
}, {
  icon: <Clipboard size={22} color="#f87171" />,
  title: "Trainer plans live in WhatsApp",
  desc: "Workout plans are sent over chat, overwritten by accidents, and impossible to track. Members get inconsistent routines every week."
}];
const tabs = [{
  label: "Payouts",
  sub: "Auto commission engine",
  title: "Accurate payouts. Zero arguments.",
  desc: "Define each trainer's commission structure once — fixed salary, revenue share, or per-session fees. Trainix auto-calculates payouts every month based on actual sessions logged, PT renewals, and attendance data.",
  bullets: ["Fixed, % share, or hybrid commission models", "Salary slips auto-generated as PDF", "Payout history visible to trainer in their app"]
}, {
  label: "Scheduling",
  sub: "Conflict-free calendar",
  title: "One calendar. Every trainer. Zero clashes.",
  desc: "Assign trainers to shifts, group classes, and PT slots from a single drag-and-drop calendar. Conflict alerts fire automatically if a trainer is double-booked. Members always know who they're meeting and when.",
  bullets: ["Drag-and-drop schedule builder", "Real-time conflict detection", "Trainer availability self-management"]
}, {
  label: "Performance",
  sub: "Data-backed reviews",
  title: "Know your best trainers before they leave.",
  desc: "Track each trainer's session completion rate, member renewal influence, attendance punctuality, and client progress scores. Spot high performers to reward, and low performers to coach — before members notice.",
  bullets: ["Per-trainer retention & renewal rate", "Session completion & punctuality scores", "Monthly performance report cards"]
}];
const scenarios = [{
  icon: <Award size={22} color="#8b5cf6" />,
  title: "Bonus trigger for top performers",
  desc: "Set a bonus rule: if a trainer logs 95%+ sessions with 90%+ member renewal, a bonus is auto-added to their next payout. Zero manual tracking."
}, {
  icon: <Users size={22} color="#3b82f6" />,
  title: "New trainer onboarding in 2 minutes",
  desc: "Add a trainer, assign their contract type, set availability windows, and link their members. They get an app login and are live before the day ends."
}, {
  icon: <Clock size={22} color="#f59e0b" />,
  title: "Trainer goes on leave — smooth handoff",
  desc: "Mark a trainer on leave. Their assigned members get auto-reassigned to available trainers and notified over WhatsApp. No calls, no confusion."
}, {
  icon: <Star size={22} color="#ec4899" />,
  title: "Member requests a specific trainer",
  desc: "A new member asks for 'the one who helped Priya lose 10kg'. You can look up trainer profiles, see specialisations, and assign in two taps."
}, {
  icon: <TrendingUp size={22} color="#22c55e" />,
  title: "End-of-month payout in one click",
  desc: "Every attendance log, PT renewal, and session note feeds directly into the payout engine. Month-end takes 60 seconds, not 4 hours."
}, {
  icon: <Zap size={22} color="#f97316" />,
  title: "Trainer app keeps staff accountable",
  desc: "Trainers log sessions, mark attendance, and share workout plans directly from their phone. The gym owner sees everything in real time."
}];
const steps = [{
  title: "Add trainer profile",
  desc: "Name, photo, specialisation, certifications, contact. Takes 90 seconds."
}, {
  title: "Set commission & contract",
  desc: "Choose fixed salary, per-session, or revenue-share. Save once, apply forever."
}, {
  title: "Assign members & slots",
  desc: "Pick their working hours and drag-assign existing members to their schedule."
}, {
  title: "Trainer goes live",
  desc: "They get app access, see their schedule, and start logging sessions immediately."
}];
const faqs = [{
  q: "Can a trainer see other trainers' data?",
  a: "No. Role-based access ensures each trainer only sees their own schedule, members, sessions, and payout history. Only admins have full visibility."
}, {
  q: "How does the commission calculator work?",
  a: "You define the rule once (e.g., '₹300 per PT session + 10% of the member's renewal value'). Every logged session and renewal automatically feeds into the monthly payout calculation."
}, {
  q: "Can trainers manage their own availability?",
  a: "Yes. Trainers can block unavailable slots from their mobile app. The scheduling view on the admin side updates in real time, preventing double bookings."
}, {
  q: "What happens to a trainer's members if they leave?",
  a: "You can bulk-reassign all their active members to one or more trainers in a single action. Members are notified automatically over WhatsApp."
}, {
  q: "Is the trainer app a separate download?",
  a: "No. Trainers use the same Trainix mobile app with a trainer-specific view. There is nothing additional to install or configure."
}];

/* ─── component ───────────────────────────────────── */
export const TrainerManagement: React.FC<TrainerManagementProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<DollarSign size={20} />, <Calendar size={20} />, <BarChart2 size={20} />];
  return <div className="trainer-management-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — teal/green gradient (different from Member Mgmt purple) ══ */}
      <section className="trainer-management-inline-2">
        {/* blobs */}
        <div className="trainer-management-inline-3" />
        <div className="trainer-management-inline-4" />

        <div className="trainer-management-inline-5">

          {/* back button — simple link style, no pill */}

          <div className="trainer-management-inline-6">

            {/* Left */}
            <div>
              <div className="trainer-management-inline-7">
                <span className="trainer-management-inline-8" />
                Trainer Management
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="trainer-management-inline-9">
                Your trainers.{' '}
                <span className="trainer-management-inline-10">
                  Paid right,
                </span>{' '}
                scheduled right.
              </h1>

              <p className="trainer-management-inline-11">
                Automated commission payouts, conflict-free scheduling, and real-time performance tracking — all in one place. Stop managing trainers in WhatsApp and Excel.
              </p>

              <div className="trainer-management-inline-12">
                <button className="trainer-management-inline-13">Start Free Trial <ArrowRight size={18} /></button>
                <button className="trainer-management-inline-14">Book a Demo</button>
              </div>

              <div className="trainer-management-inline-15">
                {['No manual payout math', 'WhatsApp notifications', 'Trainer mobile app included'].map(t => <span key={t} className="trainer-management-inline-16">
                    <CheckCircle2 size={14} color="#34d399" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — dashboard mockup */}
            <div className="trainer-management-inline-17">
              <div className="trainer-management-inline-18">
                {/* Header bar */}
                <div className="trainer-management-inline-19">
                  <div>
                    <div className="trainer-management-inline-20">Payout Preview — July 2026</div>
                    <div className="trainer-management-inline-21">₹1,24,500</div>
                    <div className="trainer-management-inline-22">4 trainers · 3 pending approval</div>
                  </div>
                  <div className="trainer-management-inline-23">
                    <DollarSign size={22} color="#fff" />
                  </div>
                </div>

                {/* Trainer rows */}
                {[{
                name: 'Ravi Kumar',
                role: 'PT + Group',
                amount: '₹38,200',
                status: 'Approved',
                color: '#16a34a',
                bg: '#dcfce7'
              }, {
                name: 'Neha Sharma',
                role: 'Yoga Specialist',
                amount: '₹29,800',
                status: 'Pending',
                color: '#d97706',
                bg: '#fef3c7'
              }, {
                name: 'Arjun Mehta',
                role: 'Strength Coach',
                amount: '₹32,500',
                status: 'Approved',
                color: '#16a34a',
                bg: '#dcfce7'
              }, {
                name: 'Priya Patel',
                role: 'Zumba + Pilates',
                amount: '₹24,000',
                status: 'Review',
                color: '#7c3aed',
                bg: '#ede9fe'
              }].map((tr, i) => <div key={i} style={{
                borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none'
              }} className="trainer-management-inline-24">
                    <div className="trainer-management-inline-25">
                      <div style={{
                    background: `hsl(${i * 70 + 120},60%,85%)`
                  }} className="trainer-management-inline-26">
                        {tr.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="trainer-management-inline-27">{tr.name}</div>
                        <div className="trainer-management-inline-28">{tr.role}</div>
                      </div>
                    </div>
                    <div className="trainer-management-inline-29">
                      <div className="trainer-management-inline-30">{tr.amount}</div>
                      <span style={{
                    background: tr.bg,
                    color: tr.color
                  }} className="trainer-management-inline-31">{tr.status}</span>
                    </div>
                  </div>)}

                <div className="trainer-management-inline-32">
                  <button className="trainer-management-inline-33">
                    Approve All & Pay <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* glow blobs */}
              <div style={{
              zIndex: -1,
              right: -40
            }} className="trainer-management-inline-34" />
              <div style={{
              zIndex: -1,
              left: -30,
              bottom: -20
            }} className="trainer-management-inline-35" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="trainer-management-inline-36">
        <div className="trainer-management-inline-37">
          {[{
          val: '< 60s',
          label: 'Monthly payout calculation'
        }, {
          val: '0',
          label: 'Manual spreadsheet errors'
        }, {
          val: '100%',
          label: 'Session visibility for owners'
        }, {
          val: '24×7',
          label: 'Trainer app uptime'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="trainer-management-inline-38">
              <div style={{
            letterSpacing: -1
          }} className="trainer-management-inline-39">{s.val}</div>
              <div className="trainer-management-inline-40">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="trainer-management-inline-41">
        <div className="trainer-management-inline-42">
          <div className="trainer-management-inline-43">
            <span className="trainer-management-inline-44">Where It Breaks Down</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="trainer-management-inline-45">Managing trainers manually is a full-time job.</h2>
            <p className="trainer-management-inline-46">Most gym owners spend 10+ hours a month on trainer admin that should take 10 minutes.</p>
          </div>
          <div className="trainer-management-inline-47">
            {painPoints.map((p, i) => <div key={i} className="trainer-management-inline-48">
                <div className="trainer-management-inline-49">
                  {p.icon}
                </div>
                <h3 className="trainer-management-inline-50">{p.title}</h3>
                <p className="trainer-management-inline-51">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ INTERACTIVE TABS ══ */}
      <section className="trainer-management-inline-52">
        <div className="trainer-management-inline-53">
          <div className="trainer-management-inline-54">
            <span className="trainer-management-inline-55">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="trainer-management-inline-56">Three systems. One dashboard.</h2>
            <p className="trainer-management-inline-57">Payouts, scheduling, and performance management — fully integrated and talking to each other.</p>
          </div>

          <div className="trainer-management-inline-58">
            {/* Tab nav */}
            <div className="trainer-management-inline-59">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent',
              borderColor: activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'
            }} className="trainer-management-inline-60">
                  <div style={{
                background: activeTab === i ? '#059669' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="trainer-management-inline-61">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="trainer-management-inline-62">{t.label}</span>
                  <span className="trainer-management-inline-63">{t.sub}</span>
                </button>)}
            </div>

            {/* Tab content */}
            <div className="trainer-management-inline-64">
              <div className="trainer-management-inline-65">
                <h3 className="trainer-management-inline-66">{tabs[activeTab].title}</h3>
                <p className="trainer-management-inline-67">{tabs[activeTab].desc}</p>
                <ul className="trainer-management-inline-68">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="trainer-management-inline-69">
                      <CheckCircle2 size={17} color="#34d399" className="trainer-management-inline-70" /> {b}
                    </li>)}
                </ul>
              </div>
              {/* screenshot placeholder */}
              <div className="trainer-management-inline-71">
                <Smartphone size={40} color="#334155" />
                <span className="trainer-management-inline-72">📷 Add screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="trainer-management-inline-73">
        <div className="trainer-management-inline-74">
          <div className="trainer-management-inline-75">
            <span className="trainer-management-inline-76">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="trainer-management-inline-77">When trainer management actually runs itself.</h2>
          </div>
          <div className="trainer-management-inline-78">
            {scenarios.map((s, i) => <div key={i} className="trainer-management-inline-79">
                <div className="trainer-management-inline-80">
                  {s.icon}
                </div>
                <h3 className="trainer-management-inline-81">{s.title}</h3>
                <p className="trainer-management-inline-82">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section className="trainer-management-inline-83">
        <div className="trainer-management-inline-84">
          <div className="trainer-management-inline-85">
            <span className="trainer-management-inline-86">Setup</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="trainer-management-inline-87">Trainer live in 4 steps. Permanent.</h2>
          </div>
          <div className="trainer-management-inline-88">
            {steps.map((s, i) => <div key={i} className="trainer-management-inline-89">
                <div style={{
              top: -18
            }} className="trainer-management-inline-90">
                  {i + 1}
                </div>
                <h3 className="trainer-management-inline-91">{s.title}</h3>
                <p className="trainer-management-inline-92">{s.desc}</p>
              </div>)}
          </div>

          {/* Feature highlight banner */}
          <div className="trainer-management-inline-93">
            <div>
              <div className="trainer-management-inline-94">
                <ShieldCheck size={13} /> Role-based access
              </div>
              <h3 className="trainer-management-inline-95">Trainers see only what they need to.</h3>
              <p className="trainer-management-inline-96">Granular permissions mean trainers access their own schedule, members, and session logs — nothing more. Payroll data, revenue figures, and other trainers' data stay private.</p>
            </div>
            <div className="trainer-management-inline-97">
              <ShieldCheck size={72} color="rgba(255,255,255,0.6)" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="trainer-management-inline-98">
        <div className="trainer-management-inline-99">
          <h2 style={{
          letterSpacing: -1.5
        }} className="trainer-management-inline-100">Frequently asked</h2>
          <div className="trainer-management-inline-101">
            {faqs.map((f, i) => <div key={i} className="trainer-management-inline-102">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="trainer-management-inline-103">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="trainer-management-inline-104" />
                </button>
                {openFaq === i && <div className="trainer-management-inline-105">
                    {f.a}
                  </div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section className="trainer-management-inline-106">
        <div className="trainer-management-inline-107">
          <div className="trainer-management-inline-108">
            <Users size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="trainer-management-inline-109">Happy trainers build loyal members.</h2>
          <p className="trainer-management-inline-110">When payouts are accurate, schedules are clear, and performance is visible — your trainers do their best work. Set it up in 15 minutes.</p>
          <div className="trainer-management-inline-111">
            <button className="trainer-management-inline-112">
              Start Free Trial <ArrowRight size={17} className="trainer-management-inline-113" />
            </button>
            <button className="trainer-management-inline-114">
              Book a Demo
            </button>
          </div>
          <p className="trainer-management-inline-115">No setup fees • Cancel anytime • Built for modern gyms</p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default TrainerManagement;