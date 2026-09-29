import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Gamepad2, Flame, Trophy, Target, Medal, Gift, Star, Dumbbell } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./DailyChallenges.css";
export interface DailyChallengesProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <Flame size={22} color="#f87171" />,
  title: "The month 2 drop-off",
  desc: "Most new members lose their motivation exactly 6 weeks after joining. They fall out of their routine because going to the gym starts feeling like a chore."
}, {
  icon: <Target size={22} color="#f87171" />,
  title: "Skipping the hard stuff",
  desc: "Members constantly skipping leg day or avoiding cardio because there's no immediate reward for pushing through the uncomfortable workouts."
}, {
  icon: <Star size={22} color="#f87171" />,
  title: "Zero community engagement",
  desc: "Everyone comes in with headphones, lifts in silence, and leaves. There is no gym culture or friendly competition to make them stay long-term."
}];
const tabs = [{
  label: "Quests & Challenges",
  sub: "Daily objectives",
  title: "Turn workouts into side quests.",
  desc: "Set up auto-generating daily quests like 'Burn 500 Calories' or 'Hit a new Leg Press PR'. Members earn XP and badges for completing them in the app.",
  bullets: ["Auto-assigned daily quests", "Gym-wide weekly challenges", "Custom XP payouts"]
}, {
  label: "Attendance Streaks",
  sub: "Keep them coming back",
  title: "Build unbreakable habits.",
  desc: "Members build a 'fire streak' for every consecutive day they visit the gym. The fear of losing a 30-day streak is the strongest motivation to show up.",
  bullets: ["Automatic check-in detection", "Streak milestones", "'Streak freeze' rewards"]
}, {
  label: "Leaderboards & Rewards",
  sub: "Friendly competition",
  title: "Reward your most active members.",
  desc: "Members rank on the gym's monthly leaderboard based on XP. Top performers can redeem XP for real-world rewards like a free protein shake or a merch t-shirt.",
  bullets: ["Monthly reset leaderboards", "Custom reward store", "Push notification announcements"]
}];
const scenarios = [{
  icon: <Medal size={22} color="#10b981" />,
  title: "The 100-Day Club",
  desc: "A member hits a 100-day gym streak. The app triggers a massive celebration, awards them the 'Centurion' badge, and gifts them a free PT session."
}, {
  icon: <Gamepad2 size={22} color="#8b5cf6" />,
  title: "Cardio Tuesday Challenge",
  desc: "You notice treadmill usage is low on Tuesdays. You create a '5K Tuesday' quest with double XP. Suddenly, all your treadmills are booked."
}, {
  icon: <Gift size={22} color="#ec4899" />,
  title: "Redeeming XP for Merch",
  desc: "A dedicated member cashes in 5,000 XP at the front desk for a gym hoodie. They wear it proudly, becoming a walking billboard for your brand."
}];
const faqs = [{
  q: "Can I choose what rewards members get?",
  a: "Yes! The Reward Store is fully customizable. You can set the XP cost for anything: a free water bottle, 10% off their next renewal, or a free guest pass."
}, {
  q: "Do I have to manually verify the challenges?",
  a: "Most challenges (like attendance, logging a specific exercise, or hitting a PR) are verified automatically by the app. Custom challenges can be verified by trainers."
}, {
  q: "Can members opt-out of the leaderboard?",
  a: "Yes, privacy is important. Members can choose to hide their profile from the public gym leaderboard while still earning personal XP."
}, {
  q: "How does the streak system handle rest days?",
  a: "You can define 'Rest Day allowances' in the settings (e.g., visiting 4 times a week maintains the streak) or offer 'Streak Freezes' they can buy with XP."
}];
export const DailyChallenges: React.FC<DailyChallengesProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<Target size={20} />, <Flame size={20} />, <Trophy size={20} />];
  return <div className="daily-challenges-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Violet / Purple gradient ══ */}
      <section className="daily-challenges-inline-2">
        <div className="daily-challenges-inline-3" />
        <div className="daily-challenges-inline-4" />

        <div className="daily-challenges-inline-5">
          <div className="daily-challenges-inline-6">

            {/* Left */}
            <div>
              <div className="daily-challenges-inline-7">
                <span className="daily-challenges-inline-8" />
                Gamification
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="daily-challenges-inline-9">
                Level up.{' '}
                <span className="daily-challenges-inline-10">
                  Literally.
                </span>
              </h1>

              <p className="daily-challenges-inline-11">
                Stop gym churn by making fitness fun. Implement streaks, daily quests, XP points, and leaderboards to keep your members addicted to progress.
              </p>

              <div className="daily-challenges-inline-12">
                <button className="daily-challenges-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="daily-challenges-inline-14">
                  View Reward Examples
                </button>
              </div>

              <div className="daily-challenges-inline-15">
                {['Daily Quests', 'Custom Rewards', 'Live Leaderboards'].map(t => <span key={t} className="daily-challenges-inline-16">
                    <CheckCircle2 size={14} color="#a78bfa" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — App Mockup for Gamification */}
            <div className="daily-challenges-inline-17">
              <div className="daily-challenges-inline-18">
                <div className="daily-challenges-inline-19"></div>
                
                <div className="daily-challenges-inline-20">
                  {/* Header */}
                  <div className="daily-challenges-inline-21">
                    <div className="daily-challenges-inline-22">
                      <div className="daily-challenges-inline-23">
                         <div className="daily-challenges-inline-24">👤</div>
                         <div>
                           <div className="daily-challenges-inline-25">Level 12</div>
                           <div className="daily-challenges-inline-26">Pro Athlete</div>
                         </div>
                      </div>
                      <div className="daily-challenges-inline-27">
                        <Flame size={14} fill="#fff" /> 14
                      </div>
                    </div>
                    {/* XP Bar */}
                    <div className="daily-challenges-inline-28">
                      <span>2,450 XP</span>
                      <span>3,000 XP to Lvl 13</span>
                    </div>
                    <div className="daily-challenges-inline-29">
                       <div className="daily-challenges-inline-30" />
                    </div>
                  </div>

                  {/* Quests Area */}
                  <div className="daily-challenges-inline-31">
                    <div className="daily-challenges-inline-32">
                      Daily Quests <span className="daily-challenges-inline-33">Resets in 4h</span>
                    </div>
                    
                    <div className="daily-challenges-inline-34">
                      {/* Completed Quest */}
                      <div className="daily-challenges-inline-35">
                        <div className="daily-challenges-inline-36">
                           <CheckCircle2 size={24} />
                        </div>
                        <div className="daily-challenges-inline-37">
                           <div className="daily-challenges-inline-38">Check in before 8 AM</div>
                           <div className="daily-challenges-inline-39">+50 XP</div>
                        </div>
                      </div>

                      {/* Active Quest */}
                      <div className="daily-challenges-inline-40">
                        <div className="daily-challenges-inline-41">
                           <Dumbbell size={20} />
                        </div>
                        <div className="daily-challenges-inline-42">
                           <div className="daily-challenges-inline-43">Log 4 sets of Squats</div>
                           <div className="daily-challenges-inline-44">
                              <div className="daily-challenges-inline-45" />
                           </div>
                           <div className="daily-challenges-inline-46">2 / 4 sets • +100 XP</div>
                        </div>
                      </div>

                      {/* Active Quest 2 */}
                      <div className="daily-challenges-inline-47">
                        <div className="daily-challenges-inline-48">
                           <Target size={20} />
                        </div>
                        <div className="daily-challenges-inline-49">
                           <div className="daily-challenges-inline-50">Burn 400 Calories</div>
                           <div className="daily-challenges-inline-51">0 / 400 • +150 XP</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="daily-challenges-inline-52" />
              <div style={{
              zIndex: -1
            }} className="daily-challenges-inline-53" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="daily-challenges-inline-54">
        <div className="daily-challenges-inline-55">
          {[{
          val: '+40%',
          label: 'Retention rate'
        }, {
          val: 'Auto',
          label: 'Quest generation'
        }, {
          val: '100%',
          label: 'Customizable rewards'
        }, {
          val: 'Viral',
          label: 'Social sharing'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="daily-challenges-inline-56">
              <div style={{
            letterSpacing: -1
          }} className="daily-challenges-inline-57">{s.val}</div>
              <div className="daily-challenges-inline-58">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="daily-challenges-inline-59">
        <div className="daily-challenges-inline-60">
          <div className="daily-challenges-inline-61">
            <span className="daily-challenges-inline-62">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="daily-challenges-inline-63">Consistency is boring.</h2>
            <p className="daily-challenges-inline-64">Building a habit is incredibly difficult. Without immediate dopamine hits and short-term goals, members inevitably lose the motivation they had on day one.</p>
          </div>
          <div className="daily-challenges-inline-65">
            {painPoints.map((p, i) => <div key={i} className="daily-challenges-inline-66">
                <div className="daily-challenges-inline-67">{p.icon}</div>
                <h3 className="daily-challenges-inline-68">{p.title}</h3>
                <p className="daily-challenges-inline-69">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="daily-challenges-inline-70">
        <div className="daily-challenges-inline-71">
          <div className="daily-challenges-inline-72">
            <span className="daily-challenges-inline-73">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="daily-challenges-inline-74">Make fitness addictive.</h2>
          </div>

          <div className="daily-challenges-inline-75">
            <div className="daily-challenges-inline-76">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="daily-challenges-inline-77">
                  <div style={{
                background: activeTab === i ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="daily-challenges-inline-78">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="daily-challenges-inline-79">{t.label}</span>
                  <span className="daily-challenges-inline-80">{t.sub}</span>
                </button>)}
            </div>
            <div className="daily-challenges-inline-81">
              <div className="daily-challenges-inline-82">
                <h3 className="daily-challenges-inline-83">{tabs[activeTab].title}</h3>
                <p className="daily-challenges-inline-84">{tabs[activeTab].desc}</p>
                <ul className="daily-challenges-inline-85">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="daily-challenges-inline-86">
                      <CheckCircle2 size={17} color="#a78bfa" className="daily-challenges-inline-87" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="daily-challenges-inline-88">
                <Gamepad2 size={40} color="#334155" />
                <span className="daily-challenges-inline-89">📷 App Gamification UI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="daily-challenges-inline-90">
        <div className="daily-challenges-inline-91">
          <h2 style={{
          letterSpacing: -1.5
        }} className="daily-challenges-inline-92">Frequently asked</h2>
          <div className="daily-challenges-inline-93">
            {faqs.map((f, i) => <div key={i} className="daily-challenges-inline-94">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="daily-challenges-inline-95">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="daily-challenges-inline-96" />
                </button>
                {openFaq === i && <div className="daily-challenges-inline-97">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="daily-challenges-inline-98">
        <div className="daily-challenges-inline-99">
          <div className="daily-challenges-inline-100">
            <Gamepad2 size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="daily-challenges-inline-101">Make them want to come back.</h2>
          <p className="daily-challenges-inline-102">Drive engagement and retention to all-time highs by turning their fitness journey into a game they can't put down.</p>
          <div className="daily-challenges-inline-103">
            <button className="daily-challenges-inline-104">
              Start Free Trial <ArrowRight size={17} className="daily-challenges-inline-105" />
            </button>
            <button className="daily-challenges-inline-106">Talk to Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default DailyChallenges;