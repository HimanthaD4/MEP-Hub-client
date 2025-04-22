<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
    
</head>
<body>

<header>
    <h1>MEPHub.lk - Professional Network for Sri Lanka's MEP Industry</h1>
<!--     <div>
        <img src="https://github.com/HimanthaD4/MEP-Hub-client/blob/main/src/images/logo.png" alt="MEPHub Logo" class="logo">
    </div> -->
    <p>
        A MERN stack professional networking platform connecting Mechanical, Electrical, and Plumbing (MEP) professionals,
        consultants, contractors, and suppliers across Sri Lanka's construction industry.
    </p>
</header>

<h2>Project Overview</h2>
<p>
    MEPHub.lk is a comprehensive professional networking platform specifically designed for Sri Lanka's MEP (Mechanical, 
    Electrical, Plumbing) industry. The platform facilitates connections between professionals, showcases projects, 
    and enables business opportunities in the construction sector.
</p>
<p>
    <strong>Live Demo:</strong> <a href="https://mephub.lk" target="_blank">https://mephub.lk</a>
</p>

<h2>Key Professional Features</h2>
<div class="feature-list">
    <ul>
        <li><strong>Professional Directory:</strong> Comprehensive database of MEP professionals, consultants, and contractors with advanced search and filtering</li>
        <li><strong>Project Showcase:</strong> Platform for professionals to showcase completed and ongoing projects with technical specifications</li>
        <li><strong>Business Networking:</strong> Secure messaging and connection system between industry professionals</li>
        <li><strong>Job Portal:</strong> Dedicated section for MEP-related job postings and career opportunities</li>
        <li><strong>Supplier Marketplace:</strong> Directory of MEP equipment suppliers and material providers</li>
    </ul>
</div>

<h2>Technical Implementation</h2>
<p>
    The application is built with the MERN stack (MongoDB, Express, React, Node.js) with a focus on performance,
    scalability, and security - critical requirements for a professional industry platform.
</p>

<h3>Technology Stack</h3>
<div class="tech-stack">
    <div class="tech-item">MongoDB Atlas</div>
    <div class="tech-item">Express.js</div>
    <div class="tech-item">React.js</div>
    <div class="tech-item">Node.js</div>
    <div class="tech-item">JWT Authentication</div>
    <div class="tech-item">Vercel (Frontend)</div>
    <div class="tech-item">Render (Backend)</div>
</div>

<h3>Key Technical Features</h3>
<ul>
    <li><strong>Advanced Search:</strong> Elasticsearch integration for fast, relevant professional and project searches</li>
    <li><strong>Responsive Design:</strong> Mobile-first approach with Tailwind CSS for seamless cross-device experience</li>
    <li><strong>Performance Optimization:</strong> Code splitting, lazy loading, and Redis caching for fast load times</li>
    <li><strong>Security:</strong> JWT authentication, rate limiting, and input sanitization</li>
</ul>


</div>

<h2>Installation & Deployment</h2>
<p>
    The application is designed for professional deployment with CI/CD pipelines and containerization.
</p>

<h3>Prerequisites</h3>
<ul>
    <li>Node.js 16+</li>
    <li>MongoDB Atlas cluster</li>
    <li>Redis server</li>
    <li>AWS S3 bucket (for document storage)</li>
</ul>

<h3>Environment Setup</h3>
<pre><code># Clone the repository
git clone https://github.com/yourusername/mephub.git
cd mephub

# Install dependencies
cd client && npm install
cd ../server && npm install

# Set up environment variables
cp .env.example .env
# Configure your MongoDB, JWT, AWS, and other keys in the .env file</code></pre>

<h3>Running Locally</h3>
<pre><code># Start development servers
cd server && npm run dev  # Starts backend on port 5000
cd client && npm start    # Starts frontend on port 3000</code></pre>

<h3>Production Deployment</h3>
<p>
    The application is deployed with a professional CI/CD pipeline:
</p>
<ul>
    <li><strong>Frontend:</strong> Hosted on Vercel with automatic deployments from main branch</li>
    <li><strong>Backend:</strong> Containerized with Docker and deployed on Render</li>
    <li><strong>Database:</strong> MongoDB Atlas with automated backups</li>
    <li><strong>Monitoring:</strong> New Relic APM for performance monitoring</li>
</ul>

<h2>Professional Development Highlights</h2>
<ul>
    <li>Implemented <span class="highlight">role-based access control</span> for different user types (professionals, contractors, admin)</li>
    <li>Developed <span class="highlight">PDF report generation</span> for project documentation and professional profiles</li>
    <li>Created <span class="highlight">analytics dashboard</span> with Chart.js to visualize industry trends</li>
    <li>Integrated <span class="highlight">secure payment gateway</span> for premium memberships (Stripe integration)</li>
    <li>Optimized <span class="highlight">search performance</span> with Elasticsearch for large professional datasets</li>
    <li>Implemented <span class="highlight">CI/CD pipeline</span> with GitHub Actions for automated testing and deployment</li>
</ul>

<h2>Client Testimonial</h2>
<blockquote>
    "The MEPHub platform has transformed how professionals in Sri Lanka's construction industry connect and collaborate.
    The technical implementation is robust, secure, and perfectly tailored to our industry's specific needs."
    <br><br>
    <strong>- Industry Partner, Major Construction Firm</strong>
</blockquote>

<h2>Future Roadmap</h2>
<ul>
    <li>Integration with BIM (Building Information Modeling) tools</li>
    <li>Advanced project collaboration features</li>
    <li>Mobile application development</li>
    <li>AI-powered professional matching system</li>
    <li>Expansion to other regional markets</li>
</ul>

</body>
</html>
