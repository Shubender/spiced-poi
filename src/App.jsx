import { useState, useEffect } from "react";
import PlacesList from "./PlacesList";
import AddPlaceForm from "./AddPlaceForm";
import MyMap from "./Map";

import "./index.css";

export default function App() {
    const [isLoading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);
    const [center, setCenter] = useState([]);

    useEffect(() => {
        fetch("/api/places")
            .then((res) => res.json())
            .then((data) => {
                const places = data.places;
                console.log("Success places fetch: ", places);
                setPlaces(data.places);
                setCenter([13.41133, 52.502183]); //SPICED Academy
            })
            .catch((err) => {
                console.log("Fetch places data error: ", err);
            });
    }, []);

    function onPlaceClick(place) {
        setCenter(place.lngLat);
    }

    function onPlaceRemove(place) {
        setPlaces(places.filter((x) => x.id !== place.id));
    }

    function onSubmit(place) {
        // find a strategy to avoid duplicates
        if (places.find((x) => x.description === place.description)) {
            alert("Place already existing");
            return;
        }
        const newPlace = {
            ...place,
            id: places[places.length - 1].id + 1,
        };
        setPlaces([...places, newPlace]);
        setCenter(place.lngLat);
    }

    function handleSubmitUpload(event) {
        // console.log("File uploaded");
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", this.state.file);

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("upload file url", data.userFile.imageurl);
                this.setState({ imgFromApp: data.userFile.imageurl });
                this.togglePopup();
            })
            .catch((err) => {
                console.log("handleSubmitUpload error: ", err);
            });
    }

    function handleFileChange(event) {
        // console.log("handleFileChange: ", event.target.files[0]);
        this.setState({ file: event.target.files[0] });
    }

    return (
        <div className="app">
            <div className="sidebar">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <PlacesList
                            places={places}
                            onPlaceClick={onPlaceClick}
                            onPlaceRemove={onPlaceRemove}
                        />
                        <AddPlaceForm onSubmit={onSubmit} />{" "}
                    </>
                )}
            </div>
            {places.length && (
                <MyMap
                    center={center}
                    places={places}
                    handleFileChange={handleFileChange}
                    handleSubmitUpload={handleSubmitUpload}
                />
            )}
        </div>
    );
}