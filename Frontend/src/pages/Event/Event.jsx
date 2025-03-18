import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Event.css";
import Navbar from "../../components/Navbar/Navbar";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch event. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const token = localStorage.getItem('token');
  const registerForEvent = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/events/${id}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Successfully registered for the event!');
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('You have already registered for this event.');
      } else {
        setError(`Failed to register for the event. Please try again later ${err}`);
      }
      setSuccess('');
    }
  };

  if (loading) {
    return <p className="text-center">Loading event...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  if (success) {
    return <p className="text-center text-success">{success}</p>;
  }

  if (!event) {
    return <p className="text-center">Event not found</p>;
  }

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    } catch (err) {
      return dateString;
    }
  };

  // Format registration deadline
  const formatDeadline = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      
      const diffTime = date.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 0) {
        return "Closed";
      } else if (diffDays === 1) {
        return "Last day!";
      } else if (diffDays <= 3) {
        return `${diffDays} days left!`;
      } else {
        return formatDate(dateString);
      }
    } catch (err) {
      return dateString;
    }
  };

  return (
    <>
      <Navbar />
      <div className="event-container">
        <div className="event-img">
          <img src={event.img} alt={event.title} />
        </div>
        <div className="event-content">
          <div className="register p-4 rounded-3xl">
            <h2 className="font-bold text-4xl text-blue-800">₹{event.price}</h2>
            <button 
              className="bg-blue-800 p-2 text-center text-2xl font-bold text-white rounded-2xl w-100"
              onClick={registerForEvent}
            >
              Register Now
            </button>
            <h2 className="text-lg">
              <span className="font-semibold block">Registration Deadline</span> 
              <span className="font-bold text-red-600 block">{formatDeadline(event.registrationDeadline)}</span>
            </h2>
            <h4 className="text-lg">
              <span className="font-semibold">People registered:</span>{" "}
              <span className="font-bold text-blue-600">{event.registeredCount}</span>
            </h4>
          </div>
          <div className="eligiblilty rounded-3xl p-7">
            <h2 className="font-bold text-xl text-blue-800 mb-3">Eligibility Criteria</h2>
            <p>{event.eligibility}</p>
          </div>
        </div>
        <div className="event-details">
          <h1 className="font-bold text-4xl">{event.title}</h1>
          
          <div className="detail-section">
            <h2 className="font-bold text-xl">Category: <span className="font-normal text-gray-700">{event.category}</span></h2>
            <h2 className="font-bold text-xl">Location: <span className="font-normal text-gray-700">{event.location}</span></h2>
            <h2 className="font-bold text-xl">Date: <span className="font-normal text-gray-700">{formatDate(event.date)}</span></h2>
            <h2 className="font-bold text-xl">Time: <span className="font-normal text-gray-700">{formatTime(event.time)}</span></h2>
          </div>
          
          <div className="description-section">
            <h2 className="font-bold text-2xl">About This Event</h2>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
