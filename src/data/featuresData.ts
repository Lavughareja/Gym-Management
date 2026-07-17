export interface FeatureContent {
  title: string;
  desc: string;
  longDesc?: string;
  
  // Extended Marketing Data
  marketing?: {
    headline: string;
    subHeadline: string;
    heroImage?: string;
    
    painPointsHeadline?: string;
    painPointsSub?: string;
    painPoints?: {
      title: string;
      desc: string;
      icon: string;
    }[];
    
    tabsHeadline?: string;
    tabsSub?: string;
    featureTabs?: {
      id: string;
      label: string;
      title: string;
      desc: string;
      imagePlaceholder: string;
      bulletPoints: string[];
    }[];
    
    scenariosHeadline?: string;
    scenariosSub?: string;
    scenarios?: {
      title: string;
      desc: string;
      icon: string;
    }[];
    
    stepsHeadline?: string;
    stepsSub?: string;
    steps?: {
      title: string;
      desc: string;
    }[];
    
    faqs?: {
      q: string;
      a: string;
    }[];
  };
}

export const featuresData: Record<string, FeatureContent> = {
  // Management & Staff
  'member-management': {
    title: 'Member Management',
    desc: 'Complete profiles, history & tracking',
    longDesc: 'Manage your members seamlessly from a single unified dashboard. Track attendance history, payment statuses, active subscriptions, and body progress metrics without opening multiple Excel sheets.',
    marketing: {
      headline: "Your gym sells memberships while you sleep.",
      subHeadline: "A fully-branded public page where visitors book demos, reserve trial slots and pay for memberships — without anyone at the front desk. Every lead lands in your CRM, every payment in your account.",
      heroImage: "mobile-mockup-placeholder",
      
      painPointsHeadline: "You're losing money in moments you can't see.",
      painPointsSub: "Most gyms lose 30-40% of inbound intent before it ever becomes a conversation. Here's where it leaks.",
      painPoints: [
        { title: "Leads slip away after 9 PM", desc: "Walk-ins drop you a DM at midnight. Nobody at the desk. By morning, they've booked a competitor.", icon: "clock" },
        { title: "Front desk drowning at peak hours", desc: "Your team is checking in 40 members, taking calls, and trying to close walk-ins all at once. Conversion suffers.", icon: "phone" },
        { title: "Trial bookings live in WhatsApp chaos", desc: "12 voice notes, 4 Excel sheets, 3 missed slots. No-shows keep climbing because nobody confirmed.", icon: "message" },
        { title: "No clean attribution on ad spend", desc: "You boost a Reel, leads come in, but you can't tell which ones bought. So you keep guessing.", icon: "trending" }
      ],

      tabsHeadline: "One link. Three flows. Zero friction.",
      tabsSub: "Share one URL — Instagram bio, WhatsApp status, QR poster on the wall. Visitors choose what they need.",
      featureTabs: [
        {
          id: "demo",
          label: "Demo",
          title: "Capture warm leads on autopilot",
          desc: "Visitor fills name, phone, preferred time. Lead lands in your CRM, WhatsApp confirmation goes out instantly, your team gets a notification. Zero typing.",
          imagePlaceholder: "demo-booking-flow-placeholder",
          bulletPoints: ["Smart form, India localized", "Auto WhatsApp confirmation", "Tagged source on lead"]
        },
        {
          id: "trial",
          label: "Trial",
          title: "Slot-based class & PT trials",
          desc: "Pre-set your trial slots once. We auto-generate 7 days ahead, enforce capacity caps, respect booking cutoff times. Visitor picks a slot, pays the trial fee online or books free — done.",
          imagePlaceholder: "trial-booking-flow-placeholder",
          bulletPoints: ["Capacity controlled slots", "Booking cutoff limits", "Auto confirm + reminder"]
        },
        {
          id: "signup",
          label: "Sign-Up",
          title: "Full membership purchase, online",
          desc: "Visitor picks a featured plan, applies a coupon, pays via Razorpay (UPI / cards / netbanking). Member is created, subscription activated, WhatsApp welcome fires. Or use the Reserve flow for offline payment.",
          imagePlaceholder: "membership-purchase-flow-placeholder",
          bulletPoints: ["Razorpay UPI / Cards", "Coupons stack with plans", "Welcome WhatsApp automatic"]
        }
      ],

      scenariosHeadline: "When self-serve actually pays for itself.",
      scenariosSub: "",
      scenarios: [
        { title: "Storefront for Google & WhatsApp", desc: "Your self-serve link doubles as your fitness business storefront. Drop it in your Google Business Profile, WhatsApp Business catalog, and bio links.", icon: "store" },
        { title: "Leads from Google & Meta Ads", desc: "Run Google Search or Instagram lead ads pointing straight to your self-serve page. Every form submission lands in your dashboard with full attribution.", icon: "megaphone" },
        { title: "11:47 PM lead from Instagram", desc: "Your boosted Reel hits a college student scrolling in bed. Instead of 'DM us to join', they tap your link, pay for a quarterly, and walk in next morning as a paying member.", icon: "moon" },
        { title: "Society WhatsApp group goes viral", desc: "A happy member shares your trial link in her apartment group. 7 women book a Saturday morning Zumba trial — all with capacity caps respected, all auto-confirmed.", icon: "users" },
        { title: "Receptionist on leave", desc: "Sunday, no staff at desk. 4 walk-ins through the day. All 4 scan your QR poster, pick a plan, pay. You see ₹18,000 in your dashboard Monday morning.", icon: "user-minus" },
        { title: "Diwali campaign with NEW10", desc: "You issue a 'DIWALI500' coupon for ₹500 off annual plans. Push the link to your CRM list. 25 renewals in 4 days. Every redemption tracked, attribution clear.", icon: "gift" }
      ],

      stepsHeadline: "Live in 15 minutes. Run forever.",
      stepsSub: "",
      steps: [
        { title: "Pick your gym's URL", desc: "Choose your handle. Your page goes live at a clean, shareable URL." },
        { title: "Brand it in 5 minutes", desc: "Upload logo, square logo, write a tagline. Add social links. Pick light or dark theme." },
        { title: "Choose featured plans", desc: "Mark which plans show publicly, write a marketing description for each, set trial slot templates." },
        { title: "Print the QR poster", desc: "Generate an A4, A5 or 4x6 PDF poster. Stick it at your front desk, in your changing rooms, on flyers." }
      ],

      faqs: [
        { q: "Will visitors know this is a SaaS form?", a: "No. Your gym's logo, hero image, tagline, social links and color theme dominate the page. There's no Trainix branding visible to visitors on Pro plans." },
        { q: "What if I don't have a payment gateway?", a: "You can use the 'Reserve / Pay at Gym' flow. Visitors book the plan, their lead is captured in the CRM, and they pay in cash or via your physical POS when they visit." },
        { q: "How are trial slots generated?", a: "You set a template once (e.g., 'Yoga, 7 AM, 15 slots', 'General Floor, anytime, unlimited'). The system automatically generates the rolling 7-day calendar for visitors to pick from." },
        { q: "Where do leads go?", a: "Straight into your Trainix CRM. You get a push notification on the staff app, and an automated WhatsApp confirmation is sent to the lead immediately." },
        { q: "Can I run different coupons for trials vs sign-ups?", a: "Yes. Coupons can be restricted to specific plans, trial sessions, or general memberships. You can also cap total redemptions." }
      ]
    }
  },
  'trainer-management': {
    title: 'Trainer Management',
    desc: 'Assign trainers & calculate payouts',
    longDesc: 'Organize your coaching staff effortlessly. Assign members to specific trainers, manage their schedules, calculate commission payouts automatically, and monitor trainer performance across the board.'
  },
  'pt-management': { title: 'PT Management', desc: 'Assign & track personal training' },
  'announcements': { title: 'Announcements', desc: 'Broadcast updates to members' },
  'role-permissions': { title: 'Role Permissions', desc: 'Granular access control' },
  'branch-management': { title: 'Branch Management', desc: 'Control multiple locations' },
  'mobile-friendly': { title: 'Mobile Friendly', desc: 'Manage your gym on-the-go' },

  // Operations & Tracking
  'crm-leads': { title: 'CRM & Leads', desc: 'Track inquiries & convert prospects' },
  'attendance-tracking': { title: 'Attendance Tracking', desc: 'Real-time tracking of visits' },
  'biometric-qr': { title: 'Biometric & QR', desc: 'Fingerprint, face scanners & QR' },
  'workout-library': { title: 'Workout Library', desc: 'Member exercise video tutorials' },
  'workout-timing': { title: 'Workout Timing', desc: 'Live workout logging & timing' },
  'daily-challenges': { title: 'Daily Challenges', desc: 'Goals, streaks, and XP rewards' },
  'ai-diet-generation': { title: 'AI Diet Generation', desc: 'Custom diets based on goals' },

  // Billing & Analytics
  'bmi-macro-reports': { title: 'BMI & Macro Reports', desc: 'Progress photos & calories tracking' },
  'workout-plans': { title: 'Workout Plans', desc: 'Create custom exercise routines' },
  'payment-tracking': { title: 'Payment Tracking', desc: 'Monitor dues & collect payments' },
  'invoices-billing': { title: 'Invoices & Billing', desc: 'Automated billing & invoices' },
  'expense-tracking': { title: 'Expense Tracking', desc: 'Log expenses to calculate profit' },
  'analytics-reports': { title: 'Analytics & Reports', desc: 'Deep insights into revenue' },
};
