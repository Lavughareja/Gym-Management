import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, CalendarCheck, Clock, Fingerprint, QrCode, Users, BarChart3, Bell, UserX } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./AttendanceTracking.css";
export interface AttendanceTrackingProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <Users size={22} color="#f87171" />,
  title: "Ghost members",
  desc: "Members pay for 6 months but stop coming after week 2. You don't realize they're gone until their renewal date, at which point they refuse to renew."
}, {
  icon: <Clock size={22} color="#f87171" />,
  title: "Staff arriving late",
  desc: "Trainers claim they arrived at 6:00 AM, but the gym was actually opened at 6:30 AM by the cleaner. You have no verifiable proof of staff timings."
}, {
  icon: <UserX size={22} color="#f87171" />,
  title: "Buddy punching",
  desc: "Members sharing ID cards or staff signing in for their friends. You are losing money to unauthorized access."
}, {
  icon: <BarChart3 size={22} color="#f87171" />,
  title: "Peak hour chaos",
  desc: "You don't know exactly when your gym is most crowded, leading to understaffing during rushes and overstaffing during dead hours."
}];
const tabs = [{
  label: "Member Tracking",
  sub: "Stop losing drop-offs",
  title: "Know exactly who is coming, and who isn't.",
  desc: "Track every single visit. Set up automated 'We miss you' WhatsApp messages when a member hasn't visited in 7 days. Catch them before they lose motivation and churn.",
  bullets: ["Automated absent alerts", "Total visits per month reporting", "Average workout duration tracking"]
}, {
  label: "Staff Attendance",
  sub: "Accountability matters",
  title: "Verified staff check-ins.",
  desc: "Keep your trainers and receptionists accountable. Track exact check-in and check-out times, calculate total hours worked, and automatically deduct pay for late arrivals or unapproved leaves.",
  bullets: ["Precise time-logging", "Auto-salary deduction for lates", "Shift schedule enforcement"]
}, {
  label: "Hardware Sync",
  sub: "Biometrics & Scanners",
  title: "Hardware that just works.",
  desc: "Trainix syncs flawlessly with biometric fingerprint scanners, face recognition devices, and QR turnstiles. The moment a finger is placed, the check-in reflects on your dashboard in 0.5 seconds.",
  bullets: ["Essl / Mantra / Realtime device support", "Face recognition ready", "Instant cloud sync via API"]
}];
const scenarios = [{
  icon: <Fingerprint size={22} color="#ea580c" />,
  title: "Member places thumb",
  desc: "BEEP. The turnstile opens. On the receptionist's screen, the member's profile pops up with a big green 'Active' badge and a 'Happy Birthday' alert."
}, {
  icon: <Bell size={22} color="#3b82f6" />,
  title: "The 10-day absence",
  desc: "A member hasn't shown up for 10 days. The system automatically sends them a WhatsApp: 'Hey Priya, missing you at the gym! Let's hit a session tomorrow?'"
}, {
  icon: <Clock size={22} color="#e11d48" />,
  title: "Trainer is late",
  desc: "Trainer arrives at 7:15 AM for a 7:00 AM shift. The system logs a 'Late Arrival' flag and optionally deducts the penalty from their end-of-month payout."
}, {
  icon: <BarChart3 size={22} color="#8b5cf6" />,
  title: "Optimizing AC usage",
  desc: "You check the 'Peak Hours' graph and see the gym is empty from 1 PM to 4 PM. You schedule the AC to power down during these hours, saving electricity."
}, {
  icon: <QrCode size={22} color="#10b981" />,
  title: "Contactless QR entry",
  desc: "Instead of buying expensive biometric machines, you put an iPad at the front desk. Members open their Trainix app, scan the QR, and walk right in."
}, {
  icon: <Users size={22} color="#f59e0b" />,
  title: "End of month payroll",
  desc: "No more manually counting days in a register. The system generates a single report: 'Rahul: 26 Days Present, 2 Days Late, 2 Paid Leaves'. Salary calculated instantly."
}];
const faqs = [{
  q: "Which biometric machines are compatible?",
  a: "We integrate with 99% of cloud-push devices in the market, including Essl, Realtime, Mantra, and ZKTeco. If it supports HTTP Push APIs, it works with Trainix."
}, {
  q: "Do I need a biometric machine to use Attendance?",
  a: "No! You can use our Mobile App QR Code scanner, or the receptionist can manually click 'Mark Present' on the dashboard when a member walks in."
}, {
  q: "What happens if the internet goes down at the gym?",
  a: "Most modern biometric machines store attendance logs locally (up to 100,000 logs). The moment the internet is restored, the machine will push all pending logs to the Trainix cloud automatically."
}, {
  q: "Can I restrict members from entering if their plan expired?",
  a: "Yes. We can link directly to turnstiles or magnetic doors. If a member's plan is expired or they have unpaid dues, the door simply will not open for them."
}];
export const AttendanceTracking: React.FC<AttendanceTrackingProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<Users size={20} />, <Clock size={20} />, <Fingerprint size={20} />];
  return <div className="attendance-tracking-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Emerald / Green gradient ══ */}
      <section className="attendance-tracking-inline-2">
        <div className="attendance-tracking-inline-3" />
        <div className="attendance-tracking-inline-4" />

        <div className="attendance-tracking-inline-5">
          <div className="attendance-tracking-inline-6">

            {/* Left */}
            <div>
              <div className="attendance-tracking-inline-7">
                <span className="attendance-tracking-inline-8" />
                Attendance Tracking
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="attendance-tracking-inline-9">
                Every check-in.{' '}
                <span className="attendance-tracking-inline-10">
                  Logged instantly.
                </span>
              </h1>

              <p className="attendance-tracking-inline-11">
                Sync with biometric scanners or use mobile QR codes. Track member retention, automate staff payroll based on hours worked, and never let a member quietly drop off again.
              </p>

              <div className="attendance-tracking-inline-12">
                <button className="attendance-tracking-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="attendance-tracking-inline-14">
                  Book a Demo
                </button>
              </div>

              <div className="attendance-tracking-inline-15">
                {['Biometric sync', 'QR check-ins', 'Absentee auto-alerts'].map(t => <span key={t} className="attendance-tracking-inline-16">
                    <CheckCircle2 size={14} color="#34d399" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — Live Dashboard Mockup */}
            <div className="attendance-tracking-inline-17">
              <div className="attendance-tracking-inline-18">
                
                {/* Header */}
                <div className="attendance-tracking-inline-19">
                  <div className="attendance-tracking-inline-20">
                    <div className="attendance-tracking-inline-21">Live Dashboard</div>
                    <div className="attendance-tracking-inline-22">
                      <span className="attendance-tracking-inline-23" /> Online
                    </div>
                  </div>
                  
                  <div className="attendance-tracking-inline-24">
                    <div className="attendance-tracking-inline-25">
                      <div className="attendance-tracking-inline-26">Total Walk-ins</div>
                      <div className="attendance-tracking-inline-27">184</div>
                    </div>
                    <div className="attendance-tracking-inline-28">
                      <div className="attendance-tracking-inline-29">Staff Present</div>
                      <div className="attendance-tracking-inline-30">6/8</div>
                    </div>
                  </div>
                </div>

                {/* Log Feed */}
                <div className="attendance-tracking-inline-31">
                  <div className="attendance-tracking-inline-32">Recent Scans</div>
                  
                  {[{
                  name: 'Karan Mehra',
                  type: 'Member',
                  time: 'Just now',
                  status: 'Active',
                  bg: '#ecfdf5',
                  text: '#059669',
                  icon: <Fingerprint size={14} color="#059669" />
                }, {
                  name: 'Rahul Desai (Trainer)',
                  type: 'Staff',
                  time: '12 mins ago',
                  status: 'Checked In',
                  bg: '#f0f9ff',
                  text: '#0284c7',
                  icon: <Clock size={14} color="#0284c7" />
                }, {
                  name: 'Sneha Patel',
                  type: 'Member',
                  time: '18 mins ago',
                  status: 'Expired',
                  bg: '#fef2f2',
                  text: '#dc2626',
                  icon: <QrCode size={14} color="#dc2626" />
                }, {
                  name: 'Amit Kumar',
                  type: 'Member',
                  time: '45 mins ago',
                  status: 'Active',
                  bg: '#ecfdf5',
                  text: '#059669',
                  icon: <Fingerprint size={14} color="#059669" />
                }].map((scan, i) => <div key={i} style={{
                  borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none'
                }} className="attendance-tracking-inline-33">
                      <div style={{
                    background: scan.bg
                  }} className="attendance-tracking-inline-34">
                        {scan.icon}
                      </div>
                      <div className="attendance-tracking-inline-35">
                        <div className="attendance-tracking-inline-36">{scan.name}</div>
                        <div className="attendance-tracking-inline-37">{scan.time}</div>
                      </div>
                      <div style={{
                    color: scan.text,
                    background: scan.bg
                  }} className="attendance-tracking-inline-38">
                        {scan.status}
                      </div>
                    </div>)}
                </div>
                <div className="attendance-tracking-inline-39" />
              </div>

              <div style={{
              zIndex: -1,
              right: -40
            }} className="attendance-tracking-inline-40" />
              <div style={{
              zIndex: -1,
              left: -30,
              bottom: -20
            }} className="attendance-tracking-inline-41" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="attendance-tracking-inline-42">
        <div className="attendance-tracking-inline-43">
          {[{
          val: '<0.5s',
          label: 'Scanner sync speed'
        }, {
          val: '99%',
          label: 'Biometric device support'
        }, {
          val: 'Auto',
          label: 'Absentee notifications'
        }, {
          val: '0',
          label: 'Buddy punching incidents'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="attendance-tracking-inline-44">
              <div style={{
            letterSpacing: -1
          }} className="attendance-tracking-inline-45">{s.val}</div>
              <div className="attendance-tracking-inline-46">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="attendance-tracking-inline-47">
        <div className="attendance-tracking-inline-48">
          <div className="attendance-tracking-inline-49">
            <span className="attendance-tracking-inline-50">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="attendance-tracking-inline-51">Paper registers don't build businesses.</h2>
            <p className="attendance-tracking-inline-52">If you aren't tracking exactly who is coming to your gym, you can't prevent members from churning, and you can't verify if your staff is actually showing up on time.</p>
          </div>
          <div className="attendance-tracking-inline-53">
            {painPoints.map((p, i) => <div key={i} className="attendance-tracking-inline-54">
                <div className="attendance-tracking-inline-55">{p.icon}</div>
                <h3 className="attendance-tracking-inline-56">{p.title}</h3>
                <p className="attendance-tracking-inline-57">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="attendance-tracking-inline-58">
        <div className="attendance-tracking-inline-59">
          <div className="attendance-tracking-inline-60">
            <span className="attendance-tracking-inline-61">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="attendance-tracking-inline-62">Turn data into retention.</h2>
          </div>

          <div className="attendance-tracking-inline-63">
            <div className="attendance-tracking-inline-64">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="attendance-tracking-inline-65">
                  <div style={{
                background: activeTab === i ? '#059669' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="attendance-tracking-inline-66">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="attendance-tracking-inline-67">{t.label}</span>
                  <span className="attendance-tracking-inline-68">{t.sub}</span>
                </button>)}
            </div>
            <div className="attendance-tracking-inline-69">
              <div className="attendance-tracking-inline-70">
                <h3 className="attendance-tracking-inline-71">{tabs[activeTab].title}</h3>
                <p className="attendance-tracking-inline-72">{tabs[activeTab].desc}</p>
                <ul className="attendance-tracking-inline-73">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="attendance-tracking-inline-74">
                      <CheckCircle2 size={17} color="#34d399" className="attendance-tracking-inline-75" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="attendance-tracking-inline-76">
                <CalendarCheck size={40} color="#334155" />
                <span className="attendance-tracking-inline-77">📷 Add screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="attendance-tracking-inline-78">
        <div className="attendance-tracking-inline-79">
          <div className="attendance-tracking-inline-80">
            <span className="attendance-tracking-inline-81">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="attendance-tracking-inline-82">Smarter gym operations.</h2>
          </div>
          <div className="attendance-tracking-inline-83">
            {scenarios.map((s, i) => <div key={i} className="attendance-tracking-inline-84">
                <div className="attendance-tracking-inline-85">{s.icon}</div>
                <h3 className="attendance-tracking-inline-86">{s.title}</h3>
                <p className="attendance-tracking-inline-87">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="attendance-tracking-inline-88">
        <div className="attendance-tracking-inline-89">
          <h2 style={{
          letterSpacing: -1.5
        }} className="attendance-tracking-inline-90">Frequently asked</h2>
          <div className="attendance-tracking-inline-91">
            {faqs.map((f, i) => <div key={i} className="attendance-tracking-inline-92">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="attendance-tracking-inline-93">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="attendance-tracking-inline-94" />
                </button>
                {openFaq === i && <div className="attendance-tracking-inline-95">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="attendance-tracking-inline-96">
        <div className="attendance-tracking-inline-97">
          <div className="attendance-tracking-inline-98">
            <CalendarCheck size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="attendance-tracking-inline-99">Stop guessing. Start tracking.</h2>
          <p className="attendance-tracking-inline-100">Plug in a scanner, catch dropping members before they cancel, and track your staff's real working hours effortlessly.</p>
          <div className="attendance-tracking-inline-101">
            <button className="attendance-tracking-inline-102">
              Start Free Trial <ArrowRight size={17} className="attendance-tracking-inline-103" />
            </button>
            <button className="attendance-tracking-inline-104">Book a Demo</button>
          </div>
          <p className="attendance-tracking-inline-105">Compatible with 99% of devices • Unlimited logs • Auto-sync</p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default AttendanceTracking;