import React, { useState, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const qrCodeRef = useRef(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (qrCodeRef.current) {
      qrCodeRef.current.download();
    }
  };

  return (
    <div className="qr-container">
      <form onSubmit={handleGenerate}>
        <input
          type="text"
          placeholder="Enter Google Maps URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="url-input"
        />
        <button type="submit" className="generate-btn">Generate QR Code</button>
      </form>
      {url && (
        <div className="qr-code">
          <QRCode
            value={url}
            size={256}
            bgColor="#ffffff"
            fgColor="#000000"
            ref={qrCodeRef}
          />
          <a href={qrCodeRef.current?.toDataURL()} download="qr-code.png" className="download-btn">Download as PNG</a>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
