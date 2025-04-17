import React, { useState, useEffect } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(() => {
    return localStorage.getItem("searchCountry") || "USA";
  });
  const [countryInfo, setCountryInfo] = useState(null);
  const [worldwideInfo, setWorldwideInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regions, setRegions] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [expandedRegions, setExpandedRegions] = useState({});

  // Define continents for organizing countries
  const continents = [
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Asia",
    "Oceania",
    "Other" // For any countries that don't fit into the main continents
  ];

  // Fetch all countries and organize by continent
  useEffect(() => {
    const fetchAllCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await fetch("https://disease.sh/v3/covid-19/countries");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch countries: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Organize countries by continent
        const organizedRegions = continents.map(continent => ({
          name: continent,
          countries: data
            .filter(country => {
              if (continent === "Other") {
                return !continents.slice(0, -1).includes(country.continent);
              }
              return country.continent === continent;
            })
            .map(country => ({
              name: country.country,
              code: country.countryInfo.iso2 || country.country
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
        }));
        
        // Remove empty continents
        const filteredRegions = organizedRegions.filter(region => region.countries.length > 0);
        
        setRegions(filteredRegions);
        
        // Also fetch worldwide data
        fetchWorldwideData();
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError(`Error loading countries: ${err.message}`);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchAllCountries();
  }, []);

  //added to set selected country from local storage
  useEffect(() => {
    const storedCountry = localStorage.getItem("searchCountry");
    if (storedCountry && storedCountry !== selectedCountry) {
      setSelectedCountry(storedCountry);
    }
  }, []);
  

  useEffect(() => {
    if (selectedCountry === "all") return;
    fetchCountryData(selectedCountry);
  }, [selectedCountry]);

  const fetchWorldwideData = async () => {
    try {
      const response = await fetch("https://disease.sh/v3/covid-19/all");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch worldwide data: ${response.status}`);
      }
      
      const data = await response.json();
      setWorldwideInfo(data);
    } catch (err) {
      console.error("Error fetching worldwide data:", err);
    }
  };

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
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchedCountry) {
        setSelectedCountry(matchedCountry.code);
        
        // Find and expand the region that contains this country
        regions.forEach(region => {
          if (region.countries.some(c => c.code === matchedCountry.code)) {
            toggleRegion(region.name);
          }
        });
      }
    }
  };

  const handleCountryClick = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const toggleRegion = (regionName) => {
    setExpandedRegions(prev => ({
      ...prev,
      [regionName]: !prev[regionName]
    }));
  };

  const formatNumber = (num) => {
    return num ? num.toLocaleString() : "N/A";
  };

  const getSelectedCountryName = () => {
    if (selectedCountry === "all") return "Worldwide";
    
    const allCountries = regions.flatMap(r => r.countries);
    const country = allCountries.find(c => c.code === selectedCountry);
    return country ? country.name : selectedCountry;
  };

  const getCurrentData = () => {
    if (selectedCountry === "all") {
      return worldwideInfo;
    }
    return countryInfo;
  };

  const currentData = getCurrentData();

  return (
    <div className="page-layout">
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

        <div className="countries-scrollable-container">
          <div 
            className={`region-style worldwide ${selectedCountry === "all" ? 'selected' : ''}`}
            onClick={() => setSelectedCountry("all")}
          >
            <h2>Worldwide</h2>
          </div>
          {loadingCountries ? (
            <div className="loading-countries">Loading countries...</div>
          ) : error ? (
            <div className="error-countries">{error}</div>
          ) : (
            regions.map((region) => (
              <div key={region.name} className="region-section">
                <h2><div 
                  className="region-header"
                  onClick={() => toggleRegion(region.name)}
                >
                  <span className="region-name">{region.name}</span>
                  <span className="region-count">({region.countries.length})</span>
                </div></h2>

                
                {expandedRegions[region.name] && (
                  <div className="region-countries">
                    {region.countries.map((country) => (
                      <div 
                        key={country.code}
                        className={`country-item ${selectedCountry === country.code ? 'selected' : ''}`}
                        onClick={() => handleCountryClick(country.code)}
                      >
                        {country.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="country-data-panel">
        <div className="country-header">
          <h2 className="country-title">
            {getSelectedCountryName()}
          </h2>
        </div>

        {selectedCountry === "all" && !worldwideInfo ? (
          <div className="loading-state">Loading worldwide data...</div>
        ) : loading ? (
          <div className="loading-state">Loading...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : currentData ? (
          <div className="country-stats">
            <h3>Current COVID-19 Statistics</h3>
            <table className="stats-table">
              <tbody>
                <tr>
                  <td className="stat-label">Active Cases:</td>
                  <td className="stat-value">{formatNumber(currentData.active)}</td>
                </tr>
                <tr>
                  <td className="stat-label">Critical Cases:</td>
                  <td className="stat-value">{formatNumber(currentData.critical)}</td>
                </tr>
                <tr>
                  <td className="stat-label">Tests Conducted:</td>
                  <td className="stat-value">{formatNumber(currentData.tests)}</td>
                </tr>
                <tr>
                  <td className="stat-label">Cases Per Million:</td>
                  <td className="stat-value">{formatNumber(currentData.casesPerOneMillion)}</td>
                </tr>
                <tr>
                  <td className="stat-label">Deaths Per Million:</td>
                  <td className="stat-value">{formatNumber(currentData.deathsPerOneMillion)}</td>
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

