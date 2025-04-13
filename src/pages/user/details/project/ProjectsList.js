import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiSearch, FiX, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { format } from 'date-fns';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    budgetRange: '',
    sort: 'date-desc'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const colors = {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC05',
    green: '#34A853',
    darkText: '#202124',
    lightText: '#5F6368',
    background: '#F8F9FA',
    cardBg: '#FFFFFF',
    border: '#DADCE0'
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        setProjects(response.data || []);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project?.contractor?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || project?.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (filters.sort === 'date-asc') return new Date(a.startDate) - new Date(b.startDate);
    if (filters.sort === 'date-desc') return new Date(b.startDate) - new Date(a.startDate);
    if (filters.sort === 'budget-asc') return (a.budget || 0) - (b.budget || 0);
    if (filters.sort === 'budget-desc') return (b.budget || 0) - (a.budget || 0);
    return 0;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      status: '',
      budgetRange: '',
      sort: 'date-desc'
    });
  };

  const getStatusBadgeStyle = (status) => {
    const baseStyle = {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: 600,
      marginBottom: '12px'
    };
    
    switch(status) {
      case 'Planning': return { ...baseStyle, backgroundColor: '#E8F0FE', color: colors.blue };
      case 'In Progress': return { ...baseStyle, backgroundColor: '#FEF7E0', color: '#F29900' };
      case 'Completed': return { ...baseStyle, backgroundColor: '#E6F4EA', color: colors.green };
      case 'On Hold': return { ...baseStyle, backgroundColor: '#FEE8E8', color: colors.red };
      default: return baseStyle;
    }
  };

  if (error) {
    return (
      <div className="projects-container">
        <div className="error-message">
          {error}
          <button onClick={() => window.location.reload()} className="try-again-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="projects-header">
        <h1>Projects Directory</h1>
        <p>Browse all ongoing and completed construction projects in our portfolio.</p>
        
        <div className="search-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
            {(filters.status || filters.budgetRange) && (
              <span className="filter-count">
                {[filters.status, filters.budgetRange].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>
        
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'status' ? null : 'status')}
              >
                <h3>Project Status</h3>
                {expandedFilter === 'status' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'status' && (
                <div className="filter-options">
                  {['Planning', 'In Progress', 'Completed', 'On Hold'].map(status => (
                    <label key={status} className="filter-option">
                      <input
                        type="radio"
                        name="status"
                        checked={filters.status === status}
                        onChange={() => setFilters({...filters, status})}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, status: ''})}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            
            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'sort' ? null : 'sort')}
              >
                <h3>Sort By</h3>
                {expandedFilter === 'sort' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'sort' && (
                <div className="filter-options">
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sort === 'date-desc'}
                      onChange={() => setFilters({...filters, sort: 'date-desc'})}
                    />
                    <span>Newest First</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sort === 'date-asc'}
                      onChange={() => setFilters({...filters, sort: 'date-asc'})}
                    />
                    <span>Oldest First</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sort === 'budget-desc'}
                      onChange={() => setFilters({...filters, sort: 'budget-desc'})}
                    />
                    <span>Highest Budget</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sort === 'budget-asc'}
                      onChange={() => setFilters({...filters, sort: 'budget-asc'})}
                    />
                    <span>Lowest Budget</span>
                  </label>
                </div>
              )}
            </div>
            
            <div className="filter-actions">
              <button className="apply-filters" onClick={() => setShowFilters(false)}>
                Apply Filters
              </button>
              <button className="reset-filters" onClick={resetFilters}>
                Reset All
              </button>
            </div>
          </div>
        )}
        
        {(filters.status || filters.budgetRange) && (
          <div className="active-filters">
            {filters.status && (
              <span className="active-filter">
                {filters.status}
                <button onClick={() => setFilters({...filters, status: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            {filters.budgetRange && (
              <span className="active-filter">
                {filters.budgetRange}
                <button onClick={() => setFilters({...filters, budgetRange: ''})}>
                  <FiX />
                </button>
              </span>
            )}
          </div>
        )}
        
        {!loading && (
          <div className="results-count">
            Showing {sortedProjects.length} of {projects.length} projects
          </div>
        )}
      </div>

      {loading ? (
        <div className="projects-grid loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="project-card loading">
              <div className="image-placeholder"></div>
              <div className="content-placeholder">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedProjects.length > 0 ? (
        <div className="projects-grid">
          {sortedProjects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="card-header">
                <div className="project-status" style={getStatusBadgeStyle(project.status)}>
                  {project.status || 'Status not specified'}
                </div>
                <h3>{project.title || 'Untitled Project'}</h3>
              </div>
              
              <div className="card-body">
                <div className="project-info">
                  <div className="info-item">
                    <span className="info-label">Contractor:</span>
                    <span>{project.contractor || 'Not specified'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Start Date:</span>
                    <span>{project.startDate ? format(new Date(project.startDate), 'MMM d, yyyy') : 'Not specified'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Budget:</span>
                    <span>{project.budget ? `$${project.budget.toLocaleString()}` : 'Not specified'}</span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <Link to={`/projects/${project._id}`} className="view-button">
                  View Project Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No projects match your search criteria</h3>
          <p>Try adjusting your filters or search term</p>
          <button className="reset-button" onClick={resetFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      <style jsx>{`
        .projects-container {
          font-family: 'Outfit', sans-serif;
          max-width: 1400px;
          margin: 25px auto;
          padding: 40px 20px;
          color: ${colors.darkText};
          background-color: ${colors.background};
        }
        
        .error-message {
          padding: 40px;
          text-align: center;
          color: ${colors.red};
          font-size: 18px;
        }
        
        .try-again-button {
          display: block;
          margin: 20px auto;
          padding: 12px 24px;
          background-color: ${colors.cardBg};
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.darkText};
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .try-again-button:hover {
          border-color: ${colors.blue};
          color: ${colors.blue};
        }
        
        .projects-header {
          margin-bottom: 40px;
        }
        
        .projects-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: ${colors.darkText};
          margin-bottom: 16px;
        }
        
        .projects-header p {
          font-size: 16px;
          color: ${colors.lightText};
          margin-bottom: 24px;
        }
        
        .search-controls {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .search-bar {
          flex: 1;
          position: relative;
          max-width: 600px;
        }
        
        .search-bar input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border-radius: 8px;
          border: 1px solid ${colors.border};
          font-size: 16px;
          outline: none;
          transition: border 0.3s ease;
        }
        
        .search-bar input:focus {
          border-color: ${colors.blue};
        }
        
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: ${colors.lightText};
        }
        
        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 8px;
          background-color: ${colors.cardBg};
          border: 1px solid ${colors.border};
          color: ${colors.darkText};
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .filter-toggle:hover {
          border-color: ${colors.blue};
        }
        
        .filter-toggle.active {
          background-color: ${colors.blue};
          color: white;
          border-color: ${colors.blue};
        }
        
        .filter-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${colors.red};
          color: white;
          font-size: 12px;
          margin-left: 4px;
        }
        
        .filters-panel {
          background-color: ${colors.cardBg};
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid ${colors.border};
        }
        
        .filter-section {
          margin-bottom: 16px;
          border-bottom: 1px solid ${colors.border};
        }
        
        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          cursor: pointer;
        }
        
        .filter-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: ${colors.darkText};
          margin: 0;
        }
        
        .filter-options {
          padding: 12px 0;
        }
        
        .filter-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          cursor: pointer;
        }
        
        .filter-option input {
          accent-color: ${colors.blue};
        }
        
        .clear-option {
          background: none;
          border: none;
          color: ${colors.lightText};
          font-size: 14px;
          cursor: pointer;
          padding: 8px 0;
          margin-top: 8px;
        }
        
        .clear-option:hover {
          color: ${colors.blue};
        }
        
        .filter-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        
        .apply-filters, .reset-filters {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .apply-filters {
          background-color: ${colors.blue};
          color: white;
          border: 1px solid ${colors.blue};
        }
        
        .apply-filters:hover {
          background-color: #3367d6;
        }
        
        .reset-filters {
          background-color: transparent;
          color: ${colors.lightText};
          border: 1px solid ${colors.border};
        }
        
        .reset-filters:hover {
          border-color: ${colors.blue};
          color: ${colors.blue};
        }
        
        .active-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .active-filter {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          background-color: #E8F0FE;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 500;
          color: ${colors.blue};
        }
        
        .active-filter button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          margin-left: 6px;
          cursor: pointer;
          color: ${colors.lightText};
        }
        
        .results-count {
          font-size: 14px;
          color: ${colors.lightText};
          margin-bottom: 24px;
          font-style: italic;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }
        
        .projects-grid.loading {
          opacity: 0.6;
        }
        
        .project-card {
          background-color: ${colors.cardBg};
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid ${colors.border};
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          border-color: ${colors.yellow};
        }
        
        .card-header {
          padding: 20px 20px 0;
        }
        
        .card-header h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 8px 0 0;
          color: ${colors.darkText};
        }
        
        .card-body {
          padding: 0 20px;
          flex: 1;
        }
        
        .project-info {
          margin: 16px 0;
        }
        
        .info-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          color: ${colors.lightText};
          font-size: 14px;
        }
        
        .info-label {
          font-weight: 600;
          color: ${colors.darkText};
        }
        
        .card-footer {
          padding: 20px;
          border-top: 1px solid ${colors.border};
        }
        
        .view-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          background-color: ${colors.blue};
          color: white;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .view-button:hover {
          background-color: #3367d6;
        }
        
        .project-card.loading {
          background-color: ${colors.cardBg};
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid ${colors.border};
        }
        
        .image-placeholder {
          height: 180px;
          background-color: #f1f5f9;
        }
        
        .content-placeholder {
          padding: 20px;
        }
        
        .line {
          height: 20px;
          background-color: #f1f5f9;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        
        .line:nth-child(1) {
          width: 70%;
        }
        
        .line:nth-child(2) {
          width: 90%;
        }
        
        .line:nth-child(3) {
          width: 80%;
        }
        
        .empty-state {
          padding: 60px 40px;
          background-color: ${colors.cardBg};
          border-radius: 12px;
          text-align: center;
          border: 1px dashed ${colors.border};
          grid-column: 1 / -1;
        }
        
        .empty-state h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
          color: ${colors.darkText};
        }
        
        .empty-state p {
          color: ${colors.lightText};
          margin-bottom: 24px;
        }
        
        .reset-button {
          padding: 12px 24px;
          background-color: transparent;
          color: ${colors.blue};
          border: 1px solid ${colors.blue};
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .reset-button:hover {
          background-color: rgba(66, 133, 244, 0.1);
        }
        
        @media (max-width: 768px) {
          .projects-container {
            padding: 20px 16px;
          }
          
          .projects-header h1 {
            font-size: 24px;
          }
          
          .search-controls {
            flex-direction: column;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .filters-panel {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsList;