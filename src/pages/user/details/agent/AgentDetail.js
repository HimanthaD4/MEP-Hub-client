import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
  FiPhone, 
  FiMail, 
  FiGlobe, 
  FiMapPin, 
  FiBriefcase, 
  FiUser,
  FiEdit2,
  FiAward
} from 'react-icons/fi';

const AgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/agents/${id}`);
        setAgent(res.data);
      } catch (err) {
        console.error('Error fetching agent details:', err);
        setError(err.response?.status === 404 
          ? 'Agent not found.' 
          : 'Failed to load agent details.');
      } finally {
        setLoading(false);
      }
    };
    fetchAgent();
  }, [id]);

  const getRoleName = (role) => {
    switch (role) {
      case 'agent': return 'Agent';
      case 'supplier': return 'Supplier';
      case 'dealer': return 'Dealer';
      default: return role;
    }
  };

  if (loading) {
    return (
      <div className="agent-detail-container">
        <div className="skeleton-loader">
          <div className="skeleton-header"></div>
          <div className="skeleton-content">
            <div className="skeleton-sidebar"></div>
            <div className="skeleton-main">
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="agent-detail-container">
        <div className="error-state">
          <div className="error-icon">!</div>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-detail-container">
      <div className="agent-profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-container">
            <div className="avatar">
              <FiUser size={28} />
            </div>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{agent.name}</h1>
            <div className="profile-meta">
              <span className="role-badge">{getRoleName(agent.role)}</span>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Contact Information Section */}
          <div className="contact-section">
            <h2 className="section-title">
              <span className="title-decoration"></span>
              Contact Information
            </h2>
            
            <div className="contact-grid">
              <div className="contact-item">
                <div className="contact-icon-container">
                  <FiPhone className="contact-icon" />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">{agent.contactNumber || 'Not provided'}</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-container">
                  <FiMail className="contact-icon" />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">{agent.companyEmail || 'Not provided'}</span>
                </div>
              </div>

              {agent.companyWebsite && (
                <div className="contact-item">
                  <div className="contact-icon-container">
                    <FiGlobe className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Website</span>
                    <a 
                      href={agent.companyWebsite.startsWith('http') ? agent.companyWebsite : `https://${agent.companyWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-value website-link"
                    >
                      {agent.companyWebsite}
                    </a>
                  </div>
                </div>
              )}

              <div className="contact-item">
                <div className="contact-icon-container">
                  <FiMapPin className="contact-icon" />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">{agent.location || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Details Section */}
          <div className="details-section">
            <h2 className="section-title">
              <span className="title-decoration"></span>
              Professional Details
            </h2>

            <div className="details-grid">
              {/* Role Highlight Card */}
              <div className="detail-card highlight">
                <div className="card-icon">
                  <FiAward size={20} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">Role</h3>
                  <p className="card-value">{getRoleName(agent.role)}</p>
                </div>
              </div>

              {/* Equipment Types */}
              <div className="detail-card">
                <div className="card-icon">
                  <FiBriefcase size={20} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">Equipment Types</h3>
                  <div className="tags-container">
                    {agent.equipmentType.map((type, index) => (
                      <span key={index} className="tag">{type}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              {agent.description && (
                <div className="detail-card">
                  <div className="card-icon">
                    <FiEdit2 size={20} />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">Description</h3>
                    <p className="card-description">{agent.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        :root {
          --primary: #1a56db;
          --primary-light: #e8f0fe;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-tertiary: #6b7280;
          --border-light: #e5e7eb;
          --border-medium: #d1d5db;
          --bg-light: #f9fafb;
          --bg-white: #ffffff;
          --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
          --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
          --radius-sm: 0.375rem;
          --radius-md: 0.5rem;
          --radius-lg: 0.75rem;
          --space-xs: 0.5rem;
          --space-sm: 0.75rem;
          --space-md: 1rem;
          --space-lg: 1.5rem;
          --space-xl: 2rem;
          --space-2xl: 3rem;
        }

        /* Base Container */
        .agent-detail-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-xl);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: var(--text-primary);
        }

        /* Profile Card */
        .agent-profile-card {
          background-color: var(--bg-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          border: 1px solid var(--border-light);
        }

        /* Profile Header */
        .profile-header {
          display: flex;
          align-items: center;
          padding: var(--space-xl);
          border-bottom: 1px solid var(--border-light);
          background-color: var(--bg-light);
        }

        .avatar-container {
          margin-right: var(--space-lg);
        }

        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .profile-info {
          flex: 1;
        }

        .profile-name {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 0 0 var(--space-xs) 0;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .profile-meta {
          display: flex;
          align-items: center;
        }

        .role-badge {
          display: inline-block;
          padding: var(--space-xs) var(--space-sm);
          background-color: var(--primary);
          color: white;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        /* Profile Content Layout */
        .profile-content {
          display: grid;
          grid-template-columns: 1fr;
        }

        @media (min-width: 992px) {
          .profile-content {
            grid-template-columns: 350px 1fr;
          }
        }

        /* Contact Section */
        .contact-section {
          padding: var(--space-xl);
          border-right: 1px solid var(--border-light);
        }

        .section-title {
          position: relative;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 var(--space-lg) 0;
          padding-bottom: var(--space-sm);
          color: var(--text-primary);
          display: flex;
          align-items: center;
        }

        .title-decoration {
          display: inline-block;
          width: 4px;
          height: 20px;
          background-color: var(--primary);
          border-radius: 2px;
          margin-right: var(--space-sm);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-lg);
        }

        .contact-item {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: var(--space-sm);
        }

        .contact-icon-container {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-icon {
          color: var(--primary);
          font-size: 1.125rem;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
        }

        .contact-label {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          margin-bottom: 2px;
          font-weight: 500;
        }

        .contact-value {
          font-size: 1rem;
          color: var(--text-primary);
          font-weight: 500;
          line-height: 1.5;
        }

        .website-link {
          color: var(--primary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .website-link:hover {
          color: #1646b6;
          text-decoration: underline;
        }

        /* Details Section */
        .details-section {
          padding: var(--space-xl);
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-lg);
        }

        .detail-card {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: var(--space-md);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          background-color: var(--bg-white);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .detail-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .detail-card.highlight {
          background-color: var(--primary-light);
          border-color: var(--primary-light);
        }

        .card-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-white);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .detail-card.highlight .card-icon {
          background-color: var(--primary);
          color: white;
        }

        .card-content {
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          margin: 0 0 var(--space-xs) 0;
          font-weight: 500;
        }

        .card-value {
          font-size: 1rem;
          color: var(--text-primary);
          font-weight: 500;
          margin: 0;
          line-height: 1.5;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-xs);
          margin-top: var(--space-xs);
        }

        .tag {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background-color: var(--bg-light);
          color: var(--text-secondary);
          border-radius: 20px;
          font-size: 0.8125rem;
          font-weight: 500;
        }

        .card-description {
          margin: var(--space-xs) 0 0 0;
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.9375rem;
        }

        /* Loading State */
        .skeleton-loader {
          display: flex;
          flex-direction: column;
        }

        .skeleton-header {
          height: 120px;
          background-color: var(--bg-light);
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          margin-bottom: 1px;
        }

        .skeleton-content {
          display: flex;
          flex-direction: column;
          background-color: var(--bg-white);
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
          overflow: hidden;
        }

        @media (min-width: 992px) {
          .skeleton-content {
            flex-direction: row;
          }
        }

        .skeleton-sidebar {
          width: 100%;
          height: 300px;
          background-color: var(--bg-light);
        }

        @media (min-width: 992px) {
          .skeleton-sidebar {
            width: 350px;
            border-right: 1px solid var(--border-light);
          }
        }

        .skeleton-main {
          flex: 1;
          padding: var(--space-xl);
        }

        .skeleton-line {
          height: 20px;
          background-color: var(--bg-light);
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-md);
        }

        .skeleton-line:first-child {
          width: 80%;
        }

        .skeleton-line:nth-child(2) {
          width: 60%;
        }

        .skeleton-line:last-child {
          width: 70%;
          margin-bottom: 0;
        }

        /* Error State */
        .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-2xl);
          text-align: center;
        }

        .error-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #fee2e2;
          color: #dc2626;
          font-size: 1.5rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-lg);
        }

        .error-message {
          color: var(--text-primary);
          font-size: 1.125rem;
          margin: 0;
          max-width: 400px;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .agent-detail-container {
            padding: var(--space-md);
          }

          .profile-header {
            flex-direction: column;
            text-align: center;
            padding: var(--space-lg);
          }

          .avatar-container {
            margin-right: 0;
            margin-bottom: var(--space-md);
          }

          .contact-section {
            border-right: none;
            border-bottom: 1px solid var(--border-light);
          }
        }
      `}</style>
    </div>
  );
};

export default AgentDetail;