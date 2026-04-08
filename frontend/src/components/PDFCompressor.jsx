import React, { useState } from 'react';
import FileUpload from './FileUpload';
import './ImageCompressor.css';

const PDFCompressor = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCompress = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('quality', 'medium');

      const response = await fetch('http://localhost:5000/api/pdf/compress', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const downloadResponse = await fetch(`http://localhost:5000${data.data.outputPath}`);
        const blob = await downloadResponse.blob();
        const url = window.URL.createObjectURL(blob);
        setResult({ 
          url, 
          filename: data.data.fileName,
          originalSize: data.data.originalSize,
          compressedSize: data.data.compressedSize,
          compressionRatio: data.data.compressionRatio,
        });
      } else {
        alert('Error: ' + (data.error || 'Failed to compress PDF'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to compress PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>📦 Compress PDF</h1>
      <p className="page-description">Reduce PDF file size while maintaining quality</p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload 
              onFileSelect={setFiles}
              accept=".pdf,application/pdf"
              multiple={false}
            />

            {files.length > 0 && (
              <div className="file-preview">
                <p>Selected: {files[0].name}</p>
                <p className="file-size">{(files[0].size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            <button 
              className="primary-btn" 
              onClick={handleCompress} 
              disabled={files.length === 0 || loading}
            >
              {loading ? 'Compressing...' : 'Compress PDF'}
            </button>
          </>
        ) : (
          <div className="result-section">
            <div className="result-success">✅ PDF compressed successfully!</div>
            
            <div className="stats">
              <div className="stat">
                <span className="stat-label">Original Size</span>
                <span className="stat-value">{(result.originalSize / 1024).toFixed(2)} KB</span>
              </div>
              <div className="stat">
                <span className="stat-label">Compressed Size</span>
                <span className="stat-value">{(result.compressedSize / 1024).toFixed(2)} KB</span>
              </div>
              <div className="stat">
                <span className="stat-label">Reduction</span>
                <span className="stat-value">{result.compressionRatio}</span>
              </div>
            </div>

            <a href={result.url} download={result.filename} className="primary-btn" style={{ marginTop: '1rem' }}>
              📥 Download PDF
            </a>
            <button 
              className="secondary-btn" 
              onClick={() => {
                setResult(null);
                setFiles([]);
              }}
            >
              Compress Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFCompressor;
