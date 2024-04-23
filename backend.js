var express = require("express");
var router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken'); 
const mongoose = require('mongoose');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY || 'default_secret_key';
if (!secretKey) {
    console.error('No secret key provided. Please check your environment configuration.');
    process.exit(1);
  }
router.use(cors());

mongoose.connect("mongodb://localhost:27017/FoodStore", {
  useNewUrlParser: true
});

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
});

database.once('connected', () => {
  console.log('Database Connected')
});

// Middleware to verify token

router.get('/', async (req, res) => {
  res.send('Welcome to our food store')
})

router.get('/getBlogs', async (req, res) => {
  try {
    const collection = await database.collection('Blogs');
    const result = await collection.find().toArray();
    res.send(JSON.stringify(result));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getRecipes', async (req, res) => {
  try {
    const collection = await database.collection('Recipes');
    const result = await collection.find().toArray();
    res.send(JSON.stringify(result));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/getUsers', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const collection = await database.collection('Users');
    const user = await collection.findOne({ userName, password });
    if (user) {
      const name=user.name;
      const token = jwt.sign({ userName: user.userName }, secretKey, { expiresIn: '1h' });
      
      res.json({ authenticated: true, token,name});
    } else {
      res.json({ authenticated: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/addCustomerDetails', async (req, res) => {
  try {
    let collection = await database.collection('CustomerDetails');
    let customer = req.body;
    let result = await collection.insertOne(customer);
    res.status(204).send(result);
  } catch (error) {
    console.error('Error adding customer details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/addUser', async (req, res) => {
  try {
    const collection = await database.collection('Users');
    const newUser = req.body;

    
    const existingUser = await collection.findOne({ userName: newUser.userName });

    if (existingUser) {
      console.log('Username already exists');
      return res.status(400).json({ message: 'Username already exists' });
    }

    const result = await collection.insertOne(newUser);
    console.log('User added successfully');
    res.status(204).send(result);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
