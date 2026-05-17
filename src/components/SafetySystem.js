import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Shield, AlertTriangle, Lock, EyeOff } from 'lucide-react';
import '../css/Misc.css';

const RiskCard = ({ level, title, description, items, icon: Icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="risk-card glass-card"
    style={{ borderTop: `4px solid ${color}` }}
  >
    <div className="risk-header">
      <div className="risk-icon" style={{ color }}>
        <Icon size={24} />
      </div>
      <span className="risk-level" style={{ color }}>{level} Risk</span>
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <ul className="risk-list">
      {items.map((item, i) => (
        <li key={i}>
          <div className="list-dot" style={{ backgroundColor: color }}></div>
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const SafetySystem = () => {
  const risks = [
    {
      level: 'Low',
      title: 'Documentation & UI',
      description: 'Perfect for beginners. Fix typos, update README, or tweak CSS colors.',
      items: ['Readme updates', 'CSS styling', 'Comment additions'],
      icon: ShieldCheck,
      color: '#10b981',
      delay: 0.1
    },
    {
      level: 'Medium',
      title: 'Logic & Components',
      description: 'Adding new features or fixing bugs in React components.',
      items: ['New components', 'State management', 'API integration'],
      icon: Shield,
      color: '#312e81',
      delay: 0.2
    },
    {
      level: 'High',
      title: 'Security & Core',
      description: 'Critical infrastructure changes that require deep review.',
      items: ['Authentication', 'Database schema', 'Env configuration'],
      icon: ShieldAlert,
      color: '#ef4444',
      delay: 0.3
    }
  ];

  return (
    <section id="safety" className="safety-section section-padding">
      <div className="section-header">
        <h2>Risk & Safety System</h2>
        <p>Contributing should be safe and rewarding. Understand our risk levels before starting.</p>
      </div>

      <div className="safety-grid">
        {risks.map((risk, index) => (
          <RiskCard key={index} {...risk} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="warning-banner glass-card"
      >
        <div className="warning-icon">
          <AlertTriangle color="#f59e0b" size={32} />
        </div>
        <div className="warning-text">
          <h4>Security Reminder</h4>
          <p>Never commit <code>.env</code> files, API keys, or personal credentials. Our automated systems will flag these, but stay vigilant!</p>
        </div>
      </motion.div>
    </section>
  );
};

export default SafetySystem;
