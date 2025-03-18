const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const corsMiddleware = require('./middleware/cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Apply custom CORS middleware first
app.use(corsMiddleware);

// Use cors package with proper configuration
app.use(cors({
  origin: ['https://event-management-frontend-kqj6.onrender.com', 'http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  maxAge: 86400
}));

app.use(express.json());

// Monitoring route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// CORS test endpoint
app.get('/cors-test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'CORS is properly configured!',
    origin: req.headers.origin || 'Unknown'
  });
});

// Request logging middleware with improved details
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'Unknown'} - IP: ${req.ip}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.get('/', (req, res) => res.send('Event Management API'));

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));