import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiX, FiAlertTriangle } from 'react-icons/fi';

const JobVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [formData, setFormData] = useState({
    positionTitle: '',
    jobType: '',
    jobDescription: '',
    qualifications: [],
    experienceLevel: '',
    yearsOfExperience: '',
    employmentType: '',
    city: '',
    country: '',
    company: '',
    contactEmail: '',
    status: 'Draft',
    visible: true
  });

  const [errors, setErrors] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const jobTypeOptions = [
    'MECHANICAL',
    'ELECTRICAL',
    'BUILDING_SERVICES',
    'DRAFTING',
    'QUANTITY_SURVEYING'
  ];

  const qualificationOptions = [
    'Diploma', 'Bachelor', 'Master', 'PhD',
    'Professional Certification', 'Trade Certification', 'None'
  ];

  const experienceLevelOptions = [
    'Entry Level', 'Junior', 'Mid-Level', 'Senior', 
    'Lead', 'Manager', 'Director'
  ];

  const employmentTypeOptions = [
    'Full-time', 'Part-time', 'Contract', 'Temporary',
    'Internship', 'Freelance'
  ];

  const statusOptions = ['Draft', 'Published', 'Filled'];

  useEffect(() => {
    fetchVacancies();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchVacancies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/job-vacancies`);
      setVacancies(response.data);
    } catch (error) {
      showNotification('Failed to load job vacancies', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.positionTitle.trim()) newErrors.positionTitle = 'Position title is required';
    if (!formData.jobType) newErrors.jobType = 'Job type is required';
    if (!formData.jobDescription.trim()) newErrors.jobDescription = 'Job description is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
    if (!formData.yearsOfExperience || isNaN(formData.yearsOfExperience)) 
      newErrors.yearsOfExperience = 'Valid years of experience is required';
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';

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

      const response = currentVacancy
        ? await axios.put(`${API_BASE_URL}/job-vacancies/${currentVacancy._id}`, dataToSend)
        : await axios.post(`${API_BASE_URL}/job-vacancies`, dataToSend);

      showNotification(
        currentVacancy ? 'Job vacancy updated successfully' : 'Job vacancy added successfully',
        'success'
      );

      setIsModalOpen(false);
      resetForm();
      await fetchVacancies();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to save job vacancy', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      positionTitle: '',
      jobType: '',
      jobDescription: '',
      qualifications: [],
      experienceLevel: '',
      yearsOfExperience: '',
      employmentType: '',
      city: '',
      country: '',
      company: '',
      contactEmail: '',
      status: 'Draft',
      visible: true
    });
    setCurrentVacancy(null);
  };

  const openNewVacancyModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditVacancyModal = (vacancy) => {
    setCurrentVacancy(vacancy);
    setFormData({
      positionTitle: vacancy.positionTitle,
      jobType: vacancy.jobType,
      jobDescription: vacancy.jobDescription,
      qualifications: vacancy.qualifications || [],
      experienceLevel: vacancy.experienceLevel,
      yearsOfExperience: vacancy.yearsOfExperience.toString(),
      employmentType: vacancy.employmentType,
      city: vacancy.city || '',
      country: vacancy.country,
      company: vacancy.company,
      contactEmail: vacancy.contactEmail,
      status: vacancy.status,
      visible: vacancy.visible
    });
    setIsModalOpen(true);
  };

  const deleteVacancy = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/job-vacancies/${id}`);
      showNotification('Job vacancy deleted successfully', 'success');
      setVacancies(vacancies.filter(vacancy => vacancy._id !== id));
      setConfirmDialog(null);
    } catch (error) {
      showNotification('Failed to delete job vacancy', 'error');
      setConfirmDialog(null);
    }
  };

  const toggleVisibility = async (vacancy) => {
    try {
      await axios.patch(`${API_BASE_URL}/job-vacancies/${vacancy._id}/visibility`);
      showNotification(
        `Job vacancy is now ${!vacancy.visible ? 'visible' : 'hidden'}`,
        'success'
      );
      fetchVacancies();
    } catch {
      showNotification('Failed to update visibility', 'error');
    }
  };

  const showNotification = (message, type) => {
    setToast({ message, type, id: Date.now() });
  };

  const showConfirmDialog = (vacancyId) => {
    setConfirmDialog({
      id: vacancyId,
      message: 'Are you sure you want to delete this job vacancy? This action cannot be undone.',
      title: 'Confirm Deletion'
    });
  };

  return (
    <div style={styles.container}>
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
                  onClick={() => deleteVacancy(confirmDialog.id)}
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
        <h1 style={styles.title}>Job Vacancies Management</h1>
        <motion.button
          onClick={openNewVacancyModal}
          style={styles.addButton}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiPlus style={{ marginRight: '8px' }} />
          Add Job Vacancy
        </motion.button>
      </div>

      {vacancies.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No job vacancies found. Create your first job vacancy to get started.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Position</th>
                <th style={styles.tableHeader}>Type</th>
                <th style={styles.tableHeader}>Experience</th>
                <th style={styles.tableHeader}>Employment</th>
                <th style={styles.tableHeader}>Location</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Visibility</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((vacancy) => (
                <motion.tr 
                  key={vacancy._id}
                  style={styles.tableRow}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td style={styles.tableCell}>
                    <div style={styles.positionTitle}>
                      {vacancy.positionTitle}
                    </div>
                    <div style={styles.companyName}>{vacancy.company?.name}</div>
                  </td>
                  <td style={styles.tableCell}>
                    <span style={styles.typeBadge}>
                      {vacancy.jobType.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    {vacancy.yearsOfExperience} years ({vacancy.experienceLevel})
                  </td>
                  <td style={styles.tableCell}>
                    {vacancy.employmentType}
                  </td>
                  <td style={styles.tableCell}>
                    {vacancy.city ? `${vacancy.city}, ${vacancy.country}` : vacancy.country}
                  </td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.statusBadge,
                      ...(vacancy.status === 'Published' ? styles.statusPublished : 
                           vacancy.status === 'Filled' ? styles.statusFilled : 
                           styles.statusDraft)
                    }}>
                      {vacancy.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <motion.button 
                      onClick={() => toggleVisibility(vacancy)}
                      style={styles.visibilityButton}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {vacancy.visible ? (
                        <FiEye style={styles.visibleIcon} />
                      ) : (
                        <FiEyeOff style={styles.hiddenIcon} />
                      )}
                    </motion.button>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <motion.button
                        onClick={() => openEditVacancyModal(vacancy)}
                        style={styles.editButton}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiEdit2 />
                      </motion.button>
                      <motion.button
                        onClick={() => showConfirmDialog(vacancy._id)}
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
                  {currentVacancy ? 'Edit Job Vacancy' : 'Add New Job Vacancy'}
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
                    <label style={styles.formLabel}>Position Title</label>
                    <input
                      name="positionTitle"
                      value={formData.positionTitle}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.positionTitle && styles.formInputError)
                      }}
                    />
                    {errors.positionTitle && <p style={styles.errorText}>{errors.positionTitle}</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Job Type</label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      style={{
                        ...styles.formSelect,
                        ...(errors.jobType && styles.formInputError)
                      }}
                    >
                      <option value="">Select Job Type</option>
                      {jobTypeOptions.map(type => (
                        <option key={type} value={type}>{type.replace('_', ' ')}</option>
                      ))}
                    </select>
                    {errors.jobType && <p style={styles.errorText}>{errors.jobType}</p>}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Job Description</label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    rows={5}
                    style={{
                      ...styles.formInput,
                      ...(errors.jobDescription && styles.formInputError)
                    }}
                  />
                  {errors.jobDescription && <p style={styles.errorText}>{errors.jobDescription}</p>}
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Experience Level</label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      style={{
                        ...styles.formSelect,
                        ...(errors.experienceLevel && styles.formInputError)
                      }}
                    >
                      <option value="">Select Experience Level</option>
                      {experienceLevelOptions.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    {errors.experienceLevel && <p style={styles.errorText}>{errors.experienceLevel}</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Years of Experience</label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      min="0"
                      style={{
                        ...styles.formInput,
                        ...(errors.yearsOfExperience && styles.formInputError)
                      }}
                    />
                    {errors.yearsOfExperience && <p style={styles.errorText}>{errors.yearsOfExperience}</p>}
                  </div>
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Employment Type</label>
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      style={{
                        ...styles.formSelect,
                        ...(errors.employmentType && styles.formInputError)
                      }}
                    >
                      <option value="">Select Employment Type</option>
                      {employmentTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.employmentType && <p style={styles.errorText}>{errors.employmentType}</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Country</label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.country && styles.formInputError)
                      }}
                    />
                    {errors.country && <p style={styles.errorText}>{errors.country}</p>}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>City (Optional)</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.formGrid}>
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

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Contact Email</label>
                    <input
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.contactEmail && styles.formInputError)
                      }}
                    />
                    {errors.contactEmail && <p style={styles.errorText}>{errors.contactEmail}</p>}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Qualifications</label>
                  <div style={styles.qualificationsGrid}>
                    {qualificationOptions.map((qualification) => (
                      <div key={qualification} style={styles.qualificationOption}>
                        <input
                          type="checkbox"
                          id={`qualification-${qualification}`}
                          checked={formData.qualifications.includes(qualification)}
                          onChange={() => handleQualificationChange(qualification)}
                          style={styles.checkboxInput}
                        />
                        <label htmlFor={`qualification-${qualification}`} style={styles.qualificationLabel}>
                          {qualification}
                        </label>
                      </div>
                    ))}
                  </div>
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
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
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
                      <span style={styles.checkboxText}>Visible to applicants</span>
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
                  ) : currentVacancy ? (
                    'Update Job Vacancy'
                  ) : (
                    'Add Job Vacancy'
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
  positionTitle: {
    fontWeight: 500,
    marginBottom: '4px'
  },
  companyName: {
    fontSize: '13px',
    color: '#6B7280'
  },
  typeBadge: {
    backgroundColor: '#EFF6FF',
    color: '#1E40AF',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 500
  },
  statusBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500
  },
  statusPublished: {
    backgroundColor: '#D1FAE5',
    color: '#065F46'
  },
  statusFilled: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF'
  },
  statusDraft: {
    backgroundColor: '#FEF3C7',
    color: '#92400E'
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
  qualificationsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    maxHeight: '200px',
    overflowY: 'auto',
    padding: '8px',
    border: '1px solid #E5E7EB',
    borderRadius: '6px'
  },
  qualificationOption: {
    display: 'flex',
    alignItems: 'center'
  },
  qualificationLabel: {
    fontSize: '14px',
    color: '#374151',
    marginLeft: '8px',
    cursor: 'pointer'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
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

export default JobVacancies;