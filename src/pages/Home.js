import React, { useState } from 'react';
import constructionImage from '../images/download.png';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'projects', name: 'Upcoming Projects' },
    { id: 'consultants', name: 'Consultants' },
    { id: 'contractors', name: 'Contractors' },
    { id: 'suppliers', name: 'Suppliers & Dealers' },
    { id: 'approvals', name: 'Approval Authorities' },
    { id: 'education', name: 'Educational Institutions' },
    { id: 'jobs', name: 'Job Vacancies' },
    { id: 'seekers', name: 'Job Seekers' },
    { id: 'trainees', name: 'Trainees' },
    { id: 'directors', name: 'Company Directors' }
  ];

  const sampleData = {
    projects: [
      { id: 1, title: 'Colombo City Tower', location: 'Colombo', type: 'Commercial', date: '2023-10-15' },
      { id: 2, title: 'Galle Resort Development', location: 'Galle', type: 'Hospitality', date: '2023-11-20' },
      { id: 3, title: 'Kandy Housing Complex', location: 'Kandy', type: 'Residential', date: '2024-01-05' }
    ],
    consultants: [
      { id: 1, name: 'ABC Engineering', specialization: 'Structural Design', rating: 4.8 },
      { id: 2, name: 'XYZ Architects', specialization: 'Building Design', rating: 4.5 },
      { id: 3, name: 'MEP Solutions', specialization: 'MEP Systems', rating: 4.7 }
    ],
    contractors: [
      { id: 1, name: 'BuildMax Ltd', specialization: 'High-rise Buildings', completed: 42 },
      { id: 2, name: 'Construct Plus', specialization: 'Infrastructure', completed: 35 },
      { id: 3, name: 'Urban Developers', specialization: 'Residential', completed: 28 }
    ]
  };

  const getFilteredData = () => {
    if (activeCategory === 'all') {
      return Object.values(sampleData).flat();
    }
    return sampleData[activeCategory] || [];
  };

  const filteredData = getFilteredData().filter(item => 
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <div style={{ 
        position: 'relative',
        padding: '100px 32px 100px',
        background: 'linear-gradient(to bottom right, #f8fafc 0%, #f1f5f9 100%)',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <img 
          src={constructionImage} 
          alt="Construction professionals"
          style={{
            position: 'absolute',
            right: '10%',
            bottom: '45%',
            width: '500px',
            opacity: 0.9,
            zIndex: 1
          }}
        />
        
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,86,219,0.08) 0%, rgba(26,86,219,0) 70%)',
          zIndex: 0
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, rgba(26,86,219,0.05) 0%, rgba(26,86,219,0) 100%)',
          transform: 'rotate(45deg)',
          zIndex: 0
        }}></div>
        
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left'
        }}>
          <h1 style={{
            fontSize: '72px',
            fontWeight: 700,
            marginBottom: '24px',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            color: '#111827',
            fontFamily: "'Outfit', sans-serif",
            textShadow: '0 2px 4px rgba(0,0,0,0.05)',
            maxWidth: '700px'
          }}>
            <span style={{ 
              background: 'linear-gradient(90deg, #1a56db 0%, #0ea5e9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              MEP Hub
            </span> - Connecting Sri Lanka's Construction Ecosystem
          </h1>
          
          <p style={{
            fontSize: '24px',
            fontWeight: 400,
            marginBottom: '48px',
            color: '#4b5563',
            maxWidth: '600px',
            lineHeight: 1.5,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            Your premier digital platform linking <strong style={{ color: '#1a56db', fontWeight: 600 }}>projects</strong>, <strong style={{ color: '#1a56db', fontWeight: 600 }}>professionals</strong>, and <strong style={{ color: '#1a56db', fontWeight: 600 }}>providers</strong> in Sri Lanka's booming construction industry.
          </p>
          
          <div style={{
            position: 'relative',
            maxWidth: '700px',
            width: '100%',
            zIndex: 2,
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'flex',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              height: '68px',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <input
                type="text"
                placeholder="Search projects, consultants, materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0 28px',
                  border: 'none',
                  fontSize: '18px',
                  outline: 'none',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 400
                }}
              />
              <button style={{
                padding: '0 36px',
                backgroundColor: '#1a56db',
                color: 'white',
                border: 'none',
                fontSize: '18px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: "'Outfit', sans-serif",
                ':hover': {
                  backgroundColor: '#1e40af'
                }
              }}>
                Discover
              </button>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              backgroundColor: 'rgba(26,86,219,0.08)',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a56db',
              fontFamily: "'Outfit', sans-serif"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ marginRight: '8px' }}>
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              250+ Active Projects
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              backgroundColor: 'rgba(26,86,219,0.08)',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a56db',
              fontFamily: "'Outfit', sans-serif"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ marginRight: '8px' }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              1,200+ Verified Professionals
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '80px 32px',
        position: 'relative',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{
          position: 'sticky',
          top: '100px',
          zIndex: 10,
          marginBottom: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '50px',
                  backgroundColor: activeCategory === category.id ? '#1a56db' : '#f8fafc',
                  color: activeCategory === category.id ? 'white' : '#4b5563',
                  border: activeCategory === category.id ? 'none' : '1px solid rgba(0,0,0,0.1)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                  ':hover': {
                    backgroundColor: activeCategory === category.id ? '#1e40af' : '#f1f5f9'
                  }
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ 
            fontSize: '42px',
            fontWeight: 700,
            marginBottom: '32px',
            color: '#111827',
            letterSpacing: '-1px'
          }}>
            {activeCategory === 'all' ? 'Featured Listings' : `Premium ${categories.find(c => c.id === activeCategory)?.name}`}
          </h2>
          
          {filteredData.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '32px'
            }}>
              {filteredData.slice(0, 6).map(item => (
                <div key={item.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.05)',
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                  }
                }}>
                  <div style={{
                    height: '200px',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {item.image ? (
                      <img src={item.image} alt={item.title || item.name} style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        ':hover': {
                          transform: 'scale(1.05)'
                        }
                      }} />
                    ) : (
                      <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 500,
                        color: '#64748b'
                      }}>
                        {item.title || item.name}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ 
                      fontSize: '20px',
                      fontWeight: 700,
                      marginBottom: '12px',
                      color: '#111827'
                    }}>
                      {item.title || item.name}
                    </h3>
                    {item.location && (
                      <p style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#64748b',
                        marginBottom: '12px',
                        fontSize: '16px'
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {item.location}
                      </p>
                    )}
                    {item.type && (
                      <div style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '50px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#1a56db',
                        marginBottom: '16px'
                      }}>
                        {item.type}
                      </div>
                    )}
                    {item.date && (
                      <p style={{ 
                        color: '#64748b',
                        marginBottom: '16px',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Starts {new Date(item.date).toLocaleDateString()}
                      </p>
                    )}
                    <a href="#" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '12px 24px',
                      backgroundColor: '#f8fafc',
                      color: '#1a56db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      marginTop: '8px',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(26,86,219,0.2)',
                      ':hover': {
                        backgroundColor: '#1a56db',
                        color: 'white'
                      }
                    }}>
                      Explore Details
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ marginLeft: '8px' }}>
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              padding: '60px 40px',
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              textAlign: 'center',
              border: '1px dashed rgba(0,0,0,0.1)'
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" style={{ marginBottom: '20px' }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#1e293b'
              }}>
                No matching results found
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '16px',
                maxWidth: '500px',
                margin: '0 auto 24px'
              }}>
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#1a56db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    backgroundColor: '#1e40af'
                  }
                }}
              >
                Clear Search
              </button>
            </div>
          )}

          {filteredData.length > 6 && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <a href="#" style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: '#1a56db',
                color: 'white',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                ':hover': {
                  backgroundColor: '#1e40af',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 20px rgba(26,86,219,0.2)'
                }
              }}>
                View All {categories.find(c => c.id === activeCategory)?.name}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ marginLeft: '12px' }}>
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          )}
        </div>

        <div style={{ 
          backgroundColor: '#f8fafc',
          borderRadius: '16px',
          padding: '80px 60px',
          marginBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,86,219,0.05) 0%, rgba(26,86,219,0) 70%)',
            zIndex: 0
          }}></div>
          
          <div style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1000px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 700,
              marginBottom: '24px',
              color: '#111827',
              letterSpacing: '-1px'
            }}>
              Why Choose <span style={{ color: '#1a56db' }}>MEP Hub</span>?
            </h2>
            
            <p style={{
              fontSize: '20px',
              color: '#4b5563',
              marginBottom: '60px',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6
            }}>
              We're revolutionizing how Sri Lanka's construction industry connects and collaborates.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              textAlign: 'left'
            }}>
              {[
                {
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  ),
                  title: "Industry-Leading Network",
                  description: "Access Sri Lanka's most comprehensive directory of construction professionals and projects."
                },
                {
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  ),
                  title: "Verified Professionals",
                  description: "All listings are thoroughly vetted to ensure quality and reliability."
                },
                {
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  ),
                  title: "Seamless Collaboration",
                  description: "Our platform makes it easy to connect and work with the right partners."
                }
              ].map((feature, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '32px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.05)',
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                  }
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'rgba(26,86,219,0.1)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: '#111827'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    lineHeight: 1.6,
                    fontSize: '16px'
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#1a56db',
          borderRadius: '16px',
          padding: '80px 40px',
          textAlign: 'center',
          backgroundImage: 'radial-gradient(circle at top right, rgba(14,165,233,0.2) 0%, rgba(26,86,219,0) 50%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
            zIndex: 0
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 700,
              marginBottom: '24px',
              color: 'white',
              letterSpacing: '-1px'
            }}>
              Ready to Transform Your Construction Projects?
            </h2>
            
            <p style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '40px',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6
            }}>
              Join Sri Lanka's fastest growing construction network today and unlock new opportunities.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button style={{
                padding: '16px 32px',
                backgroundColor: 'white',
                color: '#1a56db',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}>
                Get Started
              </button>
              
              <button style={{
                padding: '16px 32px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                }
              }}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;