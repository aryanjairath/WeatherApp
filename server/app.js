const express = require('express')
const axios = require('axios');
const app = express();
const cors = require('cors'); // If you need CORS for local dev
app.use(cors()); // only if needed for development

const expressListEndpoints = require('express-list-endpoints');


const API_KEY = 'LXFZWTASLFAVQ2QD5BZGP2UPC';

// GET route to fetch weather data for a given city
app.get('/api/weather/:city', async (req, res) => {
  const { city } = req.params;

  try {
    const encodedCity = encodeURIComponent(city);

    const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCity}?unitGroup=metric&key=LXFZWTASLFAVQ2QD5BZGP2UPC&contentType=json`)


    // Just sending back the `currentConditions` portion,
    // but you can send the entire response if desired
    res.json(response.data.currentConditions);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Start the server on port 5000 (or your choice)
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
console.log(expressListEndpoints(app));

   