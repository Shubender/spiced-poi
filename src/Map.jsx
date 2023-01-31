import { useState, useEffect, useRef, useCallback } from "react";
import Map, {
    Marker,
    NavigationControl,
    ScaleControl,
    GeolocateControl,
    Popup,
} from "react-map-gl";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// import Geocoder from "react-map-gl-geocoder";
// import GeocoderControl from "./geocoder-control";

import Uploader from "./Uploader";

import { accessToken } from "./mapbox";
// console.log("accessToken: ", accessToken);

const DEFAULT_ZOOM_LEVEL = 11;

export default function MyMap({ places, center, onPlaceUpload }) {
    const [viewState, setViewState] = useState({
        longitude: center[0],
        latitude: center[1],
        zoom: DEFAULT_ZOOM_LEVEL,
    });
    const [popupInfo, setPopupInfo] = useState(null);
    const [userClick, setUserClick] = useState(null);
    const [userPopup, setUserPopup] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setViewState({
            longitude: center[0],
            latitude: center[1],
        });
    }, [center]);

    // const mapRef = useRef();
    // const handleViewportChange = useCallback(
    //     (newViewport) => setViewport(newViewport),
    //     []
    // );

    // const handleGeocoderViewportChange = useCallback(
    //     (newViewport) => {
    //         const geocoderDefaultOverrides = { transitionDuration: 1000 };

    //         return handleViewportChange({
    //             ...newViewport,
    //             ...geocoderDefaultOverrides,
    //         });
    //     },
    //     [handleViewportChange]
    // );

    return (
        <Map
            className="map rounded"
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            onClick={(e) => {
                e.originalEvent.stopPropagation();
                console.log("mapClick event: ", e.lngLat);
                setUserClick(e.lngLat);
                setUserPopup(false);

                // mapClick(e);
            }}
            // width="100%"
            // height="100%"
            // className="map"
            mapStyle="mapbox://styles/shubender/cldbk4pw9006y01qo94oielfs"
            mapboxAccessToken={accessToken}
        >
            {places.map((place) => (
                <Marker
                    key={place.id}
                    longitude={place.longitude}
                    latitude={place.latitude}
                    color={place.color}
                    style={{ cursor: "pointer", zIndex: 999 }}
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        console.log("Marker click: ", place);
                        setPopupInfo(place);
                        setShow(true);
                    }}
                />
            ))}

            {userClick && (
                <Marker
                    className="marker" //doesn't work
                    longitude={userClick.lng}
                    latitude={userClick.lat}
                    color="#ffb400" // Easter Egg for T.
                    style={{ cursor: "pointer", zIndex: 999 }}
                    // draggable="true"
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        // console.log("User Marker click: ", e);
                        setUserPopup(true);
                    }}
                />
            )}

            {popupInfo && (
                <>
                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header
                            style={{
                                background: "#f2f2f2",
                            }}
                            closeButton
                        >
                            <Modal.Title>Look and find it!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body
                            style={{ background: "#f2f2f2" }}
                            className="rounded"
                        >
                            <h5
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                {popupInfo.description}
                            </h5>
                            <Image
                                src={popupInfo.url}
                                style={{
                                    border: "2px solid black",
                                    borderRadius: "10px",
                                    maxHeight: "400px",
                                    maxWidth: "300px",
                                    display: "block",
                                    margin: "auto",
                                }}
                            />
                        </Modal.Body>
                    </Modal>
                </>
            )}

            {userPopup && (
                <Uploader
                    userPopup={userPopup}
                    userClick={userClick}
                    onPlaceUpload={onPlaceUpload}
                    setUserPopup={setUserPopup}
                />
            )}

            <NavigationControl />
            <ScaleControl position="bottom-right" />
            <GeolocateControl
                position="top-left"
                // trackUserLocation="true"
                // showUserHeading="true"
            />
            {/* <Geocoder
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxAccessToken={accessToken}
                position="top-left"
            /> */}
            {/* <GeocoderControl
                mapboxAccessToken={accessToken}
                position="top-left"
            /> */}
        </Map>
    );
}
