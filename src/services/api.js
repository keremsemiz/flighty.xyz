import axios from 'axios';

const API_URL = 'https://test.api.amadeus.com';

let accessToken = '';
let tokenExpiryTime = null;

const getAccessToken = async () => {
  const clientId = import.meta.env.VITE_AMADEUS_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

  console.log('Client ID:', clientId);
  console.log('Client Secret:', clientSecret);

  const currentTime = new Date().getTime();

  if (!accessToken || currentTime >= tokenExpiryTime) {
    try {
      const response = await axios.post(`${API_URL}/v1/security/oauth2/token`, new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      accessToken = response.data.access_token;
      tokenExpiryTime = currentTime + (response.data.expires_in * 1000);
    } catch (error) {
      console.error('Error fetching access token:', error.response ? error.response.data : error.message);
      throw new Error('Could not fetch access token');
    }
  }
  return accessToken;
};

export const searchFlights = async (origin, maxPrice) => {
  const token = await getAccessToken();
  try {
    const response = await axios.get(`${API_URL}/v1/shopping/flight-destinations`, {
      params: { origin, maxPrice },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error('Error fetching flight data:', error.response ? error.response.data : error.message);
    throw new Error('Could not fetch flight data');
  }
};