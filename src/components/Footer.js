import React from 'react';

const Footer = ({ darkMode, setDarkMode }) => {
  return (
    <footer className="footer">
      <div className="footer-left">© Copyright 2025</div>

      {/* Toggle icons inside footer */}
      <div className="footer-toggle">
        <div className="theme-toggle">
          <span
            className={`theme-icon ${!darkMode ? 'active' : ''}`}
            onClick={() => setDarkMode(false)}
            title="Light Mode"
          >
            ☀️
          </span>
          <span
            className={`theme-icon ${darkMode ? 'active' : ''}`}
            onClick={() => setDarkMode(true)}
            title="Dark Mode"
          >
            🌙
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
