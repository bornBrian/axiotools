import React from 'react';
import ImageCompressor from '../components/ImageCompressor';
import ImageResizer from '../components/ImageResizer';
import ImageConverter from '../components/ImageConverter';
import ImageToPDF from '../components/ImageToPDF';
import ImageWatermark from '../components/ImageWatermark';
import ImageFilter from '../components/ImageFilter';
import './PageLayout.css';

const ImageTools = ({ initialTool }) => {
  const [selectedTool, setSelectedTool] = React.useState(initialTool || 'compress');

  return (
    <div className="page-layout">
      <div className="tool-sidebar">
        <button
          className={`tool-selector ${selectedTool === 'compress' ? 'active' : ''}`}
          onClick={() => setSelectedTool('compress')}
        >
          🗜️ Compress
        </button>
        <button
          className={`tool-selector ${selectedTool === 'resize' ? 'active' : ''}`}
          onClick={() => setSelectedTool('resize')}
        >
          📐 Resize
        </button>
        <button
          className={`tool-selector ${selectedTool === 'convert' ? 'active' : ''}`}
          onClick={() => setSelectedTool('convert')}
        >
          🎨 Convert
        </button>
        <button
          className={`tool-selector ${selectedTool === 'image-to-pdf' ? 'active' : ''}`}
          onClick={() => setSelectedTool('image-to-pdf')}
        >
          📄 Image to PDF
        </button>
        <button
          className={`tool-selector ${selectedTool === 'watermark' ? 'active' : ''}`}
          onClick={() => setSelectedTool('watermark')}
        >
          💧 Watermark
        </button>
        <button
          className={`tool-selector ${selectedTool === 'filter' ? 'active' : ''}`}
          onClick={() => setSelectedTool('filter')}
        >
          🎭 Filters
        </button>
      </div>

      <div className="tool-content">
        {selectedTool === 'compress' && <ImageCompressor />}
        {selectedTool === 'resize' && <ImageResizer />}
        {selectedTool === 'convert' && <ImageConverter />}
        {selectedTool === 'image-to-pdf' && <ImageToPDF />}
        {selectedTool === 'watermark' && <ImageWatermark />}
        {selectedTool === 'filter' && <ImageFilter />}
      </div>
    </div>
  );
};

export default ImageTools;
