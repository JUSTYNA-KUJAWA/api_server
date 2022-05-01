const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getById);

router.post('/concerts', ConcertController.postCon);

router.put('/concerts/:id', ConcertController.putCon);

router.delete('/concerts/:id', ConcertController.deleteCon);

module.exports = router;