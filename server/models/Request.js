const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  location: { lat: Number, lng: Number },
  urgency: { type: String, enum: ['low','medium','high'], default: 'high' },
  status: { type: String, enum: ['open','matched','closed'], default: 'open' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', RequestSchema);
