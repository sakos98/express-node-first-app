const Seats = require('../models/seats.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seats.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getSeatID = async (req, res) => {
  try {
    const seatsById = await Seats.findById(req.params.id);
    if (!seatsById) res.status(404).json({ message: 'Not found' });
    else {
      res.json(seatsById);
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Seats.countDocuments();
    const random = Math.floor(Math.random() * count);
    const seat = await Seats.findById(random);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: 'OK' });
  }
}

exports.addSeat = async (req, res) => {
  try {
      const { day, seat, client, email } = req.body;
      const seatCheck = await Seats.exists({ day, seat});
      if(seatCheck) {
          res.status(409).json({ message: "The slot is already taken..." })
      }
      else {
          const newSeat = new Seats({ day: day, seat: seat, client: client, email: email});
          await newSeat.save();
          const allSeats = await Seats.find()
          req.io.emit('seatsUpdated', allSeats)
          res.json(newSeat);
      }
  }
  catch(err) {
      res.status(500).json({ message: err });
  };
};


exports.modyfiSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const editedSeat = await Seats.findById(req.params.id);
    if (!editedSeat) res.status(404).json({ message: 'Not found' });
    else {
      await Seats.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email } });
      res.json({ message: 'OK' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.deleteSeat = async (req, res) => {
  try {
    const deleteSeat = await Seats.findById(req.params.id);
    if (!deleteSeat) res.status(404).json({ message: 'Not found' });
    else {
      await Seats.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}