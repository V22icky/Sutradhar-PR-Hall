import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, MessageSquare, Milestone, UserPlus } from 'lucide-react';
import '../css/TimelineFlow.css';

const TimelineItem = ({ icon: Icon, title, description, date, type, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className={`timeline-item ${type}`}
  >
    <div className="timeline-node">
      <Icon size={16} />
    </div>
    <div className="timeline-content glass-card">
      <span className="timeline-date">{date}</span>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </motion.div>
);

const Timeline = () => {
  const activities = [
    { 
      icon: GitPullRequest, 
      title: 'New PR Merged: feat(ui): add leaderboard', 
      description: 'Merged by @maintainer_mike. Added interactive filters and search.',
      date: '2 hours ago',
      type: 'pr',
      delay: 0.1 
    },
    { 
      icon: UserPlus, 
      title: 'Welcome @new_dev!', 
      description: 'First contribution merged to the Sutradhar repository.',
      date: '5 hours ago',
      type: 'user',
      delay: 0.2 
    },
    { 
      icon: Milestone, 
      title: 'Project Milestone: 1000 Contributors', 
      description: 'Sutradhar has reached a massive milestone of 1000 unique contributors!',
      date: '1 day ago',
      type: 'milestone',
      delay: 0.3 
    },
    { 
      icon: MessageSquare, 
      title: 'RFC: Redesigning the Roadmap', 
      description: 'New discussion opened in GitHub Discussions about the future roadmap.',
      date: '2 days ago',
      type: 'discussion',
      delay: 0.4 
    }
  ];

  return (
    <section id="timeline" className="timeline-section section-padding">
      <div className="section-header">
        <h2>Activity Stream</h2>
        <p>The heartbeat of Sutradhar. See the latest movements in our ecosystem.</p>
      </div>
      
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {activities.map((activity, index) => (
          <TimelineItem key={index} {...activity} />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
