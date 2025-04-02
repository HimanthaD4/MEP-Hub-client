// AdminHeader.js
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminHeader = ({ toggleSidebar, userInitial }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      backgroundColor: 'white',
      backdropFilter: 'blur(12px)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <motion.button 
            onClick={toggleSidebar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </motion.button>

          <Link to="/admin/dashboard" style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#1e40af',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
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
              ADMIN<span style={{ color: '#3b82f6', fontWeight: 400 }}>PANEL</span>
            </motion.span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1e40af'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 01-3.46 0"></path>
            </svg>
          </motion.button>

          <div style={{ position: 'relative' }}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '14px'
              }}>
                {userInitial}
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;