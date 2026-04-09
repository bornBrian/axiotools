// Controller for image processing operations
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { COMPRESSION_LEVELS, PRESET_RESOLUTIONS, TEMP_DIR } = require('../config/constants');
const { cleanupTempFiles } = require('../utils/cleanup');
const {
  validateImageCompressionRequest,
  validateImageResizeRequest,
  validateImageConvertRequest,
} = require('../utils/validators');

// Compress image with specified quality level
const compressImage = async (req, res) => {
  try {
    const { level = 'medium' } = req.body;
    const file = req.file;

    const errors = validateImageCompressionRequest(file, level);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const compressionSettings = COMPRESSION_LEVELS[level.toLowerCase()];
    const outputPath = path.join(TEMP_DIR, `compressed-${Date.now()}.jpg`);

    // Process the image with Lanczos3 resampling for best quality
    await sharp(file.path)
      .resize({
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({
        quality: compressionSettings.quality,
        mozjpeg: true, // High-quality compression
        progressive: true,
      })
      .toFile(outputPath);

    // Get file stats
    const originalSize = file.size;
    const compressedSize = fs.statSync(outputPath).size;
    const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(2);

    res.json({
      success: true,
      data: {
        originalSize,
        compressedSize,
        compressionRatio: `${compressionRatio}%`,
        fileName: path.basename(outputPath),
        outputPath: `/download/${path.basename(outputPath)}`,
      },
    });

    // Cleanup input file
    cleanupTempFiles(file.path);
  } catch (error) {
    console.error('Compression error:', error);
    if (req.file) cleanupTempFiles(req.file.path);
    res.status(500).json({
      success: false,
      error: 'Image compression failed. Please try again.',
    });
  }
};

// Resize image to specified dimensions
const resizeImage = async (req, res) => {
  try {
    const { width, height, maintainAspectRatio = true, preset } = req.body;
    const file = req.file;

    let targetWidth = width ? parseInt(width) : null;
    let targetHeight = height ? parseInt(height) : null;

    // Use preset if provided
    if (preset && PRESET_RESOLUTIONS[preset]) {
      targetWidth = PRESET_RESOLUTIONS[preset].width;
      targetHeight = PRESET_RESOLUTIONS[preset].height;
    }

    const errors = validateImageResizeRequest(file, targetWidth, targetHeight);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const outputPath = path.join(TEMP_DIR, `resized-${Date.now()}.png`);

    // Resize with Lanczos3 for high quality
    let transform = sharp(file.path);

    if (maintainAspectRatio) {
      transform = transform.resize(targetWidth, targetHeight, {
        fit: 'inside',
        withoutEnlargement: false,
        kernel: sharp.kernel.lanczos3,
      });
    } else {
      transform = transform.resize(targetWidth, targetHeight, {
        fit: 'fill',
        kernel: sharp.kernel.lanczos3,
      });
    }

    await transform.png({ quality: 90 }).toFile(outputPath);

    res.json({
      success: true,
      data: {
        fileName: path.basename(outputPath),
        outputPath: `/download/${path.basename(outputPath)}`,
        newDimensions: {
          width: targetWidth,
          height: targetHeight,
        },
      },
    });

    cleanupTempFiles(file.path);
  } catch (error) {
    console.error('Resize error:', error);
    if (req.file) cleanupTempFiles(req.file.path);
    res.status(500).json({
      success: false,
      error: 'Image resize failed. Please try again.',
    });
  }
};

// Convert image format
const convertImage = async (req, res) => {
  try {
    const { format = 'png' } = req.body;
    const file = req.file;

    const errors = validateImageConvertRequest(file, format);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const outputPath = path.join(TEMP_DIR, `converted-${Date.now()}.${format.toLowerCase()}`);
    let transform = sharp(file.path);

    // Apply format-specific optimizations
    const targetFormat = format.toLowerCase();

    if (targetFormat === 'jpeg' || targetFormat === 'jpg') {
      transform = transform.jpeg({ quality: 85, mozjpeg: true });
    } else if (targetFormat === 'png') {
      transform = transform.png({ quality: 90 });
    } else if (targetFormat === 'webp') {
      transform = transform.webp({ quality: 85 });
    }

    await transform.toFile(outputPath);

    const originalSize = file.size;
    const convertedSize = fs.statSync(outputPath).size;

    res.json({
      success: true,
      data: {
        originalSize,
        convertedSize,
        format: targetFormat,
        fileName: path.basename(outputPath),
        outputPath: `/download/${path.basename(outputPath)}`,
      },
    });

    cleanupTempFiles(file.path);
  } catch (error) {
    console.error('Conversion error:', error);
    if (req.file) cleanupTempFiles(req.file.path);
    res.status(500).json({
      success: false,
      error: 'Image conversion failed. Please try again.',
    });
  }
};

// Get image preview/metadata
const getImageMetadata = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    const metadata = await sharp(file.path).metadata();

    res.json({
      success: true,
      data: {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: file.size,
        space: metadata.space,
      },
    });

    cleanupTempFiles(file.path);
  } catch (error) {
    console.error('Metadata error:', error);
    if (req.file) cleanupTempFiles(req.file.path);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve image metadata.',
    });
  }
};

// Convert images to PDF
const imageToPDF = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: 'No images provided' });
    }

    const { PDFDocument } = require('pdf-lib');
    const pdfDoc = await PDFDocument.create();

    // Process each image
    for (const file of files) {
      try {
        const metadata = await sharp(file.path).metadata();
        let image;

        if (metadata.format === 'png') {
          const pngBuffer = await sharp(file.path).png().toBuffer();
          image = await pdfDoc.embedPng(pngBuffer);
        } else {
          // Convert all non-PNG inputs to JPEG for reliable embedding
          const jpgBuffer = await sharp(file.path)
            .flatten({ background: '#ffffff' })
            .jpeg({ quality: 92 })
            .toBuffer();
          image = await pdfDoc.embedJpg(jpgBuffer);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      } catch (fileError) {
        console.error(`Error processing file ${file.originalname}:`, fileError);
        cleanupTempFiles(file.path);
        // Continue with other files instead of failing completely
        continue;
      }

      cleanupTempFiles(file.path);
    }

    const outputPath = path.join(TEMP_DIR, `converted-${Date.now()}.pdf`);
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    res.json({
      success: true,
      data: {
        fileName: path.basename(outputPath),
        outputPath: `/download/${path.basename(outputPath)}`,
      },
    });
  } catch (error) {
    console.error('Image to PDF error:', error);
    if (req.files) {
      req.files.forEach(file => cleanupTempFiles(file.path));
    }
    res.status(500).json({
      success: false,
      error: 'Failed to convert images to PDF.',
    });
  }
};

// Add watermark to image
const addWatermark = async (req, res) => {
  try {
    const file = req.file;
    const { text = '© Watermark', opacity = 0.5 } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }

    const outputPath = path.join(TEMP_DIR, `watermarked-${Date.now()}.png`);
    
    // Create SVG watermark
    const textWidth = text.length * 8;
    const textHeight = 30;
    const svg = `
      <svg width="${textWidth}" height="${textHeight}">
        <text x="0" y="25" font-size="24" font-weight="bold" fill="rgba(255,255,255,${opacity})" font-family="Arial">${text}</text>
      </svg>
    `;

    const metadata = await sharp(file.path).metadata();
    await sharp(file.path)
      .composite([
        {
          input: Buffer.from(svg),
          left: Math.max(0, Math.floor((metadata.width - textWidth) / 2)),
          top: Math.max(0, Math.floor((metadata.height - textHeight) / 2)),
        },
      ])
      .png()
      .toFile(outputPath);

    res.json({
      success: true,
      data: {
        fileName: path.basename(outputPath),
        outputPath: `/download/${path.basename(outputPath)}`,
      },
    });

    cleanupTempFiles(file.path);
  } catch (error) {
    console.error('Watermark error:', error);
    if (req.file) cleanupTempFiles(req.file.path);
    res.status(500).json({
      success: false,
      error: 'Failed to add watermark to image.',
    });
  }
};

// Apply filters to image
const applyFilter = async (req, res) => {
  try {
    const file = req.file;
    const { filter = 'grayscale' } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }

    const outputPath = path.join(TEMP_DIR, `filtered-${Date.now()}.png`);
    let transform = sharp(file.path);

    switch (filter.toLowerCase()) {
      case 'grayscale':
        transform = transform.grayscale();
        break;
      case 'sepia':
        transform = transform.recomb([
          [0.393, 0.769, 0.189],
          [0.349, 0.686, 0.168],
          [0.272, 0.534, 0.131],
        ]);
        break;
      case 'blur':
        transform = transform.blur(8);
        break;
      case 'sharpen':
        transform = transform.sharpen();
        break;
      case 'invert':
        transform = transform.negate();
        break;
      case 'vintage':
        transform = transform
          .modulate({ hue: 22, saturation: 0.65, brightness: 1.05 })
          .recomb([
            [1.03, 0.02, 0],
            [0, 0.98, 0],
            [0, 0.04, 0.92],
          ]);
        break;
      default:
        transform = transform.grayscale();
    }

    await transform.png().toFile(outputPath);

    res.json({
      success: true,
      data: {
        fileName: path.basename(outputPath),
        outputPath: `/download/${path.basename(outputPath)}`,
        filter: filter,
      },
    });

    cleanupTempFiles(file.path);
  } catch (error) {
    console.error('Filter error:', error);
    if (req.file) cleanupTempFiles(req.file.path);
    res.status(500).json({
      success: false,
      error: 'Failed to apply filter to image.',
    });
  }
};

module.exports = {
  compressImage,
  resizeImage,
  convertImage,
  getImageMetadata,
  imageToPDF,
  addWatermark,
  applyFilter,
};
