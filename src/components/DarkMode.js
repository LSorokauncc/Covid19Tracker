import React, { useState, useEffect } from 'react';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {

    return (
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
  );
};

export default DarkModeToggle;
