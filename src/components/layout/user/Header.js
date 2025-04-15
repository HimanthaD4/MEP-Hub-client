import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import LoginModal from '../../auth/LoginModal';
import RegisterModal from '../../auth/RegisterModal';
import { FiMenu } from 'react-icons/fi';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';

const Header = ({ toggleSidebar }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Google's brand colors
  const colors = {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC05',
    green: '#34A853' // Adding green for completeness
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: '12px',
      left: '12px',
      right: '12px',
      zIndex: 1000,
      fontFamily: "'SUSE', sans-serif",
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '0 16px' : '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '24px' }}>
          <button 
            onClick={toggleSidebar}
            style={{
              display: isMobile ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ':hover': {
                backgroundColor: 'rgba(0,0,0,0.03)'
              }
            }}
          >
            <FiMenu size={20} color="#111827" />
          </button>

          <a href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            gap: '6px'
          }}>
            <span style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#111827',
              letterSpacing: '-0.5px',
              fontFamily: "'SUSE', sans-serif",
              transition: 'all 0.2s ease'
            }}>
              mephub<span style={{ 
                color: colors.blue,
                transition: 'all 0.2s ease'
              }}>.</span><span style={{
                color: colors.red
              }}>lk</span>
            </span>
          </a>
        </div>

        {!isMobile && (
          <nav style={{ 
            display: 'flex', 
            gap: '20px',
            marginLeft: '24px'
          }}>
            <a href="/" style={{
              color: '#111827',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '15px',
              position: 'relative',
              padding: '6px 12px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}>
              Home
            </a>
            <a href="/about" style={{
              color: '#111827',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '15px',
              position: 'relative',
              padding: '6px 12px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}>
              About Us
            </a>
            <a href="/contact" style={{
              color: '#111827',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '15px',
              position: 'relative',
              padding: '6px 12px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}>
              Contact Us
            </a>
          </nav>
        )}

        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '12px'
        }}>
          {!isAuthenticated ? (
            <>
              <button 
                onClick={() => setShowLogin(true)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: `1px solid ${colors.blue}`,
                  backgroundColor: 'transparent',
                  color: colors.blue,
                  ':hover': {
                    backgroundColor: 'rgba(66, 133, 244, 0.08)',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Login
              </button>
              <button 
                onClick={() => setShowRegister(true)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: `1px solid ${colors.red}`,
                  backgroundColor: colors.red,
                  color: 'white',
                  ':hover': {
                    backgroundColor: '#D33426',
                    borderColor: '#D33426',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Signup
              </button>
            </>
          ) : (
            <>
            

              {user?.userType === 'admin' && (
                <a 
                  href="/admin" 
                  style={{
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontWeight: 500,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: `1px solid rgba(251, 188, 5, 0.3)`,
                    backgroundColor: 'rgba(251, 188, 5, 0.08)',
                    color: colors.yellow,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    ':hover': {
                      backgroundColor: 'rgba(251, 188, 5, 0.15)',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  <MdAdminPanelSettings size={16} />
                  Admin
                </a>
              )}
      
              <button 
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: `1px solid rgba(234, 67, 53, 0.3)`,
                  backgroundColor: 'rgba(234, 67, 53, 0.08)',
                  color: colors.red,
                  marginLeft: '4px',
                  ':hover': {
                    backgroundColor: 'rgba(234, 67, 53, 0.15)',
                    transform: 'translateY(-1px)'
                  }
                }}
                title="Logout"
              >
                <RiLogoutCircleRLine size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        nav a:hover {
          background-color: rgba(66, 133, 244, 0.05);
        }
        nav a::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 12px;
          right: 12px;
          height: 2px;
          background-color: ${colors.yellow};
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.2s ease;
        }
        nav a:hover::after {
          transform: scaleX(1);
        }
        a:hover span {
          transform: translateY(-1px);
        }
      `}</style>

      <LoginModal 
        show={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSwitch={() => { setShowLogin(false); setShowRegister(true); }}
      />
      <RegisterModal 
        show={showRegister} 
        onClose={() => setShowRegister(false)} 
        onSwitch={() => { setShowRegister(false); setShowLogin(true); }}
      />
    </header>
  );
};

export default Header;