import React, { useState } from 'react';
import FileUpload from './FileUpload';
import './ImageCompressor.css';

const ImageFilter = () => {
  const [files, setFiles] = useState([]);
  const [filterType, setFilterType] = useState('grayscale');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const filters = [
    { id: 'grayscale', name: '⬜ Grayscale' },
    { id: 'sepia', name: '🟤 Sepia' },
    { id: 'blur', name: '💨 Blur' },
    { id: 'sharpen', name: '⚡ Sharpen' },
    { id: 'invert', name: '🔄 Invert' },
    { id: 'vintage', name: '📷 Vintage' },
  ];

  const handleApplyFilter = async () => {
    if (files.length === 0) {
      alert('Please select an image');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', files[0]);
      formData.append('filter', filterType);

      const response = await fetch('https://axiotools.onrender.com/api/image/filter', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const downloadResponse = await fetch(`https://axiotools.onrender.com${data.data.outputPath}`);
        const blob = await downloadResponse.blob();
        const url = window.URL.createObjectURL(blob);
        setResult({ url, filename: 'filtered-image.png' });
      } else {
        alert('Error: ' + (data.error || 'Failed to apply filter'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to apply filter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <h1>🎭 Apply Image Filters</h1>
      <p className="page-description">Enhance your images with professional filters</p>

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

            {files.length > 0 && (
              <div className="form-group">
                <label>Select Filter:</label>
                <div className="level-options">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      className={`level-btn ${filterType === filter.id ? 'active' : ''}`}
                      onClick={() => setFilterType(filter.id)}
                      disabled={loading}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              className="primary-btn" 
              onClick={handleApplyFilter} 
              disabled={files.length === 0 || loading}
            >
              {loading ? 'Applying Filter...' : 'Apply Filter'}
            </button>
          </>
        ) : (
          <div className="result-section">
            <div className="result-success">✅ Filter applied successfully!</div>
            <a href={result.url} download={result.filename} className="primary-btn" style={{ marginTop: '1rem' }}>
              📥 Download Image
            </a>
            <button 
              className="secondary-btn" 
              onClick={() => {
                setResult(null);
                setFiles([]);
                setFilterType('grayscale');
              }}
            >
              Apply Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageFilter;
