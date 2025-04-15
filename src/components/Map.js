import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoicmZlcm5hbjIiLCJhIjoiY204aGs0aHM3MDMxeDJpcHphamw5aTJrMyJ9.OqkUxJZB6eHGyAqPbSOs-w";

// Bounds for each continent
const continentBounds = {
  "Africa": [[-20, -40], [55, 40]],
  "Asia": [[25, 0], [180, 80]],
  "Europe": [[-25, 35], [45, 70]],
  "North America": [[-170, 5], [-50, 85]],
  "South America": [[-90, -60], [-30, 15]],
  "Oceania": [[110, -50], [180, 10]]
};

// Helper to determine clicked continent
const getContinentFromCoords = (lngLat) => {
  const [lng, lat] = [lngLat.lng, lngLat.lat];

  for (const continent in continentBounds) {
    const [[minLng, minLat], [maxLng, maxLat]] = continentBounds[continent];
    if (lng >= minLng && lng <= maxLng && lat >= minLat && lat <= maxLat) {
      return continent;
    }
  }

  return null;
};

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [0, 20],
      zoom: 1.5,
    });

    map.on("load", () => {
      // 1. Add empty data source
      map.addSource("covid-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      // 2. Add heatmap layer using confirmed cases
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
            1000000, 1,
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
            1, "rgb(177,0,38)",
          ],
          "heatmap-radius": 20,
          "heatmap-opacity": 0.6,
        },
      });

      // 3. Fetch COVID data and convert to GeoJSON
      fetch("https://covid-api.com/api/reports")
        .then((res) => res.json())
        .then((data) => {
          const geoData = {
            type: "FeatureCollection",
            features: data.data
              .filter(entry => entry.region.lat && entry.region.long)
              .map(entry => ({
                type: "Feature",
                properties: {
                  confirmed: entry.confirmed || 0,
                },
                geometry: {
                  type: "Point",
                  coordinates: [
                    parseFloat(entry.region.long),
                    parseFloat(entry.region.lat),
                  ],
                },
              })),
          };

          map.getSource("covid-data").setData(geoData);
        })
        .catch((err) => console.error("Error fetching COVID data:", err));

      // 4. Handle click to detect continent and set it
      map.on("click", (e) => {
        const continentClicked = getContinentFromCoords(e.lngLat);

        if (continentClicked) {
          localStorage.setItem("searchRegion", continentClicked);
          localStorage.setItem("activeTab", "search");
          window.location.reload(); // switch to Search tab
        }
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default Map;
