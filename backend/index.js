// server.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express();
const PORT = process.env.PORT || 5000;

// console.log(process.env.MONGO_URL,"process.env.MONGO_URL")
mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(cors(corsOptions)) 
// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, dob } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, dob });
    await user.save();
    const token = jwt.sign({ id: user._id }, 'secretkey');
    res.status(201).send({ token, user: { name: user.name, email: user.email, dob: user.dob, password:user.password } });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).send({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, 'secretkey');
    res.status(200).send({ token, user: { name: user.name, email: user.email, dob: user.dob , password:user.password} });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).send({ error: 'Login failed' });
  }
});

// Add this route to fetch all users
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      res.status(500).send({ error: 'Failed to fetch users' });
    }
  });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
