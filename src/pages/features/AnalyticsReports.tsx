import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, LineChart, PieChart, Activity, TrendingUp, BarChart3, Presentation } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./AnalyticsReports.css";
export interface AnalyticsReportsProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <LineChart size={22} color="#64748b" />,
  title: "Blind decision making",
  desc: "Gym owners guess what marketing channels work or when to hire more staff because they don't have hard data to look at."
}, {
  icon: <Activity size={22} color="#64748b" />,
  title: "Unnoticed churn",
  desc: "Members slowly stop attending, but you only find out when they cancel. There's no early warning system for dropping engagement."
}, {
  icon: <BarChart3 size={22} color="#64748b" />,
  title: "Excel spreadsheet hell",
  desc: "Spending every Sunday manually combining export files from 3 different software tools just to figure out last month's revenue."
}];
const tabs = [{
  label: "Growth Metrics",
  sub: "Revenue & Acquisition",
  title: "See how fast you're growing.",
  desc: "Visualize your Monthly Recurring Revenue (MRR), new member sign-ups, and lead conversion rates. Understand exactly which plans are driving the most profit.",
  bullets: ["MRR tracking", "Lead conversion funnels", "Revenue heatmaps"]
}, {
  label: "Retention Data",
  sub: "Stop churn early",
  title: "Keep the members you have.",
  desc: "Track average attendance frequencies. Identify 'At-Risk' members who haven't visited in 14+ days and trigger automated re-engagement campaigns.",
  bullets: ["At-Risk member lists", "Average lifespan value (LTV)", "Attendance trends"]
}, {
  label: "Export & Share",
  sub: "For stakeholders",
  title: "Board-ready reports.",
  desc: "Generate beautiful PDF reports or raw CSV data for investors, partners, or accountants with a single click. Schedule them to auto-email every Monday.",
  bullets: ["Scheduled email reports", "PDF & CSV exports", "Multi-branch consolidation"]
}];
const scenarios = [{
  icon: <TrendingUp size={22} color="#475569" />,
  title: "The Marketing Pivot",
  desc: "You look at your lead source chart and realize Instagram ads bring in 3x more conversions than flyers. You instantly reallocate your budget."
}, {
  icon: <Activity size={22} color="#64748b" />,
  title: "Saving a Member",
  desc: "The dashboard highlights 5 members who haven't visited in 3 weeks. You send them a personalized text, 3 of them return, saving you $150/mo in churn."
}, {
  icon: <Presentation size={22} color="#94a3b8" />,
  title: "Investor Updates",
  desc: "You're opening a second location. You export a 12-month consolidated growth report that looks incredibly professional and secures your bank loan."
}];
const faqs = [{
  q: "Can I view data across multiple gym branches?",
  a: "Yes! If you have multiple locations, you can view a consolidated dashboard or drill down into branch-specific metrics."
}, {
  q: "Are the reports updated in real-time?",
  a: "Absolutely. Every time a member signs up, pays, or scans in at the door, the analytics dashboard updates instantly."
}, {
  q: "Can I set goals within the dashboard?",
  a: "Yes, you can set monthly targets for Revenue, New Members, and Retention, and track your progress visually."
}, {
  q: "Is there a limit to how far back I can view data?",
  a: "No, Trainix stores your historical data indefinitely, allowing you to run Year-over-Year (YoY) comparisons effortlessly."
}];
export const AnalyticsReports: React.FC<AnalyticsReportsProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<LineChart size={20} />, <Activity size={20} />, <Presentation size={20} />];
  return <div className="analytics-reports-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Slate/Dark Blue gradient ══ */}
      <section className="analytics-reports-inline-2">
        <div className="analytics-reports-inline-3" />
        <div className="analytics-reports-inline-4" />

        <div className="analytics-reports-inline-5">
          <div className="analytics-reports-inline-6">

            {/* Left */}
            <div>
              <div className="analytics-reports-inline-7">
                <span className="analytics-reports-inline-8" />
                Analytics & Reports
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="analytics-reports-inline-9">
                Data driven.{' '}
                <span className="analytics-reports-inline-10">
                  Gym growth.
                </span>
              </h1>

              <p className="analytics-reports-inline-11">
                Stop guessing. Make strategic decisions based on real-time data about your revenue, attendance, and member retention.
              </p>

              <div className="analytics-reports-inline-12">
                <button className="analytics-reports-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="analytics-reports-inline-14">
                  View Live Dashboard
                </button>
              </div>

              <div className="analytics-reports-inline-15">
                {['Real-time metrics', 'Custom exports', 'Multi-branch support'].map(t => <span key={t} className="analytics-reports-inline-16">
                    <CheckCircle2 size={14} color="#94a3b8" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — App Mockup for Stats */}
            <div className="analytics-reports-inline-17">
              <div className="analytics-reports-inline-18">
                <div className="analytics-reports-inline-19">
                  
                  {/* Header */}
                  <div className="analytics-reports-inline-20">
                    <div>
                      <div className="analytics-reports-inline-21">Performance</div>
                      <div className="analytics-reports-inline-22">Last 30 Days</div>
                    </div>
                    <div className="analytics-reports-inline-23">Export</div>
                  </div>

                  {/* Content Area */}
                  <div className="analytics-reports-inline-24">
                    
                    {/* Top Stats */}
                    <div className="analytics-reports-inline-25">
                      <div className="analytics-reports-inline-26">
                        <div className="analytics-reports-inline-27">Total Revenue</div>
                        <div className="analytics-reports-inline-28">$24,500</div>
                        <div className="analytics-reports-inline-29">+12% vs last month</div>
                      </div>
                      <div className="analytics-reports-inline-30">
                        <div className="analytics-reports-inline-31">New Members</div>
                        <div className="analytics-reports-inline-32">142</div>
                        <div className="analytics-reports-inline-33">+5% vs last month</div>
                      </div>
                    </div>

                    {/* Chart Mockup */}
                    <div className="analytics-reports-inline-34">
                      <div className="analytics-reports-inline-35">Revenue Growth</div>
                      <div className="analytics-reports-inline-36">
                        <div className="analytics-reports-inline-37"></div>
                        <div className="analytics-reports-inline-38"></div>
                        <div className="analytics-reports-inline-39"></div>
                        <div className="analytics-reports-inline-40"></div>
                        <div className="analytics-reports-inline-41"></div>
                        <div className="analytics-reports-inline-42"></div>
                      </div>
                      <div className="analytics-reports-inline-43">
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="analytics-reports-inline-44" />
              <div style={{
              zIndex: -1
            }} className="analytics-reports-inline-45" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="analytics-reports-inline-46">
        <div className="analytics-reports-inline-47">
          {[{
          val: 'Real-time',
          label: 'Dashboard Updates'
        }, {
          val: 'Unlimited',
          label: 'Historical Data'
        }, {
          val: 'Automated',
          label: 'Email Reports'
        }, {
          val: 'Multi',
          label: 'Branch Support'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="analytics-reports-inline-48">
              <div style={{
            letterSpacing: -1
          }} className="analytics-reports-inline-49">{s.val}</div>
              <div className="analytics-reports-inline-50">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="analytics-reports-inline-51">
        <div className="analytics-reports-inline-52">
          <div className="analytics-reports-inline-53">
            <span className="analytics-reports-inline-54">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="analytics-reports-inline-55">Operating in the dark.</h2>
            <p className="analytics-reports-inline-56">Without clear data, gym owners make emotional decisions instead of logical ones. You can't fix what you aren't measuring.</p>
          </div>
          <div className="analytics-reports-inline-57">
            {painPoints.map((p, i) => <div key={i} className="analytics-reports-inline-58">
                <div className="analytics-reports-inline-59">{p.icon}</div>
                <h3 className="analytics-reports-inline-60">{p.title}</h3>
                <p className="analytics-reports-inline-61">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="analytics-reports-inline-62">
        <div className="analytics-reports-inline-63">
          <div className="analytics-reports-inline-64">
            <span className="analytics-reports-inline-65">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="analytics-reports-inline-66">Insights at a glance.</h2>
          </div>

          <div className="analytics-reports-inline-67">
            <div className="analytics-reports-inline-68">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="analytics-reports-inline-69">
                  <div style={{
                background: activeTab === i ? '#475569' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="analytics-reports-inline-70">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="analytics-reports-inline-71">{t.label}</span>
                  <span className="analytics-reports-inline-72">{t.sub}</span>
                </button>)}
            </div>
            <div className="analytics-reports-inline-73">
              <div className="analytics-reports-inline-74">
                <h3 className="analytics-reports-inline-75">{tabs[activeTab].title}</h3>
                <p className="analytics-reports-inline-76">{tabs[activeTab].desc}</p>
                <ul className="analytics-reports-inline-77">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="analytics-reports-inline-78">
                      <CheckCircle2 size={17} color="#94a3b8" className="analytics-reports-inline-79" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="analytics-reports-inline-80">
                {activeTab === 0 ? <LineChart size={40} color="#64748b" /> : activeTab === 1 ? <Activity size={40} color="#64748b" /> : <Presentation size={40} color="#64748b" />}
                <span className="analytics-reports-inline-81">
                  {activeTab === 0 ? 'Growth Charts' : activeTab === 1 ? 'Retention Data' : 'PDF Exports'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="analytics-reports-inline-82">
        <div className="analytics-reports-inline-83">
          <h2 style={{
          letterSpacing: -1.5
        }} className="analytics-reports-inline-84">Frequently asked</h2>
          <div className="analytics-reports-inline-85">
            {faqs.map((f, i) => <div key={i} className="analytics-reports-inline-86">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="analytics-reports-inline-87">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="analytics-reports-inline-88" />
                </button>
                {openFaq === i && <div className="analytics-reports-inline-89">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="analytics-reports-inline-90">
        <div className="analytics-reports-inline-91">
          <div className="analytics-reports-inline-92">
            <BarChart3 size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="analytics-reports-inline-93">Measure what matters.</h2>
          <p className="analytics-reports-inline-94">Make intelligent, data-driven decisions that increase revenue and decrease churn.</p>
          <div className="analytics-reports-inline-95">
            <button className="analytics-reports-inline-96">
              Start Free Trial <ArrowRight size={17} className="analytics-reports-inline-97" />
            </button>
            <button className="analytics-reports-inline-98">Talk to Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default AnalyticsReports;