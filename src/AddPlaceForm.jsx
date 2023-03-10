import { useState } from "react";

import { geocoder } from "./mapbox";

export default function AddPlaceForm({ onSubmit }) {
    const [suggestions, setSuggestions] = useState([]);
    const [currentSuggestion, setCurrentSuggestion] = useState({});
    const [text, setText] = useState("");

    function _onSubmit(event) {
        event.preventDefault();
        if (!currentSuggestion.geometry) {
            return;
        }
        onSubmit({
            description: currentSuggestion.place_name,
            lngLat: currentSuggestion.geometry.coordinates,
        });
        setCurrentSuggestion({});
        setText("");
    }

    async function onInput(event) {
        const query = event.target.value;
        const response = await geocoder
            .forwardGeocode({ query, limit: 5 })
            .send();
        setSuggestions(response.body.features);
    }

    function onSuggestionClick(suggestion) {
        setCurrentSuggestion(suggestion);
        setText(suggestion.place_name);
        setSuggestions([]);
    }

    function onChange(event) {
        setText(event.target.value);
    }

    return (
        <section className="add-place">
            <h2>Find Place</h2>
            <form onSubmit={_onSubmit} autoComplete="off">
                <input
                    type="text"
                    required
                    onInput={onInput}
                    value={text}
                    onChange={onChange}
                    minLength={3}
                    placeholder="Type the place you want to go"
                />
                <button type="submit">Add Place</button>
                <ul>
                    {suggestions.map((x) => (
                        <li
                            key={x.place_name}
                            onClick={() => onSuggestionClick(x)}
                        >
                            {x.place_name}
                        </li>
                    ))}
                </ul>
            </form>
        </section>
    );
}
