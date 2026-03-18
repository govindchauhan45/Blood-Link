const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  phone: { type: String }
});

module.exports = mongoose.model('Bank', BankSchema);
