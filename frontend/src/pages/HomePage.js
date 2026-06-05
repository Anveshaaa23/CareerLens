import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getAllCareers, getDomains, saveCareer, unsaveCareer } from '../api';
import Navbar from '../components/Navbar';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const domainEmojis = { 'Technology': '💻', 'Design': '🎨', 'Business': '💼', 'Finance': '📊', 'Healthcare': '🩺', 'Law': '⚖️', 'Engineering': '⚙️', 'Media': '🎬', 'Education': '📚', 'Government': '🏛️', 'Arts & Entertainment': '🎭', 'Science': '🔬', 'Marketing': '📣', 'Hospitality': '🏨', 'Social Work': '🤝' };

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeDomain, setActiveDomain] = useState('All');
  const [activeLetter, setActiveLetter] = useState('All');
  const [savedMap, setSavedMap] = useState({});
  const [page, setPage] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const PER_PAGE = 9;

  useEffect(() => { fetchCareers(); fetchDomains(); }, []);

  const fetchCareers = async (p = {}) => {
    setLoading(true);
    try { const r = await getAllCareers(p); setCareers(r.data.careers); setPage(0); }
    catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const fetchDomains = async () => {
    try { const r = await getDomains(); setDomains(r.data); } catch (e) { console.error(e); }
  };

  const handleSearch = (val) => {
    setSearch(val); setActiveLetter('All'); setActiveDomain('All');
    if (val.trim()) fetchCareers({ search: val }); else fetchCareers();
  };

  const handleDomain = (d) => {
    setActiveDomain(d); setActiveLetter('All'); setSearch('');
    if (d === 'All') fetchCareers(); else fetchCareers({ domain: d });
    setSidebarOpen(false);
  };

  const handleLetter = (l) => {
    setActiveLetter(l); setActiveDomain('All'); setSearch('');
    fetchCareers({ search: l });
  };

  const toggleSave = async (e, id) => {
    e.stopPropagation();
    try {
      if (savedMap[id]) { await unsaveCareer(id); setSavedMap(p => ({ ...p, [id]: false })); }
      else { await saveCareer(id); setSavedMap(p => ({ ...p, [id]: true })); }
    } catch (e) { console.error(e); }
  };

  const filtered = activeLetter === 'All' ? careers : careers.filter(c => c.title.startsWith(activeLetter));
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div style={s.page}>
      {/* Background */}
      <div style={s.bgGrid} />
      <div style={s.glow1} /><div style={s.glow2} />
      <Navbar />

      <div style={s.main}>
        {/* Top bar */}
        <div style={s.topBar}>
          <div>
            <h1 style={s.pageTitle}>Career Dictionary</h1>
            <p style={s.pageSub}>Hey {user?.name?.split(' ')[0] || 'Explorer'} 👋 — {careers.length} careers waiting for you</p>
          </div>

          {/* Search */}
          <motion.div style={{ ...s.searchWrap, ...(searchFocused ? s.searchFocused : {}) }}
            animate={{ width: searchFocused ? '300px' : '240px' }} transition={{ duration: 0.3 }}
          >
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>🔍</span>
            <input style={s.searchInput} placeholder="Search any career..."
              value={search} onChange={e => handleSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
            />
            {search && (
              <motion.button style={s.clearBtn} onClick={() => handleSearch('')} whileHover={{ scale: 1.1 }}>✕</motion.button>
            )}
          </motion.div>
        </div>

        {/* Domain pills */}
        <div style={s.domainRow}>
          {[{ domain: 'All', career_count: careers.length }, ...domains].map(d => (
            <motion.button key={d.domain}
              style={{ ...s.domainPill, ...(activeDomain === d.domain ? s.domainPillActive : {}) }}
              whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
              onClick={() => handleDomain(d.domain)}
            >
              {d.domain === 'All' ? '🌍' : domainEmojis[d.domain]} {d.domain}
              <span style={{ ...s.pillCount, ...(activeDomain === d.domain ? s.pillCountActive : {}) }}>{d.career_count}</span>
            </motion.button>
          ))}
        </div>

        {/* A-Z filter */}
        <div style={s.alphabetRow}>
          <button style={{ ...s.letterBtn, ...(activeLetter === 'All' ? s.letterActive : {}), width: 'auto', padding: '0 10px', fontSize: '0.72rem' }}
            onClick={() => { setActiveLetter('All'); setActiveDomain('All'); fetchCareers(); }}
          >ALL</button>
          {ALPHABET.map(l => (
            <motion.button key={l} style={{ ...s.letterBtn, ...(activeLetter === l ? s.letterActive : {}) }}
              whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.85 }}
              onClick={() => handleLetter(l)}
            >{l}</motion.button>
          ))}
        </div>

        {/* Cards */}
        {loading ? (
          <div style={s.grid}>
            {[...Array(9)].map((_, i) => (
              <motion.div key={i} style={s.skeleton}
                animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div key={page + activeDomain + activeLetter + search} style={s.grid}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              >
                {pageItems.map((c, i) => (
                  <motion.div key={c.id} style={s.card}
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(124,92,191,0.25)', borderColor: 'rgba(124,92,191,0.4)' }}
                    onClick={() => navigate(`/career/${c.id}`)}
                  >
                    {/* Card header */}
                    <div style={s.cardHead}>
                      <div style={s.cardIcon}>{domainEmojis[c.domain] || '📌'}</div>
                      <motion.button style={s.heartBtn}
                        onClick={e => toggleSave(e, c.id)}
                        whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.7 }}
                        animate={savedMap[c.id] ? { scale: [1, 1.5, 1] } : {}}
                      >{savedMap[c.id] ? '❤️' : '🤍'}</motion.button>
                    </div>

                    <h3 style={s.cardTitle}>{c.title}</h3>
                    <p style={s.cardDesc}>{c.description.slice(0, 88)}...</p>

                    {/* Skills */}
                    <div style={s.skillsRow}>
                      {c.skills?.slice(0, 3).map(sk => (
                        <span key={sk} style={s.skillTag}>{sk}</span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div style={s.cardFooter}>
                      <div>
                        <p style={s.domain}>{c.domain}</p>
                        <p style={s.salary}>₹{(c.avg_salary_min / 100000).toFixed(1)}L — ₹{(c.avg_salary_max / 100000).toFixed(1)}L</p>
                      </div>
                      <span style={{ ...s.growth, color: c.growth_outlook === 'Excellent' ? '#4CAF82' : c.growth_outlook === 'Good' ? '#64B5F6' : '#FFB74D', background: c.growth_outlook === 'Excellent' ? 'rgba(76,175,130,0.15)' : c.growth_outlook === 'Good' ? 'rgba(100,181,246,0.15)' : 'rgba(255,183,77,0.15)' }}>
                        {c.growth_outlook}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {pageItems.length === 0 && (
                  <motion.div style={s.empty} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '700', fontSize: '1rem' }}>No careers found!</p>
                    <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem', marginTop: '6px' }}>Try a different search or filter</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={s.pagination}>
                <motion.button style={{ ...s.pageBtn, opacity: page === 0 ? 0.4 : 1 }}
                  whileHover={{ scale: page > 0 ? 1.05 : 1 }}
                  onClick={() => page > 0 && setPage(p => p - 1)}
                >← Previous</motion.button>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {[...Array(totalPages)].map((_, i) => (
                    <motion.button key={i}
                      style={{ ...s.pageDot, ...(i === page ? s.pageDotActive : {}) }}
                      whileHover={{ scale: 1.2 }} onClick={() => setPage(i)}
                    />
                  ))}
                </div>

                <motion.button style={{ ...s.pageBtn, opacity: page === totalPages - 1 ? 0.4 : 1 }}
                  whileHover={{ scale: page < totalPages - 1 ? 1.05 : 1 }}
                  onClick={() => page < totalPages - 1 && setPage(p => p + 1)}
                >Next →</motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg,#0D0620 0%,#1A0840 60%,#0D0620 100%)', display: 'flex', position: 'relative', overflow: 'hidden' },
  bgGrid: { position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(124,92,191,0.06) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 },
  glow1: { position: 'fixed', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,92,191,0.08) 0%,transparent 70%)', top: '-200px', left: '-200px', pointerEvents: 'none', zIndex: 0 },
  glow2: { position: 'fixed', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,168,37,0.06) 0%,transparent 70%)', bottom: '-150px', right: '-150px', pointerEvents: 'none', zIndex: 0 },
  main: { flex: 1, marginLeft: '70px', padding: '32px 40px', zIndex: 1, overflowY: 'auto', maxHeight: '100vh' },
  topBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', gap: '20px', flexWrap: 'wrap' },
  pageTitle: { fontSize: '1.9rem', fontWeight: '900', color: '#fff', marginBottom: '4px', letterSpacing: '-0.5px' },
  pageSub: { fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600' },
  searchWrap: { display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.3s' },
  searchFocused: { borderColor: 'rgba(124,92,191,0.5)', boxShadow: '0 0 0 3px rgba(124,92,191,0.1)', background: 'rgba(255,255,255,0.08)' },
  searchInput: { border: 'none', outline: 'none', background: 'transparent', fontSize: '0.9rem', color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: '600', flex: 1 },
  clearBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.8rem', padding: '2px 4px' },
  domainRow: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', scrollbarWidth: 'none' },
  domainPill: { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Nunito,sans-serif', transition: 'all 0.2s' },
  domainPillActive: { background: 'linear-gradient(135deg,rgba(124,92,191,0.3),rgba(155,127,212,0.2))', color: '#C4A8E8', borderColor: 'rgba(124,92,191,0.4)', boxShadow: '0 4px 12px rgba(124,92,191,0.2)' },
  pillCount: { background: 'rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1px 6px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontWeight: '800' },
  pillCountActive: { background: 'rgba(124,92,191,0.3)', color: '#C4A8E8' },
  alphabetRow: { display: 'flex', gap: '3px', flexWrap: 'wrap', marginBottom: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.05)' },
  letterBtn: { width: '28px', height: '28px', borderRadius: '7px', border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer', fontFamily: 'Nunito,sans-serif', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  letterActive: { background: 'linear-gradient(135deg,#7C5CBF,#9B7FD4)', color: '#fff', boxShadow: '0 2px 8px rgba(124,92,191,0.5)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '18px', marginBottom: '28px' },
  skeleton: { height: '220px', borderRadius: '18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' },
  card: { background: 'rgba(255,255,255,0.04)', borderRadius: '18px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(10px)' },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  cardIcon: { width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg,rgba(124,92,191,0.2),rgba(155,127,212,0.1))', border: '1px solid rgba(124,92,191,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' },
  heartBtn: { background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: '4px' },
  cardTitle: { fontSize: '1rem', fontWeight: '800', color: '#fff', marginBottom: '8px', lineHeight: 1.3 },
  cardDesc: { fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginBottom: '12px', fontWeight: '500' },
  skillsRow: { display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' },
  skillTag: { fontSize: '0.7rem', background: 'rgba(124,92,191,0.12)', color: 'rgba(196,168,232,0.8)', padding: '3px 8px', borderRadius: '8px', fontWeight: '700', border: '1px solid rgba(124,92,191,0.15)' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' },
  domain: { fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontWeight: '700', marginBottom: '3px' },
  salary: { fontSize: '0.8rem', color: '#4CAF82', fontWeight: '800' },
  growth: { fontSize: '0.72rem', padding: '4px 10px', borderRadius: '10px', fontWeight: '800' },
  empty: { gridColumn: '1/-1', textAlign: 'center', padding: '80px 20px' },
  pagination: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '40px' },
  pageBtn: { padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'Nunito,sans-serif', transition: 'all 0.2s' },
  pageDot: { width: '8px', height: '8px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.15)', cursor: 'pointer' },
  pageDotActive: { background: '#7C5CBF', width: '24px', borderRadius: '4px' },
};