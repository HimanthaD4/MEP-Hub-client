import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [scrolled, setScrolled] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const handleSuccessfulLogin = () => {
    setShowLogin(false);
    setHasLoggedIn(true);
  };

  useEffect(() => {
    if (hasLoggedIn) {
      window.location.reload();
    }
  }, [hasLoggedIn]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/resources', label: 'Resources' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'white',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none'
    }}>
      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '8px 0',
        fontSize: '14px',
        boxShadow: '0 2px 10px rgba(30, 64, 175, 0.2)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="tel:+94112345678" style={{ 
              color: 'white', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'opacity 0.2s ease',
              ':hover': { opacity: 0.8 }
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +94 112 345 678
            </a>
            <a href="mailto:info@mephub.lk" style={{ 
              color: 'white', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'opacity 0.2s ease',
              ':hover': { opacity: 0.8 }
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              info@mephub.lk
            </a>
          </div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/profile" style={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile
              </Link>
              {user.userType === 'admin' && (
                <Link to="/admin" style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)'
                  }
                }}>
                  Admin Panel
                </Link>
              )}
              {user.userType === 'user' && (
                <Link to="/member" style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)'
                  }
                }}>
                  Member Dashboard
                </Link>
              )}
              <motion.button 
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                  }
                }}
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button 
                onClick={() => setShowLogin(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Login
              </motion.button>
              <motion.button 
                onClick={() => setShowRegister(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)'
                  }
                }}
              >
                Register
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: scrolled ? '12px 40px' : '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <Link to="/" style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#1e40af',
          textDecoration: 'none',
          letterSpacing: '0.5px',
          fontFamily: "'Inter', sans-serif",
          display: 'flex',
          alignItems: 'center'
        }}>
          <motion.span 
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            MEPHUB<span style={{ color: '#3b82f6', fontWeight: 400 }}>.LK</span>
          </motion.span>
        </Link>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: '32px' }}>
            {navItems.map((item) => (
              <motion.div 
                key={item.path}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={item.path} 
                  style={{
                    color: '#1f2937',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 500,
                    position: 'relative',
                    padding: '8px 0',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.3px'
                  }}
                >
                  {item.label}
                  <motion.div
                    initial={{ width: 0, left: 0 }}
                    whileHover={{ 
                      width: '100%',
                      transition: { 
                        duration: 0.3,
                        ease: [0.25, 1, 0.5, 1]
                      }
                    }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: '2px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '2px'
                    }}
                  />
                  <AnimatePresence>
                    <motion.div
                      initial={{ width: 0, left: 0, opacity: 0 }}
                      whileHover={{ 
                        width: '100%',
                        opacity: 1,
                        transition: { 
                          duration: 0.6,
                          ease: [0.25, 1, 0.5, 1]
                        }
                      }}
                      exit={{ 
                        opacity: 0,
                        transition: { duration: 0.2 }
                      }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '2px',
                        backgroundColor: 'white',
                        borderRadius: '2px',
                        boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)'
                      }}
                    />
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </nav>
        )}

        {isMobile && (
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </motion.button>
        )}
      </div>

      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSuccess={handleSuccessfulLogin}
      />
      <RegisterModal 
        isOpen={showRegister} 
        onClose={() => setShowRegister(false)} 
        onSuccess={handleSuccessfulLogin}
      />
    </header>
  );
};

export default Header;