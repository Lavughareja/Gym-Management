import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle2, ChevronDown,
  DollarSign, Calendar, BarChart2, Users, Clock, Star,
  Clipboard, Smartphone, TrendingUp, Zap, ShieldCheck, Award
} from 'lucide-react';
import { Navbar, Footer } from '../Home';

export interface TrainerManagementProps {
  onBack: () => void;
}

/* ─── static data ─────────────────────────────────── */
const painPoints = [
  {
    icon: <DollarSign size={22} color="#f87171" />,
    title: "Payout disputes every month",
    desc: "Manually calculating commission splits from raw attendance data causes errors, arguments, and delayed payments that kill trainer morale.",
  },
  {
    icon: <Calendar size={22} color="#f87171" />,
    title: "Schedule clashes no one sees coming",
    desc: "Double-booking trainers across time slots, classes, and PT sessions — without a unified view — burns time and disappoints members.",
  },
  {
    icon: <BarChart2 size={22} color="#f87171" />,
    title: "No visibility into trainer performance",
    desc: "You don't know which trainers are retaining members, hitting renewal rates, or slipping on attendance until it's already a problem.",
  },
  {
    icon: <Clipboard size={22} color="#f87171" />,
    title: "Trainer plans live in WhatsApp",
    desc: "Workout plans are sent over chat, overwritten by accidents, and impossible to track. Members get inconsistent routines every week.",
  },
];

const tabs = [
  {
    label: "Payouts",
    sub: "Auto commission engine",
    title: "Accurate payouts. Zero arguments.",
    desc: "Define each trainer's commission structure once — fixed salary, revenue share, or per-session fees. Trainix auto-calculates payouts every month based on actual sessions logged, PT renewals, and attendance data.",
    bullets: ["Fixed, % share, or hybrid commission models", "Salary slips auto-generated as PDF", "Payout history visible to trainer in their app"],
  },
  {
    label: "Scheduling",
    sub: "Conflict-free calendar",
    title: "One calendar. Every trainer. Zero clashes.",
    desc: "Assign trainers to shifts, group classes, and PT slots from a single drag-and-drop calendar. Conflict alerts fire automatically if a trainer is double-booked. Members always know who they're meeting and when.",
    bullets: ["Drag-and-drop schedule builder", "Real-time conflict detection", "Trainer availability self-management"],
  },
  {
    label: "Performance",
    sub: "Data-backed reviews",
    title: "Know your best trainers before they leave.",
    desc: "Track each trainer's session completion rate, member renewal influence, attendance punctuality, and client progress scores. Spot high performers to reward, and low performers to coach — before members notice.",
    bullets: ["Per-trainer retention & renewal rate", "Session completion & punctuality scores", "Monthly performance report cards"],
  },
];

const scenarios = [
  {
    icon: <Award size={22} color="#8b5cf6" />,
    title: "Bonus trigger for top performers",
    desc: "Set a bonus rule: if a trainer logs 95%+ sessions with 90%+ member renewal, a bonus is auto-added to their next payout. Zero manual tracking.",
  },
  {
    icon: <Users size={22} color="#3b82f6" />,
    title: "New trainer onboarding in 2 minutes",
    desc: "Add a trainer, assign their contract type, set availability windows, and link their members. They get an app login and are live before the day ends.",
  },
  {
    icon: <Clock size={22} color="#f59e0b" />,
    title: "Trainer goes on leave — smooth handoff",
    desc: "Mark a trainer on leave. Their assigned members get auto-reassigned to available trainers and notified over WhatsApp. No calls, no confusion.",
  },
  {
    icon: <Star size={22} color="#ec4899" />,
    title: "Member requests a specific trainer",
    desc: "A new member asks for 'the one who helped Priya lose 10kg'. You can look up trainer profiles, see specialisations, and assign in two taps.",
  },
  {
    icon: <TrendingUp size={22} color="#22c55e" />,
    title: "End-of-month payout in one click",
    desc: "Every attendance log, PT renewal, and session note feeds directly into the payout engine. Month-end takes 60 seconds, not 4 hours.",
  },
  {
    icon: <Zap size={22} color="#f97316" />,
    title: "Trainer app keeps staff accountable",
    desc: "Trainers log sessions, mark attendance, and share workout plans directly from their phone. The gym owner sees everything in real time.",
  },
];

const steps = [
  { title: "Add trainer profile", desc: "Name, photo, specialisation, certifications, contact. Takes 90 seconds." },
  { title: "Set commission & contract", desc: "Choose fixed salary, per-session, or revenue-share. Save once, apply forever." },
  { title: "Assign members & slots", desc: "Pick their working hours and drag-assign existing members to their schedule." },
  { title: "Trainer goes live", desc: "They get app access, see their schedule, and start logging sessions immediately." },
];

const faqs = [
  {
    q: "Can a trainer see other trainers' data?",
    a: "No. Role-based access ensures each trainer only sees their own schedule, members, sessions, and payout history. Only admins have full visibility.",
  },
  {
    q: "How does the commission calculator work?",
    a: "You define the rule once (e.g., '₹300 per PT session + 10% of the member's renewal value'). Every logged session and renewal automatically feeds into the monthly payout calculation.",
  },
  {
    q: "Can trainers manage their own availability?",
    a: "Yes. Trainers can block unavailable slots from their mobile app. The scheduling view on the admin side updates in real time, preventing double bookings.",
  },
  {
    q: "What happens to a trainer's members if they leave?",
    a: "You can bulk-reassign all their active members to one or more trainers in a single action. Members are notified automatically over WhatsApp.",
  },
  {
    q: "Is the trainer app a separate download?",
    a: "No. Trainers use the same Trainix mobile app with a trainer-specific view. There is nothing additional to install or configure.",
  },
];

/* ─── component ───────────────────────────────────── */
export const TrainerManagement: React.FC<TrainerManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabIcons = [<DollarSign size={20} />, <Calendar size={20} />, <BarChart2 size={20} />];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — teal/green gradient (different from Member Mgmt purple) ══ */}
      <section style={{
        background: 'linear-gradient(135deg, #052e16 0%, #064e3b 55%, #0f766e 100%)',
        color: '#fff',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* blobs */}
        <div style={{ position:'absolute', top:'-25%', right:'-8%', width:560, height:560, borderRadius:'50%', background:'rgba(16,185,129,0.18)', filter:'blur(100px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-15%', left:'8%', width:380, height:380, borderRadius:'50%', background:'rgba(59,130,246,0.1)', filter:'blur(80px)', pointerEvents:'none' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:1 }}>

          {/* back button — simple link style, no pill */}

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>

            {/* Left */}
            <div>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:8,
                background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.18)',
                padding:'6px 16px', borderRadius:100, fontSize:11, fontWeight:700,
                textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:24, color:'#a7f3d0',
              }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'#34d399', display:'inline-block' }} />
                Trainer Management
              </div>

              <h1 style={{ fontSize:60, fontWeight:900, lineHeight:1.08, letterSpacing:-2, margin:'0 0 24px', color:'#fff' }}>
                Your trainers.{' '}
                <span style={{ background:'linear-gradient(90deg,#6ee7b7,#67e8f9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  Paid right,
                </span>{' '}
                scheduled right.
              </h1>

              <p style={{ fontSize:18, lineHeight:1.7, color:'#a7f3d0', marginBottom:40, maxWidth:480 }}>
                Automated commission payouts, conflict-free scheduling, and real-time performance tracking — all in one place. Stop managing trainers in WhatsApp and Excel.
              </p>

              <div style={{ display:'flex', gap:16, marginBottom:36, flexWrap:'wrap' }}>
                <button style={{
                  padding:'14px 32px', background:'#059669', color:'#fff',
                  border:'none', borderRadius:14, fontSize:15, fontWeight:700,
                  cursor:'pointer', display:'flex', alignItems:'center', gap:8,
                  boxShadow:'0 8px 32px rgba(5,150,105,0.4)', transition:'transform 0.2s',
                }}>Start Free Trial <ArrowRight size={18} /></button>
                <button style={{
                  padding:'14px 32px', background:'transparent', color:'#fff',
                  border:'1.5px solid rgba(255,255,255,0.28)', borderRadius:14,
                  fontSize:15, fontWeight:700, cursor:'pointer',
                }}>Book a Demo</button>
              </div>

              <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
                {['No manual payout math', 'WhatsApp notifications', 'Trainer mobile app included'].map(t => (
                  <span key={t} style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:'#6ee7b7' }}>
                    <CheckCircle2 size={14} color="#34d399" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — dashboard mockup */}
            <div style={{ display:'flex', justifyContent:'center', position:'relative' }}>
              <div style={{
                width:'100%', maxWidth:380, background:'#fff',
                borderRadius:24, boxShadow:'0 40px 80px rgba(0,0,0,0.4)',
                overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)',
              }}>
                {/* Header bar */}
                <div style={{ background:'linear-gradient(135deg,#059669,#0d9488)', padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.7)', marginBottom:4 }}>Payout Preview — July 2026</div>
                    <div style={{ fontSize:28, fontWeight:900, color:'#fff' }}>₹1,24,500</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.7)', marginTop:2 }}>4 trainers · 3 pending approval</div>
                  </div>
                  <div style={{ width:44, height:44, borderRadius:12, background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <DollarSign size={22} color="#fff" />
                  </div>
                </div>

                {/* Trainer rows */}
                {[
                  { name:'Ravi Kumar', role:'PT + Group', amount:'₹38,200', status:'Approved', color:'#16a34a', bg:'#dcfce7' },
                  { name:'Neha Sharma', role:'Yoga Specialist', amount:'₹29,800', status:'Pending', color:'#d97706', bg:'#fef3c7' },
                  { name:'Arjun Mehta', role:'Strength Coach', amount:'₹32,500', status:'Approved', color:'#16a34a', bg:'#dcfce7' },
                  { name:'Priya Patel', role:'Zumba + Pilates', amount:'₹24,000', status:'Review', color:'#7c3aed', bg:'#ede9fe' },
                ].map((tr, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 24px', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{ width:36, height:36, borderRadius:'50%', background:`hsl(${i*70+120},60%,85%)`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:13, color:'#1e293b' }}>
                        {tr.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:13, color:'#0f172a' }}>{tr.name}</div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:500 }}>{tr.role}</div>
                      </div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontWeight:800, fontSize:14, color:'#0f172a' }}>{tr.amount}</div>
                      <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:100, background:tr.bg, color:tr.color }}>{tr.status}</span>
                    </div>
                  </div>
                ))}

                <div style={{ padding:'14px 24px', background:'#f8fafc', display:'flex', justifyContent:'center' }}>
                  <button style={{ background:'#059669', color:'#fff', border:'none', borderRadius:10, padding:'10px 28px', fontWeight:700, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
                    Approve All & Pay <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* glow blobs */}
              <div style={{ position:'absolute', zIndex:-1, right:-40, top:'20%', width:130, height:130, borderRadius:'50%', background:'#34d399', filter:'blur(50px)', opacity:0.3 }} />
              <div style={{ position:'absolute', zIndex:-1, left:-30, bottom:-20, width:160, height:160, borderRadius:'50%', background:'#0ea5e9', filter:'blur(60px)', opacity:0.2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div style={{ background:'#fff', borderBottom:'1px solid #f1f5f9' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
          {[
            { val:'< 60s', label:'Monthly payout calculation' },
            { val:'0', label:'Manual spreadsheet errors' },
            { val:'100%', label:'Session visibility for owners' },
            { val:'24×7', label:'Trainer app uptime' },
          ].map((s, i) => (
            <div key={i} style={{ padding:'32px 24px', textAlign:'center', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize:34, fontWeight:900, color:'#059669', letterSpacing:-1 }}>{s.val}</div>
              <div style={{ fontSize:13, color:'#64748b', fontWeight:600, marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section style={{ background:'#f8fafc', padding:'96px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
          <div style={{ textAlign:'center', maxWidth:680, margin:'0 auto 64px' }}>
            <span style={{ background:'#fee2e2', color:'#dc2626', fontSize:10, fontWeight:700, padding:'4px 14px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', display:'inline-block', marginBottom:16 }}>Where It Breaks Down</span>
            <h2 style={{ fontSize:44, fontWeight:900, color:'#0f172a', letterSpacing:-1.5, margin:'0 0 16px', lineHeight:1.1 }}>Managing trainers manually is a full-time job.</h2>
            <p style={{ fontSize:18, color:'#64748b', lineHeight:1.7 }}>Most gym owners spend 10+ hours a month on trainer admin that should take 10 minutes.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, maxWidth:900, margin:'0 auto' }}>
            {painPoints.map((p, i) => (
              <div key={i} style={{ background:'#fff', padding:32, borderRadius:20, border:'1px solid #fee2e2', boxShadow:'0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ width:48, height:48, background:'#fff1f2', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize:18, fontWeight:800, color:'#0f172a', marginBottom:10 }}>{p.title}</h3>
                <p style={{ fontSize:15, color:'#64748b', lineHeight:1.65, margin:0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INTERACTIVE TABS ══ */}
      <section style={{ background:'#fff', padding:'96px 0', borderTop:'1px solid #f1f5f9' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
          <div style={{ textAlign:'center', maxWidth:680, margin:'0 auto 64px' }}>
            <span style={{ background:'#d1fae5', color:'#059669', fontSize:10, fontWeight:700, padding:'4px 14px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', display:'inline-block', marginBottom:16 }}>How It Works</span>
            <h2 style={{ fontSize:44, fontWeight:900, color:'#0f172a', letterSpacing:-1.5, margin:'0 0 16px', lineHeight:1.1 }}>Three systems. One dashboard.</h2>
            <p style={{ fontSize:18, color:'#64748b', lineHeight:1.7 }}>Payouts, scheduling, and performance management — fully integrated and talking to each other.</p>
          </div>

          <div style={{ background:'#0f172a', borderRadius:32, overflow:'hidden', maxWidth:960, margin:'0 auto', boxShadow:'0 40px 80px rgba(0,0,0,0.3)' }}>
            {/* Tab nav */}
            <div style={{ display:'flex', gap:8, borderBottom:'1px solid rgba(255,255,255,0.08)', padding:16 }}>
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{
                  flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:8,
                  padding:'20px 12px', borderRadius:16, border:'1px solid transparent',
                  background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent',
                  borderColor: activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent',
                  cursor:'pointer', transition:'all 0.2s',
                }}>
                  <div style={{
                    width:44, height:44, borderRadius:'50%',
                    background: activeTab === i ? '#059669' : 'rgba(255,255,255,0.05)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color: activeTab === i ? '#fff' : '#64748b',
                  }}>{tabIcons[i]}</div>
                  <span style={{ fontWeight:700, fontSize:15, color: activeTab === i ? '#fff' : '#475569' }}>{t.label}</span>
                  <span style={{ fontSize:11, color:'#475569', fontWeight:500 }}>{t.sub}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ padding:48, display:'flex', gap:64, alignItems:'center' }}>
              <div style={{ flex:1 }}>
                <h3 style={{ fontSize:30, fontWeight:900, color:'#fff', marginBottom:16, lineHeight:1.2 }}>{tabs[activeTab].title}</h3>
                <p style={{ fontSize:16, color:'#94a3b8', lineHeight:1.7, marginBottom:32 }}>{tabs[activeTab].desc}</p>
                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:14 }}>
                  {tabs[activeTab].bullets.map((b, i) => (
                    <li key={i} style={{ display:'flex', alignItems:'center', gap:12, fontSize:14, fontWeight:600, color:'#cbd5e1' }}>
                      <CheckCircle2 size={17} color="#34d399" style={{ flexShrink:0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              {/* screenshot placeholder */}
              <div style={{ width:240, flexShrink:0, aspectRatio:'4/3', background:'#1e293b', borderRadius:20, border:'5px solid #334155', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, boxShadow:'0 20px 60px rgba(0,0,0,0.4)' }}>
                <Smartphone size={40} color="#334155" />
                <span style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#475569', textAlign:'center', padding:'0 12px', lineHeight:1.5 }}>📷 Add screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section style={{ background:'#f8fafc', padding:'96px 0', borderTop:'1px solid #f1f5f9' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
          <div style={{ textAlign:'center', maxWidth:680, margin:'0 auto 64px' }}>
            <span style={{ background:'#d1fae5', color:'#059669', fontSize:10, fontWeight:700, padding:'4px 14px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', display:'inline-block', marginBottom:16 }}>Real Scenarios</span>
            <h2 style={{ fontSize:44, fontWeight:900, color:'#0f172a', letterSpacing:-1.5, margin:0, lineHeight:1.1 }}>When trainer management actually runs itself.</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, maxWidth:1100, margin:'0 auto' }}>
            {scenarios.map((s, i) => (
              <div key={i} style={{ background:'#fff', padding:28, borderRadius:20, border:'1px solid #f1f5f9', boxShadow:'0 2px 16px rgba(0,0,0,0.02)' }}>
                <div style={{ width:40, height:40, background:'#f8fafc', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize:15, fontWeight:800, color:'#0f172a', marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:13, color:'#64748b', lineHeight:1.65, margin:0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section style={{ background:'#fff', padding:'96px 0', borderTop:'1px solid #f1f5f9' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
          <div style={{ textAlign:'center', maxWidth:680, margin:'0 auto 64px' }}>
            <span style={{ background:'#d1fae5', color:'#059669', fontSize:10, fontWeight:700, padding:'4px 14px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', display:'inline-block', marginBottom:16 }}>Setup</span>
            <h2 style={{ fontSize:44, fontWeight:900, color:'#0f172a', letterSpacing:-1.5, margin:0, lineHeight:1.1 }}>Trainer live in 4 steps. Permanent.</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, maxWidth:1100, margin:'0 auto 48px' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background:'#fff', padding:'32px 24px 28px', borderRadius:20, border:'1px solid #f1f5f9', boxShadow:'0 4px 20px rgba(0,0,0,0.02)', position:'relative', marginTop:20 }}>
                <div style={{ position:'absolute', top:-18, left:24, width:36, height:36, borderRadius:'50%', background:'#059669', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14, boxShadow:'0 4px 12px rgba(5,150,105,0.3)', border:'3px solid #fff' }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize:16, fontWeight:800, color:'#0f172a', marginBottom:10, marginTop:8 }}>{s.title}</h3>
                <p style={{ fontSize:13, color:'#64748b', lineHeight:1.65, margin:0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Feature highlight banner */}
          <div style={{ maxWidth:1100, margin:'0 auto', background:'linear-gradient(135deg,#059669 0%,#0d9488 100%)', borderRadius:28, padding:'48px 56px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:48, boxShadow:'0 24px 64px rgba(5,150,105,0.25)' }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.12)', padding:'6px 16px', borderRadius:100, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#a7f3d0', marginBottom:20 }}>
                <ShieldCheck size={13} /> Role-based access
              </div>
              <h3 style={{ fontSize:30, fontWeight:900, color:'#fff', marginBottom:12, lineHeight:1.2 }}>Trainers see only what they need to.</h3>
              <p style={{ fontSize:16, color:'#a7f3d0', lineHeight:1.65, maxWidth:540, margin:0 }}>Granular permissions mean trainers access their own schedule, members, and session logs — nothing more. Payroll data, revenue figures, and other trainers' data stay private.</p>
            </div>
            <div style={{ background:'rgba(255,255,255,0.12)', padding:28, borderRadius:20, flexShrink:0 }}>
              <ShieldCheck size={72} color="rgba(255,255,255,0.6)" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background:'#f8fafc', padding:'96px 0', borderTop:'1px solid #f1f5f9' }}>
        <div style={{ maxWidth:720, margin:'0 auto', padding:'0 32px' }}>
          <h2 style={{ fontSize:44, fontWeight:900, color:'#0f172a', textAlign:'center', letterSpacing:-1.5, marginBottom:48 }}>Frequently asked</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:18, overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,0.02)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width:'100%', padding:'20px 24px', textAlign:'left',
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  fontWeight:700, fontSize:15, color:'#0f172a',
                  background:'none', border:'none', cursor:'pointer',
                }}>
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition:'transform 0.2s', flexShrink:0 }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding:'0 24px 20px', fontSize:15, color:'#64748b', lineHeight:1.7 }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section style={{ background:'linear-gradient(135deg,#059669 0%,#0f766e 100%)', padding:'96px 32px', textAlign:'center' }}>
        <div style={{ maxWidth:680, margin:'0 auto', color:'#fff' }}>
          <div style={{ width:64, height:64, background:'rgba(255,255,255,0.12)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 32px' }}>
            <Users size={30} color="#fff" />
          </div>
          <h2 style={{ fontSize:48, fontWeight:900, letterSpacing:-1.5, marginBottom:20, lineHeight:1.1 }}>Happy trainers build loyal members.</h2>
          <p style={{ fontSize:18, color:'#a7f3d0', lineHeight:1.7, marginBottom:40 }}>When payouts are accurate, schedules are clear, and performance is visible — your trainers do their best work. Set it up in 15 minutes.</p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:24 }}>
            <button style={{ padding:'16px 36px', background:'#fff', color:'#059669', border:'none', borderRadius:14, fontSize:15, fontWeight:800, cursor:'pointer', boxShadow:'0 8px 32px rgba(0,0,0,0.15)' }}>
              Start Free Trial <ArrowRight size={17} style={{ display:'inline', verticalAlign:'middle', marginLeft:6 }} />
            </button>
            <button style={{ padding:'16px 36px', background:'transparent', color:'#fff', border:'2px solid rgba(255,255,255,0.35)', borderRadius:14, fontSize:15, fontWeight:700, cursor:'pointer' }}>
              Book a Demo
            </button>
          </div>
          <p style={{ fontSize:13, color:'#6ee7b7', fontWeight:500 }}>No setup fees • Cancel anytime • Built for modern gyms</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrainerManagement;
