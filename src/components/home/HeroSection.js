import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import projectExpert from '../../images/tt4.png';
import consultantExpert from '../../images/ps2.png';
import contractorExpert from '../../images/sq2.png';
import backgroundImage1 from '../../images/construction-bg2.png';
import backgroundImage2 from '../../images/construction-bg3.png';
import backgroundImage3 from '../../images/construction-bg1.png';

const HeroSection = ({ projects, consultantFirms, contractorFirms }) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const backgroundImages = [backgroundImage1, backgroundImage2, backgroundImage3];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(prev => (prev === backgroundImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const scrollToCategories = () => {
    const element = document.getElementById('categories-section');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const nextSlide = () => setCurrentBgIndex(prev => (prev === backgroundImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentBgIndex(prev => (prev === 0 ? backgroundImages.length - 1 : prev - 1));

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      fontFamily: "'Outfit', sans-serif"
    }}>
      {backgroundImages.map((bg, index) => (
        <div key={index} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'opacity 1s ease-in-out',
          opacity: index === currentBgIndex ? 1 : 0,
          zIndex: 0
        }} />
      ))}

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: isMobile 
          ? 'linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.9))'
          : 'linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 70%)',
        zIndex: 1
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1440px',
        margin: '0 auto',
        padding: isMobile ? '20px' : '40px',
        width: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        gap: isMobile ? '40px' : '80px'
      }}>
        <div style={{
          flex: 1,
          maxWidth: isMobile ? '100%' : '600px',
          padding: isMobile ? '20px' : '40px',
          background: isMobile ? 'rgba(255,255,255,0.7)' : 'transparent',
          borderRadius: isMobile ? '16px' : '0',
          backdropFilter: isMobile ? 'blur(8px)' : 'none'
        }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: isMobile ? '2.2rem' : '3.5rem',
              fontWeight: 800,
              marginBottom: '24px',
              lineHeight: 1.2,
              letterSpacing: '-1px',
              color: '#1e293b'
            }}
          >
            Your Trusted<br />
            <span style={{ color: '#ea4335' }}>Entire Building Service Solutions</span><br />
            Partner
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              fontWeight: 400,
              marginBottom: '40px',
              color: '#334155',
              lineHeight: 1.6
            }}
          >
            Connecting mechanical, electrical, and plumbing professionals with projects, 
            suppliers, and expertise across Sri Lanka's construction industry.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button 
              style={{
                padding: isMobile ? '14px 28px' : '16px 40px',
                backgroundColor: '#1a73e8',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                width: isMobile ? '100%' : 'auto'
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(26, 115, 232, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToCategories}
            >
              Explore Our Network
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '40px',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}
          >
            {[
              { value: projects.length, label: 'Projects', color: '#1a73e8' },
              { value: consultantFirms.length, label: 'Consultants', color: '#ea4335' },
              { value: contractorFirms.length, label: 'Contractors', color: '#f4b400' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: isMobile ? '10px 16px' : '12px 24px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  borderRadius: '12px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  color: '#334155',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <span style={{ 
                  fontWeight: 800, 
                  marginRight: '8px', 
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  color: stat.color 
                }}>
                  {stat.value}+
                </span>
                {stat.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {!isMobile && (
          <div style={{
            flex: 1,
            maxWidth: '600px',
            height: '550px',
            position: 'relative'
          }}>
            <motion.div 
              style={{
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
              <img src={projectExpert} alt="Electrical Systems" style={{
                width: '100%',
                height: 'auto',
                maxHeight: '90%',
                objectFit: 'contain',
                objectPosition: 'bottom',
                filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.2))',
                transform: 'translateZ(0)',
                marginBottom: '37px'
              }} />
            </motion.div>
            
            <motion.div 
              style={{
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
              <img src={consultantExpert} alt="Plumbing Systems" style={{
                width: '100%',
                height: 'auto',
                maxHeight: '90%',
                objectFit: 'contain',
                objectPosition: 'bottom',
                filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.2))',
                transform: 'translateZ(0)',
                marginBottom: '25px'
              }} />
            </motion.div>
            
            <motion.div 
              style={{
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
              <img src={contractorExpert} alt="HVAC Systems" style={{
                width: '90%',
                height: 'auto',
                maxHeight: '90%',
                objectFit: 'contain',
                objectPosition: 'bottom',
                filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.2))',
                transform: 'translateZ(0)'
              }} />
            </motion.div>
          </div>
        )}
      </div>

      {!isMobile && (
        <>
          <button 
             onClick={prevSlide}
             style={{
               position: 'absolute',
               top: '50%',
               left: '1.5rem',
               transform: 'translateY(-50%)',
               backgroundColor: 'rgba(255,255,255,0.9)',
               color: '#1e293b',
               border: 'none',
               borderRadius: '50%',
               width: '3.5rem',
               height: '3.5rem',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               cursor: 'pointer',
               zIndex: 3,
               boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
             }}
             whileHover={{ 
               scale: 1.1,
               backgroundColor: 'rgba(255,255,255,1)'
             }}
             whileTap={{ scale: 0.95 }}
           >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </button>
          <button 
            onClick={nextSlide}
            style={{
              position: 'absolute',
              top: '50%',
              right: '1.5rem',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: '#1e293b',
              border: 'none',
              borderRadius: '50%',
              width: '3.5rem',
              height: '3.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 3,
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: 'rgba(255,255,255,1)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default HeroSection;