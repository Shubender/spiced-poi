import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
const { VITE_ACCESS_TOKEN } = import.meta.env;

export const accessToken = VITE_ACCESS_TOKEN;

export const geocoder = GeocoderService({ accessToken });
