import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/main.css';

const Home = () => {
  const { user } = useAuth();

  // Dummy data for all sections
  const upcomingProjects = [
    { type: 'Residential', name: 'Luxury Apartment Complex', location: 'Colombo 05', status: 'Planning' },
    { type: 'Commercial', name: 'Office Tower', location: 'Colombo 01', status: 'In Progress' },
    { type: 'Industrial', name: 'Manufacturing Plant', location: 'Biyagama', status: 'Design' },
    { type: 'Mixed Development', name: 'Shopping Mall & Residences', location: 'Negombo', status: 'Planning' },
    { type: 'Office Complex', name: 'Corporate Headquarters', location: 'Colombo 03', status: 'Completed' }
  ];

  const consultants = [
    { name: 'ABC Consultants', specialization: 'MEP Design', rating: 4.8 },
    { name: 'XYZ Engineering', specialization: 'Structural', rating: 4.5 },
    { name: 'DEF Solutions', specialization: 'HVAC', rating: 4.7 },
    { name: 'GHI Associates', specialization: 'Electrical', rating: 4.6 }
  ];

  const contractors = {
    installation: ['Mega Installations', 'Pro Electricals', 'Precision HVAC'],
    service: ['Total Maintenance', 'Quick Fix Services', 'Reliable Repairs'],
    labor: ['Skilled Labor Force', 'Construction Crews', 'Technical Teams']
  };

  const suppliers = [
    { name: 'BuildMart', category: 'Materials', products: ['Cement', 'Steel', 'Blocks'] },
    { name: 'ToolMaster', category: 'Equipment', products: ['Power Tools', 'Scaffolding'] },
    { name: 'ElecWorld', category: 'Electrical', products: ['Wires', 'Switches', 'Fixtures'] }
  ];

  const educationalInstitutions = [
    { name: 'Construction Academy', programs: ['Diploma in MEP', 'Certification Courses'] },
    { name: 'Technical University', programs: ['BSc in Construction', 'Masters Programs'] }
  ];

  const lecturers = [
    { name: 'Prof. John Smith', expertise: 'Mechanical Systems', institution: 'Technical University' },
    { name: 'Dr. Sarah Lee', expertise: 'Electrical Design', institution: 'Construction Academy' }
  ];

  const jobVacancies = [
    { title: 'Mechanical Engineer', type: 'Full-time', location: 'Colombo' },
    { title: 'Electrical Supervisor', type: 'Contract', location: 'Galle' },
    { title: 'QS Manager', type: 'Full-time', location: 'Kandy' }
  ];

  const jobSeekers = [
    { name: 'David Johnson', position: 'Chartered Engineer', experience: '10 years' },
    { name: 'Emma Wilson', position: 'Project Manager', experience: '8 years' }
  ];

  const trainees = [
    { field: 'Mechanical', count: 24, institution: 'Technical Institute' },
    { field: 'Electrical', count: 32, institution: 'Vocational Center' }
  ];

  const companyDirectors = [
    { name: 'Michael Brown', company: 'ConstructCo', position: 'Managing Director' },
    { name: 'Lisa Taylor', company: 'BuildRight', position: 'Technical Director' }
  ];

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1>MEPHUB Construction Platform</h1>
          <p>Connecting professionals across Sri Lanka's construction industry</p>
        </div>
      </header>

      <section className="upcoming-projects">
        <h2 className="section-title">Upcoming Projects</h2>
        <div className="projects-grid">
          {upcomingProjects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-type">{project.type}</div>
              <h3>{project.name}</h3>
              <p className="project-location">{project.location}</p>
              <div className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="consultants-section">
        <h2 className="section-title">Consultants</h2>
        <div className="consultants-grid">
          {consultants.map((consultant, index) => (
            <div key={index} className="consultant-card">
              <h3>{consultant.name}</h3>
              <p className="specialization">{consultant.specialization}</p>
              <div className="rating">
                {'★'.repeat(Math.floor(consultant.rating))}
                {'☆'.repeat(5 - Math.floor(consultant.rating))}
                <span>{consultant.rating}</span>
              </div>
              <button className="view-profile-btn">View Profile</button>
            </div>
          ))}
        </div>
      </section>

      <section className="contractors-section">
        <h2 className="section-title">Contractors</h2>
        <div className="contractors-tabs">
          <div className="contractor-type">
            <h3>Installation</h3>
            <ul>
              {contractors.installation.map((contractor, index) => (
                <li key={index}>{contractor}</li>
              ))}
            </ul>
          </div>
          <div className="contractor-type">
            <h3>Service & Maintenance</h3>
            <ul>
              {contractors.service.map((contractor, index) => (
                <li key={index}>{contractor}</li>
              ))}
            </ul>
          </div>
          <div className="contractor-type">
            <h3>Labor</h3>
            <ul>
              {contractors.labor.map((contractor, index) => (
                <li key={index}>{contractor}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="suppliers-section">
        <h2 className="section-title">Suppliers & Dealers</h2>
        <div className="suppliers-grid">
          {suppliers.map((supplier, index) => (
            <div key={index} className="supplier-card">
              <h3>{supplier.name}</h3>
              <p className="category">{supplier.category}</p>
              <div className="products">
                {supplier.products.map((product, i) => (
                  <span key={i} className="product-tag">{product}</span>
                ))}
              </div>
              <button className="contact-btn">Contact Supplier</button>
            </div>
          ))}
        </div>
      </section>

      <section className="education-section">
        <h2 className="section-title">Educational Institutions</h2>
        <div className="institutions-grid">
          {educationalInstitutions.map((institution, index) => (
            <div key={index} className="institution-card">
              <h3>{institution.name}</h3>
              <div className="programs">
                {institution.programs.map((program, i) => (
                  <p key={i}>{program}</p>
                ))}
              </div>
              <button className="learn-more-btn">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      <section className="lecturers-section">
        <h2 className="section-title">Industry Lecturers</h2>
        <div className="lecturers-grid">
          {lecturers.map((lecturer, index) => (
            <div key={index} className="lecturer-card">
              <h3>{lecturer.name}</h3>
              <p className="expertise">{lecturer.expertise}</p>
              <p className="institution">{lecturer.institution}</p>
              <button className="profile-btn">View Profile</button>
            </div>
          ))}
        </div>
      </section>

      <section className="jobs-section">
        <div className="vacancies">
          <h2 className="section-title">Job Vacancies</h2>
          <div className="jobs-list">
            {jobVacancies.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job.title}</h3>
                <p className="job-type">{job.type}</p>
                <p className="job-location">{job.location}</p>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
        <div className="seekers">
          <h2 className="section-title">Job Seekers</h2>
          <div className="seekers-list">
            {jobSeekers.map((seeker, index) => (
              <div key={index} className="seeker-card">
                <h3>{seeker.name}</h3>
                <p className="position">{seeker.position}</p>
                <p className="experience">{seeker.experience} experience</p>
                <button className="view-cv-btn">View CV</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trainees-section">
        <h2 className="section-title">Trainees</h2>
        <div className="trainees-grid">
          {trainees.map((trainee, index) => (
            <div key={index} className="trainee-card">
              <h3>{trainee.field}</h3>
              <p className="count">{trainee.count} trainees</p>
              <p className="institution">{trainee.institution}</p>
              <button className="view-btn">View Details</button>
            </div>
          ))}
        </div>
      </section>

      <section className="directors-section">
        <h2 className="section-title">Company Directors</h2>
        <div className="directors-grid">
          {companyDirectors.map((director, index) => (
            <div key={index} className="director-card">
              <h3>{director.name}</h3>
              <p className="company">{director.company}</p>
              <p className="position">{director.position}</p>
              <button className="connect-btn">Connect</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;