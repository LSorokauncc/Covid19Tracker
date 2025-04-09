import React, {useState, useEffect} from "react";
import Map from "./Map"; 

const HomePage = () => {
    const [quickStats, setQuickStats] = useState(null);

    useEffect(() => {
      const fetchStats = async () => {
        try {
          // First API call for general COVID stats
          const covidRes = await fetch("https://disease.sh/v3/covid-19/all");
          const covidData = await covidRes.json();
  
          // Second API call for total vaccinated doses
          const vaccineRes = await fetch("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1&fullData=false");
          const vaccineData = await vaccineRes.json();
          const vaccinated = Object.values(vaccineData)[0]; // Gets the value of the only property
  
          // Combine data
          setQuickStats({ ...covidData, vaccinated });
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
  
      fetchStats();
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
                  {quickStats.vaccinated?.toLocaleString() || "N/A"}
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