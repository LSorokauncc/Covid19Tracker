import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoicmZlcm5hbjIiLCJhIjoiY204aGs0aHM3MDMxeDJpcHphamw5aTJrMyJ9.OqkUxJZB6eHGyAqPbSOs-w";

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
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default Map;
