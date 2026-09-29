import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, PlayCircle, Dumbbell, MonitorPlay, HelpCircle, Video, ListVideo, Layers } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./WorkoutLibrary.css";
export interface WorkoutLibraryProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <HelpCircle size={22} color="#f87171" />,
  title: "Endless 'How do I do this?'",
  desc: "Your trainers spend 80% of their floor time demonstrating basic movements like a bicep curl over and over to beginners."
}, {
  icon: <Video size={22} color="#f87171" />,
  title: "Bad form leading to injuries",
  desc: "Members looking up random exercises on YouTube, doing them wrong, and blaming the gym when they get hurt."
}, {
  icon: <Layers size={22} color="#f87171" />,
  title: "Paper workout cards",
  desc: "Members walking around with flimsy paper cards trying to figure out what a 'Bulgarian Split Squat' is."
}, {
  icon: <Dumbbell size={22} color="#f87171" />,
  title: "Intimidation for new members",
  desc: "Newcomers feel embarrassed to ask how to use a machine, so they just stick to the treadmill and eventually quit."
}];
const tabs = [{
  label: "500+ Built-in Exercises",
  sub: "Ready on day one",
  title: "A massive library out of the box.",
  desc: "Trainix comes pre-loaded with over 500 high-quality exercise videos covering everything from weightlifting and machines to yoga and stretching. Assign them instantly.",
  bullets: ["Professionally shot videos", "Categorized by muscle group", "Clear written instructions"]
}, {
  label: "Add Custom Videos",
  sub: "Your brand, your trainers",
  title: "Upload your own exercise variations.",
  desc: "Have a unique workout flow? Record your own trainers demonstrating the exercises and upload them to the library. Members see your brand and your staff.",
  bullets: ["Upload custom MP4s", "Link YouTube videos", "Brand the experience"]
}, {
  label: "In-App Form Check",
  sub: "Detailed breakdowns",
  title: "Show them the right way to lift.",
  desc: "Each exercise page in the member app highlights the primary and secondary muscles targeted, along with key pointers to maintain perfect form and prevent injury.",
  bullets: ["Muscle group diagrams", "Common mistakes to avoid", "Breathing cues"]
}];
const scenarios = [{
  icon: <PlayCircle size={22} color="#f97316" />,
  title: "The 2 AM Workout",
  desc: "A member working out late at night when no trainers are around. They check their app, watch the 15-second loop of the exercise, and lift with confidence."
}, {
  icon: <ListVideo size={22} color="#10b981" />,
  title: "Remote Coaching",
  desc: "You sell an online training plan to a member traveling for work. They open the app in their hotel gym and follow the exact video tutorials you assigned."
}, {
  icon: <MonitorPlay size={22} color="#ef4444" />,
  title: "Unique Machine Instructions",
  desc: "You buy a complicated new glute machine. You film a 30-second tutorial on your phone, upload it, and attach a QR code to the machine. Members scan and learn."
}];
const faqs = [{
  q: "Is the video library included in all plans?",
  a: "Yes, the core library of 500+ exercises is included for free in all Trainix plans."
}, {
  q: "Do the videos take up space on the member's phone?",
  a: "No. The videos stream dynamically from our servers, meaning the Trainix app remains lightweight and fast."
}, {
  q: "Can I limit who sees my custom videos?",
  a: "Yes. Custom exercises can be assigned specifically to premium PT clients, keeping your proprietary workouts exclusive."
}, {
  q: "Can members log their weights directly from the video screen?",
  a: "Absolutely. While watching the form video, the member can enter their reps, sets, and weight below it to log their workout."
}];
export const WorkoutLibrary: React.FC<WorkoutLibraryProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<Dumbbell size={20} />, <MonitorPlay size={20} />, <Video size={20} />];
  return <div className="workout-library-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Orange / Red gradient ══ */}
      <section className="workout-library-inline-2">
        <div className="workout-library-inline-3" />
        <div className="workout-library-inline-4" />

        <div className="workout-library-inline-5">
          <div className="workout-library-inline-6">

            {/* Left */}
            <div>
              <div className="workout-library-inline-7">
                <span className="workout-library-inline-8" />
                Workout Library
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="workout-library-inline-9">
                Perfect form.{' '}
                <span className="workout-library-inline-10">
                  Every time.
                </span>
              </h1>

              <p className="workout-library-inline-11">
                Give your members a pocket personal trainer. A library of 500+ high-quality exercise videos with clear instructions, ready to stream instantly.
              </p>

              <div className="workout-library-inline-12">
                <button className="workout-library-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="workout-library-inline-14">
                  Browse Exercises
                </button>
              </div>

              <div className="workout-library-inline-15">
                {['500+ HD Videos', 'Upload your own', 'Muscle group targets'].map(t => <span key={t} className="workout-library-inline-16">
                    <CheckCircle2 size={14} color="#fdba74" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — App Mockup for Video */}
            <div className="workout-library-inline-17">
              <div className="workout-library-inline-18">
                <div className="workout-library-inline-19"></div>
                
                <div className="workout-library-inline-20">
                  {/* Video Player Area */}
                  <div className="workout-library-inline-21">
                    <div className="workout-library-inline-22">
                      <PlayCircle size={32} color="#fff" className="workout-library-inline-23" />
                    </div>
                    {/* Dummy progress bar */}
                    <div className="workout-library-inline-24">
                      <div className="workout-library-inline-25" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="workout-library-inline-26">
                    <div className="workout-library-inline-27">
                      <div>
                        <h3 className="workout-library-inline-28">Barbell Deadlift</h3>
                        <div className="workout-library-inline-29">Hamstrings, Glutes, Back</div>
                      </div>
                      <div className="workout-library-inline-30">Free Weight</div>
                    </div>

                    <div className="workout-library-inline-31">
                      Keep your back straight and core tight. Push through your heels to lift the bar, keeping it close to your shins.
                    </div>

                    <div className="workout-library-inline-32">
                      <div className="workout-library-inline-33">Log Set</div>
                      <div className="workout-library-inline-34">
                        <input type="text" placeholder="10 reps" className="workout-library-inline-35" />
                        <input type="text" placeholder="60 kg" className="workout-library-inline-36" />
                      </div>
                      <button className="workout-library-inline-37">Save Set</button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="workout-library-inline-38" />
              <div style={{
              zIndex: -1
            }} className="workout-library-inline-39" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="workout-library-inline-40">
        <div className="workout-library-inline-41">
          {[{
          val: '500+',
          label: 'Pre-loaded HD Videos'
        }, {
          val: 'Unlimited',
          label: 'Custom Uploads'
        }, {
          val: '0 MB',
          label: 'Phone space used'
        }, {
          val: '100%',
          label: 'Form confidence'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="workout-library-inline-42">
              <div style={{
            letterSpacing: -1
          }} className="workout-library-inline-43">{s.val}</div>
              <div className="workout-library-inline-44">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="workout-library-inline-45">
        <div className="workout-library-inline-46">
          <div className="workout-library-inline-47">
            <span className="workout-library-inline-48">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="workout-library-inline-49">Gym intimidation is real.</h2>
            <p className="workout-library-inline-50">Members quit when they don't know what to do. If they have to wait 10 minutes to ask a busy trainer how to use a machine, they'll just jump on the treadmill instead.</p>
          </div>
          <div className="workout-library-inline-51">
            {painPoints.map((p, i) => <div key={i} className="workout-library-inline-52">
                <div className="workout-library-inline-53">{p.icon}</div>
                <h3 className="workout-library-inline-54">{p.title}</h3>
                <p className="workout-library-inline-55">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="workout-library-inline-56">
        <div className="workout-library-inline-57">
          <div className="workout-library-inline-58">
            <span className="workout-library-inline-59">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="workout-library-inline-60">A coach in every pocket.</h2>
          </div>

          <div className="workout-library-inline-61">
            <div className="workout-library-inline-62">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="workout-library-inline-63">
                  <div style={{
                background: activeTab === i ? '#ea580c' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="workout-library-inline-64">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="workout-library-inline-65">{t.label}</span>
                  <span className="workout-library-inline-66">{t.sub}</span>
                </button>)}
            </div>
            <div className="workout-library-inline-67">
              <div className="workout-library-inline-68">
                <h3 className="workout-library-inline-69">{tabs[activeTab].title}</h3>
                <p className="workout-library-inline-70">{tabs[activeTab].desc}</p>
                <ul className="workout-library-inline-71">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="workout-library-inline-72">
                      <CheckCircle2 size={17} color="#fdba74" className="workout-library-inline-73" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="workout-library-inline-74">
                <Video size={40} color="#334155" />
                <span className="workout-library-inline-75">📷 App Video Player</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="workout-library-inline-76">
        <div className="workout-library-inline-77">
          <div className="workout-library-inline-78">
            <span className="workout-library-inline-79">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="workout-library-inline-80">Workouts without friction.</h2>
          </div>
          <div className="workout-library-inline-81">
            {scenarios.map((s, i) => <div key={i} className="workout-library-inline-82">
                <div className="workout-library-inline-83">{s.icon}</div>
                <h3 className="workout-library-inline-84">{s.title}</h3>
                <p className="workout-library-inline-85">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="workout-library-inline-86">
        <div className="workout-library-inline-87">
          <h2 style={{
          letterSpacing: -1.5
        }} className="workout-library-inline-88">Frequently asked</h2>
          <div className="workout-library-inline-89">
            {faqs.map((f, i) => <div key={i} className="workout-library-inline-90">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="workout-library-inline-91">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="workout-library-inline-92" />
                </button>
                {openFaq === i && <div className="workout-library-inline-93">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="workout-library-inline-94">
        <div className="workout-library-inline-95">
          <div className="workout-library-inline-96">
            <PlayCircle size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="workout-library-inline-97">Empower your members.</h2>
          <p className="workout-library-inline-98">Give them the confidence to lift properly with 500+ HD video tutorials right in the Trainix app.</p>
          <div className="workout-library-inline-99">
            <button className="workout-library-inline-100">
              Start Free Trial <ArrowRight size={17} className="workout-library-inline-101" />
            </button>
            <button className="workout-library-inline-102">Talk to Sales</button>
          </div>
          <p className="workout-library-inline-103">Included free in all Trainix plans</p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default WorkoutLibrary;