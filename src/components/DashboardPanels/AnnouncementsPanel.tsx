import React, { useState, useEffect } from 'react';
import { Calendar, Send, Clock, Plus, Bell } from 'lucide-react';
import { createEventMessageApi, getEventMessagesApi } from '../../services/apis/eventMessageApis';
import { useAppDispatch } from '../../utils/reduxHooks';
import { showSnackbar } from '../../redux/slices/snackbarSlice';

const AnnouncementsPanel = () => {
  const dispatch = useAppDispatch();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [sendNow, setSendNow] = useState(true);

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
      dispatch(showSnackbar({ message: 'Failed to fetch announcements', type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      dispatch(showSnackbar({ message: 'Title and Message are required', type: 'error' }));
      return;
    }

    try {
      await createEventMessageApi({
        title,
        message,
        scheduledDate,
        sendNow
      });
      dispatch(showSnackbar({ message: 'Announcement created successfully', type: 'success' }));
      setShowForm(false);
      setTitle('');
      setMessage('');
      fetchEvents();
    } catch (error) {
      console.error('Create event error:', error);
      dispatch(showSnackbar({ message: 'Failed to create announcement', type: 'error' }));
    }
  };

  return (
    <div className="page-container">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="page-title">Events & Announcements</h2>
          <p className="page-subtitle">Send messages and event notices to all gym members, trainers, and managers.</p>
        </div>
        <button className="btn-blue" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} style={{ marginRight: 8 }} /> Create Announcement
        </button>
      </header>

      {showForm && (
        <div className="gym-card" style={{ marginBottom: 24, border: '1px solid var(--primary)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 16 }}>New Announcement</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Title (Event Name or Subject)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Gym Maintenance" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Message Details</label>
              <textarea 
                className="form-input" 
                rows={4} 
                placeholder="Type the message that will be sent via WhatsApp..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                required 
              />
            </div>

            <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
                <label className="form-label">Send Timing</label>
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="radio" checked={sendNow} onChange={() => setSendNow(true)} />
                    <span>Send Now</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="radio" checked={!sendNow} onChange={() => setSendNow(false)} />
                    <span>Schedule for Date</span>
                  </label>
                </div>
              </div>

              {!sendNow && (
                <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
                  <label className="form-label">Scheduled Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={scheduledDate} 
                    onChange={(e) => setScheduledDate(e.target.value)} 
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn-blue">
                <Send size={18} style={{ marginRight: 8 }} /> 
                {sendNow ? 'Send Now via WhatsApp' : 'Schedule Announcement'}
              </button>
              <button type="button" className="btn-blue-outline" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="gym-card">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 16 }}>Announcement History</h3>
        
        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <Bell size={32} style={{ opacity: 0.5, marginBottom: 16 }} />
            <p>No announcements found.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {events.map((ev: any) => (
              <div key={ev._id} style={{ 
                padding: 16, 
                borderRadius: 8, 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)',
                borderLeft: `4px solid ${ev.status === 'Sent' ? '#10b981' : '#f59e0b'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h4 style={{ fontWeight: 600, fontSize: '1.1rem' }}>{ev.title}</h4>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: 12, 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    background: ev.status === 'Sent' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                    color: ev.status === 'Sent' ? '#10b981' : '#f59e0b'
                  }}>
                    {ev.status === 'Sent' ? 'Sent' : 'Pending'}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 12, whiteSpace: 'pre-wrap' }}>
                  {ev.message}
                </p>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={14} /> 
                    {new Date(ev.scheduledDate).toLocaleDateString()}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={14} /> 
                    Created {new Date(ev.createdAt).toLocaleDateString()}
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

export default AnnouncementsPanel;
