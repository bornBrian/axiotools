import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    autoDelete: true,
    trackHistory: false,
    notifications: true,
  });
  const [saved, setSaved] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('axiotools-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }
  }, []);

  // Handle setting changes
  const handleThemeChange = (theme) => {
    setSettings({ ...settings, theme });
    setSaved(false);
  };

  const handleCheckboxChange = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    setSaved(false);
  };

  // Save settings to localStorage
  const handleSaveSettings = () => {
    localStorage.setItem('axiotools-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="tool-page">
      <h1>⚙️ Settings</h1>
      <p className="page-description">Customize your AxioTools experience</p>

      <div className="tool-container">
        <div style={{ maxWidth: '600px' }}>
          {/* Theme Section */}
          <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem' }}>🎨 Theme</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="theme" 
                checked={settings.theme === 'light'}
                onChange={() => handleThemeChange('light')}
              />
              <span>Light Theme</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginTop: '0.5rem' }}>
              <input 
                type="radio" 
                name="theme"
                checked={settings.theme === 'dark'}
                onChange={() => handleThemeChange('dark')}
              />
              <span>Dark Theme (Coming Soon)</span>
            </label>
          </div>

          {/* Privacy Section */}
          <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem' }}>🔒 Privacy & Data</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={settings.autoDelete}
                onChange={() => handleCheckboxChange('autoDelete')}
              />
              <span>Auto-delete files after processing</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginTop: '0.5rem' }}>
              <input 
                type="checkbox"
                checked={settings.trackHistory}
                onChange={() => handleCheckboxChange('trackHistory')}
              />
              <span>Track processing history</span>
            </label>
          </div>

          {/* Notifications Section */}
          <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem' }}>🔔 Notifications</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={settings.notifications}
                onChange={() => handleCheckboxChange('notifications')}
              />
              <span>Enable notifications</span>
            </label>
          </div>

          {/* About Section */}
          <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem' }}>ℹ️ About</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-light)', lineHeight: '1.6' }}>
              <strong>AxioTools v1.0.0</strong><br />
              Fast, clean file processing tools<br />
              <br />
              All processing happens instantly on your browser.<br />
              Files are processed locally and never stored on servers.<br />
              <br />
              © 2026 AxioTools. All rights reserved.
            </p>
          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              className="primary-btn"
              onClick={handleSaveSettings}
              style={{ width: 'auto' }}
            >
              💾 Save Settings
            </button>
            {saved && (
              <span style={{ color: 'var(--success-color)', fontSize: '14px', fontWeight: '500' }}>
                ✅ Settings saved!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
