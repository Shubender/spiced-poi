import ListGroup from "react-bootstrap/ListGroup";

export default function PlacesList({ places, onPlaceClick, onPlaceRemove }) {
    return (
        <div className="places-list">
            <h3>List of Interesting Places</h3>
            <ListGroup>
                {places.map((place) => (
                    <ListGroup.Item
                        onClick={() => onPlaceClick(place)}
                        style={{
                            border: "2px solid black",
                            borderRadius: "10px",
                            margin: "5px",
                            color: "black",
                        }}
                        action
                        variant="secondary"
                        key={place.id}
                    >
                        <span>{place.description}</span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
