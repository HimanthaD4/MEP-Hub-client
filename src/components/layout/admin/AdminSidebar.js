import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiFolder, FiUsers, FiBriefcase,
  FiBook, FiUser, FiFileText, FiAward, FiSettings,
  FiClipboard, FiTruck
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ isOpen, isMobile, closeSidebar }) => {
  const navSections = [
    {
      title: 'Management',
      items: [
        // { path: 'dashboard', label: 'Dashboard', icon: <FiHome size={18} /> },
        { path: 'projects', label: 'Projects', icon: <FiFolder size={18} /> },
      ]
    },
    {
      title: 'Personnel',
      items: [
        { path: 'consultants', label: 'Consultants', icon: <FiUsers size={18} /> },
        { path: 'contractors', label: 'Contractors', icon: <FiBriefcase size={18} /> },
        { path: 'directors', label: 'Directors', icon: <FiUser size={18} /> },
      ]
    },
    {
      title: 'Operations',
      items: [
        { path: 'agents', label: 'Suppliers', icon: <FiTruck size={18} /> },
        // { path: 'authorities', label: 'Authorities', icon: <FiAward size={18} /> },
      ]
    },
    {
      title: 'Education',
      items: [
        { path: 'institutions', label: 'Institutions', icon: <FiBook size={18} /> },
        { path: 'lecturers', label: 'Lecturers', icon: <FiUser size={18} /> },
      
      ]
    },
    {
      title: 'Employment',
      items: [
        { path: 'vacancies', label: 'Vacancies', icon: <FiFileText size={18} /> },
        { path: 'jobseekers', label: 'Job Seekers', icon: <FiUsers size={18} /> },
      ]
    },
    {
      title: 'Other',
      items: [
        { path: 'contact', label: 'Contact', icon: <FiClipboard size={18} /> },
      ]
    }
  ];

  const NavButton = ({ item }) => (
    <Link to={`/admin/${item.path}`} onClick={() => isMobile && closeSidebar()} style={{ textDecoration: 'none' }}>
      <motion.button
        className="nav-button"
        whileHover={{ backgroundColor: 'rgba(26, 86, 219, 0.1)' }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="nav-icon">{item.icon}</span>
        <span className="nav-label">{item.label}</span>
      </motion.button>
    </Link>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sidebar-overlay"
              onClick={closeSidebar}
            />
          )}

          <motion.aside
            initial={{ x: isMobile ? '-100%' : 0 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? '-100%' : 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="admin-sidebar"
          >
            <div className="sidebar-content">
              <nav className="sidebar-nav">
                {navSections.map((section, index) => (
                  <div key={index} className="nav-section">
                    <h3 className="section-title">{section.title}</h3>
                    <div className="section-items">
                      {section.items.map((item) => (
                        <NavButton key={item.path} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              {/* <div className="sidebar-settings">
                <NavButton item={{ path: 'settings', label: 'Settings', icon: <FiSettings size={18} /> }} />
              </div> */}
            </div>

            <style jsx>{`
              .sidebar-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.3);
                z-index: 998;
                backdrop-filter: blur(3px);
              }

              .admin-sidebar {
                position: fixed;
                top: 70px;
                left: 0;
                bottom: 0;
                width: 280px;
                background-color: #ffffff;
                z-index: 999;
                box-shadow: 2px 0 20px rgba(0, 0, 0, 0.05);
                border-right: 1px solid rgba(26, 86, 219, 0.1);
                display: flex;
                flex-direction: column;
              }

              .sidebar-content {
                display: flex;
                flex-direction: column;
                height: 100%;
                padding: 16px 0;
                justify-content: space-between;
              }

              .sidebar-nav {
                flex: 1;
                padding: 0 8px;
                overflow-y: auto;
              }

              .nav-section {
                margin-bottom: 12px;
                padding: 0 8px;
              }

              .section-title {
                font-size: 12px;
                font-weight: 600;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin: 0 0 8px 8px;
              }

              .section-items {
                display: flex;
                flex-direction: column;
                gap: 4px;
              }

              .nav-button {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px 16px;
                border-radius: 6px;
                background-color: transparent;
                border: none;
                width: 100%;
                cursor: pointer;
                transition: all 0.2s ease;
                color: #4b5563;
              }

              .nav-button:hover {
                color: #1a56db;
              }

              .nav-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                color: #6b7280;
              }

              .nav-label {
                font-size: 14px;
                font-weight: 500;
              }

              .sidebar-settings {
                padding: 16px;
                border-top: 1px solid rgba(26, 86, 219, 0.1);
              }

              @media (max-width: 768px) {
                .admin-sidebar {
                  top: 0;
                  height: 100vh;
                }
              }
            `}</style>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminSidebar;