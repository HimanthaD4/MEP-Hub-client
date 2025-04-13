import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  FiFilter, FiX, FiChevronDown, FiChevronUp, 
  FiSearch, FiPhone, FiMail, FiBriefcase, 
  FiMapPin, FiClock, FiDollarSign, FiCalendar
} from 'react-icons/fi';

const JobVacancyList = () => {
  const [jobVacancies, setJobVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    experienceLevel: '',
    employmentType: '',
    status: 'all'
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
    const fetchJobVacancies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/job-vacancies`);
        setJobVacancies(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch job vacancies:', err);
        setError('Failed to load job vacancies. Please try again later.');
        setLoading(false);
      }
    };
    fetchJobVacancies();
  }, []);

  const filteredJobVacancies = jobVacancies.filter((vacancy) => {
    const matchesSearch = 
      vacancy.positionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filters.jobType || vacancy.jobType === filters.jobType;
    const matchesExperience = !filters.experienceLevel || vacancy.experienceLevel === filters.experienceLevel;
    const matchesEmployment = !filters.employmentType || vacancy.employmentType === filters.employmentType;
    const matchesStatus = filters.status === 'all' || vacancy.status === filters.status;
    
    return matchesSearch && matchesType && matchesExperience && matchesEmployment && matchesStatus;
  });

  const jobTypes = [
    'MECHANICAL',
    'ELECTRICAL',
    'BUILDING_SERVICES',
    'DRAFTING',
    'QUANTITY_SURVEYING'
  ];

  const experienceLevels = [
    'Entry Level', 'Junior', 'Mid-Level', 'Senior', 
    'Lead', 'Manager', 'Director'
  ];

  const employmentTypes = [
    'Full-time', 'Part-time', 'Contract', 'Temporary',
    'Internship', 'Freelance'
  ];

  const statusOptions = [
    'Draft', 'Published', 'Filled'
  ];

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      jobType: '',
      experienceLevel: '',
      employmentType: '',
      status: 'all'
    });
  };

  const getJobTypeBadgeStyle = (type) => {
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
      case 'ELECTRICAL': return { ...baseStyle, backgroundColor: '#FEE8E8', color: colors.red };
      case 'BUILDING_SERVICES': return { ...baseStyle, backgroundColor: '#E6F4EA', color: colors.green };
      case 'DRAFTING': return { ...baseStyle, backgroundColor: '#FEF7E0', color: '#F29900' };
      case 'QUANTITY_SURVEYING': return { ...baseStyle, backgroundColor: '#E8E0FE', color: '#7B61FF' };
      default: return { ...baseStyle, backgroundColor: '#F1F3F4', color: colors.darkText };
    }
  };

  const getStatusBadgeStyle = (status) => {
    const baseStyle = {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: 600,
      marginLeft: '8px'
    };
    
    switch(status) {
      case 'Published': return { ...baseStyle, backgroundColor: '#E6F4EA', color: colors.green };
      case 'Filled': return { ...baseStyle, backgroundColor: '#FEE8E8', color: colors.red };
      case 'Draft': return { ...baseStyle, backgroundColor: '#FEF7E0', color: '#F29900' };
      default: return { ...baseStyle, backgroundColor: '#F1F3F4', color: colors.darkText };
    }
  };

  if (error) {
    return (
      <div className="jobvacancies-container">
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
    <div className="jobvacancies-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="jobvacancies-header">
        <h1>Job Vacancies</h1>
        <p>Browse current job openings in the MEP industry</p>
        
        <div className="search-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search job vacancies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
            {(filters.jobType || filters.experienceLevel || filters.employmentType || filters.status !== 'all') && (
              <span className="filter-count">
                {[filters.jobType, filters.experienceLevel, filters.employmentType, filters.status !== 'all' ? filters.status : null].filter(Boolean).length}
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
                <h3>Job Type</h3>
                {expandedFilter === 'type' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'type' && (
                <div className="filter-options">
                  {jobTypes.map(type => (
                    <label key={type} className="filter-option">
                      <input
                        type="radio"
                        name="jobType"
                        checked={filters.jobType === type}
                        onChange={() => setFilters({...filters, jobType: type})}
                      />
                      <span>{type.replace('_', ' ')}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, jobType: ''})}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            
            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'experience' ? null : 'experience')}
              >
                <h3>Experience Level</h3>
                {expandedFilter === 'experience' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'experience' && (
                <div className="filter-options">
                  {experienceLevels.map(level => (
                    <label key={level} className="filter-option">
                      <input
                        type="radio"
                        name="experienceLevel"
                        checked={filters.experienceLevel === level}
                        onChange={() => setFilters({...filters, experienceLevel: level})}
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, experienceLevel: ''})}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'employment' ? null : 'employment')}
              >
                <h3>Employment Type</h3>
                {expandedFilter === 'employment' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'employment' && (
                <div className="filter-options">
                  {employmentTypes.map(type => (
                    <label key={type} className="filter-option">
                      <input
                        type="radio"
                        name="employmentType"
                        checked={filters.employmentType === type}
                        onChange={() => setFilters({...filters, employmentType: type})}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, employmentType: ''})}
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
                  <label className="filter-option">
                    <input
                      type="radio"
                      name="status"
                      checked={filters.status === 'all'}
                      onChange={() => setFilters({...filters, status: 'all'})}
                    />
                    <span>All Statuses</span>
                  </label>
                  {statusOptions.map(status => (
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
        
        {(filters.jobType || filters.experienceLevel || filters.employmentType || filters.status !== 'all') && (
          <div className="active-filters">
            {filters.jobType && (
              <span className="active-filter">
                {filters.jobType.replace('_', ' ')}
                <button onClick={() => setFilters({...filters, jobType: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.experienceLevel && (
              <span className="active-filter">
                {filters.experienceLevel}
                <button onClick={() => setFilters({...filters, experienceLevel: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.employmentType && (
              <span className="active-filter">
                {filters.employmentType}
                <button onClick={() => setFilters({...filters, employmentType: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.status !== 'all' && (
              <span className="active-filter">
                {filters.status}
                <button onClick={() => setFilters({...filters, status: 'all'})}>
                  <FiX />
                </button>
              </span>
            )}
          </div>
        )}
        
        {!loading && (
          <div className="results-count">
            Showing {filteredJobVacancies.length} of {jobVacancies.length} job vacancies
          </div>
        )}
      </div>

      {loading ? (
        <div className="jobvacancies-grid loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="jobvacancy-card loading">
              <div className="image-placeholder"></div>
              <div className="content-placeholder">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredJobVacancies.length > 0 ? (
        <div className="jobvacancies-grid">
          {filteredJobVacancies.map((vacancy) => (
            <div key={vacancy._id} className="jobvacancy-card">
              <div className="card-header">
                <div className="job-type" style={getJobTypeBadgeStyle(vacancy.jobType)}>
                  {vacancy.jobType.replace('_', ' ')}
                </div>
                <h3>{vacancy.positionTitle}</h3>
                <div className="company-info">
                  {vacancy.company && typeof vacancy.company === 'object' && (
                    <>
                      {vacancy.company.logo && (
                        <img src={vacancy.company.logo} alt={vacancy.company.name} className="company-logo" />
                      )}
                      <span className="company-name">{vacancy.company.name}</span>
                    </>
                  )}
                  <span className="job-status" style={getStatusBadgeStyle(vacancy.status)}>
                    {vacancy.status}
                  </span>
                </div>
              </div>
              
              <div className="card-body">
                <div className="job-details">
                  <div className="detail-item">
                    <FiMapPin className="icon" />
                    <span>{vacancy.city}, {vacancy.country}</span>
                  </div>
                  <div className="detail-item">
                    <FiBriefcase className="icon" />
                    <span>{vacancy.employmentType}</span>
                  </div>
                  <div className="detail-item">
                    <FiClock className="icon" />
                    <span>{vacancy.experienceLevel} ({vacancy.yearsOfExperience} years)</span>
                  </div>
                </div>
                
                {/* <div className="job-description">
                  {vacancy.jobDescription.length > 150 ? 
                    `${vacancy.jobDescription.substring(0, 150)}...` : 
                    vacancy.jobDescription}
                </div> */}
              </div>
              
              <div className="card-footer">
                <Link to={`/job-vacancies/${vacancy._id}`} className="view-button">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No job vacancies match your search criteria</h3>
          <p>Try adjusting your filters or search term</p>
          <button className="reset-button" onClick={resetFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      <style jsx>{`
        .jobvacancies-container {
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
        
        .jobvacancies-header {
          margin-bottom: 40px;
        }
        
        .jobvacancies-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: ${colors.black};
          margin-bottom: 16px;
        }
        
        .jobvacancies-header p {
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
        
        .jobvacancies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }
        
        .jobvacancies-grid.loading {
          opacity: 0.6;
        }
        
        .jobvacancy-card {
          background-color: ${colors.cardBg};
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid ${colors.border};
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .jobvacancy-card:hover {
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
        
        .company-info {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 12px 0 16px;
        }
        
        .company-logo {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: contain;
        }
        
        .company-name {
          font-size: 14px;
          color: ${colors.lightText};
          flex: 1;
        }
        
        .card-body {
          padding: 0 20px;
          flex: 1;
        }
        
        .job-details {
          margin: 16px 0;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: ${colors.lightText};
          font-size: 14px;
        }
        
        .detail-item .icon {
          color: ${colors.blue};
          flex-shrink: 0;
        }
        
        .job-description {
          color: ${colors.darkText};
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 16px;
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
        
        .jobvacancy-card.loading {
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
          .jobvacancies-container {
            padding: 20px 16px;
          }
          
          .jobvacancies-header h1 {
            font-size: 24px;
          }
          
          .search-controls {
            flex-direction: column;
          }
          
          .jobvacancies-grid {
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

export default JobVacancyList;