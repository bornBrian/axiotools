// Image processing routes
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const imageController = require('../controllers/imageController');

// Compress image
router.post('/compress', upload.single('file'), imageController.compressImage);

// Resize image
router.post('/resize', upload.single('file'), imageController.resizeImage);

// Convert image format
router.post('/convert', upload.single('file'), imageController.convertImage);

// Get image metadata
router.post('/metadata', upload.single('file'), imageController.getImageMetadata);

// Convert images to PDF
router.post('/to-pdf', upload.array('images', 10), imageController.imageToPDF);

// Add watermark
router.post('/watermark', upload.single('image'), imageController.addWatermark);

// Apply filters
router.post('/filter', upload.single('image'), imageController.applyFilter);

module.exports = router;
