import { memo, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiEyeOff, 
  FiX, 
  FiAlertTriangle,
  FiFilter,
  FiBriefcase,
  FiMail,
  FiPhone
} from 'react-icons/fi';

const JobSeekers = () => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentJobSeeker, setCurrentJobSeeker] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [filters, setFilters] = useState({
    professionalType: '',
    minExperience: '',
    maxExperience: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    professionalType: '',
    yearsOfExperience: '',
    currentlyEmployed: false,
    currentCompany: '',
    highestQualification: '',
    workHistory: [{ jobTitle: '', company: '', duration: '' }],
    visible: true // Add this line
  });


  const toggleVisibility = async (jobSeeker) => {
    try {
      // CORRECT: Use PATCH to the dedicated visibility endpoint
      await axios.patch(`${API_BASE_URL}/jobseekers/${jobSeeker._id}/visibility`);
      showNotification(
        `Job seeker is now ${!jobSeeker.visible ? 'visible' : 'hidden'}`,
        'success'
      );
      fetchJobSeekers();
    } catch (error) {
      showNotification('Failed to update visibility', 'error');
      console.error('Visibility toggle error:', error);
    }
  };

  const [errors, setErrors] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const professionalTypeOptions = [
    'Chartered Engineer',
    'Project Manager',
    'Engineer',
    'Assistant Engineer',
    'Technologist',
    'Technical Officer',
    'Supervisor',
    'Chargehand'
  ];

  const qualificationOptions = [
    'PhD', 'Master', 'Bachelor', 'Diploma',
    'Professional Certification', 'Trade Certification'
  ];

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchJobSeekers = async () => {
    try {
      const params = {};
      if (filters.professionalType) params.professionalType = filters.professionalType;
      if (filters.minExperience) params.minExperience = filters.minExperience;
      if (filters.maxExperience) params.maxExperience = filters.maxExperience;

      const response = await axios.get(`${API_BASE_URL}/jobseekers`, { params });
      setJobSeekers(response.data);
    } catch (error) {
      showNotification('Failed to load job seekers', 'error');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    fetchJobSeekers();
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      professionalType: '',
      minExperience: '',
      maxExperience: ''
    });
    fetchJobSeekers();
    setShowFilters(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleWorkHistoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkHistory = [...formData.workHistory];
    updatedWorkHistory[index][name] = value;
    
    setFormData(prev => ({
      ...prev,
      workHistory: updatedWorkHistory
    }));
  };

  const addWorkHistoryField = () => {
    setFormData(prev => ({
      ...prev,
      workHistory: [...prev.workHistory, { jobTitle: '', company: '', duration: '' }]
    }));
  };

  const removeWorkHistoryField = (index) => {
    if (formData.workHistory.length <= 1) return;
    
    const updatedWorkHistory = [...formData.workHistory];
    updatedWorkHistory.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      workHistory: updatedWorkHistory
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.professionalType) newErrors.professionalType = 'Professional type is required';
    if (!formData.yearsOfExperience || isNaN(formData.yearsOfExperience)) 
      newErrors.yearsOfExperience = 'Valid years of experience is required';
    if (!formData.highestQualification) newErrors.highestQualification = 'Highest qualification is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return showNotification('Please fix the form errors', 'error');

    setIsLoading(true);

    try {
      const dataToSend = {
        ...formData,
        yearsOfExperience: Number(formData.yearsOfExperience)
      };

      const response = currentJobSeeker
        ? await axios.put(`${API_BASE_URL}/jobseekers/${currentJobSeeker._id}`, dataToSend)
        : await axios.post(`${API_BASE_URL}/jobseekers`, dataToSend);

      showNotification(
        currentJobSeeker ? 'Job seeker updated successfully' : 'Job seeker added successfully',
        'success'
      );

      setIsModalOpen(false);
      resetForm();
      await fetchJobSeekers();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to save job seeker', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      professionalType: '',
      yearsOfExperience: '',
      currentlyEmployed: false,
      currentCompany: '',
      highestQualification: '',
      workHistory: [{ jobTitle: '', company: '', duration: '' }],
      visible: true
      
    });
    setCurrentJobSeeker(null);
    setErrors({});
  };

  const openNewJobSeekerModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditJobSeekerModal = (jobSeeker) => {
    setCurrentJobSeeker(jobSeeker);
    setFormData({
      firstName: jobSeeker.firstName,
      lastName: jobSeeker.lastName,
      contactNumber: jobSeeker.contactNumber,
      email: jobSeeker.email,
      professionalType: jobSeeker.professionalType,
      yearsOfExperience: jobSeeker.yearsOfExperience.toString(),
      currentlyEmployed: jobSeeker.currentlyEmployed,
      currentCompany: jobSeeker.currentCompany || '',
      highestQualification: jobSeeker.highestQualification,
      workHistory: jobSeeker.workHistory?.length > 0 
        ? jobSeeker.workHistory 
        : [{ jobTitle: '', company: '', duration: '' }],
      visible: jobSeeker.visible // Fixed: Use jobSeeker.visible instead of jobSeekers.visible
    });
    setIsModalOpen(true);
  };

  const deleteJobSeeker = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/jobseekers/${id}`);
      showNotification('Job seeker deleted successfully', 'success');
      setJobSeekers(jobSeekers.filter(seeker => seeker._id !== id));
      setConfirmDialog(null);
    } catch (error) {
      showNotification('Failed to delete job seeker', 'error');
      setConfirmDialog(null);
    }
  };

  const showNotification = (message, type) => {
    setToast({ message, type, id: Date.now() });
  };

  const showConfirmDialog = (jobSeekerId) => {
    setConfirmDialog({
      id: jobSeekerId,
      message: 'Are you sure you want to delete this job seeker? This action cannot be undone.',
      title: 'Confirm Deletion'
    });
  };

  const FormGroupWithError = memo(({ label, children, error }) => (
    <div style={styles.formGroup}>
      <label style={styles.formLabel}>{label}</label>
      {children}
      {error && (
        <motion.p 
          style={styles.errorText}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  ));

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
                  onClick={() => deleteJobSeeker(confirmDialog.id)}
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

      <div style={styles.header}>
        <h1 style={styles.title}>Job Seekers Management</h1>
        <div style={styles.headerActions}>
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            style={styles.filterButton}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiFilter style={{ marginRight: '8px' }} />
            {showFilters ? 'Hide Filters' : 'Filter'}
          </motion.button>
          <motion.button
            onClick={openNewJobSeekerModal}
            style={styles.addButton}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPlus style={{ marginRight: '8px' }} />
            Add Job Seeker
          </motion.button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            style={styles.filtersPanel}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div style={styles.filterGrid}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Professional Type</label>
                <select
                  name="professionalType"
                  value={filters.professionalType}
                  onChange={handleFilterChange}
                  style={styles.formSelect}
                >
                  <option value="">All Types</option>
                  {professionalTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Min Experience (years)</label>
                <input
                  type="number"
                  name="minExperience"
                  value={filters.minExperience}
                  onChange={handleFilterChange}
                  min="0"
                  max="50"
                  style={styles.formInput}
                  placeholder="Minimum years"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Max Experience (years)</label>
                <input
                  type="number"
                  name="maxExperience"
                  value={filters.maxExperience}
                  onChange={handleFilterChange}
                  min="0"
                  max="50"
                  style={styles.formInput}
                  placeholder="Maximum years"
                />
              </div>
            </div>

            <div style={styles.filterActions}>
              <motion.button
                onClick={resetFilters}
                style={styles.secondaryButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reset
              </motion.button>
              <motion.button
                onClick={applyFilters}
                style={styles.primaryButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {jobSeekers.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No job seekers found. {filters.professionalType || filters.minExperience || filters.maxExperience 
            ? 'Try adjusting your filters' 
            : 'Create your first job seeker to get started.'}
          </p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
            <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Contact</th>
                <th style={styles.tableHeader}>Professional Type</th>
                <th style={styles.tableHeader}>Experience</th>
                <th style={styles.tableHeader}>Qualification</th>
                <th style={styles.tableHeader}>Employment</th>
                <th style={styles.tableHeader}>Visibility</th> {/* Add this column */}
                <th style={styles.tableHeader}>Actions</th>
            </tr>
            </thead>
            <tbody>
              {jobSeekers.map((jobSeeker) => (
                <motion.tr 
                  key={jobSeeker._id}
                  style={styles.tableRow}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td style={styles.tableCell}>
                    <div style={styles.name}>
                      {jobSeeker.firstName} {jobSeeker.lastName}
                    </div>
                    <div style={styles.email}>
                      <FiMail style={styles.icon} /> {jobSeeker.email}
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.contact}>
                      <FiPhone style={styles.icon} /> {jobSeeker.contactNumber}
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <span style={styles.typeBadge}>
                      <FiBriefcase style={styles.icon} /> {jobSeeker.professionalType}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    {jobSeeker.yearsOfExperience} years
                  </td>
                  <td style={styles.tableCell}>
                    {jobSeeker.highestQualification}
                  </td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.employmentBadge,
                      ...(jobSeeker.currentlyEmployed ? styles.employed : styles.unemployed)
                    }}>
                      {jobSeeker.currentlyEmployed ? 'Employed' : 'Available'}
                      {jobSeeker.currentlyEmployed && jobSeeker.currentCompany && (
                        <span style={styles.companyName}> at {jobSeeker.currentCompany}</span>
                      )}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
  <motion.button 
    onClick={() => toggleVisibility(jobSeeker)}
    style={styles.visibilityButton}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    {jobSeeker.visible ? (
      <FiEye style={styles.visibleIcon} />
    ) : (
      <FiEyeOff style={styles.hiddenIcon} />
    )}
  </motion.button>
</td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <motion.button
                        onClick={() => openEditJobSeekerModal(jobSeeker)}
                        style={styles.editButton}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiEdit2 />
                      </motion.button>
                      <motion.button
                        onClick={() => showConfirmDialog(jobSeeker._id)}
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

      {/* Job Seeker Modal */}
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
                  {currentJobSeeker ? 'Edit Job Seeker' : 'Add New Job Seeker'}
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
                  <FormGroupWithError label="First Name" error={errors.firstName}>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.firstName && styles.formInputError)
                      }}
                      placeholder="Enter first name"
                    />
                  </FormGroupWithError>

                  <FormGroupWithError label="Last Name" error={errors.lastName}>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.lastName && styles.formInputError)
                      }}
                      placeholder="Enter last name"
                    />
                  </FormGroupWithError>
                </div>

                <div style={styles.formGrid}>
                  <FormGroupWithError label="Email" error={errors.email}>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.email && styles.formInputError)
                      }}
                      placeholder="Enter email"
                    />
                  </FormGroupWithError>

                  <FormGroupWithError label="Contact Number" error={errors.contactNumber}>
                    <input
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.contactNumber && styles.formInputError)
                      }}
                      placeholder="Enter contact number"
                    />
                  </FormGroupWithError>
                </div>

                <div style={styles.formGrid}>
                  <FormGroupWithError label="Professional Type" error={errors.professionalType}>
                    <select
                      name="professionalType"
                      value={formData.professionalType}
                      onChange={handleChange}
                      style={{
                        ...styles.formSelect,
                        ...(errors.professionalType && styles.formInputError)
                      }}
                    >
                      <option value="">Select Professional Type</option>
                      {professionalTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </FormGroupWithError>

                  <FormGroupWithError label="Years of Experience" error={errors.yearsOfExperience}>
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
                      placeholder="Years of experience"
                    />
                  </FormGroupWithError>
                </div>

                <div style={styles.formGrid}>
                  <FormGroupWithError label="Highest Qualification" error={errors.highestQualification}>
                    <select
                      name="highestQualification"
                      value={formData.highestQualification}
                      onChange={handleChange}
                      style={{
                        ...styles.formSelect,
                        ...(errors.highestQualification && styles.formInputError)
                      }}
                    >
                      <option value="">Select Highest Qualification</option>
                      {qualificationOptions.map(qual => (
                        <option key={qual} value={qual}>{qual}</option>
                      ))}
                    </select>
                  </FormGroupWithError>

                  <div style={styles.formGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="currentlyEmployed"
                        checked={formData.currentlyEmployed}
                        onChange={handleChange}
                        style={styles.checkboxInput}
                      />
                      <span style={styles.checkboxText}>Currently Employed</span>
                    </label>
                    {formData.currentlyEmployed && (
                      <input
                        name="currentCompany"
                        value={formData.currentCompany}
                        onChange={handleChange}
                        style={styles.formInput}
                        placeholder="Current company name"
                      />
                    )}
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
                      <span style={styles.checkboxText}>Visible to employers</span>
                    </label>
                  </div>
                </div>


                

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Work History</label>
                  {formData.workHistory.map((history, index) => (
                    <div key={index} style={styles.workHistoryItem}>
                      <div style={styles.formGrid}>
                        <input
                          name="jobTitle"
                          value={history.jobTitle}
                          onChange={(e) => handleWorkHistoryChange(index, e)}
                          style={styles.formInput}
                          placeholder="Job title"
                        />
                        <input
                          name="company"
                          value={history.company}
                          onChange={(e) => handleWorkHistoryChange(index, e)}
                          style={styles.formInput}
                          placeholder="Company"
                        />
                        <input
                          name="duration"
                          value={history.duration}
                          onChange={(e) => handleWorkHistoryChange(index, e)}
                          style={styles.formInput}
                          placeholder="Duration (e.g., 2018-2020)"
                        />
                        {formData.workHistory.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeWorkHistoryField(index)}
                            style={styles.removeButton}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addWorkHistoryField}
                    style={styles.addMoreButton}
                  >
                    + Add Another Position
                  </button>
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
                  ) : currentJobSeeker ? (
                    'Update Job Seeker'
                  ) : (
                    'Add Job Seeker'
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

// Styles
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
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  headerActions: {
    display: 'flex',
    gap: '16px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#111827',
    margin: 0
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
  filterButton: {
    backgroundColor: '#E5E7EB',
    color: '#374151',
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 500
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
    color: '#111827',
    verticalAlign: 'top'
  },
  name: {
    fontWeight: 500,
    marginBottom: '4px'
  },
  email: {
    fontSize: '13px',
    color: '#6B7280',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  contact: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  icon: {
    color: '#6B7280'
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
  typeBadge: {
    backgroundColor: '#EFF6FF',
    color: '#1E40AF',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  },
  employmentBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500
  },
  employed: {
    backgroundColor: '#D1FAE5',
    color: '#065F46'
  },
  unemployed: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF'
  },
  companyName: {
    color: '#4B5563',
    marginLeft: '4px'
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
  filtersPanel: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  },
  filterActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px'
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500
  },
  secondaryButton: {
    backgroundColor: '#E5E7EB',
    color: '#374151',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500
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
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '8px'
  },
  checkboxInput: {
    marginRight: '8px',
    width: '16px',
    height: '16px',
    accentColor: '#3B82F6'
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
  workHistoryItem: {
    marginBottom: '12px',
    padding: '12px',
    backgroundColor: '#F9FAFB',
    borderRadius: '6px'
  },
  addMoreButton: {
    backgroundColor: 'transparent',
    color: '#3B82F6',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    padding: '8px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  removeButton: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    alignSelf: 'center'
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
  }
};

export default JobSeekers;