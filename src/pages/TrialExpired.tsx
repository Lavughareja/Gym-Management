import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../axios/axiosInstance';
import { AUTH_TOKEN_KEY } from '../utils/constant';
import './TrialExpired.css';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDisplay: string;
  features: string[];
  popular: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small gyms just getting started.',
    price: 1999,
    priceDisplay: '1,999',
    features: ['Up to 100 Members', 'Basic Reports', 'Email Support', '1 Branch', '1 Admin'],
    popular: false,
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'Perfect for growing fitness centers.',
    price: 2999,
    priceDisplay: '2,999',
    features: ['Up to 500 Members', 'Advanced Analytics', 'Priority Support', '2 Branches', '5 Staff Members'],
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Everything you need to scale rapidly.',
    price: 4999,
    priceDisplay: '4,999',
    features: ['Unlimited Members', 'Biometric Integration', 'WhatsApp Automation', '5 Branches', 'Unlimited Staff'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large franchises and networks.',
    price: 9999,
    priceDisplay: '9,999',
    features: ['Unlimited Everything', 'Custom Development', 'Dedicated Account Manager', 'White-label App', 'API Access'],
    popular: false,
  },
];

const TrialExpired: React.FC = () => {
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpgrade = async (plan: Plan) => {
    setError('');
    setSuccess('');

    if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
      navigate('/login');
      return;
    }

    setLoadingPlan(plan.id);
    try {
      // Step 1: Create upgrade order
      const res = await AxiosInstance.post('/payment/upgrade-order', { plan: plan.id });
      const { order } = res.data;

      // Step 2: Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || 'INR',
        order_id: order.orderId,
        name: 'Gym Management',
        description: `${plan.name} Plan - Monthly`,
        prefill: { email: order.email || '' },
        handler: async (response: any) => {
          // Step 3: Verify payment
          try {
            await AxiosInstance.post('/payment/verify-upgrade', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            // Refresh user data from server
            try {
              const profileRes = await AxiosInstance.get('/auth/me');
              const updatedUser = profileRes.data?.user || profileRes.data;
              if (updatedUser) {
                const stored = localStorage.getItem('dashUser');
                const parsed = stored ? JSON.parse(stored) : {};
                localStorage.setItem('dashUser', JSON.stringify({ ...parsed, ...updatedUser }));
              }
            } catch {
              // non-fatal, profile refresh failed
            }

            setSuccess('Plan upgraded successfully! Redirecting to dashboard...');
            setTimeout(() => navigate('/dashboard/overview'), 2000);
          } catch (err: any) {
            setError(err?.response?.data?.message || 'Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: () => setLoadingPlan(null),
        },
        theme: { color: '#1e3a5f' },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', () => {
        setError('Payment failed. Please try again.');
        setLoadingPlan(null);
      });
      rzp.open();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to initiate payment. Please try again.');
      setLoadingPlan(null);
    }
  };

  return (
    <div className="te-page">
      {/* Alert Banner */}
      <div className="te-alert">
        <AlertCircle size={22} className="te-alert-icon" />
        <div className="te-alert-text">
          <p className="te-alert-title">Your 15-day free trial has expired</p>
          <p className="te-alert-desc">
            Please choose a plan below to continue using the platform without interruption.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="te-header">
        <h1>Upgrade Your Plan</h1>
        <p>
          Select the plan that fits your gym. All plans include a 30-day money-back guarantee.
          Payment is processed securely via Razorpay.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="te-plans-grid">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`te-plan-card${plan.popular ? ' te-plan-popular' : ''}`}
          >
            {plan.popular && <div className="te-popular-badge">Most Popular</div>}

            <p className="te-plan-name">{plan.name}</p>
            <p className="te-plan-desc">{plan.description}</p>

            <div className="te-plan-price">
              <span className="te-plan-currency">Rs.</span>
              <span className="te-plan-amount">{plan.priceDisplay}</span>
              <span className="te-plan-period">/ month</span>
            </div>

            <hr className="te-plan-divider" />

            <ul className="te-plan-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <CheckCircle2 size={14} className="te-feat-check" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`te-upgrade-btn${plan.popular ? ' te-btn-primary' : ''}`}
              onClick={() => handleUpgrade(plan)}
              disabled={loadingPlan !== null}
            >
              {loadingPlan === plan.id ? (
                <span className="te-btn-loading">
                  <span className={`te-btn-spinner${plan.popular ? '' : ' te-btn-spinner-dark'}`} />
                  Processing...
                </span>
              ) : (
                `Upgrade to ${plan.name}`
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Error / Success */}
      {error && <div className="te-error">{error}</div>}
      {success && <div className="te-success">{success}</div>}

      <p className="te-footer-note">
        Payments are processed securely by Razorpay. Your data is safe and encrypted.
      </p>
    </div>
  );
};

export default TrialExpired;
