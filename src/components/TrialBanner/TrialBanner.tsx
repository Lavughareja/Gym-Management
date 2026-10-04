import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './TrialBanner.css';

interface TrialBannerProps {
  planEndDate: string | Date;
  paymentStatus: boolean;
  role: string;
}

const TrialBanner: React.FC<TrialBannerProps> = ({ planEndDate, paymentStatus, role }) => {
  const navigate = useNavigate();

  // Only show for admin/owner users who have not yet paid
  if (role !== 'admin' && role !== 'owner') return null;
  if (paymentStatus) return null;
  if (!planEndDate) return null;

  const end = new Date(planEndDate);
  const diffMs = end.getTime() - Date.now();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Already expired — redirect handled by axios interceptor, but just in case hide banner
  if (daysLeft <= 0) return null;

  const isUrgent = daysLeft <= 3;

  return (
    <div className={`trial-banner${isUrgent ? ' trial-banner-urgent' : ''}`}>
      <div className="trial-banner-left">
        {isUrgent ? (
          <AlertTriangle size={16} className="trial-banner-icon" />
        ) : (
          <Clock size={16} className="trial-banner-icon" />
        )}
        <span className="trial-banner-text">
          {isUrgent
            ? <>Your free trial expires in <strong>{daysLeft} day{daysLeft !== 1 ? 's' : ''}</strong>. Upgrade now to avoid losing access.</>
            : <>You have <strong>{daysLeft} days</strong> remaining in your free trial. Upgrade anytime to keep access.</>}
        </span>
      </div>
      <button
        className="trial-banner-upgrade-btn"
        onClick={() => navigate('/trial-expired')}
      >
        Upgrade Now
      </button>
    </div>
  );
};

export default TrialBanner;
