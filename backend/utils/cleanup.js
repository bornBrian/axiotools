// Utility for cleaning up temporary files
const fs = require('fs');
const path = require('path');

const cleanupTempFiles = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Cleaned up: ${filePath}`);
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error);
    }
  }
};

const cleanupDirectory = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    try {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          fs.unlinkSync(filePath);
        }
      });
      console.log(`Cleaned up directory: ${dirPath}`);
    } catch (error) {
      console.error(`Error cleaning directory ${dirPath}:`, error);
    }
  }
};

// Schedule cleanup of files older than 1 hour
const scheduleCleanup = (dirPath, ageInMinutes = 60) => {
  setInterval(() => {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        const ageInMs = Date.now() - stats.mtimeMs;
        const ageInMins = ageInMs / 1000 / 60;

        if (ageInMins > ageInMinutes && stats.isFile()) {
          try {
            fs.unlinkSync(filePath);
            console.log(`Auto-deleted old file: ${filePath}`);
          } catch (error) {
            console.error(`Error deleting old file ${filePath}:`, error);
          }
        }
      });
    }
  }, 10 * 60 * 1000); // Run cleanup every 10 minutes
};

module.exports = {
  cleanupTempFiles,
  cleanupDirectory,
  scheduleCleanup,
};
