import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopNavLayoutProps {
  onLoginClick?: () => void;
  children: React.ReactNode;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Screenshots', href: '#screenshots' },
  { name: 'Integrations', href: '#integrations' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export const TopNavLayout: React.FC<TopNavLayoutProps> = ({ children, onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-dark font-sans selection:bg-primary selection:text-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
          isScrolled ? 'bg-white/80 backdrop-blur-md border-gray-200 py-3 shadow-sm' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer z-50">
              <div className="w-8 h-8 rounded-lg bg-dark flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold tracking-tight">GymCore</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5">
              <a href="#features" className="text-xs font-medium text-gray-600 hover:text-dark transition-colors">Features</a>
              <a href="#screenshots" className="text-xs font-medium text-gray-600 hover:text-dark transition-colors">Screenshots</a>
              <a href="#integrations" className="text-xs font-medium text-gray-600 hover:text-dark transition-colors">Integrations</a>
              <a href="#pricing" className="text-xs font-medium text-gray-600 hover:text-dark transition-colors">Pricing</a>
              <a href="#testimonials" className="text-xs font-medium text-gray-600 hover:text-dark transition-colors">Testimonials</a>
              <a href="#faq" className="text-xs font-medium text-gray-600 hover:text-dark transition-colors">FAQ</a>
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {onLoginClick && (
                <button
                  onClick={onLoginClick}
                  className="text-sm font-medium text-gray-600 hover:text-dark transition-colors"
                >
                  Login
                </button>
              )}
              <button className="text-sm font-medium text-dark hover:text-primary transition-colors">
                Book Demo
              </button>
              <button className="bg-dark hover:bg-gray-800 text-white text-sm font-medium py-2 px-5 rounded-full transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-dark/20">
                Get Started <ArrowRight size={16} />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden z-50 p-2 -mr-2 text-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 pb-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-6">
                {onLoginClick && (
                  <button
                    onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                    className="w-full text-center py-3 rounded-xl border border-gray-200 font-medium text-dark"
                  >
                    Login
                  </button>
                )}
                <button className="w-full text-center py-3 rounded-xl bg-gray-100 font-medium text-dark">
                  Book Demo
                </button>
                <button className="w-full text-center py-3 rounded-xl bg-primary text-white font-medium shadow-lg shadow-primary/30">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="w-full pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white pt-20 pb-10 border-t border-gray-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <div className="w-4 h-4 bg-dark rounded-sm"></div>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">GymCore</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                The complete operating system for modern gyms and fitness studios. Manage everything from one powerful platform.
              </p>
              <div className="flex items-center gap-4">
                {['Twitter', 'LinkedIn', 'Instagram', 'Facebook'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-current rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6">Product</h4>
              <ul className="flex flex-col gap-4">
                {['Features', 'Pricing', 'Integrations', 'Changelog', 'Docs'].map(item => (
                  <li key={item}><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6">Company</h4>
              <ul className="flex flex-col gap-4">
                {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map(item => (
                  <li key={item}><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6">Legal</h4>
              <ul className="flex flex-col gap-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map(item => (
                  <li key={item}><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} GymCore Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-gray-400 text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
