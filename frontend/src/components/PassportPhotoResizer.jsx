import React from 'react';
import FileUpload from './FileUpload';
import './ImageCompressor.css';
import './ImageResizer.css';

const PassportPhotoResizer = () => {
  const [files, setFiles] = React.useState([]);
  const [preset, setPreset] = React.useState('usa');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const presets = {
    usa: {
      label: 'USA Passport (2x2 in)',
      width: 600,
      height: 600,
      note: 'US passport photo equivalent at 300 DPI (2x2 inches).',
    },
    uk: {
      label: 'UK Passport (35x45 mm)',
      width: 413,
      height: 531,
      note: 'UK passport photo equivalent at 300 DPI (35x45 mm).',
    },
    canada: {
      label: 'Canada Passport (50x70 mm)',
      width: 591,
      height: 827,
      note: 'Canada passport photo equivalent at 300 DPI (50x70 mm).',
    },
  };

  const currentPreset = presets[preset];

  const handleResize = async () => {
    if (files.length === 0) {
      alert('Please upload an image first.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('width', currentPreset.width);
      formData.append('height', currentPreset.height);
      formData.append('maintainAspectRatio', 'true');

      const response = await fetch('https://axiotools.onrender.com/api/image/resize', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!data.success) {
        alert(`Error: ${data.error || data.errors?.[0] || 'Failed to resize image.'}`);
        return;
      }

      const downloadResponse = await fetch(`https://axiotools.onrender.com${data.data.outputPath}`);
      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);

      setResult({
        ...data.data,
        url,
        dimensions: `${currentPreset.width}x${currentPreset.height}px`,
      });
    } catch (error) {
      console.error('Passport resize error:', error);
      alert('Failed to create passport photo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>🛂 Passport Photo Resizer</h1>
      <p className="page-description">
        Create passport-size photos for USA, UK, and Canada with one click.
      </p>

      <div className="tool-container">
        {!result ? (
          <>
            <FileUpload onFileSelect={setFiles} accept="image/jpeg,image/png,image/webp" multiple={false} />

            {files.length > 0 && (
              <div className="file-preview">
                <p>Selected: {files[0].name}</p>
                <p className="file-size">{(files[0].size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            <div className="preset-section">
              <label>Passport Preset:</label>
              <div className="preset-buttons">
                {Object.entries(presets).map(([key, value]) => (
                  <button
                    key={key}
                    className={`preset-btn ${preset === key ? 'active' : ''}`}
                    onClick={() => setPreset(key)}
                  >
                    {value.label}
                  </button>
                ))}
              </div>
              <p className="level-hint" style={{ marginTop: '0.75rem' }}>{currentPreset.note}</p>
            </div>

            <button className="primary-btn" onClick={handleResize} disabled={files.length === 0 || loading}>
              {loading ? 'Generating...' : 'Generate Passport Photo'}
            </button>
          </>
        ) : (
          <div className="result-container">
            <div className="result-success">
              <p className="success-icon">✓</p>
              <h2>Passport Photo Ready</h2>
            </div>

            <div className="stats">
              <div className="stat">
                <span className="stat-label">Preset</span>
                <span className="stat-value" style={{ fontSize: '16px' }}>{currentPreset.label}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Output Size</span>
                <span className="stat-value" style={{ fontSize: '16px' }}>{result.dimensions}</span>
              </div>
            </div>

            <a href={result.url} download={result.fileName} className="download-btn">
              📥 Download Passport Photo
            </a>

            <button
              className="secondary-btn"
              onClick={() => {
                if (result?.url) window.URL.revokeObjectURL(result.url);
                setResult(null);
                setFiles([]);
              }}
            >
              Resize Another Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassportPhotoResizer;
