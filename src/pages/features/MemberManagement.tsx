import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, ArrowRight, Clock, Phone, MessageSquare, TrendingUp, Store, Megaphone, Moon, Users, UserMinus, Gift, ChevronDown, Smartphone, Activity, CreditCard, Calendar, QrCode } from 'lucide-react';
import { featuresData } from '../../data/featuresData';
import { Navbar, Footer } from '../Home';
import "./MemberManagement.css";
export interface MemberManagementProps {
  onBack: () => void;
}
const iconColors: Record<string, string> = {
  clock: '#f87171',
  phone: '#f87171',
  message: '#f87171',
  trending: '#f87171',
  store: '#3b82f6',
  megaphone: '#ec4899',
  moon: '#facc15',
  users: '#22c55e',
  'user-minus': '#a855f7',
  gift: '#f97316'
};
const getIcon = (iconName: string) => {
  const color = iconColors[iconName] || '#4f46e5';
  const props = {
    size: 22,
    color
  };
  switch (iconName) {
    case 'clock':
      return <Clock {...props} />;
    case 'phone':
      return <Phone {...props} />;
    case 'message':
      return <MessageSquare {...props} />;
    case 'trending':
      return <TrendingUp {...props} />;
    case 'store':
      return <Store {...props} />;
    case 'megaphone':
      return <Megaphone {...props} />;
    case 'moon':
      return <Moon {...props} />;
    case 'users':
      return <Users {...props} />;
    case 'user-minus':
      return <UserMinus {...props} />;
    case 'gift':
      return <Gift {...props} />;
    default:
      return <CheckCircle2 {...props} />;
  }
};
const tabIcons = [<Calendar size={20} />, <Activity size={20} />, <CreditCard size={20} />];
const tabSubs = ['Warm lead capture', 'Class + PT slots', 'Full membership'];
export const MemberManagement: React.FC<MemberManagementProps> = ({
  onBack
}) => {
  const feature = featuresData['member-management'];
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!feature || !feature.marketing) return null;
  const m = feature.marketing;
  return <div className="member-management-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ── HERO ── */}
      <section className="member-management-inline-2">
        {/* Glow blobs */}
        <div className="member-management-inline-3" />
        <div className="member-management-inline-4" />

        <div className="member-management-inline-5">


          {/* 2-col grid */}
          <div className="member-management-inline-6">
            {/* Left */}
            <div>
              <div className="member-management-inline-7">
                <span className="member-management-inline-8" />
                {feature.title}
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="member-management-inline-9">
                {(m.headline || '').split('while you sleep')[0]}
                <span className="member-management-inline-10">
                  while you sleep.
                </span>
              </h1>

              <p className="member-management-inline-11">
                {m.subHeadline}
              </p>

              <div className="member-management-inline-12">
                <button className="member-management-inline-13">Start Free Trial <ArrowRight size={18} /></button>
                <button className="member-management-inline-14">Book a Demo</button>
              </div>

              <div className="member-management-inline-15">
                {['Fully white-labeled', 'Razorpay powered'].map(t => <span key={t} className="member-management-inline-16">
                    <CheckCircle2 size={15} color="#4ade80" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right - Phone mockup */}
            <div className="member-management-inline-17">
              <div className="member-management-inline-18">
                {/* Header */}
                <div className="member-management-inline-19">
                  <div className="member-management-inline-20" />
                  <div className="member-management-inline-21">FX</div>
                  <div className="member-management-inline-22">FRX Premium</div>
                  <div className="member-management-inline-23">Unlimited Access + Diet</div>
                </div>

                {/* Body */}
                <div className="member-management-inline-24">
                  <div className="member-management-inline-25">
                    <span className="member-management-inline-26">Join Now</span>
                    <span className="member-management-inline-27">Free Trial</span>
                  </div>
                  <div className="member-management-inline-28">
                    <div className="member-management-inline-29">
                      <span className="member-management-inline-30">Selected</span>
                      <span className="member-management-inline-31">₹19,999</span>
                    </div>
                    <div className="member-management-inline-32">Annual Elite</div>
                    <div className="member-management-inline-33">12 Months Access • No setup fee</div>
                  </div>
                  <div className="member-management-inline-34">
                    <Gift size={13} /> Coupon NEW10 applied!
                  </div>
                  <button className="member-management-inline-35">
                    Pay ₹17,999 <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              {/* Glow behind phone */}
              <div style={{
              zIndex: -1,
              right: -40
            }} className="member-management-inline-36" />
              <div style={{
              zIndex: -1,
              left: -30,
              bottom: -20
            }} className="member-management-inline-37" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      {m.painPoints && <section className="member-management-inline-38">
          <div className="member-management-inline-39">
            <div className="member-management-inline-40">
              <span className="member-management-inline-41">The Real Cost</span>
              <h2 style={{
            letterSpacing: -1.5
          }} className="member-management-inline-42">{m.painPointsHeadline}</h2>
              <p className="member-management-inline-43">{m.painPointsSub}</p>
            </div>
            <div className="member-management-inline-44">
              {m.painPoints.map((p, i) => <div key={i} className="member-management-inline-45">
                  <div className="member-management-inline-46">
                    {getIcon(p.icon)}
                  </div>
                  <h3 className="member-management-inline-47">{p.title}</h3>
                  <p className="member-management-inline-48">{p.desc}</p>
                </div>)}
            </div>
          </div>
        </section>}

      {/* ── FEATURE TABS ── */}
      {m.featureTabs && <section className="member-management-inline-49">
          <div className="member-management-inline-50">
            <div className="member-management-inline-51">
              <span className="member-management-inline-52">The Fix</span>
              <h2 style={{
            letterSpacing: -1.5
          }} className="member-management-inline-53">{m.tabsHeadline}</h2>
              <p className="member-management-inline-54">{m.tabsSub}</p>
            </div>

            <div className="member-management-inline-55">
              {/* Tab Nav */}
              <div className="member-management-inline-56">
                {m.featureTabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent',
              borderColor: activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'
            }} className="member-management-inline-57">
                    <div style={{
                background: activeTab === i ? '#4f46e5' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="member-management-inline-58">
                      {tabIcons[i]}
                    </div>
                    <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="member-management-inline-59">{t.label}</span>
                    <span className="member-management-inline-60">{tabSubs[i]}</span>
                  </button>)}
              </div>

              {/* Tab Content */}
              <div className="member-management-inline-61">
                <div className="member-management-inline-62">
                  <h3 className="member-management-inline-63">{m.featureTabs[activeTab].title}</h3>
                  <p className="member-management-inline-64">{m.featureTabs[activeTab].desc}</p>
                  <ul className="member-management-inline-65">
                    {m.featureTabs[activeTab].bulletPoints.map((b, i) => <li key={i} className="member-management-inline-66">
                        <CheckCircle2 size={17} color="#4ade80" className="member-management-inline-67" /> {b}
                      </li>)}
                  </ul>
                </div>
                {/* Placeholder for screenshot */}
                <div className="member-management-inline-68">
                  <Smartphone size={44} color="#334155" />
                  <span className="member-management-inline-69">
                    📷 Add screenshot here
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>}

      {/* ── SCENARIOS ── */}
      {m.scenarios && <section className="member-management-inline-70">
          <div className="member-management-inline-71">
            <div className="member-management-inline-72">
              <span className="member-management-inline-73">Real Scenarios</span>
              <h2 style={{
            letterSpacing: -1.5
          }} className="member-management-inline-74">{m.scenariosHeadline}</h2>
            </div>
            <div className="member-management-inline-75">
              {m.scenarios.map((s, i) => <div key={i} className="member-management-inline-76">
                  <div className="member-management-inline-77">
                    {getIcon(s.icon)}
                  </div>
                  <h3 className="member-management-inline-78">{s.title}</h3>
                  <p className="member-management-inline-79">{s.desc}</p>
                </div>)}
            </div>
          </div>
        </section>}

      {/* ── STEPS ── */}
      {m.steps && <section className="member-management-inline-80">
          <div className="member-management-inline-81">
            <div className="member-management-inline-82">
              <span className="member-management-inline-83">For The Owner</span>
              <h2 style={{
            letterSpacing: -1.5
          }} className="member-management-inline-84">{m.stepsHeadline}</h2>
            </div>
            <div className="member-management-inline-85">
              {m.steps.map((s, i) => <div key={i} className="member-management-inline-86">
                  <div style={{
              top: -18
            }} className="member-management-inline-87">
                    {i + 1}
                  </div>
                  <h3 className="member-management-inline-88">{s.title}</h3>
                  <p className="member-management-inline-89">{s.desc}</p>
                </div>)}
            </div>

            {/* QR Banner */}
            <div className="member-management-inline-90">
              <div>
                <div className="member-management-inline-91">
                  <QrCode size={13} /> QR Poster Generator
                </div>
                <h3 className="member-management-inline-92">Stick a poster. Watch leads roll in.</h3>
                <p className="member-management-inline-93">Generate a print-ready A4, A5 or 4x6 PDF poster with your QR code, logo and tagline. Pin it at the front desk, in changing rooms, on flyers.</p>
              </div>
              <div className="member-management-inline-94">
                <QrCode size={96} color="#4f46e5" />
              </div>
            </div>
          </div>
        </section>}

      {/* ── FAQ ── */}
      {m.faqs && <section className="member-management-inline-95">
          <div className="member-management-inline-96">
            <h2 style={{
          letterSpacing: -1.5
        }} className="member-management-inline-97">Frequently asked</h2>
            <div className="member-management-inline-98">
              {m.faqs.map((f, i) => <div key={i} className="member-management-inline-99">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="member-management-inline-100">
                    {f.q}
                    <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="member-management-inline-101" />
                  </button>
                  {openFaq === i && <div className="member-management-inline-102">
                      {f.a}
                    </div>}
                </div>)}
            </div>
          </div>
        </section>}

      {/* ── BOTTOM CTA ── */}
      <section className="member-management-inline-103">
        <div className="member-management-inline-104">
          <div className="member-management-inline-105">
            <TrendingUp size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="member-management-inline-106">Turn every quiet hour into a paying member.</h2>
          <p className="member-management-inline-107">Spin up your gym's branded self-serve page in 15 minutes. The next walk-in lead at midnight could be paid before you wake up.</p>
          <div className="member-management-inline-108">
            <button className="member-management-inline-109">
              Start Free Trial <ArrowRight size={17} className="member-management-inline-110" />
            </button>
            <button className="member-management-inline-111">
              Book a Demo
            </button>
          </div>
          <p className="member-management-inline-112">No setup fees • Cancel anytime • Built for modern gyms</p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default MemberManagement;