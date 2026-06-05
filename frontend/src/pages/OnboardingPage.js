import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const questions = [
  {
    id: 'education_level', emoji: '🌱',
    question: 'Where are you right now?',
    subtitle: 'Tell us about your current stage of life',
    options: [
      { label: 'Still in School', value: 'School', emoji: '🏫', color: '#E8F4FF', border: '#93C5FD', text: '#1D4ED8' },
      { label: 'In College', value: 'College', emoji: '🎓', color: '#F0E8FF', border: '#C4A8E8', text: '#4A2080' },
      { label: 'Just Graduated', value: 'Graduate', emoji: '🎉', color: '#FFF7E6', border: '#FCD34D', text: '#92400E' },
      { label: 'Working Professional', value: 'Professional', emoji: '💼', color: '#E8FFF4', border: '#6EE7B7', text: '#065F46' },
    ],
  },
  {
    id: 'stream', emoji: '📚',
    question: 'What was your stream?',
    subtitle: 'This helps us match the most relevant careers for you',
    options: [
      { label: 'Science (PCM)', value: 'Science', emoji: '🔬', color: '#E8F4FF', border: '#93C5FD', text: '#1D4ED8' },
      { label: 'Commerce', value: 'Commerce', emoji: '📊', color: '#FFF7E6', border: '#FCD34D', text: '#92400E' },
      { label: 'Arts / Humanities', value: 'Arts', emoji: '🎨', color: '#FFF0F6', border: '#F9A8D4', text: '#9D174D' },
      { label: 'Engineering', value: 'Engineering', emoji: '⚙️', color: '#E8FFF4', border: '#6EE7B7', text: '#065F46' },
      { label: 'Medical / Biology', value: 'Medical', emoji: '🩺', color: '#FFF0F6', border: '#F9A8D4', text: '#9D174D' },
      { label: 'Law', value: 'Law', emoji: '⚖️', color: '#F0E8FF', border: '#C4A8E8', text: '#4A2080' },
    ],
  },
  {
    id: 'degree', emoji: '📖',
    question: 'What are you studying?',
    subtitle: 'Or what did you study? Type it below',
    type: 'input',
    placeholder: 'e.g. B.Tech Computer Science, B.Com, BA English...',
  },
];

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const current = questions[step];

  const handleOption = async (value) => {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) setStep(step + 1);
    else await submitAnswers(newAnswers);
  };

  const handleInputNext = async () => {
    if (!inputValue.trim()) return;
    await submitAnswers({ ...answers, [current.id]: inputValue });
  };

  const submitAnswers = async (finalAnswers) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('careerlens_token');
      const res = await axios.put('http://localhost:8000/api/auth/update-profile', finalAnswers, { headers: { Authorization: `Bearer ${token}` } });
      setUser(res.data.user);
      setDone(true);
    } catch (e) { setDone(true); }
    finally { setLoading(false); }
  };

  if (done) return (
    <div style={s.page}>
      <div style={s.deepNebula} /><div style={s.cosmicDust} />
      {[...Array(20)].map((_, i) => <div key={i} style={{ ...s.star, left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%`, opacity: (i % 3 + 1) * 0.3 }} />)}
      {[...Array(16)].map((_, i) => (
        <motion.div key={i} style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: ['#9D4EDD', '#FF9E00', '#FF5470', '#00F5D4', '#60A5FA'][i % 5], left: `${10 + i * 5.5}%`, top: '-10px', pointerEvents: 'none', zIndex: 3 }}
          animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [1, 0.8, 0] }}
          transition={{ duration: 2.2 + i * 0.15, repeat: Infinity, delay: i * 0.1, ease: 'linear' }}
        />
      ))}
      <motion.div style={s.doneCard} initial={{ scale: 0.8, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 20 }}>
        <motion.div animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.15, 1] }} transition={{ duration: 1.5, delay: 0.2 }} style={{ fontSize: '4.5rem', marginBottom: '16px', display: 'block', lineHeight: 1 }}>✨🙋‍♀️✨</motion.div>
        <h2 style={s.doneTitle}>You're all set!</h2>
        <p style={s.doneText}>Here are some custom career options picked just for you. We've saved them to your profile so you can revisit anytime!</p>
        <motion.button style={s.doneBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/welcome')}>Show me my careers ✨</motion.button>
      </motion.div>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.deepNebula} /><div style={s.cosmicDust} />
      <motion.div style={s.vectorOrbLeft} animate={{ y: [0, -25, 0] }} transition={{ duration: 6, repeat: Infinity }} />
      <motion.div style={s.vectorOrbRight} animate={{ y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }} />
      {[...Array(25)].map((_, i) => (
        <motion.div key={i} style={{ ...s.star, left: `${(i * 19 + 7) % 96}%`, top: `${(i * 11 + 4) % 94}%` }}
          animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <motion.div style={s.brand} initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}>
        🔍 <span style={{ letterSpacing: '-0.3px' }}>CareerLens</span>
      </motion.div>

      <motion.div style={s.card} initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }}>
        <div style={s.progressWrap}>
          {questions.map((_, i) => (
            <motion.div key={i} style={{ height: '8px', borderRadius: '8px', background: i <= step ? 'linear-gradient(90deg,#7C5CBF,#9D4EDD)' : '#E8D8FF' }}
              animate={{ width: i === step ? '36px' : i < step ? '20px' : '8px' }} transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
            <div style={s.stepHeader}>
              <span style={s.stepEmoji}>{current.emoji}</span>
              <div>
                <p style={s.stepLabel}>Step {step + 1} of {questions.length}</p>
                <h2 style={s.question}>{current.question}</h2>
                <p style={s.questionSub}>{current.subtitle}</p>
              </div>
            </div>

            {current.type === 'input' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input style={s.textInput} placeholder={current.placeholder} value={inputValue}
                  onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleInputNext()} autoFocus
                />
                <motion.button style={{ ...s.nextBtn, opacity: !inputValue.trim() ? 0.6 : 1 }}
                  whileHover={{ scale: inputValue.trim() ? 1.02 : 1 }} whileTap={{ scale: 0.98 }}
                  onClick={handleInputNext} disabled={loading || !inputValue.trim()}
                >{loading ? 'Saving...' : 'Continue →'}</motion.button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: current.options.length > 4 ? 'repeat(3,1fr)' : 'repeat(2,1fr)', gap: '12px' }}>
                {current.options.map((opt, i) => (
                  <motion.button key={opt.value} style={{ ...s.optionBtn, background: opt.color, borderColor: opt.border }}
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.04, y: -3, boxShadow: `0 8px 20px ${opt.border}60` }}
                    whileTap={{ scale: 0.96 }} onClick={() => handleOption(opt.value)}
                  >
                    <span style={{ fontSize: '1.9rem', display: 'block' }}>{opt.emoji}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: opt.text, textAlign: 'center' }}>{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step > 0 && (
          <motion.button style={s.backBtn} onClick={() => setStep(step - 1)} whileHover={{ x: -3 }}>← Back</motion.button>
        )}
      </motion.div>
    </div>
  );
};

const s = {
  page: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden', fontFamily: 'Nunito, sans-serif' },
  deepNebula: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg,#120626 0%,#240E47 40%,#1A0736 100%)', zIndex: 1 },
  cosmicDust: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 80% 20%,rgba(157,78,221,0.15) 0%,transparent 50%),radial-gradient(circle at 15% 80%,rgba(255,158,0,0.08) 0%,transparent 45%)', zIndex: 1 },
  vectorOrbLeft: { position: 'absolute', width: '140px', height: '140px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(157,78,221,0.2),rgba(36,14,71,0))', left: '8%', top: '25%', border: '1px solid rgba(255,255,255,0.05)', zIndex: 1 },
  vectorOrbRight: { position: 'absolute', width: '220px', height: '220px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(255,158,0,0.1),rgba(36,14,71,0))', right: '6%', bottom: '20%', border: '1px solid rgba(255,255,255,0.03)', zIndex: 1 },
  star: { position: 'absolute', width: '3px', height: '3px', backgroundColor: '#FFFFFF', borderRadius: '50%', zIndex: 1, pointerEvents: 'none' },
  brand: { fontSize: '1.2rem', fontWeight: '900', color: '#E8D8FF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 },
  card: { background: 'rgba(255,255,255,0.98)', borderRadius: '32px', padding: '40px 38px', width: '100%', maxWidth: '540px', boxShadow: '0 30px 70px rgba(0,0,0,0.4)', position: 'relative', zIndex: 10 },
  progressWrap: { display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '28px' },
  stepHeader: { display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '24px' },
  stepEmoji: { fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 },
  stepLabel: { fontSize: '0.75rem', color: '#7C5CBF', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' },
  question: { fontSize: '1.6rem', fontWeight: '900', color: '#1A0A3D', marginBottom: '4px', lineHeight: 1.25 },
  questionSub: { fontSize: '0.9rem', color: '#6B5B8A', fontWeight: '500', lineHeight: 1.4 },
  optionBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '18px 12px', borderRadius: '18px', border: '2px solid', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Nunito, sans-serif' },
  textInput: { padding: '16px', borderRadius: '14px', border: '2.5px solid #E5D4FF', background: '#FDFAFF', fontSize: '1rem', color: '#1A0A3D', outline: 'none', fontFamily: 'Nunito, sans-serif', fontWeight: '600' },
  nextBtn: { padding: '15px', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg,#4A2080,#7C5CBF)', color: 'white', fontSize: '1rem', fontWeight: '800', cursor: 'pointer', fontFamily: 'Nunito, sans-serif' },
  backBtn: { marginTop: '20px', background: 'none', border: 'none', color: '#7C5CBF', fontWeight: '800', fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'Nunito, sans-serif', display: 'block' },
  doneCard: { background: '#FFFFFF', borderRadius: '32px', padding: '50px 40px', width: '100%', maxWidth: '440px', boxShadow: '0 30px 70px rgba(0,0,0,0.4)', textAlign: 'center', zIndex: 10 },
  doneTitle: { fontSize: '2.2rem', fontWeight: '900', color: '#240E47', marginBottom: '12px' },
  doneText: { fontSize: '0.98rem', color: '#554A6B', marginBottom: '32px', lineHeight: 1.6, fontWeight: '500' },
  doneBtn: { padding: '15px 32px', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg,#240E47,#62369F)', color: 'white', fontSize: '1rem', fontWeight: '800', cursor: 'pointer', fontFamily: 'Nunito, sans-serif' },
};

export default OnboardingPage;