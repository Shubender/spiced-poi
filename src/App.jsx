import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "./hooks";
const { VITE_USERNAME, VITE_STYLE_ID, VITE_ACCESS_TOKEN } = import.meta.env;

const App = () => {
    const { position } = useMap();
    return (
        <MapContainer
            center={position}
            zoom={11}
            scrollWheelZoom={true}
            style={{ minHeight: "80vh", minWidth: "80vw" }}
        >
            <TileLayer
                attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
                url={`https://api.mapbox.com/styles/v1/${VITE_USERNAME}/${VITE_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_ACCESS_TOKEN}`}
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default App;



// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// const { VITE_ACCESS_TOKEN } = import.meta.env;

// mapboxgl.accessToken = VITE_ACCESS_TOKEN;

// export default function App() {
//     console.log("VITE_ACCESS_TOKEN:", VITE_ACCESS_TOKEN);
//     const mapContainer = useRef(null);
//     const map = useRef(null);
//     const [lng, setLng] = useState(-70.9);
//     const [lat, setLat] = useState(42.35);
//     const [zoom, setZoom] = useState(9);

//     useEffect(() => {
//         if (map.current) return; // initialize map only once
//         map.current = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: "mapbox://styles/mapbox/streets-v12",
//             center: [lng, lat],
//             zoom: zoom,
//         });
//     });

//     useEffect(() => {
//         if (!map.current) return; // wait for map to initialize
//         map.current.on("move", () => {
//             setLng(map.current.getCenter().lng.toFixed(4));
//             setLat(map.current.getCenter().lat.toFixed(4));
//             setZoom(map.current.getZoom().toFixed(2));
//         });
//     });

//     return (
//         <div>
//             <div className="sidebar">
//                 Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//             </div>
//             <div ref={mapContainer} className="map-container" />
//         </div>
//     );
// }




/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
*/
