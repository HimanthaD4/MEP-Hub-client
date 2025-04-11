import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ projects, consultantFirms, contractorFirms, agents, searchTerm, setSearchTerm }) => {
  const styles = {
    hero: {
      position: 'relative',
      padding: '120px 24px 80px',
      color: '#202124', // Google's dark text color
      textAlign: 'left',
      overflow: 'hidden',
      backgroundColor: '#f8f9fa', // Light background
      display: 'flex',
      alignItems: 'center',
      minHeight: '90vh',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        textAlign: 'center',
        padding: '100px 24px 60px'
      }
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      '@media (max-width: 768px)': {
        flexDirection: 'column'
      }
    },
    content: {
      flex: 1,
      paddingRight: '40px',
      maxWidth: '600px',
      position: 'relative',
      zIndex: 2,
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
      color: '#1a0dab', // Google blue for titles
      position: 'relative',
      display: 'inline-block',
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: '-8px',
        left: '0',
        width: '80px',
        height: '4px',
        background: '#f4b400', // Google yellow
        borderRadius: '2px'
      }
    },
    subtitle: {
      fontSize: 'clamp(16px, 2vw, 20px)',
      fontWeight: 400,
      marginBottom: '32px',
      color: '#5f6368', // Google's secondary text
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
        color: '#9aa0a6' // Google's placeholder color
      }
    },
    searchButton: {
      padding: '0 32px',
      backgroundColor: '#1a73e8', // Google blue
      color: 'white',
      border: 'none',
      fontSize: '16px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#1765cc'
      },
      '@media (max-width: 480px)': {
        padding: '0 24px'
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
      color: '#1a73e8', // Google blue
      fontWeight: 600,
      marginRight: '4px'
    },
    illustration: {
      flex: 1,
      maxWidth: '600px',
      position: 'relative',
      '@media (max-width: 768px)': {
        maxWidth: '100%',
        marginTop: '40px'
      }
    },
    svgIllustration: {
      width: '100%',
      height: 'auto',
      maxHeight: '500px'
    },
    decorativeElements: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      overflow: 'hidden',
      zIndex: 1
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
      color: 'rgba(234,67,53,0.03)', // Google red very subtle
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
        transform: 'translate(-50%, -50%)',
        opacity: 0.1
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
      
      {/* Decorative elements */}
      <div style={styles.decorativeElements}>
        <div style={{
          ...styles.decorativeCircle,
          width: '300px',
          height: '300px',
          backgroundColor: googleColors.blue,
          top: '-100px',
          right: '-100px'
        }} />
        <div style={{
          ...styles.decorativeCircle,
          width: '200px',
          height: '200px',
          backgroundColor: googleColors.yellow,
          bottom: '-50px',
          right: '20%'
        }} />
        <div style={{
          ...styles.decorativeCircle,
          width: '150px',
          height: '150px',
          backgroundColor: googleColors.red,
          top: '30%',
          left: '10%'
        }} />
      </div>

      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>
            Sri Lanka's Premier <span style={{ color: googleColors.red }}>MEP</span> Network
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

        <div style={styles.illustration}>
          <svg style={styles.svgIllustration} viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Modern abstract illustration with Google colors */}
            <rect width="600" height="500" fill="#f8f9fa" />
            
            {/* Blue elements */}
            <path d="M450 150C450 206.228 404.228 252 348 252C291.772 252 246 206.228 246 150C246 93.7715 291.772 48 348 48C404.228 48 450 93.7715 450 150Z" fill={googleColors.blue} fillOpacity="0.1" />
            <path d="M500 350C500 380.928 475.928 405 445 405C414.072 405 390 380.928 390 350C390 319.072 414.072 295 445 295C475.928 295 500 319.072 500 350Z" fill={googleColors.blue} fillOpacity="0.1" />
            
            {/* Red elements */}
            <path d="M150 250C150 289.823 183.177 323 223 323C262.823 323 296 289.823 296 250C296 210.177 262.823 177 223 177C183.177 177 150 210.177 150 250Z" fill={googleColors.red} fillOpacity="0.1" />
            <path d="M100 400C100 428.719 123.281 452 152 452C180.719 452 204 428.719 204 400C204 371.281 180.719 348 152 348C123.281 348 100 371.281 100 400Z" fill={googleColors.red} fillOpacity="0.1" />
            
            {/* Yellow elements */}
            <path d="M300 100C300 133.137 273.137 160 240 160C206.863 160 180 133.137 180 100C180 66.8629 206.863 40 240 40C273.137 40 300 66.8629 300 100Z" fill={googleColors.yellow} fillOpacity="0.1" />
            
            {/* Main illustration - Construction professionals */}
            <path d="M348 150C348 172.091 330.091 190 308 190H288C265.909 190 248 172.091 248 150V130C248 107.909 265.909 90 288 90H308C330.091 90 348 107.909 348 130V150Z" fill={googleColors.blue} />
            <path d="M223 250C223 272.091 205.091 290 183 290H163C140.909 290 123 272.091 123 250V230C123 207.909 140.909 190 163 190H183C205.091 190 223 207.909 223 230V250Z" fill={googleColors.red} />
            <path d="M240 100C240 111.046 231.046 120 220 120H200C188.954 120 180 111.046 180 100V80C180 68.9543 188.954 60 200 60H220C231.046 60 240 68.9543 240 80V100Z" fill={googleColors.yellow} />
            
            {/* Connecting lines */}
            <path d="M308 150L348 150" stroke={googleColors.blue} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
            <path d="M240 100L288 130" stroke={googleColors.yellow} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
            <path d="M223 230L183 230" stroke={googleColors.red} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
            <path d="M308 130L348 150" stroke={googleColors.blue} strokeWidth="2" strokeLinecap="round" />
            <path d="M240 80L288 130" stroke={googleColors.yellow} strokeWidth="2" strokeLinecap="round" />
            <path d="M223 250L183 230" stroke={googleColors.red} strokeWidth="2" strokeLinecap="round" />
            
            {/* Small dots representing network nodes */}
            <circle cx="400" cy="200" r="4" fill={googleColors.gray} />
            <circle cx="380" cy="230" r="4" fill={googleColors.gray} />
            <circle cx="420" cy="180" r="4" fill={googleColors.gray} />
            <circle cx="350" cy="220" r="4" fill={googleColors.gray} />
            <circle cx="300" cy="180" r="4" fill={googleColors.gray} />
            <circle cx="270" cy="210" r="4" fill={googleColors.gray} />
            <circle cx="200" cy="270" r="4" fill={googleColors.gray} />
            <circle cx="170" cy="300" r="4" fill={googleColors.gray} />
            <circle cx="140" cy="330" r="4" fill={googleColors.gray} />
            <circle cx="110" cy="360" r="4" fill={googleColors.gray} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;