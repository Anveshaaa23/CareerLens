import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const items = [
  { icon: '📖', label: 'Explore', path: '/home' },
  { icon: '👤', label: 'Profile', path: '/profile' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <motion.div style={s.nav}
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <motion.div style={s.logo}
        whileHover={{ scale: 1.08 }}
        onClick={() => navigate('/home')}
      >
        🔍
      </motion.div>

      {/* Nav items */}
      <div style={s.items}>
        {items.map(item => {
          const active = location.pathname === item.path;
          return (
            <motion.button key={item.path}
              style={{ ...s.btn, ...(active ? s.btnActive : {}) }}
              whileHover={{ scale: 1.12, x: 3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(item.path)}
              title={item.label}
            >
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              {active && (
                <motion.div style={s.indicator} layoutId="navIndicator" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Logout */}
      <motion.button style={s.logoutBtn}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => { logout(); navigate('/login'); }}
        title="Logout"
      >
        🚪
      </motion.button>
    </motion.div>
  );
}

const s = {
  nav: {
    position: 'fixed', left: 0, top: 0, bottom: 0, width: '72px',
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    paddingTop: '20px', paddingBottom: '20px',
    zIndex: 100,
    boxShadow: '2px 0 16px rgba(0,0,0,0.3)',
  },
  logo: {
    fontSize: '1.6rem', marginBottom: '36px',
    background: 'linear-gradient(135deg,#7C5CBF,#9B7FD4)',
    width: '44px', height: '44px', borderRadius: '13px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(124,92,191,0.5)', cursor: 'pointer',
  },
  items: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, alignItems: 'center', paddingTop: '4px' },
  btn: {
    width: '46px', height: '46px', borderRadius: '13px', border: 'none',
    background: 'transparent', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', transition: 'background 0.2s',
  },
  btnActive: { background: 'rgba(124,92,191,0.15)' },
  indicator: {
    position: 'absolute', left: '-3px', width: '3px', height: '22px',
    background: 'linear-gradient(180deg,#7C5CBF,#9B7FD4)',
    borderRadius: '0 4px 4px 0',
  },
  logoutBtn: {
    width: '46px', height: '46px', borderRadius: '13px', border: 'none',
    background: 'transparent', fontSize: '1.3rem', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
};