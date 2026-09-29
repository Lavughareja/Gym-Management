import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Dumbbell, ClipboardList, Target, CalendarRange, Flame, Activity, ListChecks } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./WorkoutPlans.css";
export interface WorkoutPlansProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <ClipboardList size={22} color="#a78bfa" />,
  title: "Messy paper cards",
  desc: "Trainers write workouts on paper that members lose, sweat on, or misread. There's no proper tracking of past performance."
}, {
  icon: <CalendarRange size={22} color="#a78bfa" />,
  title: "One-size-fits-all routines",
  desc: "Gyms often give the exact same generic 3-day split to a 20-year-old athlete and a 55-year-old beginner."
}, {
  icon: <Activity size={22} color="#a78bfa" />,
  title: "No progression tracking",
  desc: "Members don't know what weight they lifted last week, leading to plateaued results and eventually, canceled memberships."
}];
const tabs = [{
  label: "Custom Builder",
  sub: "Drag & drop workouts",
  title: "Build perfectly tailored plans in minutes.",
  desc: "Use our visual workout builder to drag and drop exercises, set sets, reps, rest times, and RPE. Create anything from a simple full-body circuit to a complex powerlifting block.",
  bullets: ["Drag & drop interface", "Set specific rest timers", "Superset & circuit support"]
}, {
  label: "Template Library",
  sub: "Save time for trainers",
  title: "Stop reinventing the wheel.",
  desc: "Create and save master templates for common goals (e.g., '12-Week Hypertrophy', 'Beginner Fat Loss'). Trainers can assign these templates to clients and make minor tweaks as needed.",
  bullets: ["Save unlimited templates", "One-click assignment", "Standardize your gym's coaching"]
}, {
  label: "Member App View",
  sub: "Interactive logging",
  title: "A digital logbook they'll actually use.",
  desc: "Members see their assigned workout beautifully formatted in their app. They can tap to log their weights, check off sets, and see exactly what they lifted last time.",
  bullets: ["Historical performance data", "Automatic rest timers", "Confetti upon workout completion"]
}];
const scenarios = [{
  icon: <Dumbbell size={22} color="#8b5cf6" />,
  title: "The VIP Client",
  desc: "Your premium PT client gets a bespoke 5-day split. When they log their Monday squats, the trainer immediately gets a notification and can send an encouraging message."
}, {
  icon: <ListChecks size={22} color="#10b981" />,
  title: "The Group Class Prep",
  desc: "The head coach publishes the 'Workout of the Day' (WOD) to the entire gym. Members check their app before arriving so they know exactly what to expect."
}, {
  icon: <Flame size={22} color="#f43f5e" />,
  title: "Breaking Plateaus",
  desc: "A member is stuck on their bench press. The app shows their progression chart flatlining, prompting their trainer to swap the exercise for a dumbbell variation."
}];
const faqs = [{
  q: "Can members create their own workout plans?",
  a: "Yes! While trainers can assign locked plans, members can also use the builder to create their own custom routines if they prefer to train independently."
}, {
  q: "Does it support supersets and drop sets?",
  a: "Absolutely. You can group exercises into supersets, giant sets, or designate sets as drop sets, AMRAPs, or warm-ups."
}, {
  q: "Can I sell premium workout programs?",
  a: "Yes, you can create a 12-week program and put it behind a paywall. Members can purchase it directly through the app, unlocking a new revenue stream for your gym."
}, {
  q: "Is the exercise database customizable?",
  a: "Trainix comes with 500+ built-in exercises, but you can add your own custom movements, complete with your own video demonstrations."
}];
export const WorkoutPlans: React.FC<WorkoutPlansProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<ClipboardList size={20} />, <Target size={20} />, <Dumbbell size={20} />];
  return <div className="workout-plans-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Purple gradient ══ */}
      <section className="workout-plans-inline-2">
        <div className="workout-plans-inline-3" />
        <div className="workout-plans-inline-4" />

        <div className="workout-plans-inline-5">
          <div className="workout-plans-inline-6">

            {/* Left */}
            <div>
              <div className="workout-plans-inline-7">
                <span className="workout-plans-inline-8" />
                Workout Plans
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="workout-plans-inline-9">
                Smarter programming.{' '}
                <span className="workout-plans-inline-10">
                  Better results.
                </span>
              </h1>

              <p className="workout-plans-inline-11">
                Build, assign, and track custom workout routines. Ditch the paper logbooks and give your members a premium digital coaching experience.
              </p>

              <div className="workout-plans-inline-12">
                <button className="workout-plans-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="workout-plans-inline-14">
                  View Demo Plan
                </button>
              </div>

              <div className="workout-plans-inline-15">
                {['Drag-and-drop builder', 'Superset support', 'In-app logging'].map(t => <span key={t} className="workout-plans-inline-16">
                    <CheckCircle2 size={14} color="#a78bfa" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — App Mockup for Stats */}
            <div className="workout-plans-inline-17">
              <div className="workout-plans-inline-18">
                <div className="workout-plans-inline-19"></div>
                
                <div className="workout-plans-inline-20">
                  {/* Header */}
                  <div className="workout-plans-inline-21">
                    <div className="workout-plans-inline-22">Hypertrophy Block</div>
                    <div className="workout-plans-inline-23">Week 4 • Day 1: Push</div>
                  </div>

                  {/* Content Area */}
                  <div className="workout-plans-inline-24">
                    
                    {/* Exercise Card 1 */}
                    <div className="workout-plans-inline-25">
                       <div className="workout-plans-inline-26">
                         <div>
                           <div className="workout-plans-inline-27">Bench Press</div>
                           <div className="workout-plans-inline-28">4 sets • 8-10 reps</div>
                         </div>
                         <div className="workout-plans-inline-29">A</div>
                       </div>
                       
                       {/* Sets */}
                       <div className="workout-plans-inline-30">
                         <div className="workout-plans-inline-31">
                           <span className="workout-plans-inline-32">1</span>
                           <input type="text" value="60 kg" readOnly className="workout-plans-inline-33" />
                           <input type="text" value="10 reps" readOnly className="workout-plans-inline-34" />
                           <div className="workout-plans-inline-35"><CheckCircle2 size={14} /></div>
                         </div>
                         <div className="workout-plans-inline-36">
                           <span className="workout-plans-inline-37">2</span>
                           <input type="text" value="65 kg" readOnly className="workout-plans-inline-38" />
                           <input type="text" value="8 reps" readOnly className="workout-plans-inline-39" />
                           <div className="workout-plans-inline-40"><CheckCircle2 size={14} /></div>
                         </div>
                         <div className="workout-plans-inline-41">
                           <span className="workout-plans-inline-42">3</span>
                           <input type="text" placeholder="kg" className="workout-plans-inline-43" />
                           <input type="text" placeholder="reps" className="workout-plans-inline-44" />
                           <div className="workout-plans-inline-45"></div>
                         </div>
                       </div>
                    </div>

                    {/* Superset indicator */}
                    <div className="workout-plans-inline-46">
                      <div className="workout-plans-inline-47"></div>
                      <div className="workout-plans-inline-48">Superset B</div>
                      <div className="workout-plans-inline-49"></div>
                    </div>

                    {/* Exercise Card 2 */}
                    <div className="workout-plans-inline-50">
                       <div className="workout-plans-inline-51">
                         <div>
                           <div className="workout-plans-inline-52">Incline DB Press</div>
                           <div className="workout-plans-inline-53">3 sets • 10-12 reps</div>
                         </div>
                       </div>
                    </div>
                    
                    <div className="workout-plans-inline-54">
                       <div className="workout-plans-inline-55">
                         <div>
                           <div className="workout-plans-inline-56">Pec Deck Fly</div>
                           <div className="workout-plans-inline-57">3 sets • 12-15 reps</div>
                         </div>
                       </div>
                    </div>

                  </div>
                  
                  {/* Finish Button */}
                  <div className="workout-plans-inline-58">
                    <button className="workout-plans-inline-59">Finish Workout</button>
                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="workout-plans-inline-60" />
              <div style={{
              zIndex: -1
            }} className="workout-plans-inline-61" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="workout-plans-inline-62">
        <div className="workout-plans-inline-63">
          <div className="workout-plans-inline-64">
            <span className="workout-plans-inline-65">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="workout-plans-inline-66">Workouts without friction.</h2>
          </div>
          <div className="workout-plans-inline-67">
            {scenarios.map((s, i) => <div key={i} className="workout-plans-inline-68">
                <div className="workout-plans-inline-69">{s.icon}</div>
                <h3 className="workout-plans-inline-70">{s.title}</h3>
                <p className="workout-plans-inline-71">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="workout-plans-inline-72">
        <div className="workout-plans-inline-73">
          {[{
          val: 'Minutes',
          label: 'To build a full program'
        }, {
          val: 'Unlimited',
          label: 'Workout templates'
        }, {
          val: '100%',
          label: 'Digital logging'
        }, {
          val: 'Visual',
          label: 'Progress tracking'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="workout-plans-inline-74">
              <div style={{
            letterSpacing: -1
          }} className="workout-plans-inline-75">{s.val}</div>
              <div className="workout-plans-inline-76">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="workout-plans-inline-77">
        <div className="workout-plans-inline-78">
          <div className="workout-plans-inline-79">
            <span className="workout-plans-inline-80">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="workout-plans-inline-81">Paper cards belong in the 90s.</h2>
            <p className="workout-plans-inline-82">Relying on paper logbooks or scattered WhatsApp messages leads to lost data, confused members, and trainers wasting hours on manual programming.</p>
          </div>
          <div className="workout-plans-inline-83">
            {painPoints.map((p, i) => <div key={i} className="workout-plans-inline-84">
                <div className="workout-plans-inline-85">{p.icon}</div>
                <h3 className="workout-plans-inline-86">{p.title}</h3>
                <p className="workout-plans-inline-87">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="workout-plans-inline-88">
        <div className="workout-plans-inline-89">
          <div className="workout-plans-inline-90">
            <span className="workout-plans-inline-91">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="workout-plans-inline-92">Precision programming.</h2>
          </div>

          <div className="workout-plans-inline-93">
            <div className="workout-plans-inline-94">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="workout-plans-inline-95">
                  <div style={{
                background: activeTab === i ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="workout-plans-inline-96">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="workout-plans-inline-97">{t.label}</span>
                  <span className="workout-plans-inline-98">{t.sub}</span>
                </button>)}
            </div>
            <div className="workout-plans-inline-99">
              <div className="workout-plans-inline-100">
                <h3 className="workout-plans-inline-101">{tabs[activeTab].title}</h3>
                <p className="workout-plans-inline-102">{tabs[activeTab].desc}</p>
                <ul className="workout-plans-inline-103">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="workout-plans-inline-104">
                      <CheckCircle2 size={17} color="#a78bfa" className="workout-plans-inline-105" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="workout-plans-inline-106">
                {activeTab === 0 ? <ClipboardList size={40} color="#334155" /> : activeTab === 1 ? <Target size={40} color="#334155" /> : <Dumbbell size={40} color="#334155" />}
                <span className="workout-plans-inline-107">
                  {activeTab === 0 ? 'Builder UI' : activeTab === 1 ? 'Template List' : 'Member Logbook'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="workout-plans-inline-108">
        <div className="workout-plans-inline-109">
          <h2 style={{
          letterSpacing: -1.5
        }} className="workout-plans-inline-110">Frequently asked</h2>
          <div className="workout-plans-inline-111">
            {faqs.map((f, i) => <div key={i} className="workout-plans-inline-112">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="workout-plans-inline-113">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="workout-plans-inline-114" />
                </button>
                {openFaq === i && <div className="workout-plans-inline-115">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="workout-plans-inline-116">
        <div className="workout-plans-inline-117">
          <div className="workout-plans-inline-118">
            <ClipboardList size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="workout-plans-inline-119">Train smarter today.</h2>
          <p className="workout-plans-inline-120">Transform how your gym programs and tracks workouts with our powerful builder and member app.</p>
          <div className="workout-plans-inline-121">
            <button className="workout-plans-inline-122">
              Start Free Trial <ArrowRight size={17} className="workout-plans-inline-123" />
            </button>
            <button className="workout-plans-inline-124">Talk to Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default WorkoutPlans;