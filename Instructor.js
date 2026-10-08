const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  instructorId: { type: String, trim: true, uppercase: true, unique: true, sparse: true },
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true, default: '' },
  lastName: { type: String, required: true, trim: true, index: true },
  contactNumber: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true }
}, { timestamps: true });

instructorSchema.index({ lastName: 1, firstName: 1 });

module.exports = mongoose.model('Instructor', instructorSchema);
