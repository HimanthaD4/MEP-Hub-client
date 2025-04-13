import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiPhone, FiMail, FiGlobe, 
  FiMapPin, FiBriefcase, FiClock, FiDollarSign, 
  FiCalendar, FiCheck, FiFileText 
} from 'react-icons/fi';

const JobVacancyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobVacancy, setJobVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchJobVacancy = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/job-vacancies/${id}`);
        setJobVacancy(res.data);
      } catch (err) {
        console.error('Error fetching job vacancy details:', err);
        setError(err.response?.status === 404 
          ? 'Job vacancy not found.' 
          : 'Failed to load job vacancy details.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobVacancy();
  }, [id]);

  if (loading) {
    return (
      <div className="jobvacancy-detail-container">
        <div className="loading-placeholder">
          <div className="loading-line w-64 h-8"></div>
          <div className="loading-line w-48 h-4 mt-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobvacancy-detail-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="back-button">
            <FiArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const getJobTypeBadgeStyle = (type) => {
    switch(type) {
      case 'MECHANICAL': return 'mechanical-badge';
      case 'ELECTRICAL': return 'electrical-badge';
      case 'BUILDING_SERVICES': return 'building-badge';
      case 'DRAFTING': return 'drafting-badge';
      case 'QUANTITY_SURVEYING': return 'surveying-badge';
      default: return 'default-badge';
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'Published': return 'published-badge';
      case 'Filled': return 'filled-badge';
      case 'Draft': return 'draft-badge';
      default: return 'default-badge';
    }
  };

  return (
    <div className="jobvacancy-detail-container">
     

      <header className="jobvacancy-header">
        <div className="jobvacancy-title-container">
          <h1>{jobVacancy.positionTitle}</h1>
          <div className="badges-container">
            <span className={`job-type-badge ${getJobTypeBadgeStyle(jobVacancy.jobType)}`}>
              {jobVacancy.jobType.replace('_', ' ')}
            </span>
          
          </div>
        </div>

        {jobVacancy.company && (
          <div className="company-info">
            {jobVacancy.company.logo && (
              <img 
                src={jobVacancy.company.logo} 
                alt={jobVacancy.company.name} 
                className="company-logo"
              />
            )}
            <h2>{jobVacancy.company.name}</h2>
          </div>
        )}

        <div className="job-meta">
          <div className="meta-item">
            <FiMapPin />
            <span>{jobVacancy.city}, {jobVacancy.country}</span>
          </div>
          <div className="meta-item">
            <FiBriefcase />
            <span>{jobVacancy.employmentType}</span>
          </div>
          <div className="meta-item">
            <FiClock />
            <span>{jobVacancy.experienceLevel} ({jobVacancy.yearsOfExperience} years exp)</span>
          </div>
        </div>
      </header>

      <div className="jobvacancy-content-grid">
        <div className="details-section">
          <section className="detail-card">
            <h2>Job Description</h2>
            <div className="prose">
              <p>{jobVacancy.jobDescription}</p>
            </div>
          </section>

          <section className="detail-card">
            <h2>Requirements & Qualifications</h2>
            <div className="requirements-list">
              {jobVacancy.qualifications?.length > 0 ? (
                jobVacancy.qualifications.map((qualification, index) => (
                  <div key={index} className="requirement-item">
                    <FiCheck className="requirement-icon" />
                    <p>{qualification}</p>
                  </div>
                ))
              ) : (
                <p>No specific qualifications listed</p>
              )}
            </div>
          </section>
        </div>

        <div className="sidebar-section">
          <div className="contact-card">
            <h2>Apply for this Position</h2>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div>
                  <h3>Contact Email</h3>
                  <a 
                    href={`mailto:${jobVacancy.contactEmail}`} 
                    className="email-link"
                  >
                    {jobVacancy.contactEmail}
                  </a>
                </div>
              </div>

              {jobVacancy.companyWebsite && (
                <div className="contact-item">
                  <div className="contact-icon">
                    <FiGlobe />
                  </div>
                  <div>
                    <h3>Company Website</h3>
                    <a 
                      href={jobVacancy.companyWebsite.startsWith('http') ? jobVacancy.companyWebsite : `https://${jobVacancy.companyWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      {jobVacancy.companyWebsite}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="apply-actions">
              <a 
                href={`mailto:${jobVacancy.contactEmail}?subject=Application for ${jobVacancy.positionTitle}`}
                className="apply-button"
              >
                Apply via Email
              </a>
            </div>
          </div>

          <div className="quick-facts-card">
            <h2>Quick Facts</h2>
            <div className="facts-grid">
              <div className="fact-item">
                <h3>Job Type</h3>
                <p>{jobVacancy.jobType.replace('_', ' ')}</p>
              </div>
              <div className="fact-item">
                <h3>Employment Type</h3>
                <p>{jobVacancy.employmentType}</p>
              </div>
              <div className="fact-item">
                <h3>Experience Level</h3>
                <p>{jobVacancy.experienceLevel}</p>
              </div>
              <div className="fact-item">
                <h3>Years of Experience</h3>
                <p>{jobVacancy.yearsOfExperience} years</p>
              </div>
              <div className="fact-item">
                <h3>Location</h3>
                <p>{jobVacancy.city}, {jobVacancy.country}</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .jobvacancy-detail-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Outfit', sans-serif;
            color: #111827;
            margin-top: 40px;
            
            
          }

          

          .jobvacancy-header {
            margin-bottom: 10px;
            border-radius:10px
          }

          .jobvacancy-title-container {
            display: flex;
            flex-direction: column;
            gap: 1px;
            margin-bottom: 20px;
            padding: 20px;
            
          }

          @media (min-width: 768px) {
            .jobvacancy-title-container {
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            }
          }

          .jobvacancy-header h1 {
            font-size: 32px;
            font-weight: 700;
            color: #111827;
            margin: 0;
            
          }

          .badges-container {
            display: flex;
            gap: 8px;
          }

          .job-type-badge, .status-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
          }

          .mechanical-badge {
            background-color: #e0f2fe;
            color: #0369a1;
          }

          .electrical-badge {
            background-color: #fef3c7;
            color: #92400e;
          }

          .building-badge {
            background-color: #dcfce7;
            color: #166534;
          }

          .drafting-badge {
            background-color: #f3e8ff;
            color: #7e22ce;
          }

          .surveying-badge {
            background-color: #ffedd5;
            color: #9a3412;
          }

          .default-badge {
            background-color: #f1f5f9;
            color: #1a56db;
          }

          .published-badge {
            background-color: #dcfce7;
            color: #166534;
          }

          .filled-badge {
            background-color: #fee2e2;
            color: #b91c1c;
          }

          .draft-badge {
            background-color: #fef3c7;
            color: #92400e;
          }

          .company-info {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
          }

          .company-logo {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            object-fit: contain;
          }

          .company-info h2 {
            font-size: 20px;
            font-weight: 600;
            color: #111827;
            margin: 0;
          }

          .job-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 16px;
            padding:20px;
           
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #4b5563;
            font-size: 14px;
          }

          .meta-item svg {
            color: #6b7280;
          }

          .jobvacancy-content-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }

          @media (min-width: 1024px) {
            .jobvacancy-content-grid {
              grid-template-columns: 2fr 1fr;
            }
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

          .prose {
            line-height: 1.6;
            color: #4b5563;
          }

          .prose p {
            margin: 0;
            white-space: pre-line;
          }

          .requirements-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .requirement-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
          }

          .requirement-icon {
            color: #10b981;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .requirement-item p {
            margin: 0;
            color: #4b5563;
          }

          .sidebar-section {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          @media (min-width: 1024px) {
            .sidebar-section {
              position: sticky;
              top: 20px;
              align-self: start;
            }
          }

          .contact-card {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid rgba(0,0,0,0.05);
            padding: 24px;
          }

          .contact-card h2 {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 20px;
          }

          .contact-details {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 24px;
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

          .contact-item p, .contact-item a {
            font-size: 16px;
            color: #111827;
            margin: 0;
          }

          .email-link, .website-link {
            color: #1a56db;
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .email-link:hover, .website-link:hover {
            color: #1648c7;
            text-decoration: underline;
          }

          .apply-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .apply-button {
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
            text-align: center;
          }

          .apply-button:hover {
            background-color: #1648c7;
          }

          .quick-facts-card {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid rgba(0,0,0,0.05);
            padding: 24px;
          }

          .quick-facts-card h2 {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 20px;
          }

          .facts-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
          }

          @media (min-width: 640px) {
            .facts-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          .fact-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .fact-item h3 {
            font-size: 14px;
            font-weight: 500;
            color: #6b7280;
            margin: 0;
          }

          .fact-item p {
            font-size: 16px;
            color: #111827;
            margin: 0;
          }

          .status-text {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 500;
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
            .jobvacancy-detail-container {
              padding: 20px 16px;
            }

            .jobvacancy-header h1 {
              font-size: 24px;
            }

            .detail-card,
            .contact-card,
            .quick-facts-card {
              padding: 20px;
            }

            .job-meta {
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default JobVacancyDetail;