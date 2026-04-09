import React, { useState } from 'react';
import QRCode from 'qrcode';
import './ImageCompressor.css';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQRCode = async () => {
    if (!text.trim()) {
      alert('Please enter text or a URL');
      return;
    }

    setLoading(true);
    try {
      const dataUrl = await QRCode.toDataURL(text.trim(), {
        width: 512,
        margin: 2,
        errorCorrectionLevel: 'H',
      });
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error('QR generation error:', error);
      alert('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'axiotools-qr-code.png';
    link.click();
  };

  return (
    <div className="tool-page">
      <h1>🔳 Create QR Code</h1>
      <p className="page-description">Generate QR codes for URLs, text, emails, and contact details</p>

      <div className="tool-container">
        <div className="form-group">
          <label htmlFor="qr-input">Text or URL</label>
          <textarea
            id="qr-input"
            rows={4}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter a website URL (https://...) or any text"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          />
        </div>

        <button className="primary-btn" onClick={generateQRCode} disabled={loading || !text.trim()}>
          {loading ? 'Generating...' : 'Generate QR Code'}
        </button>

        {qrDataUrl && (
          <div className="result-section" style={{ marginTop: '1rem' }}>
            <div className="result-success">✅ QR Code generated!</div>
            <img src={qrDataUrl} alt="Generated QR code" style={{ width: '220px', height: '220px', marginTop: '1rem' }} />
            <button className="secondary-btn" onClick={downloadQRCode}>
              📥 Download PNG
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
