import React from 'react';
import FileUpload from '../components/FileUpload';
import './PDFMerge.css';

const PDFMerge = () => {
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please upload at least 2 PDF files');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('https://axiotools.onrender.com/api/pdf/merge', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to merge PDFs');
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="tool-page">
      <h1>PDF Merger</h1>
      <p className="page-description">Combine multiple PDF files into one</p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload onFileSelect={(newFiles) => setFiles([...files, ...newFiles])} accept="application/pdf" multiple />

            {files.length > 0 && (
              <div className="file-list">
                <label>Selected Files ({files.length}):</label>
                <ul>
                  {files.map((file, idx) => (
                    <li key={idx}>
                      <span>📄 {file.name}</span>
                      <button
                        className="remove-btn"
                        onClick={() => removeFile(idx)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button className="primary-btn" onClick={handleMerge} disabled={files.length < 2 || loading}>
              {loading ? 'Merging...' : 'Merge PDFs'}
            </button>
          </>
        ) : (
          <div className="result-container">
            <div className="result-success">
              <p className="success-icon">✓</p>
              <h2>Merge Complete!</h2>
            </div>

            <div className="stats">
              <div className="stat">
                <span className="stat-label">Files Merged</span>
                <span className="stat-value">{files.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Total Pages</span>
                <span className="stat-value">{result.mergedPageCount}</span>
              </div>
            </div>

            <a href={`https://axiotools.onrender.com${result.outputPath}`} download className="download-btn">
              📥 Download Merged PDF
            </a>

            <button className="secondary-btn" onClick={() => { setResult(null); setFiles([]); }}>
              Merge More PDFs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFMerge;
