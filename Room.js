const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  seedKey: { type: String, unique: true, sparse: true, immutable: true },
  roomCode: { type: String, required: true, uppercase: true, trim: true, unique: true, index: true },
  roomName: { type: String, required: true, trim: true },
  roomType: { type: String, enum: ['Laboratory', 'Non-Laboratory'], required: true, index: true },
  capacity: { type: Number, min: 1, max: 500, required: true },
  equipment: [{ type: String, trim: true }],
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true },
  photoPath: { type: String, default: '' },
  photoIsPlaceholder: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
