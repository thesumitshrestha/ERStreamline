const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const healthStaffScheduleSchema = new Schema(
  {
    healthStaff: {
      type: Schema.Types.ObjectId,
      ref: 'HealthStaff',
    },
    day: {
      type: String,
      require: true,
    },
    startTime: {
      type: Date,
      require: true,
    },
    endTime: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  'HealthStaffSchedule',
  healthStaffScheduleSchema
);
