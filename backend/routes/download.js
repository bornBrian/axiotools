// Download route for processed files
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { TEMP_DIR } = require('../config/constants');

// Download file
router.get('/:fileName', (req, res) => {
  try {
    const { fileName } = req.params;
    
    // Security: Prevent directory traversal
    if (fileName.includes('..') || fileName.includes('/')) {
      return res.status(400).json({ success: false, error: 'Invalid file name.' });
    }

    const filePath = path.join(TEMP_DIR, fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, error: 'File not found.' });
    }

    // Send file
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      // Optionally delete file after download
      // fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Download route error:', error);
    res.status(500).json({ success: false, error: 'Failed to download file.' });
  }
});

module.exports = router;
