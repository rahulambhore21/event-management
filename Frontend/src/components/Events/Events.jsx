import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Events.css';
import Eventcard from './Eventcard';
import { useApi } from '../../Context/Context';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const api = useApi();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await api.getEvents();
        setEvents(data);
        setError('');
      } catch (err) {
        console.error("Error fetching events:", err);
        setError('Failed to fetch events. Using cached or sample data if available.');
        // The API context will handle fallback to mock data if needed
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [api]);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading events...</p>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // If we have no events and an error, show a more user-friendly message
  if (error && events.length === 0) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <p>Our services might be temporarily unavailable. Please try again later.</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {error && <p className="warning-banner">{error}</p>}
      <h1 className='text-center font-bold text-5xl mb-20'>Events</h1>
      <div className="events-container">
        {events.length > 0 ? (
          events.map(event => (
            <Link to={`/event/${event._id}`} key={event._id}>
              <Eventcard 
                title={event.title} 
                description={event.description} 
                img={event.img} 
                date={event.date}
              />
            </Link>
          ))
        ) : (
          <p className="no-events-message">No events found. Be the first to create an event!</p>
        )}
      </div>
    </>
  );
}

export default Events;