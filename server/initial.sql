-- psql -d poi -f initial.sql

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS places;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE places(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    name TEXT,
    description TEXT NOT NULL,
    color TEXT NOT NULL,
    url TEXT NOT NULL,
    url_after TEXT,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO places (url, description, color, longitude, latitude) VALUES (
    '/images/nachbarschaftsgarten.jpg',
    'Nice place for rest and volunteer',
    'green',
    '13.41101',
    '52.50347'
);

INSERT INTO places (url, description, color, longitude, latitude) VALUES (
    '/images/burned-atm.jpg',
    'His life was short but bright',
    'red',
    '13.41431',
    '52.50093'
);