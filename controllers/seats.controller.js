const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.getById = async (req, res) => {
    try {
      const seat = await Seat.findById(req.params.id);
      if(!seat) res.status(404).json({ message: 'Not found' });
      else res.json(seat);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }  
}

exports.postSeat = async (req, res) => {
    try {
      const clean = sanitize(req.body);
      const { id, day, seat, client, email } = clean;
      const newSeat = new Seat({ id: id, day: day, seat: seat, client: client, email: email });
      await newSeat.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.putSeat = async (req, res) => {
    const { id, day, seat, client, email } = req.body;

    try {
      const seats = await Seat.findById(req.params.id);
      if(seats) {
        await Seat.updateOne({ _id: req.params.id }, { $set: { id: id, day: day, seat: seat, client: client, email: email }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }  
}

exports.deleteSeat = async (req, res) => {
    try {
      const seat = await Seat.findById(req.params.id);
      if(seat) {
        await Seat.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }