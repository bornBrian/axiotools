import React from 'react';
import PDFMerge from '../components/PDFMerge';
import PDFSplit from '../components/PDFSplit';
import WordToPDF from '../components/WordToPDF';
import PDFCompressor from '../components/PDFCompressor';
import PDFToWord from '../components/PDFToWord';
import './PageLayout.css';

const PDFTools = ({ initialTool, onBackToDashboard }) => {
  const [selectedTool, setSelectedTool] = React.useState(initialTool || 'merge');

  return (
    <>
      {onBackToDashboard && (
        <button className="page-back-btn" onClick={onBackToDashboard}>
          ← Back to Main Page
        </button>
      )}
      <div className="page-layout">
        <div className="tool-sidebar">
        <button
          className={`tool-selector ${selectedTool === 'merge' ? 'active' : ''}`}
          onClick={() => setSelectedTool('merge')}
        >
          📑 Merge
        </button>
        <button
          className={`tool-selector ${selectedTool === 'split' ? 'active' : ''}`}
          onClick={() => setSelectedTool('split')}
        >
          ✂️ Split
        </button>
        <button
          className={`tool-selector ${selectedTool === 'word-to-pdf' ? 'active' : ''}`}
          onClick={() => setSelectedTool('word-to-pdf')}
        >
          📝 Word to PDF
        </button>
        <button
          className={`tool-selector ${selectedTool === 'pdf-to-word' ? 'active' : ''}`}
          onClick={() => setSelectedTool('pdf-to-word')}
        >
          📘 PDF to Word
        </button>
        <button
          className={`tool-selector ${selectedTool === 'compress' ? 'active' : ''}`}
          onClick={() => setSelectedTool('compress')}
        >
          📦 Compress PDF
        </button>
        </div>

        <div className="tool-content">
          {selectedTool === 'merge' && <PDFMerge />}
          {selectedTool === 'split' && <PDFSplit />}
          {selectedTool === 'word-to-pdf' && <WordToPDF />}
          {selectedTool === 'pdf-to-word' && <PDFToWord />}
          {selectedTool === 'compress' && <PDFCompressor />}
        </div>
      </div>
    </>
  );
};

export default PDFTools;
