import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Discover Amazing Events</h1>
        <p className="hero-subtitle">Join us for unforgettable experiences and connect with like-minded people</p>
        <div className="hero-buttons">
          <Link to="/events" className="btn btn-primary max-w-max">Browse Events</Link>
          <Link to="/addevent" className="btn btn-secondary">Create Event</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;