import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  const styles = {
    contentSection: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '80px 24px',
      position: 'relative',
      textAlign: 'center', 
      paddingBottom: '100px'
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '20px',
      textAlign: 'center',
      color: '#1e3a8a',
      position: 'relative',
      '::after': {
        content: '""',
        display: 'block',
        width: '80px',
        height: '4px',
        backgroundColor: '#dc2626',
        margin: '16px auto 0',
        borderRadius: '2px'
      }
    },
    subtitle: {
      fontSize: 'clamp(18px, 2vw, 22px)',
      fontWeight: 400,
      marginBottom: '40px',
      color: '#4b5563',
      maxWidth: '700px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: 1.5
    },
    ctaButton: {
      display: 'inline-block',
      padding: '16px 32px',
      backgroundColor: '#1a56db',
      color: 'white',
      borderRadius: '8px',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      ':hover': {
        backgroundColor: '#1e40af',
        transform: 'translateY(-2px)'
      }
    },
    viewAllButton: {
      display: 'inline-block',
      padding: '16px 32px',
      backgroundColor: 'transparent',
      color: '#1a56db',
      borderRadius: '8px',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: '2px solid #1a56db',
      cursor: 'pointer',
      fontSize: '18px',
      ':hover': {
        backgroundColor: '#1a56db',
        color: 'white',
        transform: 'translateY(-2px)'
      }
    }
  };

  return (
    <div style={styles.contentSection}>
      <h2 style={styles.sectionTitle}>Join Sri Lanka's MEP Network</h2>
      <p style={styles.subtitle}>
        Whether you're looking for projects, partners, or professionals, MEP Hub connects you with the right people.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <Link to="/register" style={styles.ctaButton}>
          Register Your Company
        </Link>
        <Link to="/contact" style={styles.viewAllButton}>
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default CtaSection;