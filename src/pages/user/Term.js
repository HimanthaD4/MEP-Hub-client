import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiAlertCircle, FiUserCheck, FiCreditCard, FiTerminal, FiBookmark } from 'react-icons/fi';

const TermsOfService = () => {
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
            backgroundColor: 'rgba(234, 67, 53, 0.1)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}>
            <FiFileText style={{ fontSize: '36px', color: colors.red }} />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: colors.darkGray,
            marginBottom: '16px',
          }}>
            Terms of Service
          </h1>
          <p style={{
            color: colors.gray,
            fontSize: '16px',
            lineHeight: '1.6',
          }}>
            Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
            <FiUserCheck style={{ color: colors.blue }} />
            1. Acceptance of Terms
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            By accessing or using MEP Hub ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not use our services.
          </p>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
          }}>
            These terms apply to all visitors, users, and others who access the Platform.
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
            <FiAlertCircle style={{ color: colors.red }} />
            2. User Responsibilities
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            As a user of MEP Hub, you agree to:
          </p>
          <ul style={{
            color: colors.gray,
            lineHeight: '1.8',
            paddingLeft: '20px',
            marginBottom: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>Provide accurate and complete registration information</li>
            <li style={{ marginBottom: '8px' }}>Maintain the confidentiality of your account credentials</li>
            <li style={{ marginBottom: '8px' }}>Use the Platform only for lawful purposes in the MEP industry</li>
            <li style={{ marginBottom: '8px' }}>Not engage in fraudulent, misleading, or deceptive activities</li>
            <li>Not violate any applicable laws or regulations</li>
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
            <FiCreditCard style={{ color: colors.yellow }} />
            3. Payments & Subscriptions
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            Certain features of MEP Hub may require payment:
          </p>
          <ul style={{
            color: colors.gray,
            lineHeight: '1.8',
            paddingLeft: '20px',
            marginBottom: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>You agree to pay all fees for services you purchase</li>
            <li style={{ marginBottom: '8px' }}>Fees are non-refundable except as required by law</li>
            <li style={{ marginBottom: '8px' }}>We may change fees with 30 days notice</li>
            <li>Automatic renewal of subscriptions unless canceled</li>
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
            <FiTerminal style={{ color: colors.blue }} />
            4. Intellectual Property
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            The Platform and its original content, features, and functionality are owned by MEP Hub and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
          }}>
            You may not modify, reproduce, distribute, or create derivative works without our express permission.
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
            <FiAlertCircle style={{ color: colors.red }} />
            5. Prohibited Conduct
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul style={{
            color: colors.gray,
            lineHeight: '1.8',
            paddingLeft: '20px',
            marginBottom: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>Impersonating any person or entity</li>
            <li style={{ marginBottom: '8px' }}>Posting false or misleading professional information</li>
            <li style={{ marginBottom: '8px' }}>Harassing, threatening, or intimidating other users</li>
            <li style={{ marginBottom: '8px' }}>Uploading viruses or malicious code</li>
            <li>Violating any professional licensing requirements</li>
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
            <FiBookmark style={{ color: colors.yellow }} />
            6. Termination
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            We may terminate or suspend your account immediately, without prior notice, for any reason including:
          </p>
          <ul style={{
            color: colors.gray,
            lineHeight: '1.8',
            paddingLeft: '20px',
            marginBottom: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>Breach of these Terms</li>
            <li style={{ marginBottom: '8px' }}>Fraudulent or illegal activity</li>
            <li style={{ marginBottom: '8px' }}>Providing false professional credentials</li>
            <li>Harmful conduct toward other users</li>
          </ul>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
          }}>
            Upon termination, your right to use the Platform will immediately cease.
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
            <FiFileText style={{ color: colors.blue }} />
            7. Limitation of Liability
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            MEP Hub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
          </p>
          <ul style={{
            color: colors.gray,
            lineHeight: '1.8',
            paddingLeft: '20px',
            marginBottom: '20px',
          }}>
            <li style={{ marginBottom: '8px' }}>Your use or inability to use the service</li>
            <li style={{ marginBottom: '8px' }}>Any conduct or content of third parties</li>
            <li style={{ marginBottom: '8px' }}>Unauthorized access to or alteration of your data</li>
            <li>Any other matter relating to the service</li>
          </ul>
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
            <FiFileText style={{ color: colors.red }} />
            8. Changes to Terms
          </h2>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
            marginBottom: '16px',
          }}>
            We reserve the right to modify these terms at any time. We will provide notice of significant changes through our Platform or via email.
          </p>
          <p style={{
            color: colors.gray,
            lineHeight: '1.8',
          }}>
            Your continued use of the Platform after changes constitutes acceptance of the new terms.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;