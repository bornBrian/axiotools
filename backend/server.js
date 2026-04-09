// Main server file for AxioTools backend
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { TEMP_DIR } = require('./config/constants');
const { scheduleCleanup } = require('./utils/cleanup');

// Import routes
const imageRoutes = require('./routes/image');
const pdfRoutes = require('./routes/pdf');
const downloadRoutes = require('./routes/download');
const sitemapRoutes = require('./routes/sitemapRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AxioTools backend is running' });
});

// Routes
app.use('/api/image', imageRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/download', downloadRoutes);
app.use('/', sitemapRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size exceeds the maximum allowed size (50MB).',
    });
  }

  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  res.status(500).json({
    success: false,
    error: 'An error occurred. Please try again.',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ AxioTools backend running on http://localhost:${PORT}`);
  console.log(`✓ Temp directory: ${TEMP_DIR}`);

  // Schedule automatic cleanup
  scheduleCleanup(TEMP_DIR, 60); // Clean files older than 60 minutes
});

module.exports = app;
