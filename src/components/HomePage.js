import React, {useState, useEffect} from "react";
import Map from "./Map"; 

const HomePage = () => {
    const [quickStats, setQuickStats] = useState(null);

    useEffect(() => {
        fetch("https://covid-19-data.p.rapidapi.com/country/all?format=json", {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "a4a39f1625mshc989c7ffe78b726p1cb175jsn278c5d40842c",
            "X-RapidAPI-Host": "covid-19-data.p.rapidapi.com",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setQuickStats(data[0]);
          })
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
                  <div className="value">{quickStats.confirmed.toLocaleString()}</div>
                  <div className="value">{quickStats?.confirmed?.toLocaleString() ?? "N/A"}</div>
                </div>
                <div className="fact-card">
                  <div className="label">Total Critical</div>
                  <div className="value">{quickStats.critical.toLocaleString()}</div>
                  <div className="value">{quickStats?.critical?.toLocaleString() ?? "N/A"}</div>
                </div>
                <div className="fact-card">
                  <div className="label">Total Deceased</div>
                  <div className="value">{quickStats.deaths.toLocaleString()}</div>
                  <div className="value">{quickStats?.deaths?.toLocaleString() ?? "N/A"}</div>
                </div>
                <div className="fact-card">
                  <div className="label">Total Recovered</div>
                  <div className="value">{quickStats.recovered.toLocaleString()}</div>
                  <div className="value">{quickStats?.recovered?.toLocaleString() ?? "N/A"}</div>
                </div>
              </>
            ) : (
              <p>Loading quick facts...</p>
            )}
          </div>
    
          <Map />
          
        </div>
      );
    };
    
export default HomePage;