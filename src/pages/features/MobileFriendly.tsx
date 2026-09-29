import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Smartphone, BarChart2, Bell, Shield, CreditCard, Calendar, QrCode, MessageSquare, Activity, Star, Zap, UserCheck, Users } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./MobileFriendly.css";
export interface MobileFriendlyProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <BarChart2 size={22} color="#f87171" />,
  title: "Tied to your reception desk",
  desc: "To check who paid, who came in today, or how much revenue you made, you have to physically sit at the gym PC."
}, {
  icon: <CreditCard size={22} color="#f87171" />,
  title: "Delayed payments on weekends",
  desc: "A member wants to renew on Sunday while you are at home. They have to wait until Monday morning because your software is desktop-only."
}, {
  icon: <Activity size={22} color="#f87171" />,
  title: "Trainers scribbling on paper",
  desc: "Your trainers can't log PT sessions or diet plans while on the gym floor. They have to walk back to the PC, so they just use paper instead."
}, {
  icon: <Bell size={22} color="#f87171" />,
  title: "Members disconnected from the gym",
  desc: "Members don't know their expiry date, can't track their workouts, and miss announcements because they don't have a gym app in their pocket."
}];
const tabs = [{
  label: "Owner App",
  sub: "Run your gym from anywhere",
  title: "Your entire gym, in your pocket.",
  desc: "View live attendance, check daily revenue, approve discounts, and manage staff schedules while sitting at a coffee shop. 100% cloud-based, real-time sync with the front desk.",
  bullets: ["Live revenue & attendance dashboard", "Remote discount approvals", "Staff tracking & audit logs"]
}, {
  label: "Member App",
  sub: "Self-service & engagement",
  title: "Give members a premium experience.",
  desc: "Members can buy/renew packages online, scan a QR code to enter, track their body progress, view assigned diet plans, and log workouts right from the gym floor.",
  bullets: ["In-app Razorpay renewals", "Mobile QR scanner for entry", "Workout & diet plan viewer"]
}, {
  label: "Trainer App",
  sub: "Floor management",
  title: "Keep trainers on the floor, not at a desk.",
  desc: "Trainers can log PT sessions instantly, mark their own attendance, view client profiles, and update body measurements using their own phones.",
  bullets: ["1-tap PT session logging", "Client progress photo uploads", "Trainer schedule viewer"]
}];
const scenarios = [{
  icon: <Zap size={22} color="#d946ef" />,
  title: "Sunday revenue spike",
  desc: "You send a flash discount push notification on Sunday morning. You watch renewals happen and revenue go up directly from your phone app."
}, {
  icon: <QrCode size={22} color="#ec4899" />,
  title: "Forgot access card? No problem.",
  desc: "Member forgot their RFID card at home. They just open the Member App, scan the QR code at the turnstile, and walk in seamlessly."
}, {
  icon: <MessageSquare size={22} color="#8b5cf6" />,
  title: "Instant feedback loop",
  desc: "A member rates their workout 5-stars in the app. The owner app immediately pings you so you know which trainers are performing best."
}, {
  icon: <Shield size={22} color="#14b8a6" />,
  title: "Approving a custom discount",
  desc: "Receptionist calls you about a prospect wanting a 15% discount. You open the app, tap 'Approve', and the invoice is unlocked for the desk to process."
}, {
  icon: <Calendar size={22} color="#f59e0b" />,
  title: "Booking a spin class",
  desc: "Group classes fill up fast. Members open their app on Monday morning and reserve their spot for the evening Zumba class in two taps."
}, {
  icon: <UserCheck size={22} color="#3b82f6" />,
  title: "Trainer logs a PR",
  desc: "Client hits a 100kg bench press. Trainer logs it in the Trainer App immediately. Client gets a push notification celebrating the milestone."
}];
const faqs = [{
  q: "Is the app available for both iOS and Android?",
  a: "Yes. Trainix mobile apps are natively available on both the Apple App Store for iOS devices and the Google Play Store for Android."
}, {
  q: "Do members have to pay to download the app?",
  a: "No, the member app is completely free for your clients to download and use as long as they are active members of your gym."
}, {
  q: "Is the mobile app a lighter version of the desktop software?",
  a: "The Owner App has about 90% of the desktop features (optimized for mobile), focusing heavily on dashboards, approvals, and communication. Heavy data entry is usually done on desktop."
}, {
  q: "Can I customize the member app with my gym's logo?",
  a: "Yes! The app adapts to display your gym's branding, logo, and primary colors to give members a premium, white-labeled feel."
}];
export const MobileFriendly: React.FC<MobileFriendlyProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<Shield size={20} />, <Smartphone size={20} />, <Activity size={20} />];
  return <div className="mobile-friendly-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Magenta / Purple gradient ══ */}
      <section className="mobile-friendly-inline-2">
        <div className="mobile-friendly-inline-3" />
        <div className="mobile-friendly-inline-4" />

        <div className="mobile-friendly-inline-5">
          <div className="mobile-friendly-inline-6">

            {/* Left */}
            <div>
              <div className="mobile-friendly-inline-7">
                <span className="mobile-friendly-inline-8" />
                Mobile Friendly
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="mobile-friendly-inline-9">
                Your entire gym.{' '}
                <span className="mobile-friendly-inline-10">
                  In your pocket.
                </span>
              </h1>

              <p className="mobile-friendly-inline-11">
                Break free from the reception desk. Trainix provides dedicated native mobile apps for owners, trainers, and members — keeping everyone connected to the gym 24/7.
              </p>

              <div className="mobile-friendly-inline-12">
                <button className="mobile-friendly-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="mobile-friendly-inline-14">
                  Book a Demo
                </button>
              </div>

              <div className="mobile-friendly-inline-15">
                {['Owner, Trainer & Member Apps', 'iOS & Android Native', 'Real-time cloud sync'].map(t => <span key={t} className="mobile-friendly-inline-16">
                    <CheckCircle2 size={14} color="#e879f9" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — Phone Mockup */}
            <div className="mobile-friendly-inline-17">
              <div className="mobile-friendly-inline-18">
                {/* iPhone Notch */}
                <div className="mobile-friendly-inline-19"></div>
                
                <div className="mobile-friendly-inline-20">
                  {/* App Header */}
                  <div className="mobile-friendly-inline-21">
                    <div className="mobile-friendly-inline-22">Today's Overview</div>
                    <div className="mobile-friendly-inline-23">₹42,500 <span className="mobile-friendly-inline-24">Collected</span></div>
                  </div>

                  {/* App Content */}
                  <div className="mobile-friendly-inline-25">
                    <div className="mobile-friendly-inline-26">
                      <div className="mobile-friendly-inline-27">
                        <div className="mobile-friendly-inline-28">124</div>
                        <div className="mobile-friendly-inline-29">Walk-ins</div>
                      </div>
                      <div className="mobile-friendly-inline-30">
                        <div className="mobile-friendly-inline-31">12</div>
                        <div className="mobile-friendly-inline-32">Renewals</div>
                      </div>
                    </div>

                    <div className="mobile-friendly-inline-33">Pending Approvals</div>
                    <div className="mobile-friendly-inline-34">
                      <div>
                        <div className="mobile-friendly-inline-35">Arjun K.</div>
                        <div className="mobile-friendly-inline-36">Requests 20% Off</div>
                      </div>
                      <button className="mobile-friendly-inline-37">Approve</button>
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="mobile-friendly-inline-38">
                    <div className="mobile-friendly-inline-39"><BarChart2 size={20} /><div className="mobile-friendly-inline-40">Home</div></div>
                    <div className="mobile-friendly-inline-41"><Users size={20} /><div className="mobile-friendly-inline-42">Members</div></div>
                    <div className="mobile-friendly-inline-43"><Bell size={20} /><div className="mobile-friendly-inline-44">Alerts</div></div>
                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="mobile-friendly-inline-45" />
              <div style={{
              zIndex: -1
            }} className="mobile-friendly-inline-46" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="mobile-friendly-inline-47">
        <div className="mobile-friendly-inline-48">
          {[{
          val: '3',
          label: 'Dedicated native apps'
        }, {
          val: 'iOS',
          label: 'Apple App Store ready'
        }, {
          val: 'Android',
          label: 'Google Play Store ready'
        }, {
          val: '0',
          label: 'Hours tied to a desk'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="mobile-friendly-inline-49">
              <div style={{
            letterSpacing: -1
          }} className="mobile-friendly-inline-50">{s.val}</div>
              <div className="mobile-friendly-inline-51">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="mobile-friendly-inline-52">
        <div className="mobile-friendly-inline-53">
          <div className="mobile-friendly-inline-54">
            <span className="mobile-friendly-inline-55">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="mobile-friendly-inline-56">Desktop-only software limits growth.</h2>
            <p className="mobile-friendly-inline-57">If you have to be physically at the gym to run the gym, you don't own a business — you own a job. And your members expect modern mobile experiences.</p>
          </div>
          <div className="mobile-friendly-inline-58">
            {painPoints.map((p, i) => <div key={i} className="mobile-friendly-inline-59">
                <div className="mobile-friendly-inline-60">{p.icon}</div>
                <h3 className="mobile-friendly-inline-61">{p.title}</h3>
                <p className="mobile-friendly-inline-62">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="mobile-friendly-inline-63">
        <div className="mobile-friendly-inline-64">
          <div className="mobile-friendly-inline-65">
            <span className="mobile-friendly-inline-66">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="mobile-friendly-inline-67">Apps for everyone.</h2>
          </div>

          <div className="mobile-friendly-inline-68">
            <div className="mobile-friendly-inline-69">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="mobile-friendly-inline-70">
                  <div style={{
                background: activeTab === i ? '#d946ef' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="mobile-friendly-inline-71">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="mobile-friendly-inline-72">{t.label}</span>
                  <span className="mobile-friendly-inline-73">{t.sub}</span>
                </button>)}
            </div>
            <div className="mobile-friendly-inline-74">
              <div className="mobile-friendly-inline-75">
                <h3 className="mobile-friendly-inline-76">{tabs[activeTab].title}</h3>
                <p className="mobile-friendly-inline-77">{tabs[activeTab].desc}</p>
                <ul className="mobile-friendly-inline-78">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="mobile-friendly-inline-79">
                      <CheckCircle2 size={17} color="#f0abfc" className="mobile-friendly-inline-80" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="mobile-friendly-inline-81">
                <Smartphone size={40} color="#334155" />
                <span className="mobile-friendly-inline-82">📷 Add app screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="mobile-friendly-inline-83">
        <div className="mobile-friendly-inline-84">
          <div className="mobile-friendly-inline-85">
            <span className="mobile-friendly-inline-86">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="mobile-friendly-inline-87">Gym management from anywhere.</h2>
          </div>
          <div className="mobile-friendly-inline-88">
            {scenarios.map((s, i) => <div key={i} className="mobile-friendly-inline-89">
                <div className="mobile-friendly-inline-90">{s.icon}</div>
                <h3 className="mobile-friendly-inline-91">{s.title}</h3>
                <p className="mobile-friendly-inline-92">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="mobile-friendly-inline-93">
        <div className="mobile-friendly-inline-94">
          <h2 style={{
          letterSpacing: -1.5
        }} className="mobile-friendly-inline-95">Frequently asked</h2>
          <div className="mobile-friendly-inline-96">
            {faqs.map((f, i) => <div key={i} className="mobile-friendly-inline-97">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="mobile-friendly-inline-98">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="mobile-friendly-inline-99" />
                </button>
                {openFaq === i && <div className="mobile-friendly-inline-100">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="mobile-friendly-inline-101">
        <div className="mobile-friendly-inline-102">
          <div className="mobile-friendly-inline-103">
            <Smartphone size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="mobile-friendly-inline-104">Unchain yourself from the desk.</h2>
          <p className="mobile-friendly-inline-105">Download the Trainix app and start running your fitness business from anywhere in the world.</p>
          <div className="mobile-friendly-inline-106">
            <button className="mobile-friendly-inline-107">
              Start Free Trial <ArrowRight size={17} className="mobile-friendly-inline-108" />
            </button>
            <button className="mobile-friendly-inline-109">Book a Demo</button>
          </div>
          <p className="mobile-friendly-inline-110">Available on iOS & Android • Included in all plans</p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default MobileFriendly;