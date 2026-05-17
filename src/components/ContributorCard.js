import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, MessageSquare, GitPullRequest, Calendar } from 'lucide-react';
import '../css/ContributorCard.css';

const ContributorCard = ({ user, delay }) => {
  // Theme styling based on custom theme variable
  const themeClass = user.theme ? `theme-${user.theme}` : 'theme-indigo';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -10 }}
      className={`contributor-card glass-card ${themeClass}`}
    >
      <div className="card-glow"></div>
      <div className="card-header">
        <div className="profile-img-container">
          <img src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.login || 'guest'}&background=random&color=fff&size=150&bold=true`} alt={user.login || 'contributor'} className="profile-img" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="animated-border"
          ></motion.div>
        </div>
        <div className="profile-info">
          <h3>@{user.login || 'username'}</h3>
          <span className="badge-small">{user.rank || 'Bronze'} Contributor</span>
        </div>
      </div>
      
      <p className="user-bio">{user.bio || user.customBio || "Passionate open-source enthusiast contributing to the Sutradhar ecosystem."}</p>
      
      <div className="user-stats-grid">
        <div className="user-stat">
          <GitPullRequest size={14} />
          <span>{user.contributions || 0} PRs</span>
        </div>
        <div className="user-stat">
          <MessageSquare size={14} />
          <span>{user.issues_solved || 0} Issues</span>
        </div>
        <div className="user-stat">
          <Zap size={14} />
          <span>{user.streak || 0} Streak</span>
        </div>
        <div className="user-stat">
          <Calendar size={14} />
          <span>{user.joined || '2026-05-17'}</span>
        </div>
      </div>

      <div className="skills-tags">
        {(user.skills || ['Git', 'Markdown', 'JavaScript']).map(skill => (
          <span key={skill} className="skill-tag">{skill}</span>
        ))}
      </div>

      <a href={user.html_url || `https://github.com/${user.login || ''}`} target="_blank" rel="noreferrer" className="github-link">
        <Globe size={16} />
        View Profile
      </a>
    </motion.div>
  );
};

export default ContributorCard;

