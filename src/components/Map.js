import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// Import Mapbox CSS
mapboxgl.accessToken = "pk.eyJ1IjoicmZlcm5hbjIiLCJhIjoiY204aGs0aHM3MDMxeDJpcHphamw5aTJrMyJ9.OqkUxJZB6eHGyAqPbSOs-w";

//
const Map = () => {
  const mapContainerRef = useRef(null);
  //
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [0, 20],
      zoom: 1.5,
    });
    // Add navigation control (zoom buttons)
    fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => res.json())
      .then(data => {
        const geoData = {
          type: "FeatureCollection",
          features: data.map(entry => ({
            type: "Feature",
            properties: {
              confirmed: entry.cases || 0,
              active: entry.active || 0,
              iso2: entry.countryInfo.iso2 || "",
              country: entry.country || ""
            },
            geometry: {
              type: "Point",
              coordinates: [entry.countryInfo.long, entry.countryInfo.lat],
            },
          })),
        };
        // Add the map to the container
        map.on("load", () => {
          map.addSource("covid-data", {
            type: "geojson",
            data: geoData,
          });
          // Add heatmap layer
          map.addLayer({
            id: "covid-heatmap",
            type: "heatmap",
            source: "covid-data",
            maxzoom: 6,
            paint: {
              "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "confirmed"],
                0, 0,
                500000, 0.5,
                1000000, 1
              ],
              "heatmap-intensity": 0.6,
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(255,255,178,0)",
                0.1, "rgb(254,217,118)",
                0.3, "rgb(253,141,60)",
                0.5, "rgb(252,78,42)",
                0.7, "rgb(227,26,28)",
                1, "rgb(177,0,38)"
              ],
              "heatmap-radius": 20,
              "heatmap-opacity": 0.6,
            },
          });
          // Add circle layer for click events
          map.addLayer({
            id: "covid-click-layer",
            type: "circle",
            source: "covid-data",
            paint: {
              "circle-radius": 10,
              "circle-color": "transparent",
              "circle-opacity": 0,
            },
          });
          // Add navigation controls for interaction
          map.on("click", "covid-click-layer", (e) => {
            if (e.features && e.features.length > 0) {
              const iso = e.features[0].properties.iso2;
              const name = e.features[0].properties.country;
              if (iso && name) {
                localStorage.setItem("searchCountry", iso);
                localStorage.setItem("searchCountryName", name);
                localStorage.setItem("activeTab", "search");
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((err) => console.error("Error fetching COVID data:", err));

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default Map;
