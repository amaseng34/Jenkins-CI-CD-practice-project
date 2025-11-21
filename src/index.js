/**
 * Simple Express server for Jenkins CI/CD practice
 * Runs on port 3000
 */

const express = require('express');
const { add, subtract, capitalize } = require('./utils');

// Create Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Port configuration (default to 3000)
const PORT = process.env.PORT || 3000;

/**
 * Root endpoint - Hello World
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! Welcome to Jenkins CI/CD Practice Project',
    status: 'success'
  });
});

/**
 * Health check endpoint for monitoring
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * Example endpoint using utility functions
 */
app.get('/api/utils', (req, res) => {
  res.json({
    message: 'Utility functions are available',
    examples: {
      add: add(5, 3),
      subtract: subtract(10, 4),
      capitalize: capitalize('hello world')
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});

module.exports = app;
