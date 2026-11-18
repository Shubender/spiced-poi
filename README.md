# Places in Berlin

A map-based place-sharing application built during the SPICED Academy web-development bootcamp. Users can explore places on a map and add a location with a photo and description.

## Features

- Display PostgreSQL-backed places as colored map markers.
- Browse a sidebar and recenter the map on a selected place.
- Open a marker to see its description and image.
- Select a map location and upload a new place through a form.
- Store uploaded images in an S3 bucket and place metadata in PostgreSQL.
- Use map navigation, scale, and geolocation controls.

## Stack

React, JavaScript, React Bootstrap, Mapbox GL through `react-map-gl`, Vite, Express, PostgreSQL, and AWS SDK v2/S3.

## Local setup

Requirements: Node.js/npm compatible with the checked-in Vite 4 dependencies, PostgreSQL with `psql`, a Mapbox account, and an S3 bucket for uploads.

```bash
git clone https://github.com/Shubender/spiced-poi.git
cd spiced-poi
npm ci
createdb poi
psql -d poi -f server/initial.sql
```

Use a fresh development database: the SQL file drops and recreates its tables. Create a root `.env` with your own values:

```dotenv
PORT=3030
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/poi
AWS_KEY=your-access-key
AWS_SECRET=your-secret-key
AWS_BUCKET=your-development-bucket
```

Map credentials are imported from `src/mapbox.jsx`. Configure your own public Mapbox token there and use a map style accessible to your account; the current map component references a custom style. Do not put a private token or AWS credentials in client code.

Start the backend and frontend in separate terminals:

```bash
node server/server.cjs
```

```bash
npm run dev:client
```

Open the URL printed by Vite. The Vite proxy sends `/api` requests to port 3030. `npm run dev:server` is an alternative watcher command, but it requires `nodemon`, which is not declared in the current package manifest.

## Code guide

- [Map interactions](src/Map.jsx), [sidebar](src/PlacesList.jsx), and [upload form](src/Uploader.jsx)
- [API routes](server/server.cjs), [database queries](server/db.cjs), and [S3 uploads](server/file-upload.cjs)
- [Schema and sample places](server/initial.sql)

## Project status

An educational project with historical dependencies. Geocoder experiments and authentication-related helpers are present, but the running app should not be described as having complete search or user-account features. There is no configured automated test script. Full startup, map rendering, and cloud uploads have not been revalidated for this README update.
