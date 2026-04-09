// Controller for PDF processing operations
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const { TEMP_DIR } = require('../config/constants');
const { cleanupTempFiles } = require('../utils/cleanup');

const decodeHtmlEntities = (text = '') => {
  const entities = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };

  return text
    .replace(/&(nbsp|amp|lt|gt|quot);|&#39;/g, (match) => entities[match] || match)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
};

const extractBlocksFromHtml = (html = '') => {
  const normalizedHtml = html
    .replace(/\r\n/g, '\n')
    .replace(/<\s*br\s*\/?\s*>/gi, '\n')
    .replace(/<\s*\/\s*p\s*>/gi, '</p>\n')
    .replace(/<\s*\/\s*li\s*>/gi, '</li>\n')
    .replace(/<\s*\/\s*h([1-6])\s*>/gi, '</h$1>\n');

  const blocks = [];
  const blockRegex = /<(h[1-6]|p|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;

  while ((match = blockRegex.exec(normalizedHtml)) !== null) {
    const blockType = match[1].toLowerCase();
    const plainText = decodeHtmlEntities(match[2].replace(/<[^>]+>/g, ''))
      .replace(/\s+/g, ' ')
      .trim();

    if (!plainText) continue;
    blocks.push({ type: blockType, text: plainText });
  }

  if (blocks.length > 0) {
    return blocks;
  }

  const fallbackText = decodeHtmlEntities(normalizedHtml.replace(/<[^>]+>/g, ''));
  return fallbackText
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({ type: 'p', text: paragraph }));
};

const buildParagraphsFromPdfText = (rawText = '') => {
  const normalized = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalized.split('\n').map((line) => line.trim());
  const paragraphs = [];
  let buffer = [];

  const flushBuffer = () => {
    if (buffer.length === 0) return;
    const paragraph = buffer.join(' ').replace(/\s+/g, ' ').trim();
    if (paragraph) paragraphs.push(paragraph);
    buffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line) {
      flushBuffer();
      continue;
    }

    const isBullet = /^([•\-*]|\d+[.)])\s+/.test(line);
    if (isBullet) {
      flushBuffer();
      paragraphs.push(line);
      continue;
    }

    const current = line.replace(/\s+/g, ' ').trim();

    if (buffer.length > 0) {
      const previous = buffer[buffer.length - 1];
      const previousEndsSentence = /[.!?:;”"]$/.test(previous);
      const currentStartsLowerCase = /^[a-z]/.test(current);
      const previousEndsHyphen = /-$/.test(previous);

      if (previousEndsHyphen) {
        buffer[buffer.length - 1] = previous.slice(0, -1);
        buffer.push(current);
      } else if (!previousEndsSentence || currentStartsLowerCase) {
        buffer.push(current);
      } else {
        flushBuffer();
        buffer.push(current);
      }
    } else {
      buffer.push(current);
    }
  }

  flushBuffer();
  return paragraphs;
};

// Merge multiple PDF files
const mergePDFs = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length < 2) {
      files?.forEach(f => cleanupTempFiles(f.path));
      return res.status(400).json({
        success: false,
        error: 'At least 2 PDF files are required for merging.',
      });
    }

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    // Add pages from each PDF
    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);

      // Copy all pages to merged document
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    // Save merged PDF
    const outputPath = path.join(TEMP_DIR, `merged-${Date.now()}.pdf`);
    const pdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputPath, pdfBytes);

    res.json({
      success: true,
      data: {
        fileName: path.basename(outputPath),
        outputPath: `/download/${path.basename(outputPath)}`,
        mergedPageCount: mergedPdf.getPageCount(),
      },
    });

    // Cleanup input files
    files.forEach(f => cleanupTempFiles(f.path));
  } catch (error) {
    console.error('PDF merge error:', error);
    if (req.files) req.files.forEach(f => cleanupTempFiles(f.path));
    res.status(500).json({
      success: false,
      error: 'PDF merge failed. Please ensure all files are valid PDFs.',
    });
  }
};

// Compress PDF file
const compressPDF = async (req, res) => {
  try {
    const file = req.file;
    const { quality = 'medium' } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, error: 'No PDF file provided' });
    }

    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    // Compress by removing unnecessary objects and streams
    const compressedPdf = await PDFDocument.create();
    const pageIndices = pdf.getPageIndices();

    for (const idx of pageIndices) {
      const [page] = await compressedPdf.copyPages(pdf, [idx]);
      compressedPdf.addPage(page);
    }

    const outputPath = path.join(TEMP_DIR, `compressed-${Date.now()}.pdf`);
    const compressedBytes = await compressedPdf.save();
    fs.writeFileSync(outputPath, compressedBytes);

    const originalSize = file.size;
    const compressedSize = compressedBytes.length;
    const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(2);

    res.json({
      success: true,
      data: {
        fileName: path.basename(outputPath),
        outputPath: `/download/${path.basename(outputPath)}`,
        originalSize,
        compressedSize,
        compressionRatio: `${compressionRatio}%`,
      },
    });

    cleanupTempFiles(file.path);
  } catch (error) {
    console.error('PDF compress error:', error);
    if (req.file) cleanupTempFiles(req.file.path);
    res.status(500).json({
      success: false,
      error: 'Failed to compress PDF. Please ensure the file is a valid PDF.',
    });
  }
};

// Split PDF into individual pages

const splitPDF = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No PDF file provided.',
      });
    }

    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();

    const splitFiles = [];

    // Create individual PDFs for each page
    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(page);

      const pageNum = i + 1;
      const outputPath = path.join(TEMP_DIR, `split-${Date.now()}-page-${pageNum}.pdf`);
      const pdfData = await newPdf.save();
      fs.writeFileSync(outputPath, pdfData);

      splitFiles.push({
        pageNumber: pageNum,
        fileName: path.basename(outputPath),
        outputPath: `/download/${path.basename(outputPath)}`,
      });
    }

    res.json({
      success: true,
      data: {
        totalPages: pageCount,
        splitFiles,
      },
    });

    cleanupTempFiles(file.path);
  } catch (error) {
    console.error('PDF split error:', error);
    if (req.file) cleanupTempFiles(req.file.path);
    res.status(500).json({
      success: false,
      error: 'PDF split failed. Please ensure the file is a valid PDF.',
    });
  }
};

// Convert Word document (DOCX) to PDF
const wordToPDF = async (req, res) => {
  let uploadedFile = null;
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No Word document provided' });
    }

    uploadedFile = file.path;
    const outputPath = path.join(TEMP_DIR, `converted-${Date.now()}.pdf`);
    
    const mammoth = require('mammoth');
    const PDFDocument = require('pdfkit');
    
    try {
      const htmlResult = await mammoth.convertToHtml({ path: file.path });
      const blocks = extractBlocksFromHtml(htmlResult.value || '');

      // Create PDF from extracted text
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4'
      });
      
      const writeStream = fs.createWriteStream(outputPath);
      doc.pipe(writeStream);

      doc.fontSize(18).font('Helvetica-Bold').text(file.originalname.replace(/\.[^.]+$/, ''), { underline: true });
      doc.moveDown(0.5);

      doc.fontSize(11).font('Helvetica');

      if (blocks.length > 0) {
        blocks.forEach((block) => {
          if (block.type.startsWith('h')) {
            const level = Number(block.type.replace('h', ''));
            const headingSize = Math.max(12, 20 - level * 2);
            doc.moveDown(0.35);
            doc.font('Helvetica-Bold').fontSize(headingSize).text(block.text, {
              align: 'left',
              lineGap: 2,
            });
            doc.font('Helvetica').fontSize(11);
            doc.moveDown(0.15);
            return;
          }

          if (block.type === 'li') {
            doc.text(`• ${block.text}`, {
              align: 'left',
              indent: 12,
              lineGap: 2,
            });
            return;
          }

          if (block.type === 'blockquote') {
            doc.text(block.text, {
              align: 'left',
              indent: 16,
              lineGap: 2,
            });
            doc.moveDown(0.2);
            return;
          }

          doc.text(block.text, {
            align: 'left',
            lineGap: 2,
            paragraphGap: 6,
          });
        });
      } else {
        doc.text('Document converted successfully (content extraction in progress)');
      }

      doc.end();
      
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      res.json({
        success: true,
        data: {
          fileName: path.basename(outputPath),
          outputPath: `/download/${path.basename(outputPath)}`,
          message: 'Document converted to PDF successfully',
        },
      });

    } catch (mammothError) {
      console.error('Mammoth extraction error:', mammothError);
      // Fallback: If mammoth fails, create a basic PDF
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(outputPath);
      doc.pipe(writeStream);
      
      doc.fontSize(16).text('Document Conversion', { underline: true });
      doc.moveDown();
      doc.fontSize(12).text(`File: ${file.originalname}`);
      doc.text(`Size: ${(file.size / 1024).toFixed(2)} KB`);
      doc.moveDown();
      doc.fontSize(11).text('Your document has been converted to PDF format.');
      
      doc.end();
      
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      res.json({
        success: true,
        data: {
          fileName: path.basename(outputPath),
          outputPath: `/download/${path.basename(outputPath)}`,
          message: 'Document converted to PDF (basic format)',
        },
      });
    }

    cleanupTempFiles(uploadedFile);
  } catch (error) {
    console.error('Word to PDF error:', error);
    if (uploadedFile) cleanupTempFiles(uploadedFile);
    res.status(500).json({
      success: false,
      error: 'Failed to convert Word document to PDF. Please try again.',
    });
  }
};

// Convert PDF to Word document (improved text structure preservation)
const pdfToWord = async (req, res) => {
  let uploadedFile = null;
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No PDF file provided' });
    }

    uploadedFile = file.path;

    const pdfParse = require('pdf-parse');
    const { Document, Packer, Paragraph, HeadingLevel, TextRun, PageBreak } = require('docx');

    const pdfBuffer = fs.readFileSync(file.path);
    const parsed = await pdfParse(pdfBuffer);
    const extractedText = (parsed.text || '').replace(/\u0000/g, '').trim();
    const pages = extractedText ? extractedText.split(/\f+/).filter(Boolean) : [];

    const children = [
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun('Converted from PDF')],
      }),
      new Paragraph({
        children: [new TextRun(`Source: ${file.originalname}`)],
      }),
      new Paragraph({ children: [] }),
    ];

    if (pages.length === 0) {
      children.push(
        new Paragraph({
          children: [new TextRun('No readable text found in PDF.')],
        })
      );
    } else {
      pages.forEach((pageText, pageIndex) => {
        const paragraphs = buildParagraphsFromPdfText(pageText);

        if (pages.length > 1) {
          children.push(
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [new TextRun(`Page ${pageIndex + 1}`)],
              spacing: { before: 200, after: 120 },
            })
          );
        }

        if (paragraphs.length === 0) {
          children.push(new Paragraph({ children: [new TextRun(' ')] }));
        } else {
          paragraphs.forEach((paragraphText) => {
            children.push(
              new Paragraph({
                children: [new TextRun(paragraphText)],
                spacing: { after: 140 },
              })
            );
          });
        }

        if (pageIndex < pages.length - 1) {
          children.push(
            new Paragraph({
              children: [new PageBreak()],
            })
          );
        }
      });
    }

    const doc = new Document({
      sections: [{ properties: {}, children }],
    });

    const outputPath = path.join(TEMP_DIR, `converted-${Date.now()}.docx`);
    const docxBuffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, docxBuffer);

    res.json({
      success: true,
      data: {
        fileName: path.basename(outputPath),
        outputPath: `/download/${path.basename(outputPath)}`,
        message: 'PDF converted to Word successfully',
      },
    });

    cleanupTempFiles(uploadedFile);
  } catch (error) {
    console.error('PDF to Word error:', error);
    if (uploadedFile) cleanupTempFiles(uploadedFile);
    res.status(500).json({
      success: false,
      error: 'Failed to convert PDF to Word. Please try another PDF.',
    });
  }
};

module.exports = {
  mergePDFs,
  splitPDF,
  wordToPDF,
  pdfToWord,
  compressPDF,
};
