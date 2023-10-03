const Concerts = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concerts.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

// Wyszukiwanie koncertów według artysty
exports.findByPerformer = async (req, res) => {
  try {
    const { performer } = req.params;
    const concerts = await Concerts.find({ performer });
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Wyszukiwanie koncertów według gatunku
exports.findByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const concerts = await Concerts.find({ genre });
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Wyszukiwanie koncertów według ceny w przedziale
exports.findByPriceRange = async (req, res) => {
  try {
    const { price_min, price_max } = req.params;
    const concerts = await Concerts.find({ price: { $gte: price_min, $lte: price_max } });
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Wyszukiwanie koncertów według dnia
exports.findByDay = async (req, res) => {
  try {
    const { day } = req.params;
    const concerts = await Concerts.find({ day });
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertID = async (req, res) => {
  try {
    const concert = await Concerts.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);

  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Concerts.countDocuments();
    const random = Math.floor(Math.random() * count);
    const con = await Concerts.findById(random);
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: 'OK' });
  }
}

exports.addConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concerts({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.modyfiConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const changedConcert = await Concerts.findById(req.params.id);
    if (!changedConcert) res.status(404).json({ message: 'Not found' });
    else {
      await Concerts.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image } });
      res.json({ message: 'OK' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.deleteConcert = async (req, res) => {
  try {
    const deleteConcert = await Concerts.findById(req.params.id);
    if (!deleteConcert) res.status(404).json({ message: 'Not found' });
    else {
      await Concerts.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' })
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}