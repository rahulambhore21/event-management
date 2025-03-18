import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>
          <h1 className="profile-heading">Welcome, {user.name}</h1>
        </div>
        
        <div className="profile-card">
          <h2 className="section-title">Personal Information</h2>
          <div className="profile-info">
            <div className="info-label">Email:</div>
            <div className="info-value">{user.email}</div>
          </div>
          {user.username && (
            <div className="profile-info">
              <div className="info-label">Username:</div>
              <div className="info-value">{user.username}</div>
            </div>
          )}
        </div>
        
        <div className="profile-actions">
          <Link to="/edit-profile" className="btn edit-button">Edit Profile</Link>
          <Link to="/my-events" className="btn events-button">My Events</Link>
          <Link to='/login' className="btn logout-button" onClick={handleLogout}>Logout</Link>
        </div>
      </div>
    </div>
  )
}

export default Profile;