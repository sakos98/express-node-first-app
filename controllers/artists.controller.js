const Artists = require('../models/artists.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Artists.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getArtistsID = async (req, res) => {
  try {
    const artist = await Artists.findById(req.params.id);
    if (!artist) res.status(404).json({ message: 'Not found' });
    else res.json(artist);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Artists.countDocuments();
    const random = Math.floor(Math.random() * count);
    const art = await Artists.findById(random);
    if (!art) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: 'OK' });
  }
}

exports.addArtist = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newartist = new Artists({ author: author, text: text });
    await newartist.save();
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.modyfiArtist = async (req, res) => {
  try {
    const { author, text } = req.body;
    const updateart = await Artists.findById(req.params.id);
    if (!updateart) res.status(404).json({ messsage: 'Not found' });
    else {
      await Artists.updateOne({ _id: req.params.id }, { $set: { author: author, text: text } });
      res.json({ message: "OK" });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.deleteArtist = async (req, res) => {
  try {
    const deleteart = await Artists.findById(req.params.id);
    if (!deleteart) res.status(404).json({ message: 'Not found' });
    else {
      await seats.deleteOne({ _id: req.params.id });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}