import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Marker from "./components/Marker";

function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [earthquakeData, setEarthquakeData] = useState();

  const getBboxAndFetch = useCallback(async () => {
    const bounds = mapRef.current.getBounds();
    console.log(bounds)
    try {
      const data = await fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-02-05&endtime=2023-02-07&minlatitude=${bounds._sw.lat}&maxlatitude=${bounds._ne.lat}&minlongitude=${bounds._sw.lng}&maxlongitude=${bounds._ne.lng}&minmagnitude=5.0`
      ).then((d) => d.json());
      setEarthquakeData(data);
      // console.log(...data.features);
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [36.9, 37.66], //maras 02-06-2023
      zoom: 7.15,
      minZoom: 5.5,
      maxZoom: 9.5,
    });
    mapRef.current.on('load', () => {
        getBboxAndFetch()
    })
    mapRef.current.on('moveend', () => {
        getBboxAndFetch()
    })
    return () => {
      mapRef.current.remove();
    };
    
  }, [] );
  
  // console.log(...earthquakeData.features);
  
  return (
    <>
      <div id="map-container" ref={mapContainerRef} />{" "}
      {mapRef.current &&
        earthquakeData &&
        earthquakeData.features?.map((feature) => {
          return (
            <Marker key={feature.id} map={mapRef.current} feature={feature} />
          );
        })}
    </>
  );
}

export default Map;
