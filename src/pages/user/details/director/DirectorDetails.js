import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiBriefcase, FiCheck } from 'react-icons/fi';

const DirectorDetails = () => {
  const { id } = useParams();
  const [director, setDirector] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchDirector = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/directors/${id}`);
        setDirector(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load director');
        setIsLoading(false);
      }
    };

    fetchDirector();
  }, [id, API_BASE_URL]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading director details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  if (!director) return null;

  return (
    <div className="director-detail-container">
      <header className="director-header">
        <div className="director-title-container">
          <h1>{director.name}</h1>
          <span className={`status-badge ${director.status === 'active' ? 'active' : 'inactive'}`}>
            {director.status}
          </span>
        </div>
        
        <div className="position-experience">
          <p className="position">{director.position}</p>
          <span className="experience-badge">
            {director.yearsOfExperience} years experience
          </span>
        </div>

        <div className="director-summary">
          <p>
            {director.bio || `${director.name} is a ${director.position} at ${director.company} with ${director.yearsOfExperience} years of experience.`}
          </p>
        </div>
      </header>

      <div className="director-content-grid">
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
                  <p>{director.contactNumber || 'Not provided'}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div>
                  <h3>Email</h3>
                  <p className="break-all">{director.email || 'Not provided'}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FiBriefcase />
                </div>
                <div>
                  <h3>Company</h3>
                  <p>{director.company || 'Not provided'}</p>
                </div>
              </div>

              {director.companyAddress && (
                <div className="contact-item">
                  <div className="contact-icon">
                    <FiMapPin />
                  </div>
                  <div>
                    <h3>Address</h3>
                    <p>{director.companyAddress}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="details-section">
          {director.qualifications?.length > 0 && (
            <section className="detail-card">
              <h2>Qualifications</h2>
              <div className="qualifications-grid">
                {director.qualifications.map((qualification, index) => (
                  <div key={index} className="qualification-item">
                    <FiCheck className="check-icon" />
                    <p>{qualification}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {director.areasOfExpertise?.length > 0 && (
            <section className="detail-card">
              <h2>Areas of Expertise</h2>
              <div className="expertise-grid">
                {director.areasOfExpertise.map((expertise, index) => (
                  <div key={index} className="expertise-item">
                    {expertise}
                  </div>
                ))}
              </div>
            </section>
          )}

          {director.projectsManaged?.length > 0 && (
            <section className="detail-card">
              <h2>Projects Managed ({director.projectsManaged.length})</h2>
              <div className="projects-grid">
                {director.projectsManaged.map((project, index) => (
                  <div key={index} className="project-item">
                    <h3>{project.name || 'Unnamed Project'}</h3>
                    <div className="project-meta">
                      {project.value && (
                        <span className="project-value">Rs. {project.value.toLocaleString()}</span>
                      )}
                      {project.completionYear && (
                        <span className="project-year">Completed: {project.completionYear}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="cta-section">
        <h3>Need to consult with {director.name}?</h3>
        <p>
          Contact them directly using the information provided to discuss your requirements.
        </p>
        <div className="cta-buttons">
          {director.contactNumber && (
            <a href={`tel:${director.contactNumber}`} className="primary-button">
              <FiPhone /> Call Now
            </a>
          )}
          {director.email && (
            <a href={`mailto:${director.email}`} className="secondary-button">
              <FiMail /> Send Email
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .director-detail-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px;
          font-family: 'Inter', sans-serif;
          color: #111827;
          margin-top: 50px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: #6b7280;
        }

        .loading-spinner {
          border: 4px solid #f3f4f6;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-container {
          background-color: white;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          color: #ef4444;
          max-width: 600px;
          margin: 40px auto;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .director-header {
          margin-bottom: 40px;
          padding: 20px;
        }

        .director-title-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 16px;
        }

        @media (min-width: 768px) {
          .director-title-container {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .director-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
        }

        .status-badge.active {
          background-color: #d1fae5;
          color: #065f46;
        }

        .status-badge.inactive {
          background-color: #fee2e2;
          color: #b91c1c;
        }

        .position-experience {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .position {
          font-size: 18px;
          color: #4b5563;
          margin: 0;
        }

        .experience-badge {
          display: inline-block;
          padding: 4px 12px;
          background-color: #dbeafe;
          color: #1e40af;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
        }

        .director-summary {
          background-color: #f0f7ff;
          border-left: 4px solid #1a56db;
          padding: 16px;
          border-radius: 0 8px 8px 0;
        }

        .director-summary p {
          margin: 0;
          color: #1a56db;
          font-weight: 500;
        }

        .director-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 1024px) {
          .director-content-grid {
            grid-template-columns: 1fr 2fr;
          }
        }

        .contact-info-section {
          position: relative;
        }

        @media (min-width: 1024px) {
          .contact-info-section {
            position: sticky;
            top: 20px;
            align-self: start;
          }
        }

        .contact-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
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

        .break-all {
          word-break: break-all;
        }

        .details-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .detail-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
          padding: 24px;
        }

        .detail-card h2 {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 20px;
        }

        .qualifications-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 640px) {
          .qualifications-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .qualification-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .check-icon {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .expertise-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 640px) {
          .expertise-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .expertise-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .expertise-item {
          background-color: #eff6ff;
          color: #1e40af;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
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

        .project-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .project-value {
          font-size: 14px;
          color: #111827;
          font-weight: 500;
        }

        .project-year {
          font-size: 12px;
          color: #6b7280;
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

        @media (max-width: 768px) {
          .director-detail-container {
            padding: 20px 16px;
          }

          .director-header h1 {
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
      `}</style>
    </div>
  );
};

export default DirectorDetails;