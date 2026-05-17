import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Award, Filter, Search } from 'lucide-react';
import { fetchEnrichedContributors } from '../api/githubService';
import '../css/Components.css';

const Leaderboard = () => {
  const [filter, setFilter] = useState('Most PRs');
  const [searchTerm, setSearchTerm] = useState('');
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContributors = async () => {
      try {
        const data = await fetchEnrichedContributors();
        setContributors(data);
      } catch (err) {
        console.error("Failed to load leaderboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadContributors();
  }, []);

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return <Trophy color="#f59e0b" size={24} />;
      case 1: return <Medal color="#94a3b8" size={24} />;
      case 2: return <Award color="#b45309" size={24} />;
      default: return <span className="rank-number">{index + 1}</span>;
    }
  };

  // Filter and sort the contributors list dynamically
  const getProcessedContributors = () => {
    // 1. Filter by search term (name or username)
    let list = contributors.filter(c => {
      const matchName = c.name ? c.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
      const matchLogin = c.login ? c.login.toLowerCase().includes(searchTerm.toLowerCase()) : false;
      return matchName || matchLogin;
    });

    // 2. Sort based on active filter
    if (filter === 'Most PRs') {
      list.sort((a, b) => b.contributions - a.contributions);
    } else if (filter === 'Most active') {
      list.sort((a, b) => b.streak - a.streak);
    } else if (filter === 'Recently contributed') {
      list.sort((a, b) => new Date(b.joined) - new Date(a.joined));
    }

    return list;
  };

  const processedList = getProcessedContributors();

  return (
    <section id="leaderboard" className="leaderboard-section section-padding">
      <div className="section-header">
        <h2>Contributor Hall of Fame</h2>
        <p>Celebrating the incredible developers who keep Sutradhar moving forward.</p>
      </div>

      <div className="leaderboard-controls">
        <div className="search-bar glass-card">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search contributors..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} />
          {['Most PRs', 'Most active', 'Recently contributed'].map((f) => (
            <button 
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <div className="live-dot" style={{ width: '12px', height: '12px' }}></div>
          <span style={{ marginLeft: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Loading leaderboard statistics...</span>
        </div>
      ) : (
        <div className="leaderboard-table glass-card">
          <div className="table-header">
            <span>Rank</span>
            <span>Contributor</span>
            <span className="desktop-only">PRs Merged</span>
            <span className="desktop-only">Issues Solved</span>
            <span>Streak</span>
            <span className="desktop-only">Joined</span>
          </div>
          
          <div className="table-body">
            <AnimatePresence>
              {processedList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No contributors found matching "{searchTerm}".
                </div>
              ) : (
                processedList.map((c, i) => (
                  <motion.div 
                    key={c.id || c.username}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="table-row"
                  >
                    <div className="rank-cell">
                      {getRankIcon(i)}
                    </div>
                    <div className="user-cell">
                      <img src={c.avatar_url || `https://ui-avatars.com/api/?name=${c.login}&background=random&color=fff&size=150&bold=true`} alt={c.login} />
                      <div>
                        <span className="username">@{c.login}</span>
                        <span className="badge-small" style={{
                          background: c.theme === 'teal' ? 'rgba(20, 184, 166, 0.1)' : 
                                      c.theme === 'violet' ? 'rgba(139, 92, 246, 0.1)' :
                                      c.theme === 'emerald' ? 'rgba(16, 185, 129, 0.1)' :
                                      c.theme === 'rose' ? 'rgba(244, 63, 94, 0.1)' :
                                      c.theme === 'amber' ? 'rgba(245, 158, 11, 0.1)' :
                                      'rgba(99, 102, 241, 0.1)',
                          color: c.theme === 'teal' ? '#14b8a6' : 
                                 c.theme === 'violet' ? '#8b5cf6' :
                                 c.theme === 'emerald' ? '#10b981' :
                                 c.theme === 'rose' ? '#f43f5e' :
                                 c.theme === 'amber' ? '#f59e0b' :
                                 '#6366f1'
                        }}>{c.rank}</span>
                      </div>
                    </div>
                    <div className="stat-cell desktop-only">{c.contributions}</div>
                    <div className="stat-cell desktop-only">{c.issues_solved}</div>
                    <div className="streak-cell">
                      <div className="streak-dot" style={{
                        background: c.theme === 'teal' ? '#14b8a6' : 
                                    c.theme === 'violet' ? '#8b5cf6' :
                                    c.theme === 'emerald' ? '#10b981' :
                                    c.theme === 'rose' ? '#f43f5e' :
                                    c.theme === 'amber' ? '#f59e0b' :
                                    '#10b981',
                        boxShadow: `0 0 8px ${
                          c.theme === 'teal' ? '#14b8a6' : 
                          c.theme === 'violet' ? '#8b5cf6' :
                          c.theme === 'emerald' ? '#10b981' :
                          c.theme === 'rose' ? '#f43f5e' :
                          c.theme === 'amber' ? '#f59e0b' :
                          '#10b981'
                        }`
                      }}></div>
                      {c.streak} days
                    </div>
                    <div className="date-cell desktop-only">{c.joined}</div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  );
};

export default Leaderboard;

