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

INSERT INTO places (url, description, color, longitude, latitude) VALUES (
    '/images/old-bike.jpg',
    'Old rusty bike',
    'blue',
    '13.40491',
    '52.51675'
);

INSERT INTO places (url, description, color, longitude, latitude) VALUES (
    '/images/make-love-meduza.jpg',
    'Make love (c) Meduza',
    'blue',
    '13.43927',
    '52.50091'
);

INSERT INTO places (url, description, color, longitude, latitude) VALUES (
    '/images/dogs-rest.jpg',
    'You are shopping, your buddy is resting',
    'green',
    '13.36771',
    '52.46971'
);

INSERT INTO places (url, description, color, longitude, latitude) VALUES (
    '/images/bookcase.jpg',
    'The bookcase',
    'green',
    '13.41993',
    '52.55668'
);