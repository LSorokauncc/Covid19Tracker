import React, { useState, useEffect } from "react";
import "./App.css";

// Components
import HomePage from "./components/HomePage"; 
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import Wiki from "./components/Wiki"; 
import Search from "./components/Search"; 
import Compare from "./components/Compare"; 
import DarkModeToggle from "./components/DarkMode"; 
import WikiDetail from "./components/WikiDetail"; // ← Add this


//Nav Bar
function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  if (window.location.pathname === "/detail") {
    return <WikiDetail />;
  }

  return (
    <>
      <Header setActiveTab={setActiveTab} activeTab={activeTab} />

      {activeTab === "home" && <HomePage />}
      {activeTab === "search" && <Search />}
      {activeTab === "wiki" && <Wiki />}
      {activeTab === "compare" && <Compare />}

      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </>
  );
}

export default App;
