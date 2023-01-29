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

const DEFAULT_ZOOM_LEVEL = 12;

export default function MyMap({ places, center }) {
    const [viewState, setViewState] = useState({
        longitude: center[0],
        latitude: center[1],
        zoom: DEFAULT_ZOOM_LEVEL,
    });
    const [popupInfo, setPopupInfo] = useState(null);
    const [userClick, setUserClick] = useState(null);
    const [userPopup, setUserPopup] = useState(false);

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
                console.log("mapClick event: ", e.lngLat);
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
                    longitude={place.longitude}
                    latitude={place.latitude}
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
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    onClose={() => setPopupInfo(null)}
                >
                    <div>{popupInfo.description}</div>
                    <img width="100%" src={popupInfo.url} />
                </Popup>
            )}

            {userPopup && (
                <Uploader userPopup={userPopup} userClick={userClick} />
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
