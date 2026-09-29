import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, FileText, Send, Printer, Download, FileDigit, Smartphone } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./InvoicesBilling.css";
export interface InvoicesBillingProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <FileDigit size={22} color="#06b6d4" />,
  title: "Messy receipt books",
  desc: "Writing paper receipts is slow, error-prone, and looks unprofessional to high-paying members."
}, {
  icon: <Send size={22} color="#06b6d4" />,
  title: "Tax compliance nightmares",
  desc: "Come tax season, compiling all the scattered payments and calculating GST/VAT is a massive headache."
}, {
  icon: <Printer size={22} color="#06b6d4" />,
  title: "Lost historical records",
  desc: "When a member asks for their payment history from 6 months ago, finding it in the old filing cabinet takes forever."
}];
const tabs = [{
  label: "Auto-Invoicing",
  sub: "Generated instantly",
  title: "Professional invoices, zero effort.",
  desc: "Every time a member makes a payment (online or offline), Trainix instantly generates a beautiful, branded PDF invoice complete with your gym's logo and tax details.",
  bullets: ["Auto-emailed to members", "Branded PDF generation", "Tax-compliant formatting"]
}, {
  label: "Digital Records",
  sub: "Searchable history",
  title: "Never lose a transaction.",
  desc: "Every invoice is securely stored in the cloud. You can search by member name, date, or invoice number, and resend it with a single click.",
  bullets: ["Unlimited cloud storage", "Advanced search & filters", "One-click resend"]
}, {
  label: "Tax Ready",
  sub: "Export for accountants",
  title: "Make your accountant happy.",
  desc: "Generate comprehensive billing reports for any date range. Export detailed CSVs that break down base prices, taxes collected, and discounts applied.",
  bullets: ["Detailed tax breakdowns", "CSV/Excel exports", "Custom date ranges"]
}];
const scenarios = [{
  icon: <FileText size={22} color="#0891b2" />,
  title: "Corporate Reimbursements",
  desc: "A member needs a formal invoice to get their gym membership reimbursed by their company. They log into their app, download the PDF instantly, and submit it."
}, {
  icon: <Download size={22} color="#06b6d4" />,
  title: "End of Month Accounting",
  desc: "On the 1st of the month, you click 'Export', select last month's date range, and email the perfectly formatted CSV to your accountant in 30 seconds."
}, {
  icon: <Smartphone size={22} color="#22d3ee" />,
  title: "The WhatsApp Receipt",
  desc: "A member hands you cash at the front desk. You log it on your tablet, and their phone buzzes immediately with a WhatsApp message containing a link to their digital receipt."
}];
const faqs = [{
  q: "Can I customize the invoice with my own logo?",
  a: "Yes, you can upload your gym's logo, set your brand color, and add custom footer notes (like terms and conditions) to every invoice."
}, {
  q: "Does it support multiple tax rates?",
  a: "Yes. You can configure multiple tax rates (e.g., State Tax, Federal Tax) and apply them dynamically based on the plan sold."
}, {
  q: "Can I generate invoices for physical products?",
  a: "Absolutely. If you sell supplements, apparel, or water bottles, you can generate Point-of-Sale (POS) invoices for those items as well."
}, {
  q: "Can members view their own invoice history?",
  a: "Yes, members have a 'Billing' tab in their app where they can view and download all their past invoices at any time."
}];
export const InvoicesBilling: React.FC<InvoicesBillingProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<FileText size={20} />, <Download size={20} />, <Printer size={20} />];
  return <div className="invoices-billing-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Cyan gradient ══ */}
      <section className="invoices-billing-inline-2">
        <div className="invoices-billing-inline-3" />
        <div className="invoices-billing-inline-4" />

        <div className="invoices-billing-inline-5">
          <div className="invoices-billing-inline-6">

            {/* Left */}
            <div>
              <div className="invoices-billing-inline-7">
                <span className="invoices-billing-inline-8" />
                Invoices & Billing
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="invoices-billing-inline-9">
                Professional billing.{' '}
                <span className="invoices-billing-inline-10">
                  Zero friction.
                </span>
              </h1>

              <p className="invoices-billing-inline-11">
                Generate stunning, tax-compliant PDF invoices instantly. Deliver them via email or WhatsApp and keep your accountants happy.
              </p>

              <div className="invoices-billing-inline-12">
                <button className="invoices-billing-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="invoices-billing-inline-14">
                  View Sample Invoice
                </button>
              </div>

              <div className="invoices-billing-inline-15">
                {['Branded PDFs', 'Tax Reports', 'WhatsApp delivery'].map(t => <span key={t} className="invoices-billing-inline-16">
                    <CheckCircle2 size={14} color="#22d3ee" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — App Mockup for Invoice */}
            <div className="invoices-billing-inline-17">
              <div className="invoices-billing-inline-18">
                
                {/* Invoice Mockup */}
                <div className="invoices-billing-inline-19">
                  <div>
                    <div className="invoices-billing-inline-20">
                      <FileText size={20} color="#fff" />
                    </div>
                    <div className="invoices-billing-inline-21">IRON GYM</div>
                    <div className="invoices-billing-inline-22">123 Fitness Street</div>
                  </div>
                  <div className="invoices-billing-inline-23">
                    <div style={{
                    letterSpacing: -1
                  }} className="invoices-billing-inline-24">INVOICE</div>
                    <div className="invoices-billing-inline-25">#INV-2024-089</div>
                    <div className="invoices-billing-inline-26">Oct 15, 2024</div>
                  </div>
                </div>

                <div className="invoices-billing-inline-27">
                  <div className="invoices-billing-inline-28">Billed To:</div>
                  <div className="invoices-billing-inline-29">Alex Johnson</div>
                  <div className="invoices-billing-inline-30">alex.johnson@email.com</div>
                </div>

                <div className="invoices-billing-inline-31">
                  <div className="invoices-billing-inline-32">
                    <span>Description</span>
                    <span>Amount</span>
                  </div>
                  <div className="invoices-billing-inline-33">
                    <span>Annual Membership (Gold)</span>
                    <span className="invoices-billing-inline-34">$500.00</span>
                  </div>
                  <div className="invoices-billing-inline-35">
                    <span>Locker Rental</span>
                    <span className="invoices-billing-inline-36">$50.00</span>
                  </div>
                </div>

                <div className="invoices-billing-inline-37">
                  <div className="invoices-billing-inline-38">
                    <div className="invoices-billing-inline-39">
                      <span>Subtotal</span>
                      <span>$550.00</span>
                    </div>
                    <div className="invoices-billing-inline-40">
                      <span>Tax (10%)</span>
                      <span>$55.00</span>
                    </div>
                    <div className="invoices-billing-inline-41">
                      <span>Total</span>
                      <span>$605.00</span>
                    </div>
                  </div>
                </div>

                <div className="invoices-billing-inline-42">
                  <button className="invoices-billing-inline-43">
                    <Download size={16} /> Download
                  </button>
                  <button className="invoices-billing-inline-44">
                    <Send size={16} /> Send via WA
                  </button>
                </div>

              </div>
              <div style={{
              zIndex: -1,
              right: -20
            }} className="invoices-billing-inline-45" />
              <div style={{
              zIndex: -1,
              left: -20,
              bottom: -20
            }} className="invoices-billing-inline-46" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="invoices-billing-inline-47">
        <div className="invoices-billing-inline-48">
          {[{
          val: 'Instantly',
          label: 'PDF Generation'
        }, {
          val: 'Unlimited',
          label: 'Cloud Storage'
        }, {
          val: 'Tax Ready',
          label: 'Accounting Exports'
        }, {
          val: 'Branded',
          label: 'Professional Look'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="invoices-billing-inline-49">
              <div style={{
            letterSpacing: -1
          }} className="invoices-billing-inline-50">{s.val}</div>
              <div className="invoices-billing-inline-51">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="invoices-billing-inline-52">
        <div className="invoices-billing-inline-53">
          <div className="invoices-billing-inline-54">
            <span className="invoices-billing-inline-55">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="invoices-billing-inline-56">Paper receipts look amateur.</h2>
            <p className="invoices-billing-inline-57">Handwriting receipts on a notepad doesn't match the premium experience your gym provides. Plus, manually compiling them for tax season is a nightmare.</p>
          </div>
          <div className="invoices-billing-inline-58">
            {painPoints.map((p, i) => <div key={i} className="invoices-billing-inline-59">
                <div className="invoices-billing-inline-60">{p.icon}</div>
                <h3 className="invoices-billing-inline-61">{p.title}</h3>
                <p className="invoices-billing-inline-62">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="invoices-billing-inline-63">
        <div className="invoices-billing-inline-64">
          <div className="invoices-billing-inline-65">
            <span className="invoices-billing-inline-66">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="invoices-billing-inline-67">Automated invoicing flow.</h2>
          </div>

          <div className="invoices-billing-inline-68">
            <div className="invoices-billing-inline-69">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="invoices-billing-inline-70">
                  <div style={{
                background: activeTab === i ? '#0891b2' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="invoices-billing-inline-71">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="invoices-billing-inline-72">{t.label}</span>
                  <span className="invoices-billing-inline-73">{t.sub}</span>
                </button>)}
            </div>
            <div className="invoices-billing-inline-74">
              <div className="invoices-billing-inline-75">
                <h3 className="invoices-billing-inline-76">{tabs[activeTab].title}</h3>
                <p className="invoices-billing-inline-77">{tabs[activeTab].desc}</p>
                <ul className="invoices-billing-inline-78">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="invoices-billing-inline-79">
                      <CheckCircle2 size={17} color="#22d3ee" className="invoices-billing-inline-80" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="invoices-billing-inline-81">
                {activeTab === 0 ? <FileText size={40} color="#334155" /> : activeTab === 1 ? <Download size={40} color="#334155" /> : <Printer size={40} color="#334155" />}
                <span className="invoices-billing-inline-82">
                  {activeTab === 0 ? 'PDF Generation' : activeTab === 1 ? 'Cloud Storage' : 'Tax Exports'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="invoices-billing-inline-83">
        <div className="invoices-billing-inline-84">
          <h2 style={{
          letterSpacing: -1.5
        }} className="invoices-billing-inline-85">Frequently asked</h2>
          <div className="invoices-billing-inline-86">
            {faqs.map((f, i) => <div key={i} className="invoices-billing-inline-87">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="invoices-billing-inline-88">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="invoices-billing-inline-89" />
                </button>
                {openFaq === i && <div className="invoices-billing-inline-90">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="invoices-billing-inline-91">
        <div className="invoices-billing-inline-92">
          <div className="invoices-billing-inline-93">
            <FileText size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="invoices-billing-inline-94">Upgrade your billing.</h2>
          <p className="invoices-billing-inline-95">Impress your members with professional invoices and streamline your accounting process.</p>
          <div className="invoices-billing-inline-96">
            <button className="invoices-billing-inline-97">
              Start Free Trial <ArrowRight size={17} className="invoices-billing-inline-98" />
            </button>
            <button className="invoices-billing-inline-99">Talk to Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default InvoicesBilling;