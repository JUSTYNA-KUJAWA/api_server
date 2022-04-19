const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const message = { message: 'OK' };

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter((item) => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newSeats = {
    id: uuidv4(),
    day: day,
    seat: seat,
    client: client,
    email: email,
  };
  db.seats.push(newSeats);
  res.json(message);
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const editedSeats = db.seats.find((item) => item.id == req.params.id);
  const indexOfSeats = db.seats.indexOf(editedSeats);
  const newSeats = {
    ...editedSeats,
    day: day,
    seat: seat,
    client: client,
    email: email,
  };
  db.seats[indexOfSeats] = newSeats;
  res.json(message);
});

router.route('/seats/:id').delete((req, res) => {
  const editedSeats = db.seats.find((item) => item.id == req.params.id);
  const indexOfSeats = db.seats.indexOf(editedSeats);
  db.seats.splice(indexOfSeats, 1);
  res.json(message);
});

module.exports = router;