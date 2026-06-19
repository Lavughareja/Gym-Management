import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Navigation } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submission API call with loading spinner
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
      
      // Auto close banner after 4 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 4000);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="page-container">
      {/* Toast Notification */}
      {formSubmitted && (
        <div className="alert-success" style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, boxShadow: 'var(--shadow-lg)' }}>
          <CheckCircle size={18} />
          <span>Message sent successfully! Our team will reply within 24 hours.</span>
        </div>
      )}

      {/* Header */}
      <header className="page-header">
        <h2 className="page-title">Contact Us</h2>
        <p className="page-subtitle">Get in touch with our team. Submit feedback, request membership options, or send inquiries.</p>
      </header>

      {/* Grid Layout */}
      <div className="contact-grid">
        {/* Left Column: Contact details & Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Details Card */}
          <div className="gym-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Get In Touch</h3>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPin />
                </div>
                <div>
                  <span className="contact-info-title">Facility Location</span>
                  <p className="contact-info-text">128 Steel Avenue, Gymtown, NY 10001</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Phone />
                </div>
                <div>
                  <span className="contact-info-title">Phone Number</span>
                  <p className="contact-info-text">+1 (555) 321-IRON (4766)</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Mail />
                </div>
                <div>
                  <span className="contact-info-title">Email Address</span>
                  <p className="contact-info-text">support@trainix.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="gym-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Clock style={{ color: 'var(--primary)' }} size={20} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Operating Hours</h3>
            </div>
            
            <table className="hours-table">
              <tbody>
                <tr>
                  <td className="day">Monday - Friday</td>
                  <td className="time">24 Hours Open</td>
                </tr>
                <tr>
                  <td className="day">Saturday</td>
                  <td className="time">6:00 AM - 10:00 PM</td>
                </tr>
                <tr>
                  <td className="day">Sunday</td>
                  <td className="time">8:00 AM - 8:00 PM</td>
                </tr>
                <tr>
                  <td className="day">Holidays</td>
                  <td className="time">8:00 AM - 4:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Location Map Mock */}
          <div className="gym-card" style={{ padding: 12 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, paddingLeft: 12, paddingTop: 6 }}>Location Map</h3>
            <div className="map-container">
              <div className="map-mock">
                {/* SVG representing location nodes */}
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', margin: '0 auto 8px' }}>
                  <Navigation size={18} style={{ color: 'var(--primary)', transform: 'rotate(45deg)', animation: 'pulse 2s infinite' }} />
                  <span className="map-badge">Trainix Gym Headquarters</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Intersection of Core St & Calbell Ave</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GPS: 40.7128° N, 74.0060° W</span>
                
                {/* Styled decorative elements representing streets in the map */}
                <div style={{ width: '80%', height: '4px', backgroundColor: 'var(--border-color)', margin: '12px auto 0', position: 'relative', borderRadius: 2 }}>
                  <div style={{ width: '4px', height: '30px', backgroundColor: 'var(--border-color)', position: 'absolute', top: -13, left: '40%' }}></div>
                  <div style={{ width: '4px', height: '30px', backgroundColor: 'var(--border-color)', position: 'absolute', top: -13, left: '70%' }}></div>
                  <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%', position: 'absolute', top: -2, left: '55%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry feedback form */}
        <div className="gym-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Send Inquiry Form</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 20 }}>Have questions or want to leave a review? Fill out this portal form.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Full Name <span style={{ color: 'var(--danger)' }}>*</span></label>
              <input 
                id="contact-name"
                name="name" 
                type="text" 
                className="form-input" 
                placeholder="Enter your name" 
                value={formData.name} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email Address <span style={{ color: 'var(--danger)' }}>*</span></label>
              <input 
                id="contact-email"
                name="email" 
                type="email" 
                className="form-input" 
                placeholder="you@example.com" 
                value={formData.email} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Inquiry Subject</label>
              <select 
                id="contact-subject"
                name="subject" 
                className="form-input" 
                value={formData.subject} 
                onChange={handleChange}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Membership Billing">Membership Billing</option>
                <option value="Trainer Request">Trainer Request</option>
                <option value="Feedback / Complaints">Feedback / Complaints</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Detailed Message <span style={{ color: 'var(--danger)' }}>*</span></label>
              <textarea 
                id="contact-message"
                name="message" 
                className="form-input" 
                placeholder="Type your message details here..." 
                value={formData.message} 
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-blue" 
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span style={{ 
                    border: '2px solid rgba(255,255,255,0.3)', 
                    borderTop: '2px solid white', 
                    borderRadius: '50%', 
                    width: 14, 
                    height: 14, 
                    animation: 'spin 0.8s linear infinite', 
                    display: 'inline-block' 
                  }}/>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Spin animation styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1) rotate(45deg); opacity: 1; }
          50% { transform: scale(1.15) rotate(45deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(45deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
