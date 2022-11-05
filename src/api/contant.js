const API_URL = "http://backend.rideandshare.me/api/";
const APP_URL = "rideandshare.me";
const ACCESS_TOKEN_KEY = "@access_token";
async function fetcher(url, init = {}) {
  const response = await fetch(API_URL + url, init);
  return response.json();
}

export default API_URL;
export { APP_URL, fetcher, ACCESS_TOKEN_KEY };
