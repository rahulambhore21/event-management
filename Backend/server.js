const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Configure CORS to allow requests from frontend origins
app.use(cors({
  origin: [
    'https://event-management-frontend-kqj6.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Add a pre-flight OPTIONS handler for all routes
app.options('*', cors());

// Test route to check if CORS headers are working
app.get('/cors-test', (req, res) => {
  res.json({ message: 'CORS is working' });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.get('/', (req, res) => res.send('Event Management API'));
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));