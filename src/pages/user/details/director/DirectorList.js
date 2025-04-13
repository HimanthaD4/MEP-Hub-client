import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiSearch, FiPhone, FiMail, FiBriefcase, FiAward, FiLayers } from 'react-icons/fi';

const DirectorsList = () => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    position: '',
    status: '',
    expertise: [],
    sort: 'name-asc'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

  const colors = {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC05',
    green: '#34A853',
    darkText: '#202124',
    lightText: '#5F6368',
    background: '#F8F9FA',
    cardBg: '#FFFFFF',
    border: '#DADCE0',
    black: '#000000'
  };

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/directors`);
        const visibleDirectors = response.data.filter(director => director.visible === true);
        setDirectors(visibleDirectors || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch directors:', err);
        setError('Failed to load directors. Please try again later.');
        setLoading(false);
      }
    };
    fetchDirectors();
  }, []);

  const filteredDirectors = directors.filter((director) => {
    const matchesSearch = 
      director.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (director.email && director.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (director.company && director.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPosition = !filters.position || director.position === filters.position;
    const matchesStatus = !filters.status || director.status === filters.status;
    const matchesExpertise = filters.expertise.length === 0 || 
      (director.areasOfExpertise && filters.expertise.every(e => director.areasOfExpertise.includes(e)));
    
    return matchesSearch && matchesPosition && matchesStatus && matchesExpertise;
  });

  const sortedDirectors = [...filteredDirectors].sort((a, b) => {
    if (filters.sort === 'name-asc') return a.name.localeCompare(b.name);
    if (filters.sort === 'name-desc') return b.name.localeCompare(a.name);
    if (filters.sort === 'experience-asc') return (a.yearsOfExperience || 0) - (b.yearsOfExperience || 0);
    if (filters.sort === 'experience-desc') return (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0);
    return 0;
  });

  const allPositions = [
    'Managing Director',
    'Technical Director',
    'Finance Director',
    'Operations Director',
    'Commercial Director',
    'Other'
  ];

  const allStatuses = ['active', 'inactive'];

  const allExpertise = [
    'Construction Management',
    'Cost Control',
    'Contract Administration',
    'Project Planning',
    'Risk Management',
    'Health & Safety',
    'Quality Assurance',
    'Stakeholder Management'
  ];

  const toggleExpertise = (expertise) => {
    setFilters({
      ...filters,
      expertise: filters.expertise.includes(expertise)
        ? filters.expertise.filter(e => e !== expertise)
        : [...filters.expertise, expertise]
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      position: '',
      status: '',
      expertise: [],
      sort: 'name-asc'
    });
  };

  const getPositionBadgeStyle = (position) => {
    const baseStyle = {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: 600,
      marginBottom: '12px'
    };
    
    switch(position) {
      case 'Managing Director': return { ...baseStyle, backgroundColor: '#E8F0FE', color: colors.blue };
      case 'Technical Director': return { ...baseStyle, backgroundColor: '#E6F4EA', color: colors.green };
      case 'Finance Director': return { ...baseStyle, backgroundColor: '#FEF7E0', color: '#F29900' };
      case 'Operations Director': return { ...baseStyle, backgroundColor: '#FEE8E8', color: colors.red };
      case 'Commercial Director': return { ...baseStyle, backgroundColor: '#E8E0FE', color: '#7B61FF' };
      default: return { ...baseStyle, backgroundColor: '#F1F3F4', color: colors.darkText };
    }
  };

  if (error) {
    return (
      <div className="directors-container">
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
    <div className="directors-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="directors-header">
        <h1>Directors Directory</h1>
        <p>Browse our directory of company directors and executives</p>
        
        <div className="search-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search directors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
            {(filters.position || filters.expertise.length > 0 || filters.status) && (
              <span className="filter-count">
                {[filters.position, ...filters.expertise, filters.status].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>
        
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'position' ? null : 'position')}
              >
                <h3>Position</h3>
                {expandedFilter === 'position' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'position' && (
                <div className="filter-options">
                  {allPositions.map(position => (
                    <label key={position} className="filter-option">
                      <input
                        type="radio"
                        name="position"
                        checked={filters.position === position}
                        onChange={() => setFilters({...filters, position})}
                      />
                      <span>{position}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, position: ''})}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            
            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'status' ? null : 'status')}
              >
                <h3>Status</h3>
                {expandedFilter === 'status' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'status' && (
                <div className="filter-options">
                  {allStatuses.map(status => (
                    <label key={status} className="filter-option">
                      <input
                        type="radio"
                        name="status"
                        checked={filters.status === status}
                        onChange={() => setFilters({...filters, status})}
                      />
                      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
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
                onClick={() => setExpandedFilter(expandedFilter === 'expertise' ? null : 'expertise')}
              >
                <h3>Areas of Expertise ({filters.expertise.length})</h3>
                {expandedFilter === 'expertise' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'expertise' && (
                <div className="filter-options specialties-grid">
                  {allExpertise.map(expertise => (
                    <label key={expertise} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.expertise.includes(expertise)}
                        onChange={() => toggleExpertise(expertise)}
                      />
                      <span>{expertise}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, expertise: []})}
                  >
                    Clear All
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
                      checked={filters.sort === 'name-asc'}
                      onChange={() => setFilters({...filters, sort: 'name-asc'})}
                    />
                    <span>Name (A-Z)</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sort === 'name-desc'}
                      onChange={() => setFilters({...filters, sort: 'name-desc'})}
                    />
                    <span>Name (Z-A)</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sort === 'experience-desc'}
                      onChange={() => setFilters({...filters, sort: 'experience-desc'})}
                    />
                    <span>Most Experienced</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sort === 'experience-asc'}
                      onChange={() => setFilters({...filters, sort: 'experience-asc'})}
                    />
                    <span>Least Experienced</span>
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
        
        {(filters.position || filters.expertise.length > 0 || filters.status) && (
          <div className="active-filters">
            {filters.position && (
              <span className="active-filter">
                {filters.position}
                <button onClick={() => setFilters({...filters, position: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.expertise.map(expertise => (
              <span key={expertise} className="active-filter">
                {expertise}
                <button onClick={() => toggleExpertise(expertise)}>
                  <FiX />
                </button>
              </span>
            ))}
            
            {filters.status && (
              <span className="active-filter">
                {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}
                <button onClick={() => setFilters({...filters, status: ''})}>
                  <FiX />
                </button>
              </span>
            )}
          </div>
        )}
        
        {!loading && (
          <div className="results-count">
            Showing {sortedDirectors.length} of {directors.length} directors
          </div>
        )}
      </div>

      {loading ? (
        <div className="directors-grid loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="director-card loading">
              <div className="image-placeholder"></div>
              <div className="content-placeholder">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedDirectors.length > 0 ? (
        <div className="directors-grid">
          {sortedDirectors.map((director) => (
            <div key={director._id} className="director-card">
              <div className="card-header">
                <div className="director-position" style={getPositionBadgeStyle(director.position)}>
                  {director.position}
                </div>
                <h3>{director.name}</h3>
                <div className="director-company">
                  <FiBriefcase className="icon" />
                  <span>{director.company || 'Company not specified'}</span>
                </div>
              </div>
              
              <div className="card-body">
                <div className="contact-info">
                  <div className="info-item">
                    <FiMail className="icon" />
                    <span>{director.email || 'Email not provided'}</span>
                  </div>
                  <div className="info-item">
                    <FiPhone className="icon" />
                    <span>{director.contactNumber || 'Phone not provided'}</span>
                  </div>
                  <div className="info-item">
                    <FiAward className="icon" />
                    <span>{director.yearsOfExperience ? `${director.yearsOfExperience} years experience` : 'Experience not specified'}</span>
                  </div>
                </div>
                
                {director.areasOfExpertise && director.areasOfExpertise.length > 0 && (
                  <div className="expertise">
                    <h4>Areas of Expertise</h4>
                    <div className="expertise-list">
                      {director.areasOfExpertise.slice(0, 3).map((expertise, i) => (
                        <span key={i} className="expertise-badge">
                          {expertise}
                        </span>
                      ))}
                      {director.areasOfExpertise.length > 3 && (
                        <span className="expertise-badge">
                          +{director.areasOfExpertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="card-footer">
                <Link to={`/directors/${director._id}`} className="view-button">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No directors match your search criteria</h3>
          <p>Try adjusting your filters or search term</p>
          <button className="reset-button" onClick={resetFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      <style jsx>{`
        .directors-container {
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
        
        .directors-header {
          margin-bottom: 40px;
        }
        
        .directors-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: ${colors.black};
          margin-bottom: 16px;
        }
        
        .directors-header p {
          font-size: 16px;
          color: ${colors.red};
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
        
        .specialties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 8px;
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
        
        .directors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }
        
        .directors-grid.loading {
          opacity: 0.6;
        }
        
        .director-card {
          background-color: ${colors.cardBg};
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid ${colors.border};
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .director-card:hover {
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
        
        .director-company {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${colors.lightText};
          font-size: 14px;
          margin: 8px 0 16px;
        }
        
        .director-company .icon {
          color: ${colors.blue};
        }
        
        .card-body {
          padding: 0 20px;
          flex: 1;
        }
        
        .contact-info {
          margin: 16px 0;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 12px;
          color: ${colors.lightText};
          font-size: 14px;
        }
        
        .info-item .icon {
          color: ${colors.blue};
          flex-shrink: 0;
          margin-top: 2px;
        }
        
        .expertise {
          margin: 16px 0;
        }
        
        .expertise h4 {
          font-size: 14px;
          font-weight: 600;
          color: ${colors.darkText};
          margin-bottom: 8px;
        }
        
        .expertise-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .expertise-badge {
          display: inline-block;
          padding: 4px 12px;
          background-color: #E8F0FE;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          color: ${colors.blue};
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
        
        .director-card.loading {
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
          .directors-container {
            padding: 20px 16px;
          }
          
          .directors-header h1 {
            font-size: 24px;
          }
          
          .search-controls {
            flex-direction: column;
          }
          
          .directors-grid {
            grid-template-columns: 1fr;
          }
          
          .filters-panel {
            padding: 16px;
          }
          
          .specialties-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DirectorsList;