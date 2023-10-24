const express = require('express');
require('dotenv').config();

//Port
const port = process.env.PORT;
const patientsRoutes = require('./routes/patients');
const healthStaffRoutes = require('./routes/healthStaff');
const labRoutes = require('./routes/lab');
const patientLabTest = require('./routes/patientLabTest');

const cors = require('cors');
const mongoose = require('mongoose');

//Express App
const app = express();

app.use(cors());

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/patients', patientsRoutes);
app.use('/api/healthStaffs', healthStaffRoutes);
app.use('/api/labs', labRoutes);
app.use('/api/patientLabTest', patientLabTest);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('NEW LOGS');
    // Listen requests
    app.listen(port, () => {
      console.log(`Connected to DB & listening to the port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
