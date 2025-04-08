import React, { useState, useEffect } from "react";
import "./App.css";

// Components
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wiki from "./components/Wiki";
import Search from "./components/Search";
import Compare from "./components/Compare";
import WikiDetail from "./components/WikiDetail";

function App() {
  // Load activeTab from localStorage on page load
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "home";
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  // Special case: if on /detail page
  if (window.location.pathname === "/detail") {
    return (
      <div className="page-wrapper">
        <Header
          setActiveTab={(tab) => {
            localStorage.setItem("activeTab", tab); // save it for when we return
            window.location.href = "/";
          }}
          activeTab="wiki"
        />
        <div className="content-wrapper">
          <WikiDetail />
        </div>
        <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    );
  }

  // Save active tab to localStorage whenever it changes
  const handleSetActiveTab = (tab) => {
    localStorage.setItem("activeTab", tab);
    setActiveTab(tab);
  };

  return (
    <div className="page-wrapper">
      <Header setActiveTab={handleSetActiveTab} activeTab={activeTab} />

      <div className="content-wrapper">
        {activeTab === "home" && <HomePage />}
        {activeTab === "search" && <Search />}
        {activeTab === "wiki" && <Wiki />}
        {activeTab === "compare" && <Compare />}
      </div>

      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
