import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPhone, FiMail, FiGlobe, FiMapPin, FiBriefcase, FiCheck } from 'react-icons/fi';

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (loading) {
    return (
      <div className="agent-detail-container">
        <div className="loading-placeholder">
          <div className="loading-line w-64 h-8"></div>
          <div className="loading-line w-48 h-4 mt-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="agent-detail-container">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-detail-container">
      <header className="agent-header">
        <div className="agent-title-container">
          <h1 style={{ textTransform: 'capitalize' }}>{agent.name}</h1>
          <span className={`agent-type-badge`}>
            {agent.role || 'Agent'}
          </span>
        </div>

        <div className="agent-summary">
          <p>
            {agent.description || `${agent.name} is an agent providing services in ${agent.equipmentType.join(', ') || 'various'} areas.`}
          </p>
        </div>
      </header>

      <div className="agent-content-grid">
        <div className="contact-info-section">
          <div className="contact-card">
            <h2>Contact Information</h2>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <FiPhone />
                </div>
                <div>
                  <h3>Phone</h3>
                  <p>{agent.contactNumber || 'Not provided'}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div>
                  <h3>Email</h3>
                  <p className="break-all">{agent.companyEmail || 'Not provided'}</p>
                </div>
              </div>

              {agent.companyWebsite && (
                <div className="contact-item">
                  <div className="contact-icon">
                    <FiGlobe />
                  </div>
                  <div>
                    <h3>Website</h3>
                    <a 
                      href={agent.companyWebsite.startsWith('http') ? agent.companyWebsite : `https://${agent.companyWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      {agent.companyWebsite}
                    </a>
                  </div>
                </div>
              )}

              <div className="contact-item">
                <div className="contact-icon">
                  <FiMapPin />
                </div>
                <div>
                  <h3>Location</h3>
                  <p>{agent.location || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <section className="detail-card">
            <h2>Professional Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <h3>Equipment Type</h3>
                <div className="detail-value">
                  <FiBriefcase />
                  <p >{agent.equipmentType.join(', ') || 'N/A'}</p>
                </div>
              </div>

              <div className="detail-item">
                <h3>Years of Experience</h3>
                <div className="detail-value">
                  <FiBriefcase />
                  <p>{agent.yearsOfExperience || 'N/A'} years</p>
                </div>
              </div>
            </div>
          </section>

          {agent.projects && agent.projects.length > 0 && (
            <section className="detail-card">
              <h2>Notable Projects</h2>
              <div className="projects-list">
                {agent.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h3>{project.name || 'Unnamed Project'}</h3>
                    {project.description && (
                      <p className="project-description">
                        {project.description}
                      </p>
                    )}
                    {project.completedYear && (
                      <p className="project-year">
                        Completed: {project.completedYear}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="cta-section">
        <h3>Interested in working with {agent.name}?</h3>
        <p>
          Contact them directly using the information provided to discuss your project requirements.
        </p>
        <div className="cta-buttons">
          {agent.contactNumber && (
            <a
              href={`tel:${agent.contactNumber}`}
              className="primary-button"
            >
              <FiPhone /> Call Now
            </a>
          )}
          {agent.companyEmail && (
            <a
              href={`mailto:${agent.companyEmail}`}
              className="secondary-button"
            >
              <FiMail /> Send Email
            </a>
          )}
        </div>
      </div>

      <style>
        {`
          .agent-detail-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px;
            font-family: 'Outfit', sans-serif;
            color: #111827;
            margin-top: 40px;
          }

          .agent-header {
            margin-bottom: 40px;
            padding: 10px 20px;
          }

          .agent-title-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 20px;
          }

          @media (min-width: 768px) {
            .agent-title-container {
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            }
          }

          .agent-header h1 {
            font-size: 32px;
            font-weight: 700;
            color: #111827;
            margin: 0;
          }

          .agent-summary {
            background-color: #f0f7ff;
            border-left: 4px solid #1a56db;
            padding: 16px;
            border-radius: 0 8px 8px 0;
          }

          .agent-summary p {
            margin: 0;
            color: #1a56db;
            font-weight: 500;
          }

          .agent-content-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }

          @media (min-width: 1024px) {
            .agent-content-grid {
              grid-template-columns: 1fr 2fr;
            }
          }

          .contact-info-section {
            position: relative;
          }

          .contact-card {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid rgba(0,0,0,0.05);
            padding: 24px;
            margin-bottom: 24px;
          }

          .contact-card h2 {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f1f5f9;
          }

          .contact-details {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .contact-item {
            display: flex;
            gap: 12px;
          }

          .contact-icon {
            color: #1a56db;
            font-size: 18px;
            margin-top: 2px;
          }

          .contact-item h3 {
            font-size: 14px;
            font-weight: 500;
            color: #6b7280;
            margin: 0 0 4px 0;
          }

          .contact-item p {
            font-size: 16px;
            color: #111827;
            margin: 0;
          }

          .website-link {
            color: #1a56db;
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .website-link:hover {
            color: #1648c7;
            text-decoration: underline;
          }

          .details-section {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .detail-card {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid rgba(0,0,0,0.05);
            padding: 24px;
          }

          .detail-card h2 {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 20px;
          }

          .details-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }

          @media (min-width: 640px) {
            .details-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          .detail-item {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .detail-value {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #111827;
          }

          .detail-value svg {
            color: #1a56db;
          }

          .projects-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .project-item {
            border-left: 4px solid #1a56db;
            padding-left: 16px;
          }

          .project-item h3 {
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            margin: 0 0 4px 0;
          }

          .project-description {
            font-size: 14px;
            color: #4b5563;
            margin: 0 0 4px 0;
            line-height: 1.5;
          }

          .project-year {
            font-size: 12px;
            color: #6b7280;
            margin: 0;
          }

          .cta-section {
            background-color: #f0f7ff;
            border-radius: 12px;
            padding: 32px;
            text-align: center;
            margin-top: 40px;
          }

          .cta-section h3 {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            margin: 0 0 12px 0;
          }

          .cta-section p {
            color: #4b5563;
            max-width: 600px;
            margin: 0 auto 24px auto;
            line-height: 1.5;
          }

          .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
          }

          .primary-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background-color: #1a56db;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            text-decoration: none;
            transition: background-color 0.2s ease;
            border: none;
            cursor: pointer;
          }

          .primary-button:hover {
            background-color: #1648c7;
          }

          .secondary-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background-color: white;
            color: #1a56db;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s ease;
            border: 1px solid #1a56db;
            cursor: pointer;
          }

          .secondary-button:hover {
            background-color: #f0f7ff;
          }

          .loading-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 200px;
          }

          .loading-line {
            background-color: #f1f5f9;
            border-radius: 4px;
            margin-bottom: 16px animation: pulse 2s infinite ease-in-out;
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }

          .error-message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            text-align: center;
          }

          .error-message p {
            color: #dc2626;
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 24px;
          }

          @media (max-width: 768px) {
            .agent-detail-container {
              padding: 20px 16px;
            }

            .agent-header h1 {
              font-size: 24px;
            }

            .contact-card,
            .detail-card {
              padding: 20px;
            }

            .cta-buttons {
              flex-direction: column;
              align-items: center;
            }

            .primary-button,
            .secondary-button {
              width: 100%;
              max-width: 300px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AgentDetail;