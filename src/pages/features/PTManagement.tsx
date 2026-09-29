import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Clock, BarChart2, Calendar, Users, Star, Smartphone, TrendingUp, Zap, Target, DollarSign, ClipboardList, UserCheck, Award } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./PTManagement.css";
export interface PTManagementProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <Clock size={22} color="#f87171" />,
  title: "PT sessions tracked in paper registers",
  desc: "Trainers log sessions in notebooks or Excel. At month-end, you're manually counting sessions to calculate dues — errors guaranteed."
}, {
  icon: <DollarSign size={22} color="#f87171" />,
  title: "Clients dispute session counts",
  desc: "No proof, no records. Clients argue about how many PT sessions remain, and you have no audit trail to resolve it professionally."
}, {
  icon: <BarChart2 size={22} color="#f87171" />,
  title: "Zero visibility into client progress",
  desc: "Body measurements, strength milestones, and weight loss tracked in scattered WhatsApp messages. Nothing centralized, nothing shareable."
}, {
  icon: <Calendar size={22} color="#f87171" />,
  title: "Renewals fall through the cracks",
  desc: "PT packages expire silently. No auto-reminder means the client stops coming. You notice only when their name vanishes from the roster."
}];
const tabs = [{
  label: "Sessions",
  sub: "Log & track every PT",
  title: "Every session. Logged instantly.",
  desc: "Trainers mark sessions complete from their mobile app the moment they happen. Client gets notified. Balance updates automatically. No paper, no confusion — an exact audit trail you can show any client, any time.",
  bullets: ["One-tap session logging from trainer app", "Client session balance auto-updates", "Full session history with timestamps"]
}, {
  label: "Progress",
  sub: "Client body metrics",
  title: "Track the transformation, not just the session.",
  desc: "Log body weight, body fat %, chest, waist, hip measurements, and strength milestones after every session. Generate a visual progress chart for the client. Nothing motivates renewals like showing them their own data.",
  bullets: ["Weight, body fat, girth measurements", "Progress photos linked to session dates", "Auto-generated progress PDF for client"]
}, {
  label: "Billing",
  sub: "PT packages & renewals",
  title: "PT packages that sell and renew themselves.",
  desc: "Create unlimited PT package types — 8 sessions, 12 sessions, monthly, quarterly. Assign to members, track remaining sessions, and fire automatic renewal reminders 3 days before the package expires.",
  bullets: ["Flexible session-count packages", "Auto renewal WhatsApp reminder", "Online payment link on renewal nudge"]
}];
const scenarios = [{
  icon: <Award size={22} color="#f59e0b" />,
  title: "Client asks 'how many sessions left?'",
  desc: "Trainer opens the app. Shows client the remaining session count and last session date in real time. Zero arguments, zero awkwardness."
}, {
  icon: <Target size={22} color="#ef4444" />,
  title: "Month-end PT billing in 2 minutes",
  desc: "Every session logged. Every package tracked. Export a clean billing report or send individual payment links — done before your morning chai."
}, {
  icon: <TrendingUp size={22} color="#22c55e" />,
  title: "Progress report closes the renewal",
  desc: "Client says she's thinking about it. You pull up 3 months of body measurements and a before/after comparison. She renews on the spot."
}, {
  icon: <Users size={22} color="#3b82f6" />,
  title: "Trainer assigned, client notified",
  desc: "Assign a PT trainer to a new client. Client gets a WhatsApp introducing the trainer, their bio, and schedule. Professional from day one."
}, {
  icon: <Zap size={22} color="#8b5cf6" />,
  title: "Package expires → auto WhatsApp fires",
  desc: "3 days before expiry, a renewal reminder with a payment link goes out automatically. No reminder, no manual follow-up needed."
}, {
  icon: <Star size={22} color="#ec4899" />,
  title: "Top PT clients get referral rewards",
  desc: "Tag high-value PT clients, export their contact list, and send a referral campaign with one click. Your best clients bring you more clients."
}];
const steps = [{
  title: "Create PT packages",
  desc: "Define session counts, validity, and pricing once. Reuse for every client."
}, {
  title: "Assign trainer & client",
  desc: "Link a PT trainer to the member. Both get app access immediately."
}, {
  title: "Log sessions live",
  desc: "Trainer taps 'Session Done'. Balance updates. Client sees it in real time."
}, {
  title: "Auto-renew reminders",
  desc: "System sends WhatsApp 3 days before package expires. Client pays, package extends."
}];
const faqs = [{
  q: "Can a member have both a gym membership and a PT package?",
  a: "Yes. PT packages are completely separate from the gym membership. A member can hold an active annual membership and an 8-session PT package simultaneously, each tracked independently."
}, {
  q: "What if the trainer forgets to log a session?",
  a: "Admins can manually add sessions with a date and note. Every manual addition is logged with the admin's name for full accountability."
}, {
  q: "Can clients see their own session history?",
  a: "Yes. The member app shows remaining sessions, completed session history with dates, and progress measurements logged by the trainer."
}, {
  q: "How does PT billing work with Razorpay?",
  a: "When a renewal reminder fires, a payment link is included. The client pays online, the package auto-extends, and the trainer is notified. Zero manual steps."
}, {
  q: "Can one member have multiple active PT packages?",
  a: "Yes — for example, a strength package and a yoga package from different trainers, each with its own session balance and history."
}];
export const PTManagement: React.FC<PTManagementProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<ClipboardList size={20} />, <BarChart2 size={20} />, <DollarSign size={20} />];
  return <div className="ptmanagement-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — deep navy + indigo gradient ══ */}
      <section className="ptmanagement-inline-2">
        <div className="ptmanagement-inline-3" />
        <div className="ptmanagement-inline-4" />

        <div className="ptmanagement-inline-5">
          <div className="ptmanagement-inline-6">

            {/* Left */}
            <div>
              <div className="ptmanagement-inline-7">
                <span className="ptmanagement-inline-8" />
                PT Management
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="ptmanagement-inline-9">
                Every PT session.{' '}
                <span className="ptmanagement-inline-10">
                  Tracked. Billed. Renewed.
                </span>
              </h1>

              <p className="ptmanagement-inline-11">
                Replace PT paper registers with a live session tracker. Clients see their balance, trainers log in one tap, and renewals happen automatically. Your PT revenue — finally under control.
              </p>

              <div className="ptmanagement-inline-12">
                <button className="ptmanagement-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="ptmanagement-inline-14">
                  Book a Demo
                </button>
              </div>

              <div className="ptmanagement-inline-15">
                {['Session audit trail', 'Auto renewal reminders', 'Progress tracking built-in'].map(t => <span key={t} className="ptmanagement-inline-16">
                    <CheckCircle2 size={14} color="#818cf8" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — PT session card mockup */}
            <div className="ptmanagement-inline-17">
              <div className="ptmanagement-inline-18">
                {/* Header */}
                <div className="ptmanagement-inline-19">
                  <div className="ptmanagement-inline-20">Active PT Package</div>
                  <div className="ptmanagement-inline-21">
                    <div>
                      <div className="ptmanagement-inline-22">Priya Sharma</div>
                      <div className="ptmanagement-inline-23">Strength & Conditioning · Ravi Kumar</div>
                    </div>
                    <div className="ptmanagement-inline-24">PS</div>
                  </div>
                </div>

                {/* Session balance */}
                <div className="ptmanagement-inline-25">
                  <div className="ptmanagement-inline-26">
                    <div className="ptmanagement-inline-27">
                      <div className="ptmanagement-inline-28">4</div>
                      <div className="ptmanagement-inline-29">Remaining</div>
                    </div>
                    <div className="ptmanagement-inline-30">
                      <div className="ptmanagement-inline-31">8</div>
                      <div className="ptmanagement-inline-32">Total</div>
                    </div>
                    <div className="ptmanagement-inline-33">
                      <div className="ptmanagement-inline-34">4</div>
                      <div className="ptmanagement-inline-35">Done</div>
                    </div>
                  </div>
                  <div className="ptmanagement-inline-36">
                    <div className="ptmanagement-inline-37" />
                  </div>
                  <div className="ptmanagement-inline-38">Expires Dec 15, 2026</div>
                </div>

                {/* Recent sessions */}
                <div className="ptmanagement-inline-39">
                  <div className="ptmanagement-inline-40">Recent Sessions</div>
                  {[{
                  date: 'Jul 17',
                  note: 'Deadlift PR: 80kg',
                  done: true
                }, {
                  date: 'Jul 15',
                  note: 'Upper body hypertrophy',
                  done: true
                }, {
                  date: 'Jul 13',
                  note: 'HIIT cardio circuit',
                  done: true
                }].map((s, i) => <div key={i} style={{
                  borderBottom: i < 2 ? '1px solid #f8fafc' : 'none'
                }} className="ptmanagement-inline-41">
                      <div className="ptmanagement-inline-42">
                        <CheckCircle2 size={14} color="#6366f1" />
                      </div>
                      <div className="ptmanagement-inline-43">
                        <div className="ptmanagement-inline-44">{s.note}</div>
                        <div className="ptmanagement-inline-45">{s.date}</div>
                      </div>
                    </div>)}
                </div>

                <div className="ptmanagement-inline-46">
                  <button className="ptmanagement-inline-47">
                    <UserCheck size={16} /> Log Today's Session
                  </button>
                </div>
              </div>

              <div style={{
              zIndex: -1,
              right: -40
            }} className="ptmanagement-inline-48" />
              <div style={{
              zIndex: -1,
              left: -30,
              bottom: -20
            }} className="ptmanagement-inline-49" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="ptmanagement-inline-50">
        <div className="ptmanagement-inline-51">
          {[{
          val: '1 tap',
          label: 'Session logging speed'
        }, {
          val: '0',
          label: 'Session count disputes'
        }, {
          val: 'Auto',
          label: 'Renewal reminders sent'
        }, {
          val: '100%',
          label: 'Audit trail accuracy'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="ptmanagement-inline-52">
              <div style={{
            letterSpacing: -1
          }} className="ptmanagement-inline-53">{s.val}</div>
              <div className="ptmanagement-inline-54">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="ptmanagement-inline-55">
        <div className="ptmanagement-inline-56">
          <div className="ptmanagement-inline-57">
            <span className="ptmanagement-inline-58">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="ptmanagement-inline-59">PT revenue is leaking everywhere.</h2>
            <p className="ptmanagement-inline-60">Most gyms lose 20–30% of PT revenue to under-counted sessions, missed renewals, and disputes that could have been prevented.</p>
          </div>
          <div className="ptmanagement-inline-61">
            {painPoints.map((p, i) => <div key={i} className="ptmanagement-inline-62">
                <div className="ptmanagement-inline-63">{p.icon}</div>
                <h3 className="ptmanagement-inline-64">{p.title}</h3>
                <p className="ptmanagement-inline-65">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="ptmanagement-inline-66">
        <div className="ptmanagement-inline-67">
          <div className="ptmanagement-inline-68">
            <span className="ptmanagement-inline-69">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="ptmanagement-inline-70">Sessions. Progress. Billing. One system.</h2>
          </div>

          <div className="ptmanagement-inline-71">
            <div className="ptmanagement-inline-72">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="ptmanagement-inline-73">
                  <div style={{
                background: activeTab === i ? '#ea580c' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="ptmanagement-inline-74">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="ptmanagement-inline-75">{t.label}</span>
                  <span className="ptmanagement-inline-76">{t.sub}</span>
                </button>)}
            </div>
            <div className="ptmanagement-inline-77">
              <div className="ptmanagement-inline-78">
                <h3 className="ptmanagement-inline-79">{tabs[activeTab].title}</h3>
                <p className="ptmanagement-inline-80">{tabs[activeTab].desc}</p>
                <ul className="ptmanagement-inline-81">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="ptmanagement-inline-82">
                      <CheckCircle2 size={17} color="#fb923c" className="ptmanagement-inline-83" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="ptmanagement-inline-84">
                <Smartphone size={40} color="#334155" />
                <span className="ptmanagement-inline-85">📷 Add screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="ptmanagement-inline-86">
        <div className="ptmanagement-inline-87">
          <div className="ptmanagement-inline-88">
            <span className="ptmanagement-inline-89">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="ptmanagement-inline-90">PT management that actually pays for itself.</h2>
          </div>
          <div className="ptmanagement-inline-91">
            {scenarios.map((s, i) => <div key={i} className="ptmanagement-inline-92">
                <div className="ptmanagement-inline-93">{s.icon}</div>
                <h3 className="ptmanagement-inline-94">{s.title}</h3>
                <p className="ptmanagement-inline-95">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section className="ptmanagement-inline-96">
        <div className="ptmanagement-inline-97">
          <div className="ptmanagement-inline-98">
            <span className="ptmanagement-inline-99">Setup</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="ptmanagement-inline-100">PT live in 4 steps. Running forever.</h2>
          </div>
          <div className="ptmanagement-inline-101">
            {steps.map((s, i) => <div key={i} className="ptmanagement-inline-102">
                <div style={{
              top: -18
            }} className="ptmanagement-inline-103">{i + 1}</div>
                <h3 className="ptmanagement-inline-104">{s.title}</h3>
                <p className="ptmanagement-inline-105">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="ptmanagement-inline-106">
        <div className="ptmanagement-inline-107">
          <h2 style={{
          letterSpacing: -1.5
        }} className="ptmanagement-inline-108">Frequently asked</h2>
          <div className="ptmanagement-inline-109">
            {faqs.map((f, i) => <div key={i} className="ptmanagement-inline-110">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="ptmanagement-inline-111">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="ptmanagement-inline-112" />
                </button>
                {openFaq === i && <div className="ptmanagement-inline-113">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="ptmanagement-inline-114">
        <div className="ptmanagement-inline-115">
          <div className="ptmanagement-inline-116">
            <Target size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="ptmanagement-inline-117">Stop letting PT revenue walk out the door.</h2>
          <p className="ptmanagement-inline-118">Every session logged. Every package tracked. Every renewal sent automatically. Your PT business — finally running like a business.</p>
          <div className="ptmanagement-inline-119">
            <button className="ptmanagement-inline-120">
              Start Free Trial <ArrowRight size={17} className="ptmanagement-inline-121" />
            </button>
            <button className="ptmanagement-inline-122">Book a Demo</button>
          </div>
          <p className="ptmanagement-inline-123">No setup fees • Cancel anytime • Built for modern gyms</p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default PTManagement;