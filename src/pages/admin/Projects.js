import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiCalendar, FiDollarSign, FiSearch, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    startDate: new Date(),
    endDate: null,
    status: 'pending',
    visible: true,
    contractor: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL/projects}`);
        setProjects(data);
        setFilteredProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;
    
    if (searchTerm) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.contractor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(project => project.status === statusFilter);
    }
    
    setFilteredProjects(result);
  }, [searchTerm, statusFilter, projects]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedProjects = [...filteredProjects].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredProjects(sortedProjects);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };

  const openNewProjectModal = () => {
    setCurrentProject(null);
    setFormData({
      title: '',
      description: '',
      amount: '',
      startDate: new Date(),
      endDate: null,
      status: 'pending',
      visible: true,
      contractor: ''
    });
    setIsModalOpen(true);
  };

  const openEditProjectModal = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      amount: project.amount,
      startDate: new Date(project.startDate),
      endDate: project.endDate ? new Date(project.endDate) : null,
      status: project.status,
      visible: project.visible,
      contractor: project.contractor
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const projectData = {
        ...formData,
        startDate: formData.startDate,
        endDate: formData.endDate,
        amount: parseFloat(formData.amount)
      };

      if (currentProject) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/projects/${currentProject._id}`,
          projectData,
          { withCredentials: true }
        );
        setProjects(projects.map(project => 
          project._id === currentProject._id ? data : project
        ));
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/projects`,
          projectData,
          { withCredentials: true }
        );
        setProjects([...projects, data]);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/projects/${id}`,
          { withCredentials: true }
        );
        setProjects(projects.filter(project => project._id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const toggleVisibility = async (id) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/projects/${id}/visibility`,
        {},
        { withCredentials: true }
      );
      setProjects(projects.map(project => 
        project._id === id ? data : project
      ));
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2>Projects Management</h2>
        <div className="controls">
          <div className="search-filter">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-dropdown">
              <FiFilter className="filter-icon" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <button className="add-project-btn" onClick={openNewProjectModal}>
            <FiPlus /> Add Project
          </button>
        </div>
      </div>

      <div className="projects-table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('title')}>Project Title</th>
              <th onClick={() => requestSort('amount')}>Amount</th>
              <th onClick={() => requestSort('startDate')}>Start Date</th>
              <th onClick={() => requestSort('endDate')}>End Date</th>
              <th onClick={() => requestSort('status')}>Status</th>
              <th>Visibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <div className="project-title">
                      <strong>{project.title}</strong>
                      <div className="project-description">{project.description}</div>
                    </div>
                  </td>
                  <td>{formatCurrency(project.amount)}</td>
                  <td>{formatDate(project.startDate)}</td>
                  <td>{formatDate(project.endDate)}</td>
                  <td>
                    <span className={`status-badge ${project.status}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`visibility-btn ${project.visible ? 'visible' : ''}`}
                      onClick={() => toggleVisibility(project._id)}
                      title={project.visible ? 'Make invisible' : 'Make visible'}
                    >
                      {project.visible ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => openEditProjectModal(project)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteProject(project._id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-projects">
                  No projects found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{currentProject ? 'Edit Project' : 'Add New Project'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Contract Amount</label>
                    <div className="input-with-icon">
                      <FiDollarSign className="input-icon" />
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Contractor</label>
                    <input
                      type="text"
                      name="contractor"
                      value={formData.contractor}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <div className="input-with-icon">
                      <FiCalendar className="input-icon" />
                      <DatePicker
                        selected={formData.startDate}
                        onChange={(date) => handleDateChange(date, 'startDate')}
                        required
                        dateFormat="MMMM d, yyyy"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>End Date (Optional)</label>
                    <div className="input-with-icon">
                      <FiCalendar className="input-icon" />
                      <DatePicker
                        selected={formData.endDate}
                        onChange={(date) => handleDateChange(date, 'endDate')}
                        dateFormat="MMMM d, yyyy"
                        minDate={formData.startDate}
                        isClearable
                        placeholderText="Not specified"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="visible"
                        checked={formData.visible}
                        onChange={handleInputChange}
                      />
                      Visible to public
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {currentProject ? 'Update Project' : 'Add Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .projects-container {
          padding: 24px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .projects-header h2 {
          font-size: 24px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .search-filter {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-box input {
          padding: 8px 12px 8px 36px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          width: 220px;
          transition: all 0.2s ease;
        }

        .search-box input:focus {
          outline: none;
          border-color: #1a56db;
          box-shadow: 0 0 0 3px rgba(26, 86, 219, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: #9ca3af;
        }

        .filter-dropdown {
          position: relative;
          display: flex;
          align-items: center;
        }

        .filter-dropdown select {
          padding: 8px 12px 8px 36px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          background-color: #fff;
          appearance: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-dropdown select:focus {
          outline: none;
          border-color: #1a56db;
          box-shadow: 0 0 0 3px rgba(26, 86, 219, 0.1);
        }

        .filter-icon {
          position: absolute;
          left: 12px;
          color: #9ca3af;
        }

        .add-project-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: #1a56db;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-project-btn:hover {
          background-color: #1646b6;
        }

        .projects-table-container {
          overflow-x: auto;
        }

        .projects-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .projects-table th {
          padding: 12px 16px;
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .projects-table th:hover {
          background-color: #f3f4f6;
          color: #1a56db;
        }

        .projects-table td {
          padding: 16px;
          font-size: 14px;
          color: #4b5563;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: top;
        }

        .projects-table tr:last-child td {
          border-bottom: none;
        }

        .projects-table tr:hover td {
          background-color: #f9fafb;
        }

        .project-title {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .project-title strong {
          color: #111827;
          font-weight: 500;
        }

        .project-description {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.4;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-badge.active {
          background-color: #d1fae5;
          color: #065f46;
        }

        .status-badge.pending {
          background-color: #fef3c7;
          color: #92400e;
        }

        .status-badge.completed {
          background-color: #e0e7ff;
          color: #3730a3;
        }

        .visibility-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background-color: transparent;
          border: 1px solid #e5e7eb;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .visibility-btn:hover {
          background-color: #f3f4f6;
        }

        .visibility-btn.visible {
          color: #1a56db;
          border-color: rgba(26, 86, 219, 0.3);
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .edit-btn, .delete-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-btn {
          color: #1a56db;
        }

        .edit-btn:hover {
          background-color: rgba(26, 86, 219, 0.1);
        }

        .delete-btn {
          color: #ef4444;
        }

        .delete-btn:hover {
          background-color: rgba(239, 68, 68, 0.1);
        }

        .no-projects {
          text-align: center;
          padding: 40px;
          color: #6b7280;
          font-size: 14px;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(26, 86, 219, 0.1);
          border-radius: 50%;
          border-top-color: #1a56db;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(3px);
        }

        .modal-content {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
        }

        .modal-content h3 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
          margin-top: 0;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #1a56db;
          box-shadow: 0 0 0 3px rgba(26, 86, 219, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-row {
          display: flex;
          gap: 16px;
        }

        .form-row .form-group {
          flex: 1;
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .input-with-icon input,
        .input-with-icon .react-datepicker-wrapper {
          width: 100%;
        }

        .input-with-icon input {
          padding-left: 36px;
        }

        .react-datepicker-wrapper {
          display: block;
        }

        .react-datepicker__input-container input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
        }

        .checkbox-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .checkbox-group input {
          width: auto;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }

        .cancel-btn, .submit-btn {
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-btn {
          background-color: transparent;
          border: 1px solid #e5e7eb;
          color: #4b5563;
        }

        .cancel-btn:hover {
          background-color: #f3f4f6;
        }

        .submit-btn {
          background-color: #1a56db;
          border: none;
          color: white;
        }

        .submit-btn:hover {
          background-color: #1646b6;
        }

        @media (max-width: 768px) {
          .projects-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .controls {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
          }

          .search-filter {
            width: 100%;
          }

          .search-box input {
            width: 100%;
          }

          .filter-dropdown {
            width: 100%;
          }

          .filter-dropdown select {
            width: 100%;
          }

          .add-project-btn {
            width: 100%;
            justify-content: center;
          }

          .form-row {
            flex-direction: column;
            gap: 0;
          }

          .modal-content {
            margin: 16px;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;