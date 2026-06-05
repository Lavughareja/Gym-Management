import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  UserCheck, 
  UserPlus, 
  Calendar, 
  Award 
} from 'lucide-react';

interface CheckIn {
  id: string;
  name: string;
  time: string;
  status: 'active' | 'inactive';
  plan: string;
}

export const Home: React.FC = () => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([
    { id: '1', name: 'Alex Johnson', time: '10 mins ago', status: 'active', plan: 'Pro Membership' },
    { id: '2', name: 'Sarah Miller', time: '23 mins ago', status: 'active', plan: 'VIP Elite' },
    { id: '3', name: 'David Chen', time: '45 mins ago', status: 'active', plan: 'Basic Strength' },
    { id: '4', name: 'Emma Davis', time: '1 hour ago', status: 'inactive', plan: 'Trial Pass' },
    { id: '5', name: 'Marcus Brody', time: '2 hours ago', status: 'active', plan: 'Pro Membership' },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleQuickCheckIn = () => {
    const mockNames = ['Jessica Taylor', 'Robert Dow', 'Linda Hamilton', 'Brandon Lee', 'Sophia Carter'];
    const mockPlans = ['Pro Membership', 'VIP Elite', 'Basic Strength'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const randomPlan = mockPlans[Math.floor(Math.random() * mockPlans.length)];
    
    const newCheckIn: CheckIn = {
      id: Date.now().toString(),
      name: randomName,
      time: 'Just now',
      status: 'active',
      plan: randomPlan
    };

    setCheckIns([newCheckIn, ...checkIns.slice(0, 4)]);
    showToast(`Checked in ${randomName} successfully!`);
  };

  const handleAddMember = () => {
    showToast("Opening 'Add New Member' wizard (Mock action)");
  };

  const handleBookSession = () => {
    showToast("Class booking calendar opened (Mock action)");
  };

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Peak hours mock data for custom CSS chart
  const peakHoursData = [
    { hour: '6 AM', value: 85 },
    { hour: '8 AM', value: 95 },
    { hour: '10 AM', value: 45 },
    { hour: '12 PM', value: 30 },
    { hour: '2 PM', value: 25 },
    { hour: '4 PM', value: 65 },
    { hour: '6 PM', value: 100 },
    { hour: '8 PM', value: 80 },
    { hour: '10 PM', value: 35 },
  ];

  return (
    <div className="page-container">
      {/* Toast Notification */}
      {notification && (
        <div className="alert-success" style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, boxShadow: 'var(--shadow-lg)' }}>
          <CheckCircle size={18} />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <header className="page-header">
        <h2 className="page-title">Local Dashboard</h2>
        <p className="page-subtitle">A simple view of all connected members and your gym performance metrics.</p>
      </header>

      {/* Metrics Cards Grid */}
      <div className="stats-grid">
        <div className="gym-card stat-card">
          <div className="stat-icon-container" style={{ backgroundColor: '#2563eb' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">1,482</span>
            <span className="stat-label">Active Members</span>
          </div>
        </div>

        <div className="gym-card stat-card">
          <div className="stat-icon-container" style={{ backgroundColor: '#10b981' }}>
            <UserCheck size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">87</span>
            <span className="stat-label">Checked In Today</span>
          </div>
        </div>

        <div className="gym-card stat-card">
          <div className="stat-icon-container" style={{ backgroundColor: '#f59e0b' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">14</span>
            <span className="stat-label">Classes Scheduled</span>
          </div>
        </div>

        <div className="gym-card stat-card">
          <div className="stat-icon-container" style={{ backgroundColor: '#a855f7' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">$12,480</span>
            <span className="stat-label">Monthly Revenue</span>
          </div>
        </div>
      </div>

      {/* Dashboard Two-Column Layout */}
      <div className="dashboard-grid">
        {/* Left Column: Peak Hours Chart & Checkins */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Chart Card */}
          <div className="gym-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Gym Attendance Peak Hours</h3>
              <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                <TrendingUp size={14} /> High Traffic (6PM)
              </span>
            </div>
            
            <div className="chart-container">
              {peakHoursData.map((data, idx) => (
                <div key={idx} className="chart-bar-wrapper">
                  <div 
                    className="chart-bar-fill" 
                    style={{ height: `${data.value}%` }} 
                    data-value={`${data.value}% Capacity`}
                  />
                  <span className="chart-label">{data.hour}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Check-ins Card */}
          <div className="gym-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Live Check-ins</h3>
            <div className="checkin-list">
              {checkIns.map((checkIn) => (
                <div key={checkIn.id} className="checkin-item">
                  <div className="checkin-member">
                    <div className="checkin-avatar">
                      {checkIn.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="checkin-name">{checkIn.name}</div>
                      <div className="checkin-time" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {checkIn.plan} • {checkIn.time}
                      </div>
                    </div>
                  </div>
                  <span className={`checkin-status ${checkIn.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                    {checkIn.status === 'active' ? 'Verified' : 'Flagged'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Action center & details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Quick Actions Card */}
          <div className="gym-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Quick Action Center</h3>
            <div className="actions-grid">
              <button className="action-btn" onClick={handleQuickCheckIn}>
                <UserCheck />
                <span>Quick Check-In</span>
              </button>
              <button className="action-btn" onClick={handleAddMember}>
                <UserPlus />
                <span>Add Member</span>
              </button>
              <button className="action-btn" onClick={handleBookSession}>
                <Calendar />
                <span>Book Session</span>
              </button>
              <button className="action-btn" onClick={() => showToast("Showing Trainer Shift Logs")}>
                <Clock />
                <span>Trainer Shift</span>
              </button>
            </div>
          </div>

          {/* Quick Gym Status */}
          <div className="gym-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>Active Trainer Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 500 }}>Coach Arnold S. (Strength)</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>On Duty</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 500 }}>Coach Serena W. (Cardio)</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>On Duty</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 500 }}>Coach Ronnie C. (Heavy Weights)</span>
                <span style={{ color: 'var(--text-muted)' }}>Off Duty</span>
              </div>
            </div>
          </div>

          {/* Gym Goals Card */}
          <div className="gym-card" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', color: '#ffffff', border: 'none' }}>
            <Award size={36} style={{ marginBottom: 12, opacity: 0.9 }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>Weekly Goal Met!</h4>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.5 }}>
              The community has completed over 1,200 collective workouts this week! Keep pushing limits, team.
            </p>
            <button 
              className="btn-blue" 
              style={{ backgroundColor: 'white', color: 'var(--primary)', marginTop: 16, border: 'none', boxShadow: 'none' }}
              onClick={() => showToast("Viewing Achievements details")}
            >
              View Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
