import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [consultantFirms, setConsultantFirms] = useState([]);
  const [contractorFirms, setContractorFirms] = useState([]);
  const [agents, setAgents] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, consultantsRes, contractorsRes, agentsRes, directorsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/projects`),
          axios.get(`${API_BASE_URL}/consultants`),
          axios.get(`${API_BASE_URL}/contractors`),
          axios.get(`${API_BASE_URL}/agents`),
          axios.get(`${API_BASE_URL}/directors`)
        ]);
        setProjects(projectsRes.data);
        setConsultantFirms(consultantsRes.data);
        setContractorFirms(contractorsRes.data);
        setAgents(agentsRes.data);
        setDirectors(directorsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = projects.filter(project => 
    project.visible && (
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.contractor.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredConsultantFirms = consultantFirms.filter(consultant => 
    consultant.visible && (
      consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultant.companyEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultant.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  ).slice(0, 3);

  const filteredContractorFirms = contractorFirms.filter(contractor => 
    contractor.visible && (
      contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.companyEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  ).slice(0, 3);

  const filteredAgents = agents.filter(agent => 
    agent.visible && (
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.companyEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.equipmentType.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  ).slice(0, 3);

  const filteredDirectors = directors.filter(director => 
    director.visible && (
      director.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.areasOfExpertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  ).slice(0, 3);

  const styles = {
    container: {
      fontFamily: "'Outfit', sans-serif",
      color: '#111827'
    },
    hero: {
      position: 'relative',
      padding: '80px 24px',
      background: 'linear-gradient(to bottom right, #f8fafc 0%, #f1f5f9 100%)',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    },
    heroContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left'
    },
    title: {
      fontSize: 'clamp(36px, 5vw, 64px)',
      fontWeight: 700,
      marginBottom: '24px',
      lineHeight: 1.1,
      letterSpacing: '-1px'
    },
    gradientText: {
      background: 'linear-gradient(90deg, #1a56db 0%, #0ea5e9 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block'
    },
    subtitle: {
      fontSize: 'clamp(18px, 2vw, 22px)',
      fontWeight: 400,
      marginBottom: '48px',
      color: '#4b5563',
      maxWidth: '600px',
      lineHeight: 1.5
    },
    searchContainer: {
      maxWidth: '700px',
      width: '100%',
      marginBottom: '40px'
    },
    searchBox: {
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      height: '60px',
      border: '1px solid rgba(0,0,0,0.05)'
    },
    searchInput: {
      flex: 1,
      padding: '0 24px',
      border: 'none',
      fontSize: '16px',
      outline: 'none',
      fontWeight: 400
    },
    searchButton: {
      padding: '0 32px',
      backgroundColor: '#1a56db',
      color: 'white',
      border: 'none',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#1e40af'
      }
    },
    statsContainer: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    },
    statBadge: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: 'rgba(26,86,219,0.08)',
      borderRadius: '50px',
      fontSize: '14px',
      fontWeight: 600,
      color: '#1a56db'
    },
    contentSection: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '60px 24px'
    },
    adminSection: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '60px 24px',
      backgroundColor: '#f8fafc',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    },
    sectionTitle: {
      fontSize: 'clamp(28px, 3vw, 36px)',
      fontWeight: 700,
      marginBottom: '32px',
      color: '#111827',
      textTransform: 'capitalize'
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(0,0,0,0.05)',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
      }
    },
    cardPlaceholder: {
      height: '180px',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af'
    },
    cardContent: {
      padding: '20px'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 700,
      marginBottom: '12px'
    },
    cardText: {
      color: '#64748b',
      marginBottom: '12px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      backgroundColor: '#f1f5f9',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: 600,
      color: '#1a56db',
      marginBottom: '16px'
    },
    specialtyBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      backgroundColor: '#f1f5f9',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: 600,
      color: '#1a56db',
      marginRight: '8px',
      marginBottom: '8px'
    },
    directorBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      backgroundColor: '#e0f2fe',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: 600,
      color: '#0369a1',
      marginRight: '8px',
      marginBottom: '8px'
    },
    experienceBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      backgroundColor: '#ecfdf5',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: 600,
      color: '#059669',
      marginRight: '8px'
    },
    emptyState: {
      padding: '40px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      textAlign: 'center',
      border: '1px dashed rgba(0,0,0,0.1)'
    },
    emptyStateTitle: {
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '12px',
      color: '#1e293b'
    },
    ctaButton: {
      padding: '12px 24px',
      backgroundColor: '#1a56db',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#1e40af'
      }
    },
    adminCtaButton: {
      padding: '12px 24px',
      backgroundColor: '#0369a1',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#075985'
      }
    }
  };

  return (
    <div style={styles.container}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            <span style={styles.gradientText}>MEP Hub</span> - Sri Lanka's Construction Network
          </h1>
          
          <p style={styles.subtitle}>
            Connecting projects with the best MEP consultant firms in Sri Lanka's construction industry.
          </p>
          
          <div style={styles.searchContainer}>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Search projects, consultant firms..."
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
              {projects.length}+ Active Projects
            </div>
            <div style={styles.statBadge}>
              {consultantFirms.length}+ Verified Consultant Firms
            </div>
            <div style={styles.statBadge}>
              {contractorFirms.length}+ Verified Contractor Firms
            </div>
            <div style={styles.statBadge}>
              {agents.length}+ Verified Suppliers
            </div>
            <div style={styles.statBadge}>
              {directors.length}+ Industry Leaders
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={styles.contentSection}>
          <h2 style={styles.sectionTitle}>Featured Projects</h2>
          
          {loading ? (
            <div style={styles.cardGrid}>
              {[1, 2, 3].map((item) => (
                <div key={item} style={styles.card}>
                  <div style={styles.cardPlaceholder}>
                    Loading...
                  </div>
                  <div style={styles.cardContent}>
                    <div style={{ height: '24px', width: '80%', backgroundColor: '#f1f5f9', marginBottom: '16px', borderRadius: '4px' }}></div>
                    <div style={{ height: '16px', width: '60%', backgroundColor: '#f1f5f9', marginBottom: '24px', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <>
              <div style={styles.cardGrid}>
                {filteredProjects.slice(0, 3).map(project => (
                  <Link to={`/projects/${project._id}`} key={project._id} style={{ textDecoration: 'none' }}>
                    <div style={styles.card}>
                      <div style={styles.cardContent}>
                        <h3 style={styles.cardTitle}>{project.title}</h3>
                        <p style={styles.cardText}>{project.contractor}</p>
                        <div style={styles.statusBadge}>{project.status}</div>
                        <p style={styles.cardText}>
                          Starts {format(new Date(project.startDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/projects" style={styles.ctaButton}>
                  View All Projects
                </Link>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyStateTitle}>No matching projects found</h3>
              <button 
                onClick={() => setSearchTerm('')}
                style={styles.ctaButton}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        <div style={styles.contentSection}>
          <h2 style={styles.sectionTitle}>Featured Consultant Firms</h2>
          
          {loading ? (
            <div style={styles.cardGrid}>
              {[1, 2, 3].map((item) => (
                <div key={item} style={styles.card}>
                  <div style={styles.cardPlaceholder}>
                    Loading...
                  </div>
                  <div style={styles.cardContent}>
                    <div style={{ height: '24px', width: '80%', backgroundColor: '#f1f5f9', marginBottom: '16px', borderRadius: '4px' }}></div>
                    <div style={{ height: '16px', width: '60%', backgroundColor: '#f1f5f9', marginBottom: '24px', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredConsultantFirms.length > 0 ? (
            <>
              <div style={styles.cardGrid}>
                {filteredConsultantFirms.map(consultant => (
                  <Link to={`/consultants/${consultant._id}`} key={consultant._id} style={{ textDecoration: 'none' }}>
                    <div style={styles.card}>
                      <div style={styles.cardContent}>
                        <h3 style={styles.cardTitle}>{consultant.name}</h3>
                        <p style={styles.cardText}>{consultant.companyEmail}</p>
                        <div style={{ marginBottom: '16px' }}>
                          {consultant.specialties.slice(0, 2).map((specialty, i) => (
                            <span key={i} style={styles.specialtyBadge}>
                              {specialty.split(' ')[0]}...
                            </span>
                          ))}
                          {consultant.specialties.length > 2 && (
                            <span style={styles.specialtyBadge}>
                              +{consultant.specialties.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/consultants" style={styles.ctaButton}>
                  View All Consultant Firms
                </Link>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyStateTitle}>No matching consultant firms found</h3>
              <button 
                onClick={() => setSearchTerm('')}
                style={styles.ctaButton}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        <div style={styles.contentSection}>
          <h2 style={styles.sectionTitle}>Featured Contractor Firms</h2>
          
          {loading ? (
            <div style={styles.cardGrid}>
              {[1, 2, 3].map((item) => (
                <div key={item} style={styles.card}>
                  <div style={styles.cardPlaceholder}>
                    Loading...
                  </div>
                  <div style={styles.cardContent}>
                    <div style={{ height: '24px', width: '80%', backgroundColor: '#f1f5f9', marginBottom: '16px', borderRadius: '4px' }}></div>
                    <div style={{ height: '16px', width: '60%', backgroundColor: '#f1f5f9', marginBottom: '24px', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredContractorFirms.length > 0 ? (
            <>
              <div style={styles.cardGrid}>
                {filteredContractorFirms.map(contractor => (
                  <Link to={`/contractors/${contractor._id}`} key={contractor._id} style={{ textDecoration: 'none' }}>
                    <div style={styles.card}>
                      <div style={styles.cardContent}>
                        <h3 style={styles.cardTitle}>{contractor.name}</h3>
                        <p style={styles.cardText}>{contractor.companyEmail}</p>
                        <div style={{ marginBottom: '16px' }}>
                          {contractor.specialties.slice(0, 2).map((specialty, i) => (
                            <span key={i} style={styles.specialtyBadge}>
                              {specialty.split(' ')[0]}...
                            </span>
                          ))}
                          {contractor.specialties.length > 2 && (
                            <span style={styles.specialtyBadge}>
                              +{contractor.specialties.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/contractors" style={styles.ctaButton}>
                  View All Contractor Firms
                </Link>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyStateTitle}>No matching contractor firms found</h3>
              <button 
                onClick={() => setSearchTerm('')}
                style={styles.ctaButton}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        <div style={styles.contentSection}>
          <h2 style={styles.sectionTitle}>Suppliers, Dealers & Agents</h2>
          
          {loading ? (
            <div style={styles.cardGrid}>
              {[1, 2, 3].map((item) => (
                <div key={item} style={styles.card}>
                  <div style={styles.cardPlaceholder}>
                    Loading...
                  </div>
                  <div style={styles.cardContent}>
                    <div style={{ height: '24px', width: '80%', backgroundColor: '#f1f5f9', marginBottom: '16px', borderRadius: '4px' }}></div>
                    <div style={{ height: '16px', width: '60%', backgroundColor: '#f1f5f9', marginBottom: '24px', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAgents.length > 0 ? (
            <>
              <div style={styles.cardGrid}>
                {filteredAgents.map(agent => (
                  <Link to={`/agents/${agent._id}`} key={agent._id} style={{ textDecoration: 'none' }}>
                    <div style={styles.card}>
                      <div style={styles.cardContent}>
                        <h3 style={styles.cardTitle}>{agent.name}</h3>
                        <p style={styles.cardText}>{agent.companyEmail}</p>
                        <div style={{ marginBottom: '16px' }}>
                          {agent.equipmentType.slice(0, 2).map((equipment, i) => (
                            <span key={i} style={styles.specialtyBadge}>
                              {equipment.split(' ')[0]}...
                            </span>
                          ))}
                          {agent.equipmentType.length > 2 && (
                            <span style={styles.specialtyBadge}>
                              +{agent.equipmentType.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/agents" style={styles.ctaButton}>
                  View All Suppliers
                </Link>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyStateTitle}>No matching suppliers found</h3>
              <button 
                onClick={() => setSearchTerm('')}
                style={styles.ctaButton}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        <div style={styles.adminSection}>
          <h2 style={styles.sectionTitle}>Industry Leaders</h2>
          
          {loading ? (
            <div style={styles.cardGrid}>
              {[1, 2, 3].map((item) => (
                <div key={item} style={styles.card}>
                  <div style={styles.cardPlaceholder}>
                    Loading...
                  </div>
                  <div style={styles.cardContent}>
                    <div style={{ height: '24px', width: '80%', backgroundColor: '#f1f5f9', marginBottom: '16px', borderRadius: '4px' }}></div>
                    <div style={{ height: '16px', width: '60%', backgroundColor: '#f1f5f9', marginBottom: '24px', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDirectors.length > 0 ? (
            <>
              <div style={styles.cardGrid}>
                {filteredDirectors.map(director => (
                  <Link to={`/directors/${director._id}`} key={director._id} style={{ textDecoration: 'none' }}>
                    <div style={styles.card}>
                      <div style={styles.cardContent}>
                        <h3 style={styles.cardTitle}>{director.name}</h3>
                        <p style={styles.cardText}>{director.company}</p>
                        <div style={{ marginBottom: '12px' }}>
                          <span style={styles.experienceBadge}>
                            {director.yearsOfExperience} years experience
                          </span>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                          {director.areasOfExpertise.slice(0, 3).map((expertise, i) => (
                            <span key={i} style={styles.directorBadge}>
                              {expertise}
                            </span>
                          ))}
                          {director.areasOfExpertise.length > 3 && (
                            <span style={styles.directorBadge}>
                              +{director.areasOfExpertise.length - 3} more
                            </span>
                          )}
                        </div>
                        <p style={styles.cardText}>
                          {director.position}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/directors" style={styles.adminCtaButton}>
                  Meet All Industry Leaders
                </Link>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyStateTitle}>No matching directors found</h3>
              <button 
                onClick={() => setSearchTerm('')}
                style={styles.adminCtaButton}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;