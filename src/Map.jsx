import { useState, useEffect } from "react";
import Map, {
    Marker,
    NavigationControl,
    ScaleControl,
    GeolocateControl,
    Popup,
} from "react-map-gl";

import Uploader from "./Uploader";

import { accessToken } from "./mapbox";
// console.log("accessToken: ", accessToken);

// const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
//   c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
//   C20.1,15.8,20.2,15.8,20.2,15.7z`;

// const ICON_SIZE = 20;
const DEFAULT_ZOOM_LEVEL = 12;

// const navStyle = {
//     top: "1rem",
//     left: "1rem",
// };

// const scaleControlStyle = {
//     bottom: "3rem",
//     left: "1rem",
// };

// const iconStyle = {
//     cursor: "pointer",
//     fill: "dodgerblue",
//     stroke: "none",
//     transform: `translate(${-ICON_SIZE / 2}px,${-ICON_SIZE}px)`,
// };

export default function MyMap({ places, center }) {
    const [viewState, setViewState] = useState({
        longitude: center[0],
        latitude: center[1],
        zoom: DEFAULT_ZOOM_LEVEL,
    });
    const [popupInfo, setPopupInfo] = useState(null);
    const [userClick, setUserClick] = useState(null);
    const [userPopup, setUserPopup] = useState(false);

    // const mapClick = (event) => {
    //     // const clickLngLat = event.lngLat;
    //     console.log("mapClick event: ", event.lngLat);
    //     setUserClick(event.lngLat);
    // };

    // console.log("userClick: ", userClick);

    useEffect(() => {
        setViewState({
            longitude: center[0],
            latitude: center[1],
        });
    }, [center]);

    return (
        <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            onClick={(e) => {
                e.originalEvent.stopPropagation();
                // console.log("mapClick event: ", e.lngLat);
                setUserClick(e.lngLat);
                setUserPopup(false);

                // mapClick(e);
            }}
            width="calc(100% - 400px)"
            height="100%"
            className="map"
            mapStyle="mapbox://styles/shubender/cldbk4pw9006y01qo94oielfs"
            mapboxAccessToken={accessToken}
        >
            {places.map((place) => (
                <Marker
                    className="marker" //doesn't work
                    key={place.id}
                    longitude={place.lngLat[0]}
                    latitude={place.lngLat[1]}
                    color={place.color}
                    z-index={100}
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        console.log("Marker click: ", place);
                        setPopupInfo(place);
                    }}
                />
            ))}

            {userClick && (
                <Marker
                    className="marker" //doesn't work
                    longitude={userClick.lng}
                    latitude={userClick.lat}
                    color="#ffb400" // Easter Egg for T.
                    z-index={100}
                    // draggable="true"
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        // console.log("User Marker click: ", e);
                        setUserPopup(true);
                    }}
                />
            )}

            {popupInfo && (
                <Popup
                    anchor="top"
                    longitude={popupInfo.lngLat[0]}
                    latitude={popupInfo.lngLat[1]}
                    onClose={() => setPopupInfo(null)}
                >
                    <div>{popupInfo.description}</div>
                    <img width="100%" src={popupInfo.url} />
                </Popup>
            )}

            {userPopup && (
                <Uploader userPopup={userPopup} />
                // <Popup
                //     anchor="top"
                //     longitude={userClick.lng}
                //     latitude={userClick.lat}
                //     onClose={() => {
                //         console.log("User Popup: ", userClick);
                //         setUserPopup(false);
                //     }}
                // >
                //     <div>Add Place</div>
                // </Popup>
            )}

            <NavigationControl />
            <ScaleControl position="bottom-right" />
            <GeolocateControl
                position="top-left"
                trackUserLocation="true"
                showUserHeading="true"
            />
        </Map>
    );
}
