import React from 'react';
import { Link } from 'react-router-dom';
import engineerImage from '../../images/bp.png'; // Adjust path as needed

const HeroSection = ({ projects, consultantFirms, contractorFirms, agents, searchTerm, setSearchTerm }) => {
  const styles = {
    hero: {
      position: 'relative',
      padding: '120px 24px 0', // Reduced bottom padding since image touches bottom
      color: '#202124',
      textAlign: 'left',
      overflow: 'hidden',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      minHeight: '90vh',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        textAlign: 'center',
        padding: '100px 24px 0'
      }
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'flex-end', // Align to bottom
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 2,
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center'
      }
    },
    content: {
      flex: 1,
      paddingRight: '40px',
      maxWidth: '600px',
      position: 'relative',
      zIndex: 2,
      marginBottom: '40px', // Space for bottom-aligned content
      '@media (max-width: 768px)': {
        paddingRight: '0',
        marginBottom: '40px',
        maxWidth: '100%'
      }
    },
    title: {
      fontSize: 'clamp(36px, 5vw, 56px)',
      fontWeight: 800,
      marginBottom: '24px',
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
      color: '#1a0dab',
      position: 'relative',
      display: 'inline-block'
    },
    titleAfter: {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: '0',
      width: '80px',
      height: '4px',
      background: '#f4b400',
      borderRadius: '2px'
    },
    subtitle: {
      fontSize: 'clamp(16px, 2vw, 20px)',
      fontWeight: 400,
      marginBottom: '32px',
      color: '#5f6368',
      lineHeight: 1.6,
      maxWidth: '520px'
    },
    searchContainer: {
      width: '100%',
      marginBottom: '40px',
      position: 'relative',
      maxWidth: '520px'
    },
    searchBox: {
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      height: '56px',
      transition: 'all 0.3s ease',
      border: '1px solid #dfe1e5',
      ':hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }
    },
    searchInput: {
      flex: 1,
      padding: '0 24px',
      border: 'none',
      fontSize: '16px',
      outline: 'none',
      fontWeight: 400,
      borderRadius: '24px',
      '::placeholder': {
        color: '#9aa0a6'
      }
    },
    searchButton: {
      padding: '0 32px',
      backgroundColor: '#1a73e8',
      color: 'white',
      border: 'none',
      fontSize: '16px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#1765cc'
      }
    },
    statsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      marginTop: '32px'
    },
    statBadge: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      backgroundColor: 'white',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#5f6368',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      border: '1px solid #e0e0e0',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }
    },
    statHighlight: {
      fontWeight: 600,
      marginRight: '4px'
    },
    illustrationContainer: {
      flex: 1,
      maxWidth: '600px',
      height: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      '@media (max-width: 768px)': {
        maxWidth: '100%',
        marginTop: '40px',
        justifyContent: 'center'
      }
    },
    svgIllustration: {
      position: 'absolute',
      width: '100%',
      height: 'auto',
      maxHeight: '500px',
      bottom: '0',
      right: '0',
      zIndex: 1
    },
    engineerImage: {
      height: '80%',
      maxHeight: '400px',
      zIndex: 3,
      position: 'relative',
      objectFit: 'contain',
      objectPosition: 'bottom right',
      '@media (max-width: 768px)': {
        height: 'auto',
        width: '100%',
        maxHeight: '400px'
      }
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
    decorativeCircle: {
      position: 'absolute',
      borderRadius: '50%',
      opacity: 0.1
    },
    lettersBackground: {
      position: 'absolute',
      fontSize: '300px',
      fontWeight: 800,
      color: 'rgba(234,67,53,0.03)',
      zIndex: 0,
      lineHeight: 1,
      userSelect: 'none',
      pointerEvents: 'none',
      left: '-50px',
      top: '50%',
      transform: 'translateY(-50%)',
      '@media (max-width: 768px)': {
        fontSize: '200px',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    }
  };

  // Google color palette
  const googleColors = {
    blue: '#1a73e8',
    red: '#ea4335',
    yellow: '#f4b400',
    green: '#34a853',
    gray: '#5f6368'
  };

  return (
    <div style={styles.hero}>
      {/* Subtle background letters */}
      <div style={styles.lettersBackground}>MEP</div>
      
      {/* Decorative elements - positioned to show through nicely */}
      <div style={styles.decorativeElements}>
        <div style={{
          ...styles.decorativeCircle,
          width: '320px',
          height: '320px',
          backgroundColor: googleColors.blue,
          top: '-120px',
          right: '-120px'
        }} />
        <div style={{
          ...styles.decorativeCircle,
          width: '220px',
          height: '220px',
          backgroundColor: googleColors.yellow,
          bottom: '100px',
          right: '25%'
        }} />
        <div style={{
          ...styles.decorativeCircle,
          width: '180px',
          height: '180px',
          backgroundColor: googleColors.red,
          top: '40%',
          left: '15%'
        }} />
      </div>

      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>
            Sri Lanka's Premier <span style={{ color: googleColors.red }}>MEP</span> Network
            <span style={styles.titleAfter}></span>
          </h1>
          
          <p style={styles.subtitle}>
            Connecting mechanical, electrical, and plumbing professionals with projects, suppliers, and expertise across Sri Lanka's construction industry.
          </p>
          
          <div style={styles.searchContainer}>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Search projects, firms, or professionals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <button style={styles.searchButton}>
                Search
              </button>
            </div>
          </div>
          
          <div style={styles.statsContainer}>
            <div style={styles.statBadge}>
              <span style={{ ...styles.statHighlight, color: googleColors.blue }}>{projects.length}+</span> Projects
            </div>
            <div style={styles.statBadge}>
              <span style={{ ...styles.statHighlight, color: googleColors.red }}>{consultantFirms.length}+</span> Consultants
            </div>
            <div style={styles.statBadge}>
              <span style={{ ...styles.statHighlight, color: googleColors.yellow }}>{contractorFirms.length}+</span> Contractors
            </div>
            <div style={styles.statBadge}>
              <span style={{ ...styles.statHighlight, color: googleColors.green }}>{agents.length}+</span> Suppliers
            </div>
          </div>
        </div>

        <div style={styles.illustrationContainer}>
          <svg style={styles.svgIllustration} viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Modern abstract illustration with Google colors */}
            <rect width="600" height="500" fill="#f8f9fa" fillOpacity="0.01" />
            
            {/* Blue elements - adjusted positions */}
            <path d="M420 120C420 176.228 374.228 222 318 222C261.772 222 216 176.228 216 120C216 63.7715 261.772 18 318 18C374.228 18 420 63.7715 420 120Z" fill={googleColors.blue} fillOpacity="0.1" />
            <path d="M470 320C470 350.928 445.928 375 415 375C384.072 375 360 350.928 360 320C360 289.072 384.072 265 415 265C445.928 265 470 289.072 470 320Z" fill={googleColors.blue} fillOpacity="0.1" />
            
            {/* Red elements - adjusted positions */}
            <path d="M120 220C120 259.823 153.177 293 193 293C232.823 293 266 259.823 266 220C266 180.177 232.823 147 193 147C153.177 147 120 180.177 120 220Z" fill={googleColors.red} fillOpacity="0.1" />
            <path d="M70 370C70 398.719 93.281 422 122 422C150.719 422 174 398.719 174 370C174 341.281 150.719 318 122 318C93.281 318 70 341.281 70 370Z" fill={googleColors.red} fillOpacity="0.1" />
            
            {/* Yellow elements - adjusted positions */}
            <path d="M270 70C270 103.137 243.137 130 210 130C176.863 130 150 103.137 150 70C150 36.8629 176.863 10 210 10C243.137 10 270 36.8629 270 70Z" fill={googleColors.yellow} fillOpacity="0.1" />
            
            {/* Main illustration elements */}
            <path d="M318 120C318 142.091 300.091 160 278 160H258C235.909 160 218 142.091 218 120V100C218 77.9086 235.909 60 258 60H278C300.091 60 318 77.9086 318 100V120Z" fill={googleColors.blue} />
            <path d="M193 220C193 242.091 175.091 260 153 260H133C110.909 260 93 242.091 93 220V200C93 177.909 110.909 160 133 160H153C175.091 160 193 177.909 193 200V220Z" fill={googleColors.red} />
            <path d="M210 70C210 81.0457 201.046 90 190 90H170C158.954 90 150 81.0457 150 70V50C150 38.9543 158.954 30 170 30H190C201.046 30 210 38.9543 210 50V70Z" fill={googleColors.yellow} />
            
            {/* Connecting lines */}
            <path d="M278 120L318 120" stroke={googleColors.blue} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
            <path d="M210 70L258 100" stroke={googleColors.yellow} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
            <path d="M193 200L153 200" stroke={googleColors.red} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
            <path d="M278 100L318 120" stroke={googleColors.blue} strokeWidth="2" strokeLinecap="round" />
            <path d="M210 50L258 100" stroke={googleColors.yellow} strokeWidth="2" strokeLinecap="round" />
            <path d="M193 220L153 200" stroke={googleColors.red} strokeWidth="2" strokeLinecap="round" />
            
            {/* Network nodes */}
            <circle cx="370" cy="170" r="4" fill={googleColors.gray} />
            <circle cx="350" cy="200" r="4" fill={googleColors.gray} />
            <circle cx="390" cy="150" r="4" fill={googleColors.gray} />
            <circle cx="320" cy="190" r="4" fill={googleColors.gray} />
            <circle cx="270" cy="150" r="4" fill={googleColors.gray} />
            <circle cx="240" cy="180" r="4" fill={googleColors.gray} />
            <circle cx="170" cy="240" r="4" fill={googleColors.gray} />
            <circle cx="140" cy="270" r="4" fill={googleColors.gray} />
            <circle cx="110" cy="300" r="4" fill={googleColors.gray} />
            <circle cx="80" cy="330" r="4" fill={googleColors.gray} />
          </svg>

          {/* Engineer PNG Image - perfectly aligned to bottom */}
          <img 
            src={engineerImage} 
            alt="MEP Engineer" 
            style={styles.engineerImage} 
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;