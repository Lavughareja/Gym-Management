import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, CreditCard, Clock, BellRing, Smartphone, ShieldCheck, Banknote } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./PaymentTracking.css";
export interface PaymentTrackingProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <Clock size={22} color="#10b981" />,
  title: "Chasing late payments",
  desc: "Gym owners spend hours every week manually calling members who forgot to pay their dues, creating awkward conversations."
}, {
  icon: <BellRing size={22} color="#10b981" />,
  title: "No automated reminders",
  desc: "Members simply forget when their plan expires. Without an automated nudge, they might go weeks without renewing."
}, {
  icon: <ShieldCheck size={22} color="#10b981" />,
  title: "Cash mismanagement",
  desc: "Relying on a notebook or simple Excel sheet makes it easy for staff to misreport cash collections or lose track of pending amounts."
}];
const tabs = [{
  label: "Auto Reminders",
  sub: "Set it and forget it",
  title: "Never chase a payment again.",
  desc: "Trainix automatically sends WhatsApp and Push Notification reminders to members 3 days before expiry, on the day of expiry, and post-expiry, completely removing the awkwardness of asking for money.",
  bullets: ["WhatsApp Integration", "Customizable message templates", "Multi-stage reminder logic"]
}, {
  label: "Pending Dues",
  sub: "One clear dashboard",
  title: "Know exactly who owes what.",
  desc: "Get a clear, sorted list of all pending payments. See exactly which members are past due, the amount owed, and when they were last contacted. Resolve dues with one click.",
  bullets: ["Sort by days overdue", "One-click payment collection", "Partial payment tracking"]
}, {
  label: "Online Collection",
  sub: "Frictionless renewals",
  title: "Let them pay from their couch.",
  desc: "Members receive a secure payment link via SMS or WhatsApp. They can renew their membership instantly using credit cards, UPI, or Apple/Google Pay without ever visiting the front desk.",
  bullets: ["Stripe & Razorpay support", "Instant ledger updates", "Zero manual data entry"]
}];
const scenarios = [{
  icon: <Smartphone size={22} color="#34d399" />,
  title: "The Midnight Renewal",
  desc: "A member gets a WhatsApp reminder at 8 PM. They click the link and pay via Apple Pay. Their access is instantly renewed, and the money is in your account by morning."
}, {
  icon: <Banknote size={22} color="#10b981" />,
  title: "Partial Cash Payment",
  desc: "A student wants to pay half their yearly fee in cash today, and the rest next month. You easily log a partial payment, and Trainix automatically schedules a reminder for the balance."
}, {
  icon: <CreditCard size={22} color="#059669" />,
  title: "Turnstile Lockout",
  desc: "A member who is 5 days overdue tries to scan their QR code at the door. Trainix gently blocks entry and prompts them to pay their pending balance right there on their phone."
}];
const faqs = [{
  q: "Can I log manual cash payments?",
  a: "Yes, you can easily log cash, cheque, or external bank transfers. The system will instantly generate a digital receipt for the member."
}, {
  q: "Does Trainix take a cut of my online payments?",
  a: "No! Trainix charges zero transaction fees. You only pay the standard processing fees of your payment gateway (e.g., Stripe or Razorpay)."
}, {
  q: "Are the WhatsApp messages sent from my own number?",
  a: "Yes, we integrate with the official WhatsApp Cloud API so messages are branded with your gym's name and number."
}, {
  q: "Can I track post-dated cheques?",
  a: "Yes, you can log post-dated cheques and set their clearance dates. Trainix will remind you to deposit them on the correct day."
}];
export const PaymentTracking: React.FC<PaymentTrackingProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<BellRing size={20} />, <Clock size={20} />, <Smartphone size={20} />];
  return <div className="payment-tracking-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Emerald gradient ══ */}
      <section className="payment-tracking-inline-2">
        <div className="payment-tracking-inline-3" />
        <div className="payment-tracking-inline-4" />

        <div className="payment-tracking-inline-5">
          <div className="payment-tracking-inline-6">

            {/* Left */}
            <div>
              <div className="payment-tracking-inline-7">
                <span className="payment-tracking-inline-8" />
                Payment Tracking
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="payment-tracking-inline-9">
                Never miss a{' '}
                <span className="payment-tracking-inline-10">
                  payment.
                </span>
              </h1>

              <p className="payment-tracking-inline-11">
                Automate your renewals, collect pending dues instantly, and let the system chase payments so you can focus on building your gym.
              </p>

              <div className="payment-tracking-inline-12">
                <button className="payment-tracking-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="payment-tracking-inline-14">
                  View Dashboard
                </button>
              </div>

              <div className="payment-tracking-inline-15">
                {['WhatsApp Reminders', 'Partial Payments', 'Online Links'].map(t => <span key={t} className="payment-tracking-inline-16">
                    <CheckCircle2 size={14} color="#34d399" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — App Mockup for Stats */}
            <div className="payment-tracking-inline-17">
              <div className="payment-tracking-inline-18">
                <div className="payment-tracking-inline-19"></div>
                
                <div className="payment-tracking-inline-20">
                  {/* Header */}
                  <div className="payment-tracking-inline-21">
                    <div className="payment-tracking-inline-22">Pending Dues</div>
                    <div className="payment-tracking-inline-23">$3,250 outstanding</div>
                  </div>

                  {/* Content Area */}
                  <div className="payment-tracking-inline-24">
                    
                    {/* Member Card 1 */}
                    <div className="payment-tracking-inline-25">
                       <div className="payment-tracking-inline-26"></div>
                       <div className="payment-tracking-inline-27">
                         <div>
                           <div className="payment-tracking-inline-28">Alex Johnson</div>
                           <div className="payment-tracking-inline-29">5 days overdue</div>
                         </div>
                         <div className="payment-tracking-inline-30">$150</div>
                       </div>
                       <div className="payment-tracking-inline-31">
                         <button className="payment-tracking-inline-32">
                           <BellRing size={14} /> Nudge
                         </button>
                         <button className="payment-tracking-inline-33">
                           <CreditCard size={14} /> Pay
                         </button>
                       </div>
                    </div>

                    {/* Member Card 2 */}
                    <div className="payment-tracking-inline-34">
                       <div className="payment-tracking-inline-35"></div>
                       <div className="payment-tracking-inline-36">
                         <div>
                           <div className="payment-tracking-inline-37">Sarah Smith</div>
                           <div className="payment-tracking-inline-38">Due today</div>
                         </div>
                         <div className="payment-tracking-inline-39">$120</div>
                       </div>
                       <div className="payment-tracking-inline-40">
                         <button className="payment-tracking-inline-41">
                           <BellRing size={14} /> Nudge
                         </button>
                         <button className="payment-tracking-inline-42">
                           <CreditCard size={14} /> Pay
                         </button>
                       </div>
                    </div>
                    
                    {/* Member Card 3 */}
                    <div className="payment-tracking-inline-43">
                       <div className="payment-tracking-inline-44"></div>
                       <div className="payment-tracking-inline-45">
                         <div>
                           <div className="payment-tracking-inline-46">Marcus Cole</div>
                           <div className="payment-tracking-inline-47">Partial Balance</div>
                         </div>
                         <div className="payment-tracking-inline-48">$80</div>
                       </div>
                       <div className="payment-tracking-inline-49">
                         <button className="payment-tracking-inline-50">
                           <CreditCard size={14} /> Pay Balance
                         </button>
                       </div>
                    </div>

                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="payment-tracking-inline-51" />
              <div style={{
              zIndex: -1
            }} className="payment-tracking-inline-52" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="payment-tracking-inline-53">
        <div className="payment-tracking-inline-54">
          {[{
          val: '-85%',
          label: 'Pending Dues'
        }, {
          val: 'Automated',
          label: 'WhatsApp Reminders'
        }, {
          val: 'Instant',
          label: 'Ledger Updates'
        }, {
          val: '0%',
          label: 'Transaction Fees'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="payment-tracking-inline-55">
              <div style={{
            letterSpacing: -1
          }} className="payment-tracking-inline-56">{s.val}</div>
              <div className="payment-tracking-inline-57">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="payment-tracking-inline-58">
        <div className="payment-tracking-inline-59">
          <div className="payment-tracking-inline-60">
            <span className="payment-tracking-inline-61">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="payment-tracking-inline-62">Cashflow should be predictable.</h2>
            <p className="payment-tracking-inline-63">Chasing members for payments is uncomfortable and time-consuming. When renewals slip through the cracks, your gym loses money.</p>
          </div>
          <div className="payment-tracking-inline-64">
            {painPoints.map((p, i) => <div key={i} className="payment-tracking-inline-65">
                <div className="payment-tracking-inline-66">{p.icon}</div>
                <h3 className="payment-tracking-inline-67">{p.title}</h3>
                <p className="payment-tracking-inline-68">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="payment-tracking-inline-69">
        <div className="payment-tracking-inline-70">
          <div className="payment-tracking-inline-71">
            <span className="payment-tracking-inline-72">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="payment-tracking-inline-73">A self-driving billing engine.</h2>
          </div>

          <div className="payment-tracking-inline-74">
            <div className="payment-tracking-inline-75">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="payment-tracking-inline-76">
                  <div style={{
                background: activeTab === i ? '#10b981' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="payment-tracking-inline-77">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="payment-tracking-inline-78">{t.label}</span>
                  <span className="payment-tracking-inline-79">{t.sub}</span>
                </button>)}
            </div>
            <div className="payment-tracking-inline-80">
              <div className="payment-tracking-inline-81">
                <h3 className="payment-tracking-inline-82">{tabs[activeTab].title}</h3>
                <p className="payment-tracking-inline-83">{tabs[activeTab].desc}</p>
                <ul className="payment-tracking-inline-84">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="payment-tracking-inline-85">
                      <CheckCircle2 size={17} color="#34d399" className="payment-tracking-inline-86" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="payment-tracking-inline-87">
                {activeTab === 0 ? <BellRing size={40} color="#334155" /> : activeTab === 1 ? <Clock size={40} color="#334155" /> : <Smartphone size={40} color="#334155" />}
                <span className="payment-tracking-inline-88">
                  {activeTab === 0 ? 'Automated Comms' : activeTab === 1 ? 'Ledger UI' : 'Payment Links'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="payment-tracking-inline-89">
        <div className="payment-tracking-inline-90">
          <div className="payment-tracking-inline-91">
            <span className="payment-tracking-inline-92">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="payment-tracking-inline-93">Built for real-world gyms.</h2>
          </div>
          <div className="payment-tracking-inline-94">
            {scenarios.map((s, i) => <div key={i} className="payment-tracking-inline-95">
                <div className="payment-tracking-inline-96">{s.icon}</div>
                <h3 className="payment-tracking-inline-97">{s.title}</h3>
                <p className="payment-tracking-inline-98">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="payment-tracking-inline-99">
        <div className="payment-tracking-inline-100">
          <h2 style={{
          letterSpacing: -1.5
        }} className="payment-tracking-inline-101">Frequently asked</h2>
          <div className="payment-tracking-inline-102">
            {faqs.map((f, i) => <div key={i} className="payment-tracking-inline-103">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="payment-tracking-inline-104">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="payment-tracking-inline-105" />
                </button>
                {openFaq === i && <div className="payment-tracking-inline-106">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="payment-tracking-inline-107">
        <div className="payment-tracking-inline-108">
          <div className="payment-tracking-inline-109">
            <Banknote size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="payment-tracking-inline-110">Take control of your cashflow.</h2>
          <p className="payment-tracking-inline-111">Stop chasing members for payments and let Trainix handle the heavy lifting of billing and collections.</p>
          <div className="payment-tracking-inline-112">
            <button className="payment-tracking-inline-113">
              Start Free Trial <ArrowRight size={17} className="payment-tracking-inline-114" />
            </button>
            <button className="payment-tracking-inline-115">Talk to Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default PaymentTracking;