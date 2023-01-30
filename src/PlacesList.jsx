import ListGroup from "react-bootstrap/ListGroup";

export default function PlacesList({ places, onPlaceClick, onPlaceRemove }) {
    return (
        <div className="places-list">
            <h3>List of Interesting Places</h3>
            <ListGroup>
                {places.map((place) => (
                    // <li key={place.id}>
                    //     <span onClick={() => onPlaceClick(place)}>
                    //         {place.description}
                    //     </span>
                    //     {/* <button onClick={() => onPlaceRemove(place)}>×</button> */}
                    // </li>
                    <ListGroup.Item action variant="info" key={place.id}>
                        <span onClick={() => onPlaceClick(place)}>
                            {place.description}
                        </span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
