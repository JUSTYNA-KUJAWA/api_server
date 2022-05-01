const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

// get all testimonials
router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/:id', TestimonialController.getById);

router.get('/testimonials/random', TestimonialController.getRandom);

router.post('/testimonials', TestimonialController.postTes);

router.put('/testimonials/:id', TestimonialController.putTes);

router.delete('/testimonials/:id', TestimonialController.deleteTes);


module.exports = router;