import React, { useState, useEffect } from "react";

const Compare = () => {
  const [continentStats, setContinentStats] = useState([]);

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
          { continent: "TOTAL", confirmed: 1000000, perMillion: 5000, deceased: 20000, deceasedPerMillion: 100, tests: 5000000 },
          { continent: "North America", confirmed: 300000, perMillion: 4000, deceased: 10000, deceasedPerMillion: 200, tests: 1500000 },
          { continent: "South America", confirmed: 200000, perMillion: 3000, deceased: 8000, deceasedPerMillion: 150, tests: 1000000 },
          { continent: "Europe", confirmed: 400000, perMillion: 6000, deceased: 12000, deceasedPerMillion: 250, tests: 2000000 },
          { continent: "Asia", confirmed: 500000, perMillion: 2000, deceased: 15000, deceasedPerMillion: 50, tests: 3000000 },
          { continent: "Africa", confirmed: 100000, perMillion: 1000, deceased: 5000, deceasedPerMillion: 30, tests: 500000 },
          { continent: "Oceania", confirmed: 50000, perMillion: 1500, deceased: 1000, deceasedPerMillion: 20, tests: 300000 },
        ];
        setContinentStats(mockData);
      })
      .catch((err) => console.error("Failed to load continent stats:", err));
  }, []);

  return (
    <div>
      <div className="compare-container">
        <div className="continent-details">
          <h2>Continent Statistics</h2>
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
    </div>
  );
};

export default Compare;