const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Concert = require('../models/concert.model');


router.get('/concerts', async (req, res) => {
    try {
      res.json(await Concert.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
});

router.get('/concerts/:id', async (req, res) => {
    try {
      const con = await Concert.findById(req.params.id);
      if(!con) res.status(404).json({ message: 'Not found' });
      else res.json(con);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }  
});

router.post('/concerts', async (req, res) => {
    try {
      const { id, performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ id: id, performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  });

router.put('/concerts/:id', async (req, res) => {
    const { id, performer, genre, price, day, image } = req.body;

    try {
      const con = await Concert.findById(req.params.id);
      if(con) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { id: id, performer: performer, genre: genre, price: price, day: day, image: image }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

  });

  router.delete('/concerts/:id', async (req, res) => {
    try {
      const con = await Concert.findById(req.params.id);
      if(con) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  });


module.exports = router;