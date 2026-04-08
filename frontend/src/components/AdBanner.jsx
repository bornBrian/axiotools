import React, { useEffect } from 'react';
import './AdBanner.css';

const AdBanner = ({ placement = 'top' }) => {
  useEffect(() => {
    // Google AdSense script loading
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, [placement]);

  return (
    <div className={`ad-container ${placement}`}>
      <div className="ad-label">Advertisement</div>
      <div className="ad-content">
        {/* Google AdSense Banner Ad */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '250px', maxWidth: '728px' }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
          data-ad-slot="xxxxxxxxxx"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AdBanner;
