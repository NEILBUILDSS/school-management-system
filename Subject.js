const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  seedKey: { type: String, unique: true, sparse: true, immutable: true },
  subjectCode: { type: String, required: true, uppercase: true, trim: true, unique: true, index: true },
  subjectName: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  units: { type: Number, min: 1, max: 6, required: true },
  laboratoryRequired: { type: Boolean, default: false },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
