import React, { useState, useEffect } from "react";
import Map from "./Map";

const HomePage = () => {
  const [quickStats, setQuickStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch global stats
        const statsRes = await fetch("https://disease.sh/v3/covid-19/all");
        const statsData = await statsRes.json();

        // Fetch vaccination totals
        const vaccineRes = await fetch("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1&fullData=false");
        const vaccineData = await vaccineRes.json();
        const vaccinated = Object.values(vaccineData)[0];

        setQuickStats({ ...statsData, vaccinated });
      } catch (err) {
        console.error("Error fetching homepage data:", err);
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
              <div className="value">{quickStats.cases?.toLocaleString() || "N/A"}</div>
            </div>
            <div className="fact-card">
              <div className="label">New Critical</div>
              <div className="value">{quickStats.critical?.toLocaleString() || "N/A"}</div>
            </div>
            <div className="fact-card">
              <div className="label">Total Deceased</div>
              <div className="value">{quickStats.deaths?.toLocaleString() || "N/A"}</div>
            </div>
            <div className="fact-card">
              <div className="label">Total Active</div>
              <div className="value">{quickStats.active?.toLocaleString() || "N/A"}</div>
            </div>
            <div className="fact-card">
              <div className="label">Total Recovered</div>
              <div className="value">{quickStats.recovered?.toLocaleString() || "N/A"}</div>
            </div>
            <div className="fact-card">
              <div className="label">Total Vaccinated</div>
              <div className="value">{quickStats.vaccinated?.toLocaleString() || "N/A"}</div>
            </div>
          </>
        ) : (
          <p>Loading stats...</p>
        )}
      </div>

      <div className="map-container">
        <Map />
        <div className="heatmap-legend">
          <div className="legend-bar">
            <div className="legend-color" style={{ background: "rgb(255,255,178)" }}></div>
            <div className="legend-color" style={{ background: "rgb(254,217,118)" }}></div>
            <div className="legend-color" style={{ background: "rgb(253,141,60)" }}></div>
            <div className="legend-color" style={{ background: "rgb(252,78,42)" }}></div>
            <div className="legend-color" style={{ background: "rgb(227,26,28)" }}></div>
            <div className="legend-color" style={{ background: "rgb(177,0,38)" }}></div>
          </div>
          <div className="legend-labels">
            <span>&lt;1,000</span>
            <span>1k-5k</span>
            <span>5k-10k</span>
            <span>10k-50k</span>
            <span>50k-500k</span>
            <span>&gt;1M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;