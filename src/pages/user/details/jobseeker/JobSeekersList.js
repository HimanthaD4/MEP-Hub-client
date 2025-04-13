import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  FiFilter, FiX, FiChevronDown, FiChevronUp, 
  FiSearch, FiPhone, FiMail, FiBriefcase, 
  FiUser, FiAward, FiClock 
} from 'react-icons/fi';

const JobSeekersList = () => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    professionalType: '',
    minExperience: '',
    maxExperience: '',
    qualification: '',
    sort: 'experience-desc'
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
    const fetchJobSeekers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/jobseekers`);
        const visibleJobSeekers = response.data.filter(seeker => seeker.visible === true);
        setJobSeekers(visibleJobSeekers || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch job seekers:', err);
        setError('Failed to load job seekers. Please try again later.');
        setLoading(false);
      }
    };
    fetchJobSeekers();
  }, []);

  const filteredJobSeekers = jobSeekers.filter((seeker) => {
    const matchesSearch = 
      `${seeker.firstName || ''} ${seeker.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (seeker.email && seeker.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (seeker.currentCompany && seeker.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = !filters.professionalType || seeker.professionalType === filters.professionalType;
    const matchesQualification = !filters.qualification || seeker.highestQualification === filters.qualification;
    
    const minExp = filters.minExperience ? Number(filters.minExperience) : 0;
    const maxExp = filters.maxExperience ? Number(filters.maxExperience) : 50;
    const matchesExperience = (seeker.yearsOfExperience || 0) >= minExp && 
                             (seeker.yearsOfExperience || 0) <= maxExp;
    
    return matchesSearch && matchesType && matchesQualification && matchesExperience;
  });

  const sortedJobSeekers = [...filteredJobSeekers].sort((a, b) => {
    if (filters.sort === 'name-asc') return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    if (filters.sort === 'name-desc') return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
    if (filters.sort === 'experience-asc') return (a.yearsOfExperience || 0) - (b.yearsOfExperience || 0);
    if (filters.sort === 'experience-desc') return (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0);
    return 0;
  });

  const allProfessionalTypes = [
    'Chartered Engineer',
    'Project Manager',
    'Engineer',
    'Assistant Engineer',
    'Technologist',
    'Technical Officer',
    'Supervisor',
    'Chargehand'
  ];

  const allQualifications = [
    'PhD', 'Master', 'Bachelor', 'Diploma',
    'Professional Certification', 'Trade Certification'
  ];

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      professionalType: '',
      minExperience: '',
      maxExperience: '',
      qualification: '',
      sort: 'experience-desc'
    });
  };

  const getProfessionalBadgeStyle = (type) => {
    const baseStyle = {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: 600,
      marginBottom: '12px'
    };
    
    switch(type) {
      case 'Chartered Engineer': return { ...baseStyle, backgroundColor: '#E8F0FE', color: colors.blue };
      case 'Project Manager': return { ...baseStyle, backgroundColor: '#E6F4EA', color: colors.green };
      case 'Engineer': return { ...baseStyle, backgroundColor: '#FEF7E0', color: '#F29900' };
      case 'Assistant Engineer': return { ...baseStyle, backgroundColor: '#FEE8E8', color: colors.red };
      case 'Technologist': return { ...baseStyle, backgroundColor: '#E8E0FE', color: '#7B61FF' };
      default: return { ...baseStyle, backgroundColor: '#F1F3F4', color: colors.darkText };
    }
  };

  if (error) {
    return (
      <div className="jobseekers-container">
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
    <div className="jobseekers-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="jobseekers-header">
        <h1>Job Seekers Directory</h1>
        <p>Browse our directory of professional job seekers in the MEP industry</p>
        
        <div className="search-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search job seekers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
            {(filters.professionalType || filters.qualification || filters.minExperience || filters.maxExperience) && (
              <span className="filter-count">
                {[filters.professionalType, filters.qualification, filters.minExperience, filters.maxExperience].filter(Boolean).length}
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
                <h3>Professional Type</h3>
                {expandedFilter === 'type' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'type' && (
                <div className="filter-options">
                  {allProfessionalTypes.map(type => (
                    <label key={type} className="filter-option">
                      <input
                        type="radio"
                        name="professionalType"
                        checked={filters.professionalType === type}
                        onChange={() => setFilters({...filters, professionalType: type})}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, professionalType: ''})}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            
            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'qualification' ? null : 'qualification')}
              >
                <h3>Highest Qualification</h3>
                {expandedFilter === 'qualification' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'qualification' && (
                <div className="filter-options">
                  {allQualifications.map(qualification => (
                    <label key={qualification} className="filter-option">
                      <input
                        type="radio"
                        name="qualification"
                        checked={filters.qualification === qualification}
                        onChange={() => setFilters({...filters, qualification})}
                      />
                      <span>{qualification}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, qualification: ''})}
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
                <h3>Experience Range (years)</h3>
                {expandedFilter === 'experience' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'experience' && (
                <div className="filter-options experience-range">
                  <div className="range-inputs">
                    <div className="range-input">
                      <label>Min:</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        placeholder="0"
                        value={filters.minExperience}
                        onChange={(e) => setFilters({...filters, minExperience: e.target.value})}
                      />
                    </div>
                    <div className="range-input">
                      <label>Max:</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        placeholder="50"
                        value={filters.maxExperience}
                        onChange={(e) => setFilters({...filters, maxExperience: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, minExperience: '', maxExperience: ''})}
                  >
                    Clear Range
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
        
        {(filters.professionalType || filters.qualification || filters.minExperience || filters.maxExperience) && (
          <div className="active-filters">
            {filters.professionalType && (
              <span className="active-filter">
                {filters.professionalType}
                <button onClick={() => setFilters({...filters, professionalType: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.qualification && (
              <span className="active-filter">
                {filters.qualification}
                <button onClick={() => setFilters({...filters, qualification: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.minExperience && (
              <span className="active-filter">
                Min {filters.minExperience} years
                <button onClick={() => setFilters({...filters, minExperience: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.maxExperience && (
              <span className="active-filter">
                Max {filters.maxExperience} years
                <button onClick={() => setFilters({...filters, maxExperience: ''})}>
                  <FiX />
                </button>
              </span>
            )}
          </div>
        )}
        
        {!loading && (
          <div className="results-count">
            Showing {sortedJobSeekers.length} of {jobSeekers.length} job seekers
          </div>
        )}
      </div>

      {loading ? (
        <div className="jobseekers-grid loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="jobseeker-card loading">
              <div className="image-placeholder"></div>
              <div className="content-placeholder">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedJobSeekers.length > 0 ? (
        <div className="jobseekers-grid">
          {sortedJobSeekers.map((seeker) => (
            <div key={seeker._id} className="jobseeker-card">
              <div className="card-header">
                <div className="professional-type" style={getProfessionalBadgeStyle(seeker.professionalType)}>
                  {seeker.professionalType}
                </div>
                <h3>{seeker.firstName} {seeker.lastName}</h3>
                <div className="jobseeker-qualification">
                  <FiAward className="icon" />
                  <span>{seeker.highestQualification || 'Qualification not specified'}</span>
                </div>
              </div>
              
              <div className="card-body">
                <div className="contact-info">
                  <div className="info-item">
                    <FiMail className="icon" />
                    <span>{seeker.email || 'Email not provided'}</span>
                  </div>
                  <div className="info-item">
                    <FiPhone className="icon" />
                    <span>{seeker.contactNumber || 'Phone not provided'}</span>
                  </div>
                  <div className="info-item">
                    <FiBriefcase className="icon" />
                    <span>
                      {seeker.currentlyEmployed ? 
                        `Currently at ${seeker.currentCompany || 'unspecified company'}` : 
                        'Currently seeking opportunities'}
                    </span>
                  </div>
                  <div className="info-item">
                    <FiClock className="icon" />
                    <span>{seeker.yearsOfExperience ? `${seeker.yearsOfExperience} years experience` : 'Experience not specified'}</span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <Link to={`/jobseekers/${seeker._id}`} className="view-button">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No job seekers match your search criteria</h3>
          <p>Try adjusting your filters or search term</p>
          <button className="reset-button" onClick={resetFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      <style jsx>{`
        .jobseekers-container {
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
        
        .jobseekers-header {
          margin-bottom: 40px;
        }
        
        .jobseekers-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: ${colors.black};
          margin-bottom: 16px;
        }
        
        .jobseekers-header p {
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
        
        .experience-range {
          padding: 12px 0;
        }
        
        .range-inputs {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }
        
        .range-input {
          flex: 1;
        }
        
        .range-input label {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          color: ${colors.lightText};
        }
        
        .range-input input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid ${colors.border};
          font-size: 14px;
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
        
        .jobseekers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }
        
        .jobseekers-grid.loading {
          opacity: 0.6;
        }
        
        .jobseeker-card {
          background-color: ${colors.cardBg};
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid ${colors.border};
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .jobseeker-card:hover {
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
        
        .jobseeker-qualification {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${colors.lightText};
          font-size: 14px;
          margin: 8px 0 16px;
        }
        
        .jobseeker-qualification .icon {
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
        
        .jobseeker-card.loading {
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
          .jobseekers-container {
            padding: 20px 16px;
          }
          
          .jobseekers-header h1 {
            font-size: 24px;
          }
          
          .search-controls {
            flex-direction: column;
          }
          
          .jobseekers-grid {
            grid-template-columns: 1fr;
          }
          
          .filters-panel {
            padding: 16px;
          }
          
          .range-inputs {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default JobSeekersList;