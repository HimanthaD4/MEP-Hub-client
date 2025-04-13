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
    specialties: [],
    location: '',
    sort: 'name-asc'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Google brand colors
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
        const visibleLecturers = response.data.filter(lecturer => lecturer.visible);
        setLecturers(visibleLecturers || []);
      } catch (err) {
        console.error('Failed to fetch lecturers:', err);
        setError('Failed to load lecturers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchLecturers();
  }, []);

  const filteredLecturers = lecturers.filter((lecturer) => {
    const matchesSearch = 
      lecturer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer?.specialties?.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesType = !filters.lecturerType || lecturer?.type === filters.lecturerType;
    const matchesSpecialties = filters.specialties.length === 0 || 
      filters.specialties.every(filterSpecialty => lecturer?.specialties?.includes(filterSpecialty));
    const matchesLocation = !filters.location || 
      lecturer?.location?.toLowerCase().includes(filters.location.toLowerCase());
    
    return matchesSearch && matchesType && matchesSpecialties && matchesLocation;
  });

  const sortedLecturers = [...filteredLecturers].sort((a, b) => {
    if (filters.sort === 'name-asc') return a.name.localeCompare(b.name);
    if (filters.sort === 'name-desc') return b.name.localeCompare(a.name);
    if (filters.sort === 'experience-asc') return (a.experience || 0) - (b.experience || 0);
    if (filters.sort === 'experience-desc') return (b.experience || 0) - (a.experience || 0);
    return 0;
  });

  const allSpecialties = [
    'MEP Systems',
    'Construction Management',
    'Structural Engineering',
    'Project Planning',
    'Cost Estimation',
    'Safety Management',
    'BIM Modeling',
    'Sustainable Design',
    'HVAC Design',
    'Electrical Systems',
    'Plumbing Design',
    'Fire Protection'
  ].sort();

  const toggleSpecialty = (specialty) => {
    setFilters({
      ...filters,
      specialties: filters.specialties.includes(specialty)
        ? filters.specialties.filter(s => s !== specialty)
        : [...filters.specialties, specialty]
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      lecturerType: '',
      specialties: [],
      location: '',
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
      case 'lecturer': return { ...baseStyle, backgroundColor: '#E8F0FE', color: colors.blue };
      case 'trainer': return { ...baseStyle, backgroundColor: '#E6F4EA', color: colors.green };
      case 'guest': return { ...baseStyle, backgroundColor: '#FEF7E0', color: '#F29900' };
      default: return baseStyle;
    }
  };

  return (
    <div className="lecturers-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="lecturers-header">
        <h1>Lecturers & Trainers Directory</h1>
        <p>Browse our directory of professional lecturers, trainers, and guest speakers in the construction industry.</p>
        
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
            {(filters.lecturerType || filters.specialties.length > 0 || filters.location) && (
              <span className="filter-count">
                {[filters.lecturerType, ...filters.specialties, filters.location].filter(Boolean).length}
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
                  {['lecturer', 'trainer', 'guest'].map(type => (
                    <label key={type} className="filter-option">
                      <input
                        type="radio"
                        name="lecturerType"
                        checked={filters.lecturerType === type}
                        onChange={() => setFilters({...filters, lecturerType: type})}
                      />
                      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
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
                onClick={() => setExpandedFilter(expandedFilter === 'specialties' ? null : 'specialties')}
              >
                <h3>Specialties ({filters.specialties.length})</h3>
                {expandedFilter === 'specialties' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'specialties' && (
                <div className="filter-options specialties-grid">
                  {allSpecialties.map(specialty => (
                    <label key={specialty} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.specialties.includes(specialty)}
                        onChange={() => toggleSpecialty(specialty)}
                      />
                      <span>{specialty}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, specialties: []})}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
            
            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'location' ? null : 'location')}
              >
                <h3>Location</h3>
                {expandedFilter === 'location' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'location' && (
                <div className="filter-options">
                  <input
                    type="text"
                    placeholder="Enter location..."
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  />
                  {filters.location && (
                    <button 
                      className="clear-option"
                      onClick={() => setFilters({...filters, location: ''})}
                    >
                      Clear
                    </button>
                  )}
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
        
        {(filters.lecturerType || filters.specialties.length > 0 || filters.location) && (
          <div className="active-filters">
            {filters.lecturerType && (
              <span className="active-filter">
                {filters.lecturerType.charAt(0).toUpperCase() + filters.lecturerType.slice(1)}
                <button onClick={() => setFilters({...filters, lecturerType: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.specialties.map(specialty => (
              <span key={specialty} className="active-filter">
                {specialty}
                <button onClick={() => toggleSpecialty(specialty)}>
                  <FiX />
                </button>
              </span>
            ))}
            
            {filters.location && (
              <span className="active-filter">
                {filters.location}
                <button onClick={() => setFilters({...filters, location: ''})}>
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
                <div className="lecturer-type" style={getTypeBadgeStyle(lecturer.type)}>
                  {lecturer.type.charAt(0).toUpperCase() + lecturer.type.slice(1)}
                </div>
                <h3>{lecturer.name}</h3>
              </div>
              
              <div className="card-body">
                <div className="contact-info">
                  <div className="info-item">
                    <FiMail className="icon" />
                    <span>{lecturer.email}</span>
                  </div>
                  <div className="info-item">
                    <FiMapPin className="icon" />
                    <span>{lecturer.location}</span>
                  </div>
                  <div className="info-item">
                    <FiUser className="icon" />
                    <span>{lecturer.experience ? `${lecturer.experience} years experience` : 'Experience not specified'}</span>
                  </div>
                </div>
                
                <div className="specialties">
                  {lecturer.specialties?.slice(0, 3).map((specialty, i) => (
                    <span key={i} className="specialty-badge">
                      {specialty}
                    </span>
                  ))}
                  {lecturer.specialties?.length > 3 && (
                    <span className="specialty-badge">
                      +{lecturer.specialties.length - 3} more
                    </span>
                  )}
                </div>
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