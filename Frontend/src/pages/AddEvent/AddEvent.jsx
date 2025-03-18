import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEvent.css';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [price, setPrice] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add an event.');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/events',
        { title, description, date, time, location, category, img, price, registrationDeadline, eligibility },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Event created successfully!');
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-event-page">
      <div className="add-event-container">
        <h2 className="page-title">Create New Event</h2>
        {error && <div className="alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="section-header">Event Details</h3>
            
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Event Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                placeholder="Provide details about your event"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="Event venue or online platform"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="section-header">Category & Presentation</h3>
            
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="img" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="img"
                placeholder="Paste an image URL for your event"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />
              {img && (
                <div className="image-preview">
                  <img src={img} alt="Event preview" />
                </div>
              )}
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="section-header">Registration Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Price (₹)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder="0 for free events"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="registrationDeadline" className="form-label">
                  Registration Deadline
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="registrationDeadline"
                  value={registrationDeadline}
                  onChange={(e) => setRegistrationDeadline(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="eligibility" className="form-label">
                Eligibility
              </label>
              <input
                type="text"
                className="form-control"
                id="eligibility"
                placeholder="Who can attend this event?"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Event...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;