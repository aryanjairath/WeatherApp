const express = require('express')
const axios = require('axios');
const app = express();
const cors = require('cors'); // If you need CORS for local dev
app.use(cors()); // only if needed for development

const expressListEndpoints = require('express-list-endpoints');
const { useParams } = require('react-router-dom');


const API_KEY = 'LXFZWTASLFAVQ2QD5BZGP2UPC';

// GET route to fetch weather data for a given city
app.get('/api/weather/:city', async (req, res) => {
  const { city } = req.params;

  try {
    const encodedCity = encodeURIComponent(city);

    const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCity}?unitGroup=metric&key=LXFZWTASLFAVQ2QD5BZGP2UPC&contentType=json`)

    res.json(response.data.currentConditions);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/api/news/:loc', async (req, res) => {
  const { loc } = req.params;
  
  try{
    const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=pub_64479109ea6b5b9cbdd1db384d1b4f6873663&q=${loc}&language=en`);
    res.json(response.data)
  } catch(error) {
    console.error('Error fetching news', error.message);
    res.status(500).json({error: 'Failed to fetch news' });
  }
});
// Start the server on port 5000 (or your choice)
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
console.log(expressListEndpoints(app));

   