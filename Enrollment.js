const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true, index: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true },
  // New: enrollment belongs to a semester, and keeps its result so history is never lost.
  semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', default: null, index: true },
  result: { type: String, enum: ['Enrolled', 'Passed', 'Failed', 'Incomplete', 'Dropped'], default: 'Enrolled', index: true },
  grade: { type: Number, min: 1, max: 5, default: null }
}, { timestamps: true });

enrollmentSchema.index(
  { student: 1, subject: 1 },
  { unique: true, partialFilterExpression: { status: 'Active' }, name: 'unique_active_student_subject' }
);

module.exports = mongoose.model('Enrollment', enrollmentSchema);