const mongoose = require('mongoose');

// A sign-up request. It becomes a real User + Student/Instructor only when an admin approves it.
const registrationSchema = new mongoose.Schema({
  role: { type: String, enum: ['Student', 'Instructor'], required: true, index: true },
  username: { type: String, required: true, trim: true, lowercase: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true, default: '' },
  lastName: { type: String, required: true, trim: true },
  contactNumber: { type: String, required: true, trim: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null },
  yearLevel: { type: Number, min: 1, max: 4, default: null },
  department: { type: String, trim: true, default: '' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending', index: true },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  reviewedAt: { type: Date, default: null },
  rejectionReason: { type: String, trim: true, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  assignedId: { type: String, trim: true, default: '' }
}, { timestamps: true });

// Two waiting requests cannot use the same username or email (enforced by the database).
registrationSchema.index({ username: 1 }, { unique: true, partialFilterExpression: { status: 'Pending' }, name: 'unique_pending_username' });
registrationSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { status: 'Pending' }, name: 'unique_pending_email' });
registrationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Registration', registrationSchema);