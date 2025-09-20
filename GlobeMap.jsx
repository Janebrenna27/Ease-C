import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import careerCountries from "../data/careerCountries.json";
import countryCoords from "../data/countryCoords.json";

export default function GlobeMap({ selectedCareer }) {
  const globeEl = useRef();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!selectedCareer) return;
    const countries = careerCountries[selectedCareer] || [];
    const newMarkers = countries
      .map((c) => {
        const coord = countryCoords[c];
        return coord ? { lat: coord.lat, lng: coord.lng, size: 1.5, color: "red" } : null;
      })
      .filter(Boolean);
    setMarkers(newMarkers);
  }, [selectedCareer]);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      pointsData={markers}
      pointLat="lat"
      pointLng="lng"
      pointColor="color"
      pointRadius="size"
      width={600}
      height={400}
    />
  );
}
