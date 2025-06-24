import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

const Marker = ({ map, feature }) => {
  const { geometry, properties } = feature;

  const markerRef = useRef(null);
  const contentRef = useRef(document.createElement("div"));

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  }, [] );
  
  const magObject = {
    "mag7": "bg-danger",
    "mag6": "bg-warning",
    "mag5": "bg-success",
  };
  return (
    <>
      {createPortal(
        <div>
          <p
            className={
              "pill text-white px-2 py-0 rounded-pill " +
              magObject["mag" + properties.mag.toString().slice(0, 1)]
            }
          >
            {properties.mag}
          </p>
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Marker;
