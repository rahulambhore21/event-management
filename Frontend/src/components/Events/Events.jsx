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
        const data = await api.getEvents();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [api]);

  if (loading) {
    return <p className="text-center">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <>
      <h1 className='text-center font-bold text-5xl mb-20'>Events</h1>
      <div className="events-container">
        {events.map(event => (
          <Link to={`/event/${event._id}`} key={event._id}>
            <Eventcard title={event.title} description={event.description} img={event.img} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Events;