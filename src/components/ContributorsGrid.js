import React, { useState, useEffect } from 'react';
import ContributorCard from './ContributorCard';
import { fetchEnrichedContributors } from '../api/githubService';
import '../css/ContributorCard.css';

const ContributorsGrid = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContributors = async () => {
      try {
        const data = await fetchEnrichedContributors();
        setContributors(data);
      } catch (err) {
        console.error("Failed to load enriched contributors:", err);
      } finally {
        setLoading(false);
      }
    };
    loadContributors();
  }, []);

  return (
    <section className="contributors-grid-section section-padding" id="contributors-grid">
      <div className="section-header">
        <h2>Top Contributors</h2>
        <p>Meet the incredible developers showcase their profiles in our ecosystem.</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <div className="live-dot" style={{ width: '12px', height: '12px' }}></div>
          <span style={{ marginLeft: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Loading contributor directory...</span>
        </div>
      ) : (
        <div className="grid-container">
          {contributors.map((c, i) => (
            <ContributorCard key={c.id || c.username} user={c} delay={i * 0.1} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ContributorsGrid;

