const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },

});

module.exports = mongoose.model('Artists', artistSchema);
