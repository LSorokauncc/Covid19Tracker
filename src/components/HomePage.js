import React, { useState, useEffect } from "react";
import Map from "./Map";

const HomePage = () => {
  const [quickStats, setQuickStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://covid-19.dataflowkit.com/v1/world");
        const data = await res.json();

        // Parse string values to numbers for formatting
        const parseStat = (value) =>
          value && !isNaN(Number(value.replace(/,/g, "")))
            ? Number(value.replace(/,/g, ""))
            : null;

        const parsedData = {
          confirmed: parseStat(data["Total Cases_text"]),
          deaths: parseStat(data["Total Deaths_text"]),
          recovered: parseStat(data["Total Recovered_text"]),
          active: parseStat(data["Active Cases_text"]),
          newCases: parseStat(data["New Cases_text"]),
          newDeaths: parseStat(data["New Deaths_text"]),
          lastUpdate: data["Last Update"],
        };

        setQuickStats(parsedData);
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
              <div className="value">
                {quickStats.confirmed?.toLocaleString() || "N/A"}
              </div>
            </div>
            <div className="fact-card">
              <div className="label">New Cases</div>
              <div className="value">
                {quickStats.newCases?.toLocaleString() || "N/A"}
              </div>
            </div>
            <div className="fact-card">
              <div className="label">Total Deaths</div>
              <div className="value">
                {quickStats.deaths?.toLocaleString() || "N/A"}
              </div>
            </div>
            <div className="fact-card">
              <div className="label">New Deaths</div>
              <div className="value">
                {quickStats.newDeaths?.toLocaleString() || "N/A"}
              </div>
            </div>
            <div className="fact-card">
              <div className="label">Total Recovered</div>
              <div className="value">
                {quickStats.recovered?.toLocaleString() || "N/A"}
              </div>
            </div>
            <div className="fact-card">
              <div className="label">Total Active</div>
              <div className="value">
                {quickStats.active?.toLocaleString() || "N/A"}
              </div>
            </div>
            <div className="fact-card">
              <div className="label">Last Update</div>
              <div className="value">{quickStats.lastUpdate || "N/A"}</div>
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
