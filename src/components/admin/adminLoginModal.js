import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.fontFamily = '"Inter", -apple-system, BlinkMacSystemFont, sans-serif';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.margin = '';
      document.body.style.fontFamily = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const userData = await login(email, password);
      if (userData.userType === 'admin') {
        const from = location.state?.from?.pathname || '/admin';
        navigate(from);
      } else {
        navigate('/');
      }
    } catch (err) {
      setPassword('');
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #bae6fd 100%)',
      overflow: 'auto',
      padding: '20px'
    }}>
      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '380px',
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(203, 213, 225, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="white"/>
            </svg>
          </div>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1e293b',
            margin: '0 0 4px 0'
          }}>Administration Login</h1>
          <p style={{
            fontSize: '13px',
            color: '#64748b',
            margin: 0
          }}>Secure access to the admin dashboard</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#fee2e2',
            color: '#b91c1c',
            padding: '10px 12px',
            fontSize: '13px',
            borderRadius: '2px',
            borderLeft: '3px solid #ef4444'
          }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="#ef4444" style={{ marginRight: '8px' }}>
              <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Email Field */}
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setActiveField('email')}
              onBlur={() => setActiveField(null)}
              required
              style={{
                width: '92%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                outline: 'none',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                borderColor: activeField === 'email' ? '#3b82f6' : '#e2e8f0',
                boxShadow: activeField === 'email' ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none'
              }}
            />
            <label style={{
              position: 'absolute',
              left: '12px',
              top: '-8px',
              fontSize: '12px',
              background: 'white',
              padding: '0 4px',
              color: activeField === 'email' ? '#3b82f6' : '#94a3b8',
              transition: 'all 0.2s ease'
            }}>
              Email Address
            </label>
          </div>

          {/* Password Field */}
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setActiveField('password')}
              onBlur={() => setActiveField(null)}
              required
              style={{
                width: '92%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                outline: 'none',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                borderColor: activeField === 'password' ? '#3b82f6' : '#e2e8f0',
                boxShadow: activeField === 'password' ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none'
              }}
            />
            <label style={{
              position: 'absolute',
              left: '12px',
              top: '-8px',
              fontSize: '12px',
              background: 'white',
              padding: '0 4px',
              color: activeField === 'password' ? '#3b82f6' : '#94a3b8',
              transition: 'all 0.2s ease'
            }}>
              Password
            </label>
          </div>

          {/* Options */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            fontSize: '13px'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
              <input 
                type="checkbox" 
                style={{ 
                  marginRight: '8px',
                  accentColor: '#3b82f6',
                  width: '14px',
                  height: '14px'
                }}
              />
              Remember me
            </label>
            <a href="#forgot" style={{ 
              color: '#3b82f6', 
              textDecoration: 'none',
              fontSize: '13px'
            }}>
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderRadius: '2px',
              marginTop: '8px',
              opacity: isLoading ? 0.8 : 1
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: 'white',
                  animation: 'spin 1s linear infinite',
                  borderRadius: '50%'
                }}></div>
                Signing in...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          fontSize: '13px',
          color: '#64748b',
          marginTop: '8px'
        }}>
          Need access? <Link 
            to="/register" 
            style={{ 
              color: '#3b82f6', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Contact Administrator
          </Link>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;