import React from 'react';
import { Globe, Send, Briefcase, Heart, Terminal } from 'lucide-react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-icon">
              <Terminal size={20} />
            </div>
            <span>Sutradhar</span>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <a href="#">About</a>
              <a href="#">Changelog</a>
              <a href="#">Contributors</a>
              <a href="#">Leaderboard</a>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <a href="#">Docs</a>
              <a href="#">Guide</a>
              <a href="#">GitHub</a>
              <a href="#">Mentorship</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">License</a>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <p>© 2026 Sutradhar. Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> for open source.</p>
          <div className="social-links">
            <a href="#"><Globe size={20} /></a>
            <a href="#"><Send size={20} /></a>
            <a href="#"><Briefcase size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
