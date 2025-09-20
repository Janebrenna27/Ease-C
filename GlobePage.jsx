import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import countryCoords from "../data/countryCoords.json"; // you created this

export default function GlobePage() {
  const globeEl = useRef();

  useEffect(() => {
    globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2 });
  }, []);

  const markers = [
    { lat: 37.7749, lng: -122.4194, label: "USA" }, // example
    { lat: 28.6139, lng: 77.209, label: "India" }
    // Add all your countries here with coordinates
  ];

  return (
    <div className="h-screen w-full">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={markers}
        pointLat="lat"
        pointLng="lng"
        pointLabel="label"
        pointColor={() => "red"}
        pointAltitude={0.02}
      />
    </div>
  );
}
