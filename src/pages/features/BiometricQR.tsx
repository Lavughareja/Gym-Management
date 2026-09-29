import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Fingerprint, ScanFace, QrCode, ShieldCheck, UserX, Clock, Database, Smartphone, Shield } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./BiometricQR.css";
export interface BiometricQRProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <UserX size={22} color="#f87171" />,
  title: "Unauthorized access & tailgating",
  desc: "Ex-members or friends using active members' RFID cards to sneak into the gym, costing you hundreds of dollars in lost revenue every month."
}, {
  icon: <Clock size={22} color="#f87171" />,
  title: "Bottlenecks during peak hours",
  desc: "Staff manually checking every member's subscription status at the desk while a line builds up outside the door."
}, {
  icon: <Database size={22} color="#f87171" />,
  title: "Software and hardware don't talk",
  desc: "Your biometric machine records the punch, but you have to manually download the Excel logs and match them with your gym management software."
}, {
  icon: <QrCode size={22} color="#f87171" />,
  title: "The 'I forgot my card' excuse",
  desc: "Members constantly forgetting or losing their physical access cards, forcing your staff to manually override the turnstile 20 times a day."
}];
const tabs = [{
  label: "QR Code Entry",
  sub: "Zero hardware cost",
  title: "Dynamic QR codes on the Member App.",
  desc: "Members simply open their Trainix app, scan the dynamic QR code at the reception tablet or turnstile, and walk right in. The code refreshes every 10 seconds to prevent screenshot sharing.",
  bullets: ["No physical cards required", "Anti-screenshot protection", "Real-time subscription check"]
}, {
  label: "Face Recognition",
  sub: "Frictionless access",
  title: "Walk in without slowing down.",
  desc: "Integrate with top-tier face recognition terminals. The camera scans the member's face, verifies their active status in Trainix, and opens the door in under 0.3 seconds.",
  bullets: ["Zero touch entry", "Eliminates buddy-punching", "Fastest check-in method"]
}, {
  label: "Fingerprint Biometrics",
  sub: "Reliable & standard",
  title: "Direct cloud sync with eSSL & Matrix.",
  desc: "We integrate directly with standard biometric devices via cloud push. Enroll a fingerprint once, and it syncs across all your gym branches automatically.",
  bullets: ["Direct cloud API sync", "Multi-branch synchronization", "Fall-back local storage"]
}];
const scenarios = [{
  icon: <ScanFace size={22} color="#3b82f6" />,
  title: "The 6 PM Rush Hour",
  desc: "50 members walk in within 15 minutes. Face scanners process them instantly, opening the turnstiles without a single manual check by your staff."
}, {
  icon: <ShieldCheck size={22} color="#10b981" />,
  title: "Subscription Expired",
  desc: "A member tries to scan their fingerprint, but their plan expired yesterday. The turnstile stays locked, and a red light gently reminds them to renew at the desk."
}, {
  icon: <Smartphone size={22} color="#d946ef" />,
  title: "Lost RFID Card",
  desc: "Member lost their card? No need to charge them for a new one. They just use the Trainix mobile app QR scanner to get in."
}];
const faqs = [{
  q: "Which biometric machines do you support?",
  a: "We support a wide range of cloud-enabled devices from brands like eSSL, Matrix, ZKTeco, and Hikvision. If your device supports cloud push APIs, we can integrate it."
}, {
  q: "Can I use QR codes without a physical turnstile?",
  a: "Yes! You can simply place an iPad or Android tablet at the reception desk showing the 'QR Scanner Mode'. Members scan their phones against the tablet camera to check in."
}, {
  q: "What happens if the internet goes down?",
  a: "Our supported biometric devices have local memory. They will continue to allow active members in based on the last sync, and push the attendance logs to Trainix once the internet is restored."
}, {
  q: "Do QR codes prevent screenshot sharing?",
  a: "Yes. The QR code in the Trainix Member App is dynamic and refreshes every few seconds. A screenshot sent to a friend will be invalid by the time they try to use it."
}];
export const BiometricQR: React.FC<BiometricQRProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<QrCode size={20} />, <ScanFace size={20} />, <Fingerprint size={20} />];
  return <div className="biometric-qr-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Blue / Cyan gradient ══ */}
      <section className="biometric-qr-inline-2">
        <div className="biometric-qr-inline-3" />
        <div className="biometric-qr-inline-4" />

        <div className="biometric-qr-inline-5">
          <div className="biometric-qr-inline-6">

            {/* Left */}
            <div>
              <div className="biometric-qr-inline-7">
                <span className="biometric-qr-inline-8" />
                Biometric & QR Access
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="biometric-qr-inline-9">
                Bulletproof access.{' '}
                <span className="biometric-qr-inline-10">
                  Zero friction.
                </span>
              </h1>

              <p className="biometric-qr-inline-11">
                Stop revenue leaks from buddy-punching and unauthorized access. Integrate seamless face scanners, fingerprint biometrics, and dynamic mobile QR codes.
              </p>

              <div className="biometric-qr-inline-12">
                <button className="biometric-qr-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="biometric-qr-inline-14">
                  View Compatible Devices
                </button>
              </div>

              <div className="biometric-qr-inline-15">
                {['Direct cloud integration', 'Anti-screenshot QR codes', 'Turnstile ready'].map(t => <span key={t} className="biometric-qr-inline-16">
                    <CheckCircle2 size={14} color="#38bdf8" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — Access Device Mockup */}
            <div className="biometric-qr-inline-17">
              <div className="biometric-qr-inline-18">
                
                <div className="biometric-qr-inline-19">
                  <div className="biometric-qr-inline-20">
                     <div className="biometric-qr-inline-21" />
                     <ScanFace size={64} color="#38bdf8" />
                  </div>
                  
                  <div className="biometric-qr-inline-22">Scanning...</div>
                  <div className="biometric-qr-inline-23">Please look at the camera</div>
                  
                  {/* Success Overlay Simulation */}
                  <div className="biometric-qr-inline-24">
                    <div className="biometric-qr-inline-25">
                      <CheckCircle2 size={20} color="#fff" />
                    </div>
                    <div>
                      <div className="biometric-qr-inline-26">Access Granted</div>
                      <div className="biometric-qr-inline-27">Pro Membership Active</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="biometric-qr-inline-28" />
              <div style={{
              zIndex: -1,
              left: -20
            }} className="biometric-qr-inline-29" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="biometric-qr-inline-30">
        <div className="biometric-qr-inline-31">
          {[{
          val: '< 0.3s',
          label: 'Face scan speed'
        }, {
          val: '100%',
          label: 'Cloud synced'
        }, {
          val: 'Zero',
          label: 'Manual check-ins'
        }, {
          val: '24/7',
          label: 'Unsupervised access'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="biometric-qr-inline-32">
              <div style={{
            letterSpacing: -1
          }} className="biometric-qr-inline-33">{s.val}</div>
              <div className="biometric-qr-inline-34">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="biometric-qr-inline-35">
        <div className="biometric-qr-inline-36">
          <div className="biometric-qr-inline-37">
            <span className="biometric-qr-inline-38">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="biometric-qr-inline-39">Turnstiles aren't enough.</h2>
            <p className="biometric-qr-inline-40">If your access control hardware doesn't talk instantly to your billing software, you're either letting unpaid members in, or creating a bottleneck at the desk.</p>
          </div>
          <div className="biometric-qr-inline-41">
            {painPoints.map((p, i) => <div key={i} className="biometric-qr-inline-42">
                <div className="biometric-qr-inline-43">{p.icon}</div>
                <h3 className="biometric-qr-inline-44">{p.title}</h3>
                <p className="biometric-qr-inline-45">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="biometric-qr-inline-46">
        <div className="biometric-qr-inline-47">
          <div className="biometric-qr-inline-48">
            <span className="biometric-qr-inline-49">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="biometric-qr-inline-50">Multiple ways to verify.</h2>
          </div>

          <div className="biometric-qr-inline-51">
            <div className="biometric-qr-inline-52">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="biometric-qr-inline-53">
                  <div style={{
                background: activeTab === i ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="biometric-qr-inline-54">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="biometric-qr-inline-55">{t.label}</span>
                  <span className="biometric-qr-inline-56">{t.sub}</span>
                </button>)}
            </div>
            <div className="biometric-qr-inline-57">
              <div className="biometric-qr-inline-58">
                <h3 className="biometric-qr-inline-59">{tabs[activeTab].title}</h3>
                <p className="biometric-qr-inline-60">{tabs[activeTab].desc}</p>
                <ul className="biometric-qr-inline-61">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="biometric-qr-inline-62">
                      <CheckCircle2 size={17} color="#7dd3fc" className="biometric-qr-inline-63" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="biometric-qr-inline-64">
                <Shield size={40} color="#334155" />
                <span className="biometric-qr-inline-65">📷 Add scanner image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCENARIOS ══ */}
      <section className="biometric-qr-inline-66">
        <div className="biometric-qr-inline-67">
          <div className="biometric-qr-inline-68">
            <span className="biometric-qr-inline-69">Real Scenarios</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="biometric-qr-inline-70">Access control in action.</h2>
          </div>
          <div className="biometric-qr-inline-71">
            {scenarios.map((s, i) => <div key={i} className="biometric-qr-inline-72">
                <div className="biometric-qr-inline-73">{s.icon}</div>
                <h3 className="biometric-qr-inline-74">{s.title}</h3>
                <p className="biometric-qr-inline-75">{s.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="biometric-qr-inline-76">
        <div className="biometric-qr-inline-77">
          <h2 style={{
          letterSpacing: -1.5
        }} className="biometric-qr-inline-78">Frequently asked</h2>
          <div className="biometric-qr-inline-79">
            {faqs.map((f, i) => <div key={i} className="biometric-qr-inline-80">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="biometric-qr-inline-81">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="biometric-qr-inline-82" />
                </button>
                {openFaq === i && <div className="biometric-qr-inline-83">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="biometric-qr-inline-84">
        <div className="biometric-qr-inline-85">
          <div className="biometric-qr-inline-86">
            <ScanFace size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="biometric-qr-inline-87">Stop revenue leakage at the door.</h2>
          <p className="biometric-qr-inline-88">Upgrade your access control with Trainix and ensure only paying members step onto the gym floor.</p>
          <div className="biometric-qr-inline-89">
            <button className="biometric-qr-inline-90">
              Start Free Trial <ArrowRight size={17} className="biometric-qr-inline-91" />
            </button>
            <button className="biometric-qr-inline-92">Talk to Sales</button>
          </div>
          <p className="biometric-qr-inline-93">Compatible with eSSL, Matrix, and generic QR tablets</p>
        </div>
      </section>

      <Footer />
    </div>;
};
export default BiometricQR;