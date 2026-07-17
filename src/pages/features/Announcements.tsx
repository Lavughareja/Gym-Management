import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown,
  MessageSquare, Bell, Send, Users, Clock,
  Smartphone, TrendingUp, Zap, Star,
  Megaphone, Radio, LayoutList, Image
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface AnnouncementsProps {
  onBack: () => void;
}

const painPoints = [
  {
    icon: <MessageSquare size={22} color="#f87171" />,
    title: "Important updates buried in WhatsApp groups",
    desc: "Holiday schedules, class cancellations, and fee hike notices get lost in 300-message group chats. Half your members never see them.",
  },
  {
    icon: <Clock size={22} color="#f87171" />,
    title: "Staff spend 45 mins sending the same message",
    desc: "Copy-pasting announcements to different batches, manually typing member names, resending to people who didn't receive — it's a full-time task.",
  },
  {
    icon: <Bell size={22} color="#f87171" />,
    title: "No way to know who read your announcement",
    desc: "You post on the notice board and hope for the best. WhatsApp shows 'delivered'. You never know if members actually read the new policy.",
  },
  {
    icon: <Users size={22} color="#f87171" />,
    title: "Can't target specific member groups",
    desc: "You want to notify only Sunday batch members about a trainer change. Instead you blast everyone and get replies from 200 confused people.",
  },
];

const tabs = [
  {
    label: "Broadcast",
    sub: "Reach all or some",
    title: "One click. Every member notified.",
    desc: "Write your announcement once. Choose who gets it — all members, a specific batch, plan type, trainer group, or even individual members. Send via in-app notification, push, WhatsApp, or all three at once.",
    bullets: ["Segment by plan, batch, or trainer", "WhatsApp + push + in-app simultaneously", "Schedule to send at the right time"],
  },
  {
    label: "Templates",
    sub: "Reuse & brand",
    title: "Beautiful templates your members will actually read.",
    desc: "Choose from pre-built announcement templates — fee reminders, holiday schedules, new class launches, motivational messages, and more. Add your gym's logo and colors. Looks like a premium brand, not a text blast.",
    bullets: ["20+ ready-made announcement templates", "Branded with your logo and colors", "Rich media — images, PDFs attachable"],
  },
  {
    label: "Analytics",
    sub: "Track engagement",
    title: "Know who read. Know who didn't.",
    desc: "See open rates, read confirmations, and click-through rates for every announcement. Know which messages resonate, which time slots perform best, and which members never engage — so you can nudge them personally.",
    bullets: ["Per-announcement read receipts", "Member engagement scoring", "Best time to send suggestions"],
  },
];

const scenarios = [
  {
    icon: <Radio size={22} color="#2563eb" />,
    title: "Sunday class cancelled at 7 AM",
    desc: "Coach calls in sick. You open Trainix, pick the Sunday 8AM batch, tap 'Notify'. All 40 members get a WhatsApp + push before they leave home.",
  },
  {
    icon: <TrendingUp size={22} color="#16a34a" />,
    title: "Fee revision — zero arguments",
    desc: "Send a fee revision announcement with the new pricing table attached as PDF. Every member gets it, can't claim they didn't know, and you have a delivery record.",
  },
  {
    icon: <Star size={22} color="#f59e0b" />,
    title: "Member of the month celebration",
    desc: "Announce the monthly transformation winner with their before/after photo. Boosts member pride, social sharing, and motivates everyone else to push harder.",
  },
  {
    icon: <Zap size={22} color="#8b5cf6" />,
    title: "Flash offer to inactive members",
    desc: "Filter members who haven't visited in 15+ days. Send a 'We miss you — 20% off renewal' message with a payment link. Reactivations start within the hour.",
  },
  {
    icon: <Bell size={22} color="#ec4899" />,
    title: "Diwali schedule in one broadcast",
    desc: "Holiday opening hours across 3 branches, sent to all members with branch-specific timings. No confusion, no calls, no 'but I thought you were open'.",
  },
  {
    icon: <Image size={22} color="#ea580c" />,
    title: "New trainer introduction",
    desc: "New PT joins on Monday. You send a branded welcome announcement with their photo, specialisations, and how to book a trial. Memberships start flowing.",
  },
];

const steps = [
  { title: "Choose your audience", desc: "All members, a specific batch, plan type, or custom filter. Segment in seconds." },
  { title: "Pick a template or write fresh", desc: "Use a pre-built template or write your own. Add images or PDFs if needed." },
  { title: "Select channels", desc: "In-app notification, push alert, WhatsApp — pick one or send all three at once." },
  { title: "Send now or schedule", desc: "Send immediately or schedule for the optimal time. The system handles delivery." },
];

const faqs = [
  {
    q: "Does Trainix send WhatsApp messages to members automatically?",
    a: "Yes. Trainix integrates with WhatsApp Business API to send templated messages. Announcements are sent as approved templates, ensuring delivery and compliance.",
  },
  {
    q: "Can I target members who haven't visited in X days?",
    a: "Yes. The audience filter lets you segment by last attendance date, membership status, payment status, batch, trainer, or plan type — any combination you need.",
  },
  {
    q: "Is there a limit to how many announcements I can send?",
    a: "No hard limit on in-app and push notifications. WhatsApp messages follow your WhatsApp Business API tier limits, which scale with your usage.",
  },
  {
    q: "Can members reply to announcements?",
    a: "In-app announcements have a comment/like feature for community engagement. WhatsApp replies go to your WhatsApp Business inbox where staff can respond.",
  },
  {
    q: "Can I see who specifically hasn't read an announcement?",
    a: "Yes. The read receipt view shows a list of members who opened the announcement vs those who didn't. You can then send a targeted follow-up to non-readers.",
  },
];

export const Announcements: React.FC<AnnouncementsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<Send size={20} />, <LayoutList size={20} />, <TrendingUp size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — deep blue gradient ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #0c1445 0%, #1e3a8a 55%, #1d4ed8 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-25%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'rgba(59,130,246,0.2)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '8%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(99,102,241,0.12)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: '#bfdbfe' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
                Announcements
              </div>

              <h1 style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.08, letterSpacing: -2, margin: '0 0 24px', color: '#fff' }}>
                Every member.{' '}
                <span style={{ background: 'linear-gradient(90deg, #93c5fd, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Informed instantly.
                </span>
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#bfdbfe', marginBottom: 40, maxWidth: 480 }}>
                Send targeted announcements over WhatsApp, push, and in-app — all from one place. No group chats, no missed messages, no more members saying "I didn't know".
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                <button style={{ padding: '14px 32px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button style={{ padding: '14px 32px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Book a Demo
                </button>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['WhatsApp + push + in-app', 'Read receipt tracking', 'Segment any audience'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#bfdbfe' }}>
                    <CheckCircle2 size={14} color="#60a5fa" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — announcement dashboard mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 380, background: '#fff', borderRadius: 24, boxShadow: '0 40px 80px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>New Announcement</div>
                    <div style={{ fontWeight: 900, fontSize: 20, color: '#fff' }}>Holiday Schedule 🎉</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, color: '#fff' }}>Sending...</div>
                </div>

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid #f1f5f9' }}>
                  {[{ val: '847', label: 'Sent' }, { val: '621', label: 'Read' }, { val: '73%', label: 'Open rate' }].map((s, i) => (
                    <div key={i} style={{ padding: '16px 12px', textAlign: 'center', borderRight: i < 2 ? '1px solid #f1f5f9' : 'none' }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: i === 2 ? '#2563eb' : '#0f172a' }}>{s.val}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Channel breakdown */}
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Channels</div>
                  {[
                    { label: 'WhatsApp', val: '812 delivered', color: '#16a34a', pct: 96 },
                    { label: 'Push Notification', val: '741 received', color: '#2563eb', pct: 87 },
                    { label: 'In-App', val: '621 opened', color: '#7c3aed', pct: 73 },
                  ].map((c, i) => (
                    <div key={i} style={{ marginBottom: i < 2 ? 12 : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{c.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: c.color }}>{c.val}</span>
                      </div>
                      <div style={{ height: 6, background: '#f1f5f9', borderRadius: 100, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${c.pct}%`, background: c.color, borderRadius: 100 }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent */}
                <div style={{ padding: '12px 24px 20px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Recent</div>
                  {[
                    { title: 'Trainer change - Tue 6AM', time: '2h ago', read: '94%' },
                    { title: 'New batch: Zumba Sat', time: '1d ago', read: '81%' },
                  ].map((a, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i === 0 ? '1px solid #f8fafc' : 'none' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{a.title}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{a.time}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '3px 10px', borderRadius: 100 }}>{a.read} read</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ position: 'absolute', zIndex: -1, right: -40, top: '20%', width: 130, height: 130, borderRadius: '50%', background: '#60a5fa', filter: 'blur(50px)', opacity: 0.3 }} />
              <div style={{ position: 'absolute', zIndex: -1, left: -30, bottom: -20, width: 160, height: 160, borderRadius: '50%', background: '#818cf8', filter: 'blur(60px)', opacity: 0.2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            { val: '< 30s', label: 'Time to send any announcement' },
            { val: '3×', label: 'More reach vs notice boards' },
            { val: '73%', label: 'Average open rate' },
            { val: '0', label: 'Group chat chaos' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#2563eb', letterSpacing: -1 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>The Problem</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Your announcements are getting ignored.</h2>
            <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7 }}>WhatsApp groups are chaos, notice boards are invisible, and you have no idea who's actually reading your messages.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 900, margin: '0 auto' }}>
            {painPoints.map((p, i) => (
              <div key={i} style={{ background: '#fff', padding: 32, borderRadius: 20, border: '1px solid #fee2e2', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ width: 48, height: 48, background: '#fff1f2', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{p.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section style={{ background: '#fff', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#dbeafe', color: '#2563eb', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>Broadcast. Template. Analyse.</h2>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 32, overflow: 'hidden', maxWidth: 960, margin: '0 auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: 16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 16, border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`, background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: activeTab === i ? '#2563eb' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === i ? '#fff' : '#64748b' }}>{tabIcons[i]}</div>
                  <span style={{ fontWeight: 700, fontSize: 15, color: activeTab === i ? '#fff' : '#475569' }}>{t.label}</span>
                  <span style={{ fontSize: 11, color: '#475569', fontWeight: 500 }}>{t.sub}</span>
                </button>
              ))}
            </div>
            <div style={{ padding: 48, display: 'flex', gap: 64, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 30, fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>{tabs[activeTab].title}</h3>
                <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>{tabs[activeTab].desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {tabs[activeTab].bullets.map((b, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 600, color: '#cbd5e1' }}>
                      <CheckCircle2 size={17} color="#60a5fa" style={{ flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ width: 240, flexShrink: 0, aspectRatio: '4/3', background: '#1e293b', borderRadius: 20, border: '5px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <Smartphone size={40} color="#334155" />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center', padding: '0 12px', lineHeight: 1.5 }}>📷 Add screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#dbeafe', color: '#2563eb', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>Real Scenarios</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>When communication actually works.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
            {scenarios.map((s, i) => (
              <div key={i} style={{ background: '#fff', padding: 28, borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.02)' }}>
                <div style={{ width: 40, height: 40, background: '#f8fafc', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section style={{ background: '#fff', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
            <span style={{ background: '#dbeafe', color: '#2563eb', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-block', marginBottom: 16 }}>How to Send</span>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Any announcement. 30 seconds.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, maxWidth: 1100, margin: '0 auto 48px' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: '#fff', padding: '32px 24px 28px', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', position: 'relative', marginTop: 20 }}>
                <div style={{ position: 'absolute', top: -18, left: 24, width: 36, height: 36, borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, boxShadow: '0 4px 12px rgba(37,99,235,0.3)', border: '3px solid #fff' }}>{i + 1}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 10, marginTop: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Feature highlight banner */}
          <div style={{ maxWidth: 1100, margin: '0 auto', background: 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)', borderRadius: 28, padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, boxShadow: '0 24px 64px rgba(37,99,235,0.25)' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#bfdbfe', marginBottom: 20 }}>
                <Megaphone size={13} /> Smart Scheduling
              </div>
              <h3 style={{ fontSize: 30, fontWeight: 900, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>Send at the right time. Automatically.</h3>
              <p style={{ fontSize: 16, color: '#bfdbfe', lineHeight: 1.65, maxWidth: 540, margin: 0 }}>Trainix analyses when your members are most active in the app and suggests the optimal send time for each announcement. Higher open rates, without the guesswork.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: 28, borderRadius: 20, flexShrink: 0 }}>
              <Bell size={72} color="rgba(255,255,255,0.6)" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: '#f8fafc', padding: '96px 0', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', textAlign: 'center', letterSpacing: -1.5, marginBottom: 48 }}>Frequently asked</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '20px 24px', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: 15, color: '#0f172a', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                </button>
                {openFaq === i && <div style={{ padding: '0 24px 20px', fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', color: '#fff' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <Megaphone size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20, lineHeight: 1.1 }}>Stop sending announcements into the void.</h2>
          <p style={{ fontSize: 18, color: '#bfdbfe', lineHeight: 1.7, marginBottom: 40 }}>Every member informed. Every message tracked. Every campaign measured. Communication that actually works.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button style={{ padding: '16px 36px', background: '#fff', color: '#2563eb', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Book a Demo</button>
          </div>
          <p style={{ fontSize: 13, color: '#bfdbfe', fontWeight: 500 }}>No setup fees • Cancel anytime • Built for modern gyms</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Announcements;
