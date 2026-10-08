const mongoose = require('mongoose');

const TERMS = ['1st Semester', '2nd Semester', 'Summer'];

const semesterSchema = new mongoose.Schema({
  academicYear: { type: String, required: true, trim: true, match: [/^\d{4}-\d{4}$/, 'Academic year must look like 2026-2027.'] },
  term: { type: String, enum: TERMS, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isCurrent: { type: Boolean, default: false }
}, { timestamps: true });

semesterSchema.index({ academicYear: 1, term: 1 }, { unique: true });
// Only one semester can be the current one. The database enforces this.
semesterSchema.index({ isCurrent: 1 }, { unique: true, partialFilterExpression: { isCurrent: true } });

semesterSchema.pre('validate', function (next) {
  if (this.startDate && this.endDate && this.endDate <= this.startDate) {
    this.invalidate('endDate', 'End date must be after the start date.');
  }
  const m = /^(\d{4})-(\d{4})$/.exec(this.academicYear || '');
  if (m && Number(m[2]) !== Number(m[1]) + 1) {
    this.invalidate('academicYear', 'Academic year must span two consecutive years, e.g. 2026-2027.');
  }
  next();
});

semesterSchema.virtual('label').get(function () {
  return `${this.academicYear} ${this.term}`;
});

const Semester = mongoose.model('Semester', semesterSchema);
Semester.TERMS = TERMS;
module.exports = Semester;