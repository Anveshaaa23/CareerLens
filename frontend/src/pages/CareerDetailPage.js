import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCareerById, saveCareer, unsaveCareer, checkSaved, addComment, registerProfessional } from '../api';
import Navbar from '../components/Navbar';

const domainEmojis = { 'Technology': '💻', 'Design': '🎨', 'Business': '💼', 'Finance': '📊', 'Healthcare': '🩺', 'Law': '⚖️', 'Engineering': '⚙️', 'Media': '🎬', 'Education': '📚', 'Government': '🏛️', 'Arts & Entertainment': '🎭', 'Science': '🔬', 'Marketing': '📣', 'Hospitality': '🏨', 'Social Work': '🤝' };

export default function CareerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showProForm, setShowProForm] = useState(false);
  const [commentForm, setCommentForm] = useState({ body: '', daily_work: '', skills_that_matter: '' });
  const [proForm, setProForm] = useState({ job_title: '', company: '', years_of_experience: '', linkedin_url: '', portfolio_url: '' });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchAll(); }, [id]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [cRes, savedRes] = await Promise.all([
        getCareerById(id),
        checkSaved(id).catch(() => ({ data: { saved: false } })),
      ]);
      setCareer(cRes.data.career);
      setComments(cRes.data.comments || []);
      setSaved(savedRes.data.saved);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const toggleSave = async () => {
    try {
      if (saved) { await unsaveCareer(id); setSaved(false); }
      else { await saveCareer(id); setSaved(true); }
    } catch (e) { console.error(e); }
  };

  const submitComment = async () => {
    if (!commentForm.body.trim()) return;
    setSubmitting(true);
    try {
      await addComment({ career_id: Number(id), ...commentForm });
      setMsg('✅ Comment posted!');
      setShowCommentForm(false);
      setCommentForm({ body: '', daily_work: '', skills_that_matter: '' });
      fetchAll();
    } catch (e) { setMsg(e.response?.data?.error || '❌ Error. Are you registered as a professional?'); }
    finally { setSubmitting(false); }
  };

  const submitPro = async () => {
    setSubmitting(true);
    try {
      await registerProfessional({ ...proForm, years_of_experience: Number(proForm.years_of_experience) });
      setMsg('✅ Registered! Now you can comment.');
      setShowProForm(false); setShowCommentForm(true);
    } catch (e) { setMsg(e.response?.data?.error || '❌ Error registering'); }
    finally { setSubmitting(false); }
  };

  if (loading) return (
    <div style={{ ...s.page, alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ fontSize: '2.5rem', marginLeft: '70px' }}>✦</motion.div>
    </div>
  );

  if (!career) return (
    <div style={{ ...s.page, alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <div style={{ marginLeft: '70px', textAlign: 'center' }}>
        <p style={{ fontSize: '3rem', marginBottom: '12px' }}>😕</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Career not found</p>
        <button onClick={() => navigate('/home')} style={s.backBtn}>← Go back</button>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.bgGrid} />
      <div style={s.glow1} />
      <Navbar />

      <motion.div style={s.content} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Back */}
        <motion.button style={s.backBtn} onClick={() => navigate('/home')} whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}>
          ← Back to Dictionary
        </motion.button>

        {/* Hero card */}
        <div style={s.hero}>
          <div style={s.heroGlow} />
          <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
            <div style={s.domainTag}>{domainEmojis[career.domain]} {career.domain}</div>
            <h1 style={s.careerTitle}>{career.title}</h1>
            <p style={s.careerDesc}>{career.description}</p>
            <div style={s.metaRow}>
              <div style={s.metaBox}>
                <p style={s.metaLabel}>💰 Salary Range</p>
                <p style={s.metaVal}>₹{(career.avg_salary_min / 100000).toFixed(1)}L — ₹{(career.avg_salary_max / 100000).toFixed(1)}L/yr</p>
              </div>
              <div style={s.metaBox}>
                <p style={s.metaLabel}>📈 Growth</p>
                <p style={{ ...s.metaVal, color: career.growth_outlook === 'Excellent' ? '#4CAF82' : career.growth_outlook === 'Good' ? '#64B5F6' : '#FFB74D' }}>{career.growth_outlook}</p>
              </div>
              <div style={s.metaBox}>
                <p style={s.metaLabel}>🎓 Education</p>
                <p style={{ ...s.metaVal, fontSize: '0.8rem' }}>{career.education_required}</p>
              </div>
            </div>
          </div>

          <motion.button style={{ ...s.saveBtn, ...(saved ? s.saveBtnSaved : {}) }}
            onClick={toggleSave} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.85 }}
            animate={saved ? { scale: [1, 1.3, 1] } : {}}
          >
            <span style={{ fontSize: '1.6rem' }}>{saved ? '❤️' : '🤍'}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: saved ? '#FF6B8A' : 'rgba(255,255,255,0.4)' }}>{saved ? 'Saved' : 'Save'}</span>
          </motion.button>
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          {[{ key: 'overview', label: '📋 Overview' }, { key: 'skills', label: '⚡ Skills' }, { key: 'comments', label: `💬 Insights (${comments.length})` }].map(t => (
            <button key={t.key} style={{ ...s.tab, ...(tab === t.key ? s.tabActive : {}) }} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} style={s.tabContent}>

            {tab === 'overview' && (
              <div>
                {career.day_in_life && (
                  <div style={s.section}>
                    <h3 style={s.sectionTitle}>🌅 A Day in the Life</h3>
                    <p style={s.sectionText}>{career.day_in_life}</p>
                  </div>
                )}
                <div style={s.section}>
                  <h3 style={s.sectionTitle}>🎓 Education Required</h3>
                  <p style={s.sectionText}>{career.education_required}</p>
                </div>
              </div>
            )}

            {tab === 'skills' && (
              <div>
                <h3 style={s.sectionTitle}>⚡ Key Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
                  {career.skills?.map((sk, i) => (
                    <motion.span key={sk} style={s.skillChip}
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
                      whileHover={{ scale: 1.08, background: 'rgba(124,92,191,0.25)' }}
                    >{sk}</motion.span>
                  ))}
                </div>
              </div>
            )}

            {tab === 'comments' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={s.sectionTitle}>💬 From Real Professionals</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <motion.button style={s.addBtn} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => { setShowCommentForm(!showCommentForm); setShowProForm(false); setMsg(''); }}
                    >+ Share Experience</motion.button>
                    <motion.button style={{ ...s.addBtn, color: '#9B7FD4', borderColor: 'rgba(124,92,191,0.3)' }}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => { setShowProForm(!showProForm); setShowCommentForm(false); setMsg(''); }}
                    >Register as Pro</motion.button>
                  </div>
                </div>

                {msg && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ background: msg.includes('✅') ? 'rgba(76,175,130,0.1)' : 'rgba(255,107,138,0.1)', color: msg.includes('✅') ? '#4CAF82' : '#FF6B8A', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px', fontWeight: '600', fontSize: '0.88rem', border: `1px solid ${msg.includes('✅') ? 'rgba(76,175,130,0.2)' : 'rgba(255,107,138,0.2)'}` }}
                  >{msg}</motion.p>
                )}

                <AnimatePresence>
                  {showProForm && (
                    <motion.div style={s.form} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <p style={{ fontWeight: '800', color: '#fff', marginBottom: '14px', fontSize: '0.95rem' }}>📋 Register as a Professional</p>
                      {[
                        { key: 'job_title', label: 'Job Title', placeholder: 'e.g. Software Engineer' },
                        { key: 'company', label: 'Company', placeholder: 'e.g. Google, Infosys' },
                        { key: 'years_of_experience', label: 'Years of Experience', placeholder: '3', type: 'number' },
                        { key: 'linkedin_url', label: 'LinkedIn URL (optional)', placeholder: 'https://linkedin.com/in/...' },
                        { key: 'portfolio_url', label: 'Portfolio / GitHub (optional)', placeholder: 'https://github.com/...' },
                      ].map(f => (
                        <div key={f.key}>
                          <label style={s.formLabel}>{f.label}</label>
                          <input style={s.formInput} placeholder={f.placeholder} type={f.type || 'text'}
                            value={proForm[f.key]} onChange={e => setProForm(p => ({ ...p, [f.key]: e.target.value }))}
                          />
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                        <motion.button style={s.submitBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={submitPro} disabled={submitting}>{submitting ? 'Saving...' : 'Register →'}</motion.button>
                        <button style={s.cancelBtn} onClick={() => setShowProForm(false)}>Cancel</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showCommentForm && (
                    <motion.div style={s.form} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <p style={{ fontWeight: '800', color: '#fff', marginBottom: '14px', fontSize: '0.95rem' }}>✍️ Share your experience as a {career.title}</p>
                      {[
                        { key: 'body', label: 'Your Overall Experience', placeholder: "What's it really like working in this field?", rows: 3 },
                        { key: 'daily_work', label: 'A Typical Day', placeholder: 'Describe what you actually do day-to-day...', rows: 2 },
                        { key: 'skills_that_matter', label: 'Skills That Actually Matter', placeholder: 'What skills helped you the most?', rows: 2 },
                      ].map(f => (
                        <div key={f.key}>
                          <label style={s.formLabel}>{f.label}</label>
                          <textarea style={{ ...s.formInput, height: `${f.rows * 40}px`, resize: 'vertical' }}
                            placeholder={f.placeholder}
                            value={commentForm[f.key]} onChange={e => setCommentForm(p => ({ ...p, [f.key]: e.target.value }))}
                          />
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                        <motion.button style={s.submitBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={submitComment} disabled={submitting}>{submitting ? 'Posting...' : 'Post →'}</motion.button>
                        <button style={s.cancelBtn} onClick={() => setShowCommentForm(false)}>Cancel</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {comments.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                    <p style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💬</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>No insights yet — be the first!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {comments.map((c, i) => (
                      <motion.div key={c.id} style={s.comment}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#7C5CBF,#9B7FD4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: '900', color: '#fff', flexShrink: 0 }}>
                              {c.professional_name?.charAt(0) || '?'}
                            </div>
                            <div>
                              <p style={{ fontWeight: '800', color: '#fff', fontSize: '0.9rem' }}>{c.professional_name}</p>
                              <p style={{ fontSize: '0.75rem', color: '#9B7FD4', fontWeight: '600' }}>{c.job_title} @ {c.company} · {c.years_of_experience}yr</p>
                            </div>
                          </div>
                          {c.linkedin_url && (
                            <a href={c.linkedin_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.72rem', color: '#9B7FD4', fontWeight: '700', background: 'rgba(124,92,191,0.1)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(124,92,191,0.2)' }}>LinkedIn ↗</a>
                          )}
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, fontSize: '0.88rem', marginBottom: '10px' }}>{c.body}</p>
                        {c.daily_work && (
                          <div style={s.commentBlock}>
                            <p style={s.commentBlockLabel}>🌅 Daily Work</p>
                            <p style={s.commentBlockText}>{c.daily_work}</p>
                          </div>
                        )}
                        {c.skills_that_matter && (
                          <div style={{ ...s.commentBlock, marginTop: '8px' }}>
                            <p style={s.commentBlockLabel}>⚡ Skills That Matter</p>
                            <p style={s.commentBlockText}>{c.skills_that_matter}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg,#0D0620 0%,#1A0840 60%,#0D0620 100%)', display: 'flex', position: 'relative', overflow: 'hidden' },
  bgGrid: { position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(124,92,191,0.05) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 },
  glow1: { position: 'fixed', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,92,191,0.08) 0%,transparent 70%)', top: '-150px', left: '-150px', pointerEvents: 'none', zIndex: 0 },
  content: { flex: 1, marginLeft: '70px', padding: '32px 48px', zIndex: 1, overflowY: 'auto', maxHeight: '100vh' },
  backBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Nunito,sans-serif', marginBottom: '20px', display: 'block', padding: 0 },
  hero: { background: 'rgba(255,255,255,0.04)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', position: 'relative', overflow: 'hidden' },
  heroGlow: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left,rgba(124,92,191,0.08) 0%,transparent 60%)', pointerEvents: 'none' },
  domainTag: { display: 'inline-block', background: 'rgba(124,92,191,0.15)', color: '#C4A8E8', padding: '5px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '12px', border: '1px solid rgba(124,92,191,0.25)' },
  careerTitle: { fontSize: '2rem', fontWeight: '900', color: '#fff', marginBottom: '10px', lineHeight: 1.2, letterSpacing: '-0.5px' },
  careerDesc: { fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '20px', fontWeight: '500', maxWidth: '580px' },
  metaRow: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  metaBox: { background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.06)', minWidth: '140px' },
  metaLabel: { fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' },
  metaVal: { fontSize: '0.88rem', fontWeight: '800', color: '#fff' },
  saveBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px 16px', cursor: 'pointer', fontFamily: 'Nunito,sans-serif', transition: 'all 0.2s', flexShrink: 0 },
  saveBtnSaved: { background: 'rgba(255,107,138,0.08)', borderColor: 'rgba(255,107,138,0.25)' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '20px' },
  tab: { padding: '10px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'Nunito,sans-serif', transition: 'all 0.2s' },
  tabActive: { background: 'rgba(124,92,191,0.15)', color: '#C4A8E8', borderColor: 'rgba(124,92,191,0.3)' },
  tabContent: { background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', minHeight: '200px' },
  section: { marginBottom: '24px' },
  sectionTitle: { fontSize: '1rem', fontWeight: '800', color: '#fff', marginBottom: '10px' },
  sectionText: { fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontWeight: '500' },
  skillChip: { padding: '8px 14px', borderRadius: '20px', background: 'rgba(124,92,191,0.1)', color: '#C4A8E8', fontSize: '0.82rem', fontWeight: '700', border: '1px solid rgba(124,92,191,0.2)', cursor: 'default', transition: 'all 0.15s' },
  addBtn: { padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'Nunito,sans-serif', transition: 'all 0.2s' },
  form: { background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' },
  formLabel: { fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' },
  formInput: { padding: '11px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.88rem', fontFamily: 'Nunito,sans-serif', fontWeight: '500', outline: 'none', width: '100%' },
  submitBtn: { padding: '10px 20px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#7C5CBF,#9B7FD4)', color: '#fff', fontSize: '0.88rem', fontWeight: '800', cursor: 'pointer', fontFamily: 'Nunito,sans-serif' },
  cancelBtn: { padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'Nunito,sans-serif' },
  comment: { background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.05)' },
  commentBlock: { background: 'rgba(124,92,191,0.06)', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(124,92,191,0.1)' },
  commentBlockLabel: { fontSize: '0.68rem', color: '#9B7FD4', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' },
  commentBlockText: { fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, fontWeight: '500' },
};