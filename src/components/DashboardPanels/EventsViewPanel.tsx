import React, { useState, useEffect } from 'react';
import { Calendar, Bell } from 'lucide-react';
import { getEventMessagesApi } from '../../services/apis/eventMessageApis';

const EventsViewPanel = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await getEventMessagesApi();
      setEvents(res.data.events || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h2 className="page-title">Events & Announcements</h2>
          <p className="page-subtitle">Latest updates and news from your gym.</p>
        </div>
      </header>

      <div className="gym-card">
        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <Bell size={32} style={{ opacity: 0.5, marginBottom: 16, margin: '0 auto' }} />
            <p>No recent announcements.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {events.map((ev: any) => (
              <div key={ev._id} style={{ 
                padding: 20, 
                borderRadius: 12, 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
              }}>
                <h4 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 8, color: 'var(--primary)' }}>
                  {ev.title}
                </h4>
                <p style={{ color: 'var(--text-primary)', marginBottom: 16, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {ev.message}
                </p>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
                    <Calendar size={16} style={{ color: 'var(--primary)' }} /> 
                    {new Date(ev.scheduledDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsViewPanel;
