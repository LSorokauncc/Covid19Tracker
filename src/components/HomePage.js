import React, {useState, useEffect} from "react";
import Map from "./Map"; 

const HomePage = () => {
    const [quickStats, setQuickStats] = useState(null);

    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((res) => res.json())
        .then((data) => setQuickStats(data))
        .catch((err) => console.error("Failed to load quick facts:", err));
    }, []);
      
     
    return (
      <div className="home-content">
        <div className="quick-facts-box">
          <h2>Quick Facts</h2>
          {quickStats ? (
            <>
              <div className="fact-card">
                <div className="label">Total Confirmed</div>
                <div className="value">{quickStats.cases.toLocaleString()}</div>
              </div>
              <div className="fact-card">
                <div className="label">Total Critical</div>
                <div className="value">{quickStats.critical.toLocaleString()}</div>
              </div>
              <div className="fact-card">
                <div className="label">Total Deceased</div>
                <div className="value">{quickStats.deaths.toLocaleString()}</div>
              </div>
              <div className="fact-card">
                <div className="label">Total Active</div>
                <div className="value">{quickStats.active.toLocaleString()}</div>
              </div>
              <div className="fact-card">
                <div className="label">Total Recovered</div>
                <div className="value">{quickStats.recovered.toLocaleString()}</div>
              </div>
              <div className="fact-card">
                <div className="label">Total Vaccinated</div>
                <div className="value">
                  {quickStats.peopleVaccinated?.toLocaleString() || "N/A"}
                </div>
              </div>
            </>
          ) : (
            <p>Loading stats...</p>
          )}
        </div>
    
          <Map />
          
        </div>
      );
    };
    
export default HomePage;