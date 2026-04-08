// PDF processing routes
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const pdfController = require('../controllers/pdfController');

// Merge PDFs
router.post('/merge', upload.array('files', 10), pdfController.mergePDFs);

// Split PDF
router.post('/split', upload.single('file'), pdfController.splitPDF);

// Convert Word document to PDF
router.post('/word-to-pdf', upload.single('document'), pdfController.wordToPDF);

// Compress PDF
router.post('/compress', upload.single('file'), pdfController.compressPDF);

module.exports = router;
