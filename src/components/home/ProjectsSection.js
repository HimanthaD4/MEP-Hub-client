import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

// Import different category images
import residentialImg from '../../images/residentialImg.jpg';
import commercialImg from '../../images/commercialImg.jpg';
import industrialImg from '../../images/industrialImg.jpg';
import mixDevImg from '../../images/mix.jpg';
import officeImg from '../../images/officeImg.jpeg';

const ProjectsSection = ({ projects = [], searchTerm = '', loading, setSearchTerm }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);
  
  const safeProjects = Array.isArray(projects) ? projects : [];
  
  const filteredProjects = safeProjects
    .filter(project => {
      if (!project || !project.visible) return false;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        (project.title && project.title.toLowerCase().includes(searchLower)) ||
        (project.description && project.description.toLowerCase().includes(searchLower)) ||
        (project.contractor && project.contractor.toLowerCase().includes(searchLower))
      );
    })
    .slice(0, 6);

  useEffect(() => {
    if (filteredProjects.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredProjects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [filteredProjects.length, isHovered]);

  const getCategoryImage = (type) => {
    if (!type) return commercialImg;
    const normalizedType = type.toLowerCase();
    
    if (normalizedType.includes('residential')) return residentialImg;
    if (normalizedType.includes('commercial')) return commercialImg;
    if (normalizedType.includes('industrial')) return industrialImg;
    if (normalizedType.includes('mix')) return mixDevImg;
    if (normalizedType.includes('office')) return officeImg;
    
    return commercialImg;
  };

  const getStatusColor = (status) => {
    switch((status || '').toLowerCase()) {
      case 'upcoming': return '#4285F4'; // Google Blue
      case 'in progress': return '#FBBC05'; // Google Yellow
      case 'completed': return '#34A853'; // Google Green
      case 'on hold': return '#EA4335'; // Google Red
      default: return '#5F6368'; // Google Gray
    }
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredProjects.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  const calculateCardStyle = (index) => {
    const total = filteredProjects.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    if (index === currentIndex) {
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: 10,
        opacity: 1,
        filter: 'none',
      };
    } else if (index === prevIndex) {
      return {
        transform: 'translateX(-100%) scale(0.9)',
        zIndex: 5,
        opacity: 0.9,
        filter: 'brightness(0.9)',
      };
    } else if (index === nextIndex) {
      return {
        transform: 'translateX(100%) scale(0.9)',
        zIndex: 5,
        opacity: 0.9,
        filter: 'brightness(0.9)',
      };
    } else {
      return {
        transform: 'translateX(0) scale(0)',
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
      };
    }
  };

  return (
    <div 
      className="projects-section" 
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e8eaed 100%)',
        padding: '30px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <div 
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px',
          position: 'relative',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#1e3a8a',
            marginBottom: '16px',
            position: 'relative',
            display: 'inline-block',
          }}>
            <span style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '4px',
              color: '#1e3a8a',
              borderRadius: '2px'
            }}></span>
            Upcoming Projects
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgb(233, 13, 13)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover our mechanical, electrical, and plumbing projects transforming Sri Lanka's infrastructure
          </p>
        </div>

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            marginBottom: '40px'
          }}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={{
                width: '350px',
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
              }}>
                <div style={{
                  height: '220px',
                  backgroundColor: '#f1f3f4',
                  position: 'relative',
                  overflow: 'hidden'
                }}></div>
                <div style={{ padding: '24px' }}>
                  <div style={{
                    height: '24px',
                    backgroundColor: '#f1f3f4',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    width: '80%'
                  }}></div>
                  <div style={{
                    height: '16px',
                    backgroundColor: '#f1f3f4',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    width: '60%'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div 
            ref={carouselRef}
            style={{
              position: 'relative',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              width: '100%',
              perspective: '1000px'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button 
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '20px',
                zIndex: 20,
                background: 'white',
                border: '2px solid #4285F4',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                ':hover': {
                  background: '#4285F4',
                  borderColor: '#4285F4',
                  '& svg': {
                    stroke: 'white'
                  }
                }
              }}
              aria-label="Previous project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" style={{ transition: 'all 0.3s ease' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              position: 'relative'
            }}>
              {filteredProjects.map((project, index) => (
                <div
                  key={project._id}
                  style={{
                    position: 'absolute',
                    transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    width: '350px',
                    ...calculateCardStyle(index)
                  }}
                >
                  <Link 
                    to={`/projects/${project._id}`} 
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                      height: '420px',
                      transition: 'all 0.3s ease',
                      ':hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                      }
                    }}>
                      <div style={{
                        height: '220px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <img 
                          src={getCategoryImage(project.type)} 
                          alt={project.title} 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          backdropFilter: 'blur(4px)'
                        }}>
                          {project.type || 'Commercial'}
                        </div>
                        <div style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          right: '0',
                          height: '60px',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: '16px',
                          color: 'white'
                        }}>
                          <h3 style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            margin: 0,
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                          }}>
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      <div style={{ padding: '24px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '16px',
                          color: '#5F6368',
                          fontSize: '14px'
                        }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                          {project.contractor || 'Contractor not specified'}
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '20px'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#5F6368',
                            fontSize: '14px'
                          }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            {project.startDate ? format(new Date(project.startDate), 'MMM yyyy') : 'TBD'}
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#5F6368',
                            fontSize: '14px'
                          }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                           
                          </div>
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 700,
                            backgroundColor: `rgba(${parseInt(getStatusColor(project.status).slice(1, 3), 16)}, ${parseInt(getStatusColor(project.status).slice(3, 5), 16)}, ${parseInt(getStatusColor(project.status).slice(5, 7), 16)}, 0.1)`,
                            color: getStatusColor(project.status)
                          }}>
                            {project.status || 'Status unknown'}
                          </span>
                          
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#4285F4',
                            fontWeight: 600,
                            fontSize: '14px',
                            transition: 'all 0.3s ease',
                            ':hover': {
                              color: '#EA4335'
                            }
                          }}>
                            View Details
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ marginLeft: '6px' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <button 
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '20px',
                zIndex: 20,
                background: 'white',
                border: '2px solid #4285F4',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                ':hover': {
                  background: '#4285F4',
                  borderColor: '#4285F4',
                  '& svg': {
                    stroke: 'white'
                  }
                }
              }}
              aria-label="Next project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" style={{ transition: 'all 0.3s ease' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              marginBottom: '20px',
              color: '#4285F4'
            }}>
              No projects found
            </h3>
            <p style={{ 
              color: '#5F6368', 
              marginBottom: '30px',
              fontSize: '16px'
            }}>
              {searchTerm ? 'No projects match your search criteria.' : 'There are currently no upcoming projects.'}
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  backgroundColor: '#4285F4',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: '#3367D6',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link 
            to="/projects" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 32px',
              backgroundColor: '#4285F4',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgb(32, 97, 203, 0.3)',
              ':hover': {
                backgroundColor: '#3367D6',
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 20px rgba(0, 1, 3, 0.4)'
              }
            }}
          >
            Explore All Projects
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ marginLeft: '8px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;