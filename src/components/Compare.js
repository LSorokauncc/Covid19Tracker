import React, { useState, useEffect } from "react";

const Compare = () => {
  const [continentStats, setContinentStats] = useState([]);
  const [leftContinent, setLeftContinent] = useState(null);
  const [rightContinent, setRightContinent] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://disease.sh/v3/covid-19/continents")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        return res.json();
      })
      .then((data) => {
        setContinentStats(data); // Set the fetched data to state
      })
      .catch((err) => console.error("Error fetching continent data:", err));
  }, []);

  const getContinentNames = () => {
    return continentStats.map((stat) => stat.continent);
  };

  const renderContinentTable = (continent) => {
    if (!continent)
      return <p className="select-continent-message">Select a continent to view statistics.</p>;

    return (
      <table className="compare-stats-table">
        <tbody>
          <tr>
            <td>Confirmed</td>
            <td>{continent.cases.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Deceased</td>
            <td>{continent.deaths.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Tests</td>
            <td>{continent.tests.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="compare-container">
        <div className="continent-details">
          <h2>WORLD COVID-19 STATS</h2>
          <div className="table-container">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Continent</th>
                  <th>Confirmed</th>
                  <th>Per Million</th>
                  <th>Deceased</th>
                  <th>Per Million</th>
                  <th>Tests</th>
                </tr>
              </thead>
              <tbody>
                {continentStats.map((stat, index) => (
                  <tr key={index}>
                    <td className="continent-name">{stat.continent}</td>
                    <td>{stat.cases.toLocaleString()}</td>
                    <td>{stat.casesPerOneMillion.toLocaleString()}</td>
                    <td>{stat.deaths.toLocaleString()}</td>
                    <td>{stat.deathsPerOneMillion.toLocaleString()}</td>
                    <td>{stat.tests.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h2 className="compare-title">COMPARE</h2>
      <div className="compare-tables">
        <div className="compare-table">
          <h3>First Continent</h3>
          <div className="continent-list">
            {continentStats.map((stat, index) => (
              <button
                key={index}
                className={`continent-button ${leftContinent === stat ? "active" : ""}`}
                onClick={() => setLeftContinent(stat)}
              >
                {stat.continent}
              </button>
            ))}
          </div>
          {renderContinentTable(leftContinent)}
        </div>

        <div className="compare-table">
          <h3>Second Continent</h3>
          <div className="continent-list">
            {continentStats.map((stat, index) => (
              <button
                key={index}
                className={`continent-button ${rightContinent === stat ? "active" : ""}`}
                onClick={() => setRightContinent(stat)}
              >
                {stat.continent}
              </button>
            ))}
          </div>
          {renderContinentTable(rightContinent)}
        </div>
      </div>
    </div>
  );
};

export default Compare;