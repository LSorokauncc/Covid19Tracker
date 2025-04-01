import React from 'react';

const Header = ({ setActiveTab, activeTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <header className="header-bar">
      <div className="left-section">
        <img
          src="/doctor-icon.png" // must be inside the public folder
          alt="Doctor Icon"
          className="doctor-icon"
        />
        <h1>COVID-19 Tracker</h1>
      </div>

      <nav className="nav-tabs">
        <span
          onClick={() => handleTabClick('home')}
          className={`tab-link ${activeTab === 'home' ? 'active' : ''}`}
        >
          Home
        </span>
        <span
          onClick={() => handleTabClick('search')}
          className={`tab-link ${activeTab === 'search' ? 'active' : ''}`}
        >
          Search
        </span>
        <span
          onClick={() => handleTabClick('wiki')}
          className={`tab-link ${activeTab === 'wiki' ? 'active' : ''}`}
        >
          Wiki
        </span>
        <span
          onClick={() => handleTabClick('compare')}
          className={`tab-link ${activeTab === 'compare' ? 'active' : ''}`}
        >
          Compare
        </span>
      </nav>
    </header>
  );
};

export default Header;
