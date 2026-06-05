import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Search, 
  Sparkles,
  Settings,
  AlertTriangle
} from 'lucide-react';

interface FeatureItem {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  tags: string[];
  status: 'Ready' | 'In Beta' | 'Planned';
}

export const Features: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const featuresList: FeatureItem[] = [
    {
      title: 'Member Profiles & Tracking',
      desc: 'Create, modify, and monitor member data. Access fitness progress trackers, body composition logs, and goal accomplishments easily.',
      icon: Users,
      tags: ['Admin', 'Members'],
      status: 'Ready'
    },
    {
      title: 'Automated Billing & Invoices',
      desc: 'Manage membership subscription renewals automatically. Integrate card payments, view past logs, and print custom invoices.',
      icon: CreditCard,
      tags: ['Finance', 'Automated'],
      status: 'Ready'
    },
    {
      title: 'Class Scheduling & Booking',
      desc: 'Schedule group fitness sessions (Yoga, Spinning, CrossFit). Enable members to reserve slots and limit room occupancies.',
      icon: Calendar,
      tags: ['Classes', 'Scheduling'],
      status: 'Ready'
    },
    {
      title: 'Smart Barcode Attendance Check-in',
      desc: 'Verify member subscriptions at check-in automatically. Works with digital barcodes or RFID key fobs to trigger instant checks.',
      icon: ShieldCheck,
      tags: ['Security', 'Admin'],
      status: 'Ready'
    },
    {
      title: 'Trainer Client Portals',
      desc: 'Enable coaches to view client rosters, book individual sessions, record personal training notes, and set dietary targets.',
      icon: Sparkles,
      tags: ['Coaches', 'Members'],
      status: 'In Beta'
    },
    {
      title: 'Analytics & Revenue Reports',
      desc: 'Inspect monthly revenue growth, churn rate metrics, peak entry times, and popular classes using visual interactive graphs.',
      icon: TrendingUp,
      tags: ['Finance', 'Reports'],
      status: 'Ready'
    },
    {
      title: 'Workout & Meal Planner',
      desc: 'Generate customized workout routines and diet structures. Assign plans to members via automated notifications.',
      icon: Activity,
      tags: ['Members', 'Coaches'],
      status: 'Planned'
    },
    {
      title: 'Equipment Maintenance Logs',
      desc: 'Register gym gear, log recurring calibration milestones, flag out-of-order machines, and track repair cycles.',
      icon: Settings,
      tags: ['Admin', 'Operations'],
      status: 'Ready'
    },
    {
      title: 'Automated SMS & Email Alerts',
      desc: 'Send automated reminders for booking alerts, gym updates, and billing issues. Optimize member engagement channels.',
      icon: AlertTriangle,
      tags: ['Admin', 'Automated'],
      status: 'In Beta'
    }
  ];

  // Get all unique tags for filtering
  const allTags = ['All', ...Array.from(new Set(featuresList.flatMap(f => f.tags)))];

  // Filter features based on search and selected tag
  const filteredFeatures = featuresList.filter(feature => {
    const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          feature.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || feature.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="page-container">
      {/* Header */}
      <header className="page-header">
        <h2 className="page-title">Management Features</h2>
        <p className="page-subtitle">Explore the core software modules configured to run your fitness facility efficiently.</p>
      </header>

      {/* Filter and Search Bar */}
      <div className="gym-card" style={{ padding: '16px 24px', marginBottom: '28px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Search input with icon */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search features..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="form-input" 
            style={{ paddingLeft: '38px' }}
          />
        </div>

        {/* Categories Tab selector */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`toggle-option ${selectedTag === tag ? 'active' : ''}`}
              style={{ 
                padding: '6px 14px', 
                fontSize: '0.8rem',
                backgroundColor: selectedTag === tag ? 'var(--primary)' : 'var(--accent-light)',
                color: selectedTag === tag ? 'white' : 'var(--text-secondary)'
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="features-grid">
        {filteredFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="gym-card feature-card">
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="feature-icon-box">
                  <Icon />
                </div>
                <span 
                  style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 700, 
                    padding: '3px 8px', 
                    borderRadius: '12px',
                    backgroundColor: 
                      feature.status === 'Ready' ? 'rgba(16, 185, 129, 0.1)' : 
                      feature.status === 'In Beta' ? 'rgba(245, 158, 11, 0.1)' : 
                      'rgba(37, 99, 235, 0.1)',
                    color: 
                      feature.status === 'Ready' ? 'var(--success)' : 
                      feature.status === 'In Beta' ? 'var(--warning)' : 
                      'var(--primary)'
                  }}
                >
                  {feature.status}
                </span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
              <div className="feature-tags">
                {feature.tags.map((tag, idx) => (
                  <span key={idx} className="feature-tag">{tag}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredFeatures.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)' }}>
          <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>No modules found matching "{searchTerm}"</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Try adjusting your search criteria or resetting filters.</p>
        </div>
      )}
    </div>
  );
};
