import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiX, FiAlertTriangle } from 'react-icons/fi';

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentInstitution, setCurrentInstitution] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    contactNumber: '',
    address: '',
    status: 'Active',
    visible: true
  });

  const [errors, setErrors] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const institutionTypeOptions = ['LEARNING', 'TRAINING'];
  const statusOptions = ['Active', 'Inactive'];

  useEffect(() => {
    fetchInstitutions();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchInstitutions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/institutions`);
      setInstitutions(response.data);
    } catch (error) {
      showNotification('Failed to load institutions', 'error');
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Institution name is required';
    if (!formData.type) newErrors.type = 'Institution type is required';
    if (!formData.email.trim()) newErrors.email = 'Institution email is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return showNotification('Please fix the form errors', 'error');

    setIsLoading(true);

    try {
      const dataToSend = {
        ...formData
      };

      const response = currentInstitution
        ? await axios.put(`${API_BASE_URL}/institutions/${currentInstitution._id}`, dataToSend)
        : await axios.post(`${API_BASE_URL}/institutions`, dataToSend);

      showNotification(
        currentInstitution ? 'Institution updated successfully' : 'Institution added successfully',
        'success'
      );

      setIsModalOpen(false);
      resetForm();
      await fetchInstitutions();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to save institution', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      email: '',
      contactNumber: '',
      address: '',
      status: 'Active',
      visible: true
    });
    setCurrentInstitution(null);
  };

  const openNewInstitutionModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditInstitutionModal = (institution) => {
    setCurrentInstitution(institution);
    setFormData({
      name: institution.name,
      type: institution.type,
      email: institution.email,
      contactNumber: institution.contactNumber,
      address: institution.address,
      status: institution.status,
      visible: institution.visible
    });
    setIsModalOpen(true);
  };

  const deleteInstitution = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/institutions/${id}`);
      showNotification('Institution deleted successfully', 'success');
      setInstitutions(institutions.filter(institution => institution._id !== id));
      setConfirmDialog(null);
    } catch (error) {
      showNotification('Failed to delete institution', 'error');
      setConfirmDialog(null);
    }
  };

  const toggleVisibility = async (institution) => {
    try {
      await axios.patch(`${API_BASE_URL}/institutions/${institution._id}/visibility`);
      showNotification(
        `Institution is now ${!institution.visible ? 'visible' : 'hidden'}`,
        'success'
      );
      fetchInstitutions();
    } catch {
      showNotification('Failed to update visibility', 'error');
    }
  };

  const showNotification = (message, type) => {
    setToast({ message, type, id: Date.now() });
  };

  const showConfirmDialog = (institutionId) => {
    setConfirmDialog({
      id: institutionId,
      message: 'Are you sure you want to delete this institution? This action cannot be undone.',
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
                  onClick={() => deleteInstitution(confirmDialog.id)}
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
        <h1 style={styles.title}>Institutions Management</h1>
        <motion.button
          onClick={openNewInstitutionModal}
          style={styles.addButton}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiPlus style={{ marginRight: '8px' }} />
          Add Institution
        </motion.button>
      </div>

      {institutions.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No institutions found. Create your first institution to get started.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Contact</th>
                <th style={styles.tableHeader}>Type</th>
                <th style={styles.tableHeader}>Address</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Visibility</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map((institution) => (
                <motion.tr 
                  key={institution._id}
                  style={styles.tableRow}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td style={styles.tableCell}>{institution.name }</td>
                  <td style={styles.tableCell}>{institution.email}</td>
                  <td style={styles.tableCell}>{institution.contactNumber}</td>
                  <td style={styles.tableCell}>
                    <span style={styles.typeBadge}>{institution.type}</span>
                  </td>
                  <td style={styles.tableCell}>{institution.address}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.statusBadge,
                      ...(institution.status === 'Active' ? styles.statusActive : styles.statusInactive)
                    }}>
                      {institution.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <motion.button 
                      onClick={() => toggleVisibility(institution)}
                      style={styles.visibilityButton}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {institution.visible ? (
                        <FiEye style={styles.visibleIcon} />
                      ) : (
                        <FiEyeOff style={styles.hiddenIcon} />
                      )}
                    </motion.button>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <motion.button
                        onClick={() => openEditInstitutionModal(institution)}
                        style={styles.editButton}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiEdit2 />
                      </motion.button>
                      <motion.button
                        onClick={() => showConfirmDialog(institution._id)}
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
                  {currentInstitution ? 'Edit Institution' : 'Add New Institution'}
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
                    <label style={styles.formLabel}>Institution Name</label>
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
                    <label style={styles.formLabel}>Institution Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      style={{
                        ...styles.formSelect,
                        ...(errors.type && styles.formInputError)
                      }}
                    >
                      <option value="">Select Institution Type</option>
                      {institutionTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.type && <p style={styles.errorText}>{errors.type}</p>}
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

                < div style={styles.formGroup}>
                  <label style={styles.formLabel}>Address</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    style={{
                      ...styles.formInput,
                      ...(errors.address && styles.formInputError)
                    }}
                  />
                  {errors.address && <p style={styles.errorText}>{errors.address}</p>}
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
                  ) : currentInstitution ? (
                    'Update Institution'
                  ) : (
                    'Add Institution'
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
  statusInactive: {
    backgroundColor: '#F EE2E2',
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

export default Institutions;