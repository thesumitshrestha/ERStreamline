const express = require('express');
require('dotenv').config();

//Port
const port = process.env.PORT;
const patientsRoutes = require('./routes/patients');
const healthStaffRoutes = require('./routes/healthStaff');
const labRoutes = require('./routes/lab');
const patientLabTestRoutes = require('./routes/patientLabTest');
const adminStaffRoutes = require('./routes/adminStaff');
const insuranceRoutes = require('./routes/insurance');
const bedRoutes = require('./routes/bed');
const roomRoutes = require('./routes/room');
const ehrVisitRoutes = require('./routes/ehrVisit');
const admissionRoutes = require('./routes/admissions');
const medicationRoutes = require('./routes/medication');
const billingRoutes = require('./routes/billing');
const healthStaffSchedules = require('./routes/healthStaffSchedule');

const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');

//Express App
const app = express();
app.use('/reports', express.static('reports'));
app.use(cors());

// Middleware
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/patients', patientsRoutes);
app.use('/api/healthStaffs', healthStaffRoutes);
app.use('/api/labs', labRoutes);
app.use('/api/patientLabTest', patientLabTestRoutes);
app.use('/api/adminStaffs', adminStaffRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/beds', bedRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/ehrVisits', ehrVisitRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/medication', medicationRoutes);
app.use('/api/billings', billingRoutes);
app.use('/api/schedules', healthStaffSchedules);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen requests
    app.listen(port, () => {
      console.log(`Connected to DB & listening to the port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
