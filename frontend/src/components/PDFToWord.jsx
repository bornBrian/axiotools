import React, { useState } from 'react';
import FileUpload from './FileUpload';
import './ImageCompressor.css';

const PDFToWord = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleConvert = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      const response = await fetch('https://axiotools.onrender.com/api/pdf/pdf-to-word', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const downloadResponse = await fetch(`https://axiotools.onrender.com${data.data.outputPath}`);
        const blob = await downloadResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const base = files[0].name.replace(/\.[^/.]+$/, '');
        setResult({ url, filename: `${base}.docx` });
      } else {
        alert('Error: ' + (data.error || 'Conversion failed'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to convert PDF to Word');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>📘 Convert PDF to Word</h1>
      <p className="page-description">Convert PDF text content into editable DOCX format</p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload onFileSelect={setFiles} accept="application/pdf,.pdf" multiple={false} />

            {files.length > 0 && (
              <div className="file-preview">
                <p>Selected: {files[0].name}</p>
                <p className="file-size">{(files[0].size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            <button className="primary-btn" onClick={handleConvert} disabled={files.length === 0 || loading}>
              {loading ? 'Converting...' : 'Convert to Word'}
            </button>
          </>
        ) : (
          <div className="result-section">
            <div className="result-success">✅ Conversion successful!</div>
            <a href={result.url} download={result.filename} className="primary-btn" style={{ marginTop: '1rem' }}>
              📥 Download DOCX
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

export default PDFToWord;
