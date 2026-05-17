import React from 'react';
import { motion } from 'framer-motion';
import { Search, GitBranch, GitFork, Edit, GitPullRequest, CheckCircle, Star } from 'lucide-react';
import '../css/Misc.css';

const RoadmapNode = ({ icon: Icon, title, delay, active }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className={`roadmap-node ${active ? 'active' : ''}`}
  >
    <div className="node-icon">
      <Icon size={24} />
    </div>
    <span className="node-title">{title}</span>
  </motion.div>
);

const Roadmap = () => {
  const nodes = [
    { icon: Search, title: 'Learn GitHub', delay: 0.1, active: true },
    { icon: GitBranch, title: 'Understand Issues', delay: 0.2, active: true },
    { icon: GitFork, title: 'Fork Repository', delay: 0.3, active: true },
    { icon: Edit, title: 'Make Changes', delay: 0.4, active: true },
    { icon: GitPullRequest, title: 'Open PR', delay: 0.5, active: true },
    { icon: CheckCircle, title: 'Get Merged', delay: 0.6, active: true },
    { icon: Star, title: 'Contributor', delay: 0.7, active: true },
  ];

  return (
    <section className="roadmap-section section-padding">
      <div className="section-header">
        <h2>Open Source Journey</h2>
        <p>The "Sutradhar" thread that connects you to the world of open source.</p>
      </div>

      <div className="roadmap-container">
        <div className="roadmap-thread">
          <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <motion.path 
              d="M 0 50 Q 250 10 500 50 T 1000 50"
              fill="none"
              stroke="var(--primary-indigo)"
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>
        
        <div className="roadmap-nodes">
          {nodes.map((node, index) => (
            <RoadmapNode key={index} {...node} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
