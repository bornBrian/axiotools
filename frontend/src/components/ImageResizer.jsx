import React from 'react';
import FileUpload from '../components/FileUpload';
import './ImageResizer.css';

const ImageResizer = () => {
  const [files, setFiles] = React.useState([]);
  const [width, setWidth] = React.useState(1920);
  const [height, setHeight] = React.useState(1080);
  const [maintainRatio, setMaintainRatio] = React.useState(true);
  const [preset, setPreset] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const presets = {
    '720p': { w: 1280, h: 720 },
    '1080p': { w: 1920, h: 1080 },
    '4K': { w: 3840, h: 2160 },
    'thumbnail': { w: 150, h: 150 },
    'small': { w: 300, h: 300 },
  };

  const handlePresetChange = (presetName) => {
    setPreset(presetName);
    const dims = presets[presetName];
    setWidth(dims.w);
    setHeight(dims.h);
  };

  const handleResize = async () => {
    if (files.length === 0) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('width', width);
      formData.append('height', height);
      formData.append('maintainAspectRatio', maintainRatio);

      const response = await fetch('http://localhost:5000/api/image/resize', {
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
      alert('Failed to resize image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>Image Resizer</h1>
      <p className="page-description">Resize images to specific dimensions with high quality</p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload onFileSelect={setFiles} accept="image/jpeg,image/png,image/webp" />

            {files.length > 0 && (
              <div className="file-preview">
                <p>Selected: {files[0].name}</p>
              </div>
            )}

            <div className="resize-settings">
              <div className="preset-section">
                <label>Quick Presets:</label>
                <div className="preset-buttons">
                  {Object.keys(presets).map((name) => (
                    <button
                      key={name}
                      className={`preset-btn ${preset === name ? 'active' : ''}`}
                      onClick={() => handlePresetChange(name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dimensions-section">
                <label>Custom Dimensions:</label>
                <div className="dimension-inputs">
                  <div className="input-group">
                    <label htmlFor="width">Width (px)</label>
                    <input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value))}
                      min="1"
                      max="4000"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="height">Height (px)</label>
                    <input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      min="1"
                      max="4000"
                    />
                  </div>
                </div>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={maintainRatio}
                    onChange={(e) => setMaintainRatio(e.target.checked)}
                  />
                  <span>Maintain aspect ratio</span>
                </label>
              </div>
            </div>

            <button className="primary-btn" onClick={handleResize} disabled={files.length === 0 || loading}>
              {loading ? 'Resizing...' : 'Resize Image'}
            </button>
          </>
        ) : (
          <div className="result-container">
            <div className="result-success">
              <p className="success-icon">✓</p>
              <h2>Resize Complete!</h2>
            </div>

            <div className="stats">
              <div className="stat">
                <span className="stat-label">New Dimensions</span>
                <span className="stat-value">
                  {result.newDimensions.width}x{result.newDimensions.height}
                </span>
              </div>
            </div>

            <a href={`http://localhost:5000${result.outputPath}`} download className="download-btn">
              📥 Download Resized Image
            </a>

            <button className="secondary-btn" onClick={() => { setResult(null); setFiles([]); }}>
              Resize Another Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageResizer;
