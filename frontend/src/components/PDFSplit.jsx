import React from 'react';
import FileUpload from '../components/FileUpload';
import './PDFSplit.css';

const PDFSplit = () => {
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const handleSplit = async () => {
    if (files.length === 0) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      const response = await fetch('https://axiotools.onrender.com/api/pdf/split', {
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
      alert('Failed to split PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>PDF Splitter</h1>
      <p className="page-description">Extract individual pages from a PDF</p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload onFileSelect={setFiles} accept="application/pdf" />

            {files.length > 0 && (
              <div className="file-preview">
                <p>Selected: {files[0].name}</p>
                <p className="file-size">Size: {(files[0].size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            <button className="primary-btn" onClick={handleSplit} disabled={files.length === 0 || loading}>
              {loading ? 'Splitting...' : 'Split PDF'}
            </button>
          </>
        ) : (
          <div className="result-container">
            <div className="result-success">
              <p className="success-icon">✓</p>
              <h2>Split Complete!</h2>
            </div>

            <div className="stats">
              <div className="stat">
                <span className="stat-label">Total Pages</span>
                <span className="stat-value">{result.totalPages}</span>
              </div>
            </div>

            <div className="split-files">
              <label>Download Pages:</label>
              <div className="file-grid">
                {result.splitFiles.map((file, idx) => (
                  <a
                    key={idx}
                    href={`https://axiotools.onrender.com${file.outputPath}`}
                    download
                    className="file-download-card"
                  >
                    <span>📄</span>
                    <span>Page {file.pageNumber}</span>
                  </a>
                ))}
              </div>
            </div>

            <button className="secondary-btn" onClick={() => { setResult(null); setFiles([]); }}>
              Split Another PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFSplit;
