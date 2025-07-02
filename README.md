# ⚙️ MEPHub.lk - Professional Network Platform for Sri Lanka's MEP Industry ⚙️

<p align="center">
  <img src="https://github.com/HimanthaD4/MEP-Hub-client/blob/main/src/images/logo.png?raw=true" alt="MEPHub Logo" width="120" />
</p>

<h2 align="center">Connecting Sri Lanka's MEP Professionals for a Better Tomorrow</h2>

---

## 🌐 Live Demo

Explore the platform live:  
➡️ [https://mephub.lk](https://mephub.lk)

Admin Panel:  
➡️ [https://mephub.lk/admin](https://mephub.lk/admin/)

---

## 📂 Repository Links

| Repository        | Description                             | Link                                                                                      |
|-------------------|-----------------------------------------|-------------------------------------------------------------------------------------------|
| Frontend Client   | React.js frontend codebase              | [MEPHub Client Frontend](https://github.com/HimanthaD4/MEP-Hub-client)                   |
| Backend Server    | Node.js + Express backend API           | [MEPHub Backend Server](https://github.com/HimanthaD4/MEP-Hub-server)                    |

---

## 🔍 Project Overview

MEPHub.lk is a **MERN stack** professional networking platform tailored exclusively for Sri Lanka’s Mechanical, Electrical, and Plumbing (MEP) industry. The platform connects professionals, consultants, contractors, and suppliers to promote collaboration and business growth within the construction sector.

✅ **Frontend:** React.js with clean, responsive layout using normal CSS (no frameworks)  
✅ **Backend:** Node.js, Express.js, MongoDB Atlas for data and file storage  
✅ **Image Storage:** Directly inside MongoDB  
✅ **No Payment Integration**  
✅ **Admin Panel Access:** `/admin` route for admin-level management  

---

## ✨ Key Features

- 🌐 **Professional Directory** - Searchable database of MEP professionals and contractors  
- 🏗️ **Project Showcase** - Share and explore technical projects  
- 💬 **Business Networking** - Secure messaging and connections  
- 📄 **Job Portal** - MEP-specific job listings  
- 🛠️ **Supplier Marketplace** - Equipment suppliers and vendor directory  
- 🔒 **Role-Based Access** - Different permissions for professionals, contractors, admins  
- 📑 **PDF Reports** - Generate reports for projects and profiles  
- 📊 **Analytics Dashboard** - Visualize industry trends with Chart.js  
- ⚙️ **Admin Panel** - Manage users, content, and data at `/admin`  

---

## 🖼️ Screenshots

<div align="center">

| ![Admin Panel](https://github.com/HimanthaD4/MEP-Hub-client/blob/main/src/images/sreenshots/adminpanel.png?raw=true) | ![Cards on Home](https://github.com/HimanthaD4/MEP-Hub-client/blob/main/src/images/sreenshots/cards.png?raw=true) | ![Featured Projects](https://github.com/HimanthaD4/MEP-Hub-client/blob/main/src/images/sreenshots/featuredProjects.png?raw=true) |
|:--------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------:|
| **Admin Panel**                                                                        | **Home Page Cards**                                                                   | **Featured Projects**                                                                          |

| ![Home Page](https://github.com/HimanthaD4/MEP-Hub-client/blob/main/src/images/sreenshots/home.png?raw=true) | ![Project Details](https://github.com/HimanthaD4/MEP-Hub-client/blob/main/src/images/sreenshots/projectDetails.png?raw=true) |
|:-----------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------:|
| **Home Page**                                                                       | **Project Details Page**                                                                       |

</div>

---

## 🛠️ Technology Stack

| Frontend           | Backend               | Database          | Deployment     | Other Integrations         |
|--------------------|-----------------------|-------------------|----------------|----------------------------|
| React.js           | Node.js + Express.js  | MongoDB Atlas     | Vercel (Frontend) | JWT Authentication       |
| Normal CSS         | Redis Caching (optional) |                   | Render (Backend) | Elasticsearch (optional) |

---

# ⚙️ Full Installation & Setup Guide

### ✅ Prerequisites

- **Node.js** (v16 or above recommended)  
- **MongoDB Atlas Cluster**  
- **Git**  
- **Redis** *(optional for caching but recommended)*  

---

### ✅ Step 1: Clone the Repositories

```bash
# Clone frontend repository
git clone https://github.com/HimanthaD4/MEP-Hub-client.git

# Clone backend repository
git clone https://github.com/HimanthaD4/MEP-Hub-server.git
```

---

### ✅ Step 2: Install Frontend Dependencies

```bash
cd MEP-Hub-client
npm install
```

---

### ✅ Step 3: Configure Frontend Environment Variables

```bash
cp .env.example .env
```

- Open the `.env` file and update the following:

```bash
REACT_APP_BACKEND_URL=http://localhost:5000
```

Adjust with your backend API URL or production URL if deploying.

---

### ✅ Step 4: Install Backend Dependencies

```bash
cd ../MEP-Hub-server
npm install
```

---

### ✅ Step 5: Configure Backend Environment Variables

```bash
cp .env.example .env
```

- Open `.env` and set the required values:

```bash
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string (optional)
JWT_SECRET=your_secret_key
```

---

### ✅ Step 6: Run the Project Locally

**Backend Terminal**

```bash
cd MEP-Hub-server
npm run dev
# Backend API will run at: http://localhost:5000
```

**Frontend Terminal**

```bash
cd MEP-Hub-client
npm start
# Frontend app will run at: http://localhost:3000
```

---

### ✅ Step 7: Access the Application

- Main site: [http://localhost:3000](http://localhost:3000)  
- Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin/)  


---

## 🚀 Production Overview

| Component    | Deployment Platform   | Notes                                  |
|--------------|-----------------------|----------------------------------------|
| Frontend     | Vercel                | Automatic deployments from GitHub      |
| Backend API  | Render                | Secure, scalable backend deployment    |
| Database     | MongoDB Atlas         | Cloud-hosted database with file storage |


---

## 📈 Future Roadmap

- BIM tool integrations  
- AI-powered professional matching  
- Enhanced collaboration tools  
- Mobile applications for iOS & Android  
- Expansion to international markets  

---

## 🤝 Contribution Guidelines

We welcome contributions!

```bash
# Fork the repository
# Create a new branch
git checkout -b feature-name

# Make your changes
git commit -m "Add new feature"

# Push to your branch
git push origin feature-name

# Open a Pull Request
```

