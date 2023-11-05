const Admission = require('../models/admissions');
const RoomBed = require('../models/roomBed');
const mongoose = require('mongoose');

// get all Admission
const getAllAdmissions = async (req, res) => {
  const admission = await Admission.find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'ehrVisit',
      },
      {
        path: 'bedNumber',
        populate: [{ path: 'bedNumber' }, { path: 'roomNumber' }],
      },
      {
        path: 'patient',
      },
    ]);
  res.status(200).json(admission);
};

// Create new Admission
const createAdmission = async (req, res) => {
  const { ehrVisit, bedNumber, patient, admissionDate, dischargeDate } =
    req.body;

  let emptyFields = [];

  if (!ehrVisit) {
    emptyFields.push('ehrVisit');
  }
  if (!bedNumber) {
    emptyFields.push('bedNumber');
  }
  if (!patient) {
    emptyFields.push('patient');
  }
  if (!admissionDate) {
    emptyFields.push('admissionDate');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const admission =
      (await Admission.create({
        ehrVisit,
        bedNumber,
        patient,
        admissionDate,
        dischargeDate,
      })) &&
      (await RoomBed.updateOne(
        { _id: bedNumber },
        { $set: { isAvailable: false } }
      ));

    res.status(200).json(admission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Admissions by ID
const getAdmissionById = async (req, res) => {
  const id = req.params.id;
  console.log('ID in Admission is', id);
  const admissionById = await Admission.find({ _id: id })
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'ehrVisit',
      },
      {
        path: 'bedNumber',
        populate: [{ path: 'bedNumber' }, { path: 'roomNumber' }],
      },
      {
        path: 'patient',
      },
    ]);
  res.status(200).json(admissionById);
};

// Update admission for Discharge Date
const updateAdmission = async (req, res) => {
  const { id } = req.params;
  const { ehrVisit, bedNumber, patient, admissionDate, dischargeDate } =
    req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Admissions' });
  }
  console.log('HEREEE');
  console.log(res.body);
  const admission =
    (await Admission.findOneAndUpdate(
      { _id: id },
      {
        ehrVisit,
        bedNumber,
        patient,
        admissionDate,
        dischargeDate,
      }
    )) &&
    (await RoomBed.updateOne(
      { _id: bedNumber },
      { $set: { isAvailable: true } }
    ));

  res.status(200).json(admission);
};

module.exports = {
  createAdmission,
  getAllAdmissions,
  updateAdmission,
  getAdmissionById,
};
