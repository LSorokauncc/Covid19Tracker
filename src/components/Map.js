import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useNavigate } from "react-router-dom";


// token access for mapbox
mapboxgl.accessToken = "pk.eyJ1IjoicmZlcm5hbjIiLCJhIjoiY204aGs0aHM3MDMxeDJpcHphamw5aTJrMyJ9.OqkUxJZB6eHGyAqPbSOs-w";

// Map component to display COVID-19 data on a map
const Map = () => {
    const mapContainerRef = useRef(null);
  
    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v10",
        center: [0, 20],
        zoom: 1.5,
      });

      const continents = [
        { name: "Africa", coordinates: [20, 5] },
        { name: "Asia", coordinates: [100, 40] },
        { name: "Europe", coordinates: [20, 50] },
        { name: "North America", coordinates: [-100, 40] },
        { name: "South America", coordinates: [-60, -15] },
        { name: "Oceania", coordinates: [140, -25] },
      ];
      
  
      map.on("load", () => {
        // 1. Add empty data source
        map.addSource("covid-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });
  
        // 2. Add heatmap layer
        map.addLayer({
          id: "covid-heatmap",
          type: "heatmap",
          source: "covid-data",
          maxzoom: 6,
          paint: {
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "active"],
              0, 0,
              1000000, 1,
            ],
            "heatmap-intensity": 1.5,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(255,255,178,0)",
              0.2, "rgb(254,217,118)",
              0.4, "rgb(253,141,60)",
              0.6, "rgb(252,78,42)",
              0.8, "rgb(227,26,28)",
              1, "rgb(177,0,38)",
            ],
            "heatmap-radius": 30,
            "heatmap-opacity": 0.75,
          },
        });
  
        // 3. Fetch COVID-19 country data
        fetch("https://disease.sh/v3/covid-19/countries")
          .then((res) => res.json())
          .then((data) => {
            const geojson = {
              type: "FeatureCollection",
              features: data.map((country) => ({
                type: "Feature",
                properties: {
                  country: country.country,
                  active: country.active,
                },
                geometry: {
                  type: "Point",
                  coordinates: [
                    country.countryInfo.long,
                    country.countryInfo.lat,
                  ],
                },
              })),
            };
  
            // 4. Update map data
            map.getSource("covid-data").setData(geojson);
          })
          .catch((err) => console.error("Error fetching COVID data:", err));
      });
  
      return () => map.remove();
    }, []);
  
    return <div ref={mapContainerRef} className="map-container" />;
  };
  
  export default Map;
  