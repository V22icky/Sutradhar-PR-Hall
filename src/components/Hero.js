import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, GitPullRequest, Users } from 'lucide-react';
import { CssLink001, CssLink002, CssLink003, CssLink004 } from './CssLink';
import TextScrollAnimation from './TextScrollAnimation';
import '../css/Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleScrollToLeaderboard = () => {
    const el = document.getElementById('leaderboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="container hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <div className="badge">
            <Sparkles size={14} />
            <span>Empowering the next generation of contributors</span>
          </div>
          
          <h1 className="hero-title-responsive">
            <TextScrollAnimation text="Every Contribution" />
            <span className="gradient-text">Tells a Story</span>
          </h1>
          
          <p>
            Sutradhar tracks and celebrates open-source contributors helping beginners grow. 
            Join our community and start your journey today.
          </p>
          
          <div className="hero-actions">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/create-profile')}
              className="btn btn-primary btn-lg"
            >
              Start Contributing
              <ArrowRight size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleScrollToLeaderboard}
              className="btn btn-outline btn-lg"
            >
              View Contributors
            </motion.button>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Explore UI:</span>
            <CssLink001 href="#leaderboard">Leaderboard</CssLink001>
            <CssLink002 href="#timeline">Timeline</CssLink002>
            <CssLink003 href="#guide">Guide</CssLink003>
            <CssLink004 to="/create-profile">Start Builder</CssLink004>
          </div>
        </motion.div>


        <div className="hero-visual">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="floating-element pr-card glass-card"
          >
            <GitPullRequest color="#0f766e" />
            <div className="pr-info">
              <span className="label">Latest Merged PR</span>
              <span className="value">feat: update docs</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -2, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="floating-element user-card glass-card"
          >
            <Users color="#312e81" />
            <div className="user-info">
              <span className="label">New Contributor</span>
              <span className="value">@dev_beginner</span>
            </div>
          </motion.div>

          <div className="hero-graph-placeholder glass-card">
            <div className="graph-header">
              <span>Contribution Activity</span>
              <div className="graph-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
            <div className="graph-grid">
              {[...Array(24)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid-square level-${Math.floor(Math.random() * 4)}`}
                ></motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
