import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
  FiPhone, 
  FiMail, 
  FiBriefcase, 
  FiAward, 
  FiUser, 
  FiCheck,
  FiClock,
  FiHome
} from 'react-icons/fi';

const JobSeekerDetails = () => {
  const { id } = useParams();
  const [jobSeeker, setJobSeeker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchJobSeeker = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/jobseekers/${id}`);
        setJobSeeker(res.data);
      } catch (err) {
        console.error('Error fetching job seeker details:', err);
        setError(err.response?.status === 404 
          ? 'Job seeker not found.' 
          : 'Failed to load job seeker details.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobSeeker();
  }, [id, API_BASE_URL]);

  if (loading) {
    return (
      <div className="jobseeker-detail-container">
        <div className="loading-placeholder">
          <div className="loading-line w-64 h-8"></div>
          <div className="loading-line w-48 h-4 mt-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobseeker-detail-container">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getProfessionalBadgeStyle = (type) => {
    switch(type) {
      case 'Chartered Engineer': return 'chartered-badge';
      case 'Project Manager': return 'pm-badge';
      case 'Engineer': return 'engineer-badge';
      default: return 'default-badge';
    }
  };

  return (
    <div className="jobseeker-detail-container">
      <header className="jobseeker-header">
        <div className="jobseeker-title-container">
          <h1>{jobSeeker.firstName} {jobSeeker.lastName}</h1>
          <span className={`professional-type-badge ${getProfessionalBadgeStyle(jobSeeker.professionalType)}`}>
            {jobSeeker.professionalType}
          </span>
        </div>

        <div className="jobseeker-summary">
          <p>
            {jobSeeker.currentlyEmployed 
              ? `Currently working at ${jobSeeker.currentCompany || 'a company'} with ${jobSeeker.yearsOfExperience} years of experience.`
              : `Professional with ${jobSeeker.yearsOfExperience} years of experience currently seeking opportunities.`}
          </p>
        </div>
      </header>

      <div className="jobseeker-content-grid">
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
                  <p>{jobSeeker.contactNumber || 'Not provided'}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div>
                  <h3>Email</h3>
                  <p className="break-all">{jobSeeker.email || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="professional-card">
            <h2>Professional Summary</h2>
            <div className="professional-details">
              <div className="detail-item">
                <div className="detail-icon">
                  <FiBriefcase />
                </div>
                <div>
                  <h3>Experience</h3>
                  <p>{jobSeeker.yearsOfExperience} years</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FiAward />
                </div>
                <div>
                  <h3>Highest Qualification</h3>
                  <p>{jobSeeker.highestQualification}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FiUser />
                </div>
                <div>
                  <h3>Status</h3>
                  <p>{jobSeeker.currentlyEmployed ? 'Currently Employed' : 'Seeking Opportunities'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="details-section">
          {jobSeeker.workHistory?.length > 0 && (
            <section className="detail-card">
              <h2>Work History</h2>
              <div className="work-history">
                {jobSeeker.workHistory.map((job, index) => (
                  <div key={index} className="work-item">
                    <div className="work-header">
                      <h3>{job.jobTitle || 'Professional Role'}</h3>
                      {job.duration && <span className="work-duration">{job.duration}</span>}
                    </div>
                    {job.company && <p className="work-company">{job.company}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="detail-card">
            <h2>Professional Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <h3>Professional Type</h3>
                <div className="detail-value">
                  <FiUser />
                  <p>{jobSeeker.professionalType}</p>
                </div>
              </div>

              <div className="detail-item">
                <h3>Years of Experience</h3>
                <div className="detail-value">
                  <FiClock />
                  <p>{jobSeeker.yearsOfExperience} years</p>
                </div>
              </div>

              <div className="detail-item">
                <h3>Current Employment Status</h3>
                <div className="detail-value">
                  <FiBriefcase />
                  <p>{jobSeeker.currentlyEmployed ? 'Employed' : 'Available'}</p>
                </div>
              </div>

              {jobSeeker.currentCompany && (
                <div className="detail-item">
                  <h3>Current Company</h3>
                  <div className="detail-value">
                    <FiHome />
                    <p>{jobSeeker.currentCompany}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <div className="cta-section">
        <h3>Interested in hiring {jobSeeker.firstName}?</h3>
        <p>
          Contact them directly using the information provided to discuss potential opportunities.
        </p>
        <div className="cta-buttons">
          {jobSeeker.contactNumber && (
            <a href={`tel:${jobSeeker.contactNumber}`} className="primary-button">
              <FiPhone /> Call Now
            </a>
          )}
          {jobSeeker.email && (
            <a href={`mailto:${jobSeeker.email}`} className="secondary-button">
              <FiMail /> Send Email
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .jobseeker-detail-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Outfit', sans-serif;
          color: #111827;
          margin-top: 40px;
        }

        .jobseeker-header {
          margin-bottom: 40px;
          padding: 10px 20px 10px 20px;
        }

        .jobseeker-title-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (min-width: 768px) {
          .jobseeker-title-container {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .jobseeker-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .professional-type-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
        }

        .chartered-badge {
          background-color: #1e40af;
          color: #dbeafe;
        }

        .pm-badge {
          background-color: #166534;
          color: #dcfce7;
        }

        .engineer-badge {
          background-color: #92400e;
          color: #fef3c7;
        }

        .default-badge {
          background-color: #f1f5f9;
          color: #1a56db;
        }

        .jobseeker-summary {
          background-color: #f0f7ff;
          border-left: 4px solid #1a56db;
          padding: 16px;
          border-radius: 0 8px 8px 0;
        }

        .jobseeker-summary p {
          margin: 0;
          color: #1a56db;
          font-weight: 500;
        }

        .jobseeker-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 1024px) {
          .jobseeker-content-grid {
            grid-template-columns: 1fr 2fr;
          }
        }

        .contact-info-section {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (min-width: 1024px) {
          .contact-info-section {
            position: sticky;
            top: 20px;
            align-self: start;
          }
        }

        .contact-card, .professional-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
          padding: 24px;
        }

        .contact-card h2, .professional-card h2 {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .contact-details, .professional-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-item, .detail-item {
          display: flex;
          gap: 12px;
        }

        .contact-icon, .detail-icon {
          color: #1a56db;
          font-size: 18px;
          margin-top: 2px;
        }

        .contact-item h3, .detail-item h3 {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          margin: 0 0 4px 0;
        }

        .contact-item p, .detail-item p {
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

        .work-history {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .work-item {
          border-left: 4px solid #1a56db;
          padding-left: 16px;
        }

        .work-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .work-item h3 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .work-duration {
          font-size: 14px;
          color: #6b7280;
        }

        .work-company {
          font-size: 14px;
          color: #4b5563;
          margin: 0;
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

        .detail-value {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #111827;
        }

        .detail-value svg {
          color: #1a56db;
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
          margin-bottom: 16px;
          animation: pulse 2s infinite ease-in-out;
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
          .jobseeker-detail-container {
            padding: 20px 16px;
          }

          .jobseeker-header h1 {
            font-size: 24px;
          }

          .contact-card,
          .professional-card,
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

export default JobSeekerDetails;