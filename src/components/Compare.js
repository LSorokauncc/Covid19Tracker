import React, { useState, useEffect } from "react";

const Compare = () => {
  const [continentStats, setContinentStats] = useState([]);
  const [leftContinent, setLeftContinent] = useState(null);
  const [rightContinent, setRightContinent] = useState(null);

  useEffect(() => {
    // Mock data for continents
    const mockData = [
      {
        continent: "TOTAL",
        cases: 697437485,
        casesPerOneMillion: 87783.912,
        deaths: 6935129,
        deathsPerOneMillion: 872.899,
        tests: 7008624765,
      },
      {
        continent: "North America",
        cases: 18400588,
        casesPerOneMillion: 215187.694,
        deaths: 1648792,
        deathsPerOneMillion: 2764.901,
        tests: 1320159367,
      },
      {
        continent: "South America",
        cases: 69081747,
        casesPerOneMillion: 157945.637,
        deaths: 1361889,
        deathsPerOneMillion: 3113.766,
        tests: 244596953,
      },
      {
        continent: "Europe",
        cases: 69081747,
        casesPerOneMillion: 157945.637,
        deaths: 1361889,
        deathsPerOneMillion: 3113.766,
        tests: 244596953,
      },
      {
        continent: "Asia",
        cases: 239360012,
        casesPerOneMillion: 49540.606,
        deaths: 1957415,
        deathsPerOneMillion: 405.128,
        tests: 2672401228,
      },
      {
        continent: "Africa",
        cases: 12562099,
        casesPerOneMillion: 8937.595,
        deaths: 257923,
        deathsPerOneMillion: 183.505,
        tests: 109245538,
      },
      {
        continent: "Oceana/Australia",
        cases: 11793995,
        casesPerOneMillion: "Unknown",
        deaths: 22885,
        deathsPerOneMillion: "Unknown",
        tests: 81916639,
      },
    ];

    setContinentStats(mockData); // Set the mock data directly to state
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
