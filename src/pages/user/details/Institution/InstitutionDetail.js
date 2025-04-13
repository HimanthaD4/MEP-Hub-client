import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiPhone, FiMail, FiMapPin, FiGlobe, FiBook } from 'react-icons/fi';

const InstitutionDetails = () => {
  const { id } = useParams();
  const [institution, setInstitution] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/institutions/${id}`);
        setInstitution(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load institution');
        setIsLoading(false);
      }
    };

    fetchInstitution();
  }, [id, API_BASE_URL]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading institution details...</p>
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

  if (!institution) return null;

  return (
    <div className="institution-detail-container">
      <header className="institution-header">
        <div className="institution-title-container">
          <h1>{institution.name}</h1>
         
        </div>
        
        <div className="type-badge">
          <FiBook className="type-icon" />
          {institution.type === 'LEARNING' ? 'Learning Institution' : 'Training Center'}
        </div>

        <div className="institution-summary">
          <p>
            {`${institution.name} is a ${institution.type === 'LEARNING' ? 'learning institution' : 'training center'} located in ${institution.address}.`}
          </p>
        </div>
      </header>

      <div className="institution-content-grid">
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
                  <p>{institution.contactNumber || 'Not provided'}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div>
                  <h3>Email</h3>
                  <p className="break-all">{institution.email || 'Not provided'}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FiMapPin />
                </div>
                <div>
                  <h3>Address</h3>
                  <p>{institution.address || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <section className="detail-card">
            <h2>Institution Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <h3>Institution Type</h3>
                <div className="detail-value">
                  <FiBook />
                  <p>{institution.type === 'LEARNING' ? 'Learning Institution' : 'Training Center'}</p>
                </div>
              </div>

             
            </div>
          </section>
        </div>
      </div>

      <div className="cta-section">
        <h3>Need to contact {institution.name}?</h3>
        <p>
          Reach out directly using the contact information provided.
        </p>
        <div className="cta-buttons">
          {institution.contactNumber && (
            <a href={`tel:${institution.contactNumber}`} className="primary-button">
              <FiPhone /> Call Now
            </a>
          )}
          {institution.email && (
            <a href={`mailto:${institution.email}`} className="secondary-button">
              <FiMail /> Send Email
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .institution-detail-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Inter', sans-serif;
          color: #111827;
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

        .institution-header {
          margin-bottom: 40px;
          padding : 20px;
          margin-top: 40px;
        }

        .institution-title-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 16px;
        }

        @media (min-width: 768px) {
          .institution-title-container {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .institution-header h1 {
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

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background-color: #e0f2fe;
          color: #0369a1;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .type-icon {
          font-size: 16px;
        }

        .institution-summary {
          background-color: #f0f7ff;
          border-left: 4px solid #1a56db;
          padding: 16px;
          border-radius: 0 8px 8px 0;
        }

        .institution-summary p {
          margin: 0;
          color: #1a56db;
          font-weight: 500;
        }

        .institution-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 1024px) {
          .institution-content-grid {
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

        .status-indicator {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .status-indicator.active {
          background-color: #10b981;
        }

        .status-indicator.inactive {
          background-color: #ef4444;
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
          .institution-detail-container {
            padding: 20px 16px;
          }

          .institution-header h1 {
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

export default InstitutionDetails;