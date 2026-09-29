import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Wallet, TrendingDown, Receipt, PieChart, Building2, ListOrdered } from 'lucide-react';
import { Navbar, Footer } from '../Home';
import "./ExpenseTracking.css";
export interface ExpenseTrackingProps {
  onBack: () => void;
}
const painPoints = [{
  icon: <Receipt size={22} color="#f43f5e" />,
  title: "Shoebox full of receipts",
  desc: "Gym owners often stuff physical receipts for equipment maintenance or cleaning supplies in a drawer, losing track of real costs."
}, {
  icon: <TrendingDown size={22} color="#f43f5e" />,
  title: "Fake profitability",
  desc: "You might see $10k in revenue, but without tracking your $6k in operating expenses, you have a false sense of how much money you actually made."
}, {
  icon: <Building2 size={22} color="#f43f5e" />,
  title: "Staff spending leaks",
  desc: "When staff buy petty cash items for the gym, it's difficult to track who spent what, when, and if it was approved."
}];
const tabs = [{
  label: "Easy Logging",
  sub: "Log in seconds",
  title: "Record expenses on the go.",
  desc: "Whether you just paid the electricity bill or bought new resistance bands, log it instantly from your phone or desktop. Categorize it to keep your ledger organized.",
  bullets: ["Mobile-friendly logging", "Custom expense categories", "Attach photo receipts"]
}, {
  label: "Profit Dashboard",
  sub: "Revenue vs Expenses",
  title: "Know your true bottom line.",
  desc: "Trainix automatically subtracts your logged expenses from your membership revenue, giving you a real-time view of your actual net profit for the day, week, or month.",
  bullets: ["Real-time P&L calculation", "Visual breakdown charts", "Compare month-over-month"]
}, {
  label: "Staff Approvals",
  sub: "Petty cash control",
  title: "Track what your team spends.",
  desc: "Allow managers to log expenses, but require owner approval for amounts over a certain limit. Keep a clear audit trail of who bought what.",
  bullets: ["Role-based access", "Audit logs", "Approval workflows"]
}];
const scenarios = [{
  icon: <Receipt size={22} color="#fb7185" />,
  title: "The Broken Cable",
  desc: "A machine breaks and a technician charges $150 to fix it. You snap a photo of the invoice, log it under 'Maintenance', and toss the paper."
}, {
  icon: <PieChart size={22} color="#f43f5e" />,
  title: "End of Month Review",
  desc: "You look at your pie chart and realize you spent 30% of your expenses on marketing this month but only 5% on maintenance. You adjust next month's budget."
}, {
  icon: <ListOrdered size={22} color="#e11d48" />,
  title: "Recurring Utilities",
  desc: "Your rent and electricity are due. You quickly duplicate last month's expense entry, update the amount slightly, and hit save."
}];
const faqs = [{
  q: "Can I create my own expense categories?",
  a: "Yes, you can fully customize the categories (e.g., Rent, Utilities, Equipment, Marketing, Salaries) to match how you run your business."
}, {
  q: "Does it calculate staff salaries automatically?",
  a: "If you use the Trainer Management module, trainer payouts can automatically be routed into your expenses ledger."
}, {
  q: "Can I export this data for my accountant?",
  a: "Absolutely. You can export a CSV of all expenses within any date range, categorized perfectly for tax purposes."
}, {
  q: "Is there a limit on how many receipts I can upload?",
  a: "No, there are no storage limits. You can attach a photo or PDF to every single expense you log."
}];
export const ExpenseTracking: React.FC<ExpenseTrackingProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabIcons = [<Receipt size={20} />, <PieChart size={20} />, <ListOrdered size={20} />];
  return <div className="expense-tracking-inline-1">
      <Navbar onLogin={() => {}} />

      {/* ══ HERO — Rose gradient ══ */}
      <section className="expense-tracking-inline-2">
        <div className="expense-tracking-inline-3" />
        <div className="expense-tracking-inline-4" />

        <div className="expense-tracking-inline-5">
          <div className="expense-tracking-inline-6">

            {/* Left */}
            <div>
              <div className="expense-tracking-inline-7">
                <span className="expense-tracking-inline-8" />
                Expense Tracking
              </div>

              <h1 style={{
              letterSpacing: -2
            }} className="expense-tracking-inline-9">
                Track every{' '}
                <span className="expense-tracking-inline-10">
                  penny.
                </span>
              </h1>

              <p className="expense-tracking-inline-11">
                Know your true profitability by logging and categorizing every gym expense in one central place.
              </p>

              <div className="expense-tracking-inline-12">
                <button className="expense-tracking-inline-13">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="expense-tracking-inline-14">
                  View Sample P&L
                </button>
              </div>

              <div className="expense-tracking-inline-15">
                {['Receipt uploads', 'Real-time Profit', 'Custom categories'].map(t => <span key={t} className="expense-tracking-inline-16">
                    <CheckCircle2 size={14} color="#fb7185" /> {t}
                  </span>)}
              </div>
            </div>

            {/* Right — App Mockup */}
            <div className="expense-tracking-inline-17">
              <div className="expense-tracking-inline-18">
                <div className="expense-tracking-inline-19"></div>
                
                <div className="expense-tracking-inline-20">
                  {/* Header */}
                  <div className="expense-tracking-inline-21">
                    <div className="expense-tracking-inline-22">October Overview</div>
                    <div className="expense-tracking-inline-23">Net Profit: $4,250.00</div>
                  </div>

                  {/* Content Area */}
                  <div className="expense-tracking-inline-24">
                    
                    {/* Summary Chart */}
                    <div className="expense-tracking-inline-25">
                      <div className="expense-tracking-inline-26">
                        <div className="expense-tracking-inline-27">$6.2k</div>
                      </div>
                      <div className="expense-tracking-inline-28">
                        <div className="expense-tracking-inline-29">Total Expenses</div>
                        <div className="expense-tracking-inline-30">
                          <span className="expense-tracking-inline-31"></span>
                          <span className="expense-tracking-inline-32">Rent (45%)</span>
                        </div>
                        <div className="expense-tracking-inline-33">
                          <span className="expense-tracking-inline-34"></span>
                          <span className="expense-tracking-inline-35">Equip. (30%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="expense-tracking-inline-36">Recent Logged</div>
                    
                    {/* Expense Item 1 */}
                    <div className="expense-tracking-inline-37">
                      <div className="expense-tracking-inline-38">
                        <div className="expense-tracking-inline-39">
                          <Building2 size={18} color="#e11d48" />
                        </div>
                        <div>
                          <div className="expense-tracking-inline-40">Monthly Rent</div>
                          <div className="expense-tracking-inline-41">Oct 1st</div>
                        </div>
                      </div>
                      <div className="expense-tracking-inline-42">$2,500.00</div>
                    </div>

                    {/* Expense Item 2 */}
                    <div className="expense-tracking-inline-43">
                      <div className="expense-tracking-inline-44">
                        <div className="expense-tracking-inline-45">
                          <TrendingDown size={18} color="#ca8a04" />
                        </div>
                        <div>
                          <div className="expense-tracking-inline-46">New Dumbbells</div>
                          <div className="expense-tracking-inline-47">Sep 28th</div>
                        </div>
                      </div>
                      <div className="expense-tracking-inline-48">$850.00</div>
                    </div>

                    {/* Expense Item 3 */}
                    <div className="expense-tracking-inline-49">
                      <div className="expense-tracking-inline-50">
                        <div className="expense-tracking-inline-51">
                          <Receipt size={18} color="#4f46e5" />
                        </div>
                        <div>
                          <div className="expense-tracking-inline-52">Cleaning Supplies</div>
                          <div className="expense-tracking-inline-53">Sep 25th</div>
                        </div>
                      </div>
                      <div className="expense-tracking-inline-54">$125.50</div>
                    </div>

                  </div>

                  <div className="expense-tracking-inline-55">
                    <button className="expense-tracking-inline-56">+ Add Expense</button>
                  </div>
                </div>
              </div>
              <div style={{
              zIndex: -1
            }} className="expense-tracking-inline-57" />
              <div style={{
              zIndex: -1
            }} className="expense-tracking-inline-58" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAT ROW ══ */}
      <div className="expense-tracking-inline-59">
        <div className="expense-tracking-inline-60">
          {[{
          val: 'Real-time',
          label: 'Profit Calculations'
        }, {
          val: 'Unlimited',
          label: 'Receipt Uploads'
        }, {
          val: '100%',
          label: 'Tax Deductible Tracking'
        }, {
          val: 'Visual',
          label: 'Spending Charts'
        }].map((s, i) => <div key={i} style={{
          borderRight: i < 3 ? '1px solid #f1f5f9' : 'none'
        }} className="expense-tracking-inline-61">
              <div style={{
            letterSpacing: -1
          }} className="expense-tracking-inline-62">{s.val}</div>
              <div className="expense-tracking-inline-63">{s.label}</div>
            </div>)}
        </div>
      </div>

      {/* ══ PAIN POINTS ══ */}
      <section className="expense-tracking-inline-64">
        <div className="expense-tracking-inline-65">
          <div className="expense-tracking-inline-66">
            <span className="expense-tracking-inline-67">The Problem</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="expense-tracking-inline-68">Revenue isn't profit.</h2>
            <p className="expense-tracking-inline-69">Tracking how much money comes in is easy, but if you aren't tracking what goes out, you have no idea if your gym is actually making money.</p>
          </div>
          <div className="expense-tracking-inline-70">
            {painPoints.map((p, i) => <div key={i} className="expense-tracking-inline-71">
                <div className="expense-tracking-inline-72">{p.icon}</div>
                <h3 className="expense-tracking-inline-73">{p.title}</h3>
                <p className="expense-tracking-inline-74">{p.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <section className="expense-tracking-inline-75">
        <div className="expense-tracking-inline-76">
          <div className="expense-tracking-inline-77">
            <span className="expense-tracking-inline-78">How It Works</span>
            <h2 style={{
            letterSpacing: -1.5
          }} className="expense-tracking-inline-79">A crystal clear ledger.</h2>
          </div>

          <div className="expense-tracking-inline-80">
            <div className="expense-tracking-inline-81">
              {tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} style={{
              border: `1px solid ${activeTab === i ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
              background: activeTab === i ? 'rgba(255,255,255,0.08)' : 'transparent'
            }} className="expense-tracking-inline-82">
                  <div style={{
                background: activeTab === i ? '#e11d48' : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? '#fff' : '#64748b'
              }} className="expense-tracking-inline-83">{tabIcons[i]}</div>
                  <span style={{
                color: activeTab === i ? '#fff' : '#475569'
              }} className="expense-tracking-inline-84">{t.label}</span>
                  <span className="expense-tracking-inline-85">{t.sub}</span>
                </button>)}
            </div>
            <div className="expense-tracking-inline-86">
              <div className="expense-tracking-inline-87">
                <h3 className="expense-tracking-inline-88">{tabs[activeTab].title}</h3>
                <p className="expense-tracking-inline-89">{tabs[activeTab].desc}</p>
                <ul className="expense-tracking-inline-90">
                  {tabs[activeTab].bullets.map((b, i) => <li key={i} className="expense-tracking-inline-91">
                      <CheckCircle2 size={17} color="#fb7185" className="expense-tracking-inline-92" /> {b}
                    </li>)}
                </ul>
              </div>
              <div className="expense-tracking-inline-93">
                {activeTab === 0 ? <Receipt size={40} color="#334155" /> : activeTab === 1 ? <PieChart size={40} color="#334155" /> : <ListOrdered size={40} color="#334155" />}
                <span className="expense-tracking-inline-94">
                  {activeTab === 0 ? 'Logging UI' : activeTab === 1 ? 'Charts & Data' : 'Approval Board'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="expense-tracking-inline-95">
        <div className="expense-tracking-inline-96">
          <h2 style={{
          letterSpacing: -1.5
        }} className="expense-tracking-inline-97">Frequently asked</h2>
          <div className="expense-tracking-inline-98">
            {faqs.map((f, i) => <div key={i} className="expense-tracking-inline-99">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="expense-tracking-inline-100">
                  {f.q}
                  <ChevronDown size={20} color="#94a3b8" style={{
                transform: openFaq === i ? 'rotate(180deg)' : 'none'
              }} className="expense-tracking-inline-101" />
                </button>
                {openFaq === i && <div className="expense-tracking-inline-102">{f.a}</div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="expense-tracking-inline-103">
        <div className="expense-tracking-inline-104">
          <div className="expense-tracking-inline-105">
            <Wallet size={30} color="#fff" />
          </div>
          <h2 style={{
          letterSpacing: -1.5
        }} className="expense-tracking-inline-106">Master your margins.</h2>
          <p className="expense-tracking-inline-107">Stop guessing your profit. Track every expense easily and keep your gym financially healthy.</p>
          <div className="expense-tracking-inline-108">
            <button className="expense-tracking-inline-109">
              Start Free Trial <ArrowRight size={17} className="expense-tracking-inline-110" />
            </button>
            <button className="expense-tracking-inline-111">Talk to Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default ExpenseTracking;