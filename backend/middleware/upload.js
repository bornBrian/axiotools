// Multer configuration for file uploads
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MAX_FILE_SIZE, TEMP_DIR } = require('../config/constants');

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = `${timestamp}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword', // .doc files
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx files
  ];

  const allowedWordExtensions = ['.doc', '.docx'];
  const extension = path.extname(file.originalname || '').toLowerCase();
  const mimeType = (file.mimetype || '').toLowerCase();

  const isAllowedByMime = allowedMimeTypes.includes(mimeType);
  const isWordByExtension = allowedWordExtensions.includes(extension);

  if (isAllowedByMime || isWordByExtension) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images (JPEG, PNG, WebP), PDF, and Word documents (DOC, DOCX) are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

module.exports = upload;
