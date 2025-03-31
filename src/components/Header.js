import React from 'react';


const Header = ({ setActiveTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <header className="header-bar">
      <div className="left-section">
        {/*<img 
          src="https://img.icons8.com/emoji/48/doctor-emoji.png" 
          alt="Doctor Icon" 
          className="icon" 
        />*/}
        <h1>COVID-19 Tracker</h1>
      </div>

      <nav className="nav-tabs">
        <span onClick={() => handleTabClick('home')} className="tab-link">Home</span>
        <span onClick={() => handleTabClick('search')} className="tab-link">Search</span>
        <span onClick={() => handleTabClick('wiki')} className="tab-link">Wiki</span>
        <span onClick={() => handleTabClick('compare')} className="tab-link">Compare</span>
      </nav>
    </header>
  );
};

export default Header;
