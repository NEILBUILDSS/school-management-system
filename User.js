const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['Admin', 'Instructor', 'Student'], required: true, index: true },
  username: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true },
  lastLoginAt: { type: Date, default: null },
  registrationStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Approved', index: true },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  reviewedAt: { type: Date, default: null },
  rejectionReason: { type: String, trim: true, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
