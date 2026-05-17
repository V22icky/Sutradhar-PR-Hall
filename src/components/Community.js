import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Globe, MessageSquare, Send, Heart } from 'lucide-react';
import '../css/Misc.css';

const Community = () => {
  return (
    <section className="community-section section-padding">
      <div className="section-header">
        <h2>Join the Community</h2>
        <p>Beyond code, we are a family of learners and mentors.</p>
      </div>

      <div className="community-grid">
        <motion.a 
          whileHover={{ y: -5 }}
          href="#" 
          className="community-card glass-card discord"
        >
          <MessageCircle size={32} />
          <h3>Discord</h3>
          <p>Join our real-time chat for help and mentorship.</p>
        </motion.a>

        <motion.a 
          whileHover={{ y: -5 }}
          href="#" 
          className="community-card glass-card github"
        >
          <MessageSquare size={32} />
          <h3>Discussions</h3>
          <p>Propose new ideas and participate in RFCs.</p>
        </motion.a>

        <motion.div 
          whileHover={{ y: -5 }}
          className="community-card glass-card spotlight"
        >
          <Heart size={32} color="#ef4444" />
          <h3>Contributor Spotlight</h3>
          <p>Each month we celebrate one standout beginner.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
