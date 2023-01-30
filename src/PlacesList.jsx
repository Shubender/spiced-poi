export default function PlacesList({ places, onPlaceClick, onPlaceRemove }) {
    return (
        <section className="places-list">
            <h2>List of Interesting Places</h2>
            <ul>
                {places.map((place) => (
                    <li key={place.id}>
                        <span onClick={() => onPlaceClick(place)}>
                            {place.description}
                        </span>
                        {/* <button onClick={() => onPlaceRemove(place)}>×</button> */}
                    </li>
                ))}
            </ul>
        </section>
    );
}
