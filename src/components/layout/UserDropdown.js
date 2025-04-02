// src/components/layout/UserDropdown.js
import { Link } from 'react-router-dom';

const UserDropdown = ({ onClose, logout }) => {
  return (
    <div className="user-dropdown">
      <Link to="/profile" className="dropdown-item" onClick={onClose}>
        My Profile
      </Link>
      <button className="dropdown-item" onClick={() => {
        logout();
        onClose();
      }}>
        Logout
      </button>
    </div>
  );
};

export default UserDropdown;