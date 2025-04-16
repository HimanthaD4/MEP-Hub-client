import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const colors = {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC05',
    gray: '#9AA0A6',
    darkGray: '#3C4043',
    lightGray: '#F1F3F4',
    white: '#FFFFFF',
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email && !formData.phone) {
      newErrors.contact = 'Email or phone is required';
    } else {
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (formData.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number';
      }
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form.', {
        position: 'top-center',
        style: {
          backgroundColor: colors.red,
          color: colors.white,
          borderRadius: '8px',
          fontFamily: "'Outfit', sans-serif",
        },
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/contact`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('We received your message! We will get back to you soon.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontFamily: "'Outfit', sans-serif",
        },
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(
        error.response?.data?.error || 'Failed to send message. Please try again.',
        {
          position: 'top-center',
          style: {
            backgroundColor: colors.red,
            color: colors.white,
            borderRadius: '8px',
            fontFamily: "'Outfit', sans-serif",
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: '100vh',
        backgroundColor: colors.lightGray,
        padding: '120px 20px 60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <motion.div initial={{ y: 20 }}
        animate={{ y: 0 }}
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: colors.white,
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
          marginTop: '-40px',
        }}
      >
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: colors.darkGray,
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: 500,
              color: colors.darkGray,
              marginBottom: '8px',
            }}>
              <FiUser style={{ marginRight: '8px', color: colors.blue }} />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: `1px solid ${errors.name ? colors.red : colors.gray}`,
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: "'Outfit', sans-serif",
              }}
              placeholder="Your name"
            />
            {errors.name && (
              <p style={{
                marginTop: '8px',
                fontSize: '12px',
                color: colors.red,
                fontFamily: "'Outfit', sans-serif",
              }}>{errors.name}</p>
            )}
          </div>

          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: 500,
              color: colors.darkGray,
              marginBottom: '8px',
            }}>
              <FiMail style={{ marginRight: '8px', color: colors.red }} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: `1px solid ${errors.email ? colors.red : colors.gray}`,
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: "'Outfit', sans-serif",
              }}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p style={{
                marginTop: '8px',
                fontSize: '12px',
                color: colors.red,
                fontFamily: "'Outfit', sans-serif",
              }}>{errors.email}</p>
            )}
          </div>

          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: 500,
              color: colors.darkGray,
              marginBottom: '8px',
            }}>
              <FiPhone style={{ marginRight: '8px', color: colors.yellow }} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: `1px solid ${errors.phone ? colors.red : colors.gray}`,
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: "'Outfit', sans-serif",
              }}
              placeholder="+94 76 123 4567"
            />
            {errors.phone && (
              <p style={{
                marginTop: '8px',
                fontSize: '12px',
                color: colors.red,
                fontFamily: "'Outfit', sans-serif",
              }}>{errors.phone}</p>
            )}
          </div>

          {errors.contact && (
            <div style={{
              backgroundColor: '#FFF8F8',
              padding: '12px',
              borderRadius: '8px',
              borderLeft: `4px solid ${colors.red}`,
              display: 'flex',
              alignItems: 'center',
              fontFamily: "'Outfit', sans-serif",
            }}>
              <div style={{ color: colors.red, marginRight: '8px' }}>!</div>
              <p style={{ fontSize: '14px', color: colors.red }}>{errors.contact}</p>
            </div>
          )}

          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: 500,
              color: colors.darkGray,
              marginBottom: '8px',
            }}>
              <FiMessageSquare style={{ marginRight: '8px', color: colors.blue }} />
              Your Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: `1px solid ${errors.message ? colors.red : colors.gray}`,
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s',
                resize: 'vertical',
                fontFamily: "'Outfit', sans-serif",
              }}
              placeholder="How can we help you?"
            />
            {errors.message && (
              <p style={{
                marginTop: '8px',
                fontSize: '12px',
                color: colors.red,
                fontFamily: "'Outfit', sans-serif",
              }}>{errors.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: colors.blue,
              color: 'white',
              fontWeight: 600,
              fontSize: '16px',
              border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginTop: '12px',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {isSubmitting ? (
              <>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `2px solid rgba(255,255,255,0.3)`,
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}></div>
                </div>
                <span style={{ opacity: 0 }}>Send Message</span>
              </>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </form>
      </motion.div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default ContactUs;