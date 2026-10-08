const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  performedByLabel: { type: String, trim: true, default: 'System' },
  category: { type: String, required: true, trim: true, index: true },
  action: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true }
}, { timestamps: { createdAt: true, updatedAt: false } });

activityLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema, 'activityLogs');
