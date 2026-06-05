import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getSavedCareers, getCareerSuggestions } from '../api';
import Navbar from '../components/Navbar';

const domainEmojis = { 'Technology': '💻', 'Design': '🎨', 'Business': '💼', 'Finance': '📊', 'Healthcare': '🩺', 'Law': '⚖️', 'Engineering': '⚙️', 'Media': '🎬', 'Education': '📚', 'Government': '🏛️', 'Arts & Entertainment': '🎭', 'Science': '🔬', 'Marketing': '📣', 'Hospitality': '🏨', 'Social Work': '🤝' };

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('saved');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [savedRes, suggRes] = await Promise.all([
        getSavedCareers(),
        user?.stream ? getCareerSuggestions({ stream: user.stream }) : Promise.resolve({ data: [] }),
      ]);
      setSaved(savedRes.data);
      setSuggestions(suggRes.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const streamColor = { Science: '#64B5F6', Commerce: '#FFB74D', Arts: '#F48FB1', Engineering: '#81C784', Medical: '#F06292', Law: '#CE93D8' };

  return (
    <div style={s.page}>
      <div style={s.bgGrid} /><div style={s.glow1} /><div style={s.glow2} />
      <Navbar />

      <motion.div style={s.content} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        {/* Profile hero */}
        <div style={s.profileHero}>
          <div style={s.heroGlow} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '24px' }}>
            <motion.div style={s.avatar}
              initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </motion.div>
            <div style={{ flex: 1 }}>
              <h1 style={s.profileName}>{user?.name || 'Explorer'}</h1>
              <p style={s.profileEmail}>{user?.email}</p>
              <div style={s.tagsRow}>
                {user?.education_level && <span style={s.tag}>{user.education_level}</span>}
                {user?.stream && <span style={{ ...s.tag, background: `${streamColor[user.stream] || '#9B7FD4'}20`, color: streamColor[user.stream] || '#9B7FD4', borderColor: `${streamColor[user.stream] || '#9B7FD4'}40` }}>{user.stream}</span>}
                {user?.degree && <span style={s.tag}>{user.degree}</span>}
              </div>
            </div>
            <div style={s.statsWrap}>
              <div style={s.statItem}>
                <p style={s.statNum}>{saved.length}</p>
                <p style={s.statLabel}>Saved</p>
              </div>
              <div style={s.statDivider} />
              <div style={s.statItem}>
                <p style={s.statNum}>{suggestions.length}</p>
                <p style={s.statLabel}>Suggested</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          <button style={{ ...s.tab, ...(activeTab === 'saved' ? s.tabActive : {}) }} onClick={() => setActiveTab('saved')}>❤️ Saved ({saved.length})</button>
          <button style={{ ...s.tab, ...(activeTab === 'suggested' ? s.tabActive : {}) }} onClick={() => setActiveTab('suggested')}>✨ For You ({suggestions.length})</button>
        </div>

        {/* Cards */}
        {loading ? (
          <div style={s.grid}>
            {[...Array(4)].map((_, i) => (
              <motion.div key={i} style={{ height: '140px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}
                animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        ) : (
          <div style={s.grid}>
            {(activeTab === 'saved' ? saved : suggestions).map((c, i) => (
              <motion.div key={c.id} style={s.card}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5, borderColor: 'rgba(124,92,191,0.35)', boxShadow: '0 12px 32px rgba(124,92,191,0.12)' }}
                onClick={() => navigate(`/career/${c.id}`)}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={s.cardIcon}>{domainEmojis[c.domain] || '📌'}</div>
                  <div style={{ flex: 1 }}>
                    <p style={s.cardTitle}>{c.title}</p>
                    <p style={s.cardDomain}>{c.domain}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={s.salary}>₹{(c.avg_salary_min / 100000).toFixed(1)}L — ₹{(c.avg_salary_max / 100000).toFixed(1)}L</p>
                  <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '8px', fontWeight: '800',
                    color: c.growth_outlook === 'Excellent' ? '#4CAF82' : c.growth_outlook === 'Good' ? '#64B5F6' : '#FFB74D',
                    background: c.growth_outlook === 'Excellent' ? 'rgba(76,175,130,0.12)' : c.growth_outlook === 'Good' ? 'rgba(100,181,246,0.12)' : 'rgba(255,183,77,0.12)',
                  }}>{c.growth_outlook}</span>
                </div>
                {activeTab === 'saved' && c.saved_at && (
                  <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', marginTop: '8px', fontWeight: '600' }}>
                    Saved {new Date(c.saved_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                )}
              </motion.div>
            ))}

            {(activeTab === 'saved' ? saved : suggestions).length === 0 && (
              <motion.div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p style={{ fontSize: '3rem', marginBottom: '12px' }}>{activeTab === 'saved' ? '🤍' : '✨'}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '700', marginBottom: '16px' }}>
                  {activeTab === 'saved' ? 'No saved careers yet!' : 'Complete onboarding to get suggestions!'}
                </p>
                <motion.button style={s.exploreBtn} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('/home')}>
                  Explore Careers →
                </motion.button>
              </motion.div>
            )}
          </div>
        )}

        {/* Logout */}
        <motion.button style={s.logoutBtn} whileHover={{ scale: 1.03, borderColor: 'rgba(255,107,138,0.4)' }} whileTap={{ scale: 0.97 }}
          onClick={() => { logout(); navigate('/login'); }}
        >🚪 Sign Out</motion.button>
      </motion.div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg,#0D0620 0%,#1A0840 60%,#0D0620 100%)', display: 'flex', position: 'relative', overflow: 'hidden' },
  bgGrid: { position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(124,92,191,0.05) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 },
  glow1: { position: 'fixed', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,92,191,0.08) 0%,transparent 70%)', top: '-150px', left: '-150px', pointerEvents: 'none', zIndex: 0 },
  glow2: { position: 'fixed', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,168,37,0.05) 0%,transparent 70%)', bottom: '-100px', right: '-100px', pointerEvents: 'none', zIndex: 0 },
  content: { flex: 1, marginLeft: '70px', padding: '32px 48px', zIndex: 1, overflowY: 'auto', maxHeight: '100vh' },
  profileHero: { background: 'rgba(255,255,255,0.04)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '28px', position: 'relative', overflow: 'hidden' },
  heroGlow: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left,rgba(124,92,191,0.1) 0%,transparent 60%)', pointerEvents: 'none' },
  avatar: { width: '68px', height: '68px', borderRadius: '18px', background: 'linear-gradient(135deg,#7C5CBF,#9B7FD4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '900', color: '#fff', flexShrink: 0, boxShadow: '0 8px 24px rgba(124,92,191,0.4)' },
  profileName: { fontSize: '1.6rem', fontWeight: '900', color: '#fff', marginBottom: '4px', letterSpacing: '-0.3px' },
  profileEmail: { fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', marginBottom: '12px', fontWeight: '500' },
  tagsRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  tag: { fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', padding: '4px 10px', borderRadius: '8px', fontWeight: '700', border: '1px solid rgba(255,255,255,0.08)' },
  statsWrap: { display: 'flex', gap: '16px', alignItems: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '14px 20px', border: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 },
  statItem: { textAlign: 'center' },
  statNum: { fontSize: '1.4rem', fontWeight: '900', color: '#9B7FD4' },
  statLabel: { fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' },
  statDivider: { width: '1px', height: '36px', background: 'rgba(255,255,255,0.06)' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '24px' },
  tab: { padding: '10px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'Nunito,sans-serif', transition: 'all 0.2s' },
  tabActive: { background: 'rgba(124,92,191,0.15)', color: '#C4A8E8', borderColor: 'rgba(124,92,191,0.3)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '14px', marginBottom: '32px' },
  card: { background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', transition: 'all 0.2s' },
  cardIcon: { width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(124,92,191,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0, border: '1px solid rgba(124,92,191,0.2)' },
  cardTitle: { fontSize: '0.9rem', fontWeight: '800', color: '#fff', lineHeight: 1.3, marginBottom: '3px' },
  cardDomain: { fontSize: '0.72rem', color: '#9B7FD4', fontWeight: '700' },
  salary: { fontSize: '0.78rem', color: '#4CAF82', fontWeight: '800' },
  exploreBtn: { padding: '12px 24px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#7C5CBF,#9B7FD4)', color: '#fff', fontSize: '0.9rem', fontWeight: '800', cursor: 'pointer', fontFamily: 'Nunito,sans-serif' },
  logoutBtn: { padding: '11px 22px', borderRadius: '12px', border: '1px solid rgba(255,107,138,0.15)', background: 'rgba(255,107,138,0.05)', color: 'rgba(255,107,138,0.6)', fontSize: '0.88rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'Nunito,sans-serif', transition: 'all 0.2s' },
};