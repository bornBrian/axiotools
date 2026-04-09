import React from 'react';
import ToolCard from '../components/ToolCard';
import AdBanner from '../components/AdBanner';
import './Dashboard.css';

const Dashboard = ({ onSelectTool }) => {
  const imageTools = [
    {
      id: 'compress',
      icon: '🗜️',
      title: 'Compress Image',
      description: 'Reduce file size while maintaining quality',
    },
    {
      id: 'resize',
      icon: '📐',
      title: 'Resize Image',
      description: 'Change dimensions with high-quality resampling',
    },
    {
      id: 'convert',
      icon: '🎨',
      title: 'Convert Format',
      description: 'Convert between JPEG, PNG, WebP formats',
    },
    {
      id: 'image-to-pdf',
      icon: '📄',
      title: 'Image to PDF',
      description: 'Convert images to PDF document',
    },
    {
      id: 'watermark',
      icon: '💧',
      title: 'Add Watermark',
      description: 'Protect your images with watermarks',
    },
    {
      id: 'filter',
      icon: '🎭',
      title: 'Apply Filters',
      description: 'Enhance with grayscale, sepia, blur effects',
    },
    {
      id: 'passport-photo',
      icon: '🛂',
      title: 'Passport Photo',
      description: 'Resize photos for USA, UK, and Canada passport requirements',
    },
  ];

  const pdfTools = [
    {
      id: 'merge',
      icon: '📑',
      title: 'Merge PDFs',
      description: 'Combine multiple PDF files into one',
    },
    {
      id: 'split',
      icon: '✂️',
      title: 'Split PDF',
      description: 'Extract individual pages from a PDF',
    },
    {
      id: 'word-to-pdf',
      icon: '📝',
      title: 'Word to PDF',
      description: 'Convert DOCX files to PDF format',
    },
    {
      id: 'pdf-to-word',
      icon: '📘',
      title: 'PDF to Word',
      description: 'Convert PDF text to editable DOCX',
    },
    {
      id: 'compress',
      icon: '📦',
      title: 'Compress PDF',
      description: 'Reduce PDF file size while maintaining quality',
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>AxioTools Dashboard</h1>
        <p className="dashboard-subtitle">Fast, clean file processing tools</p>
      </div>

      <AdBanner placement="top" />

      <section className="tool-section">
        <div className="section-header">
          <h2>🖼️ Image Tools</h2>
          <button className="view-all-btn" onClick={() => onSelectTool('image-tools', null)}>
            View All →
          </button>
        </div>
        <div className="tool-grid">
          {imageTools.map((tool) => (
            <ToolCard
              key={tool.id}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              onClick={() => onSelectTool('image-tools', tool.id)}
            />
          ))}
        </div>
      </section>

      <section className="tool-section">
        <div className="section-header">
          <h2>📁 More Tools</h2>
          <button className="view-all-btn" onClick={() => onSelectTool('file-tools', null)}>
            View All →
          </button>
        </div>
        <div className="tool-grid">
          <ToolCard
            icon="🔳"
            title="QR Code Generator"
            description="Create downloadable QR codes for any text or URL"
            onClick={() => onSelectTool('file-tools', null)}
          />
        </div>
      </section>

      <section className="tool-section">
        <div className="section-header">
          <h2>📄 PDF Tools</h2>
          <button className="view-all-btn" onClick={() => onSelectTool('pdf-tools', null)}>
            View All →
          </button>
        </div>
        <div className="tool-grid">
          {pdfTools.map((tool) => (
            <ToolCard
              key={tool.id}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              onClick={() => onSelectTool('pdf-tools', tool.id)}
            />
          ))}
        </div>
      </section>

      <section className="features-section">
        <h2>Why AxioTools?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Lightning Fast</h3>
            <p>Process files instantly with our optimized backend</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Privacy First</h3>
            <p>Files deleted automatically after processing</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">✨</span>
            <h3>High Quality</h3>
            <p>Professional-grade compression and conversion</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Mobile Friendly</h3>
            <p>Works seamlessly on all devices</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
