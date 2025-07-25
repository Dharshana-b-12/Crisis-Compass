const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  type: { type: String, enum: ['danger', 'resource', 'medical', 'evacuation'], required: true },
  description: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  verified: { type: Boolean, default: false },
  upvotes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Alert', AlertSchema);
