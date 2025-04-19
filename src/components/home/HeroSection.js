import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import projectExpert from '../../images/tt4.png';
import consultantExpert from '../../images/ps2.png';
import contractorExpert from '../../images/sq2.png';
import backgroundImage from '../../images/construction-bg.webp';

const HeroSection = ({ projects, consultantFirms, contractorFirms }) => {
  const [isMobile, setIsMobile] = useState(false);
  const scrollToCategories = () => {
    const element = document.getElementById('categories-section');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const desktopStyles = {
    hero: {
      position: 'relative',
      padding: '110px 14px 100px',
      color: '#111827',
      textAlign: 'left',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      fontFamily: "'Outfit', sans-serif",
      backgroundImage: `linear-gradient(105deg, rgba(248,250,252,0.92) 0%, rgba(248,250,252,0.78) 50%, transparent 65%), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'right center'
    },
    expertImagetwo: {
      width: '100%',
      height: 'auto',
      maxHeight: '90%',
      objectFit: 'contain',
      objectPosition: 'bottom',
      filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.2))',
      transform: 'translateZ(0)',
      marginBottom: '25px'
    },
    expertImageone: {
      width: '100%',
      height: 'auto',
      maxHeight: '90%',
      objectFit: 'contain',
      objectPosition: 'bottom',
      filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.2))',
      transform: 'translateZ(0)',
      marginBottom: '17px'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height:'20px',
    },
    content: {
      flex: 1,
      maxWidth: '600px',
      padding: '0 40px 0 0'
    },
    title: {
      fontSize: '58px',
      fontWeight: 800,
      marginBottom: '24px',
      lineHeight: 1.1,
      letterSpacing: '-2px',
      color: '#1e3a8a',
      textShadow: '1px 1px 4px rgba(248,250,252,0.8)'
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
      fontSize: '19px',
      fontWeight: 400,
      marginBottom: '40px',
      color: '#4b5563',
      lineHeight: 1.6,
      maxWidth: '520px',
      textShadow: '1px 1px 2px rgba(248,250,252,0.6)'
    },
    ctaButton: {
      padding: '18px 48px',
      backgroundColor: '#1a73e8',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(26, 115, 232, 0.3)',
      marginBottom: '40px',
      '&:hover': {
        backgroundColor: '#1765cc',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 24px rgba(26, 115, 232, 0.4)'
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
      padding: '14px 28px',
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 600,
      color: '#4b5563',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(4px)',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.12)'
      }
    },
    statHighlight: {
      fontWeight: 800,
      marginRight: '8px',
      fontSize: '20px'
    },
    illustrationContainer: {
      flex: 1,
      maxWidth: '600px',
      height: '550px',
      position: 'relative'
    },
    floatingBox: {
      position: 'absolute',
      borderRadius: '24px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      boxShadow: '0 24px 48px rgba(0,0,0,0.16)',
      transition: 'all 0.5s ease',
      height: '240px',
      width: '240px',
      '&:hover': {
        transform: 'scale(1.08) rotate(-3deg)'
      }
    },
    expertImage: {
      width: '100%',
      height: 'auto',
      maxHeight: '90%',
      objectFit: 'contain',
      objectPosition: 'bottom',
      filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.2))',
      transform: 'translateZ(0)'
    }
  };

  const mobileStyles = {
    hero: {
      position: 'relative',
      padding: '120px 20px 80px',
      color: '#111827',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      fontFamily: "'Outfit', sans-serif",
      backgroundImage: `linear-gradient(rgba(248,250,252,0.92), rgba(248,250,252,0.95)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    },
    content: {
      flex: 1,
      width: '100%',
      maxWidth: '600px',
      padding: '0 20px'
    },
    title: {
      fontSize: '42px',
      fontWeight: 800,
      marginBottom: '20px',
      lineHeight: 1.2,
      letterSpacing: '-1.5px',
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
      fontSize: '18px',
      fontWeight: 400,
      marginBottom: '36px',
      color: '#4b5563',
      lineHeight: 1.6,
      maxWidth: '100%'
    },
    ctaButton: {
      padding: '20px 48px',
      backgroundColor: '#1a73e8',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 16px rgba(26, 115, 232, 0.3)',
      marginBottom: '36px',
      '&:hover': {
        backgroundColor: '#1765cc',
        transform: 'translateY(-2px)'
      }
    },
    statsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      justifyContent: 'center'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 16px',
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: 600,
      color: '#4b5563',
      boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
      backdropFilter: 'blur(4px)'
    },
    statHighlight: {
      fontWeight: 800,
      marginRight: '6px',
      fontSize: '16px'
    }
  };

  const styles = isMobile ? mobileStyles : desktopStyles;

  return (
    <div style={styles.hero}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>
            Your Trusted<br />
            <span style={styles.titleAccent}>Entire Building Solutions</span><br />
            Partner
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
              <span style={{ ...styles.statHighlight, color: '#1a73e8' }}>{projects.length}+</span> Projects
            </motion.div>
            <motion.div 
              style={styles.statItem}
              whileHover={!isMobile ? { y: -4 } : {}}
            >
              <span style={{ ...styles.statHighlight, color: '#ea4335' }}>{consultantFirms.length}+</span> Consultants
            </motion.div>
            <motion.div 
              style={styles.statItem}
              whileHover={!isMobile ? { y: -4 } : {}}
            >
              <span style={{ ...styles.statHighlight, color: '#f4b400' }}>{contractorFirms.length}+</span> Contractors
            </motion.div>
          </div>
        </div>

        {!isMobile && (
          <div style={styles.illustrationContainer}>
            <motion.div 
              style={{
                ...styles.floatingBox,
                backgroundColor: '#1a73e8',
                top: '40px',
                left: '40px',
                transform: 'rotate(-5deg)'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <img src={projectExpert} alt="Electrical Systems" style={styles.expertImageone} />
            </motion.div>
            
            <motion.div 
              style={{
                ...styles.floatingBox,
                backgroundColor: '#ea4335',
                top: '80px',
                right: '40px',
                transform: 'rotate(8deg)'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <img src={consultantExpert} alt="Plumbing Systems" style={styles.expertImagetwo} />
            </motion.div>
            
            <motion.div 
              style={{
                ...styles.floatingBox,
                backgroundColor: '#f4b400',
                bottom: '45px',
                left: '100px',
                transform: 'rotate(15deg)'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <img src={contractorExpert} alt="HVAC Systems" style={styles.expertImage} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;