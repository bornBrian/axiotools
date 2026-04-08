// Validators for file uploads and parameters
const { ALLOWED_IMAGE_FORMATS, ALLOWED_DOCUMENT_FORMATS, MAX_FILE_SIZE } = require('../config/constants');

const isValidImageFile = (file) => {
  if (!file) return false;
  const ext = file.mimetype.split('/')[1].toLowerCase();
  return ALLOWED_IMAGE_FORMATS.includes(ext);
};

const isValidPdfFile = (file) => {
  if (!file) return false;
  return file.mimetype === 'application/pdf';
};

const isValidFileSize = (size) => {
  return size <= MAX_FILE_SIZE;
};

const isValidResolution = (width, height) => {
  return (
    Number.isInteger(width) &&
    Number.isInteger(height) &&
    width > 0 &&
    height > 0 &&
    width <= 4000 &&
    height <= 4000
  );
};

const isValidCompressionLevel = (level) => {
  return ['low', 'medium', 'high'].includes(level?.toLowerCase());
};

const validateImageCompressionRequest = (file, level) => {
  const errors = [];

  if (!file) {
    errors.push('No file provided');
  } else if (!isValidImageFile(file)) {
    errors.push('Invalid image format. Allowed: JPEG, PNG, WebP');
  } else if (!isValidFileSize(file.size)) {
    errors.push(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  if (!isValidCompressionLevel(level)) {
    errors.push('Invalid compression level. Allowed: low, medium, high');
  }

  return errors;
};

const validateImageResizeRequest = (file, width, height) => {
  const errors = [];

  if (!file) {
    errors.push('No file provided');
  } else if (!isValidImageFile(file)) {
    errors.push('Invalid image format. Allowed: JPEG, PNG, WebP');
  } else if (!isValidFileSize(file.size)) {
    errors.push(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  if (!isValidResolution(width, height)) {
    errors.push('Invalid dimensions. Must be integers between 1 and 4000');
  }

  return errors;
};

const validateImageConvertRequest = (file, format) => {
  const errors = [];

  if (!file) {
    errors.push('No file provided');
  } else if (!isValidImageFile(file)) {
    errors.push('Invalid image format. Allowed: JPEG, PNG, WebP');
  } else if (!isValidFileSize(file.size)) {
    errors.push(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  if (!ALLOWED_IMAGE_FORMATS.includes(format?.toLowerCase())) {
    errors.push('Invalid target format. Allowed: jpeg, png, webp');
  }

  return errors;
};

module.exports = {
  isValidImageFile,
  isValidPdfFile,
  isValidFileSize,
  isValidResolution,
  isValidCompressionLevel,
  validateImageCompressionRequest,
  validateImageResizeRequest,
  validateImageConvertRequest,
};
