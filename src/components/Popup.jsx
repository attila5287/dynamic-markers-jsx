import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";

const Popup = ({ map, activeFeature }) => {
  // a ref to hold the popup instance
  const popupRef = useRef();
  // a ref for an element to hold the popup's content
  const contentRef = useRef(document.createElement("div"));

  // instantiate the popup on mount, remove it on unmount
  useEffect(() => {
    if (!map) return;

    // create a new popup instance, but do not set its location or content yet
    popupRef.current = new mapboxgl.Popup({
      closeOnClick: false,
      offset: 20,
    });

    return () => {
      popupRef.current.remove();
    };
  }, []);

  // when activeFeature changes, set the popup's location and content, and add it to the map
  useEffect(() => {
    if (!activeFeature) return;

    popupRef.current
      .setLngLat(activeFeature.geometry.coordinates) // set its position using activeFeature's geometry
      .setHTML(contentRef.current.outerHTML) // use contentRef's `outerHTML` to set the content of the popup
      .addTo(map); // add the popup to the map
  }, [activeFeature]);

  // use a react portal to render the content to show in the popup, assigning it to contentRef
  return (
    <>
      {createPortal(
        <div className="portal-content p-0 m-0 rounded-2 bg-dark">
          <ul className="list-group list-group-flush m-0 bg-light rounded-2">
            <li className="list-group-item">
              <strong>Time: </strong>
              {new Date(activeFeature?.properties.time).toLocaleString()}
            </li>
            <li className="list-group-item">
                  <strong>Magnitude: </strong>
              {activeFeature?.properties.mag}
            </li>
            <li className="list-group-item">
                  <strong>Place: </strong>
                {activeFeature?.properties.place}
            </li>
          </ul>
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Popup;
