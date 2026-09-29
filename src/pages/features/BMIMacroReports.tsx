import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, LineChart, Calculator, Scale, Camera, TrendingUp, Apple, Utensils } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./BMIMacroReports.css";
export interface BMIMacroReportsProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <Scale size={22} color="#f87171" />,
  title: "Blind progress",
  desc: "Members lose motivation because they don't see day-to-day weight changes. Without data to show them they are actually making progress, they churn."
}, {
  icon: <Calculator size={22} color="#f87171" />,
  title: "Disjointed tools",
  desc: "Trainers use one app for workouts, a second app for calorie tracking, and a messy Excel sheet for body measurements. Data is everywhere."
}, {
  icon: <TrendingUp size={22} color="#f87171" />,
  title: "Inaccurate estimations",
  desc: "Guessing body fat percentage or relying purely on the weighing scale fails to tell the full story of muscle gain versus fat loss."
}];
const tabs = [{
  label: "Body Metrics",
  sub: "Track everything",
  title: "A complete picture of their health.",
  desc: "Log weight, body fat percentage, muscle mass, and detailed circumferences (chest, arms, waist). Trainix automatically graphs these over time so members can visually see their transformation.",
  bullets: ["Visual progress charts", "Fat vs Muscle analysis", "Automated BMI calculation"]
}, {
  label: "Progress Photos",
  sub: "See the change",
  title: "Before and After, organized.",
  desc: "Members or trainers can snap front, back, and side profile photos. Trainix stores them chronologically with date overlays, making it incredibly easy to generate side-by-side comparison graphics.",
  bullets: ["Secure chronological storage", "1-click comparison collages", "Great for social media testimonials"]
}, {
  label: "Macro Tracking",
  sub: "Nutrition accountability",
  title: "Calories in, accurately tracked.",
  desc: "Set specific protein, carb, and fat targets for your clients. They can log their meals directly in the member app, and trainers get a dashboard view of their adherence.",
  bullets: ["Custom daily macro goals", "Adherence dashboard", "Integration with workout burn"]
}];
const scenarios = [{
  icon: <Camera size={22} color="#3b82f6" />,
  title: "The 90-Day Transformation",
  desc: "A member finishes a 12-week boot camp. You pull up their Day 1 vs Day 90 progress photos with their body fat drop overlaid. They share it on Instagram, bringing you 3 new leads."
}, {
  icon: <LineChart size={22} color="#10b981" />,
  title: "Course Correction",
  desc: "A client complains they aren't losing weight. You check their macro dashboard and see they are hitting their protein but consistently exceeding their carb limit by 200g."
}, {
  icon: <Apple size={22} color="#f43f5e" />,
  title: "Goal Milestone Alerts",
  desc: "When a member finally hits their target weight of 75kg, the app throws digital confetti and sends a congratulatory push notification, cementing their loyalty to your gym."
}];
const faqs = [{
  q: "Can members log their own measurements?",
  a: "Yes, members can input their own weight and measurements via their app. However, trainers can lock this feature so that only official gym staff can enter verified data."
}, {
  q: "Does it integrate with smart scales (like InBody)?",
  a: "Yes! Trainix can import CSV exports from major smart scale brands like InBody and Tanita, automatically populating the member's profile with extreme detail."
}, {
  q: "Are the progress photos private?",
  a: "Absolutely. Privacy is our top priority. Progress photos are encrypted and only accessible by the member and their assigned personal trainer."
}, {
  q: "How does the macro tracker compare to MyFitnessPal?",
  a: "It's built specifically for trainer-client accountability. Unlike standalone apps, when a member logs food here, the trainer instantly sees if they hit the targets set for them."
}];
export const BMIMacroReports: React.FC<BMIMacroReportsProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<LineChart size={20} />, <Camera size={20} />, <Utensils size={20} />];
  return <div className="bmimacro-reports-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Blue / Indigo gradient ══ */}
      <section className="bmimacro-reports-inline-2">
        <div className="bmimacro-reports-inline-3" />
        <div className="bmimacro-reports-inline-4" />

        <div className="bmimacro-reports-inline-5">
          <div className="bmimacro-reports-inline-6">

            {/* Left */}
            <div>
              <div className="bmimacro-reports-inline-7">
                <span className="bmimacro-reports-inline-8" />
                BMI & Macro Reports
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="bmimacro-reports-inline-9">
                Data driven.{' '}
                <span className="bmimacro-reports-inline-10">
                  Results proven.
                </span>
              </h1>

              <p className="bmimacro-reports-inline-11">
                Give your members undeniable proof that your gym works. Track weight, body fat, progress photos, and daily calories all in one beautiful dashboard.
              </p>

              <div className="bmimacro-reports-inline-12">
                <button className="bmimacro-reports-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="bmimacro-reports-inline-14">
                  View Sample Report
                </button>
              </div>

              <div className="bmimacro-reports-inline-15">
                {['Visual charts', 'Photo collages', 'Trainer oversight'].map(t => <span key={t} className="bmimacro-reports-inline-16">
                    <CheckCircle2 size={14} color="#60a5fa" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — App Mockup for Stats */}
            <div className="bmimacro-reports-inline-17">
              <div className="bmimacro-reports-inline-18">
                <div className="bmimacro-reports-inline-19"></div>
                
                <div className="bmimacro-reports-inline-20">
                  {/* Header */}
                  <div className="bmimacro-reports-inline-21">
                    <div className="bmimacro-reports-inline-22">Body Metrics</div>
                    <div className="bmimacro-reports-inline-23">Updated 2 days ago</div>
                  </div>

                  {/* Content Area */}
                  <div className="bmimacro-reports-inline-24">
                    
                    {/* Weight Card */}
                    <div className="bmimacro-reports-inline-25">
                       <div>
                         <div className="bmimacro-reports-inline-26">Weight</div>
                         <div className="bmimacro-reports-inline-27">76.4 <span className="bmimacro-reports-inline-28">kg</span></div>
                       </div>
                       <div className="bmimacro-reports-inline-29">
                         <TrendingUp size={14} /> -1.2kg
                       </div>
                    </div>

                    {/* Chart Mockup */}
                    <div className="bmimacro-reports-inline-30">
                       <div className="bmimacro-reports-inline-31">3-Month Trend</div>
                       <div className="bmimacro-reports-inline-32">
                          <div className="bmimacro-reports-inline-33" />
                          <div className="bmimacro-reports-inline-34" />
                          <div className="bmimacro-reports-inline-35" />
                          <div className="bmimacro-reports-inline-36" />
                          <div className="bmimacro-reports-inline-37" />
                       </div>
                    </div>

                    {/* Macro Card */}
                    <div className="bmimacro-reports-inline-38">
                       <div className="bmimacro-reports-inline-39">Today's Macros</div>
                       
                       <div className="bmimacro-reports-inline-40">
                          <span className="bmimacro-reports-inline-41">Protein</span>
                          <span className="bmimacro-reports-inline-42">120 / 150g</span>
                       </div>
                       <div className="bmimacro-reports-inline-43">
                          <div className="bmimacro-reports-inline-44" />
                       </div>

                       <div className="bmimacro-reports-inline-45">
                          <span className="bmimacro-reports-inline-46">Carbs</span>
                          <span className="bmimacro-reports-inline-47">180 / 200g</span>
                       </div>
                       <div className="bmimacro-reports-inline-48">
                          <div className="bmimacro-reports-inline-49" />
                       </div>
                    </div>

                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="bmimacro-reports-inline-50" />
              <div style={{
              zIndex: -1
            }} className="bmimacro-reports-inline-51" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="bmimacro-reports-inline-52">
        <div className="bmimacro-reports-inline-53">
          {[{
          val: '+45%',
          label: 'Retention rate'
        }, {
          val: 'Visual',
          label: 'Progress tracking'
        }, {
          val: '100%',
          label: 'Data security'
        }, {
          val: 'Automated',
          label: 'Macro adherence'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="bmimacro-reports-inline-54">
              <div style={{
            letterSpacing: -1
          }} className="bmimacro-reports-inline-55">{s.val}</div>
              <div className="bmimacro-reports-inline-56">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="bmimacro-reports-inline-57">
        <div className="bmimacro-reports-inline-58">
          <div className="bmimacro-reports-inline-59">
            <span className="bmimacro-reports-inline-60">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="bmimacro-reports-inline-61">Motivation dies in the dark.</h2>
            <p className="bmimacro-reports-inline-62">Members work hard, but when they don't see immediate changes in the mirror, they assume they are failing. Without hard data to prove their progress, they cancel their subscription.</p>
          </div>
          <div className="bmimacro-reports-inline-63">
            {painPoints.map((p, i) => <div key={i} className="bmimacro-reports-inline-64">
                <div className="bmimacro-reports-inline-65">{p.icon}</div>
                <h3 className="bmimacro-reports-inline-66">{p.title}</h3>
                <p className="bmimacro-reports-inline-67">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="bmimacro-reports-inline-68">
        <div className="bmimacro-reports-inline-69">
          <div className="bmimacro-reports-inline-70">
            <span className="bmimacro-reports-inline-71">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="bmimacro-reports-inline-72">Visualize success.</h2>
          </div>

          <div className="bmimacro-reports-inline-73">
            <div className="bmimacro-reports-inline-74">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="bmimacro-reports-inline-75">
                  <div style={{
                background: activeTab === i ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="bmimacro-reports-inline-76">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="bmimacro-reports-inline-77">{t.label}</span>
                  <span className="bmimacro-reports-inline-78">{t.sub}</span>
                </button>)}
            </div>
            <div className="bmimacro-reports-inline-79">
              <div className="bmimacro-reports-inline-80">
                <h3 className="bmimacro-reports-inline-81">{tabs[activeTab].title}</h3>
                <p className="bmimacro-reports-inline-82">{tabs[activeTab].desc}</p>
                <ul className="bmimacro-reports-inline-83">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="bmimacro-reports-inline-84">
                      <CheckCircle2 size={17} color="#60a5fa" className="bmimacro-reports-inline-85" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="bmimacro-reports-inline-86">
                {activeTab === 1 ? <Camera size={40} color="#334155" /> : activeTab === 2 ? <Utensils size={40} color="#334155" /> : <LineChart size={40} color="#334155" />}
                <span className="bmimacro-reports-inline-87">📷 App Dashboard UI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="bmimacro-reports-inline-88">
        <div className="bmimacro-reports-inline-89">
          <h2 style={{
          letterSpacing: -1.5
        }} className="bmimacro-reports-inline-90">Frequently asked</h2>
          <div className="bmimacro-reports-inline-91">
            {faqs.map((f, i) => <div key={i} className="bmimacro-reports-inline-92">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="bmimacro-reports-inline-93">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="bmimacro-reports-inline-94" />
                </button>
                {openFaq === i && <div className="bmimacro-reports-inline-95">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bmimacro-reports-inline-96">
        <div className="bmimacro-reports-inline-97">
          <div className="bmimacro-reports-inline-98">
            <LineChart size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="bmimacro-reports-inline-99">Prove your results.</h2>
          <p className="bmimacro-reports-inline-100">Retain members longer by showing them undeniable, data-backed proof of their transformation.</p>
          <div className="bmimacro-reports-inline-101">
            <button className="bmimacro-reports-inline-102">
              Start Free Trial <ArrowRight size={17} className="bmimacro-reports-inline-103" />
            </button>
            <button className="bmimacro-reports-inline-104">Talk to Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default BMIMacroReports;