import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaCalendarAlt, FaPlusCircle, FaBars } from 'react-icons/fa';  // Importing Font Awesome icons
import './Navbar.css';

const Navbar: React.FC = () => {
  const { logout } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // State to toggle the menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);  // Toggle the menu visibility
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">PartyBoard 🎉</h1>
        
        {/* Hamburger icon for small screens */}
        <div className="hamburger-icon" onClick={toggleMenu}>
          <FaBars />
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-button">
            <FaCalendarAlt style={{ marginRight: '8px' }} /> View Party
          </Link>
          <Link to="/add-party" className="navbar-button">
            <FaPlusCircle style={{ marginRight: '8px' }} /> Add Party
          </Link>
          <Link to="/chat-gpt" className="navbar-button">
            Chat GPT
          </Link>
          <Link
            to="/"
            className="navbar-button logout-button"
            onClick={() => logout()}
          >
            <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
