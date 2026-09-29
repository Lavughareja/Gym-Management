import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, BrainCircuit, Utensils, Carrot, Settings2, Activity, Heart, Beef } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./AIDietGeneration.css";
export interface AIDietGenerationProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <Utensils size={22} color="#f87171" />,
  title: "Manual diet plans take hours",
  desc: "Your trainers spend 2 hours in Excel calculating macros and picking recipes for a single client, wasting valuable time they could spend on the floor."
}, {
  icon: <Heart size={22} color="#f87171" />,
  title: "Generic 'cookie-cutter' diets",
  desc: "Giving the exact same chicken and rice diet to a 20-year-old male and a 45-year-old female. Members know it's not personalized and ignore it."
}, {
  icon: <Carrot size={22} color="#f87171" />,
  title: "Ignoring dietary preferences",
  desc: "A vegetarian member gets assigned a diet with fish, gets frustrated, and assumes your gym doesn't care about their specific needs."
}];
const tabs = [{
  label: "Instant Generation",
  sub: "Powered by AI",
  title: "A full week of meals in 10 seconds.",
  desc: "Input the member's age, weight, goal (e.g., lose 5kg), and dietary preferences. Our AI engine instantly generates a 7-day meal plan perfectly balanced for their macro targets.",
  bullets: ["Uses scientifically backed formulas", "Accounts for allergies", "Zero manual calculation needed"]
}, {
  label: "Smart Food Swaps",
  sub: "Ultimate flexibility",
  title: "Don't like broccoli? Swap it.",
  desc: "If a member dislikes a specific meal, they can tap 'Swap' in their app. The AI instantly finds a replacement meal that exactly matches the protein, carb, and fat profile of the original.",
  bullets: ["Maintains daily macro goals", "Hundreds of recipe options", "Reduces diet abandonment"]
}, {
  label: "Grocery List Export",
  sub: "Convenience is key",
  title: "From the app to the supermarket.",
  desc: "The app automatically aggregates all the ingredients needed for the week's diet plan and generates a clean, checkable grocery list for the member.",
  bullets: ["Categorized by aisle", "Exact portion sizes", "1-tap PDF export"]
}];
const scenarios = [{
  icon: <Beef size={22} color="#f43f5e" />,
  title: "The High-Protein Vegan",
  desc: "A member wants 150g of protein daily but eats strictly vegan. The AI builds a complex meal plan using seitan, tempeh, and lentils that hits the exact macro target."
}, {
  icon: <Activity size={22} color="#10b981" />,
  title: "Adjusting for a Cut",
  desc: "A member shifts from a bulk to a cut. With one click, the trainer drops the target calories by 500, and the AI regenerates the entire meal plan instantly."
}, {
  icon: <Settings2 size={22} color="#3b82f6" />,
  title: "Trainer Oversight",
  desc: "The AI generates the base diet, but the trainer manually overrides Tuesday's dinner to include the client's favorite cheat meal while keeping macros balanced."
}];
const faqs = [{
  q: "Is the AI giving medical advice?",
  a: "No. The AI generates meal suggestions based on standard fitness nutrition formulas (like Harris-Benedict) for macronutrient distribution. It does not provide clinical dietetics."
}, {
  q: "Can trainers edit the AI-generated plans?",
  a: "Yes! The AI does the heavy lifting, but trainers have full manual control to edit meals, adjust macros, or completely rewrite specific days before sending it to the client."
}, {
  q: "What cuisines does the AI support?",
  a: "The AI is localized. If your gym is in India, it will prioritize local diets (roti, dal, paneer). If you're in the US, it adapts to standard western diets, along with keto, paleo, etc."
}, {
  q: "How do members track what they actually ate?",
  a: "Members simply open their daily plan in the app and check off the meals they ate. If they went off-plan, they can log custom calories which updates their daily progress bar."
}];
export const AIDietGeneration: React.FC<AIDietGenerationProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<BrainCircuit size={20} />, <Settings2 size={20} />, <Utensils size={20} />];
  return <div className="aidiet-generation-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Emerald / Teal gradient ══ */}
      <section className="aidiet-generation-inline-2">
        <div className="aidiet-generation-inline-3" />
        <div className="aidiet-generation-inline-4" />

        <div className="aidiet-generation-inline-5">
          <div className="aidiet-generation-inline-6">

            {/* Left */}
            <div>
              <div className="aidiet-generation-inline-7">
                <span className="aidiet-generation-inline-8" />
                AI Diet Generation
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="aidiet-generation-inline-9">
                Custom diets.{' '}
                <span className="aidiet-generation-inline-10">
                  In 10 seconds.
                </span>
              </h1>

              <p className="aidiet-generation-inline-11">
                Stop wasting hours on Excel. Let our AI engine generate hyper-personalized meal plans based on macros, allergies, and local cuisine preferences instantly.
              </p>

              <div className="aidiet-generation-inline-12">
                <button className="aidiet-generation-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="aidiet-generation-inline-14">
                  See a sample diet
                </button>
              </div>

              <div className="aidiet-generation-inline-15">
                {['Precise Macro Splitting', 'Smart Food Swaps', 'Grocery Lists'].map(t => <span key={t} className="aidiet-generation-inline-16">
                    <CheckCircle2 size={14} color="#6ee7b7" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — App Mockup for Diet */}
            <div className="aidiet-generation-inline-17">
              <div className="aidiet-generation-inline-18">
                <div className="aidiet-generation-inline-19"></div>
                
                <div className="aidiet-generation-inline-20">
                  {/* Header */}
                  <div className="aidiet-generation-inline-21">
                    <div className="aidiet-generation-inline-22">Today's Target</div>
                    <div className="aidiet-generation-inline-23">
                      <div className="aidiet-generation-inline-24">2,200</div>
                      <div className="aidiet-generation-inline-25">kcal</div>
                    </div>
                    
                    {/* Macros */}
                    <div className="aidiet-generation-inline-26">
                       <div className="aidiet-generation-inline-27">
                         <div className="aidiet-generation-inline-28">Protein</div>
                         <div className="aidiet-generation-inline-29">150g</div>
                       </div>
                       <div className="aidiet-generation-inline-30">
                         <div className="aidiet-generation-inline-31">Carbs</div>
                         <div className="aidiet-generation-inline-32">220g</div>
                       </div>
                       <div className="aidiet-generation-inline-33">
                         <div className="aidiet-generation-inline-34">Fat</div>
                         <div className="aidiet-generation-inline-35">80g</div>
                       </div>
                    </div>
                  </div>

                  {/* Meals Area */}
                  <div className="aidiet-generation-inline-36">
                    
                    {/* Meal 1 */}
                    <div className="aidiet-generation-inline-37">
                      <div className="aidiet-generation-inline-38">Breakfast</div>
                      <div className="aidiet-generation-inline-39">Oatmeal & Whey</div>
                      <div className="aidiet-generation-inline-40">50g Oats, 1 scoop Whey, 10g Almonds</div>
                      <div className="aidiet-generation-inline-41">
                        <div className="aidiet-generation-inline-42">380 kcal</div>
                        <button className="aidiet-generation-inline-43">Swap</button>
                      </div>
                    </div>

                    {/* Meal 2 */}
                    <div className="aidiet-generation-inline-44">
                      <div className="aidiet-generation-inline-45"><CheckCircle2 size={20} /></div>
                      <div className="aidiet-generation-inline-46">Lunch</div>
                      <div className="aidiet-generation-inline-47">Grilled Chicken Salad</div>
                      <div className="aidiet-generation-inline-48">150g Breast, Mixed greens, Olive oil</div>
                      <div className="aidiet-generation-inline-49">420 kcal</div>
                    </div>

                    {/* Meal 3 */}
                    <div className="aidiet-generation-inline-50">
                      <div className="aidiet-generation-inline-51">Dinner</div>
                      <div className="aidiet-generation-inline-52">Salmon & Quinoa</div>
                      <div className="aidiet-generation-inline-53">120g Salmon, 100g Quinoa, Asparagus</div>
                      <div className="aidiet-generation-inline-54">
                        <div className="aidiet-generation-inline-55">550 kcal</div>
                        <button className="aidiet-generation-inline-56">Swap</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="aidiet-generation-inline-57" />
              <div style={{
              zIndex: -1
            }} className="aidiet-generation-inline-58" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="aidiet-generation-inline-59">
        <div className="aidiet-generation-inline-60">
          {[{
          val: '10s',
          label: 'To generate a weekly plan'
        }, {
          val: '100%',
          label: 'Macro accurate'
        }, {
          val: 'Auto',
          label: 'Grocery list export'
        }, {
          val: 'Zero',
          label: 'Math required'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="aidiet-generation-inline-61">
              <div style={{
            letterSpacing: -1
          }} className="aidiet-generation-inline-62">{s.val}</div>
              <div className="aidiet-generation-inline-63">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="aidiet-generation-inline-64">
        <div className="aidiet-generation-inline-65">
          <div className="aidiet-generation-inline-66">
            <span className="aidiet-generation-inline-67">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="aidiet-generation-inline-68">Nutrition is the bottleneck.</h2>
            <p className="aidiet-generation-inline-69">Diet is 70% of the result, but writing custom meal plans for 100 different members is a mathematical nightmare for your trainers. So they give up and hand out generic PDFs.</p>
          </div>
          <div className="aidiet-generation-inline-70">
            {painPoints.map((p, i) => <div key={i} className="aidiet-generation-inline-71">
                <div className="aidiet-generation-inline-72">{p.icon}</div>
                <h3 className="aidiet-generation-inline-73">{p.title}</h3>
                <p className="aidiet-generation-inline-74">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="aidiet-generation-inline-75">
        <div className="aidiet-generation-inline-76">
          <div className="aidiet-generation-inline-77">
            <span className="aidiet-generation-inline-78">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="aidiet-generation-inline-79">Let the machine do the math.</h2>
          </div>

          <div className="aidiet-generation-inline-80">
            <div className="aidiet-generation-inline-81">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="aidiet-generation-inline-82">
                  <div style={{
                background: activeTab === i ? '#10b981' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="aidiet-generation-inline-83">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="aidiet-generation-inline-84">{t.label}</span>
                  <span className="aidiet-generation-inline-85">{t.sub}</span>
                </button>)}
            </div>
            <div className="aidiet-generation-inline-86">
              <div className="aidiet-generation-inline-87">
                <h3 className="aidiet-generation-inline-88">{tabs[activeTab].title}</h3>
                <p className="aidiet-generation-inline-89">{tabs[activeTab].desc}</p>
                <ul className="aidiet-generation-inline-90">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="aidiet-generation-inline-91">
                      <CheckCircle2 size={17} color="#6ee7b7" className="aidiet-generation-inline-92" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="aidiet-generation-inline-93">
                <BrainCircuit size={40} color="#334155" />
                <span className="aidiet-generation-inline-94">📷 App Diet Plan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="aidiet-generation-inline-95">
        <div className="aidiet-generation-inline-96">
          <div className="aidiet-generation-inline-97">
            <span className="aidiet-generation-inline-98">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="aidiet-generation-inline-99">Built for real life.</h2>
          </div>
          <div className="aidiet-generation-inline-100">
            {scenarios.map((s, i) => <div key={i} className="aidiet-generation-inline-101">
                <div className="aidiet-generation-inline-102">{s.icon}</div>
                <h3 className="aidiet-generation-inline-103">{s.title}</h3>
                <p className="aidiet-generation-inline-104">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="aidiet-generation-inline-105">
        <div className="aidiet-generation-inline-106">
          <h2 style={{
          letterSpacing: -1.5
        }} className="aidiet-generation-inline-107">Frequently asked</h2>
          <div className="aidiet-generation-inline-108">
            {faqs.map((f, i) => <div key={i} className="aidiet-generation-inline-109">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="aidiet-generation-inline-110">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="aidiet-generation-inline-111" />
                </button>
                {openFaq === i && <div className="aidiet-generation-inline-112">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="aidiet-generation-inline-113">
        <div className="aidiet-generation-inline-114">
          <div className="aidiet-generation-inline-115">
            <BrainCircuit size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="aidiet-generation-inline-116">Scale your PT business.</h2>
          <p className="aidiet-generation-inline-117">Deliver high-quality, customized nutrition plans to hundreds of members without spending your entire weekend in Excel.</p>
          <div className="aidiet-generation-inline-118">
            <button className="aidiet-generation-inline-119">
              Start Free Trial <ArrowRight size={17} className="aidiet-generation-inline-120" />
            </button>
            <button className="aidiet-generation-inline-121">See a Demo</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default AIDietGeneration;