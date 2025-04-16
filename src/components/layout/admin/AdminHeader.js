import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiBell, FiSettings, FiHelpCircle } from 'react-icons/fi';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { MdAdminPanelSettings, MdDashboard } from 'react-icons/md';

const AdminHeader = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Google's exact color palette
  const colors = {
    blue: '#4285F4', // Google blue
    red: '#EA4335',  // Google red
    yellow: '#FBBC05', // Google yellow
    green: '#34A853', // Google green (for reference)
    dark: '#202124',  // Google's dark gray
    light: '#f8f9fa'  // Light background
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => setScrolled(window.scrollY > 10);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header style={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: 1000,
      fontFamily: "'Google Sans', 'Roboto', sans-serif",
      backgroundColor: 'white',
      borderBottom: scrolled ? '1px solid #dadce0' : '1px solid transparent',
      transition: 'all 0.3s ease',
      height: '64px',
      boxShadow: scrolled ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 24px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Left Section - Logo and Menu Toggle */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '24px',
          flexShrink: 0
        }}>
          <button 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ':hover': {
                backgroundColor: '#f1f3f4'
              }
            }}
          >
            <FiMenu size={20} color={colors.dark} />
          </button>

          <a href="/admin" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: colors.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <MdAdminPanelSettings size={20} color="white" />
            </div>
            <span style={{
              fontSize: '18px',
              fontWeight: 500,
              color: colors.dark,
              letterSpacing: '-0.5px'
            }}>
              Admin Console
            </span>
          </a>
        </div>

        {/* Center Section - Search */}
        <div style={{ 
          flexGrow: 1,
          maxWidth: '720px',
          margin: '0 24px',
          display: isMobile ? 'none' : 'block'
        }}>
          <form onSubmit={handleSearch} style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#5f6368'
            }}>
              {/* <FiSearch size={18} /> */}
            </div>
            {/* <input
              type="text"
              placeholder="Search across admin panel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                borderRadius: '8px',
                border: '1px solid #dadce0',
                backgroundColor: '#f1f3f4',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                ':focus': {
                  outline: 'none',
                  borderColor: colors.blue,
                  backgroundColor: 'white',
                  boxShadow: `0 0 0 2px ${colors.blue}20`
                }
              }}
            /> */}
          </form>
        </div>

        {/* Right Section - Admin Controls */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0
        }}>
          {/* Quick Access Icons - Each with distinct Google color */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              aria-label="Notifications"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
                ':hover': {
                  backgroundColor: '#f1f3f4'
                }
              }}
            >
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FiBell size={20} color={colors.yellow} />
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: colors.blue,
                  border: '2px solid white'
                }}></span>
              </div>
            </button>

          </div>

          {/* Divider */}
          <div style={{
            height: '32px',
            width: '1px',
            backgroundColor: '#dadce0',
            margin: '0 4px'
          }}></div>

          {/* Dashboard and Logout */}
   

          <button 
            onClick={handleLogout}
            aria-label="Logout"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ':hover': {
                backgroundColor: '#fce8e6'
              }
            }}
          >
            <RiLogoutCircleRLine size={20} color={colors.red} />
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isMobile && (
        <div style={{
          padding: '0 16px 12px',
          display: isMobile ? 'block' : 'none'
        }}>
          <form onSubmit={handleSearch} style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#5f6368'
            }}>
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                borderRadius: '8px',
                border: '1px solid #dadce0',
                backgroundColor: '#f1f3f4',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                ':focus': {
                  outline: 'none',
                  borderColor: colors.blue,
                  backgroundColor: 'white',
                  boxShadow: `0 0 0 2px ${colors.blue}20`
                }
              }}
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;