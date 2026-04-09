import React from 'react';
import FileUpload from '../components/FileUpload';
import './ImageCompressor.css';

const ImageCompressor = () => {
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [compressionLevel, setCompressionLevel] = React.useState('medium');

  const handleCompress = async () => {
    if (files.length === 0) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('level', compressionLevel);

      const response = await fetch('https://axiotools.onrender.com/api/image/compress', {
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
      alert('Failed to compress image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>Image Compressor</h1>
      <p className="page-description">Compress images while maintaining high quality</p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload onFileSelect={setFiles} accept="image/jpeg,image/png,image/webp" />

            {files.length > 0 && (
              <div className="file-preview">
                <p>Selected: {files[0].name}</p>
                <p className="file-size">Size: {(files[0].size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            <div className="compression-settings">
              <label>Compression Level:</label>
              <div className="level-options">
                {['low', 'medium', 'high'].map((level) => (
                  <button
                    key={level}
                    className={`level-btn ${compressionLevel === level ? 'active' : ''}`}
                    onClick={() => setCompressionLevel(level)}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
              <p className="level-hint">
                {compressionLevel === 'low' && 'Best quality, larger file size'}
                {compressionLevel === 'medium' && 'Balanced quality and size'}
                {compressionLevel === 'high' && 'Smaller file size, reduced quality'}
              </p>
            </div>

            <button className="primary-btn" onClick={handleCompress} disabled={files.length === 0 || loading}>
              {loading ? 'Compressing...' : 'Compress Image'}
            </button>
          </>
        ) : (
          <div className="result-container">
            <div className="result-success">
              <p className="success-icon">✓</p>
              <h2>Compression Complete!</h2>
            </div>

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

            <a href={`https://axiotools.onrender.com${result.outputPath}`} download className="download-btn">
              📥 Download Compressed Image
            </a>

            <button className="secondary-btn" onClick={() => { setResult(null); setFiles([]); }}>
              Compress Another Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
