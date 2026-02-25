import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiMail } from 'react-icons/fi';
import { MdFlight } from 'react-icons/md';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="logo">
          <div className="logo-icon"><MdFlight size={20} /></div>
          <span>Pacific Travel</span>
        </div>
      </div>
      <div className="header-right">
        <div className="header-icon">
          <FiBell size={20} />
          <div className="notification-badge"></div>
        </div>
        <div className="header-icon">
          <FiMail size={20} />
        </div>
        <div className="user-profile" onClick={() => navigate('/login')}>
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <div className="user-name">Admin User</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
