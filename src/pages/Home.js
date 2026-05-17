import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsDashboard from '../components/StatsDashboard';
import ContributorsGrid from '../components/ContributorsGrid';
import Leaderboard from '../components/Leaderboard';
import Timeline from '../components/Timeline';
import ContributionFlow from '../components/ContributionFlow';
import SafetySystem from '../components/SafetySystem';
import Roadmap from '../components/Roadmap';
import Community from '../components/Community';
import Footer from '../components/Footer';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        // Wait briefly for resources to load/layout
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <main className="home-page">
      <Navbar />
      <Hero />
      <div className="container">
        <StatsDashboard />
        <ContributorsGrid />
        <Leaderboard />
        <Timeline />
        <ContributionFlow />
        <SafetySystem />
        <Roadmap />
        <Community />
      </div>
      <Footer />
    </main>
  );
};

export default Home;

