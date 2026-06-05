import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getCareerSuggestions } from '../api';

const WelcomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (user?.stream) {
      getCareerSuggestions({ stream: user.stream }).then(res => setSuggestions(res.data)).catch(console.error);
    }
  }, [user]);

  return (
    <div style={s.page}>
      {[...Array(40)].map((_, i) => (
        <motion.div key={i} style={{ position: 'absolute', width: '2px', height: '2px', borderRadius: '50%', background: '#fff', left: `${(i * 17 + 3) % 100}%`, top: `${(i * 13 + 7) % 100}%` }}
          animate={{ opacity: [0.1, 0.6, 0.1] }} transition={{ duration: 2 + i % 3, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,92,191,0.15) 0%,transparent 70%)', top: '-200px', left: '-200px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,168,37,0.1) 0%,transparent 70%)', bottom: '-150px', right: '-150px', pointerEvents: 'none' }} />

      <AnimatePresence mode="wait">
        {!showSuggestions ? (
          <motion.div key="welcome" style={s.welcomeWrap} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 80, damping: 12 }} style={{ textAlign: 'center', position: 'relative' }}>
              <motion.div style={{ fontSize: '8rem', filter: 'drop-shadow(0 0 40px rgba(124,92,191,0.8))' }}
                animate={{ y: [0, -16, 0], rotate: [-3, 3, -3] }} transition={{ duration: 3.5, repeat: Infinity }}
              >🧑‍🚀</motion.div>
              {[...Array(6)].map((_, i) => (
                <motion.span key={i} style={{ position: 'absolute', fontSize: '1rem', color: '#F9A825', left: `${30 + i * 8}%`, top: `${15 + (i % 3) * 20}%` }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >✦</motion.span>
              ))}
            </motion.div>

            <motion.div style={s.bubble} initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.6, type: 'spring', stiffness: 140 }}>
              <motion.p style={{ color: '#9B7FD4', fontWeight: '700', marginBottom: '8px', fontSize: '1rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>Hey {user?.name?.split(' ')[0] || 'Explorer'}! 👋</motion.p>
              <motion.h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#fff', marginBottom: '12px', lineHeight: 1.2 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>Chak De Fatte! 🌟</motion.h2>
              <motion.p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontWeight: '500', marginBottom: '24px', fontSize: '0.95rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                CareerLens is with you on this journey. I believe you will find something truly amazing today. The stars are waiting for you! 🚀
              </motion.p>
              <motion.div style={{ width: '48px', height: '3px', background: 'linear-gradient(90deg,#7C5CBF,#F9A825)', borderRadius: '10px', margin: '0 auto 20px' }} initial={{ width: 0 }} animate={{ width: '48px' }} transition={{ delay: 1.8 }} />
              <motion.button style={s.btn} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setShowSuggestions(true)}
              >Show me my careers ✨</motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="suggestions" style={s.suggCard} initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 150, damping: 18 }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <motion.div style={{ fontSize: '2.5rem', marginBottom: '10px' }} animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1, delay: 0.3 }}>✨</motion.div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>Picked just for you!</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '500' }}>Based on your <strong style={{ color: '#9B7FD4' }}>{user?.stream}</strong> background</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px', marginBottom: '20px' }}>
              {suggestions.map((c, i) => (
                <motion.div key={c.id} style={s.sCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4, borderColor: '#7C5CBF' }}>
                  <p style={{ fontWeight: '800', color: '#fff', marginBottom: '8px', fontSize: '0.9rem', lineHeight: 1.3 }}>{c.title}</p>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(124,92,191,0.2)', color: '#9B7FD4', padding: '2px 8px', borderRadius: '10px', fontWeight: '700', display: 'inline-block', marginBottom: '6px' }}>{c.domain}</span>
                  <p style={{ fontSize: '0.78rem', color: '#4CAF82', fontWeight: '700' }}>₹{(c.avg_salary_min / 100000).toFixed(1)}L — ₹{(c.avg_salary_max / 100000).toFixed(1)}L/yr</p>
                </motion.div>
              ))}
            </div>
            <p style={{ fontSize: '0.82rem', color: '#9B7FD4', textAlign: 'center', background: 'rgba(124,92,191,0.1)', padding: '10px', borderRadius: '10px', marginBottom: '20px', fontWeight: '600' }}>💾 Saved to your profile — find them anytime!</p>
            <motion.button style={{ ...s.btn, width: '100%' }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/home')}>Open CareerLens 🔍</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const s = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg,#0D0620 0%,#1A0840 50%,#0D0620 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' },
  welcomeWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', maxWidth: '500px', width: '100%', zIndex: 10 },
  bubble: { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', borderRadius: '28px', padding: '36px 40px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 56px rgba(0,0,0,0.4)', textAlign: 'center', width: '100%' },
  btn: { padding: '14px 28px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#7C5CBF,#9B7FD4)', color: '#fff', fontSize: '1rem', fontWeight: '800', cursor: 'pointer', boxShadow: '0 6px 20px rgba(124,92,191,0.5)', fontFamily: 'Nunito,sans-serif' },
  suggCard: { background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)', borderRadius: '28px', padding: '40px 36px', width: '100%', maxWidth: '580px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)', zIndex: 10 },
  sCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s' },
};

export default WelcomePage;