import { useState, useEffect } from "react";
import Map, {
    Marker,
    NavigationControl,
    ScaleControl,
    GeolocateControl,
    Popup,
} from "react-map-gl";

import { accessToken } from "./mapbox";
// console.log("accessToken: ", accessToken);

import placesData from "../server/data/places.json";

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
        longitude: 13.411333242387315,
        latitude: 52.502183572057696,
        zoom: 11,
    });
    const [popupInfo, setPopupInfo] = useState(null);

    const mapClick = (event) => {
        console.log("mapClick event: ", event.lngLat);
        // console.log("placesData: ", placesData);
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
            {placesData.map((place) => (
                <Marker
                    className="marker" //doesn't work
                    key={place.id}
                    longitude={place.longitude}
                    latitude={place.latitude}
                    color={place.color}
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        // const popUp = "My beautiful popup";
                        console.log("place: ", place);
                        setPopupInfo(place);
                    }}
                />
            ))}

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
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    onClose={() => setPopupInfo(null)}
                >
                    <div>{popupInfo.description}</div>
                    <img width="100%" src={popupInfo.url} />
                </Popup>
            )}
        </Map>
    );
}
