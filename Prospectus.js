const mongoose = require('mongoose');

const TERMS = ['1st Semester', '2nd Semester', 'Summer'];

const itemSchema = new mongoose.Schema({
  yearLevel: { type: Number, min: 1, max: 4, required: true },
  term: { type: String, enum: TERMS, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }
}, { _id: false });

// One prospectus (curriculum) per course: which subjects belong to which year level and semester.
const prospectusSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, unique: true },
  items: { type: [itemSchema], default: [] },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

prospectusSchema.pre('validate', function (next) {
  const seen = new Set();
  for (const item of this.items) {
    const id = String(item.subject);
    if (seen.has(id)) { this.invalidate('items', 'A subject can appear only once in a prospectus.'); break; }
    seen.add(id);
  }
  next();
});

const Prospectus = mongoose.model('Prospectus', prospectusSchema);
Prospectus.TERMS = TERMS;
module.exports = Prospectus;