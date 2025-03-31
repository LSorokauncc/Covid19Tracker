import React, {useState, useEffect } from "react";
import "./App.css";


//Importing all the components
import HomePage from "./components/HomePage"; 
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import Wiki from "./components/Wiki"; 
import Search from "./components/Search"; 
import Compare from "./components/Compare"; 
import DarkModeToggle from "./components/DarkMode"; 


// Our Nav Bar app components
function App() {
    const [activeTab, setActiveTab] = useState("home");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      document.body.className = darkMode ? "dark-mode" : "";
    }, [darkMode]);
  
    return (
      <>
        <Header setActiveTab={setActiveTab} />

        {activeTab === "home" && <HomePage />}
        {activeTab === "search" && <Search />}
        {activeTab === "wiki" && <Wiki />}
        {activeTab === "compare" && <Compare />}

        <Footer />
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </>
    );
  }
  
export default App;