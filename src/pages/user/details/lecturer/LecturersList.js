import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiSearch, FiPhone, FiMail, FiMapPin, FiUser, FiBook } from 'react-icons/fi';

const LecturersList = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    lecturerType: '',
    qualifications: [],
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
    const fetchLecturers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lecturers`);
        const visibleLecturers = response.data.filter(lecturer => lecturer.visible === true);
        setLecturers(visibleLecturers || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch lecturers:', err);
        setError('Failed to load lecturers. Please try again later.');
        setLoading(false);
      }
    };
    fetchLecturers();
  }, []);

  const filteredLecturers = lecturers.filter((lecturer) => {
    const fullName = `${lecturer.firstName || ''} ${lecturer.lastName || ''}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      (lecturer.personalEmail && lecturer.personalEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lecturer.institution && lecturer.institution.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = !filters.lecturerType || lecturer.lecturerType === filters.lecturerType;
    const matchesQualifications = filters.qualifications.length === 0 || 
      (lecturer.qualifications && filters.qualifications.every(q => lecturer.qualifications.includes(q)));
    const matchesStatus = !filters.status || lecturer.status === filters.status;
    
    return matchesSearch && matchesType && matchesQualifications && matchesStatus;
  });

  const sortedLecturers = [...filteredLecturers].sort((a, b) => {
    const nameA = `${a.firstName || ''} ${a.lastName || ''}`;
    const nameB = `${b.firstName || ''} ${b.lastName || ''}`;
    
    if (filters.sort === 'name-asc') return nameA.localeCompare(nameB);
    if (filters.sort === 'name-desc') return nameB.localeCompare(nameA);
    if (filters.sort === 'experience-asc') return (a.yearsOfExperience || 0) - (b.yearsOfExperience || 0);
    if (filters.sort === 'experience-desc') return (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0);
    return 0;
  });

  const allQualifications = [
    'PhD', 'MSc', 'BEng', 'Diploma', 
    'Professional Certification', 'Trade Certification'
  ].sort();

  const allLecturerTypes = [
    'MECHANICAL',
    'ELECTRICAL',
    'BUILDING_SERVICES',
    'DRAFTING',
    'QS'
  ];

  const allStatuses = [
    'Active',
    'On Leave',
    'Retired',
    'Suspended'
  ];

  const toggleQualification = (qualification) => {
    setFilters({
      ...filters,
      qualifications: filters.qualifications.includes(qualification)
        ? filters.qualifications.filter(q => q !== qualification)
        : [...filters.qualifications, qualification]
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      lecturerType: '',
      qualifications: [],
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
      case 'MECHANICAL': return { ...baseStyle, backgroundColor: '#E8F0FE', color: colors.blue };
      case 'ELECTRICAL': return { ...baseStyle, backgroundColor: '#E6F4EA', color: colors.green };
      case 'BUILDING_SERVICES': return { ...baseStyle, backgroundColor: '#FEF7E0', color: '#F29900' };
      case 'DRAFTING': return { ...baseStyle, backgroundColor: '#FEE8E8', color: colors.red };
      case 'QS': return { ...baseStyle, backgroundColor: '#E8E0FE', color: '#7B61FF' };
      default: return baseStyle;
    }
  };

  if (error) {
    return (
      <div className="lecturers-container">
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
    <div className="lecturers-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="lecturers-header">
        <h1>Lecturers Directory</h1>
        <p>Browse our directory of professional lecturers and trainers</p>
        
        <div className="search-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search lecturers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
            {(filters.lecturerType || filters.qualifications.length > 0 || filters.status) && (
              <span className="filter-count">
                {[filters.lecturerType, ...filters.qualifications, filters.status].filter(Boolean).length}
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
                <h3>Lecturer Type</h3>
                {expandedFilter === 'type' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'type' && (
                <div className="filter-options">
                  {allLecturerTypes.map(type => (
                    <label key={type} className="filter-option">
                      <input
                        type="radio"
                        name="lecturerType"
                        checked={filters.lecturerType === type}
                        onChange={() => setFilters({...filters, lecturerType: type})}
                      />
                      <span>{type.replace('_', ' ')}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, lecturerType: ''})}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            
            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'qualifications' ? null : 'qualifications')}
              >
                <h3>Qualifications ({filters.qualifications.length})</h3>
                {expandedFilter === 'qualifications' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'qualifications' && (
                <div className="filter-options specialties-grid">
                  {allQualifications.map(qualification => (
                    <label key={qualification} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.qualifications.includes(qualification)}
                        onChange={() => toggleQualification(qualification)}
                      />
                      <span>{qualification}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, qualifications: []})}
                  >
                    Clear All
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
        
        {(filters.lecturerType || filters.qualifications.length > 0 || filters.status) && (
          <div className="active-filters">
            {filters.lecturerType && (
              <span className="active-filter">
                {filters.lecturerType.replace('_', ' ')}
                <button onClick={() => setFilters({...filters, lecturerType: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.qualifications.map(qualification => (
              <span key={qualification} className="active-filter">
                {qualification}
                <button onClick={() => toggleQualification(qualification)}>
                  <FiX />
                </button>
              </span>
            ))}
            
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
            Showing {sortedLecturers.length} of {lecturers.length} lecturers
          </div>
        )}
      </div>

      {loading ? (
        <div className="lecturers-grid loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="lecturer-card loading">
              <div className="image-placeholder"></div>
              <div className="content-placeholder">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedLecturers.length > 0 ? (
        <div className="lecturers-grid">
          {sortedLecturers.map((lecturer) => (
            <div key={lecturer._id} className="lecturer-card">
              <div className="card-header">
                <div className="lecturer-type" style={getTypeBadgeStyle(lecturer.lecturerType)}>
                  {lecturer.lecturerType ? lecturer.lecturerType.replace('_', ' ') : 'Lecturer'}
                </div>
                <h3>{lecturer.firstName} {lecturer.lastName}</h3>
              </div>
              
              <div className="card-body">
                <div className="contact-info">
                  <div className="info-item">
                    <FiMail className="icon" />
                    <span>{lecturer.personalEmail || 'Email not provided'}</span>
                  </div>
                  <div className="info-item">
                    <FiBook className="icon" />
                    <span>{lecturer.institution || 'Institution not specified'}</span>
                  </div>
                  <div className="info-item">
                    <FiUser className="icon" />
                    <span>{lecturer.yearsOfExperience ? `${lecturer.yearsOfExperience} years experience` : 'Experience not specified'}</span>
                  </div>
                </div>
                
                {lecturer.qualifications && lecturer.qualifications.length > 0 && (
                  <div className="specialties">
                    {lecturer.qualifications.slice(0, 3).map((qualification, i) => (
                      <span key={i} className="specialty-badge">
                        {qualification}
                      </span>
                    ))}
                    {lecturer.qualifications.length > 3 && (
                      <span className="specialty-badge">
                        +{lecturer.qualifications.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="card-footer">
                <Link to={`/lecturers/${lecturer._id}`} className="view-button">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No lecturers match your search criteria</h3>
          <p>Try adjusting your filters or search term</p>
          <button className="reset-button" onClick={resetFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      <style jsx>{`
        .lecturers-container {
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
        
        .lecturers-header {
          margin-bottom: 40px;
        }
        
        .lecturers-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: ${colors.black};
          margin-bottom: 16px;
        }
        
        .lecturers-header p {
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
        
        .lecturers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }
        
        .lecturers-grid.loading {
          opacity: 0.6;
        }
        
        .lecturer-card {
          background-color: ${colors.cardBg};
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid ${colors.border};
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .lecturer-card:hover {
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
        
        .specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 16px 0;
        }
        
        .specialty-badge {
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
        
        .lecturer-card.loading {
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
          .lecturers-container {
            padding: 20px 16px;
          }
          
          .lecturers-header h1 {
            font-size: 24px;
          }
          
          .search-controls {
            flex-direction: column;
          }
          
          .lecturers-grid {
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

export default LecturersList;