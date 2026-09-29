import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, MessageSquare, Bell, Send, Users, Clock, Smartphone, TrendingUp, Zap, Star, Megaphone, Radio, LayoutList, Image } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./Announcements.css";
export interface AnnouncementsProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <MessageSquare size={22} color="#f87171" />,
  title: "Important updates buried in WhatsApp groups",
  desc: "Holiday schedules, class cancellations, and fee hike notices get lost in 300-message group chats. Half your members never see them."
}, {
  icon: <Clock size={22} color="#f87171" />,
  title: "Staff spend 45 mins sending the same message",
  desc: "Copy-pasting announcements to different batches, manually typing member names, resending to people who didn't receive — it's a full-time task."
}, {
  icon: <Bell size={22} color="#f87171" />,
  title: "No way to know who read your announcement",
  desc: "You post on the notice board and hope for the best. WhatsApp shows 'delivered'. You never know if members actually read the new policy."
}, {
  icon: <Users size={22} color="#f87171" />,
  title: "Can't target specific member groups",
  desc: "You want to notify only Sunday batch members about a trainer change. Instead you blast everyone and get replies from 200 confused people."
}];
const tabs = [{
  label: "Broadcast",
  sub: "Reach all or some",
  title: "One click. Every member notified.",
  desc: "Write your announcement once. Choose who gets it — all members, a specific batch, plan type, trainer group, or even individual members. Send via in-app notification, push, WhatsApp, or all three at once.",
  bullets: ["Segment by plan, batch, or trainer", "WhatsApp + push + in-app simultaneously", "Schedule to send at the right time"]
}, {
  label: "Templates",
  sub: "Reuse & brand",
  title: "Beautiful templates your members will actually read.",
  desc: "Choose from pre-built announcement templates — fee reminders, holiday schedules, new class launches, motivational messages, and more. Add your gym's logo and colors. Looks like a premium brand, not a text blast.",
  bullets: ["20+ ready-made announcement templates", "Branded with your logo and colors", "Rich media — images, PDFs attachable"]
}, {
  label: "Analytics",
  sub: "Track engagement",
  title: "Know who read. Know who didn't.",
  desc: "See open rates, read confirmations, and click-through rates for every announcement. Know which messages resonate, which time slots perform best, and which members never engage — so you can nudge them personally.",
  bullets: ["Per-announcement read receipts", "Member engagement scoring", "Best time to send suggestions"]
}];
const scenarios = [{
  icon: <Radio size={22} color="#2563eb" />,
  title: "Sunday class cancelled at 7 AM",
  desc: "Coach calls in sick. You open Trainix, pick the Sunday 8AM batch, tap 'Notify'. All 40 members get a WhatsApp + push before they leave home."
}, {
  icon: <TrendingUp size={22} color="#16a34a" />,
  title: "Fee revision — zero arguments",
  desc: "Send a fee revision announcement with the new pricing table attached as PDF. Every member gets it, can't claim they didn't know, and you have a delivery record."
}, {
  icon: <Star size={22} color="#f59e0b" />,
  title: "Member of the month celebration",
  desc: "Announce the monthly transformation winner with their before/after photo. Boosts member pride, social sharing, and motivates everyone else to push harder."
}, {
  icon: <Zap size={22} color="#8b5cf6" />,
  title: "Flash offer to inactive members",
  desc: "Filter members who haven't visited in 15+ days. Send a 'We miss you — 20% off renewal' message with a payment link. Reactivations start within the hour."
}, {
  icon: <Bell size={22} color="#ec4899" />,
  title: "Diwali schedule in one broadcast",
  desc: "Holiday opening hours across 3 branches, sent to all members with branch-specific timings. No confusion, no calls, no 'but I thought you were open'."
}, {
  icon: <Image size={22} color="#ea580c" />,
  title: "New trainer introduction",
  desc: "New PT joins on Monday. You send a branded welcome announcement with their photo, specialisations, and how to book a trial. Memberships start flowing."
}];
const steps = [{
  title: "Choose your audience",
  desc: "All members, a specific batch, plan type, or custom filter. Segment in seconds."
}, {
  title: "Pick a template or write fresh",
  desc: "Use a pre-built template or write your own. Add images or PDFs if needed."
}, {
  title: "Select channels",
  desc: "In-app notification, push alert, WhatsApp — pick one or send all three at once."
}, {
  title: "Send now or schedule",
  desc: "Send immediately or schedule for the optimal time. The system handles delivery."
}];
const faqs = [{
  q: "Does Trainix send WhatsApp messages to members automatically?",
  a: "Yes. Trainix integrates with WhatsApp Business API to send templated messages. Announcements are sent as approved templates, ensuring delivery and compliance."
}, {
  q: "Can I target members who haven't visited in X days?",
  a: "Yes. The audience filter lets you segment by last attendance date, membership status, payment status, batch, trainer, or plan type — any combination you need."
}, {
  q: "Is there a limit to how many announcements I can send?",
  a: "No hard limit on in-app and push notifications. WhatsApp messages follow your WhatsApp Business API tier limits, which scale with your usage."
}, {
  q: "Can members reply to announcements?",
  a: "In-app announcements have a comment/like feature for community engagement. WhatsApp replies go to your WhatsApp Business inbox where staff can respond."
}, {
  q: "Can I see who specifically hasn't read an announcement?",
  a: "Yes. The read receipt view shows a list of members who opened the announcement vs those who didn't. You can then send a targeted follow-up to non-readers."
}];
export const Announcements: React.FC<AnnouncementsProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<Send size={20} />, <LayoutList size={20} />, <TrendingUp size={20} />];
  return <div className="announcements-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — deep blue gradient ══ */}
      <section className="announcements-inline-2">
        <div className="announcements-inline-3" />
        <div className="announcements-inline-4" />

        <div className="announcements-inline-5">
          <div className="announcements-inline-6">

            {/* Left */}
            <div>
              <div className="announcements-inline-7">
                <span className="announcements-inline-8" />
                Announcements
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="announcements-inline-9">
                Every member.{' '}
                <span className="announcements-inline-10">
                  Informed instantly.
                </span>
              </h1>

              <p className="announcements-inline-11">
                Send targeted announcements over WhatsApp, push, and in-app — all from one place. No group chats, no missed messages, no more members saying "I didn't know".
              </p>

              <div className="announcements-inline-12">
                <button className="announcements-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="announcements-inline-14">
                  Book a Demo
                </button>
              </div>

              <div className="announcements-inline-15">
                {['WhatsApp + push + in-app', 'Read receipt tracking', 'Segment any audience'].map(t => <span key={t} className="announcements-inline-16">
                    <CheckCircle2 size={14} color="#60a5fa" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — announcement dashboard mockup */}
            <div className="announcements-inline-17">
              <div className="announcements-inline-18">
                {/* Header */}
                <div className="announcements-inline-19">
                  <div>
                    <div className="announcements-inline-20">New Announcement</div>
                    <div className="announcements-inline-21">Holiday Schedule 🎉</div>
                  </div>
                  <div className="announcements-inline-22">Sending...</div>
                </div>

                {/* Stats row */}
                <div className="announcements-inline-23">
                  {[{
                  val: '847',
                  label: 'Sent'
                }, {
                  val: '621',
                  label: 'Read'
                }, {
                  val: '73%',
                  label: 'Open rate'
                }].map((s, i) => <div key={i} style={{
                  borderRight: i < 2 ? '1px solid #f1f5f9' : 'none'
                }} className="announcements-inline-24">
                      <div style={{
                    color: i === 2 ? '#2563eb' : '#0f172a'
                  }} className="announcements-inline-25">{s.val}</div>
                      <div className="announcements-inline-26">{s.label}</div>
                    </div>)}
                </div>

                {/* Channel breakdown */}
                <div className="announcements-inline-27">
                  <div className="announcements-inline-28">Channels</div>
                  {[{
                  label: 'WhatsApp',
                  val: '812 delivered',
                  color: '#16a34a',
                  pct: 96
                }, {
                  label: 'Push Notification',
                  val: '741 received',
                  color: '#2563eb',
                  pct: 87
                }, {
                  label: 'In-App',
                  val: '621 opened',
                  color: '#7c3aed',
                  pct: 73
                }].map((c, i) => <div key={i} style={{
                  marginBottom: i < 2 ? 12 : 0
                }}>
                      <div className="announcements-inline-29">
                        <span className="announcements-inline-30">{c.label}</span>
                        <span style={{
                      color: c.color
                    }} className="announcements-inline-31">{c.val}</span>
                      </div>
                      <div className="announcements-inline-32">
                        <div style={{
                      width: `${c.pct}%`,
                      background: c.color
                    }} className="announcements-inline-33" />
                      </div>
                    </div>)}
                </div>

                {/* Recent */}
                <div className="announcements-inline-34">
                  <div className="announcements-inline-35">Recent</div>
                  {[{
                  title: 'Trainer change - Tue 6AM',
                  time: '2h ago',
                  read: '94%'
                }, {
                  title: 'New batch: Zumba Sat',
                  time: '1d ago',
                  read: '81%'
                }].map((a, i) => <div key={i} style={{
                  borderBottom: i === 0 ? '1px solid #f8fafc' : 'none'
                }} className="announcements-inline-36">
                      <div>
                        <div className="announcements-inline-37">{a.title}</div>
                        <div className="announcements-inline-38">{a.time}</div>
                      </div>
                      <span className="announcements-inline-39">{a.read} read</span>
                    </div>)}
                </div>
              </div>

              <div style={{
              zIndex: -1,
              right: -40
            }} className="announcements-inline-40" />
              <div style={{
              zIndex: -1,
              left: -30,
              bottom: -20
            }} className="announcements-inline-41" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="announcements-inline-42">
        <div className="announcements-inline-43">
          {[{
          val: '< 30s',
          label: 'Time to send any announcement'
        }, {
          val: '3×',
          label: 'More reach vs notice boards'
        }, {
          val: '73%',
          label: 'Average open rate'
        }, {
          val: '0',
          label: 'Group chat chaos'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="announcements-inline-44">
              <div style={{
            letterSpacing: -1
          }} className="announcements-inline-45">{s.val}</div>
              <div className="announcements-inline-46">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="announcements-inline-47">
        <div className="announcements-inline-48">
          <div className="announcements-inline-49">
            <span className="announcements-inline-50">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="announcements-inline-51">Your announcements are getting ignored.</h2>
            <p className="announcements-inline-52">WhatsApp groups are chaos, notice boards are invisible, and you have no idea who's actually reading your messages.</p>
          </div>
          <div className="announcements-inline-53">
            {painPoints.map((p, i) => <div key={i} className="announcements-inline-54">
                <div className="announcements-inline-55">{p.icon}</div>
                <h3 className="announcements-inline-56">{p.title}</h3>
                <p className="announcements-inline-57">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="announcements-inline-58">
        <div className="announcements-inline-59">
          <div className="announcements-inline-60">
            <span className="announcements-inline-61">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="announcements-inline-62">Broadcast. Template. Analyse.</h2>
          </div>

          <div className="announcements-inline-63">
            <div className="announcements-inline-64">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="announcements-inline-65">
                  <div style={{
                background: activeTab === i ? '#2563eb' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="announcements-inline-66">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="announcements-inline-67">{t.label}</span>
                  <span className="announcements-inline-68">{t.sub}</span>
                </button>)}
            </div>
            <div className="announcements-inline-69">
              <div className="announcements-inline-70">
                <h3 className="announcements-inline-71">{tabs[activeTab].title}</h3>
                <p className="announcements-inline-72">{tabs[activeTab].desc}</p>
                <ul className="announcements-inline-73">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="announcements-inline-74">
                      <CheckCircle2 size={17} color="#60a5fa" className="announcements-inline-75" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="announcements-inline-76">
                <Smartphone size={40} color="#334155" />
                <span className="announcements-inline-77">📷 Add screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="announcements-inline-78">
        <div className="announcements-inline-79">
          <div className="announcements-inline-80">
            <span className="announcements-inline-81">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="announcements-inline-82">When communication actually works.</h2>
          </div>
          <div className="announcements-inline-83">
            {scenarios.map((s, i) => <div key={i} className="announcements-inline-84">
                <div className="announcements-inline-85">{s.icon}</div>
                <h3 className="announcements-inline-86">{s.title}</h3>
                <p className="announcements-inline-87">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section className="announcements-inline-88">
        <div className="announcements-inline-89">
          <div className="announcements-inline-90">
            <span className="announcements-inline-91">How to Send</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="announcements-inline-92">Any announcement. 30 seconds.</h2>
          </div>
          <div className="announcements-inline-93">
            {steps.map((s, i) => <div key={i} className="announcements-inline-94">
                <div style={{
              top: -18
            }} className="announcements-inline-95">{i + 1}</div>
                <h3 className="announcements-inline-96">{s.title}</h3>
                <p className="announcements-inline-97">{s.desc}</p>
              </div>)}
          </div>

          {/* Feature highlight banner */}
          <div className="announcements-inline-98">
            <div>
              <div className="announcements-inline-99">
                <Megaphone size={13} /> Smart Scheduling
              </div>
              <h3 className="announcements-inline-100">Send at the right time. Automatically.</h3>
              <p className="announcements-inline-101">Trainix analyses when your members are most active in the app and suggests the optimal send time for each announcement. Higher open rates, without the guesswork.</p>
            </div>
            <div className="announcements-inline-102">
              <Bell size={72} color="rgba(255,255,255,0.6)" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="announcements-inline-103">
        <div className="announcements-inline-104">
          <h2 style={{
          letterSpacing: -1.5
        }} className="announcements-inline-105">Frequently asked</h2>
          <div className="announcements-inline-106">
            {faqs.map((f, i) => <div key={i} className="announcements-inline-107">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="announcements-inline-108">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="announcements-inline-109" />
                </button>
                {openFaq === i && <div className="announcements-inline-110">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="announcements-inline-111">
        <div className="announcements-inline-112">
          <div className="announcements-inline-113">
            <Megaphone size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="announcements-inline-114">Stop sending announcements into the void.</h2>
          <p className="announcements-inline-115">Every member informed. Every message tracked. Every campaign measured. Communication that actually works.</p>
          <div className="announcements-inline-116">
            <button className="announcements-inline-117">
              Start Free Trial <ArrowRight size={17} className="announcements-inline-118" />
            </button>
            <button className="announcements-inline-119">Book a Demo</button>
          </div>
          <p className="announcements-inline-120">No setup fees • Cancel anytime • Built for modern gyms</p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Announcements;