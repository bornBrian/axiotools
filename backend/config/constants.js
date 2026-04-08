// Configuration constants for AxioTools backend

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const TEMP_DIR = './temp';
const UPLOAD_DIR = './uploads';
const ALLOWED_IMAGE_FORMATS = ['jpeg', 'jpg', 'png', 'webp'];
const ALLOWED_DOCUMENT_FORMATS = ['pdf'];

const COMPRESSION_LEVELS = {
  low: { quality: 85, effort: 4 },
  medium: { quality: 75, effort: 6 },
  high: { quality: 60, effort: 8 },
};

const PRESET_RESOLUTIONS = {
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
  '4K': { width: 3840, height: 2160 },
  'thumbnail': { width: 150, height: 150 },
  'small': { width: 300, height: 300 },
};

module.exports = {
  MAX_FILE_SIZE,
  TEMP_DIR,
  UPLOAD_DIR,
  ALLOWED_IMAGE_FORMATS,
  ALLOWED_DOCUMENT_FORMATS,
  COMPRESSION_LEVELS,
  PRESET_RESOLUTIONS,
};
