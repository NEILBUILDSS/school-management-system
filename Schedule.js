const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  seedKey: { type: String, unique: true, sparse: true, immutable: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', default: null, index: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true, index: true },
  weekdays: [{ type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], required: true }],
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  yearLevel: { type: Number, min: 1, max: 4, required: true, index: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Inactive', index: true }
}, { timestamps: true });

scheduleSchema.index({ status: 1, room: 1 });
scheduleSchema.index({ status: 1, instructor: 1 });

module.exports = mongoose.model('Schedule', scheduleSchema);
