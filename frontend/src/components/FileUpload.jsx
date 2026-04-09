import React from 'react';
import './FileUpload.css';

const FileUpload = ({ onFileSelect, accept, multiple = false }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const parseAcceptedTypes = React.useMemo(() => {
    if (!accept) return [];
    return accept.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean);
  }, [accept]);

  const isFileAccepted = (file) => {
    if (parseAcceptedTypes.length === 0) return true;

    const fileName = (file.name || '').toLowerCase();
    const mimeType = (file.type || '').toLowerCase();

    return parseAcceptedTypes.some((rule) => {
      if (rule.endsWith('/*')) {
        const base = rule.replace('/*', '');
        return mimeType.startsWith(`${base}/`);
      }
      if (rule.startsWith('.')) {
        return fileName.endsWith(rule);
      }
      return mimeType === rule;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(isFileAccepted);
    onFileSelect(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    onFileSelect(files);
  };

  return (
    <div
      className={`file-upload ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileInput}
        hidden
      />

      <div className="upload-content">
        <div className="upload-icon">📁</div>
        <h3>Drag and drop your file here</h3>
        <p>or click to browse</p>
        <p className="upload-hint">Maximum file size: 50MB</p>
      </div>
    </div>
  );
};

export default FileUpload;
