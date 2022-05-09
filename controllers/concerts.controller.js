const Concert = require('../models/concert.model');
var sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getItem = async (req, res) => {

  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found ...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postItem = async (req, res) => {

  try {
    const clean = sanitize(req.body);
    const { performer, genre, price, day, image } = clean;
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteItem = async (req, res) => {

  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json( dep );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putItem = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const dep = await Concert.findById(req.params.id);
    if (dep) {
      await Concert.updateOne(
        { _id: req.params.id },
        { $set: {  
          performer: performer,
          genre: genre,
          price: price,
          day: day,
          image: image, } }
      );
      const depChenged = await Concert.findById(req.params.id);
      res.json(depChenged);
    } else res.status(404).json({ message: 'Not found..' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getPerformer = async (req, res) => {
  try {
    const performer = req.params.performer;
    const getPerformer = await Concert.find({ performer: performer });
    if (!getPerformer) res.status(404).json({ message: 'Not found' });
    else {
      res.json(getPerformer);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const getGenre = await Concert.find({ genre: genre });
    if (!getGenre) res.status(404).json({ message: 'Not found' });
    else {
      res.json(getGenre);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getPrice = async (req, res) => {
  try {
    const priceMin = req.params.price_min;
    const priceMax = req.params.price_max;
    const concert = await Concert.find({
      price: { $gte: priceMin, $lte: priceMax },
    });
    if (!concert) res.status(404).json({ message: 'Not found' });
    else {
      res.json(concert);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getbyDay = async (req, res) => {
  try {
    const day = req.params.day;
    const getDay = await Concert.findOne({ day: day });
    if (!getDay) res.status(404).json({ message: 'Not found' });
    else {
      res.json(getDay);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};