const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  id: { type: Number },
  performer: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  day: { type: Number, min:1, max: 3, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Concert', concertSchema);