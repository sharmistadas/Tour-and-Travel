import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdFlight,
  MdHotel,
  MdDirectionsCar,
  MdPeople,
  MdFeedback,
  MdEmail,
  MdImage,
  MdSettings,
  MdSecurity,
  MdLocalOffer,
} from 'react-icons/md';
import {
  FiCalendar,
  FiGlobe,
  FiPackage,
  FiMap,
  FiMessageSquare,
  FiFileText,
  FiDollarSign,
  FiBarChart2,
  FiUser,
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleLinkClick = () => {
    if (window.innerWidth <= 1024) {
      toggleSidebar();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav>
        <div className="nav-section">
          <div className="nav-section-title">Main</div>
          <NavLink to="/dashboard" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><MdDashboard size={18} /></span>
            <span className="nav-text">Dashboard</span>
          </NavLink>
          <NavLink to="/bookings" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><FiCalendar size={18} /></span>
            <span className="nav-text">Bookings</span>
            <span className="nav-badge">12</span>
          </NavLink>
          <NavLink to="/tour-packages" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><FiGlobe size={18} /></span>
            <span className="nav-text">Tour Packages</span>
          </NavLink>
          <NavLink to="/services" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><FiPackage size={18} /></span>
            <span className="nav-text">Services</span>
          </NavLink>
          <NavLink to="/hotels" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><MdHotel size={18} /></span>
            <span className="nav-text">Hotels</span>
          </NavLink>
          <NavLink to="/flights" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><MdFlight size={18} /></span>
            <span className="nav-text">Flights</span>
          </NavLink>
          <NavLink to="/transportation" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><MdDirectionsCar size={18} /></span>
            <span className="nav-text">Transportation</span>
          </NavLink>
          <NavLink to="/guides" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><FiMap size={18} /></span>
            <span className="nav-text">Guides</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Customer Management</div>
          <NavLink to="/customers" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><MdPeople size={18} /></span>
            <span className="nav-text">Travellers</span>
          </NavLink>
          <NavLink to="/feedback" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><FiMessageSquare size={18} /></span>
            <span className="nav-text">Feedback</span>
          </NavLink>
          <NavLink to="/Enquiry" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><MdEmail size={18} /></span>
            <span className="nav-text">Enquiry</span>
            <span className="nav-badge">5</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Content</div>
          <NavLink to="/blog" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><FiFileText size={18} /></span>
            <span className="nav-text">Blog Posts</span>
          </NavLink>
          <NavLink to="/gallery" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><MdImage size={18} /></span>
            <span className="nav-text">Gallery</span>
          </NavLink>
          <NavLink to="/pages" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><FiFileText size={18} /></span>
            <span className="nav-text">Pages</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Finance</div>
          <NavLink to="/payments" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><FiDollarSign size={18} /></span>
            <span className="nav-text">Payments</span>
          </NavLink>
          <NavLink to="/reports" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><FiBarChart2 size={18} /></span>
            <span className="nav-text">Reports</span>
          </NavLink>
          <NavLink to="/coupons" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><MdLocalOffer size={18} /></span>
            <span className="nav-text">Coupons</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Settings</div>
          <NavLink to="/settings" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><MdSettings size={18} /></span>
            <span className="nav-text">General Settings</span>
          </NavLink>
          <NavLink to="/profile" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><FiUser size={18} /></span>
            <span className="nav-text">Profile</span>
          </NavLink>
          <NavLink to="/security" className="nav-item" onClick={handleLinkClick}>
            <span className="nav-icon"><MdSecurity size={18} /></span>
            <span className="nav-text">Security</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
