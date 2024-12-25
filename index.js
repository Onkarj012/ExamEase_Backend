const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const classroomRoutes = require("./routes/classroomRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // HTTP request logger

// Use user routes
app.use('/api/users', userRoutes);

// Use test routes
app.use('/api/tests', testRoutes);

// Use classroom routes
app.use('/api/classrooms', classroomRoutes); // Fixed missing leading slash

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong! Please try again later.' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
  });
});

module.exports = app;
