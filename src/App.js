// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import Member from './pages/Member';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes with normal header */}
          <Route path="/" element={
            <>
              <Header />
              <main className="container mx-auto px-4 py-6">
                <Home />
              </main>
            </>
          } />
          
          <Route path="/member" element={
            <>
              <Header />
              <main className="container mx-auto px-4 py-6">
                <Member />
              </main>
            </>
          } />
          
          <Route path="/profile" element={
            <>
              <Header />
              <main className="container mx-auto px-4 py-6">
                <Profile />
              </main>
            </>
          } />

          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/admin/login" element={<AdminLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;