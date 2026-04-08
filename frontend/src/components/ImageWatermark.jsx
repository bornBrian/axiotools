import React, { useState } from 'react';
import FileUpload from './FileUpload';
import './ImageCompressor.css';

const ImageWatermark = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [watermarkText, setWatermarkText] = useState('WATERMARK');
  const [opacity, setOpacity] = useState(0.5);

  const handleWatermark = async () => {
    if (files.length === 0) {
      alert('Please select an image');
      return;
    }

    if (!watermarkText.trim()) {
      alert('Please enter watermark text');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', files[0]);
      formData.append('text', watermarkText);
      formData.append('opacity', opacity);

      const response = await fetch('http://localhost:5000/api/image/watermark', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const downloadResponse = await fetch(`http://localhost:5000${data.data.outputPath}`);
        const blob = await downloadResponse.blob();
        const url = window.URL.createObjectURL(blob);
        setResult({ url, filename: 'watermarked-image.png' });
      } else {
        alert('Error: ' + (data.error || 'Failed to add watermark'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add watermark');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>💧 Add Watermark to Image</h1>
      <p className="page-description">Add a text watermark to protect your images</p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload 
              onFileSelect={setFiles}
              accept="image/jpeg,image/png,image/webp"
              multiple={false}
            />

            {files.length > 0 && (
              <div className="file-preview">
                <p>Selected: {files[0].name}</p>
                <p className="file-size">{(files[0].size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="watermark-text">Watermark Text:</label>
              <input
                id="watermark-text"
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="Enter watermark text"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="opacity">Opacity: {(opacity * 100).toFixed(0)}%</label>
              <input
                id="opacity"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                disabled={loading}
              />
            </div>

            <button 
              className="primary-btn" 
              onClick={handleWatermark} 
              disabled={files.length === 0 || !watermarkText.trim() || loading}
            >
              {loading ? 'Adding Watermark...' : 'Add Watermark'}
            </button>
          </>
        ) : (
          <div className="result-section">
            <div className="result-success">✅ Watermark added successfully!</div>
            <a href={result.url} download={result.filename} className="primary-btn" style={{ marginTop: '1rem' }}>
              📥 Download Image
            </a>
            <button 
              className="secondary-btn" 
              onClick={() => {
                setResult(null);
                setFiles([]);
                setWatermarkText('WATERMARK');
              }}
            >
              Add Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageWatermark;
