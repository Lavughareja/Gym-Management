import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import axiosInstance from '../../axios/axiosInstance'; // Using configured axios instance

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gymName: '',
    email: '',
    phone: '',
    country: 'United States'
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await axiosInstance.post('/api/demo-requests', formData);
      setMessage({ type: 'success', text: 'Thank you! Your demo request has been submitted.' });
      setFormData({
        fullName: '',
        gymName: '',
        email: '',
        phone: '',
        country: 'United States'
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-dark to-dark pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
              Ready to scale your gym?
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-md">
              Book a free 30-minute personalized demo with our fitness tech experts. See how Trainix can transform your business.
            </p>

            <div className="space-y-6">
              {[
                "Customized walkthrough of the platform",
                "Pricing discussion based on your needs",
                "Data migration strategy from your current system",
                "No commitment required"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-gray-300">
                  <CheckCircle2 className="text-primary shrink-0" size={24} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-dark mb-6">Book your free demo</h3>

            {message.text && (
              <div className={`p-4 mb-6 rounded-xl ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message.text}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gym Name</label>
                  <input required name="gymName" value={formData.gymName} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Iron Fitness" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                  <select name="country" value={formData.country} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>India</option>
                    <option>Australia</option>
                    <option>Canada</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl py-4 font-bold text-lg flex items-center justify-center gap-2 mt-4 transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Submitting...' : 'Schedule Demo'} {!loading && <Send size={20} />}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                By submitting, you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
