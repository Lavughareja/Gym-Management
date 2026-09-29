import React, { useState } from 'react';
import { Award, Compass, Users, Calendar, Dumbbell } from 'lucide-react';
import "./About.css";
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
  const trainers: Trainer[] = [{
    name: 'Coach Arnold S.',
    role: 'Head Strength Trainer',
    bio: 'Former bodybuilding competitor. Specializes in hyper-trophy planning, biomechanics correction, and peak performance prep.',
    initials: 'AS',
    color: 'linear-gradient(135deg, #ef4444, #b91c1c)'
  }, {
    name: 'Coach Serena W.',
    role: 'Cardio & HIIT Director',
    bio: 'Ultra-marathoner and high-octane spin coach. Passionate about metabolic optimization and cardiovascular longevity programming.',
    initials: 'SW',
    color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
  }, {
    name: 'Coach Ronnie C.',
    role: 'Powerlifting Specialist',
    bio: 'National powerlifting champion. Focuses on squat/bench/deadlift form critique, central nervous system loading, and strength plateaus.',
    initials: 'RC',
    color: 'linear-gradient(135deg, #10b981, #047857)'
  }, {
    name: 'Coach Linda K.',
    role: 'Mobility & Yoga Lead',
    bio: 'Vinyasa Flow practitioner and sports injury physical therapist. Combines dynamic alignment with core stability techniques.',
    initials: 'LK',
    color: 'linear-gradient(135deg, #a855f7, #7e22ce)'
  }];
  const handleBookTrainer = (trainerName: string) => {
    setBookingSuccess(`Consultation booked with ${trainerName}! Check your email for scheduler verification.`);
    setTimeout(() => {
      setBookingSuccess(null);
    }, 4000);
  };
  return <div className="page-container">
      {/* Toast */}
      {bookingSuccess && <div className="alert-success about-inline-1">
          <Award size={18} />
          <span>{bookingSuccess}</span>
        </div>}

      {/* Header */}
      <header className="page-header">
        <h2 className="page-title">About Our Gym</h2>
        <p className="page-subtitle">Built by athletes, for athletes. Learn about our facility zones, history, and professional coaches.</p>
      </header>

      {/* Philosophy and Facility Info */}
      <div className="about-grid">
        <div className="about-content">
          <h3>The Trainix Philosophy</h3>
          <p>
            Established in 2018, Trainix was founded on the idea that high-quality fitness coaching should be supported by professional-grade equipment. We strip away the gimmicks of corporate clubs to focus entirely on results-driven strength, cardiovascular endurance, and recovery.
          </p>
          
          <div className="about-inline-2">
            <div className="about-inline-3">
              <Compass size={20} className="about-inline-4" />
              <div>
                <h4 className="about-inline-5">Pure Focus</h4>
                <p className="about-inline-6">Calibrated gear only</p>
              </div>
            </div>
            
            <div className="about-inline-7">
              <Users size={20} className="about-inline-8" />
              <div>
                <h4 className="about-inline-9">Elite Community</h4>
                <p className="about-inline-10">Driven environment</p>
              </div>
            </div>
          </div>
          
          <p className="about-inline-11">
            Whether you are preparing for a local meet, training for endurance, or looking to build functional longevity, we provide the clean, modern tools required to push limits safely.
          </p>
        </div>

        {/* Interactive Zone Visualizer */}
        <div className="gym-card">
          <h3 className="about-inline-12">Explore Facility Layout</h3>
          <p className="about-inline-13">Click a sector to view active details and equipment lists.</p>
          
          {/* Layout Map grid */}
          <div className="about-inline-14">
            {Object.keys(zones).map(zoneName => <button key={zoneName} onClick={() => setSelectedZone(zoneName)} className="btn-blue-outline about-inline-15" style={{
            backgroundColor: selectedZone === zoneName ? 'var(--primary-light)' : 'transparent',
            borderColor: selectedZone === zoneName ? 'var(--primary)' : 'var(--border-color)',
            color: selectedZone === zoneName ? 'var(--primary)' : 'var(--text-secondary)'
          }}>
                <Dumbbell size={14} className="about-inline-16" />
                {zoneName}
              </button>)}
          </div>

          {/* Zone Details */}
          <div className="about-inline-17">
            <h4 className="about-inline-18">{zones[selectedZone].name}</h4>
            <div className="about-inline-19">
              <span><strong>Zone Size:</strong> {zones[selectedZone].size}</span>
              <span><strong>Capacity:</strong> {zones[selectedZone].capacity}</span>
            </div>
            <p className="about-inline-20">
              {zones[selectedZone].description}
            </p>
            <div className="about-inline-21">
              <strong>Key Gear:</strong> {zones[selectedZone].gear}
            </div>
          </div>
        </div>
      </div>

      {/* Trainer Team Section */}
      <section className="trainer-section">
        <h3 className="about-inline-22">Our Elite Coaching Team</h3>
        <p className="about-inline-23">
          Schedule 1-on-1 consultations with our certified staff to audit your form, design programming, and maximize results.
        </p>

        <div className="trainer-grid">
          {trainers.map((trainer, idx) => <div key={idx} className="gym-card trainer-card">
              <div className="trainer-photo" style={{
            background: trainer.color
          }}>
                {trainer.initials}
              </div>
              <h4 className="trainer-name">{trainer.name}</h4>
              <span className="trainer-role">{trainer.role}</span>
              <p className="trainer-bio">{trainer.bio}</p>
              
              <button className="btn-blue-outline about-inline-24" onClick={() => handleBookTrainer(trainer.name)}>
                <Calendar size={14} /> Book Session
              </button>
            </div>)}
        </div>
      </section>
    </div>;
};