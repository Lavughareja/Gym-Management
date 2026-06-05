import React, { useState } from 'react';
import { Award, Compass, Users, Calendar, Dumbbell } from 'lucide-react';

interface GymZone {
  name: string;
  size: string;
  gear: string;
  capacity: string;
  description: string;
}

interface Trainer {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
}

export const About: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('Powerlifting Deck');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const zones: Record<string, GymZone> = {
    'Powerlifting Deck': {
      name: 'Powerlifting Deck',
      size: '2,400 sq.ft.',
      gear: 'Eleiko Plates, 8x Olympic Platforms, Competition Benches',
      capacity: '45 Athletes max',
      description: 'Our premier strength zone engineered for heavy lifting. Fully equipped with competition-grade barbells, calibrated steel plates, and safety drop-zones.'
    },
    'Cardio Theater': {
      name: 'Cardio Theater',
      size: '1,800 sq.ft.',
      gear: 'Matrix Treadmills, Concept2 Rowers, Assault AirBikes',
      capacity: '30 Runners max',
      description: 'An immersive training environment featuring high-fidelity audio, customizable training simulators, and digital metrics sync for wearable devices.'
    },
    'Yoga & Mind Studio': {
      name: 'Yoga & Mind Studio',
      size: '1,200 sq.ft.',
      gear: 'Eco-mats, Resistance bands, Reformers, Infrared heaters',
      capacity: '20 Members max',
      description: 'A serene sanctuary featuring temperature-controlled infrared heating panels. Ideal for Vinyasa Flow, core alignment, and stretching workshops.'
    },
    'Recovery & Wet Spa': {
      name: 'Recovery & Wet Spa',
      size: '1,500 sq.ft.',
      gear: 'Dry Sauna, Cold plunge tubs, Hydromassage chairs',
      capacity: '15 Members max',
      description: 'Optimize post-workout repair. Features state-of-the-art cold-shock tubs at 8°C and high-temp Finnish saunas for thermal recovery.'
    }
  };

  const trainers: Trainer[] = [
    {
      name: 'Coach Arnold S.',
      role: 'Head Strength Trainer',
      bio: 'Former bodybuilding competitor. Specializes in hyper-trophy planning, biomechanics correction, and peak performance prep.',
      initials: 'AS',
      color: 'linear-gradient(135deg, #ef4444, #b91c1c)'
    },
    {
      name: 'Coach Serena W.',
      role: 'Cardio & HIIT Director',
      bio: 'Ultra-marathoner and high-octane spin coach. Passionate about metabolic optimization and cardiovascular longevity programming.',
      initials: 'SW',
      color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    {
      name: 'Coach Ronnie C.',
      role: 'Powerlifting Specialist',
      bio: 'National powerlifting champion. Focuses on squat/bench/deadlift form critique, central nervous system loading, and strength plateaus.',
      initials: 'RC',
      color: 'linear-gradient(135deg, #10b981, #047857)'
    },
    {
      name: 'Coach Linda K.',
      role: 'Mobility & Yoga Lead',
      bio: 'Vinyasa Flow practitioner and sports injury physical therapist. Combines dynamic alignment with core stability techniques.',
      initials: 'LK',
      color: 'linear-gradient(135deg, #a855f7, #7e22ce)'
    }
  ];

  const handleBookTrainer = (trainerName: string) => {
    setBookingSuccess(`Consultation booked with ${trainerName}! Check your email for scheduler verification.`);
    setTimeout(() => {
      setBookingSuccess(null);
    }, 4000);
  };

  return (
    <div className="page-container">
      {/* Toast */}
      {bookingSuccess && (
        <div className="alert-success" style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, boxShadow: 'var(--shadow-lg)' }}>
          <Award size={18} />
          <span>{bookingSuccess}</span>
        </div>
      )}

      {/* Header */}
      <header className="page-header">
        <h2 className="page-title">About Our Gym</h2>
        <p className="page-subtitle">Built by athletes, for athletes. Learn about our facility zones, history, and professional coaches.</p>
      </header>

      {/* Philosophy and Facility Info */}
      <div className="about-grid">
        <div className="about-content">
          <h3>The IronPulse Philosophy</h3>
          <p>
            Established in 2018, IronPulse was founded on the idea that high-quality fitness coaching should be supported by professional-grade equipment. We strip away the gimmicks of corporate clubs to focus entirely on results-driven strength, cardiovascular endurance, and recovery.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Compass size={20} style={{ color: 'var(--primary)' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>Pure Focus</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Calibrated gear only</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Users size={20} style={{ color: 'var(--primary)' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>Elite Community</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Driven environment</p>
              </div>
            </div>
          </div>
          
          <p style={{ fontSize: '0.9rem' }}>
            Whether you are preparing for a local meet, training for endurance, or looking to build functional longevity, we provide the clean, modern tools required to push limits safely.
          </p>
        </div>

        {/* Interactive Zone Visualizer */}
        <div className="gym-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 12 }}>Explore Facility Layout</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16 }}>Click a sector to view active details and equipment lists.</p>
          
          {/* Layout Map grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: 20 }}>
            {Object.keys(zones).map((zoneName) => (
              <button
                key={zoneName}
                onClick={() => setSelectedZone(zoneName)}
                className="btn-blue-outline"
                style={{ 
                  padding: '12px', 
                  fontSize: '0.8rem', 
                  justifyContent: 'center',
                  backgroundColor: selectedZone === zoneName ? 'var(--primary-light)' : 'transparent',
                  borderColor: selectedZone === zoneName ? 'var(--primary)' : 'var(--border-color)',
                  color: selectedZone === zoneName ? 'var(--primary)' : 'var(--text-secondary)'
                }}
              >
                <Dumbbell size={14} style={{ marginRight: 6 }} />
                {zoneName}
              </button>
            ))}
          </div>

          {/* Zone Details */}
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'var(--accent-light)', borderLeft: '4px solid var(--primary)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{zones[selectedZone].name}</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span><strong>Zone Size:</strong> {zones[selectedZone].size}</span>
              <span><strong>Capacity:</strong> {zones[selectedZone].capacity}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '8px 0 0' }}>
              {zones[selectedZone].description}
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              <strong>Key Gear:</strong> {zones[selectedZone].gear}
            </div>
          </div>
        </div>
      </div>

      {/* Trainer Team Section */}
      <section className="trainer-section">
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, textAlign: 'center', color: 'var(--text-primary)' }}>Our Elite Coaching Team</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '600px', margin: '6px auto 0' }}>
          Schedule 1-on-1 consultations with our certified staff to audit your form, design programming, and maximize results.
        </p>

        <div className="trainer-grid">
          {trainers.map((trainer, idx) => (
            <div key={idx} className="gym-card trainer-card">
              <div className="trainer-photo" style={{ background: trainer.color }}>
                {trainer.initials}
              </div>
              <h4 className="trainer-name">{trainer.name}</h4>
              <span className="trainer-role">{trainer.role}</span>
              <p className="trainer-bio">{trainer.bio}</p>
              
              <button 
                className="btn-blue-outline" 
                style={{ marginTop: '16px', width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '6px 12px' }}
                onClick={() => handleBookTrainer(trainer.name)}
              >
                <Calendar size={14} /> Book Session
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
