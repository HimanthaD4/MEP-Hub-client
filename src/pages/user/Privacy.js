import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiDatabase, FiUser, FiMail, FiGlobe } from 'react-icons/fi';

const PrivacyPolicy = () => {
  const colors = {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC05',
    gray: '#9AA0A6',
    darkGray: '#3C4043',
    lightGray: '#F1F3F4',
    white: '#FFFFFF',
  };

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
        marginTop: '-40px',
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: colors.white,
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'rgba(66, 133, 244, 0.1)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}>
            <FiShield style={{ fontSize: '36px', color: colors.blue }} />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: colors.darkGray,
            marginBottom: '16px',
          }}>
            Privacy Policy
          </h1>
          <p style={{
            color: colors.gray,
            fontSize: '16px',
            lineHeight: '1.6',
          }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: colors.darkGray,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <FiUser style={{ color: colors.blue }} />
            1. Information We Collect
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            We collect information to provide better services to our users in the MEP industry:
          </p>
          <ul style={{
            color: colors.gray,
            lineHeight: '1.8',
            paddingLeft: '20px',
            marginBottom: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Personal Information:</strong> Name, email, phone number when you register or contact us
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Professional Information:</strong> Company details, qualifications, licenses for verification
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Usage Data:</strong> How you interact with our platform and services
            </li>
            <li>
              <strong>Technical Information:</strong> IP address, browser type, device information
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: colors.darkGray,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <FiDatabase style={{ color: colors.red }} />
            2. How We Use Your Information
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            We use the information we collect to:
          </p>
          <ul style={{
            color: colors.gray,
            lineHeight: '1.8',
            paddingLeft: '20px',
            marginBottom: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>Provide and maintain our services</li>
            <li style={{ marginBottom: '8px' }}>Verify professional credentials</li>
            <li style={{ marginBottom: '8px' }}>Connect professionals within the MEP industry</li>
            <li style={{ marginBottom: '8px' }}>Improve and personalize user experience</li>
            <li style={{ marginBottom: '8px' }}>Communicate with users about services and updates</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: colors.darkGray,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <FiLock style={{ color: colors.yellow }} />
            3. Data Protection & Security
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            We implement appropriate technical and organizational measures to protect your personal data:
          </p>
          <ul style={{
            color: colors.gray,
            lineHeight: '1.8',
            paddingLeft: '20px',
            marginBottom: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>Encryption of sensitive data in transit and at rest</li>
            <li style={{ marginBottom: '8px' }}>Regular security audits and vulnerability testing</li>
            <li style={{ marginBottom: '8px' }}>Access controls and authentication protocols</li>
            <li>Employee training on data protection</li>
          </ul>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: colors.darkGray,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <FiGlobe style={{ color: colors.blue }} />
            4. Data Sharing & Disclosure
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            We may share information in these circumstances:
          </p>
          <ul style={{
            color: colors.gray,
            lineHeight: '1.8',
            paddingLeft: '20px',
            marginBottom: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>With Your Consent:</strong> When you choose to connect with other professionals
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>For Legal Reasons:</strong> To comply with laws or respond to legal requests
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Service Providers:</strong> Trusted partners who assist in operating our platform
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with any merger or acquisition
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: colors.darkGray,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <FiMail style={{ color: colors.red }} />
            5. Your Rights & Choices
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            You have certain rights regarding your personal information:
          </p>
          <ul style={{
            color: colors.gray,
            lineHeight: '1.8',
            paddingLeft: '20px',
            marginBottom: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>Access and receive a copy of your data</li>
            <li style={{ marginBottom: '8px' }}>Request correction of inaccurate information</li>
            <li style={{ marginBottom: '8px' }}>Request deletion of your personal data</li>
            <li style={{ marginBottom: '8px' }}>Object to processing of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
          }}>
            To exercise these rights, please contact us at privacy@mephub.lk
          </p>
        </div>

        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: colors.darkGray,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <FiShield style={{ color: colors.yellow }} />
            6. Changes to This Policy
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
          }}>
            Your continued use of our services after any modification means you accept the updated policy.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;