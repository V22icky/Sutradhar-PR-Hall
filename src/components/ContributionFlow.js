import React from 'react';
import { motion } from 'framer-motion';
import { GitFork, Terminal, Download, Edit3, GitCommit, Upload, GitPullRequest } from 'lucide-react';
import '../css/TimelineFlow.css';

const StepCard = ({ number, title, description, icon: Icon, command, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="step-card glass-card"
  >
    <div className="step-header">
      <div className="step-number">{number}</div>
      <div className="step-icon">
        <Icon size={24} />
      </div>
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    {command && (
      <div className="step-command">
        <Terminal size={14} />
        <code>{command}</code>
      </div>
    )}
  </motion.div>
);

const ContributionFlow = () => {
  const steps = [
    {
      number: '01',
      title: 'Fork Repository',
      description: 'Create your own copy of the Sutradhar repository on your GitHub account.',
      icon: GitFork,
      delay: 0.1
    },
    {
      number: '02',
      title: 'Clone Repository',
      description: 'Download your fork to your local machine using Git.',
      icon: Download,
      command: 'git clone https://github.com/your-username/Sutradhar.git',
      delay: 0.2
    },
    {
      number: '03',
      title: 'Install Dependencies',
      description: 'Set up the development environment by installing all required packages.',
      icon: Terminal,
      command: 'npm install && npm run dev',
      delay: 0.3
    },
    {
      number: '04',
      title: 'Make Changes',
      description: 'Find a beginner-friendly issue and implement your solution or improvement.',
      icon: Edit3,
      delay: 0.4
    },
    {
      number: '05',
      title: 'Commit Changes',
      description: 'Save your changes locally with a descriptive commit message.',
      icon: GitCommit,
      command: 'git commit -m "feat: your contribution"',
      delay: 0.5
    },
    {
      number: '06',
      title: 'Push Changes',
      description: 'Upload your local commits to your GitHub fork.',
      icon: Upload,
      command: 'git push origin your-branch',
      delay: 0.6
    },
    {
      number: '07',
      title: 'Create Pull Request',
      description: 'Submit your changes to the main Sutradhar repository for review.',
      icon: GitPullRequest,
      delay: 0.7
    }
  ];

  return (
    <section id="guide" className="flow-section section-padding">
      <div className="section-header">
        <h2>Your First Contribution</h2>
        <p>A step-by-step guide to making your mark on Sutradhar.</p>
      </div>
      <div className="flow-grid">
        {steps.map((step, index) => (
          <StepCard key={index} {...step} />
        ))}
      </div>
    </section>
  );
};

export default ContributionFlow;
