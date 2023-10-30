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
      type: String,
      require: true,
    },
    endTime: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  'HealthStaffSchedule',
  healthStaffScheduleSchema
);
