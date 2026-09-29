import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Target, Magnet, MessageSquare, PhoneCall, UserPlus, TrendingUp, Filter, Calendar } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./CRMLeads.css";
export interface CRMLeadsProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <Magnet size={22} color="#f87171" />,
  title: "Leads scribbled on sticky notes",
  desc: "Walk-ins write their name in a notebook. You promise to call them back, but the notebook gets lost, and they join the gym across the street."
}, {
  icon: <Filter size={22} color="#f87171" />,
  title: "No follow-up system",
  desc: "A prospect says 'I'll join next month'. Your sales team forgets to call them. You lose a ₹15,000 annual membership simply due to bad memory."
}, {
  icon: <TrendingUp size={22} color="#f87171" />,
  title: "Zero conversion tracking",
  desc: "You spend ₹10,000 on Facebook ads, get 50 inquiries, but have absolutely no idea how many actually converted into paying members."
}, {
  icon: <PhoneCall size={22} color="#f87171" />,
  title: "Cold calling without context",
  desc: "Calling a lead and asking 'Have you visited us before?' because you have no history of their previous interactions or trial classes."
}];
const tabs = [{
  label: "Lead Capture",
  sub: "Never lose a prospect",
  title: "Capture every inquiry instantly.",
  desc: "Whether they walk in, call, or fill out a web form, log the lead in Trainix in 10 seconds. Tag the source (Instagram, Walk-in, Referral) so you know exactly where your best customers come from.",
  bullets: ["Quick-add lead form", "Lead source tracking", "Auto-assign to sales staff"]
}, {
  label: "Follow-ups",
  sub: "Automated pipeline",
  title: "A pipeline that actually closes sales.",
  desc: "Move leads through a visual pipeline: New → Contacted → Trial Booked → Converted. Schedule follow-up calls with reminders. The system tells your team exactly who to call today.",
  bullets: ["Visual drag-and-drop pipeline", "Scheduled follow-up reminders", "One-click WhatsApp messaging"]
}, {
  label: "Conversion Analytics",
  sub: "Measure your ROI",
  title: "Stop guessing your marketing ROI.",
  desc: "See exactly what percentage of leads convert into paying members. Track conversion rates by staff member to see who your best closers are, and track by source to see which ads are actually working.",
  bullets: ["Conversion rate dashboards", "Sales staff performance tracking", "Marketing source ROI reports"]
}];
const scenarios = [{
  icon: <MessageSquare size={22} color="#0284c7" />,
  title: "Lead says 'Call me on Friday'",
  desc: "You log the lead, add a note 'Interested in PT', and schedule a follow-up for Friday at 11 AM. On Friday morning, Trainix reminds you to call."
}, {
  icon: <UserPlus size={22} color="#16a34a" />,
  title: "1-Click conversion to member",
  desc: "The prospect says yes! You don't have to re-enter their data. Click 'Convert to Member', pick a plan, and send them the payment link instantly."
}, {
  icon: <TrendingUp size={22} color="#8b5cf6" />,
  title: "Analyzing Instagram ad spend",
  desc: "You look at the conversion report and see that Instagram brought in 40 leads but only 2 converted, while referrals brought 10 leads and 8 converted."
}, {
  icon: <Calendar size={22} color="#ea580c" />,
  title: "Booking a trial class",
  desc: "Prospect wants to try before buying. You book a free trial session in the CRM. The system texts them a reminder 2 hours before the class."
}, {
  icon: <Magnet size={22} color="#e11d48" />,
  title: "Re-engaging dead leads",
  desc: "Filter the CRM for all leads older than 60 days who never joined. Send them a bulk WhatsApp blast: 'Try 3 days free this weekend!'."
}, {
  icon: <Target size={22} color="#059669" />,
  title: "Sales team accountability",
  desc: "At the end of the day, you see that Rahul made 15 follow-up calls and closed 3 memberships, while Amit made 0 calls. Data doesn't lie."
}];
const faqs = [{
  q: "Can I connect my Facebook/Instagram ads directly?",
  a: "Yes! Using our Zapier integration or webhooks, leads generated from Meta ads can automatically flow into your Trainix CRM in real-time."
}, {
  q: "How does the system remind staff to follow up?",
  a: "Staff have a 'Today's Tasks' dashboard. Any scheduled follow-up calls or trials for that day appear there automatically."
}, {
  q: "Can I send WhatsApp messages directly from the CRM?",
  a: "Absolutely. We have a direct WhatsApp integration. Click the WhatsApp icon next to a lead, select a template (or type a custom message), and it sends instantly."
}, {
  q: "Is there a limit on how many leads I can store?",
  a: "No. You can store unlimited leads in your CRM. We don't charge per lead or per contact."
}];
export const CRMLeads: React.FC<CRMLeadsProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<UserPlus size={20} />, <PhoneCall size={20} />, <TrendingUp size={20} />];
  return <div className="crmleads-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Deep Blue / Sky gradient ══ */}
      <section className="crmleads-inline-2">
        <div className="crmleads-inline-3" />
        <div className="crmleads-inline-4" />

        <div className="crmleads-inline-5">
          <div className="crmleads-inline-6">

            {/* Left */}
            <div>
              <div className="crmleads-inline-7">
                <span className="crmleads-inline-8" />
                CRM & Leads
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="crmleads-inline-9">
                Turn inquiries.{' '}
                <span className="crmleads-inline-10">
                  Into members.
                </span>
              </h1>

              <p className="crmleads-inline-11">
                Throw away the paper inquiry register. Capture leads digitally, automate follow-up reminders, and track your sales pipeline in real time. Never lose a potential member again.
              </p>

              <div className="crmleads-inline-12">
                <button className="crmleads-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="crmleads-inline-14">
                  Book a Demo
                </button>
              </div>

              <div className="crmleads-inline-15">
                {['Visual sales pipeline', 'Follow-up reminders', 'Conversion analytics'].map(t => <span key={t} className="crmleads-inline-16">
                    <CheckCircle2 size={14} color="#38bdf8" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — CRM Kanban Mockup */}
            <div className="crmleads-inline-17">
              <div className="crmleads-inline-18">
                
                {/* Header */}
                <div className="crmleads-inline-19">
                  <div>
                    <div className="crmleads-inline-20">Sales Pipeline</div>
                    <div className="crmleads-inline-21">43 active leads</div>
                  </div>
                  <button className="crmleads-inline-22">+ Add Lead</button>
                </div>

                {/* Pipeline Board */}
                <div className="crmleads-inline-23">
                  {/* Column 1 */}
                  <div className="crmleads-inline-24">
                    <div className="crmleads-inline-25">
                      <span className="crmleads-inline-26">New Lead</span>
                      <span className="crmleads-inline-27">2</span>
                    </div>
                    
                    <div className="crmleads-inline-28">
                      <div className="crmleads-inline-29">Vikram Singh</div>
                      <div className="crmleads-inline-30">Source: Instagram</div>
                      <div className="crmleads-inline-31">
                        <PhoneCall size={12} /> Call ASAP
                      </div>
                    </div>
                    
                    <div className="crmleads-inline-32">
                      <div className="crmleads-inline-33">Neha Sharma</div>
                      <div className="crmleads-inline-34">Source: Walk-in</div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="crmleads-inline-35">
                    <div className="crmleads-inline-36">
                      <span className="crmleads-inline-37">Trial Booked</span>
                      <span className="crmleads-inline-38">1</span>
                    </div>
                    
                    <div className="crmleads-inline-39">
                      <div className="crmleads-inline-40">Rahul Desai</div>
                      <div className="crmleads-inline-41">Source: Referral</div>
                      <div className="crmleads-inline-42">
                        <Calendar size={12} /> Today, 6:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
              zIndex: -1,
              right: -40
            }} className="crmleads-inline-43" />
              <div style={{
              zIndex: -1,
              left: -30,
              bottom: -20
            }} className="crmleads-inline-44" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="crmleads-inline-45">
        <div className="crmleads-inline-46">
          {[{
          val: '+35%',
          label: 'Average conversion lift'
        }, {
          val: '10s',
          label: 'Time to add a lead'
        }, {
          val: 'Auto',
          label: 'Follow-up reminders'
        }, {
          val: '0',
          label: 'Lost sticky notes'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="crmleads-inline-47">
              <div style={{
            letterSpacing: -1
          }} className="crmleads-inline-48">{s.val}</div>
              <div className="crmleads-inline-49">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="crmleads-inline-50">
        <div className="crmleads-inline-51">
          <div className="crmleads-inline-52">
            <span className="crmleads-inline-53">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="crmleads-inline-54">You are leaking money through bad follow-ups.</h2>
            <p className="crmleads-inline-55">Getting leads is expensive. Losing them because your staff forgot to call them back or lost the notebook is unacceptable. You need a system.</p>
          </div>
          <div className="crmleads-inline-56">
            {painPoints.map((p, i) => <div key={i} className="crmleads-inline-57">
                <div className="crmleads-inline-58">{p.icon}</div>
                <h3 className="crmleads-inline-59">{p.title}</h3>
                <p className="crmleads-inline-60">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="crmleads-inline-61">
        <div className="crmleads-inline-62">
          <div className="crmleads-inline-63">
            <span className="crmleads-inline-64">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="crmleads-inline-65">Capture. Nurture. Convert.</h2>
          </div>

          <div className="crmleads-inline-66">
            <div className="crmleads-inline-67">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="crmleads-inline-68">
                  <div style={{
                background: activeTab === i ? '#0284c7' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="crmleads-inline-69">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="crmleads-inline-70">{t.label}</span>
                  <span className="crmleads-inline-71">{t.sub}</span>
                </button>)}
            </div>
            <div className="crmleads-inline-72">
              <div className="crmleads-inline-73">
                <h3 className="crmleads-inline-74">{tabs[activeTab].title}</h3>
                <p className="crmleads-inline-75">{tabs[activeTab].desc}</p>
                <ul className="crmleads-inline-76">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="crmleads-inline-77">
                      <CheckCircle2 size={17} color="#38bdf8" className="crmleads-inline-78" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="crmleads-inline-79">
                <Target size={40} color="#334155" />
                <span className="crmleads-inline-80">📷 Add screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="crmleads-inline-81">
        <div className="crmleads-inline-82">
          <div className="crmleads-inline-83">
            <span className="crmleads-inline-84">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="crmleads-inline-85">Sales made simple.</h2>
          </div>
          <div className="crmleads-inline-86">
            {scenarios.map((s, i) => <div key={i} className="crmleads-inline-87">
                <div className="crmleads-inline-88">{s.icon}</div>
                <h3 className="crmleads-inline-89">{s.title}</h3>
                <p className="crmleads-inline-90">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="crmleads-inline-91">
        <div className="crmleads-inline-92">
          <h2 style={{
          letterSpacing: -1.5
        }} className="crmleads-inline-93">Frequently asked</h2>
          <div className="crmleads-inline-94">
            {faqs.map((f, i) => <div key={i} className="crmleads-inline-95">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="crmleads-inline-96">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="crmleads-inline-97" />
                </button>
                {openFaq === i && <div className="crmleads-inline-98">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="crmleads-inline-99">
        <div className="crmleads-inline-100">
          <div className="crmleads-inline-101">
            <Target size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="crmleads-inline-102">Close more memberships today.</h2>
          <p className="crmleads-inline-103">Throw away the paper register. Manage your sales pipeline digitally and watch your conversion rates soar.</p>
          <div className="crmleads-inline-104">
            <button className="crmleads-inline-105">
              Start Free Trial <ArrowRight size={17} className="crmleads-inline-106" />
            </button>
            <button className="crmleads-inline-107">Book a Demo</button>
          </div>
          <p className="crmleads-inline-108">No setup fees • Cancel anytime • Built for modern gyms</p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default CRMLeads;