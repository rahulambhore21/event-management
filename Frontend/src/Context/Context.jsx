import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create the context
const ApiContext = createContext();

// Hook to use the API context
export const useApi = () => useContext(ApiContext);

// Provider component
export const ApiProvider = ({ children }) => {
  // Set the base URL for API calls - can be updated for production
  const [baseUrl, setBaseUrl] = useState('https://event-management-backend-nx6s.onrender.com');
  
  // Create axios instance with default config
  const api = axios.create({
    baseURL: baseUrl,
  });

  // Add token to requests if available
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // API utility methods
  const apiMethods = {
    // Auth methods
    login: async (email, password) => {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    },
    
    register: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    
    // Event methods
    getEvents: async () => {
      const response = await api.get('/events');
      return response.data;
    },
    
    getEvent: async (id) => {
      const response = await api.get(`/events/${id}`);
      return response.data;
    },
    
    createEvent: async (eventData) => {
      const response = await api.post('/events', eventData);
      return response.data;
    },
    
    updateEvent: async (id, eventData) => {
      const response = await api.put(`/events/${id}`, eventData);
      return response.data;
    },
    
    deleteEvent: async (id) => {
      const response = await api.delete(`/events/${id}`);
      return response.data;
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
