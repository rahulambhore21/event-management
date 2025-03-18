import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const ApiContext = createContext();

// Hook to use the API context
export const useApi = () => useContext(ApiContext);

// Provider component
export const ApiProvider = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState('https://event-management-backend-nx6s.onrender.com/api');
  const [isOnline, setIsOnline] = useState(true);
  const [localMode, setLocalMode] = useState(false);
  
  // Sample data for offline/local mode
  const mockData = {
    events: [
      {
        _id: 'mock1',
        title: 'Mock Conference',
        description: 'This is a mock event for testing when API is unavailable',
        date: '2023-12-25',
        time: '10:00',
        location: 'Local Testing Center',
        category: 'Conference',
        img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
        price: 0,
        registrationDeadline: '2023-12-20',
        eligibility: 'Everyone',
        createdBy: { email: 'test@example.com' }
      },
      // Add more mock events if needed
    ],
    user: {
      id: 'mock-user-id',
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin'
    }
  };

  // Check connection status
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await axios.get(`${baseUrl.replace('/api', '')}/health`, { timeout: 5000 });
        setIsOnline(true);
        console.log('Backend server is online');
      } catch (error) {
        setIsOnline(false);
        console.warn('Backend server appears to be offline, using local mode');
        setLocalMode(true);
      }
    };

    checkServerStatus();
  }, [baseUrl]);

  // Create axios instance with default config
  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
  });

  // Add token to requests if available
  api.interceptors.request.use((config) => {
    // Don't add token for OPTIONS requests
    if (config.method === 'options') return config;
    
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
      if (error.message === 'Network Error' || error.response?.status === 502) {
        console.error('Network error - CORS issue or server unavailable');
        setIsOnline(false);
        // Switch to local mode
        if (!localMode) setLocalMode(true);
      }
      return Promise.reject(error);
    }
  );

  // API utility methods
  const apiMethods = {
    // Auth methods
    login: async (email, password) => {
      try {
        if (!isOnline && localMode) {
          // Local mode mockup
          console.log('Using local mode for login');
          const mockUser = {
            token: 'mock-token-12345',
            user: mockData.user
          };
          localStorage.setItem('token', mockUser.token);
          localStorage.setItem('user', JSON.stringify(mockUser.user));
          return mockUser;
        }
        
        const response = await api.post('/auth/login', { email, password });
        return response.data;
      } catch (error) {
        console.error('Login error:', error);
        
        // If we're in local mode or backend is unreachable, use mock data
        if (error.message === 'Network Error' || error.response?.status === 502) {
          console.log('Falling back to mock login');
          const mockUser = {
            token: 'mock-token-12345',
            user: mockData.user
          };
          localStorage.setItem('token', mockUser.token);
          localStorage.setItem('user', JSON.stringify(mockUser.user));
          return mockUser;
        }
        
        throw error;
      }
    },
    
    register: async (userData) => {
      try {
        if (!isOnline && localMode) {
          // Local mode mockup
          console.log('Using local mode for registration');
          const mockUser = {
            token: 'mock-token-12345',
            user: { ...mockData.user, ...userData }
          };
          localStorage.setItem('token', mockUser.token);
          localStorage.setItem('user', JSON.stringify(mockUser.user));
          return mockUser;
        }
        
        const response = await api.post('/auth/register', userData);
        return response.data;
      } catch (error) {
        console.error('Registration error:', error);
        
        if (error.message === 'Network Error' || error.response?.status === 502) {
          console.log('Falling back to mock registration');
          const mockUser = {
            token: 'mock-token-12345',
            user: { ...mockData.user, ...userData }
          };
          localStorage.setItem('token', mockUser.token);
          localStorage.setItem('user', JSON.stringify(mockUser.user));
          return mockUser;
        }
        
        throw error;
      }
    },
    
    // Event methods
    getEvents: async () => {
      try {
        if (!isOnline && localMode) {
          console.log('Using local mode for events');
          return mockData.events;
        }
        
        const response = await api.get('/events');
        return response.data;
      } catch (error) {
        console.error('Get events error:', error);
        
        if (error.message === 'Network Error' || error.response?.status === 502) {
          console.log('Falling back to mock events data');
          return mockData.events;
        }
        
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

    // Helper methods
    isServerOnline: () => isOnline,
    isUsingLocalMode: () => localMode,
    toggleLocalMode: () => setLocalMode(!localMode),
    updateBaseUrl: (newUrl) => setBaseUrl(newUrl),
    getBaseUrl: () => baseUrl
  };

  return (
    <ApiContext.Provider value={apiMethods}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
