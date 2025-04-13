import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiX, FiAlertTriangle } from 'react-icons/fi';

const Lecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLecturer, setCurrentLecturer] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    personalEmail: '',
    contactNumber: '',
    lecturerType: '',
    qualifications: [],
    yearsOfExperience: '',
    institution: '',
    institutionalEmail: '',
    status: 'Active',
    visible: true
  });

  const [errors, setErrors] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const lecturerTypeOptions = [
    'MECHANICAL',
    'ELECTRICAL',
    'BUILDING SERVICES',
    'DRAFTING',
    'QS'
  ];

  const qualificationOptions = [
    'PhD', 'MSc', 'BEng', 'Diploma', 
    'Professional Certification', 'Trade Certification'
  ];

  const statusOptions = ['Active', 'On Leave', 'Retired', 'Suspended'];

  useEffect(() => {
    fetchLecturers();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchLecturers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lecturers`);
      setLecturers(response.data);
    } catch (error) {
      showNotification('Failed to load lecturers', 'error');
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
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.personalEmail.trim()) newErrors.personalEmail = 'Personal email is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.lecturerType) newErrors.lecturerType = 'Lecturer type is required';
    if (formData.qualifications.length === 0) newErrors.qualifications = 'At least one qualification is required';
    if (!formData.yearsOfExperience || isNaN(formData.yearsOfExperience)) 
      newErrors.yearsOfExperience = 'Valid years of experience is required';
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required';

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

      const response = currentLecturer
        ? await axios.put(`${API_BASE_URL}/lecturers/${currentLecturer._id}`, dataToSend)
        : await axios.post(`${API_BASE_URL}/lecturers`, dataToSend);

      showNotification(
        currentLecturer ? 'Lecturer updated successfully' : 'Lecturer added successfully',
        'success'
      );

      setIsModalOpen(false);
      resetForm();
      await fetchLecturers();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to save lecturer', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      personalEmail: '',
      contactNumber: '',
      lecturerType: '',
      qualifications: [],
      yearsOfExperience: '',
      institution: '',
      institutionalEmail: '',
      status: 'Active',
      visible: true
    });
    setCurrentLecturer(null);
  };

  const openNewLecturerModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditLecturerModal = (lecturer) => {
    setCurrentLecturer(lecturer);
    setFormData({
      firstName: lecturer.firstName,
      lastName: lecturer.lastName,
      personalEmail: lecturer.personalEmail,
      contactNumber: lecturer.contactNumber,
      lecturerType: lecturer.lecturerType,
      qualifications: lecturer.qualifications,
      yearsOfExperience: lecturer.yearsOfExperience.toString(),
      institution: lecturer.institution,
      institutionalEmail: lecturer.institutionalEmail || '',
      status: lecturer.status,
      visible: lecturer.visible
    });
    setIsModalOpen(true);
  };

  const deleteLecturer = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/lecturers/${id}`);
      showNotification('Lecturer deleted successfully', 'success');
      setLecturers(lecturers.filter(lecturer => lecturer._id !== id));
      setConfirmDialog(null);
    } catch (error) {
      showNotification('Failed to delete lecturer', 'error');
      setConfirmDialog(null);
    }
  };

  const toggleVisibility = async (lecturer) => {
    try {
      await axios.put(`${API_BASE_URL}/lecturers/${lecturer._id}`, {
        ...lecturer,
        visible: !lecturer.visible
      });
      showNotification(
        `Lecturer is now ${!lecturer.visible ? 'visible' : 'hidden'}`,
        'success'
      );
      fetchLecturers();
    } catch {
      showNotification('Failed to update visibility', 'error');
    }
  };

  const showNotification = (message, type) => {
    setToast({ message, type, id: Date.now() });
  };

  const showConfirmDialog = (lecturerId) => {
    setConfirmDialog({
      id: lecturerId,
      message: 'Are you sure you want to delete this lecturer? This action cannot be undone.',
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
                  onClick={() => deleteLecturer(confirmDialog.id)}
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
        <h1 style={styles.title}>Lecturers Management</h1>
        <motion.button
          onClick={openNewLecturerModal}
          style={styles.addButton}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiPlus style={{ marginRight: '8px' }} />
          Add Lecturer
        </motion.button>
      </div>

      {lecturers.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No lecturers found. Create your first lecturer to get started.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Contact</th>
                <th style={styles.tableHeader}>Type</th>
                <th style={styles.tableHeader}>Experience</th>
                <th style={styles.tableHeader}>Institution</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Visibility</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lecturers.map((lecturer) => (
                <motion.tr 
                  key={lecturer._id}
                  style={styles.tableRow}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td style={styles.tableCell}>
                    <div style={styles.lecturerName}>
                      {lecturer.firstName} {lecturer.lastName}
                    </div>
                    <div style={styles.lecturerEmail}>{lecturer.personalEmail}</div>
                  </td>
                  <td style={styles.tableCell}>{lecturer.contactNumber}</td>
                  <td style={styles.tableCell}>
                    <span style={styles.typeBadge}>
                      {lecturer.lecturerType.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    {lecturer.yearsOfExperience} years
                  </td>
                  <td style={styles.tableCell}>{lecturer.institution}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.statusBadge,
                      ...(lecturer.status === 'Active' ? styles.statusActive : 
                           lecturer.status === 'Suspended' ? styles.statusSuspended : 
                           styles.statusOther)
                    }}>
                      {lecturer.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <motion.button 
                      onClick={() => toggleVisibility(lecturer)}
                      style={styles.visibilityButton}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {lecturer.visible ? (
                        <FiEye style={styles.visibleIcon} />
                      ) : (
                        <FiEyeOff style={styles.hiddenIcon} />
                      )}
                    </motion.button>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <motion.button
                        onClick={() => openEditLecturerModal(lecturer)}
                        style={styles.editButton}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiEdit2 />
                      </motion.button>
                      <motion.button
                        onClick={() => showConfirmDialog(lecturer._id)}
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

      {/* Lecturer Modal */}
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
                  {currentLecturer ? 'Edit Lecturer' : 'Add New Lecturer'}
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
                    <label style={styles.formLabel}>First Name</label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.firstName && styles.formInputError)
                      }}
                    />
                    {errors.firstName && <p style={styles.errorText}>{errors.firstName}</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Last Name</label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.lastName && styles.formInputError)
                      }}
                    />
                    {errors.lastName && <p style={styles.errorText}>{errors.lastName}</p>}
                  </div>
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Personal Email</label>
                    <input
                      name="personalEmail"
                      value={formData.personalEmail}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.personalEmail && styles.formInputError)
                      }}
                    />
                    {errors.personalEmail && <p style={styles.errorText}>{errors.personalEmail}</p>}
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
                    <label style={styles.formLabel}>Lecturer Type</label>
                    <select
                      name="lecturerType"
                      value={formData.lecturerType}
                      onChange={handleChange}
                      style={{
                        ...styles.formSelect,
                        ...(errors.lecturerType && styles.formInputError)
                      }}
                    >
                      <option value="">Select Lecturer Type</option>
                      {lecturerTypeOptions.map(type => (
                        <option key={type} value={type}>{type.replace('_', ' ')}</option>
                      ))}
                    </select>
                    {errors.lecturerType && <p style={styles.errorText}>{errors.lecturerType}</p>}
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

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Institution</label>
                    <input
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.institution && styles.formInputError)
                      }}
                    />
                    {errors.institution && <p style={styles.errorText}>{errors.institution}</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Institutional Email</label>
                    <input
                      name="institutionalEmail"
                      value={formData.institutionalEmail}
                      onChange={handleChange}
                      style={styles.formInput}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Qualifications</label>
                  {errors.qualifications && <p style={styles.errorText}>{errors.qualifications}</p>}
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
                    <span style={styles.checkboxText}>Visible to users</span>
                  </label>
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
                  ) : currentLecturer ? (
                    'Update Lecturer'
                  ) : (
                    'Add Lecturer'
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

// Styles (similar to Consultants but with some adjustments)
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
  lecturerName: {
    fontWeight: 500,
    marginBottom: '4px'
  },
  lecturerEmail: {
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
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 500
  },
  statusActive: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF'
  },
  statusSuspended: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C'
  },
  statusOther: {
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

export default Lecturers;