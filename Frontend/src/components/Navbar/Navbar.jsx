import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <Link to="/">Event Management</Link>
        </div>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        
        <ul className={mobileMenuOpen ? 'active' : ''}>
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link> 
          </li>
          <li>
            <Link to="/addevent" onClick={() => setMobileMenuOpen(false)}>Add Event</Link> 
          </li>
          {/* <li>
            <Link to="/services">Services</Link> 
          </li>
          <li>
            <Link to="/contact">Contact</Link> 
          </li> */}
          {user ? (
            <li>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>{user.name}</Link>
            </li>
          ) : (
            <button className='login-button'>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            </button>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar