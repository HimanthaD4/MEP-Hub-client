import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const styles = {
    footer: {
      backgroundColor: '#111827',
      color: 'white',
      padding: '60px 24px 40px',
      fontFamily: "'Outfit', sans-serif"
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr 1fr',
        gap: '30px'
      },
      '@media (max-width: 480px)': {
        gridTemplateColumns: '1fr',
        gap: '20px'
      }
    },
    logoSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    logo: {
      fontSize: '24px',
      fontWeight: 700,
      color: 'white',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    tagline: {
      color: '#9CA3AF',
      fontSize: '15px',
      lineHeight: 1.6,
      marginTop: '8px'
    },
    socialLinks: {
      display: 'flex',
      gap: '16px',
      marginTop: '20px'
    },
    socialIcon: {
      color: '#9CA3AF',
      fontSize: '20px',
      transition: 'all 0.3s ease',
      ':hover': {
        color: '#3B82F6'
      }
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '20px',
      color: 'white'
    },
    linkList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    linkItem: {
      color: '#9CA3AF',
      textDecoration: 'none',
      fontSize: '15px',
      transition: 'all 0.2s ease',
      ':hover': {
        color: '#3B82F6',
        paddingLeft: '4px'
      }
    },
    bottomBar: {
      maxWidth: '1280px',
      margin: '40px auto 0',
      paddingTop: '24px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      '@media (min-width: 768px)': {
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    },
    copyright: {
      color: '#9CA3AF',
      fontSize: '14px',
      textAlign: 'center'
    },
    legalLinks: {
      display: 'flex',
      gap: '20px'
    },
    legalLink: {
      color: '#9CA3AF',
      fontSize: '14px',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      ':hover': {
        color: '#3B82F6'
      }
    }
  };

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
       
     
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Projects', path: '/projects' },
        { name: 'Consultants', path: '/consultants' },
        { name: 'Contractors', path: '/contractors' },
        { name: 'Job Vacancies', path: '/job-vacancies' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        // { name: 'Cookie Policy', path: '/cookies' }
      ]
    }
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.logoSection}>
          <Link to="/" style={styles.logo}>
            mephub<span style={{ color: '#3B82F6' }}>.</span><span style={{ color: '#EF4444' }}>lk</span>
          </Link>
          <p style={styles.tagline}>
            Connecting Sri Lanka's MEP professionals and businesses for better collaboration and growth.
          </p>
          <div style={styles.socialLinks}>
            <a href="https://linkedin.com" aria-label="LinkedIn" style={styles.socialIcon}>
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" style={styles.socialIcon}>
              <FaTwitter />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" style={styles.socialIcon}>
              <FaFacebook />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" style={styles.socialIcon}>
              <FaInstagram />
            </a>
          </div>
        </div>

        {footerLinks.map((section, index) => (
          <div key={index}>
            <h3 style={styles.sectionTitle}>{section.title}</h3>
            <div style={styles.linkList}>
              {section.links.map((link, linkIndex) => (
                <Link key={linkIndex} to={link.path} style={styles.linkItem}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.bottomBar}>
        <p style={styles.copyright}>
          © {currentYear} MEP Hub. All rights reserved.
        </p>
        <div style={styles.legalLinks}>
          <Link to="/privacy" style={styles.legalLink}>Privacy Policy</Link>
          <Link to="/terms" style={styles.legalLink}>Terms of Service</Link>
          <Link to="/cookies" style={styles.legalLink}>Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;