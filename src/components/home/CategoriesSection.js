import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesSection = ({ 
  projects = [], 
  consultantFirms = [], 
  contractorFirms = [], 
  agents = [], 
  directors = [], 
  lecturers = [],
  institutions = [],
  jobVacancies = [],
  jobseekers = []
}) => {
  const styles = {
    contentSection: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '80px 24px',
      position: 'relative'
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '40px',
      textAlign: 'center',
      color: '#1e3a8a',
      position: 'relative'
    },
    sectionTitleAfter: {
      content: '""',
      display: 'block',
      width: '80px',
      height: '4px',
      backgroundColor: '#dc2626',
      margin: '16px auto 0',
      borderRadius: '2px'
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '60px'
    },
    categoryCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 30px rgba(0,0,0,0.12)'
      },
      position: 'relative'
    },
    categoryContent: {
      padding: '30px',
      position: 'relative',
      zIndex: 2
    },
    categoryTitle: {
      fontSize: '24px',
      fontWeight: 700,
      marginBottom: '16px',
      color: '#1e3a8a'
    },
    categoryCount: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '20px',
      color: '#dc2626'
    },
    categoryDescription: {
      fontSize: '16px',
      color: '#4b5563',
      marginBottom: '24px',
      lineHeight: 1.5
    },
    ctaButton: {
      display: 'inline-block',
      padding: '12px 24px',
      backgroundColor: '#1a56db',
      color: 'white',
      borderRadius: '8px',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#1e40af',
        transform: 'translateY(-2px)'
      }
    },
    yellowCtaButton: {
      display: 'inline-block',
      padding: '12px 24px',
      backgroundColor: '#fbbf24',
      color: '#ffffff',
      borderRadius: '8px',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#f59e0b',
        transform: 'translateY(-2px)'
      }
    },
    categoryIcon: {
      width: '80px',
      height: '80px',
      marginBottom: '20px',
      display: 'inline-block'
    },
    decorativeElement: {
      position: 'absolute',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, rgba(251,191,36,0) 70%)',
      zIndex: 1
    },
    decorativeElementBlue: {
      position: 'absolute',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(26,86,219,0.2) 0%, rgba(26,86,219,0) 70%)',
      zIndex: 1
    },
    decorativeElementRed: {
      position: 'absolute',
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0) 70%)',
      zIndex: 1
    }
  };

  return (
    <div style={styles.contentSection}>
      <h2 style={styles.sectionTitle}>
        Explore Our Network
        <div style={styles.sectionTitleAfter}></div>
      </h2>
      
      <div style={styles.categoriesGrid}>
        {/* Consultants Card */}
        <div style={styles.categoryCard}>
          <div style={{...styles.decorativeElementBlue, top: '-30px', right: '-30px'}} />
          <div style={styles.categoryContent}>
            <svg style={styles.categoryIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#1a56db">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 style={styles.categoryTitle}>Consultant Firms</h3>
            <div style={styles.categoryCount}>{consultantFirms.length}+ Verified Firms</div>
            <p style={styles.categoryDescription}>
              Find the perfect MEP consulting partner for your project from our network of top-rated professionals.
            </p>
            <Link to="/consultants" style={styles.ctaButton}>
              Browse Consultants
            </Link>
          </div>
        </div>

        {/* Contractors Card */}
        <div style={styles.categoryCard}>
          <div style={{...styles.decorativeElementRed, bottom: '-30px', left: '-30px'}} />
          <div style={styles.categoryContent}>
            <svg style={styles.categoryIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#dc2626">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 style={styles.categoryTitle}>Contractor Firms</h3>
            <div style={styles.categoryCount}>{contractorFirms.length}+ Qualified Contractors</div>
            <p style={styles.categoryDescription}>
              Connect with reliable MEP contractors who can deliver quality work on time and within budget.
            </p>
            <Link to="/contractors" style={{...styles.ctaButton, backgroundColor: '#dc2626', ':hover': { backgroundColor: '#b91c1c' }}}>
              Find Contractors
            </Link>
          </div>
        </div>

        {/* Suppliers Card */}
        <div style={styles.categoryCard}>
          <div style={{...styles.decorativeElement, top: '-20px', left: '50%'}} />
          <div style={styles.categoryContent}>
            <svg style={styles.categoryIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fbbf24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 style={styles.categoryTitle}>Suppliers & Agents</h3>
            <div style={styles.categoryCount}>{agents.length}+ Trusted Suppliers</div>
            <p style={styles.categoryDescription}>
              Source quality MEP equipment and materials from verified suppliers and authorized agents.
            </p>
            <Link to="/agents" style={styles.yellowCtaButton}>
              Explore Suppliers
            </Link>
          </div>
        </div>

        {/* Lecturers Card */}
        <div style={styles.categoryCard}>
          <div style={{...styles.decorativeElementBlue, bottom: '-20px', right: '-20px'}} />
          <div style={styles.categoryContent}>
            <svg style={styles.categoryIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#1a56db">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 style={styles.categoryTitle}>Lecturers & Training</h3>
            <div style={styles.categoryCount}>{lecturers.length}+ Expert Lecturers</div>
            <p style={styles.categoryDescription}>
              Access top MEP educators and training programs to enhance your skills and knowledge.
            </p>
            <Link to="/lecturers" style={styles.ctaButton}>
              Learn More
            </Link>
          </div>
        </div>

        {/* Industry Leaders Card */}
        <div style={styles.categoryCard}>
          <div style={{...styles.decorativeElementRed, top: '-20px', left: '-20px'}} />
          <div style={styles.categoryContent}>
            <svg style={styles.categoryIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#dc2626">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 style={styles.categoryTitle}>Industry Leaders</h3>
            <div style={styles.categoryCount}>{directors.length}+ Directors & Experts</div>
            <p style={styles.categoryDescription}>
              Connect with experienced MEP industry leaders and directors for guidance and collaboration.
            </p>
            <Link to="/directors" style={{...styles.ctaButton, backgroundColor: '#dc2626', ':hover': { backgroundColor: '#b91c1c' }}}>
              Meet Leaders
            </Link>
          </div>
        </div>

        {/* Projects Card */}
        <div style={styles.categoryCard}>
          <div style={{...styles.decorativeElement, bottom: '-20px', right: '-20px'}} />
          <div style={styles.categoryContent}>
            <svg style={styles.categoryIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fbbf24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 style={styles.categoryTitle}>Projects</h3>
            <div style={styles.categoryCount}>{projects.length}+ Active Projects</div>
            <p style={styles.categoryDescription}>
              Discover ongoing and upcoming MEP projects across Sri Lanka looking for partners and suppliers.
            </p>
            <Link to="/projects" style={styles.yellowCtaButton}>
              View Projects
            </Link>
          </div>
        </div>

        {/* Institutions Card */}
        <div style={styles.categoryCard}>
          <div style={{...styles.decorativeElementBlue, bottom: '-20px', right: '-20px'}} />
          <div style={styles.categoryContent}>
            <svg style={styles.categoryIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#1a56db">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 style={styles.categoryTitle}>Institutions</h3>
            <div style={styles.categoryCount}>{institutions.length}+ Institutions</div>
            <p style={styles.categoryDescription}>
              Access top MEP educators and training programs to enhance your skills and knowledge.
            </p>
            <Link to="/institutions" style={styles.ctaButton}>
              View Institutions
            </Link>
          </div>
        </div>

        {/* Job Vacancies Card */}
        <div style={styles.categoryCard}>
          <div style={{...styles.decorativeElementRed, top: '-20px', left: '-20px'}} />
          <div style={styles.categoryContent}>
            <svg style={styles.categoryIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#dc2626">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 style={styles.categoryTitle}>Job Vacancies</h3>
            <div style={styles.categoryCount}>{jobVacancies.length}+ Open Positions</div>
            <p style={styles.categoryDescription}>
              Browse current job openings in the MEP industry and find your next career opportunity.
            </p>
            <Link to="/job-vacancies" style={{...styles.ctaButton, backgroundColor: '#dc2626', ':hover': { backgroundColor: '#b91c1c' }}}>
              View Vacancies
            </Link>
          </div>
        </div>

        {/* Job Seekers Card */}
        <div style={styles.categoryCard}>
          <div style={{...styles.decorativeElement, bottom: '-20px', right: '-20px'}} />
          <div style={styles.categoryContent}>
            <svg style={styles.categoryIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fbbf24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 style={styles.categoryTitle}>Job Seekers</h3>
            <div style={styles.categoryCount}>{jobseekers.length}+ Professionals</div>
            <p style={styles.categoryDescription}>
              Connect with skilled MEP professionals looking for new opportunities in the industry.
            </p>
            <Link to="/jobseekers" style={styles.yellowCtaButton}>
              Find Talent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;