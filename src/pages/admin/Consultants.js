import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiX, FiAlertTriangle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Consultants = () => {
  const [consultants, setConsultants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentConsultant, setCurrentConsultant] = useState(null);
  const [expandedConsultantId, setExpandedConsultantId] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [showProjectsSection, setShowProjectsSection] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    companyEmail: '',
    companyWebsite: '',
    companyAddress: '',
    yearsOfExperience: '',
    specialties: [],
    projects: [],
    registrationMode: 'annual',
    registrationYears: '',
    paymentModeDetails: {
      paymentMode: 'online',
      paymentDate: format(new Date(), 'yyyy-MM-dd')
    },
    status: 'pending',
    visible: true,
    consultantType: '' // Added consultantType to formData
  });

  const [errors, setErrors] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const specialtyOptions = [
    'Air Conditioning systems (Central, Packaged, VRF & Splits)',
    'Mechanical ventilation systems',
    'Water supply & drainage systems',
    'Fire Protection systems',
    'Fire Detection systems',
    'Storm water & rain water harvesting systems',
    'Low Voltage Electrical Systems',
    'Extra low voltages systems - BMS, Data, CCTV, IPTV, AC',
    'Lighting systems',
    'Elevator & escalators',
    'Boilers & steam systems',
    'Swimming pools',
    'LPG distribution',
    'Solar electricity',
    'Compressed air systems',
    'Generators',
    'Structured cabling & IT network',
    'Waste water treatment',
    'Solid waste management',
    'Facade Engineering',
    'Cold rooms'
  ];

  const consultantTypeOptions = [
    'MEP',
    'Project Management',
    'Cost'
  ];

  useEffect(() => {
    fetchConsultants();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchConsultants = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/consultants`);
      setConsultants(response.data);
    } catch (error) {
      showNotification('Failed to load consultants', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects like paymentModeDetails
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

  const handleSpecialtyChange = (specialty) => {
    setFormData(prev => {
      const newSpecialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty];
      
      return {
        ...prev,
        specialties: newSpecialties
      };
    });
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [name]: name === 'completedYear' ? parseInt(value) : value
    };
    
    setFormData(prev => ({
      ...prev,
      projects: updatedProjects
    }));
  };

  const addNewProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: '',
          completedYear: new Date().getFullYear()
        }
      ]
    }));
    setShowProjectsSection(true);
  };

  const removeProject = (index) => {
    const updatedProjects = [...formData.projects];
    updatedProjects.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      projects: updatedProjects
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.companyEmail.trim()) newErrors.companyEmail = 'Company email is required';
    if (!formData.companyAddress.trim()) newErrors.companyAddress = 'Company address is required';
    if (!formData.yearsOfExperience || isNaN(formData.yearsOfExperience)) 
      newErrors.yearsOfExperience = 'Valid years of experience is required';
    if (formData.specialties.length === 0) newErrors.specialties = 'At least one specialty is required';
    if (formData.registrationMode === 'multi-year' && (!formData.registrationYears || isNaN(formData.registrationYears)))
      newErrors.registrationYears = 'Valid registration years is required';
    if (!formData.consultantType) newErrors.consultantType = 'Consultant type is required'; // Validate consultantType
    
    // Validate projects
    formData.projects.forEach((project, index) => {
      if (!project.name.trim()) {
        newErrors[`projects[${index}].name`] = 'Project name is required';
      }
      if (!project.completedYear || isNaN(project.completedYear)) {
        newErrors[`projects[${index}].completedYear`] = 'Valid completion year is required';
      }
    });

    // Validate payment details
    if (!formData.paymentModeDetails.paymentMode) {
      newErrors['paymentModeDetails.paymentMode'] = 'Payment mode is required';
    }
    if (!formData.paymentModeDetails.paymentDate) {
      newErrors['paymentModeDetails.paymentDate'] = 'Payment date is required';
    }

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
        yearsOfExperience: Number(formData.yearsOfExperience),
        registrationYears: formData.registrationMode === 'multi-year' 
          ? Number(formData.registrationYears) 
          : undefined,
        projects: formData.projects.map(project => ({
          ...project,
          completedYear: Number(project.completedYear)
        }))
      };

      const response = currentConsultant
        ? await axios.put(`${API_BASE_URL}/consultants/${currentConsultant._id}`, dataToSend)
        : await axios.post(`${API_BASE_URL}/consultants`, dataToSend);

      showNotification(
        currentConsultant ? 'Consultant updated successfully' : 'Consultant added successfully',
        'success'
      );

      setIsModalOpen(false);
      resetForm();
      await fetchConsultants();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to save consultant', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contactNumber: '',
      companyEmail: '',
      companyWebsite: '',
      companyAddress: '',
      yearsOfExperience: '',
      specialties: [],
      projects: [],
      registrationMode: 'annual',
      registrationYears: '',
      paymentModeDetails: {
        paymentMode: 'online',
        paymentDate: format(new Date(), 'yyyy-MM-dd')
      },
      status: 'pending',
      visible: true,
      consultantType: '' // Reset consultantType
    });
    setCurrentConsultant(null);
    setShowProjectsSection(false);
    setShowPaymentSection(false);
  };

  const openNewConsultantModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditConsultantModal = (consultant) => {
    setCurrentConsultant(consultant);
    setFormData({
      name: consultant.name,
      contactNumber: consultant.contactNumber,
      companyEmail: consultant.companyEmail,
      companyWebsite: consultant.companyWebsite || '',
      companyAddress: consultant.companyAddress,
      yearsOfExperience: consultant.yearsOfExperience.toString(),
      specialties: consultant.specialties,
      projects: consultant.projects || [],
      registrationMode: consultant.registrationMode,
      registrationYears: consultant.registrationYears?.toString() || '',
      paymentModeDetails: consultant.paymentModeDetails || {
        paymentMode: 'online',
        paymentDate: format(new Date(), 'yyyy-MM-dd')
      },
      status: consultant.status,
      visible: consultant.visible,
      consultantType: consultant.consultantType || '' // Set consultantType for editing
    });
    setIsModalOpen(true);
    if (consultant.projects?.length > 0) setShowProjectsSection(true);
  };

  const deleteConsultant = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/consultants/${id}`);
      showNotification('Consultant deleted successfully', 'success');
      setConsultants(consultants.filter(consultant => consultant._id !== id));
      setConfirmDialog(null);
    } catch (error) {
      showNotification('Failed to delete consultant', 'error');
      setConfirmDialog(null);
    }
  };

  const toggleVisibility = async (consultant) => {
    try {
      await axios.put(`${API_BASE_URL}/consultants/${consultant._id}`, {
        ...consultant,
        visible: !consultant.visible
      });
      showNotification(
        `Consultant is now ${!consultant.visible ? 'visible' : 'hidden'}`,
        'success'
      );
      fetchConsultants();
    } catch {
      showNotification('Failed to update visibility', 'error');
    }
  };

  const toggleDescription = (consultantId) => {
    setExpandedConsultantId(expandedConsultantId === consultantId ? null : consultantId);
  };

  const toggleProjectsSection = () => {
    setShowProjectsSection(!showProjectsSection);
  };

  const togglePaymentSection = () => {
    setShowPaymentSection(!showPaymentSection);
  };

  const showNotification = (message, type) => {
    setToast({ message, type, id: Date.now() });
  };

  const showConfirmDialog = (consultantId) => {
    setConfirmDialog({
      id: consultantId,
      message: 'Are you sure you want to delete this consultant? This action cannot be undone.',
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
                  onClick={() => deleteConsultant(confirmDialog.id)}
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
        <h1 style={styles.title}>Consultants Management</h1>
        <motion.button
          onClick={openNewConsultantModal}
          style={styles.addButton}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiPlus style={{ marginRight: '8px' }} />
          Add Consultant
        </motion.button>
      </div>

      {consultants.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No consultants found. Create your first consultant to get started.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Contact</th>
                <th style={styles.tableHeader}>Specialties</th>
                <th style={styles.tableHeader}>Experience</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Visibility</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {consultants.map((consultant) => (
                <motion.tr 
                  key={consultant._id}
                  style={styles.tableRow}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td style={styles.tableCell}>
                    <div style={styles.consultantName}>{consultant.name || 'N/A'}</div>
                    <div style={styles.consultantEmail}>{consultant.companyEmail || 'N/A'}</div>
                  </td>
                  <td style={styles.tableCell}>{consultant.contactNumber || 'N/A'}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.specialtiesContainer}>
                      {consultant.specialties.slice(0, 2).map(specialty => (
                        <span key={specialty} style={styles.specialtyBadge}>
                          {specialty.split(' ')[0]}...
                        </span>
                      ))}
                      {consultant.specialties.length > 2 && (
                        <span style={styles.moreSpecialties}>
                          +{consultant.specialties.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    {consultant.yearsOfExperience || 'N/A'} years
                  </td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.statusBadge,
                      ...(consultant.status === 'active' ? styles.statusActive : 
                           consultant.status === 'suspended' ? styles.statusSuspended : 
                           styles.statusPending)
                    }}>
                      {consultant.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <motion.button 
                      onClick={() => toggleVisibility(consultant)}
                      style={styles.visibilityButton}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {consultant.visible ? (
                        <FiEye style={styles.visibleIcon} />
                      ) : (
                        <FiEyeOff style={styles.hiddenIcon} />
                      )}
                    </motion.button>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <motion.button
                        onClick={() => openEditConsultantModal(consultant)}
                        style={styles.editButton}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiEdit2 />
                      </motion.button>
                      <motion.button
                        onClick={() => showConfirmDialog(consultant._id)}
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

      {/* Consultant Modal */}
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
                  {currentConsultant ? 'Edit Consultant' : 'Add New Consultant'}
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
                    <label style={styles.formLabel}>Company Email</label>
                    <input
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        ...(errors.companyEmail && styles.formInputError)
                      }}
                    />
                    {errors.companyEmail && <p style={styles.errorText}>{errors.companyEmail}</p>}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Company Website</label>
                    <input
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      style={styles.formInput}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Company Address</label>
                  <textarea
                    name="companyAddress"
                    rows="3"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    style={{
                      ...styles.formTextarea,
                      ...(errors.companyAddress && styles.formInputError)
                    }}
                  />
                  {errors.companyAddress && <p style={styles.errorText}>{errors.companyAddress}</p>}
                </div>

                <div style={styles.formGrid}>
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
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Consultant Type</label>
                  <select
                    name="consultantType"
                    value={formData.consultantType}
                    onChange={handleChange}
                    style={{
                      ...styles.formSelect,
                      ...(errors.consultantType && styles.formInputError)
                    }}
                  >
                    <option value="">Select Consultant Type</option>
                    {consultantTypeOptions.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.consultantType && <p style={styles.errorText}>{errors.consultantType}</p>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Specialties</label>
                  {errors.specialties && <p style={styles.errorText}>{errors.specialties}</p>}
                  <div style={styles.specialtiesGrid}>
                    {specialtyOptions.map((specialty) => (
                      <div key={specialty} style={styles.specialtyOption}>
                        <input
                          type="checkbox"
                          id={`specialty-${specialty}`}
                          checked={formData.specialties.includes(specialty)}
                          onChange={() => handleSpecialtyChange(specialty)}
                          style={styles.checkboxInput}
                        />
                        <label htmlFor={`specialty-${specialty}`} style={styles.specialtyLabel}>
                          {specialty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Mode Section */}
                <div style={styles.sectionHeader} onClick={togglePaymentSection}>
                  <h3 style={styles.sectionTitle}>Payment Details</h3>
                  {showPaymentSection ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {showPaymentSection && (
                  <div style={styles.sectionContent}>
                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Payment Mode</label>
                        <select
                          name="paymentModeDetails.paymentMode"
                          value={formData.paymentModeDetails.paymentMode}
                          onChange={handleChange}
                          style={styles.formSelect}
                        >
                          <option value="online">Online</option>
                          <option value="cheque">Cheque</option>
                          <option value="cash">Cash</option>
                        </select>
                        {errors['paymentModeDetails.paymentMode'] && (
                          <p style={styles.errorText}>{errors['paymentModeDetails.paymentMode']}</p>
                        )}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Payment Date</label>
                        <input
                          type="date"
                          name="paymentModeDetails.paymentDate"
                          value={formData.paymentModeDetails.paymentDate}
                          onChange={handleChange}
                          style={{
                            ...styles.formInput,
                            ...(errors['paymentModeDetails.paymentDate'] && styles.formInputError)
                          }}
                        />
                        {errors['paymentModeDetails.paymentDate'] && (
                          <p style={styles.errorText}>{errors['paymentModeDetails.paymentDate']}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Projects Section */}
                <div style={styles.sectionHeader} onClick={toggleProjectsSection}>
                  <h3 style={styles.sectionTitle}>Projects ({formData.projects.length})</h3>
                  {showProjectsSection ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {showProjectsSection && (
                  <div style={styles.sectionContent}>
                    {formData.projects.map((project, index) => (
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
                                ...(errors[`projects[${index}].name`] && styles.formInputError)
                              }}
                            />
                            {errors[`projects[${index}].name`] && (
                              <p style={styles.errorText}>{errors[`projects[${index}].name`]}</p>
                            )}
                          </div>

                          <div style={styles.formGroup}>
                            <label style={styles.formLabel}>Completion Year</label>
                            <input
                              type="number"
                              name="completedYear"
                              value={project.completedYear}
                              onChange={(e) => handleProjectChange(index, e)}
                              min="1900"
                              max={new Date().getFullYear()}
                              style={{
                                ...styles.formInput,
                                ...(errors[`projects[${index}].completedYear`] && styles.formInputError)
                              }}
                            />
                            {errors[`projects[${index}].completedYear`] && (
                              <p style={styles.errorText}>{errors[`projects[${index}].completedYear`]}</p>
                            )}
                          </div>
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
                )}

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Registration Mode</label>
                    <select
                      name="registrationMode"
                      value={formData.registrationMode}
                      onChange={handleChange}
                      style={styles.formSelect}
                    >
                      <option value="annual">Annual</option>
                      <option value="multi-year">Multi-year</option>
                    </select>
                  </div>

                  {formData.registrationMode === 'multi-year' && (
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Registration Years</label>
                      <input
                        type="number"
                        name="registrationYears"
                        value={formData.registrationYears}
                        onChange={handleChange}
                        min="2"
                        max="5"
                        style={{
                          ...styles.formInput,
                          ...(errors.registrationYears && styles.formInputError)
                        }}
                      />
                      {errors.registrationYears && <p style={styles.errorText}>{errors.registrationYears}</p>}
                    </div>
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
                  ) : currentConsultant ? (
                    'Update Consultant'
                  ) : (
                    'Add Consultant'
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

// Updated styles with new additions
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
  consultantName: {
    fontWeight: 500,
    marginBottom: '4px'
  },
  consultantEmail: {
    fontSize: '13px',
    color: '#6B7280'
  },
  specialtiesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  specialtyBadge: {
    backgroundColor: '#EFF6FF',
    color: '#1E40AF',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 500
  },
  moreSpecialties: {
    color: '#6B7280',
    fontSize: '12px',
    alignSelf: 'center'
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
  statusSuspended: {
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
  specialtiesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    maxHeight: '200px',
    overflowY: 'auto',
    padding: '8px',
    border: '1px solid #E5E7EB',
    borderRadius: '6px'
  },
  specialtyOption: {
    display: 'flex',
    alignItems: 'center'
  },
  specialtyLabel: {
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
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #E5E7EB',
    margin: '20px 0 10px',
    cursor: 'pointer'
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

export default Consultants;