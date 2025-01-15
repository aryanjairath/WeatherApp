const express = require('express')
const axios = require('axios');
const mysql = require("mysql")
const dotenv = require('dotenv')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors'); // If you need CORS for local dev
const User = require('./models/User');
require('dotenv').config();

app.use(cors()); // only if needed for development
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));


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

app.post('/api/signup', async (req, res) => {
  try{
    const {username, password, email} = req.body;

    if (!username || ! email || !password) {
      return res.status(400).json({error: 'Missing a required field'});
    }

    const existingUser = await User.findOne({ $or: [ {username}, {email} ] });
    if (existingUser){
      return res.status(400).json({error: 'Username or email already exists'});
    }

    const newUser = new User({
      username, password, email
    });

    await newUser.save();
    res.status(201).json({message:"User created successfully", username: newUser.username});
  } catch(error) {
    console.error('Error registering user: ',error);
    res.status(500).json({error: 'Server error'});
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({error: 'Missing key field'});
    }
    const currUser = await User.findOne({ username });
    if (!currUser){
      res.status(400).json({error: "No such user"});
    }
    console.log(currUser.username);
  } catch (error) {
    console.error('Error loggin in', error);
  }
  res.json({message: 'Loggined in successfully'})
});
// Start the server on port 5000 (or your choice)
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

   