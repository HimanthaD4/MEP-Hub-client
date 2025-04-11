import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ProjectsSection = ({ projects = [], searchTerm = '', loading, setSearchTerm }) => {
  const safeProjects = Array.isArray(projects) ? projects : [];

  const filteredProjects = safeProjects
    .filter(project =>
      project &&
      project.visible &&
      (
        (project.title && project.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.contractor && project.contractor.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )
    .slice(0, 4);

  const googleColors = {
    red: '#EA4335',
    yellow: '#FBBC05',
    blue: '#4285F4',
  };

  const styles = {
    section: {
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      borderRadius: '24px',
      padding: '40px 20px',
      margin: '60px auto',
      textAlign: 'center',
      maxWidth: '1200px',
      fontFamily: "'Outfit', sans-serif"
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: googleColors.red,
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#6b7280',
      marginBottom: '40px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      justifyContent: 'center',
      alignItems: 'stretch',
      marginBottom: '30px'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      textAlign: 'left',
      transition: 'transform 0.2s ease-in-out',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    image: {
      backgroundColor: googleColors.blue,
      color: 'white',
      padding: '30px 0',
      fontSize: '2rem',
      fontWeight: '700',
      textAlign: 'center'
    },
    content: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexGrow: 1
    },
    projectTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '6px'
    },
    contractor: {
      fontSize: '0.95rem',
      color: '#6b7280',
      marginBottom: '12px'
    },
    dateRow: {
      display: 'flex',
      alignItems: 'center',
      color: '#6b7280',
      fontSize: '0.85rem',
      marginBottom: '12px'
    },
    status: {
      fontSize: '0.85rem',
      fontWeight: '500',
      color: googleColors.yellow,
      backgroundColor: 'rgba(251, 191, 36, 0.15)',
      padding: '4px 10px',
      borderRadius: '9999px',
      alignSelf: 'flex-start'
    },
    viewAllButton: {
      padding: '12px 24px',
      backgroundColor: googleColors.blue,
      color: 'white',
      fontSize: '1rem',
      fontWeight: '600',
      borderRadius: '9999px',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'background-color 0.3s ease',
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Upcoming MEP Projects</h2>
      <p style={styles.subtitle}>
        Be the first to know about new projects and opportunities in Sri Lanka's MEP sector.
      </p>

      {loading ? (
        <div style={styles.grid}>
          {[1, 2, 3].map(i => (
            <div key={i} style={styles.card}>
              <div style={styles.image}>...</div>
              <div style={styles.content}>
                <div style={{ height: '20px', background: '#e5e7eb', marginBottom: '10px', borderRadius: '4px' }} />
                <div style={{ height: '15px', background: '#e5e7eb', marginBottom: '8px', borderRadius: '4px', width: '80%' }} />
                <div style={{ height: '15px', background: '#e5e7eb', borderRadius: '4px', width: '60%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div style={styles.grid}>
          {filteredProjects.map(project => (
            <Link to={`/projects/${project._id}`} key={project._id} style={{ textDecoration: 'none' }}>
              <div style={styles.card}>
                <div style={styles.image}>
                  {project.title?.split(' ').map(word => word[0]).join('').toUpperCase()}
                </div>
                <div style={styles.content}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  <p style={styles.contractor}>{project.contractor}</p>
                  <p style={styles.dateRow}>
                    <svg style={{ width: '16px', height: '16px', marginRight: '6px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6b7280">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {project.startDate && format(new Date(project.startDate), 'MMM d, yyyy')}
                  </p>
                  <span style={styles.status}>{project.status}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            No upcoming projects found matching your search.
          </p>
          <button onClick={() => setSearchTerm('')} style={styles.viewAllButton}>
            Clear Search
          </button>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <Link to="/projects" style={styles.viewAllButton}>
          View All Projects
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
