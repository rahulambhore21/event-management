import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create the context
const ApiContext = createContext();

// Hook to use the API context
export const useApi = () => useContext(ApiContext);

// Provider component
export const ApiProvider = ({ children }) => {
  // Set the base URL for API calls - can be updated for production
  const [baseUrl, setBaseUrl] = useState('https://event-management-backend-nx6s.onrender.com/api');
  
  // Create axios instance with default config
  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // Important for CORS with credentials
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Add token to requests if available
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle response errors
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.message === 'Network Error') {
        console.error('Network error - CORS issue or server unavailable');
        // You could show a notification to the user here
      }
      return Promise.reject(error);
    }
  );

  // API utility methods
  const apiMethods = {
    // Auth methods
    login: async (email, password) => {
      try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    
    register: async (userData) => {
      try {
        const response = await api.post('/auth/register', userData);
        return response.data;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    
    // Event methods
    getEvents: async () => {
      try {
        const response = await api.get('/events');
        return response.data;
      } catch (error) {
        console.error('Get events error:', error);
        throw error;
      }
    },
    
    getEvent: async (id) => {
      try {
        const response = await api.get(`/events/${id}`);
        return response.data;
      } catch (error) {
        console.error('Get event error:', error);
        throw error;
      }
    },
    
    createEvent: async (eventData) => {
      try {
        const response = await api.post('/events', eventData);
        return response.data;
      } catch (error) {
        console.error('Create event error:', error);
        throw error;
      }
    },
    
    updateEvent: async (id, eventData) => {
      try {
        const response = await api.put(`/events/${id}`, eventData);
        return response.data;
      } catch (error) {
        console.error('Update event error:', error);
        throw error;
      }
    },
    
    deleteEvent: async (id) => {
      try {
        const response = await api.delete(`/events/${id}`);
        return response.data;
      } catch (error) {
        console.error('Delete event error:', error);
        throw error;
      }
    },

    // Test CORS connection
    testConnection: async () => {
      try {
        const response = await api.get('/cors-test');
        return response.data;
      } catch (error) {
        console.error('CORS test failed:', error);
        throw error;
      }
    },

    // Helper method to change the base URL (for production deployment)
    updateBaseUrl: (newUrl) => {
      setBaseUrl(newUrl);
    },

    // Get the current base URL
    getBaseUrl: () => baseUrl
  };

  return (
    <ApiContext.Provider value={apiMethods}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
