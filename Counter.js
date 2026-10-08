const mongoose = require('mongoose');

// One document per counter, e.g. "student-2026", "instructor", "room".
// $inc on one document is atomic, so two requests can never receive the same number.
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
}, { versionKey: false });

module.exports = mongoose.model('Counter', counterSchema, 'counters');