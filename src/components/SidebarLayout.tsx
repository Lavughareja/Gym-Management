import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo/logo.png';
import { 
  Menu, 
  LayoutDashboard, 
  Activity, 
  DollarSign, 
  Info, 
  Mail, 
  Sun, 
  Moon, 
  User,
  LogIn
} from 'lucide-react';

interface SidebarLayoutProps {
  onLoginClick?: () => void;
  children: (
    activeTab: string, 
    setActiveTab: (tab: string) => void
  ) => React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children, onLoginClick }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark-theme');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark-theme');
    }
  }, []);

  // Handle theme toggle
  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'features', label: 'Features', icon: Activity },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  return (
    <div className="app-container">
      {/* Mobile Backdrop Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Persistent Desktop / Drawer Mobile Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Brand Section */}
        <div className="sidebar-brand">
          <div className="brand-icon-wrapper" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
            <img src={logoImg} alt="IronPulse Logo" style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 10 }} />
          </div>
          <div>
            <h1 className="brand-name">IRONPULSE</h1>
            <p className="brand-subtitle">Gym Management Portal</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ul className="sidebar-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <a
                    className={`sidebar-menu-item ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {/* Theme Switch Slider */}
          <div className="theme-switch-container">
            <span className="theme-switch-label">
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
              <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={isDarkMode} 
                onChange={toggleTheme} 
                aria-label="Toggle dark mode"
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Login Button */}
          {onLoginClick && (
            <button 
              onClick={onLoginClick}
              className="btn-blue-outline" 
              style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}
            >
              <LogIn size={16} /> Login
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="main-content">
        {/* Mobile Header Bar */}
        <header className="mobile-header">
          <button 
            className="menu-toggle-btn"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={logoImg} alt="IronPulse Logo" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 8 }} />
            <span className="brand-name" style={{ fontSize: '1rem' }}>IRONPULSE</span>
          </div>

          <div style={{ width: 40 }}>
            {/* Mobile login icon */}
            {onLoginClick && (
              <button 
                onClick={onLoginClick}
                style={{ background: 'none', border: 'none', color: 'var(--primary)' }}
              >
                <LogIn size={20} />
              </button>
            )}
          </div>
        </header>

        {/* Render Active Children Page */}
        {children(activeTab, setActiveTab)}
      </div>
    </div>
  );
};
