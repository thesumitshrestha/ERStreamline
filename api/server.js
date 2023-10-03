require('dotenv').config();

const express = require('express');
const patientsRoutes = require('./routes/patients');

//Port
const port = process.env.PORT || 4002;
console.log(port);

const mongoose = require('mongoose');
const cors = require('cors');

//Express App
const app = express();

app.use(express.json());
app.use(cors());

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/patients', patientsRoutes);

// Listen for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
