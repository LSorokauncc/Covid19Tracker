import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../App"; 


mapboxgl.accessToken = "pk.eyJ1IjoicmZlcm5hbjIiLCJhIjoiY204aGs0aHM3MDMxeDJpcHphamw5aTJrMyJ9.OqkUxJZB6eHGyAqPbSOs-w";

const Map = () => {
    const mapContainerRef = useRef(null);
  
    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: [0, 20],
        zoom: 1.5,
      });
  
      return () => map.remove();
    }, []);
  
    return <div ref={mapContainerRef} className="map-container" />;
  };
  
  export default Map;
  