import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        setProjects(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    if (!project) return false;
    return (
      (project.title && project.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.contractor && project.contractor.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Styles
  const styles = {
    container: {
      fontFamily: "'Outfit', sans-serif",
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '40px 20px',
      color: '#111827'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
      flexWrap: 'wrap',
      gap: '20px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 700,
      margin: 0
    },
    searchBox: {
      padding: '10px 16px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      minWidth: '250px',
      flex: 1,
      maxWidth: '400px'
    },

    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
    cardContent: {
      padding: '20px'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 700,
      marginBottom: '12px',
      color: '#111827'
    },
    cardText: {
      color: '#64748b',
      marginBottom: '12px',
      fontSize: '14px',
      lineHeight: 1.5
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
    actionButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 20px',
      backgroundColor: '#f8fafc',
      color: '#1a56db',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(26,86,219,0.2)',
      ':hover': {
        backgroundColor: '#1a56db',
        color: 'white'
      }
    },
    emptyState: {
      padding: '40px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      textAlign: 'center',
      border: '1px dashed rgba(0,0,0,0.1)',
      gridColumn: '1 / -1'
    },
    emptyStateTitle: {
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '12px',
      color: '#1e293b'
    },
    errorMessage: {
      color: '#dc2626',
      textAlign: 'center',
      padding: '40px',
      fontSize: '18px'
    },
    loadingMessage: {
      textAlign: 'center',
      padding: '40px',
      color: '#4b5563'
    }
  };

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorMessage}>{error}</div>
        <button 
          onClick={() => window.location.reload()}
          style={styles.backButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return <div style={styles.loadingMessage}>Loading projects...</div>;
  }

  return (
    <div style={styles.container}>
      
      
      <div style={styles.header}>
        <h1 style={styles.title}>All Projects</h1>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBox}
        />
      </div>
      
      {filteredProjects.length > 0 ? (
        <div style={styles.cardGrid}>
          {filteredProjects.map(project => (
            <Link to={`/projects/${project._id}`} key={project._id} style={{ textDecoration: 'none' }}>
              <div style={styles.card}>
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{project.title || 'Untitled Project'}</h3>
                  <p style={styles.cardText}>{project.contractor || 'Contractor not specified'}</p>
                  {project.status && (
                    <div style={styles.statusBadge}>{project.status}</div>
                  )}
                  {project.startDate && (
                    <p style={styles.cardText}>
                      <strong>Start:</strong> {format(new Date(project.startDate), 'MMM d, yyyy')}
                    </p>
                  )}
                  <p style={styles.cardText}>
                    <strong>Budget:</strong> {project.budget ? `$${project.budget.toLocaleString()}` : 'Not specified'}
                  </p>
                  <div style={styles.actionButton}>
                    View Details
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <h3 style={styles.emptyStateTitle}>No projects found</h3>
          <button 
            onClick={() => setSearchTerm('')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1a56db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;