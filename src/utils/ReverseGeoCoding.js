const GOOGLE_MAP_REVERSE_GEOCODE_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
const GOOGLE_MAP_API_KEY = "AIzaSyB2HyNTBm1sQJYJkwOOUA1LXRHAKh4gmjU"; // working with geolocation & reverse Geolocation

const API_URL_GEOCODE_SECONDARY =
  "https://api.opencagedata.com/geocode/v1/json?q=";
const SECONDARY_API_KEY = "e7f922f4af6a47f588bef13ff440f66f";

const GOOGLE_MAPS_JS_API_KEY_ONLY = "AIzaSyAEFLuCxU99kLoW2NB7_iQesxPuYaNSwiM"; // only maps loading with js sdk

export default async function getAddress(lat, long) {
  let promise = await fetch(
    `${GOOGLE_MAP_REVERSE_GEOCODE_URL}${lat},${long}&key=${GOOGLE_MAP_API_KEY}`
  );
  let data = await promise.json();

  return data;
}
