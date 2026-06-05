import React, { useState } from 'react';
import { Check, X, ShieldCheck, HelpCircle } from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  desc: string;
  features: PlanFeature[];
  featured: boolean;
  ctaText: string;
}

export const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [purchasedPlan, setPurchasedPlan] = useState<string | null>(null);
  const [priceDetails, setPriceDetails] = useState<string>('');

  const plans: PricingPlan[] = [
    {
      name: 'Basic Strength',
      priceMonthly: 29,
      priceYearly: 23,
      desc: 'Perfect for self-starters who want premium gym floor access.',
      features: [
        { text: 'Full access to gym floor & equipment', included: true },
        { text: 'Locker rooms & hot showers', included: true },
        { text: '24/7 facility access', included: false },
        { text: 'All Group fitness classes', included: false },
        { text: 'Custom diet & workout plans', included: false },
        { text: 'Personal trainer sessions', included: false },
      ],
      featured: false,
      ctaText: 'Choose Basic Plan',
    },
    {
      name: 'Pro Athlete',
      priceMonthly: 59,
      priceYearly: 47,
      desc: 'Our most popular plan. Access classes and extra benefits.',
      features: [
        { text: 'Full access to gym floor & equipment', included: true },
        { text: 'Locker rooms & hot showers', included: true },
        { text: '24/7 facility access', included: true },
        { text: 'All Group fitness classes', included: true },
        { text: 'Custom diet & workout plans', included: false },
        { text: 'Personal trainer sessions', included: false },
      ],
      featured: true,
      ctaText: 'Get Started with Pro',
    },
    {
      name: 'VIP Elite',
      priceMonthly: 99,
      priceYearly: 79,
      desc: 'The ultimate fitness journey. Complete with dedicated coaches.',
      features: [
        { text: 'Full access to gym floor & equipment', included: true },
        { text: 'Locker rooms & hot showers', included: true },
        { text: '24/7 facility access', included: true },
        { text: 'All Group fitness classes', included: true },
        { text: 'Custom diet & workout plans', included: true },
        { text: '5x Personal Trainer sessions / mo', included: true },
      ],
      featured: false,
      ctaText: 'Go VIP Elite',
    },
    {
      name: 'Trainer Pack Plus',
      priceMonthly: 149,
      priceYearly: 119,
      desc: 'Focus entirely on individual training with dedicated hours.',
      features: [
        { text: 'Full access to gym floor & equipment', included: true },
        { text: 'Locker rooms & hot showers', included: true },
        { text: '24/7 facility access', included: true },
        { text: 'All Group fitness classes', included: true },
        { text: 'Custom diet & workout plans', included: true },
        { text: 'Unlimited Trainer sessions', included: true },
      ],
      featured: false,
      ctaText: 'Hire Trainer Pack',
    }
  ];

  const handleChoosePlan = (plan: PricingPlan) => {
    const price = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceYearly;
    const period = billingPeriod === 'monthly' ? '/mo' : '/mo (billed annually)';
    setPurchasedPlan(plan.name);
    setPriceDetails(`$${price}${period}`);
  };

  const closeOverlay = () => {
    setPurchasedPlan(null);
  };

  return (
    <div className="page-container">
      {/* Checkout Mock Modal Overlay */}
      {purchasedPlan && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="gym-card" style={{ maxWidth: '440px', width: '100%', padding: '32px', textAlign: 'center', position: 'relative' }}>
            <button 
              onClick={closeOverlay} 
              style={{ position: 'absolute', right: '16px', top: '16px', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={20} />
            </button>
            <div className="brand-icon-wrapper" style={{ width: '56px', height: '56px', margin: '0 auto 16px', borderRadius: '50%' }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>Confirm Membership</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
              You are subscribing to the <strong style={{ color: 'var(--text-primary)' }}>{purchasedPlan}</strong> package at the rate of <strong style={{ color: 'var(--primary)' }}>{priceDetails}</strong>.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button 
                className="btn-blue" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                onClick={() => {
                  alert(`Successfully registered for ${purchasedPlan}! Welcome to the iron family.`);
                  closeOverlay();
                }}
              >
                Confirm and Subscribe
              </button>
              <button 
                className="btn-blue-outline" 
                style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                onClick={closeOverlay}
              >
                Cancel Process
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header & Toggle Section */}
      <div className="pricing-header-container">
        <h2 className="page-title">Membership Tiers</h2>
        <p className="page-subtitle">Simple, transparent pricing to power your health journey. No hidden activation fees.</p>
        
        <div className="billing-toggle">
          <button 
            onClick={() => setBillingPeriod('monthly')} 
            className={`toggle-option ${billingPeriod === 'monthly' ? 'active' : ''}`}
          >
            Monthly Billing
          </button>
          <button 
            onClick={() => setBillingPeriod('yearly')} 
            className={`toggle-option ${billingPeriod === 'yearly' ? 'active' : ''}`}
          >
            Yearly Billing (20% Off)
          </button>
        </div>
      </div>

      {/* Grid of pricing cards */}
      <div className="pricing-grid">
        {plans.map((plan, index) => {
          const price = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceYearly;
          return (
            <div key={index} className={`gym-card pricing-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="pricing-badge">Popular</div>}
              
              <h3 className="plan-name">{plan.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, minHeight: '45px' }}>{plan.desc}</p>
              
              <div className="plan-price-wrapper">
                <span className="plan-price">${price}</span>
                <span className="plan-period">/month</span>
              </div>
              
              <ul className="plan-features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`plan-feature-item ${!feature.included ? 'disabled' : ''}`}>
                    {feature.included ? (
                      <Check size={16} className="check" />
                    ) : (
                      <X size={16} className="cross" />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={plan.featured ? "btn-blue" : "btn-blue-outline"} 
                style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}
                onClick={() => handleChoosePlan(plan)}
              >
                {plan.ctaText}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ Banner */}
      <div className="gym-card" style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
        <HelpCircle size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Need custom business corporate plans?</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            We provide multi-user memberships and manager dashboards for corporate offices. Contact our support for customized onboarding solutions.
          </p>
        </div>
      </div>
    </div>
  );
};
