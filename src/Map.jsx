import { useState, useEffect } from "react";
import Map, {
    Marker,
    NavigationControl,
    ScaleControl,
    GeolocateControl,
    Popup,
} from "react-map-gl";

import { accessToken } from "./mapbox";
console.log("accessToken: ", accessToken);

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const ICON_SIZE = 20;
const DEFAULT_ZOOM_LEVEL = 4;

// const navStyle = {
//     top: "1rem",
//     left: "1rem",
// };

// const scaleControlStyle = {
//     bottom: "3rem",
//     left: "1rem",
// };

const iconStyle = {
    cursor: "pointer",
    fill: "dodgerblue",
    stroke: "none",
    transform: `translate(${-ICON_SIZE / 2}px,${-ICON_SIZE}px)`,
};

export default function MyMap() {
    const [viewState, setViewState] = useState({
        //SPICED Academy
        latitude: 52.502183572057696,
        longitude: 13.411333242387315,
        zoom: 11,
    });
    const [popupInfo, setPopupInfo] = useState(null);

    const mapClick = (event) => {
        console.log("event: ", event.lngLat);
    };

    return (
        <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            onClick={mapClick}
            width="calc(100% - 400px)"
            height="100%"
            className="map"
            mapStyle="mapbox://styles/shubender/cldbk4pw9006y01qo94oielfs"
            mapboxAccessToken={accessToken}
        >
            <Marker
                id="marker"
                latitude={52.50347}
                longitude={13.41101}
                color="green"
                onClick={(e) => {
                    // If we let the click event propagates to the map, it will immediately close the popup
                    // with `closeOnClick: true`
                    e.originalEvent.stopPropagation();
                    const popUp = "My beautiful popup";
                    setPopupInfo(popUp);
                }}
            />
            <NavigationControl />
            <ScaleControl position="bottom-right" />
            <GeolocateControl
                position="top-left"
                trackUserLocation="true"
                showUserHeading="true"
            />
            {popupInfo && (
                <Popup
                    anchor="top"
                    latitude={52.50347}
                    longitude={13.41101}
                    onClose={() => setPopupInfo(null)}
                >
                    <div>{popupInfo}</div>
                </Popup>
            )}
        </Map>

        // <ReactMapGL
        //     {...viewport}
        //     width="600px"
        //     height="100%"
        //     className="map"
        //     mapStyle="mapbox://styles/shubender/cldbk4pw9006y01qo94oielfs"
        //     mapboxAccessToken={accessToken}
        //     // onViewportChange={(viewport) => setViewport(viewport)}
        // >
        //     {/* {places.map(({ id, lngLat }) => (
        //         <Marker key={id} longitude={lngLat[0]} latitude={lngLat[1]}>
        //             <svg
        //                 height={ICON_SIZE}
        //                 viewBox="0 0 24 24"
        //                 style={iconStyle}
        //             >
        //                 <path d={ICON} />
        //             </svg>
        //         </Marker>
        //     ))} */}
        //     {/* <NavigationControl style={navStyle} /> */}
        //     {/* <ScaleControl style={scaleControlStyle} /> */}
        // </ReactMapGL>
    );
}
