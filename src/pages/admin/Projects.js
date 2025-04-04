import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiX, FiAlertTriangle } from 'react-icons/fi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: '',
    status: 'pending',
    visible: true,
    contractor: ''
  });

  const [errors, setErrors] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(response.data);
    } catch (error) {
      showNotification('Failed to load projects', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.amount || isNaN(formData.amount)) newErrors.amount = 'Valid amount is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!formData.contractor.trim()) newErrors.contractor = 'Contractor is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return showNotification('Please fix the form errors', 'error');

    setIsLoading(true);

    try {
      const response = currentProject
        ? await axios.put(`${API_BASE_URL}/projects/${currentProject._id}`, formData)
        : await axios.post(`${API_BASE_URL}/projects`, formData);

      showNotification(
        currentProject ? 'Project updated successfully' : 'Project added successfully',
        'success'
      );

      setIsModalOpen(false);
      resetForm();
      await fetchProjects();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to save project', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      amount: '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: '',
      status: 'pending',
      visible: true,
      contractor: ''
    });
    setCurrentProject(null);
  };

  const openNewProjectModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditProjectModal = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      amount: project.amount,
      startDate: format(new Date(project.startDate), 'yyyy-MM-dd'),
      endDate: project.endDate ? format(new Date(project.endDate), 'yyyy-MM-dd') : '',
      status: project.status,
      visible: project.visible,
      contractor: project.contractor
    });
    setIsModalOpen(true);
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/projects/${id}`);
      showNotification('Project deleted successfully', 'success');
      setProjects(projects.filter(project => project._id !== id));
      setConfirmDialog(null);
    } catch (error) {
      showNotification('Failed to delete project', 'error');
      setConfirmDialog(null);
    }
  };

  const toggleVisibility = async (project) => {
    try {
      await axios.put(`${API_BASE_URL}/projects/${project._id}`, {
        ...project,
        visible: !project.visible
      });
      showNotification(
        `Project is now ${!project.visible ? 'visible' : 'hidden'}`,
        'success'
      );
      fetchProjects();
    } catch {
      showNotification('Failed to update visibility', 'error');
    }
  };

  const toggleDescription = (projectId) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  const showNotification = (message, type) => {
    setToast({ message, type, id: Date.now() });
  };

  const showConfirmDialog = (projectId) => {
    setConfirmDialog({
      id: projectId,
      message: 'Are you sure you want to delete this project? This action cannot be undone.',
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
                  onClick={() => deleteProject(confirmDialog.id)}
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
        <h1 style={styles.title}>Projects Management</h1>
        <motion.button
          onClick={openNewProjectModal}
          style={styles.addButton}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiPlus style={{ marginRight: '8px' }} />
          Add Project
        </motion.button>
      </div>

      {projects.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No projects found. Create your first project to get started.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Title</th>
                <th style={styles.tableHeader}>Contractor</th>
                <th style={styles.tableHeader}>Amount</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Dates</th>
                <th style={styles.tableHeader}>Visibility</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <motion.tr 
                  key={project._id}
                  style={styles.tableRow}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td style={styles.tableCell}>
                    <div style={styles.projectTitle}>{project.title}</div>
                    <div style={styles.projectDescription}>
                      {expandedProjectId === project._id
                        ? project.description
                        : `${project.description.slice(0, 50)}...`}
                      {project.description.length > 50 && (
                        <button
                          onClick={() => toggleDescription(project._id)}
                          style={styles.viewMoreButton}
                        >
                          {expandedProjectId === project._id ? 'Show Less' : 'View More'}
                        </button>
                      )}
                    </div>
                  </td>
                  <td style={styles.tableCell}>{project.contractor}</td>
                  <td style={styles.tableCell}>${Number(project.amount).toLocaleString()}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.statusBadge,
                      ...(project.status === 'completed' ? styles.statusCompleted : 
                           project.status === 'active' ? styles.statusActive : 
                           styles.statusPending)
                    }}>
                      {project.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.dateText}>
                      Start: {format(new Date(project.startDate), 'MMM d, yyyy')}
                    </div>
                    {project.endDate && (
                      <div style={styles.dateText}>
                        End: {format(new Date(project.endDate), 'MMM d, yyyy')}
                      </div>
                    )}
                  </td>
                  <td style={styles.tableCell}>
                    <motion.button 
                      onClick={() => toggleVisibility(project)}
                      style={styles.visibilityButton}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {project.visible ? (
                        <FiEye style={styles.visibleIcon} />
                      ) : (
                        <FiEyeOff style={styles.hiddenIcon} />
                      )}
                    </motion.button>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <motion.button
                        onClick={() => openEditProjectModal(project)}
                        style={styles.editButton}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiEdit2 />
                      </motion.button>
                      <motion.button
                        onClick={() => showConfirmDialog(project._id)}
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

      {/* Project Modal */}
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
                  {currentProject ? 'Edit Project' : 'Add New Project'}
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
                    <label style={styles.formLabel}>Title</label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.title && styles.formInputError)
                      }}
                    />
                    {errors.title && <p style={styles.errorText}>{errors.title}</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Amount ($)</label>
                    <input
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.amount && styles.formInputError)
                      }}
                    />
                    {errors.amount && <p style={styles.errorText}>{errors.amount}</p>}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    style={{
                      ...styles.formTextarea,
                      ...(errors.description && styles.formInputError)
                    }}
                  />
                  {errors.description && <p style={styles.errorText}>{errors.description}</p>}
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.startDate && styles.formInputError)
                      }}
                    />
                    {errors.startDate && <p style={styles.errorText}>{errors.startDate}</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.endDate && styles.formInputError)
                      }}
                    />
                    {errors.endDate && <p style={styles.errorText}>{errors.endDate}</p>}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Contractor</label>
                  <input
                    name="contractor"
                    value={formData.contractor}
                    onChange={handleChange}
                    style={{
                      ...styles.formInput,
                      ...(errors.contractor && styles.formInputError)
                    }}
                  />
                  {errors.contractor && <p style={styles.errorText}>{errors.contractor}</p>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    style={styles.formSelect}
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
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
                  ) : currentProject ? (
                    'Update Project'
                  ) : (
                    'Add Project'
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
  projectTitle: {
    fontWeight: 500,
    marginBottom: '4px'
  },
  projectDescription: {
    fontSize: '13px',
    color: '#6B7280'
  },
  viewMoreButton: {
    color: '#3B82F6',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    marginLeft: '4px'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 500
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
    color: '#92400E'
  },
  statusActive: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF'
  },
  statusCompleted: {
    backgroundColor: '#D1FAE5',
    color: '#065F46'
  },
  dateText: {
    fontSize: '13px',
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
    maxWidth: '600px',
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
  formTextarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '80px',
    '&:focus': {
      outline: 'none',
      borderColor: '#3B82F6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
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

export default Projects;