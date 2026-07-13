import React from 'react';
import Tilt from 'react-parallax-tilt';

export const CustomerStories: React.FC = () => {
  return (
    <>
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-eyebrow text-center">CUSTOMER STORIES</div>
        <h2 className="section-title text-center">
          Loved by <span className="text-primary-gradient">gym owners.</span>
        </h2>
        <p className="section-subtitle text-center">Join the growing community of fitness businesses running on Trainix.</p>

        <div className="testimonials-grid">
          <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.03} transitionSpeed={2500} className="testimonial-card premium-hover-card">
            <div className="stars">★★★★★</div>
            <p className="quote">"Trainix completely changed how we handle memberships. The role-based dashboards keep my trainers and managers perfectly aligned."</p>
            <div className="author-info">
              <div className="author-avatar" style={{background: '#c084fc'}}>MJ</div>
              <div>
                <strong>Michael J.</strong>
                <div style={{fontSize: '0.8rem', color: '#6b7280'}}>FitCore Studios</div>
              </div>
            </div>
          </Tilt>
          
          <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.03} transitionSpeed={2500} className="testimonial-card premium-hover-card">
            <div className="stars">★★★★★</div>
            <p className="quote">"Finally, a gym software that doesn't feel like it was built in 2010. The member portal is incredibly smooth and easy for our clients."</p>
            <div className="author-info">
              <div className="author-avatar" style={{background: '#34d399'}}>SW</div>
              <div>
                <strong>Sarah W.</strong>
                <div style={{fontSize: '0.8rem', color: '#6b7280'}}>Iron Forge Gym</div>
              </div>
            </div>
          </Tilt>

          <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.03} transitionSpeed={2500} className="testimonial-card premium-hover-card">
            <div className="stars">★★★★★</div>
            <p className="quote">"Tracking attendance and active subscriptions used to be a nightmare. Now I can see my revenue and member stats at a glance."</p>
            <div className="author-info">
              <div className="author-avatar" style={{background: '#60a5fa'}}>DL</div>
              <div>
                <strong>David L.</strong>
                <div style={{fontSize: '0.8rem', color: '#6b7280'}}>Apex Athletics</div>
              </div>
            </div>
          </Tilt>
        </div>
      </section>
    </>
  );
};
