const mongoose = require('mongoose');
const PropertySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  rent: { type: Number, required: true },
  maintenance: { type: Number, default: 0 },
  bhk: { type: Number, required: true },
  occupancy: { type: String, enum: ['single','double','triple'], default: 'single' },
  tenantType: { type: String, enum: ['bachelor','family','any'], default: 'any' },
  vegPreference: { type: String, enum: ['veg','nonveg','any'], default: 'any' },
  preferredGender: { type: String, enum: ['any','male','female'], default: 'any' },
  address: String,
  city: String,
  state: String,
  pincode: { type: String, match: /^[0-9]{6}$/ },
  images: [String],
  contactRevealed: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model('Property', PropertySchema);
