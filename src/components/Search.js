import React, { useState, useEffect } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const regions = [
    { name: "North America", countries: ["USA", "Canada", "Mexico", "Cuba", "Jamaica"] },
    { name: "South America", countries: ["Brazil", "Argentina", "Colombia", "Peru", "Chile"] },
    { name: "Europe", countries: ["UK", "France", "Germany", "Italy", "Spain"] },
    { name: "Africa", countries: ["South Africa", "Nigeria", "Kenya", "Egypt", "Morocco"] },
    { name: "Asia", countries: ["China", "Japan", "India", "South Korea", "Indonesia"] },
    { name: "Oceania", countries: ["Australia", "New Zealand", "Fiji", "Papua New Guinea"] }
  ];

  useEffect(() => {
    if (selectedCountry) {
      fetchCountryData(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchCountryData = async (country) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const data = await response.json();
      setCountryInfo(data);
    } catch (err) {
      setError(`Error fetching country data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      const allCountries = regions.flatMap(r => r.countries);
      const matchedCountry = allCountries.find(c => 
        c.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchedCountry) {
        setSelectedCountry(matchedCountry);
      }
    }
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const formatNumber = (num) => {
    return num ? num.toLocaleString() : "N/A";
  };

  return (
    <div className="search-container">
      <div className="search-panel">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search Country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <span role="img" aria-label="search">🔍</span>
          </button>
        </form>

        <div className="regions-list">
          <div className="region-header" onClick={() => setSelectedCountry("all")}>
            Worldwide
          </div>
          
          {regions.map((region) => (
            <div key={region.name}>
              <div className="region-header" onClick={() => handleRegionClick(region.name)}>
                {region.name}
              </div>
              
              {selectedRegion === region.name && (
                <div className="countries-list">
                  {region.countries.map((country) => (
                    <div 
                      key={country}
                      className={`country-item ${selectedCountry === country ? 'selected' : ''}`}
                      onClick={() => handleCountryClick(country)}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="country-data-panel">
        <div className="country-header">
          <h2 className="country-title">
            {selectedCountry === "all" ? "Worldwide" : selectedCountry}
          </h2>
        </div>

        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : countryInfo ? (
          <div className="country-stats">
            <h3>Current COVID-19 Statistics</h3>
            <table className="stats-table">
              <tbody>
                <tr>
                  <td className="stat-label">Active Cases:</td>
                  <td className="stat-value">{formatNumber(countryInfo.active)}</td>
                </tr>
                <tr>
                  <td className="stat-label">Critical Cases:</td>
                  <td className="stat-value">{formatNumber(countryInfo.critical)}</td>
                </tr>
                <tr>
                  <td className="stat-label">Tests Conducted:</td>
                  <td className="stat-value">{formatNumber(countryInfo.tests)}</td>
                </tr>
                <tr>
                  <td className="stat-label">Cases Per Million:</td>
                  <td className="stat-value">{formatNumber(countryInfo.casesPerOneMillion)}</td>
                </tr>
                <tr>
                  <td className="stat-label">Deaths Per Million:</td>
                  <td className="stat-value">{formatNumber(countryInfo.deathsPerOneMillion)}</td>
                </tr>
              </tbody>
            </table>
            
            <div className="data-footer">
              <p>Data source: disease.sh API</p>
            </div>
          </div>
        ) : (
          <div className="empty-state">Select a country to view COVID-19 data</div>
        )}
      </div>
    </div>
  );
};

export default Search;
