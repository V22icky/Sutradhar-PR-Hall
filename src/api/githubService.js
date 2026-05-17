// Fetch data from GitHub API for the Sutradhar repo
const BASE_URL = 'https://api.github.com/repos/webdeveloperdesigner/Sutradhar';

export const fetchRepoStats = async () => {
  try {
    const response = await fetch(BASE_URL);
    return await response.json();
  } catch (error) {
    console.error('Error fetching repo stats:', error);
    return null;
  }
};

export const fetchContributors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contributors`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching contributors:', error);
    return [];
  }
};

export const fetchPullRequests = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pulls?state=all&per_page=10`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching PRs:', error);
    return [];
  }
};

// Mock data for initial development or tests fallback
export const mockContributors = [
  {
    id: 1,
    login: 'alex_dev',
    avatar_url: 'https://i.pravatar.cc/150?u=alex',
    contributions: 45,
    issues_solved: 12,
    streak: 8,
    rank: 'Gold',
    joined: '2024-01-15'
  },
  {
    id: 2,
    login: 'sarah_codes',
    avatar_url: 'https://i.pravatar.cc/150?u=sarah',
    contributions: 32,
    issues_solved: 8,
    streak: 5,
    rank: 'Silver',
    joined: '2024-02-10'
  },
  {
    id: 3,
    login: 'beginner_joe',
    avatar_url: 'https://i.pravatar.cc/150?u=joe',
    contributions: 18,
    issues_solved: 4,
    streak: 3,
    rank: 'Bronze',
    joined: '2024-03-05'
  }
];

// Dynamically loads all local profile JSON files from the 'contributors' folder
export const getLocalContributors = () => {
  try {
    // Webpack specific context dynamic directory loading
    const context = require.context('../contributors', false, /\.json$/);
    return context.keys()
      .filter(key => !key.includes('username.json')) // Skip the templates/placeholder files
      .map(key => context(key));
  } catch (error) {
    console.warn('Require.context is not supported in this environment (likely testing or build setup). Using mock data fallback:', error.message);
    return [
      {
        name: "Vivek Kumar",
        username: "webdeveloperdesigner",
        bioType: "React Developer",
        customBio: "Building modern interfaces with beautiful animations and clean code.",
        skills: ["React", "CSS", "Framer Motion", "JavaScript"],
        socials: { github: "https://github.com/webdeveloperdesigner" },
        theme: "indigo"
      },
      {
        name: "Aman Codes",
        username: "aman-codes",
        bioType: "Backend Builder",
        customBio: "Node.js enthusiast. Loving databases, microservices, and fast APIs.",
        skills: ["Node.js", "Express", "MongoDB", "Git"],
        socials: { github: "https://github.com/aman-codes" },
        theme: "teal"
      }
    ];
  }
};

// Fetches live user statistics from GitHub API with Caching and Seed-based offline fallbacks
export const fetchContributorStats = async (username) => {
  try {
    // 1. LocalStorage Caching (1 Hour TTL)
    const cacheKey = `gh_stats_${username.toLowerCase()}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 3600000) {
        return parsed.stats;
      }
    }

    // 2. Fetch User Avatar and repos counts from GitHub API
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error('User not found');
    const userData = await userRes.json();

    // Calculate simulated dashboard metrics for user stats
    const contributions = userData.public_repos + userData.followers > 0 
      ? Math.min(userData.public_repos * 3 + Math.floor(userData.followers / 2), 48)
      : 6;
    const issuesSolved = Math.floor(contributions / 3) + 1;
    const merged = Math.max(Math.floor(contributions * 0.8), 2);
    const streak = Math.min(Math.floor(contributions / 4) + 1, 8);
    const rank = contributions > 35 ? 'Gold' : contributions > 15 ? 'Silver' : 'Bronze';

    const stats = {
      avatar_url: userData.avatar_url,
      contributions: contributions,
      issues_solved: issuesSolved,
      streak: streak,
      joined: userData.created_at ? userData.created_at.split('T')[0] : '2026-05-17',
      rank: rank,
      html_url: userData.html_url
    };

    // Store in cache
    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      stats
    }));

    return stats;
  } catch (error) {
    console.warn(`Failed to fetch live stats for '${username}' (Offline or Rate-Limited). Using deterministic seed fallback:`, error.message);
    
    // 3. Graceful Deterministic Seed Fallback based on Username String Hash
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const seed = Math.abs(hash);
    const contributions = (seed % 35) + 5;
    const issues = Math.floor(contributions / 3) + 1;
    const streak = (seed % 6) + 1;
    const rank = contributions > 30 ? 'Gold' : contributions > 15 ? 'Silver' : 'Bronze';
    const month = (seed % 11) + 1;
    const day = (seed % 27) + 1;

    return {
      avatar_url: `https://ui-avatars.com/api/?name=${username}&background=random&color=fff&size=150&bold=true`,
      contributions: contributions,
      issues_solved: issues,
      streak: streak,
      joined: `2024-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`,
      rank: rank,
      html_url: `https://github.com/${username}`
    };
  }
};

// Combines local profiles JSON list with GitHub metrics, returning a sorted list
export const fetchEnrichedContributors = async () => {
  const localProfiles = getLocalContributors();
  const enriched = await Promise.all(
    localProfiles.map(async (user) => {
      const stats = await fetchContributorStats(user.username);
      return {
        id: user.username,
        login: user.username,
        name: user.name,
        bioType: user.bioType,
        bio: user.customBio,
        skills: user.skills,
        theme: user.theme,
        socials: user.socials,
        ...stats
      };
    })
  );
  
  // Sort contributors descending by contributions
  return enriched.sort((a, b) => b.contributions - a.contributions);
};

