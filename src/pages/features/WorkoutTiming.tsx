import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Timer, History, Trophy, Dumbbell, Clock, CalendarHeart, Zap } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./WorkoutTiming.css";
export interface WorkoutTimingProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <Clock size={22} color="#f87171" />,
  title: "Scrolling Instagram between sets",
  desc: "A 1-minute rest turns into a 5-minute distraction, leading to cold muscles, a crowded gym floor, and suboptimal gains."
}, {
  icon: <Dumbbell size={22} color="#f87171" />,
  title: "Forgetting last week's weight",
  desc: "Members constantly asking themselves 'Did I lift 60kg or 65kg last Tuesday?' because they don't track progressive overload."
}, {
  icon: <History size={22} color="#f87171" />,
  title: "Losing track of sets",
  desc: "The classic 'Was that set 3 or set 4?' dilemma that every lifter faces when they don't actively log their workout."
}, {
  icon: <Timer size={22} color="#f87171" />,
  title: "Clunky third-party apps",
  desc: "Members using separate apps for timers, another for logging, and another for their gym access. It's too much friction."
}];
const tabs = [{
  label: "Smart Rest Timers",
  sub: "Keep the pace",
  title: "Auto-starting rest countdowns.",
  desc: "As soon as a member logs a set, a customizable rest timer automatically starts. It can even buzz their smartwatch or phone when it's time for the next set.",
  bullets: ["Auto-starts on set completion", "Haptic feedback (vibration)", "Custom rest periods per exercise"]
}, {
  label: "Live Logging",
  sub: "Track every rep",
  title: "Progressive overload made easy.",
  desc: "Members simply tap to log reps and weight. The app automatically pulls up their last logged weight for that exercise, ensuring they are always pushing for more.",
  bullets: ["Auto-fills previous weights", "1-tap set completion", "Volume & tonnage tracking"]
}, {
  label: "PR Celebrations",
  sub: "Gamify the workout",
  title: "Celebrate every milestone.",
  desc: "When a member hits a new One Rep Max (1RM) or volume record, the app explodes with confetti and awards them a digital badge they can share on social media.",
  bullets: ["Automatic 1RM calculation", "Social media share cards", "Confetti animations"]
}];
const scenarios = [{
  icon: <Zap size={22} color="#fbbf24" />,
  title: "The Perfect Superset",
  desc: "A member alternates between bench press and pull-ups. The app manages the transition, timing a strict 45-second rest before prompting the next exercise."
}, {
  icon: <Trophy size={22} color="#8b5cf6" />,
  title: "Hitting a 100kg Deadlift",
  desc: "A member finally pulls 100kg. The app recognizes the PR, fires a celebration animation, and the member instantly shares the milestone to their Instagram Story."
}, {
  icon: <CalendarHeart size={22} color="#ec4899" />,
  title: "Looking Back at Progress",
  desc: "After 6 months, a member opens their 'Strength Journey' tab to see a beautiful graph of their squat strength doubling since they joined your gym."
}];
const faqs = [{
  q: "Does the timer work if the phone screen is locked?",
  a: "Yes. The timer utilizes background notifications and haptics, so it will vibrate the phone or smartwatch even when the screen is locked."
}, {
  q: "Can trainers see what the members are logging?",
  a: "Absolutely. If a trainer is assigned to a member, they can view a live feed of the member's workout logs and volume tracking directly from the Trainer App."
}, {
  q: "How does the app calculate 1RM?",
  a: "We use standard strength formulas (like Epley or Brzycki) based on the weight and reps logged in a set to estimate their One Rep Max dynamically."
}, {
  q: "What if there is poor internet in the basement gym?",
  a: "No problem. The live logging works completely offline. As soon as the member connects to Wi-Fi upstairs, the entire workout syncs to the cloud."
}];
export const WorkoutTiming: React.FC<WorkoutTimingProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<Timer size={20} />, <Dumbbell size={20} />, <Trophy size={20} />];
  return <div className="workout-timing-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Yellow / Amber gradient ══ */}
      <section className="workout-timing-inline-2">
        <div className="workout-timing-inline-3" />
        <div className="workout-timing-inline-4" />

        <div className="workout-timing-inline-5">
          <div className="workout-timing-inline-6">

            {/* Left */}
            <div>
              <div className="workout-timing-inline-7">
                <span className="workout-timing-inline-8" />
                Workout Logging & Timing
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="workout-timing-inline-9">
                Never miss a set.{' '}
                <span className="workout-timing-inline-10">
                  Never guess the weight.
                </span>
              </h1>

              <p className="workout-timing-inline-11">
                Keep your members engaged on the floor with smart rest timers, progressive overload tracking, and personalized PR celebrations — all built into your gym's app.
              </p>

              <div className="workout-timing-inline-12">
                <button className="workout-timing-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="workout-timing-inline-14">
                  See it in action
                </button>
              </div>

              <div className="workout-timing-inline-15">
                {['Smart Haptic Timers', 'Offline Support', 'Auto 1RM Calcs'].map(t => <span key={t} className="workout-timing-inline-16">
                    <CheckCircle2 size={14} color="#fcd34d" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — App Mockup for Logging */}
            <div className="workout-timing-inline-17">
              <div className="workout-timing-inline-18">
                <div className="workout-timing-inline-19"></div>
                
                <div className="workout-timing-inline-20">
                  {/* Timer Header */}
                  <div className="workout-timing-inline-21">
                    <div className="workout-timing-inline-22">Resting</div>
                    <div style={{
                    letterSpacing: -2
                  }} className="workout-timing-inline-23">00:42</div>
                    <div className="workout-timing-inline-24">
                       <div className="workout-timing-inline-25" />
                    </div>
                  </div>

                  {/* Logging Area */}
                  <div className="workout-timing-inline-26">
                    <div className="workout-timing-inline-27">Barbell Squat</div>
                    
                    {/* Logged Sets */}
                    <div className="workout-timing-inline-28">
                      <div className="workout-timing-inline-29">
                         <div className="workout-timing-inline-30">
                            <div className="workout-timing-inline-31">1</div>
                            <div className="workout-timing-inline-32">80 kg × 10</div>
                         </div>
                         <CheckCircle2 size={18} color="#10b981" />
                      </div>
                      <div className="workout-timing-inline-33">
                         <div className="workout-timing-inline-34">
                            <div className="workout-timing-inline-35">2</div>
                            <div className="workout-timing-inline-36">85 kg × 8</div>
                         </div>
                         <CheckCircle2 size={18} color="#10b981" />
                      </div>
                    </div>

                    {/* Current Set Input */}
                    <div className="workout-timing-inline-37">
                      <div className="workout-timing-inline-38">Set 3 (Target: 90kg)</div>
                      <div className="workout-timing-inline-39">
                        <input type="text" defaultValue="90" className="workout-timing-inline-40" />
                        <div className="workout-timing-inline-41">kg</div>
                        <input type="text" defaultValue="8" className="workout-timing-inline-42" />
                        <div className="workout-timing-inline-43">reps</div>
                      </div>
                      <button className="workout-timing-inline-44">Finish Rest First</button>
                    </div>

                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="workout-timing-inline-45" />
              <div style={{
              zIndex: -1
            }} className="workout-timing-inline-46" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="workout-timing-inline-47">
        <div className="workout-timing-inline-48">
          {[{
          val: '100%',
          label: 'Offline support'
        }, {
          val: 'Auto',
          label: 'Rest calculation'
        }, {
          val: '1-Tap',
          label: 'History recall'
        }, {
          val: 'Smart',
          label: '1RM Estimates'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="workout-timing-inline-49">
              <div style={{
            letterSpacing: -1
          }} className="workout-timing-inline-50">{s.val}</div>
              <div className="workout-timing-inline-51">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="workout-timing-inline-52">
        <div className="workout-timing-inline-53">
          <div className="workout-timing-inline-54">
            <span className="workout-timing-inline-55">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="workout-timing-inline-56">Stop guessing on the gym floor.</h2>
            <p className="workout-timing-inline-57">Members who don't track their workouts hit plateaus faster, get frustrated, and churn. Taking out a notebook or juggling 3 different apps is annoying.</p>
          </div>
          <div className="workout-timing-inline-58">
            {painPoints.map((p, i) => <div key={i} className="workout-timing-inline-59">
                <div className="workout-timing-inline-60">{p.icon}</div>
                <h3 className="workout-timing-inline-61">{p.title}</h3>
                <p className="workout-timing-inline-62">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="workout-timing-inline-63">
        <div className="workout-timing-inline-64">
          <div className="workout-timing-inline-65">
            <span className="workout-timing-inline-66">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="workout-timing-inline-67">Everything in one flow.</h2>
          </div>

          <div className="workout-timing-inline-68">
            <div className="workout-timing-inline-69">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="workout-timing-inline-70">
                  <div style={{
                background: activeTab === i ? '#d97706' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="workout-timing-inline-71">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="workout-timing-inline-72">{t.label}</span>
                  <span className="workout-timing-inline-73">{t.sub}</span>
                </button>)}
            </div>
            <div className="workout-timing-inline-74">
              <div className="workout-timing-inline-75">
                <h3 className="workout-timing-inline-76">{tabs[activeTab].title}</h3>
                <p className="workout-timing-inline-77">{tabs[activeTab].desc}</p>
                <ul className="workout-timing-inline-78">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="workout-timing-inline-79">
                      <CheckCircle2 size={17} color="#fbbf24" className="workout-timing-inline-80" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="workout-timing-inline-81">
                <Timer size={40} color="#334155" />
                <span className="workout-timing-inline-82">📷 App Timer Mockup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="workout-timing-inline-83">
        <div className="workout-timing-inline-84">
          <div className="workout-timing-inline-85">
            <span className="workout-timing-inline-86">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="workout-timing-inline-87">Better workouts, automatically.</h2>
          </div>
          <div className="workout-timing-inline-88">
            {scenarios.map((s, i) => <div key={i} className="workout-timing-inline-89">
                <div className="workout-timing-inline-90">{s.icon}</div>
                <h3 className="workout-timing-inline-91">{s.title}</h3>
                <p className="workout-timing-inline-92">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="workout-timing-inline-93">
        <div className="workout-timing-inline-94">
          <h2 style={{
          letterSpacing: -1.5
        }} className="workout-timing-inline-95">Frequently asked</h2>
          <div className="workout-timing-inline-96">
            {faqs.map((f, i) => <div key={i} className="workout-timing-inline-97">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="workout-timing-inline-98">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="workout-timing-inline-99" />
                </button>
                {openFaq === i && <div className="workout-timing-inline-100">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="workout-timing-inline-101">
        <div className="workout-timing-inline-102">
          <div className="workout-timing-inline-103">
            <Clock size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="workout-timing-inline-104">Make every set count.</h2>
          <p className="workout-timing-inline-105">Upgrade your members' experience with smart logging and auto-timers, driving better results and higher retention.</p>
          <div className="workout-timing-inline-106">
            <button className="workout-timing-inline-107">
              Start Free Trial <ArrowRight size={17} className="workout-timing-inline-108" />
            </button>
            <button className="workout-timing-inline-109">Talk to Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default WorkoutTiming;