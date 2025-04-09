import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiEyeOff, 
  FiX, 
  FiAlertTriangle, 
  FiSearch, 
  FiFilter,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

const Directors = () => {
  const [directors, setDirectors] = useState([]);
  const [filteredDirectors, setFilteredDirectors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDirector, setCurrentDirector] = useState(null);
  const [expandedDirectorId, setExpandedDirectorId] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    position: '',
    expertise: '',
    minExperience: '',
    maxExperience: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    company: '',
    position: 'Managing Director',
    yearsOfExperience: '',
    qualifications: [],
    projectsManaged: [],
    areasOfExpertise: [],
    status: 'active',
    visible: true
  });

  const [errors, setErrors] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Qualification options
  const qualificationOptions = [
    'BSc', 'MSc', 'PhD', 'MBA', 'Chartered Engineer', 'Professional Engineer', 'Other'
  ];

  // Position options
  const positionOptions = [
    'Managing Director',
    'Technical Director',
    'Finance Director',
    'Operations Director',
    'Commercial Director',
    'Other'
  ];

  // Expertise options
  const expertiseOptions = [
    'Construction Management',
    'Cost Control',
    'Contract Administration',
    'Project Planning',
    'Risk Management',
    'Health & Safety',
    'Quality Assurance',
    'Stakeholder Management'
  ];

  useEffect(() => {
    fetchDirectors();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    filterDirectors();
  }, [directors, searchQuery, filters]);

  const fetchDirectors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/directors`);
      setDirectors(response.data);
    } catch (error) {
      showNotification('Failed to load directors', 'error');
    }
  };

  const filterDirectors = () => {
    let result = [...directors];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(director => 
        director.name.toLowerCase().includes(query) ||
        director.email.toLowerCase().includes(query) ||
        director.company.toLowerCase().includes(query)
    ); 
    }

    if (filters.status) {
      result = result.filter(director => director.status === filters.status);
    }

    if (filters.position) {
      result = result.filter(director => director.position === filters.position);
    }

    if (filters.expertise) {
      result = result.filter(director => 
        director.areasOfExpertise.includes(filters.expertise));
    }

    if (filters.minExperience) {
      result = result.filter(director => 
        Number(director.yearsOfExperience) >= Number(filters.minExperience));
    }

    if (filters.maxExperience) {
      result = result.filter(director => 
        Number(director.yearsOfExperience) <= Number(filters.maxExperience));
    }

    setFilteredDirectors(result);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      position: '',
      expertise: '',
      minExperience: '',
      maxExperience: ''
    });
    setSearchQuery('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleQualificationChange = (qualification) => {
    setFormData(prev => {
      const newQualifications = prev.qualifications.includes(qualification)
        ? prev.qualifications.filter(q => q !== qualification)
        : [...prev.qualifications, qualification];
      
      return {
        ...prev,
        qualifications: newQualifications
      };
    });
  };

  const handleExpertiseChange = (expertise) => {
    setFormData(prev => {
      const newExpertise = prev.areasOfExpertise.includes(expertise)
        ? prev.areasOfExpertise.filter(e => e !== expertise)
        : [...prev.areasOfExpertise, expertise];
      
      return {
        ...prev,
        areasOfExpertise: newExpertise
      };
    });
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projectsManaged];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [name]: name === 'completionYear' || name === 'value' ? Number(value) : value
    };
    
    setFormData(prev => ({
      ...prev,
      projectsManaged: updatedProjects
    }));
  };

  const addNewProject = () => {
    setFormData(prev => ({
      ...prev,
      projectsManaged: [
        ...prev.projectsManaged,
        {
          name: '',
          value: 0,
          completionYear: new Date().getFullYear()
        }
      ]
    }));
  };

  const removeProject = (index) => {
    const updatedProjects = [...formData.projectsManaged];
    updatedProjects.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      projectsManaged: updatedProjects
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.yearsOfExperience || isNaN(formData.yearsOfExperience)) 
      newErrors.yearsOfExperience = 'Valid years of experience is required';
    if (formData.qualifications.length === 0) newErrors.qualifications = 'At least one qualification is required';
    if (formData.areasOfExpertise.length === 0) newErrors.areasOfExpertise = 'At least one area of expertise is required';
    
    formData.projectsManaged.forEach((project, index) => {
      if (!project.name.trim()) {
        newErrors[`projectsManaged[${index}].name`] = 'Project name is required';
      }
      if (!project.value || isNaN(project.value)) {
        newErrors[`projectsManaged[${index}].value`] = 'Valid project value is required';
      }
      if (!project.completionYear || isNaN(project.completionYear)) {
        newErrors[`projectsManaged[${index}].completionYear`] = 'Valid completion year is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return showNotification('Please fix the form errors', 'error');

    setIsLoading(true);

    try {
      const response = currentDirector
        ? await axios.put(`${API_BASE_URL}/directors/${currentDirector._id}`, formData)
        : await axios.post(`${API_BASE_URL}/directors`, formData);

      showNotification(
        currentDirector ? 'Director updated successfully' : 'Director added successfully',
        'success'
      );

      setIsModalOpen(false);
      resetForm();
      await fetchDirectors();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to save director', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contactNumber: '',
      email: '',
      company: '',
      position: 'Managing Director',
      yearsOfExperience: '',
      qualifications: [],
      projectsManaged: [],
      areasOfExpertise: [],
      status: 'active',
      visible: true
    });
    setCurrentDirector(null);
  };

  const openNewDirectorModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditDirectorModal = (director) => {
    setCurrentDirector(director);
    setFormData({
      name: director.name,
      contactNumber: director.contactNumber,
      email: director.email,
      company: director.company,
      position: director.position,
      yearsOfExperience: director.yearsOfExperience,
      qualifications: director.qualifications,
      projectsManaged: director.projectsManaged || [],
      areasOfExpertise: director.areasOfExpertise,
      status: director.status,
      visible: director.visible
    });
    setIsModalOpen(true);
  };

  const deleteDirector = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/directors/${id}`);
      showNotification('Director deleted successfully', 'success');
      setDirectors(directors.filter(director => director._id !== id));
      setConfirmDialog(null);
    } catch (error) {
      showNotification('Failed to delete director', 'error');
      setConfirmDialog(null);
    }
  };

  const toggleVisibility = async (director) => {
    try {
      await axios.put(`${API_BASE_URL}/directors/${director._id}`, {
        ...director,
        visible: !director.visible
      });
      showNotification(
        `Director is now ${!director.visible ? 'visible' : 'hidden'}`,
        'success'
      );
      fetchDirectors();
    } catch {
      showNotification('Failed to update visibility', 'error');
    }
  };

  const toggleDescription = (directorId) => {
    setExpandedDirectorId(expandedDirectorId === directorId ? null : directorId);
  };

  const showNotification = (message, type) => {
    setToast({ message, type, id: Date.now() });
  };

  const showConfirmDialog = (directorId) => {
    setConfirmDialog({
      id: directorId,
      message: 'Are you sure you want to delete this director? This action cannot be undone.',
      title: 'Confirm Deletion'
    });
  };

  return (
    <div style={styles.container}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              ...styles.toast,
              backgroundColor: toast.type === 'success' ? '#10B981' : '#EF4444'
            }}
          >
            <div style={styles.toastContent}>
              <span style={styles.toastMessage}>{toast.message}</span>
              <button
                onClick={() => setToast(null)}
                style={styles.toastCloseButton}
              >
                <FiX />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {confirmDialog && (
          <motion.div
            style={styles.confirmOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.confirmDialog}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div style={styles.confirmHeader}>
                <FiAlertTriangle style={styles.confirmIcon} />
                <h3 style={styles.confirmTitle}>{confirmDialog.title}</h3>
              </div>
              <p style={styles.confirmMessage}>{confirmDialog.message}</p>
              <div style={styles.confirmButtons}>
                <motion.button
                  style={styles.cancelButton}
                  onClick={() => setConfirmDialog(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  style={styles.deleteConfirmButton}
                  onClick={() => deleteDirector(confirmDialog.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Dialog */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            style={styles.filterOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.filterDialog}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <div style={styles.filterHeader}>
                <h3 style={styles.filterTitle}>Filter Directors</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  style={styles.filterCloseButton}
                >
                  <FiX />
                </button>
              </div>
              
              <div style={styles.filterContent}>
                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>Status</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    style={styles.filterSelect}
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>Position</label>
                  <select
                    name="position"
                    value={filters.position}
                    onChange={handleFilterChange}
                    style={styles.filterSelect}
                  >
                    <option value="">All Positions</option>
                    {positionOptions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>Area of Expertise</label>
                  <select
                    name="expertise"
                    value={filters.expertise}
                    onChange={handleFilterChange}
                    style={styles.filterSelect}
                  >
                    <option value="">All Expertise</option>
                    {expertiseOptions.map(ex => (
                      <option key={ex} value={ex}>{ex}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.filterGrid}>
                  <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>Min Experience (years)</label>
                    <input
                      type="number"
                      name="minExperience"
                      value={filters.minExperience}
                      onChange={handleFilterChange}
                      style={styles.filterInput}
                      placeholder="0"
                    />
                  </div>
                  <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>Max Experience (years)</label>
                    <input
                      type="number"
                      name="maxExperience"
                      value={filters.maxExperience}
                      onChange={handleFilterChange}
                      style={styles.filterInput}
                      placeholder="Any"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.filterFooter}>
                <motion.button
                  style={styles.filterResetButton}
                  onClick={resetFilters}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reset Filters
                </motion.button>
                <motion.button
                  style={styles.filterApplyButton}
                  onClick={() => setIsFilterOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Filters
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={styles.header}>
        <h1 style={styles.title}>Directors Management</h1>
        <div style={styles.actions}>
          <div style={styles.searchContainer}>
            <FiSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search directors..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={styles.searchInput}
            />
            <motion.button
              style={styles.filterButton}
              onClick={() => setIsFilterOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFilter style={styles.filterIcon} />
            </motion.button>
          </div>
          <motion.button
            onClick={openNewDirectorModal}
            style={styles.addButton}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPlus style={{ marginRight: '8px' }} />
            Add Director
          </motion.button>
        </div>
      </div>

      {filteredDirectors.length === 0 ? (
        <div style={styles.emptyState}>
          <p>{directors.length === 0 ? 'No directors found. Create your first director to get started.' : 'No directors match your search or filters.'}</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Company</th>
                <th style={styles.tableHeader}>Position</th>
                <th style={styles.tableHeader}>Experience</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Visibility</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDirectors.map((director) => (
                <motion.tr 
                  key={director._id}
                  style={styles.tableRow}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td style={styles.tableCell}>
                    <div style={styles.directorName}>{director.name}</div>
                    <div style={styles.directorEmail}>{director.email}</div>
                  </td>
                  <td style={styles.tableCell}>{director.company}</td>
                  <td style={styles.tableCell}>{director.position}</td>
                  <td style={styles.tableCell}>{director.yearsOfExperience} years</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.statusBadge,
                      ...(director.status === 'active' ? styles.statusActive : styles.statusInactive)
                    }}>
                      {director.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <motion.button 
                      onClick={() => toggleVisibility(director)}
                      style={styles.visibilityButton}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {director.visible ? (
                        <FiEye style={styles.visibleIcon} />
                      ) : (
                        <FiEyeOff style={styles.hiddenIcon} />
                      )}
                    </motion.button>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <motion.button
                        onClick={() => openEditDirectorModal(director)}
                        style={styles.editButton}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiEdit2 />
                      </motion.button>
                      <motion.button
                        onClick={() => showConfirmDialog(director._id)}
                        style={styles.deleteButton}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiTrash2 />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Director Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.modalContent}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>
                  {currentDirector ? 'Edit Director' : 'Add New Director'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={styles.modalCloseButton}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.name && styles.formInputError)
                      }}
                    />
                    {errors.name && <p style={styles.errorText}>{errors.name}</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Contact Number</label>
                    <input
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.contactNumber && styles.formInputError)
                      }}
                    />
                    {errors.contactNumber && <p style={styles.errorText}>{errors.contactNumber}</p>}
                  </div>
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.email && styles.formInputError)
                      }}
                    />
                    {errors.email && <p style={styles.errorText}>{errors.email}</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Company</label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.company && styles.formInputError)
                      }}
                    />
                    {errors.company && <p style={styles.errorText}>{errors.company}</p>}
                  </div>
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Position</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      style={styles.formSelect}
                    >
                      {positionOptions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Years of Experience</label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      min="0"
                      max="50"
                      style={{
                        ...styles.formInput,
                        ...(errors.yearsOfExperience && styles.formInputError)
                      }}
                    />
                    {errors.yearsOfExperience && <p style={styles.errorText}>{errors.yearsOfExperience}</p>}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Qualifications</label>
                  {errors.qualifications && <p style={styles.errorText}>{errors.qualifications}</p>}
                  <div style={styles.checkboxGrid}>
                    {qualificationOptions.map((qualification) => (
                      <div key={qualification} style={styles.checkboxOption}>
                        <input
                          type="checkbox"
                          id={`qualification-${qualification}`}
                          checked={formData.qualifications.includes(qualification)}
                          onChange={() => handleQualificationChange(qualification)}
                          style={styles.checkboxInput}
                        />
                        <label htmlFor={`qualification-${qualification}`} style={styles.checkboxLabel}>
                          {qualification}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Areas of Expertise</label>
                  {errors.areasOfExpertise && <p style={styles.errorText}>{errors.areasOfExpertise}</p>}
                  <div style={styles.checkboxGrid}>
                    {expertiseOptions.map((expertise) => (
                      <div key={expertise} style={styles.checkboxOption}>
                        <input
                          type="checkbox"
                          id={`expertise-${expertise}`}
                          checked={formData.areasOfExpertise.includes(expertise)}
                          onChange={() => handleExpertiseChange(expertise)}
                          style={styles.checkboxInput}
                        />
                        <label htmlFor={`expertise-${expertise}`} style={styles.checkboxLabel}>
                          {expertise}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>Projects Managed ({formData.projectsManaged.length})</h3>
                </div>

                <div style={styles.sectionContent}>
                  {formData.projectsManaged.map((project, index) => (
                    <div key={index} style={styles.projectCard}>
                      <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                          <label style={styles.formLabel}>Project Name</label>
                          <input
                            name="name"
                            value={project.name}
                            onChange={(e) => handleProjectChange(index, e)}
                            style={{
                              ...styles.formInput,
                              ...(errors[`projectsManaged[${index}].name`] && styles.formInputError)
                            }}
                          />
                          {errors[`projectsManaged[${index}].name`] && (
                            <p style={styles.errorText}>{errors[`projectsManaged[${index}].name`]}</p>
                          )}
                        </div>

                        <div style={styles.formGroup}>
                          <label style={styles.formLabel}>Value ($)</label>
                          <input
                            type="number"
                            name="value"
                            value={project.value}
                            onChange={(e) => handleProjectChange(index, e)}
                            min="0"
                            style={{
                              ...styles.formInput,
                              ...(errors[`projectsManaged[${index}].value`] && styles.formInputError)
                            }}
                          />
                          {errors[`projectsManaged[${index}].value`] && (
                            <p style={styles.errorText}>{errors[`projectsManaged[${index}].value`]}</p>
                          )}
                        </div>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Completion Year</label>
                        <input
                          type="number"
                          name="completionYear"
                          value={project.completionYear}
                          onChange={(e) => handleProjectChange(index, e)}
                          min="1900"
                          max={new Date().getFullYear()}
                          style={{
                            ...styles.formInput,
                            ...(errors[`projectsManaged[${index}].completionYear`] && styles.formInputError)
                          }}
                        />
                        {errors[`projectsManaged[${index}].completionYear`] && (
                          <p style={styles.errorText}>{errors[`projectsManaged[${index}].completionYear`]}</p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        style={styles.removeProjectButton}
                      >
                        <FiTrash2 /> Remove Project
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addNewProject}
                    style={styles.addProjectButton}
                  >
                    <FiPlus /> Add Project
                  </button>
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      style={styles.formSelect}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="visible"
                        checked={formData.visible}
                        onChange={handleChange}
                        style={styles.checkboxInput}
                      />
                      <span style={styles.checkboxText}>Visible to users</span>
                    </label>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  style={styles.submitButton}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span style={styles.loadingText}>Processing...</span>
                  ) : currentDirector ? (
                    'Update Director'
                  ) : (
                    'Add Director'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Styles (same as your existing styles with minor adjustments)
const styles = {
  container: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#111827',
    margin: 0
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: '6px',
    padding: '6px 12px',
    transition: 'all 0.2s ease',
    '&:focus-within': {
      backgroundColor: 'white',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
    }
  },
  searchIcon: {
    color: '#6B7280',
    marginRight: '8px',
    fontSize: '16px'
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '14px',
    width: '180px',
    padding: '4px 0',
    color: '#111827',
    '&::placeholder': {
      color: '#9CA3AF'
    }
  },
  filterButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    marginLeft: '8px',
    color: '#6B7280',
    '&:hover': {
      color: '#3B82F6'
    }
  },
  filterIcon: {
    fontSize: '16px'
  },
  addButton: {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 500,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '40px',
    textAlign: 'center',
    color: '#6B7280',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeaderRow: {
    backgroundColor: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB'
  },
  tableHeader: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 500,
    color: '#6B7280'
  },
  tableRow: {
    borderBottom: '1px solid #E5E7EB',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#111827'
  },
  directorName: {
    fontWeight: 500,
    marginBottom: '4px'
  },
  directorEmail: {
    fontSize: '13px',
    color: '#6B7280'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 500
  },
  statusActive: {
    backgroundColor: '#D1FAE5',
    color: '#065F46'
  },
  statusInactive: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C'
  },
  visibilityButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  visibleIcon: {
    color: '#10B981',
    fontSize: '20px',
    strokeWidth: '2px'
  },
  hiddenIcon: {
    color: '#6B7280',
    fontSize: '20px',
    strokeWidth: '2px'
  },
  actionButtons: {
    display: 'flex',
    gap: '12px'
  },
  editButton: {
    color: '#3B82F6',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px'
  },
  deleteButton: {
    color: '#EF4444',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
    overflow: 'auto'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    margin: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #E5E7EB',
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    zIndex: 10
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: 0
  },
  modalCloseButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#6B7280',
    cursor: 'pointer',
    padding: '4px',
    '&:hover': {
      color: '#111827'
    }
  },
  form: {
    padding: '20px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px'
  },
  formGroup: {
    marginBottom: '16px'
  },
  formLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '8px'
  },
  formInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    '&:focus': {
      outline: 'none',
      borderColor: '#3B82F6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    }
  },
  formInputError: {
    borderColor: '#EF4444',
    '&:focus': {
      borderColor: '#EF4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
    }
  },
  formSelect: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    backgroundColor: 'white',
    '&:focus': {
      outline: 'none',
      borderColor: '#3B82F6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    }
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  checkboxOption: {
    display: 'flex',
    alignItems: 'center'
  },
  checkboxInput: {
    marginRight: '8px',
    width: '16px',
    height: '16px',
    accentColor: '#3B82F6'
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#374151',
    cursor: 'pointer'
  },
  checkboxText: {
    fontSize: '14px',
    color: '#374151'
  },
  errorText: {
    color: '#EF4444',
    fontSize: '12px',
    marginTop: '4px'
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '8px',
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed'
    }
  },
  loadingText: {
    display: 'inline-block',
    marginRight: '8px'
  },
  toast: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '250px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 9999
  },
  toastContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  toastMessage: {
    fontSize: '14px',
    fontWeight: 500
  },
  toastCloseButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    marginLeft: '12px',
    fontSize: '16px'
  },
  confirmOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    padding: '20px'
  },
  confirmDialog: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
  },
  confirmHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  },
  confirmIcon: {
    color: '#EF4444',
    fontSize: '24px',
    marginRight: '12px'
  },
  confirmTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: 0
  },
  confirmMessage: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '24px',
    lineHeight: '1.5'
  },
  confirmButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px'
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#374151',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#F9FAFB'
    }
  },
  deleteConfirmButton: {
    padding: '8px 16px',
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#DC2626'
    }
  },
  filterOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  filterDialog: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
  },
  filterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #E5E7EB',
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    zIndex: 10
  },
  filterTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: 0
  },
  filterCloseButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#6B7280',
    cursor: 'pointer',
    padding: '4px',
    '&:hover': {
      color: '#111827'
    }
  },
  filterContent: {
    padding: '20px'
  },
  filterGroup: {
    marginBottom: '16px'
  },
  filterLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '8px'
  },
  filterSelect: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    backgroundColor: 'white',
    '&:focus': {
      outline: 'none',
      borderColor: '#3B82F6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    }
  },
  filterInput: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    '&:focus': {
      outline: 'none',
      borderColor: '#3B82F6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    }
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  filterFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 20px',
    borderTop: '1px solid #E5E7EB',
    position: 'sticky',
    bottom: 0,
    backgroundColor: 'white'
  },
  filterResetButton: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#374151',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#F9FAFB'
    }
  },
  filterApplyButton: {
    padding: '8px 16px',
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#2563EB'
    }
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #E5E7EB',
    margin: '20px 0 10px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: 0
  },
  sectionContent: {
    padding: '10px 0',
    borderBottom: '1px solid #E5E7EB',
    marginBottom: '20px'
  },
  projectCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    position: 'relative'
  },
  addProjectButton: {
    backgroundColor: '#EFF6FF',
    color: '#3B82F6',
    border: '1px dashed #3B82F6',
    borderRadius: '6px',
    padding: '10px 16px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    marginTop: '8px',
    '&:hover': {
      backgroundColor: '#DBEAFE'
    }
  },
  removeProjectButton: {
    backgroundColor: '#FEE2E2',
    color: '#EF4444',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    marginTop: '12px',
    '&:hover': {
      backgroundColor: '#FECACA'
    }
  }
};

export default Directors;