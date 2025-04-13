import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from '../../components/home/HeroSection';
import CategoriesSection from '../../components/home/CategoriesSection';
import ProjectsSection from '../../components/home/ProjectsSection';
import CtaSection from '../../components/home/CtaSection';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [consultantFirms, setConsultantFirms] = useState([]);
  const [contractorFirms, setContractorFirms] = useState([]);
  const [agents, setAgents] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [jobseekers, setJobseekers] = useState([]);
  const [jobVacancies, setJobVacancies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          projectsRes, 
          consultantsRes, 
          contractorsRes, 
          agentsRes, 
          directorsRes, 
          lecturersRes, 
          jobVacanciesRes,
          jobseekersRes,
          institutionsRes
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/projects`),
          axios.get(`${API_BASE_URL}/consultants`),
          axios.get(`${API_BASE_URL}/contractors`),
          axios.get(`${API_BASE_URL}/agents`),
          axios.get(`${API_BASE_URL}/directors`),
          axios.get(`${API_BASE_URL}/lecturers`),
          axios.get(`${API_BASE_URL}/job-vacancies`),
          axios.get(`${API_BASE_URL}/jobseekers`),
          axios.get(`${API_BASE_URL}/institutions`),
        ]);
        
        setProjects(projectsRes.data || []);
        setConsultantFirms(consultantsRes.data || []);
        setContractorFirms(contractorsRes.data || []);
        setAgents(agentsRes.data || []);
        setDirectors(directorsRes.data || []);
        setLecturers(lecturersRes.data || []);
        setInstitutions(institutionsRes.data || []);
        setJobseekers(jobseekersRes.data || []);
        setJobVacancies(jobVacanciesRes.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_BASE_URL]);

  const styles = {
    container: {
      fontFamily: "'Outfit', sans-serif",
      color: '#111827',
      backgroundColor: '#f8fafc'
    }
  };

  if (error) {
    return <div style={styles.container}>Error loading data: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <HeroSection 
        projects={projects} 
        consultantFirms={consultantFirms} 
        contractorFirms={contractorFirms} 
        agents={agents} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
      />
      
      <CtaSection />
      
      <ProjectsSection 
        projects={projects}
        searchTerm={searchTerm}
        loading={loading}
        setSearchTerm={setSearchTerm}
      />

<CategoriesSection 
        projects={projects}
        consultantFirms={consultantFirms}
        contractorFirms={contractorFirms}
        agents={agents}
        directors={directors}
        lecturers={lecturers}
        institutions={institutions}
        jobVacancies={jobVacancies}
        jobseekers={jobseekers}
      />
      
    
    </div>
  );
};

export default HomePage;