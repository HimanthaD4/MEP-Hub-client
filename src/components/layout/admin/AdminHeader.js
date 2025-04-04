import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiBell, FiSearch, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';

const AdminHeader = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={`admin-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <button 
            className="sidebar-toggle" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FiMenu size={20} />
          </button>
          <h1 className="logo">
            <span className="logo-primary">MEP</span>
            <span className="logo-secondary">HUB</span>
          </h1>
        </div>

        <div className="header-right">
          <div className="header-center">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search across admin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="header-controls">
            <button className="notification-btn" aria-label="Notifications">
              <FiBell size={20} />
              <span className="notification-badge">3</span>
            </button>

            <div className="profile-dropdown">
              <button 
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="User profile"
                aria-expanded={showProfileMenu}
              >
                <div className="avatar">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span className="username">{user?.name || 'Admin'}</span>
                <FiChevronDown className={`chevron ${showProfileMenu ? 'open' : ''}`} />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="dropdown-header">
                      <div className="dropdown-avatar">
                        {user?.name?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <div className="dropdown-name">{user?.name || 'Admin User'}</div>
                        <div className="dropdown-email">{user?.email || 'admin@mephub.lk'}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item">
                      <FiUser className="dropdown-icon" />
                      My Profile
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <FiLogOut className="dropdown-icon" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background-color: #ffffff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          z-index: 100;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(26, 86, 219, 0.1);
        }

        .admin-header.scrolled {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(5px);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .sidebar-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: #4b5563;
          transition: all 0.2s ease;
        }

        .sidebar-toggle:hover {
          background-color: rgba(26, 86, 219, 0.1);
          color: #1a56db;
        }

        .logo {
          font-size: 22px;
          font-weight: 700;
          display: flex;
          gap: 4px;
          margin: 0;
        }

        .logo-primary {
          color: #1a56db;
        }

        .logo-secondary {
          color: #0ea5e9;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 24px;
          flex: 2;
          justify-content: flex-end;
        }

        .header-center {
          flex: 1;
          max-width: 600px;
          margin: 0 24px;
        }

        .search-container {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background-color: #f8fafc;
          font-size: 14px;
          transition: all 0.2s ease;
          color: #1f2937;
        }

        .search-input:focus {
          outline: none;
          border-color: #1a56db;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(26, 86, 219, 0.1);
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .notification-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: #4b5563;
          transition: all 0.2s ease;
        }

        .notification-btn:hover {
          background-color: rgba(26, 86, 219, 0.1);
          color: #1a56db;
        }

        .notification-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #ef4444;
          color: white;
          font-size: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-dropdown {
          position: relative;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          padding: 6px 8px 6px 6px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .profile-btn:hover {
          background-color: rgba(26, 86, 219, 0.1);
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a56db 0%, #0ea5e9 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .username {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
        }

        .chevron {
          transition: transform 0.2s ease;
          color: #6b7280;
        }

        .chevron.open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          width: 260px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(26, 86, 219, 0.1);
          overflow: hidden;
          z-index: 110;
        }

        .dropdown-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background-color: #f8fafc;
        }

        .dropdown-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a56db 0%, #0ea5e9 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
        }

        .dropdown-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .dropdown-email {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }

        .dropdown-divider {
          height: 1px;
          background-color: #e5e7eb;
          margin: 4px 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #4b5563;
          transition: all 0.2s ease;
        }

        .dropdown-item:hover {
          background-color: #f3f4f6;
          color: #1a56db;
        }

        .dropdown-icon {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 768px) {
          .header-content {
            padding: 0 16px;
          }

          .header-center {
            display: none;
          }

          .username {
            display: none;
          }

          .chevron {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .header-left {
            flex: none;
          }
          .header-right {
            flex: none;
          }
        }
      `}</style>
    </header>
  );
};

export default AdminHeader;