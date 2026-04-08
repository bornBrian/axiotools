import React from 'react';
import FileUpload from '../components/FileUpload';
import './ImageConverter.css';

const ImageConverter = () => {
  const [files, setFiles] = React.useState([]);
  const [format, setFormat] = React.useState('png');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const formats = ['jpeg', 'png', 'webp'];

  const handleConvert = async () => {
    if (files.length === 0) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('format', format);

      const response = await fetch('http://localhost:5000/api/image/convert', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert('Error: ' + data.errors?.[0]);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to convert image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>Image Converter</h1>
      <p className="page-description">Convert images between JPEG, PNG, and WebP formats</p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload onFileSelect={setFiles} accept="image/jpeg,image/png,image/webp" />

            {files.length > 0 && (
              <div className="file-preview">
                <p>Selected: {files[0].name}</p>
                <p className="file-size">Current format: {files[0].type.split('/')[1].toUpperCase()}</p>
              </div>
            )}

            <div className="format-section">
              <label>Convert to format:</label>
              <div className="format-buttons">
                {formats.map((fmt) => (
                  <button
                    key={fmt}
                    className={`format-btn ${format === fmt ? 'active' : ''}`}
                    onClick={() => setFormat(fmt)}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
              <p className="format-info">
                {format === 'jpeg' && '💾 Best for photographs and quality'}
                {format === 'png' && '🎨 Best for graphics and transparency'}
                {format === 'webp' && '⚡ Best for web (smaller file size)'}
              </p>
            </div>

            <button className="primary-btn" onClick={handleConvert} disabled={files.length === 0 || loading}>
              {loading ? 'Converting...' : 'Convert Image'}
            </button>
          </>
        ) : (
          <div className="result-container">
            <div className="result-success">
              <p className="success-icon">✓</p>
              <h2>Conversion Complete!</h2>
            </div>

            <div className="stats">
              <div className="stat">
                <span className="stat-label">Original</span>
                <span className="stat-value">{(result.originalSize / 1024).toFixed(2)} KB</span>
              </div>
              <div className="stat">
                <span className="stat-label">Converted</span>
                <span className="stat-value">{(result.convertedSize / 1024).toFixed(2)} KB</span>
              </div>
              <div className="stat">
                <span className="stat-label">Format</span>
                <span className="stat-value">{result.format.toUpperCase()}</span>
              </div>
            </div>

            <a href={`http://localhost:5000${result.outputPath}`} download className="download-btn">
              📥 Download Converted Image
            </a>

            <button className="secondary-btn" onClick={() => { setResult(null); setFiles([]); }}>
              Convert Another Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageConverter;
