import React from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';
import './PageLayout.css';

const FileTools = ({ onBackToDashboard }) => {
  const imageTools = [
    { emoji: '📸', name: 'Compress Image', desc: 'Reduce file size while maintaining quality' },
    { emoji: '📐', name: 'Resize Image', desc: 'Change image dimensions safely' },
    { emoji: '🎨', name: 'Convert Image', desc: 'Transform between PNG, JPEG, WebP formats' },
    { emoji: '📄', name: 'Image to PDF', desc: 'Combine multiple images into one PDF' },
    { emoji: '💧', name: 'Add Watermark', desc: 'Protect images with text watermarks' },
    { emoji: '🎭', name: 'Apply Filters', desc: 'Use 6 artistic filters (Grayscale, Sepia, Blur, Sharpen, Invert, Vintage)' },
  ];

  const pdfTools = [
    { emoji: '✂️', name: 'Merge PDFs', desc: 'Combine multiple PDF files into one' },
    { emoji: '📏', name: 'Split PDF', desc: 'Extract pages from PDF documents' },
    { emoji: '📝', name: 'Word to PDF', desc: 'Convert DOCX and DOC files to PDF' },
    { emoji: '📘', name: 'PDF to Word', desc: 'Convert PDF text to editable DOCX' },
    { emoji: '📦', name: 'Compress PDF', desc: 'Reduce PDF file size while maintaining quality' },
  ];

  const extraTools = [
    { emoji: '🔳', name: 'QR Code Generator', desc: 'Create downloadable PNG QR codes for text and URLs' },
  ];

  return (
    <div className="tool-page">
      {onBackToDashboard && (
        <button className="page-back-btn" onClick={onBackToDashboard}>
          ← Back to Main Page
        </button>
      )}
      <h1>📚 File Tools Guide</h1>
      <p className="page-description">All your file processing tools in one place</p>

      <div className="tool-container">
        {/* How It Works Section */}
        <section style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ marginBottom: '1rem' }}>🎯 How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '28px', marginBottom: '0.5rem' }}>1️⃣</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Select Your Tool</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>Choose an image or PDF tool from the Image Tools or PDF Tools sections</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '28px', marginBottom: '0.5rem' }}>2️⃣</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Upload Your Files</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>Drag & drop or click to upload. All processing happens instantly on your browser</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '28px', marginBottom: '0.5rem' }}>3️⃣</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Download Results</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>Your files are processed securely and ready to download instantly</p>
            </div>
          </div>
        </section>

        {/* Extra Tools Section */}
        <section style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ marginBottom: '1rem' }}>🧰 Extra Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {extraTools.map((tool, idx) => (
              <div key={idx} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>{tool.emoji}</div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '15px', fontWeight: '600' }}>{tool.name}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <QRCodeGenerator />
        </section>

        {/* Image Tools Section */}
        <section style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ marginBottom: '1rem' }}>🖼️ Image Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {imageTools.map((tool, idx) => (
              <div key={idx} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>{tool.emoji}</div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '15px', fontWeight: '600' }}>{tool.name}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PDF Tools Section */}
        <section style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ marginBottom: '1rem' }}>📄 PDF Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {pdfTools.map((tool, idx) => (
              <div key={idx} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>{tool.emoji}</div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '15px', fontWeight: '600' }}>{tool.name}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section>
          <h2 style={{ marginBottom: '1rem' }}>💡 Tips for Best Results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderRadius: '8px', borderLeft: '3px solid var(--success-color)' }}>
              <p style={{ fontSize: '13px', margin: 0 }}>
                <strong>Image Quality:</strong> Use high-quality source files for best compression and conversion results
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', borderLeft: '3px solid #3B82F6' }}>
              <p style={{ fontSize: '13px', margin: 0 }}>
                <strong>File Size:</strong> Compress images before uploading to reduce bandwidth usage
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderRadius: '8px', borderLeft: '3px solid #A855F7' }}>
              <p style={{ fontSize: '13px', margin: 0 }}>
                <strong>PDF Merging:</strong> Organize pages logically for better PDF document structure
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(251, 146, 60, 0.1)', borderRadius: '8px', borderLeft: '3px solid #FB923C' }}>
              <p style={{ fontSize: '13px', margin: 0 }}>
                <strong>Batch Processing:</strong> Process multiple files quickly using the same tool
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px', borderLeft: '3px solid #EC4899' }}>
              <p style={{ fontSize: '13px', margin: 0 }}>
                <strong>Watermarks:</strong> Always preview watermarks to ensure proper positioning and opacity
              </p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(14, 165, 233, 0.1)', borderRadius: '8px', borderLeft: '3px solid #0EA5E9' }}>
              <p style={{ fontSize: '13px', margin: 0 }}>
                <strong>Privacy:</strong> All processing is done locally in your browser - files never leave your computer
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FileTools;
