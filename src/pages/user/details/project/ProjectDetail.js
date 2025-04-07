import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FiArrowLeft, FiExternalLink, FiCalendar, FiCheckCircle, FiDollarSign, FiUsers, FiPhone, FiMail } from 'react-icons/fi';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Project not found.');
        } else {
          setError('Failed to load project details.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="project-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-detail-container">
        <div className="error-container">
          <div className="error-icon">!</div>
          <h3 className="error-title">{error}</h3>
         
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <div className="project-content">
        {/* Back Button */}
       
        {/* Header */}
        <div className="project-header">
          <div className="title-container">
            <h1 className="project-title">{project.title}</h1>
            {project.status && (
              <span className={`status-badge ${
                project.status === 'Completed' ? 'completed' :
                project.status === 'In Progress' ? 'in-progress' : 'planned'
              }`}>
                {project.status}
              </span>
            )}
          </div>
          
          {project.tags && project.tags.length > 0 && (
            <div className="tags-container">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="project-grid">
          {/* Left Column */}
          <div className="main-content">
            {/* Project Overview */}
            <div className="content-card">
              <div className="card-header">
                <h2>Project Overview</h2>
              </div>
              <div className="card-content">
                <p className="project-description">{project.description || 'No description provided.'}</p>
              </div>
            </div>

            {/* Project Timeline */}
            <div className="content-card">
              <div className="card-header">
                <h2>Project Timeline</h2>
              </div>
              <div className="card-content">
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <FiCalendar className="timeline-icon-svg" />
                  </div>
                  <div className="timeline-details">
                    <h3 className="timeline-title">Start Date</h3>
                    <p className="timeline-date">{project.startDate ? format(new Date(project.startDate), 'MMMM d, yyyy') : 'Not specified'}</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <FiCheckCircle className="timeline-icon-svg" />
                  </div>
                  <div className="timeline-details">
                    <h3 className="timeline-title">End Date</h3>
                    <p className="timeline-date">{project.endDate ? format(new Date(project.endDate), 'MMMM d, yyyy') : 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="sidebar-content">
            {/* Project Details */}
            <div className="content-card">
              <div className="card-header">
                <h2>Project Details</h2>
              </div>
              <div className="card-content">
                <div className="detail-item">
                  <h3 className="detail-label">Contractor</h3>
                  <p className="detail-value">{project.contractor || 'Not specified'}</p>
                </div>
                <div className="detail-item">
  <h3 className="detail-label">Project Value</h3>
  <div className="value-container">
    <span className="lkr-symbol">Rs.</span>
    <p className="detail-value">{project.amount ? `${Number(project.amount).toLocaleString()}` : 'Not specified'}</p>
  </div>
</div>
                {project.website && (
                  <div className="detail-item">
                    <h3 className="detail-label">Project Website</h3>
                    <a 
                      href={project.website.startsWith('http') ? project.website : `https://${project.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      {project.website} <FiExternalLink className="external-link-icon" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Project Team */}
            {project.teamMembers && project.teamMembers.length > 0 && (
              <div className="content-card">
                <div className="card-header">
                  <h2>Project Team</h2>
                </div>
                <div className="card-content">
                  <ul className="team-list">
                    {project.teamMembers.map((member, index) => (
                      <li key={index} className="team-member">
                        <div className="member-avatar">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="member-details">
                          <h3 className="member-name">{member.name}</h3>
                          <p className="member-role">{member.role}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h3 className="cta-title">Interested in this project?</h3>
            <p className="cta-description">
              Contact the project team directly using the information provided to discuss further details.
            </p>

            <a className="primary-button" >
              <FiPhone /> Call Now
            </a>
            <a className="secondary-button" >
                <FiMail /> Send Email
            </a>



            <div className="cta-buttons">
              {project.contactNumber && (
                <a
                  href={`tel:${project.contactNumber}`}
                  className="primary-button"
                >
                  <FiPhone className="button-icon" /> Call Now
                </a>
              )}
              {project.contactEmail && (
                <a
                  href={`mailto:${project.contactEmail}`}
                  className="secondary-button"
                >
                  <FiMail className="button-icon" /> Send Email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-detail-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 20px 40px;
          font-family: 'SUSE', sans-serif;
          color: #111827;
          background-color: #f9fafb;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          gap: 20px;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(26, 86, 219, 0.1);
          border-radius: 50%;
          border-top-color: #1a56db;
          animation: spin 1s ease-in-out infinite;
        }

        .loading-text {
          color: #4b5563;
          font-size: 18px;
          font-weight: 500;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          text-align: center;
          gap: 20px;
          padding: 40px;
        }

        .error-icon {
          width: 60px;
          height: 60px;
          background-color: #fee2e2;
          color: #dc2626;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: bold;
        }

        .error-title {
          color: #dc2626;
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }

        .lkr-symbol {
          font-weight: 500;
          color: #10b981; /* Matching the dollar icon color */
          margin-right: 4px;
        }

        .back-button:hover {
          color: #1648c7;
          transform: translateX(-2px);
        }

        .back-icon {
          transition: transform 0.2s ease;
        }

        .back-button:hover .back-icon {
          transform: translateX(-4px);
        }

        .project-header {
          margin-bottom: 40px;
          background-color: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .title-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (min-width: 768px) {
          .title-container {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .project-title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin: 0;
          line-height: 1.2;
          padding: 0 0px 0px 0px;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
        }

        .status-badge.completed {
          background-color: #dcfce7;
          color: #166534;
        }

        .status-badge.in-progress {
          background-color: #e0f2fe;
          color: #0369a1;
        }

        .status-badge.planned {
          background-color: #f1f5f9;
          color: #1a56db;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          display: inline-block;
          padding: 6px 12px;
          background-color: #f1f5f9;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          color: #1a56db;
          transition: all 0.2s ease;
        }

        .tag:hover {
          background-color: #e0f2fe;
          transform: translateY(-1px);
        }

        .project-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 1024px) {
          .project-grid {
            grid-template-columns: 2fr 1fr;
          }
        }

        .content-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          margin-bottom: 24px;
        }

        .content-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }

        .card-header {
          padding: 20px 24px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .card-header h2 {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 16px 0;
        }

        .card-content {
          padding: 20px 24px 24px;
        }

        .project-description {
          font-size: 16px;
          line-height: 1.6;
          color: #4b5563;
          margin: 0;
        }

        .timeline-item {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          align-items: flex-start;
        }

        .timeline-item:last-child {
          margin-bottom: 0;
        }

        .timeline-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #f0f7ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timeline-icon-svg {
          color: #1a56db;
          width: 20px;
          height: 20px;
        }

        .timeline-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
        }

        .timeline-date {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .detail-item {
          margin-bottom: 20px;
        }

        .detail-item:last-child {
          margin-bottom: 0;
        }

        .detail-label {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          margin: 0 0 6px 0;
        }

        .detail-value {
          font-size: 16px;
          color: #111827;
          margin: 0;
          line-height: 1.5;
        }

        .value-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dollar-icon {
          color: #10b981;
          width: 18px;
          height: 18px;
        }

        .website-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #1a56db;
          text-decoration: none;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .website-link:hover {
          color: #1648c7;
          text-decoration: underline;
        }

        .external-link-icon {
          width: 14px;
          height: 14px;
        }

        .team-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .team-member {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
          transition: background-color 0.2s ease;
        }

        .team-member:hover {
          background-color: #f9fafb;
        }

        .team-member:last-child {
          border-bottom: none;
        }

        .member-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a56db;
          font-weight: 600;
          flex-shrink: 0;
        }

        .member-name {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 2px 0;
        }

        .member-role {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .cta-section {
          background-color: #f0f7ff;
          border-radius: 12px;
          padding: 40px;
          text-align: center;
          margin-top: 40px;
          border: 1px solid rgba(26, 86, 219, 0.1);
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 12px 0;
        }

        .cta-description {
          color: #4b5563;
          font-size: 16px;
          line-height: 1.6;
          margin: 0 auto 24px auto;
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
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(26, 86, 219, 0.2);
        }

        .primary-button:hover {
          background-color: #1648c7;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(26, 86, 219, 0.3);
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
          margin-left: 12px;
        }

        .secondary-button:hover {
          background-color: #f0f7ff;
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .button-icon {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 768px) {
          .project-detail-container {
            padding: 40px 16px;
          }

          .project-header {
            padding: 20px;
          }

          .project-title {
            font-size: 24px;
          }

          .content-card {
            padding: 16px;
          }

          .cta-section {
            padding: 24px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;