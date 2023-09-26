const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  day: { type: Number, require: true },
  seat: { type: Number, require: true },
  clien: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Seats', seatSchema);
