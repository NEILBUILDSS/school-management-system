const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  seedKey: { type: String, unique: true, sparse: true, immutable: true },
  code: { type: String, required: true, uppercase: true, trim: true, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
