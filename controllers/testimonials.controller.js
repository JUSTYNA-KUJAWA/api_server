const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.getById = async (req, res) => {
    try {
      const tes = await Testimonial.findById(req.params.id);
      if(!tes) res.status(404).json({ message: 'Not found' });
      else res.json(tes);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }  
}

exports.getRandom = async (req, res) => {
    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const tes = await Testimonial.findOne().skip(rand);
      if(!tes) res.status(404).json({ message: 'Not found' });
      else res.json(tes);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

exports.postTes = async (req, res) => {
    try {
      const { id, author, text } = req.body;
      const newTestimonial = new Testimonial({ id: id, author: author, text: text });
      await newTestimonial.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  }

exports.putTes = async (req, res) => {
    const { id, author, text } = req.body;

    try {
      const tes = await Testimonial.findById(req.params.id);
      if(tes) {
        await Testimonial.updateOne({ _id: req.params.id }, { $set: { id: id, author: author, text: text }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.deleteTes = async (req, res) => {
    try {
      const tes = await Testimonial.findById(req.params.id);
      if(tes) {
        await Testimonial.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }