import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiSearch, FiPhone, FiMail, FiMapPin, FiBriefcase } from 'react-icons/fi';

const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    agentType: '',
    equipmentType: [],
    location: '',
    sort: 'name-asc'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/agents`);
        const visibleAgents = response.data.filter(agent => agent.visible);
        setAgents(visibleAgents || []);
      } catch (err) {
        console.error('Failed to fetch agents:', err);
        setError('Failed to load agents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = 
      agent?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent?.companyEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent?.equipmentType?.some(type => 
        type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesType = !filters.agentType || agent?.role === filters.agentType;
    const matchesEquipment = filters.equipmentType.length === 0 || 
      filters.equipmentType.every(filterType => agent?.equipmentType?.includes(filterType));
    const matchesLocation = !filters.location || 
      agent?.location?.toLowerCase().includes(filters.location.toLowerCase());
    
    return matchesSearch && matchesType && matchesEquipment && matchesLocation;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (filters.sort === 'name-asc') return a.name.localeCompare(b.name);
    if (filters.sort === 'name-desc') return b.name.localeCompare(a.name);
    return 0;
  });

  const allEquipmentTypes = [
    'Equipment',
    'Material',
    'Tool',
    'Machinery',
    'Spare Parts',
    'Safety Gear'
  ].sort();

  const toggleEquipmentType = (type) => {
    setFilters({
      ...filters,
      equipmentType: filters.equipmentType.includes(type)
        ? filters.equipmentType.filter(t => t !== type)
        : [...filters.equipmentType, type]
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      agentType: '',
      equipmentType: [],
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
      case 'agent': return { ...baseStyle, backgroundColor: '#e0f2fe', color: '#0369a1' };
      case 'supplier': return { ...baseStyle, backgroundColor: '#dcfce7', color: '#166534' };
      case 'dealer': return { ...baseStyle, backgroundColor: '#fef3c7', color: '#92400e' };
      default: return baseStyle;
    }
  };

  return (
    <div className="agents-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="agents-header">
        <h1>Agents Directory</h1>
        <p>Browse our directory of professional agents, suppliers, and dealers in Sri Lanka.</p>
        
        <div className="search-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
            {(filters.agentType || filters.equipmentType.length > 0 || filters.location) && (
              <span className="filter-count">
                {[filters.agentType, ...filters.equipmentType, filters.location].filter(Boolean).length}
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
                <h3>Agent Type</h3>
                {expandedFilter === 'type' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'type' && (
                <div className="filter-options">
                  {['agent', 'supplier', 'dealer'].map(type => (
                    <label key={type} className="filter-option">
                      <input
                        type="radio"
                        name="agentType"
                        checked={filters.agentType === type}
                        onChange={() => setFilters({...filters, agentType: type})}
                      />
                      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, agentType: ''})}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            
            <div className="filter-section">
              <div 
                className="filter-header"
                onClick={() => setExpandedFilter(expandedFilter === 'equipment' ? null : 'equipment')}
              >
                <h3>Equipment Types ({filters.equipmentType.length})</h3>
                {expandedFilter === 'equipment' ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedFilter === 'equipment' && (
                <div className="filter-options specialties-grid">
                  {allEquipmentTypes.map(type => (
                    <label key={type} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.equipmentType.includes(type)}
                        onChange={() => toggleEquipmentType(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                  <button 
                    className="clear-option"
                    onClick={() => setFilters({...filters, equipmentType: []})}
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
        
        {(filters.agentType || filters.equipmentType.length > 0 || filters.location) && (
          <div className="active-filters">
            {filters.agentType && (
              <span className="active-filter">
                {filters.agentType.charAt(0).toUpperCase() + filters.agentType.slice(1)}
                <button onClick={() => setFilters({...filters, agentType: ''})}>
                  <FiX />
                </button>
              </span>
            )}
            
            {filters.equipmentType.map(type => (
              <span key={type} className="active-filter">
                {type}
                <button onClick={() => toggleEquipmentType(type)}>
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
            Showing {sortedAgents.length} of {agents.length} agents
          </div>
        )}
      </div>

      {loading ? (
        <div className="agents-grid loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="agent-card loading">
              <div className="image-placeholder"></div>
              <div className="content-placeholder">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedAgents.length > 0 ? (
        <div className="agents-grid">
          {sortedAgents.map((agent) => (
            <div key={agent._id} className="agent-card">
              <div className="card-header">
                <div className="agent-type" style={getTypeBadgeStyle(agent.role)}>
                  {agent.role.charAt(0).toUpperCase() + agent.role.slice(1)}
                </div>
                <h3>{agent.name}</h3>
              </div>
              
              <div className="card-body">
                <div className="contact-info">
                  <div className="info-item">
                    <FiMail className="icon" />
                    <span>{agent.companyEmail}</span>
                  </div>
                  <div className="info-item">
                    <FiMapPin className="icon" />
                    <span>{agent.location}</span>
                  </div>
                  <div className="info-item">
                    <FiPhone className="icon" />
                    <span>{agent.contactNumber || 'Not provided'}</span>
                  </div>
                </div>
                
                <div className="specialties">
                  {agent.equipmentType?.slice(0, 3).map((type, i) => (
                    <span key={i} className="specialty-badge">
                      {type}
                    </span>
                  ))}
                  {agent.equipmentType?.length > 3 && (
                    <span className="specialty-badge">
                      +{agent.equipmentType.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="card-footer">
                <Link to={`/agents/${agent._id}`} className="view-button">
                  View Agent Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No agents match your search criteria</h3>
          <p>Try adjusting your filters or search term</p>
          <button className="reset-button" onClick={resetFilters}>
            Reset All Filters
          </button>
        </div>
      )}

      <style jsx>{`
        .agents-container {
          font-family: 'Outfit', sans-serif;
          max-width: 1400px;
          margin: 25px auto;
          padding: 40px 20px;
          color: #111827;
        }
        
        .agents-header {
          margin-bottom: 40px;
        }
        
        .agents-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
        }
        
        .agents-header p {
          font-size: 16px;
          color: #4b5563;
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
          border: 1px solid #e2e8f0;
          font-size: 16px;
          outline: none;
          transition: border 0.3s ease;
        }
        
        .search-bar input:focus {
          border-color: #1a56db;
        }
        
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
        }
        
        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 8px;
          background-color: white;
          border: 1px solid #e2e8f0;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .filter-toggle:hover {
          border-color: #d1d5db;
        }
        
        .filter-toggle.active {
          background-color: #f3f4f6;
          border-color: #d1d5db;
        }
        
        .filter-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #1a56db;
          color: white;
          font-size: 12px;
          margin-left: 4px;
        }
        
        .filters-panel {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          padding: 20px;
          margin-bottom: 24px;
        }
        
        .filter-section {
          margin-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
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
          color: #111827;
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
          accent-color: #1a56db;
        }
        
        .specialties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 8px;
        }
        
        .clear-option {
          background: none;
          border: none;
          color: #64748b;
          font-size: 14px;
          cursor: pointer;
          padding: 8px 0;
          margin-top: 8px;
        }
        
        .clear-option:hover {
          color: #1a56db;
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
          background-color: #1a56db;
          color: white;
          border: 1px solid #1a56db;
        }
        
        .apply-filters:hover {
          background-color: #1648c7;
        }
        
        .reset-filters {
          background-color: transparent;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }
        
        .reset-filters:hover {
          border-color: #d1d5db;
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
          background-color: #e0f2fe;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .active-filter button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          margin-left: 6px;
          cursor: pointer;
          color: #64748b;
        }
        
        .results-count {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 24px;
          font-style: italic;
        }
        
        .agents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }
        
        .agents-grid.loading {
          opacity: 0.6;
        }
        
        .agent-card {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .agent-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        .card-header {
          padding: 20px 20px 0;
        }
        
        .card-header h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 8px 0 0;
          color: #111827;
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
          color: #64748b;
          font-size: 14px;
        }
        
        .info-item .icon {
          color: #1a56db;
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
          background-color: #f1f5f9;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          color: #1a56db;
        }
        
        .card-footer {
          padding: 20px;
          border-top: 1px solid #f1f5f9;
        }
        
        .view-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          background-color: #1a56db;
          color: white;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .view-button:hover {
          background-color: #1648c7;
        }
        
        .agent-card.loading {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
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
          background-color: #f8fafc;
          border-radius: 12px;
          text-align: center;
          border: 1px dashed rgba(0,0,0,0.1);
          grid-column: 1 / -1;
        }
        
        .empty-state h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #1e293b;
        }
        
        .empty-state p {
          color: #6b7280;
          margin-bottom: 24px;
        }
        
        .reset-button {
          padding: 12px 24px;
          background-color: transparent;
          color: #1a56db;
          border: 1px solid #1a56db;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .reset-button:hover {
          background-color: rgba(26, 86, 219, 0.1);
        }
        
        @media (max-width: 768px) {
          .agents-container {
            padding: 20px 16px;
          }
          
          .agents-header h1 {
            font-size: 24px;
          }
          
          .search-controls {
            flex-direction: column;
          }
          
          .agents-grid {
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

export default AgentsList;