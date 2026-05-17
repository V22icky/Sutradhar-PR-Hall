import React from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, Users, Star, GitBranch, ShieldCheck, Zap } from 'lucide-react';
import '../css/Components.css';

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="stat-card glass-card"
  >
    <div className="stat-icon" style={{ backgroundColor: `${color}15`, color }}>
      <Icon size={24} />
    </div>
    <div className="stat-info">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  </motion.div>
);

const StatsDashboard = () => {
  const stats = [
    { icon: Users, label: 'Total Contributors', value: '1,284', color: '#312e81', delay: 0.1 },
    { icon: GitPullRequest, label: 'PRs Merged', value: '3,452', color: '#0f766e', delay: 0.2 },
    { icon: Star, label: 'GitHub Stars', value: '8.5k', color: '#f59e0b', delay: 0.3 },
    { icon: ShieldCheck, label: 'Beginner Safe', value: '420', color: '#10b981', delay: 0.4 },
    { icon: Zap, label: 'Avg. Merge Time', value: '4h', color: '#8b5cf6', delay: 0.5 },
    { icon: GitBranch, label: 'Active Repos', value: '12', color: '#ef4444', delay: 0.6 },
  ];

  return (
    <section className="stats-dashboard section-padding">
      <div className="section-header">
        <h2>Project Momentum</h2>
        <p>Real-time statistics from our thriving open-source community.</p>
      </div>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default StatsDashboard;
