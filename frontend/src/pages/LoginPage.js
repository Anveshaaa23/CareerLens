import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser, registerUser } from '../api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (activeTab === 'login') {
        const res = await loginUser({ email, password });
        login(res.data.token, res.data.user);
        if (!res.data.user.stream) navigate('/onboarding');
        else navigate('/home');
      } else {
        const res = await registerUser({ name, email, password });
        login(res.data.token, res.data.user);
        navigate('/onboarding');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Try again!');
    } finally {
      setLoading(false);
    }
  };

  const floatingIcons = [
    { emoji: '✈️', top: '15%', left: '50%', delay: 0 },
    { emoji: '🏗️', top: '25%', left: '78%', delay: 0.4 },
    { emoji: '🩺', top: '50%', left: '88%', delay: 0.8 },
    { emoji: '⚖️', top: '75%', left: '78%', delay: 1.2 },
    { emoji: '💻', top: '85%', left: '50%', delay: 0.2 },
    { emoji: '🎨', top: '75%', left: '22%', delay: 0.6 },
    { emoji: '🔬', top: '50%', left: '12%', delay: 1.0 },
    { emoji: '📈', top: '25%', left: '22%', delay: 1.4 },
  ];

  return (
    <div style={styles.container}>
      {/* LEFT SIDE */}
      <div style={styles.leftPanel}>
        <div style={styles.nebulaGlow} />
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{ ...styles.star, left: `${(i * 13 + 5) % 90}%`, top: `${(i * 19 + 7) % 90}%`, opacity: (i % 3 + 1) * 0.25 }} />
        ))}
        <div style={styles.orbitWrapper}>
          <div style={styles.centerCluster}>
            <motion.div style={styles.magnifier}
              animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >🔍</motion.div>
            <h1 style={styles.brandTitle}>Career<span style={styles.brandAccent}>Lens</span></h1>
            <p style={styles.brandSubtitle}>Discover careers through the eyes of people who actually live them.</p>
          </div>
          {floatingIcons.map((icon, idx) => (
            <motion.div key={idx}
              style={{ ...styles.iconBadge, top: icon.top, left: icon.left }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: icon.delay }}
            >{icon.emoji}</motion.div>
          ))}
        </div>
        <div style={styles.metricsRow}>
          {[{ val: '61+', label: 'CAREERS' }, { val: '15', label: 'DOMAINS' }, { val: '∞', label: 'POSSIBILITIES' }].map((m, i) => (
            <div key={i} style={styles.metricItem}>
              <span style={styles.metricVal}>{m.val}</span>
              <span style={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          <h2 style={styles.welcomeTitle}>{activeTab === 'login' ? 'Welcome back' : 'Join CareerLens'}</h2>
          <p style={styles.welcomeSubtitle}>{activeTab === 'login' ? 'Sign in to continue your career exploration' : 'Create your account and start exploring'}</p>

          <div style={styles.tabContainer}>
            <div style={{ ...styles.tabHighlight, transform: activeTab === 'login' ? 'translateX(0px)' : 'translateX(100%)' }} />
            <button style={{ ...styles.tabBtn, color: activeTab === 'login' ? '#1A0A3D' : '#8C7BAA' }} onClick={() => { setActiveTab('login'); setError(''); }}>Login</button>
            <button style={{ ...styles.tabBtn, color: activeTab === 'signup' ? '#1A0A3D' : '#8C7BAA' }} onClick={() => { setActiveTab('signup'); setError(''); }}>Sign Up</button>
          </div>

          <form onSubmit={handleSignIn} style={styles.formElement}>
            {activeTab === 'signup' && (
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>FULL NAME</label>
                <input type="text" style={styles.textInput} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required={activeTab === 'signup'} />
              </div>
            )}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>EMAIL ADDRESS</label>
              <input type="email" style={styles.textInput} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>PASSWORD</label>
              <input type="password" style={styles.textInput} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            {error && <p style={styles.errorBox}>{error}</p>}
            <motion.button type="submit" style={{ ...styles.submitBtn, opacity: loading ? 0.8 : 1 }}
              whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} disabled={loading}
            >
              {loading ? 'Please wait...' : activeTab === 'login' ? 'Sign In →' : 'Create Account →'}
            </motion.button>
          </form>

          <p style={styles.switchAccountText}>
            {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <span style={styles.linkText} onClick={() => { setActiveTab(activeTab === 'login' ? 'signup' : 'login'); setError(''); }}>
              {activeTab === 'login' ? 'Sign up free' : 'Sign in'}
            </span>
          </p>
          <div style={styles.footerBranding}>
            <span style={styles.bullet}>•</span> Real careers. Real professionals. Real insights. <span style={styles.bullet}>•</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden', fontFamily: 'Nunito, sans-serif' },
  leftPanel: { flex: 1, background: 'linear-gradient(135deg, #2E1065 0%, #4C1D95 50%, #3B0764 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' },
  nebulaGlow: { position: 'absolute', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', top: '25%', left: '20%', pointerEvents: 'none' },
  star: { position: 'absolute', width: '2.5px', height: '2.5px', backgroundColor: '#FFFFFF', borderRadius: '50%', pointerEvents: 'none' },
  orbitWrapper: { position: 'relative', width: '420px', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  centerCluster: { textAlign: 'center', zIndex: 5, maxWidth: '280px' },
  magnifier: { fontSize: '2.6rem', marginBottom: '10px', display: 'inline-block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' },
  brandTitle: { fontSize: '2.8rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-1px', margin: '0 0 12px 0', lineHeight: 1 },
  brandAccent: { color: '#FBBF24' },
  brandSubtitle: { fontSize: '0.92rem', color: '#DDD6FE', fontWeight: '500', lineHeight: 1.5, margin: 0 },
  iconBadge: { position: 'absolute', width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', transform: 'translate(-50%, -50%)', cursor: 'default', backdropFilter: 'blur(4px)' },
  metricsRow: { display: 'flex', gap: '36px', marginTop: '40px', zIndex: 5 },
  metricItem: { textAlign: 'center' },
  metricVal: { display: 'block', fontSize: '1.6rem', fontWeight: '900', color: '#FBBF24', lineHeight: 1.1, marginBottom: '2px' },
  metricLabel: { fontSize: '0.68rem', color: '#C4B5FD', fontWeight: '800', letterSpacing: '0.08em' },
  rightPanel: { flex: 1, background: '#FAF9F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' },
  formContainer: { width: '100%', maxWidth: '380px' },
  welcomeTitle: { fontSize: '2.1rem', fontWeight: '900', color: '#1A0A3D', margin: '0 0 6px 0', letterSpacing: '-0.5px' },
  welcomeSubtitle: { fontSize: '0.9rem', color: '#8C7BAA', fontWeight: '500', margin: '0 0 28px 0' },
  tabContainer: { position: 'relative', display: 'flex', background: '#EAE6FA', borderRadius: '12px', padding: '4px', marginBottom: '28px' },
  tabHighlight: { position: 'absolute', top: '4px', left: '4px', bottom: '4px', width: 'calc(50% - 4px)', background: '#FFFFFF', borderRadius: '9px', boxShadow: '0 3px 10px rgba(74,32,128,0.08)', transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)' },
  tabBtn: { flex: 1, position: 'relative', zIndex: 2, background: 'none', border: 'none', padding: '10px 0', fontSize: '0.9rem', fontWeight: '800', cursor: 'pointer', fontFamily: 'Nunito, sans-serif', transition: 'color 0.2s' },
  formElement: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  inputLabel: { fontSize: '0.72rem', color: '#1A0A3D', fontWeight: '800', letterSpacing: '0.03em' },
  textInput: { padding: '14px 16px', borderRadius: '12px', border: 'none', background: '#EBF2FF', fontSize: '0.95rem', color: '#1A0A3D', fontWeight: '600', outline: 'none', fontFamily: 'Nunito, sans-serif' },
  errorBox: { color: '#FF4D6D', fontSize: '0.85rem', fontWeight: '700', background: '#FFF0F3', padding: '10px 14px', borderRadius: '10px', margin: 0 },
  submitBtn: { marginTop: '8px', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #3B127D, #5B259E)', color: 'white', fontSize: '1rem', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 16px rgba(59,18,125,0.25)', fontFamily: 'Nunito, sans-serif' },
  switchAccountText: { textAlign: 'center', fontSize: '0.86rem', color: '#8C7BAA', marginTop: '24px', fontWeight: '500' },
  linkText: { color: '#3B127D', fontWeight: '800', cursor: 'pointer', textDecoration: 'underline' },
  footerBranding: { textAlign: 'center', fontSize: '0.78rem', color: '#A093C4', marginTop: '44px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  bullet: { color: '#C4B5FD', fontSize: '1.1rem' },
};

export default LoginPage;