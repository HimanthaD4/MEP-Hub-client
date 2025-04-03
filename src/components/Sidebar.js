import React from 'react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={closeSidebar}>×</button>
      <nav>
        <a href="/" onClick={closeSidebar}>Home</a>
        <a href="/about" onClick={closeSidebar}>About</a>
        <a href="/services" onClick={closeSidebar}>Services</a>
        <a href="/contact" onClick={closeSidebar}>Contact</a>
        {isAuthenticated && (
          <>
            {user?.userType === 'admin' ? (
              <a href="/admin" onClick={closeSidebar}>Admin Panel</a>
            ) : (
              <a href="/member" onClick={closeSidebar}>Member Panel</a>
            )}
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;