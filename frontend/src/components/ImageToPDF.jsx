import React, { useState } from 'react';
import FileUpload from './FileUpload';
import './ImageCompressor.css';

const ImageToPDF = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleConvert = async () => {
    if (files.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));

      const response = await fetch('https://axiotools.onrender.com/api/image/to-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const downloadResponse = await fetch(`https://axiotools.onrender.com${data.data.outputPath}`);
        const blob = await downloadResponse.blob();
        const url = window.URL.createObjectURL(blob);
        setResult({ url, filename: data.data.fileName });
      } else {
        alert('Error: ' + (data.error || 'Conversion failed'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to convert to PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>📄 Convert Images to PDF</h1>
      <p className="page-description">Combine multiple images into a single PDF document</p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload 
              onFileSelect={setFiles}
              accept="image/jpeg,image/png,image/webp"
              multiple={true}
            />

            {files.length > 0 && (
              <div className="file-preview">
                <p>Selected: {files.length} image(s)</p>
                {files.map((file, idx) => (
                  <p key={idx} className="file-size">• {file.name} ({(file.size / 1024).toFixed(2)} KB)</p>
                ))}
              </div>
            )}

            <button 
              className="primary-btn" 
              onClick={handleConvert} 
              disabled={files.length === 0 || loading}
            >
              {loading ? 'Converting...' : 'Convert to PDF'}
            </button>
          </>
        ) : (
          <div className="result-section">
            <div className="result-success">✅ Conversion successful!</div>
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
              Convert Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToPDF;
