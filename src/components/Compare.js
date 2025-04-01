import React, { useState, useEffect } from "react";

const Compare = () => {
  const [continentStats, setContinentStats] = useState([]);
  const [leftContinent, setLeftContinent] = useState(null);
  const [rightContinent, setRightContinent] = useState(null);

  useEffect(() => {
    fetch("https://covid-19-data.p.rapidapi.com/report/totals?format=json", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a4a39f1625mshc989c7ffe78b726p1cb175jsn278c5d40842c",
        "X-RapidAPI-Host": "covid-19-data.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const mockData = [
          { continent: "TOTAL", confirmed: 697437485, perMillion: 87783.912, deceased: 6935129, deceasedPerMillion: 872.899, tests: 7008624765 },
          { continent: "North America", confirmed: 128400588, perMillion: 215187.694, deceased: 1649792, deceasedPerMillion: 2764.901, tests: 1320159367 },
          { continent: "South America", confirmed: 69081747, perMillion: 157945.637, deceased: 1361889, deceasedPerMillion: 3113.766, tests: 244596953 },
          { continent: "Europe", confirmed: 260249256, perMillion: 31992.22, deceased: 2115173, deceasedPerMillion: 2428.859, tests: 3045663338 },
          { continent: "Asia", confirmed: 239360012, perMillion: 49540.606, deceased: 1957415, deceasedPerMillion: 405.128, tests: 2672401228 },
          { continent: "Africa", confirmed: 12562099, perMillion: 8937.596, deceased: 257923, deceasedPerMillion: 183505, tests: 109245538 },
          { continent: "Oceania", confirmed: 11793995, perMillion: "Unknown", deceased: 22885, deceasedPerMillion: "Unknown", tests: 81916639 },
        ];
        setContinentStats(mockData);
      })
      .catch((err) => console.error("Failed to load continent stats:", err));
  }, []);

  const renderContinentTable = (continent) => {
    if (!continent) return <p>Select a continent to view statistics.</p>;

    return (
      <table className="compare-stats-table">
        <tbody>
          <tr>
            <td>Confirmed</td>
            <td>{continent.confirmed.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Deceased</td>
            <td>{continent.deceased.toLocaleString()}</td>
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
                    <td>{stat.confirmed.toLocaleString()}</td>
                    <td>{stat.perMillion.toLocaleString()}</td>
                    <td>{stat.deceased.toLocaleString()}</td>
                    <td>{stat.deceasedPerMillion.toLocaleString()}</td>
                    <td>{stat.tests.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h2>COMPARE</h2>
      <div className="compare-tables">
        <div className="compare-table">
          <h3>Continent</h3>
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
          <h3>Continent</h3>
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