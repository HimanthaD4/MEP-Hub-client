import React from 'react';
import { Link } from 'react-router-dom';

const ValuePropositionSection = () => {
  const styles = {
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '10px 24px',
      textAlign: 'center',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      marginTop: '64px',
      marginBottom: '64px'
    },
    title: {
      fontSize: 'clamp(28px, 3vw, 36px)',
      fontWeight: 600,
      color: '#1e3a8a',
      marginBottom: '24px',
      lineHeight: 1.3
    },
    subtitle: {
      fontSize: 'clamp(16px, 2vw, 18px)',
      color: '#dc2626',
      maxWidth: '720px',
      margin: '0 auto 48px',
      lineHeight: 1.6
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '32px',
      marginBottom: '48px'
    },
    featureCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '32px 24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      ':hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
      }
    },
    featureIcon: {
      fontSize: '40px',
      marginBottom: '20px',
      color: '#3b82f6'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '12px',
      color: '#1e293b'
    },
    featureDesc: {
      fontSize: '16px',
      color: '#64748b',
      lineHeight: 1.5
    },
    exploreButton: {
      display: 'inline-block',
      padding: '14px 32px',
      backgroundColor: 'transparent',
      color: '#3b82f6',
      borderRadius: '8px',
      fontWeight: 500,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: '1px solid #3b82f6',
      fontSize: '16px',
      ':hover': {
        backgroundColor: '#3b82f6',
        color: 'white'
      }
    }
  };

  const features = [
    {
      icon: '🔍',
      title: 'Comprehensive Directory',
      description: 'Access Sri Lanka\'s most complete MEP professional network with verified profiles'
    },
    {
      icon: '🤝',
      title: 'Strategic Connections',
      description: 'Find the right partners and specialists for your projects'
    },
    {
      icon: '📈',
      title: 'Industry Insights',
      description: 'Stay updated with market trends and project opportunities'
    }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Elevating Sri Lanka's MEP Industry</h2>
      <p style={styles.subtitle}>
        A platform designed to foster collaboration and growth in mechanical, electrical, 
        and plumbing engineering sectors.
      </p>
      
      <div style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} style={styles.featureCard}>
            <div style={styles.featureIcon}>{feature.icon}</div>
            <h3 style={styles.featureTitle}>{feature.title}</h3>
            <p style={styles.featureDesc}>{feature.description}</p>
          </div>
        ))}
      </div>
      
      {/* <Link to="/discover" style={styles.exploreButton}>
        Explore Possibilities
      </Link> */}
    </div>
  );
};

export default ValuePropositionSection;