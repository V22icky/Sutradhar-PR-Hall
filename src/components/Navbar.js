import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, Terminal, Sun, Moon, Plus } from 'lucide-react';
import '../css/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-mode');
  };

  const isHome = location.pathname === '/';

  const getLinkPath = (hash) => {
    return isHome ? hash : `/${hash}`;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass-nav' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">
            <Terminal size={24} />
          </div>
          <span>Sutradhar</span>
        </Link>

        <div className="nav-links desktop-only">
          <a href={getLinkPath('#leaderboard')}>Leaderboard</a>
          <a href={getLinkPath('#timeline')}>Timeline</a>
          <a href={getLinkPath('#guide')}>Guide</a>
          <a href={getLinkPath('#safety')}>Safety</a>
          <Link to="/create-profile" className={location.pathname === '/create-profile' ? 'active' : ''}>
            Create Profile
          </Link>
        </div>

        <div className="nav-actions desktop-only">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link to="/create-profile" style={{ marginRight: '1rem' }} className="btn btn-outline">
            <Plus size={16} />
            <span>Create Profile</span>
          </Link>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/webdeveloperdesigner/Sutradhar" 
            target="_blank" 
            className="btn btn-primary"
          >
            <Globe size={18} />
            <span>GitHub</span>
          </motion.a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mobile-menu glass-nav"
        >
          <a href={getLinkPath('#leaderboard')} onClick={() => setMobileMenuOpen(false)}>Leaderboard</a>
          <a href={getLinkPath('#timeline')} onClick={() => setMobileMenuOpen(false)}>Timeline</a>
          <a href={getLinkPath('#guide')} onClick={() => setMobileMenuOpen(false)}>Guide</a>
          <a href={getLinkPath('#safety')} onClick={() => setMobileMenuOpen(false)}>Safety</a>
          <Link to="/create-profile" onClick={() => setMobileMenuOpen(false)}>Create Profile</Link>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
            <button className="theme-toggle" onClick={toggleDarkMode} style={{ marginRight: 0 }}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="https://github.com/webdeveloperdesigner/Sutradhar" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ margin: 0 }}>
              <Globe size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

