import React, { useState, useEffect } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [historicalData, setHistoricalData] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("all"); // Options: 30, 60, 90, all

  // Organize countries by regions
  const regions = [
    {
      name: "North America",
      countries: ["USA", "Canada", "Mexico", "Cuba", "Jamaica"]
    },
    {
      name: "South America",
      countries: ["Brazil", "Argentina", "Colombia", "Peru", "Chile"]
    },
    {
      name: "Europe",
      countries: ["UK", "France", "Germany", "Italy", "Spain"]
    },
    {
      name: "Africa",
      countries: ["South Africa", "Nigeria", "Kenya", "Egypt", "Morocco"]
    },
    {
      name: "Asia",
      countries: ["China", "Japan", "India", "South Korea", "Indonesia"]
    },
    {
      name: "Oceania",
      countries: ["Australia", "New Zealand", "Fiji", "Papua New Guinea"]
    }
  ];

  useEffect(() => {
    if (selectedCountry) {
      fetchCountryData(selectedCountry);
      fetchHistoricalData(selectedCountry, timeframe);
    }
  }, [selectedCountry, timeframe]);

  const fetchCountryData = async (country) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get current country information
      const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const data = await response.json();
      setCountryInfo(data);
    } catch (err) {
      setError(`Error fetching country data: ${err.message}`);
      setLoading(false);
    }
  };

  const fetchHistoricalData = async (country, lastDays) => {
    try {
      // Get historical data for country
      let endpoint = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=${lastDays}`;
      
      // Use "all" for global data
      if (country === "all" || country === "worldwide") {
        endpoint = `https://disease.sh/v3/covid-19/historical/all?lastdays=${lastDays}`;
      }
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch historical data: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Format differs between "all" and country-specific responses
      const formattedData = country === "all" || country === "worldwide" ? 
        data : 
        data.timeline;
        
      setHistoricalData(formattedData);
      setLoading(false);
    } catch (err) {
      setError(`Error fetching historical data: ${err.message}`);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter countries based on search
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

  const handleTimeframeChange = (days) => {
    setTimeframe(days);
  };

  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num ? num.toLocaleString() : "N/A";
  };

  const getLatestHistoricalData = () => {
    if (!historicalData) return null;
    
    // Get the latest data from the historical dataset
    const cases = historicalData.cases || {};
    const deaths = historicalData.deaths || {};
    const recovered = historicalData.recovered || {};
    
    const latestCaseDate = Object.keys(cases).pop();
    const latestDeathDate = Object.keys(deaths).pop();
    const latestRecoveredDate = Object.keys(recovered).pop();
    
    return {
      latestCases: latestCaseDate ? cases[latestCaseDate] : 0,
      latestDeaths: latestDeathDate ? deaths[latestDeathDate] : 0,
      latestRecovered: latestRecoveredDate ? recovered[latestRecoveredDate] : 0,
      lastUpdated: latestCaseDate || latestDeathDate || latestRecoveredDate || "Unknown"
    };
  };

  const latest = getLatestHistoricalData();

  return (
    <div className="search-container">
      {/* Left Panel - Search and Regions */}
      <div className="search-panel">
        {/* Search Form */}
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

        {/* Region List */}
        <div className="regions-list">
          <div className="region-header" onClick={() => setSelectedCountry("all")}>
            Worldwide
          </div>
          
          {regions.map((region) => (
            <div key={region.name}>
              <div 
                className="region-header" 
                onClick={() => handleRegionClick(region.name)}
              >
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

      {/* Right Panel - Country Data */}
      <div className="country-data-panel">
        <div className="country-header">
          <h2 className="country-title">
            {selectedCountry === "all" ? "Worldwide" : selectedCountry}
          </h2>
          
          <div className="view-tabs">
            <button 
              className={`view-tab-button ${timeframe === "30" ? 'active' : ''}`}
              onClick={() => handleTimeframeChange("30")}
            >
              30 Days
            </button>
            <button 
              className={`view-tab-button ${timeframe === "all" ? 'active' : ''}`}
              onClick={() => handleTimeframeChange("all")}
            >
              All Time
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : historicalData ? (
          <div className="country-stats">
            <h3>Historical Data Overview</h3>
            <p>Last updated: {latest?.lastUpdated}</p>
            
            {/* Stats Table */}
            <table className="stats-table">
              <tbody>
                <tr>
                  <td className="stat-label">Total Cases:</td>
                  <td className="stat-value">{formatNumber(latest?.latestCases)}</td>
                </tr>
                <tr>
                  <td className="stat-label">Total Deaths:</td>
                  <td className="stat-value">{formatNumber(latest?.latestDeaths)}</td>
                </tr>
                <tr>
                  <td className="stat-label">Total Recovered:</td>
                  <td className="stat-value">{formatNumber(latest?.latestRecovered)}</td>
                </tr>
                {countryInfo && (
                  <>
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
                  </>
                )}
              </tbody>
            </table>
            
            <div className="data-footer">
              <p>
                Data source: disease.sh API
                <br />
                <small>*Some fields may not be available for all countries or worldwide view</small>
              </p>
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