import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import projectExpert from '../../images/sq3.png';
import consultantExpert from '../../images/sq1.png';
import contractorExpert from '../../images/sq2.png';

const HeroSection = ({ projects, consultantFirms, contractorFirms }) => {
  const [isMobile, setIsMobile] = useState(false);
  const scrollToCategories = () => {
    const element = document.getElementById('categories-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const desktopStyles = {
    hero: {
      position: 'relative',
      padding: '120px 24px 100px',
      color: '#111827',
      textAlign: 'left',
      overflow: 'hidden',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      fontFamily: "'Outfit', sans-serif"
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      position: 'relative',
      zIndex: 2
    },
    content: {
      flex: 1,
      maxWidth: '600px',
      position: 'relative',
      zIndex: 2
    },
    title: {
      fontSize: '64px',
      fontWeight: 700,
      marginBottom: '24px',
      lineHeight: 1.15,
      letterSpacing: '-1px',
      color: '#1e3a8a'
    },
    titleAccent: {
      color: '#ea4335',
      position: 'relative',
      display: 'inline-block',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '-8px',
        left: '0',
        width: '100%',
        height: '4px',
        background: '#f4b400',
        borderRadius: '2px'
      }
    },
    subtitle: {
      fontSize: '20px',
      fontWeight: 400,
      marginBottom: '40px',
      color: '#4b5563',
      lineHeight: 1.6,
      maxWidth: '520px'
    },
    ctaButton: {
      padding: '16px 40px',
      backgroundColor: '#1a73e8',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '18px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 14px rgba(26, 115, 232, 0.25)',
      marginBottom: '40px',
      '&:hover': {
        backgroundColor: '#1765cc',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 18px rgba(26, 115, 232, 0.35)'
      }
    },
    statsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      justifyContent: 'flex-start'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 500,
      color: '#4b5563',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
      }
    },
    statHighlight: {
      fontWeight: 700,
      marginRight: '8px',
      fontSize: '18px'
    },
    illustrationContainer: {
      flex: 1,
      maxWidth: '600px',
      height: '550px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    floatingBox: {
      position: 'absolute',
      borderRadius: '46px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      transition: 'all 0.5s ease',
      height: '220px',
      width: '220px',
      '&:hover': {
        transform: 'scale(1.05) rotate(-2deg)'
      }
    },
    expertImage: {
      width: '100%',
      height: 'auto',
      maxHeight: '90%',
      objectFit: 'contain',
      objectPosition: 'bottom',
      filter: 'drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.2))',
      transform: 'translateZ(0)'
    },
    decorativeElements: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      overflow: 'hidden',
      zIndex: 0
    },
    decorativeShape: {
      position: 'absolute',
      opacity: 0.05,
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
    }
  };

  const mobileStyles = {
    hero: {
      position: 'relative',
      padding: '80px 20px 60px',
      color: '#111827',
      textAlign: 'center',
      overflow: 'hidden',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      fontFamily: "'Outfit', sans-serif"
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      zIndex: 2
    },
    content: {
      flex: 1,
      width: '100%',
      maxWidth: '600px',
      position: 'relative',
      zIndex: 2,
      marginBottom: '40px'
    },
    title: {
      fontSize: '36px',
      fontWeight: 700,
      marginBottom: '16px',
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
      color: '#1e3a8a'
    },
    titleAccent: {
      color: '#ea4335',
      position: 'relative',
      display: 'inline-block',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '-6px',
        left: '0',
        width: '100%',
        height: '3px',
        background: '#f4b400',
        borderRadius: '2px'
      }
    },
    subtitle: {
      fontSize: '16px',
      fontWeight: 400,
      marginBottom: '30px',
      color: '#4b5563',
      lineHeight: 1.6,
      maxWidth: '100%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    ctaButton: {
      padding: '14px 32px',
      backgroundColor: '#1a73e8',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 14px rgba(26, 115, 232, 0.25)',
      marginBottom: '30px',
      display: 'inline-block'
    },
    statsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
      marginTop: '20px'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#4b5563',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    statHighlight: {
      fontWeight: 700,
      marginRight: '6px',
      fontSize: '16px'
    },
    decorativeElements: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      overflow: 'hidden',
      zIndex: 0
    }
  };

  const colors = {
    blue: '#1a73e8',
    red: '#ea4335',
    yellow: '#f4b400'
  };

  const styles = isMobile ? mobileStyles : desktopStyles;

  return (
    <div style={styles.hero}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div style={styles.decorativeElements}>
        {!isMobile && (
          <>
            <div style={{
              ...styles.decorativeShape,
              width: '600px',
              height: '600px',
              backgroundColor: colors.blue,
              top: '-100px',
              right: '-100px',
              transform: 'rotate(45deg)'
            }} />
            <div style={{
              ...styles.decorativeShape,
              width: '400px',
              height: '400px',
              backgroundColor: colors.yellow,
              bottom: '-50px',
              left: '-50px',
              transform: 'rotate(-20deg)'
            }} />
          </>
        )}
      </div>

      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>
            Sri Lanka's Premier <span style={styles.titleAccent}>MEP</span> Network
          </h1>
          
          <p style={styles.subtitle}>
            Connecting mechanical, electrical, and plumbing professionals with projects, 
            suppliers, and expertise across Sri Lanka's construction industry.
          </p>
          
          <motion.button 
            style={styles.ctaButton}
            whileHover={!isMobile ? { scale: 1.03 } : {}}
            whileTap={!isMobile ? { scale: 0.98 } : {}}
            onClick={scrollToCategories}
          >
            Explore Our Network
          </motion.button>
          
          <div style={styles.statsContainer}>
            <motion.div 
              style={styles.statItem}
              whileHover={!isMobile ? { y: -4 } : {}}
            >
              <span style={{ ...styles.statHighlight, color: colors.blue }}>{projects.length}+</span> Projects
            </motion.div>
            <motion.div 
              style={styles.statItem}
              whileHover={!isMobile ? { y: -4 } : {}}
            >
              <span style={{ ...styles.statHighlight, color: colors.red }}>{consultantFirms.length}+</span> Consultants
            </motion.div>
            <motion.div 
              style={styles.statItem}
              whileHover={!isMobile ? { y: -4 } : {}}
            >
              <span style={{ ...styles.statHighlight, color: colors.yellow }}>{contractorFirms.length}+</span> Contractors
            </motion.div>
          </div>
        </div>

        {!isMobile && (
          <div style={styles.illustrationContainer}>
            <motion.div 
              style={{
                ...styles.floatingBox,
                backgroundColor: colors.blue,
                top: '50px',
                left: '50px',
                transform: 'rotate(-5deg)'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <img src={projectExpert} alt="Project Expert" style={styles.expertImage} />
            </motion.div>
            
            <motion.div 
              style={{
                ...styles.floatingBox,
                backgroundColor: colors.red,
                top: '100px',
                right: '50px',
                transform: 'rotate(8deg)'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <img src={consultantExpert} alt="Consultant Expert" style={styles.expertImage} />
            </motion.div>
            
            <motion.div 
              style={{
                ...styles.floatingBox,
                backgroundColor: colors.yellow,
                bottom: '80px',
                left: '100px',
                transform: 'rotate(15deg)'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <img src={contractorExpert} alt="Contractor Expert" style={styles.expertImage} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;