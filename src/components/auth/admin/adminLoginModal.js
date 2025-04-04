import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserLock, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';

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

  // Redirect if already logged in
  useEffect(() => {
    if (user && user.userType === 'admin') {
      navigate('/admin/dashboard');
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
          navigate('/admin/dashboard');
        } else {
          setError('Insufficient privileges: Admin access required');
        }
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('System error - please contact IT support');
      console.error('Admin login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '2rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <motion.div
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.7)',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(8px)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{
          position: 'absolute',
          top: '-12px',
          right: '24px',
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
          color: 'white',
          padding: '6px 18px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 2
        }}>
          <FaShieldAlt style={{ fontSize: '14px' }} />
          <span>SECURE ACCESS</span>
        </div>

        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div style={{ 
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e40af',
            letterSpacing: '0.05em',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            ADMIN PORTAL
          </div>
          <h1 style={{ 
            color: '#1e293b',
            fontSize: '24px',
            fontWeight: '700',
            margin: '0',
            lineHeight: '1.3'
          }}>
            System Authentication
          </h1>
        </div>

        {error && (
          <motion.div
            style={{
              color: '#b91c1c',
              background: '#fee2e2',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              borderLeft: '4px solid #dc2626'
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaExclamationTriangle />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{
            position: 'relative',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              position: 'absolute',
              left: '16px',
              top: focusedField === 'email' || formData.email ? '8px' : '18px',
              fontSize: focusedField === 'email' || formData.email ? '12px' : '14px',
              color: focusedField === 'email' ? '#1e40af' : '#64748b',
              background: 'white',
              padding: '0 4px',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
              zIndex: 1,
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <HiOutlineMail style={{ fontSize: '14px' }} />
              <span>Admin Email</span>
            </div>
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
                padding: '28px 16px 12px 44px',
                border: `1px solid ${focusedField === 'email' ? '#1e40af' : '#e2e8f0'}`,
                borderRadius: '8px',
                fontSize: '15px',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(30, 64, 175, 0.1)' : 'none',
                background: 'white',
                position: 'relative',
                zIndex: 0
              }}
            />
          </div>

          <div style={{
            position: 'relative',
            marginBottom: '2rem'
          }}>
            <div style={{
              position: 'absolute',
              left: '16px',
              top: focusedField === 'password' || formData.password ? '8px' : '18px',
              fontSize: focusedField === 'password' || formData.password ? '12px' : '14px',
              color: focusedField === 'password' ? '#1e40af' : '#64748b',
              background: 'white',
              padding: '0 4px',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
              zIndex: 1,
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <RiLockPasswordFill style={{ fontSize: '14px' }} />
              <span>Secure Password</span>
            </div>
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
                padding: '28px 16px 12px 44px',
                border: `1px solid ${focusedField === 'password' ? '#1e40af' : '#e2e8f0'}`,
                borderRadius: '8px',
                fontSize: '15px',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(30, 64, 175, 0.1)' : 'none',
                background: 'white',
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
              background: loading ? '#93c5fd' : 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
              color: 'white',
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
              boxShadow: loading ? 'none' : '0 4px 6px rgba(30, 64, 175, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaSpinner />
                </motion.span>
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <>
                <FaShieldAlt />
                <span>ACCESS DASHBOARD</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;