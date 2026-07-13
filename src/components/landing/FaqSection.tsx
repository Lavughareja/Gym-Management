import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 7-day free trial with full access to all features. No credit card required.'
    },
    {
      question: 'Can I import my existing members?',
      answer: 'Absolutely. We provide a simple Excel/CSV import tool to bring all your members and their active plans into Trainix in seconds.'
    },
    {
      question: 'Do you support multi-location gyms?',
      answer: 'Yes, our Pro plan supports multi-location management from a single dashboard.'
    },
    {
      question: 'Is my data secure?',
      answer: 'We use bank-level encryption (AES-256) and host your data on secure AWS servers with daily backups.'
    }
  ];

  return (
    <section className="faq-section" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-eyebrow text-center" style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', marginBottom: '8px' }}>FAQ</div>
      <h2 className="section-title text-center" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '40px' }}>Frequently Asked Questions</h2>
      <div className="faq-grid" style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item" style={{ background: 'var(--bg-card)', padding: 24, borderRadius: 12, border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{faq.question}</h4>
              <div style={{ color: 'var(--text-muted)' }}>
                {openIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            {openIndex === i && <p style={{ margin: '16px 0 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};
