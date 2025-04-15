import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiBriefcase, FiSearch, FiMail, FiCheckCircle, FiAward, FiGlobe, FiShield, FiTrendingUp } from 'react-icons/fi';

const AboutUs = () => {
  const colors = {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC05',
    gray: '#9AA0A6',
    darkGray: '#3C4043',
    lightGray: '#F1F3F4',
    white: '#FFFFFF',
  };

  const stats = [
    { value: '500+', label: 'Consultant Firms', icon: <FiBriefcase style={{ color: colors.blue }} /> },
    { value: '300+', label: 'Contractors', icon: <FiUsers style={{ color: colors.red }} /> },
    { value: '200+', label: 'Suppliers', icon: <FiCheckCircle style={{ color: colors.yellow }} /> },
    { value: '500+', label: 'Projects', icon: <FiAward style={{ color: colors.blue }} /> }
  ];

  const features = [
    {
      icon: <FiShield style={{ color: colors.blue }} />,
      title: 'Verified Professionals',
      description: 'All listed consultants and contractors undergo strict verification for quality assurance.'
    },
    {
      icon: <FiGlobe style={{ color: colors.red }} />,
      title: 'Comprehensive Network',
      description: 'Connect with all MEP industry stakeholders from a single platform.'
    },
    {
      icon: <FiTrendingUp style={{ color: colors.yellow }} />,
      title: 'Opportunity Discovery',
      description: 'Find projects, job vacancies, and business opportunities tailored to your expertise.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        backgroundColor: colors.lightGray,
        padding: '120px 20px 60px',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: colors.darkGray,
              marginBottom: '16px',
              lineHeight: '1.2',
            }}
          >
            Connecting MEP Professionals in Sri Lanka
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: '18px',
              color: colors.gray,
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            The premier platform for Mechanical, Electrical, and Plumbing professionals to connect, collaborate, and grow their businesses.
          </motion.p>
        </div>

        {/* Mission Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '60px',
        }}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              backgroundColor: 'rgba(66, 133, 244, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <FiSearch style={{ fontSize: '24px', color: colors.blue }} />
            </div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: colors.darkGray,
              marginBottom: '16px',
            }}>
              Our Mission
            </h2>
            <p style={{
              color: colors.gray,
              lineHeight: '1.6',
              marginBottom: '20px',
            }}>
              To revolutionize how MEP professionals connect by providing a centralized platform that bridges the gap between consultants, contractors, and suppliers in Sri Lanka's construction industry.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              backgroundColor: 'rgba(234, 67, 53, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <FiMail style={{ fontSize: '24px', color: colors.red }} />
            </div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: colors.darkGray,
              marginBottom: '16px',
            }}>
              What We Offer
            </h2>
            <p style={{
              color: colors.gray,
              lineHeight: '1.6',
              marginBottom: '20px',
            }}>
              A comprehensive network where professionals can discover opportunities, source materials, find talent, and showcase their expertise to the right audience.
            </p>
          </motion.div>
        </div>

        {/* Features Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: colors.darkGray,
            textAlign: 'center',
            marginBottom: '40px',
          }}>
            Why Choose MEP Hub
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                style={{
                  backgroundColor: colors.white,
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  borderTop: `4px solid ${index === 0 ? colors.blue : index === 1 ? colors.red : colors.yellow}`,
                }}
              >
                <div style={{
                  fontSize: '28px',
                  marginBottom: '16px',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: colors.darkGray,
                  marginBottom: '12px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: colors.gray,
                  lineHeight: '1.6',
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          backgroundColor: colors.white,
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          marginBottom: '60px',
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: colors.darkGray,
            textAlign: 'center',
            marginBottom: '40px',
          }}>
            Our Network in Numbers
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '30px',
            textAlign: 'center',
          }}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{
                  fontSize: '28px',
                  marginBottom: '12px',
                }}>
                  {stat.icon}
                </div>
                <p style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: colors.darkGray,
                  marginBottom: '8px',
                }}>
                  {stat.value}
                </p>
                <p style={{
                  color: colors.gray,
                }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.red} 100%)`,
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            color: colors.white,
            marginBottom: '60px',
          }}
        >
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            Ready to Join Our Network?
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '24px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6',
          }}>
            Whether you're a consultant, contractor, supplier, or professional, MEP Hub connects you with the right opportunities.
          </p>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: colors.white,
              color: colors.blue,
              fontWeight: 600,
              padding: '14px 32px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Get Started
          </motion.button> */}
        </motion.div>

        {/* Commitment Section */}
        <div style={{
          backgroundColor: colors.white,
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: colors.darkGray,
            textAlign: 'center',
            marginBottom: '24px',
          }}>
            Our Commitment to the MEP Industry
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.6',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 32px',
            fontSize: '18px',
          }}>
            We are dedicated to fostering growth in Sri Lanka's MEP sector by providing tools and connections that help professionals and businesses thrive in the construction industry.
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
          }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              style={{
                backgroundColor: colors.blue,
                color: colors.white,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              For Professionals
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              style={{
                backgroundColor: colors.red,
                color: colors.white,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              For Businesses
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              style={{
                backgroundColor: colors.yellow,
                color: colors.white,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              For Suppliers
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;