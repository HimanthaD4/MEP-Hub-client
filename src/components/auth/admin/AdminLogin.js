import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userType === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData);
      
      if (result.success) {
        if (result.user.userType === 'admin') {
          navigate('/admin');
        } else {
          setError('Elevated privileges required');
        }
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('System error - please contact support');
      console.error('Admin login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const colors = {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC05',
    gray: '#9AA0A6',
    darkGray: '#3C4043',
    lightGray: '#F1F3F4',
    white: '#FFFFFF'
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.lightGray} 0%, ${colors.white} 100%)`,
      padding: '1rem',
      fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <motion.div
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2rem',
          background: colors.white,
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
          border: `1px solid ${colors.lightGray}`,
          position: 'relative',
          overflow: 'hidden'
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div style={{
          position: 'absolute',
          top: '0',
          right: '24px',
          background: colors.blue,
          color: colors.white,
          padding: '8px 16px',
          borderRadius: '0 0 8px 8px',
          fontSize: '12px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 2
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15V17M9 21H15C16.1046 21 17 20.1046 17 19V13C17 11.8954 16.1046 11 15 11H9C7.89543 11 7 11.8954 7 13V19C7 20.1046 7.89543 21 9 21ZM13 11V7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7V11H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          SECURE ACCESS
        </div>

        <div style={{ 
          marginBottom: '2rem', 
          textAlign: 'center',
          paddingTop: '20px'
        }}>
          <div style={{ 
            fontSize: '14px',
            fontWeight: '600',
            color: colors.blue,
            letterSpacing: '0.05em',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            MEPHUB ADMIN CONSOLE
          </div>
          <h1 style={{ 
            color: colors.darkGray,
            fontSize: '24px',
            fontWeight: '600',
            margin: '0',
            lineHeight: '1.3'
          }}>
            System Authentication
          </h1>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              color: colors.red,
              background: '#FEE2E2',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderLeft: `4px solid ${colors.red}`
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{
            position: 'relative',
            marginBottom: '1.5rem'
          }}>
            <label style={{
              position: 'absolute',
              left: '16px',
              top: focusedField === 'email' || formData.email ? '8px' : '18px',
              fontSize: focusedField === 'email' || formData.email ? '12px' : '14px',
              color: focusedField === 'email' ? colors.blue : colors.gray,
              background: colors.white,
              padding: '0 4px',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
              zIndex: 1,
              fontWeight: '500'
            }}>
              Authorized Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              style={{
                width: '100%',
                padding: '28px 16px 12px',
                border: `1px solid ${focusedField === 'email' ? colors.blue : colors.lightGray}`,
                borderRadius: '8px',
                fontSize: '15px',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxShadow: focusedField === 'email' ? `0 0 0 3px ${colors.lightGray}` : 'none',
                background: colors.white,
                position: 'relative',
                zIndex: 0
              }}
            />
          </div>

          <div style={{
            position: 'relative',
            marginBottom: '2rem'
          }}>
            <label style={{
              position: 'absolute',
              left: '16px',
              top: focusedField === 'password' || formData.password ? '8px' : '18px',
              fontSize: focusedField === 'password' || formData.password ? '12px' : '14px',
              color: focusedField === 'password' ? colors.blue : colors.gray,
              background: colors.white,
              padding: '0 4px',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
              zIndex: 1,
              fontWeight: '500'
            }}>
              Secure Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
              style={{
                width: '100%',
                padding: '28px 16px 12px',
                border: `1px solid ${focusedField === 'password' ? colors.blue : colors.lightGray}`,
                borderRadius: '8px',
                fontSize: '15px',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxShadow: focusedField === 'password' ? `0 0 0 3px ${colors.lightGray}` : 'none',
                background: colors.white,
                position: 'relative',
                zIndex: 0
              }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? colors.gray : colors.blue,
              color: colors.white,
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: loading ? 'none' : `0 4px 6px ${colors.lightGray}`,
              position: 'relative',
              overflow: 'hidden'
            }}
            variants={buttonVariants}
            whileHover={!loading ? "hover" : {}}
            whileTap={!loading ? "tap" : {}}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99999L16.25 7.82843M4.92157 19.0784L7.75 16.25M4.92157 4.99999L7.75 7.82843" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                VERIFYING CREDENTIALS...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                AUTHORIZE ACCESS
              </>
            )}
          </motion.button>
        </form>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          color: colors.gray,
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '40px',
            height: '4px',
            background: colors.blue,
            borderRadius: '2px'
          }}></div>
          <div style={{
            width: '40px',
            height: '4px',
            background: colors.red,
            borderRadius: '2px'
          }}></div>
          <div style={{
            width: '40px',
            height: '4px',
            background: colors.yellow,
            borderRadius: '2px'
          }}></div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;