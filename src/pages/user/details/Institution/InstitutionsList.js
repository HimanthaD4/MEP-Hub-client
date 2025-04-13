import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiSearch, FiPhone, FiMail, FiMapPin, FiBook, FiGlobe } from 'react-icons/fi';

const InstitutionsList = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    institutionType: '',
    status: '',
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
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/institutions`);
        const visibleInstitutions = response.data.filter(institution => institution.visible === true);
        setInstitutions(visibleInstitutions || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch institutions:', err);
        setError('Failed to load institutions. Please try again later.');
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

  const filteredInstitutions = institutions.filter((institution) => {
    const matchesSearch = 
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (institution.email && institution.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (institution.address && institution.address.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = !filters.institutionType || institution.type === filters.institutionType;
    const matchesStatus = !filters.status || institution.status === filters.status;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const sortedInstitutions = [...filteredInstitutions].sort((a, b) => {
    if (filters.sort === 'name-asc') return a.name.localeCompare(b.name);
    if (filters.sort === 'name-desc') return b.name.localeCompare(a.name);
    if (filters.sort === 'date-asc') return new Date(a.createdAt) - new Date(b.createdAt);
    if (filters.sort === 'date-desc') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  const allInstitutionTypes = ['LEARNING', 'TRAINING'];
  const allStatuses = ['Active', 'Inactive'];

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      institutionType: '',
      status: '',
      sort: 'name-asc'
    });
  };

  const getTypeBadgeStyle = (type) => {
    const baseStyle = {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: 600,
      marginBottom: '12px'
    };
    
    switch(type) {
      case 'LEARNING': return { ...baseStyle, backgroundColor: '#E8F0FE', color: colors.blue };
      case 'TRAINING': return { ...baseStyle, backgroundColor: '#E6F4EA', color: colors.green };
      default: return baseStyle;
    }
  };

  if (error) {
    return (
      <div className="institutions-container">
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
    <div className="institutions-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="institutions-header">
        <h1>Institutions Directory</h1>
        <p>Browse our directory of partner institutions and training centers</p>
        
        <div className="search-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search institutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
            {(filters.institutionType || filters.status) && (
              <span className="filter-count">
                {[filters.institutionType, filters.status].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>
        
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'type' ? null : 'type')}
              >
                <h3>Institution Type</h3>
                {expandedFilter === 'type' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'type' && (
                <div className="filter-options">
                  {allInstitutionTypes.map(type => (
                    <label key={type} className="filter-option">
                      <input
                        type="radio"
                        name="institutionType"
                        checked={filters.institutionType === type}
                        onChange={() => setFilters({...filters, institutionType: type})}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, institutionType: ''})}
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
        
        {(filters.institutionType || filters.status) && (
          <div className="active-filters">
            {filters.institutionType && (
              <span className="active-filter">
                {filters.institutionType}
                <button onClick={() => setFilters({...filters, institutionType: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.status && (
              <span className="active-filter">
                {filters.status}
                <button onClick={() => setFilters({...filters, status: ''})}>
                  <FiX />
                </button>
              </span>
            )}
          </div>
        )}
        
        {!loading && (
          <div className="results-count">
            Showing {sortedInstitutions.length} of {institutions.length} institutions
          </div>
        )}
      </div>

      {loading ? (
        <div className="institutions-grid loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="institution-card loading">
              <div className="image-placeholder"></div>
              <div className="content-placeholder">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedInstitutions.length > 0 ? (
        <div className="institutions-grid">
          {sortedInstitutions.map((institution) => (
            <div key={institution._id} className="institution-card">
              <div className="card-header">
                <div className="institution-type" style={getTypeBadgeStyle(institution.type)}>
                  {institution.type}
                </div>
                <h3>{institution.name}</h3>
              </div>
              
              <div className="card-body">
                <div className="contact-info">
                  <div className="info-item">
                    <FiMail className="icon" />
                    <span>{institution.email || 'Email not provided'}</span>
                  </div>
                  <div className="info-item">
                    <FiPhone className="icon" />
                    <span>{institution.contactNumber || 'Phone not provided'}</span>
                  </div>
                  <div className="info-item">
                    <FiMapPin className="icon" />
                    <span>{institution.address || 'Address not specified'}</span>
                  </div>
                </div>
                
                <div className="status-badge" style={{ 
                  color: institution.status === 'Active' ? colors.green : colors.red,
                  backgroundColor: institution.status === 'Active' ? '#E6F4EA' : '#FEE8E8'
                }}>
                  {institution.status}
                </div>
              </div>
              
              <div className="card-footer">
                <Link to={`/institutions/${institution._id}`} className="view-button">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No institutions match your search criteria</h3>
          <p>Try adjusting your filters or search term</p>
          <button className="reset-button" onClick={resetFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      <style jsx>{`
        .institutions-container {
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
        
        .institutions-header {
          margin-bottom: 40px;
        }
        
        .institutions-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: ${colors.black};
          margin-bottom: 16px;
        }
        
        .institutions-header p {
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
        
        .institutions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }
        
        .institutions-grid.loading {
          opacity: 0.6;
        }
        
        .institution-card {
          background-color: ${colors.cardBg};
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid ${colors.border};
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .institution-card:hover {
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
        
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          margin: 16px 0;
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
        
        .institution-card.loading {
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
          .institutions-container {
            padding: 20px 16px;
          }
          
          .institutions-header h1 {
            font-size: 24px;
          }
          
          .search-controls {
            flex-direction: column;
          }
          
          .institutions-grid {
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

export default InstitutionsList;