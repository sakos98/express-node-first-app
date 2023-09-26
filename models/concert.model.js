const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  performer: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, require: true },
  day: { type: Number, require: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Concerts', concertSchema);
