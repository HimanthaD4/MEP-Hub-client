import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginModal = ({ show, onClose, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login({ email, password, rememberMe });
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Add font links to head */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(8px)',
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '440px',
          padding: '48px',
          position: 'relative',
          border: '1px solid rgba(0,0,0,0.05)',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <button 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              fontFamily: "'Jost', sans-serif"
            }} 
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.color = '#1a56db';
              e.target.style.backgroundColor = 'rgba(0,0,0,0.03)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#64748b';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            ×
          </button>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px',
              fontFamily: "'Jost', sans-serif",
              letterSpacing: '-0.5px'
            }}>Welcome Back</h2>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              fontFamily: "'Jost', sans-serif",
              fontWeight: '400',
              lineHeight: '1.5'
            }}>Sign in to access your account</p>
          </div>
          
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '14px 16px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'Jost', sans-serif",
              fontWeight: '500'
            }}>
              <svg 
                style={{ width: '18px', height: '18px', flexShrink: 0 }} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                position: 'relative',
                marginBottom: '4px'
              }}>
                <label style={{
                  position: 'absolute',
                  top: 0,
                  left: '16px',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  padding: '0 6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#4b5563',
                  fontFamily: "'Jost', sans-serif",
                  pointerEvents: 'none',
                  zIndex: 1
                }}>
                  Email Address
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid #e5e7eb',
                    fontSize: '15px',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: '400',
                    backgroundColor: 'white',
                    ':focus': {
                      borderColor: '#3b82f6',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      outline: 'none'
                    }
                  }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                position: 'relative',
                marginBottom: '4px'
              }}>
                <label style={{
                  position: 'absolute',
                  top: 0,
                  left: '16px',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  padding: '0 6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#4b5563',
                  fontFamily: "'Jost', sans-serif",
                  pointerEvents: 'none',
                  zIndex: 1
                }}>
                  Password
                </label>
                <input
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid #e5e7eb',
                    fontSize: '15px',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: '400',
                    backgroundColor: 'white',
                    ':focus': {
                      borderColor: '#3b82f6',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      outline: 'none'
                    }
                  }}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '28px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontFamily: "'Jost', sans-serif"
              }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    marginRight: '10px',
                    cursor: 'pointer',
                    accentColor: '#3b82f6',
                    transition: 'all 0.2s ease'
                  }}
                />
                <span style={{
                  fontSize: '14px',
                  color: '#4b5563',
                  fontWeight: '400',
                  fontFamily: "'Jost', sans-serif"
                }}>Remember me</span>
              </label>
              <a href="/forgot-password" style={{
                fontSize: '14px',
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '500',
                fontFamily: "'Jost', sans-serif",
                transition: 'all 0.2s ease',
                ':hover': {
                  textDecoration: 'underline'
                }
              }}>
                Forgot password?
              </a>
            </div>
            
            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#1a56db',
                color: 'white',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: "'Jost', sans-serif",
                letterSpacing: '0.5px',
                ':hover': {
                  backgroundColor: '#1e40af',
                  transform: 'translateY(-1px)'
                },
                ':active': {
                  transform: 'translateY(0)'
                },
                ':disabled': {
                  backgroundColor: '#93c5fd',
                  cursor: 'not-allowed',
                  transform: 'none'
                }
              }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <svg 
                    style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              fontFamily: "'Jost', sans-serif",
              fontWeight: '400',
              marginBottom: '16px'
            }}>
              Don't have an account?{' '}
              <a 
                href="#" 
                style={{
                  color: '#1a56db',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  onSwitch();
                }}
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default LoginModal;