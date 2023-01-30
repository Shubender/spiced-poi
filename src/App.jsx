import { useState, useEffect } from "react";
import PlacesList from "./PlacesList";
import AddPlaceForm from "./AddPlaceForm";
import MyMap from "./Map";
import { Container, Row, Col } from "react-bootstrap";

export default function App() {
    const [isLoading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);
    const [center, setCenter] = useState([]);

    useEffect(() => {
        fetch("/api/places")
            .then((res) => res.json())
            .then((data) => {
                console.log("Success places fetch: ", data.places);
                setPlaces(data.places);
                setCenter([13.41133, 52.502183]); //SPICED Academy
            })
            .catch((err) => {
                console.log("Fetch places data error: ", err);
            });
    }, []);

    function onPlaceClick(place) {
        setCenter([place.longitude, place.latitude]);
    }

    // function onPlaceRemove(place) {
    //     setPlaces(places.filter((x) => x.id !== place.id));
    // }

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

    return (
        <Container className="app p-3" fluid>
            <Row>
                <Col sm={4} className="sidebar">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <PlacesList
                                places={places}
                                onPlaceClick={onPlaceClick}
                                // onPlaceRemove={onPlaceRemove}
                            />
                            <AddPlaceForm onSubmit={onSubmit} />{" "}
                        </>
                    )}
                </Col>
                <Col sm={8}>
                    <div style={{ height: "80vh", width: "100%" }}>
                        {places.length && (
                            <MyMap
                                center={center}
                                places={places}
                            />
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
