import React from 'react';
import { ArrowRight, Calendar, Check, Smartphone, Users, MessageSquare, Receipt, ScanLine, Users2, ShieldCheck, ActivitySquare, CalendarDays, UserPlus, Salad, CreditCard, Sparkles, Dumbbell, TrendingUp, Flame, X } from 'lucide-react';

export const DashboardMockup: React.FC = () => {
  return (
    <>
      {/* Dashboard Preview Section */}
      <section className="dashboard-preview-section">
        <div className="dashboard-mockup">
          <div className="mockup-header">
            <div className="mockup-dots">
              <span></span><span></span><span></span>
            </div>
            <div className="mockup-url">Trainix.app/dashboard</div>
          </div>
          <div className="mockup-body">
            <div className="mockup-sidebar">
              <div className="mockup-logo"></div>
              <div className="mockup-menu-item active"></div>
              <div className="mockup-menu-item"></div>
              <div className="mockup-menu-item"></div>
              <div className="mockup-menu-item"></div>
            </div>
            <div className="mockup-content">
              <div className="mockup-top-cards">
                <div className="mockup-card"></div>
                <div className="mockup-card"></div>
                <div className="mockup-card"></div>
                <div className="mockup-card"></div>
              </div>
              <div className="mockup-main-area">
                <div className="mockup-chart"></div>
                <div className="mockup-side-panel"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
