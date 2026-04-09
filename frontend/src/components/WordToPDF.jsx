import React, { useState } from 'react';
import FileUpload from './FileUpload';
import './ImageCompressor.css';

const WordToPDF = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleConvert = async () => {
    if (files.length === 0) {
      alert('Please select a Word document');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('document', files[0]);

      const response = await fetch('https://axiotools.onrender.com/api/pdf/word-to-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const downloadResponse = await fetch(`https://axiotools.onrender.com${data.data.outputPath}`);
        const blob = await downloadResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const filename = files[0].name.replace(/\.[^/.]+$/, '.pdf');
        setResult({ url, filename });
      } else {
        alert('Error: ' + (data.error || 'Conversion failed'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to convert document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>📝 Convert Word to PDF</h1>
      <p className="page-description">Convert DOCX and DOC files to PDF format instantly</p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload 
              onFileSelect={setFiles}
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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

export default WordToPDF;
