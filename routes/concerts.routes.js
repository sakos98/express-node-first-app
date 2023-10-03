const express = require('express');
const router = express.Router();

const ConcertsController = require('../controllers/concert.controller');

//show all concerts (GET)
router.get('/concerts', ConcertsController.getAll);

// Wyszukiwanie koncertów według artysty
router.get('/concerts/performer/:performer', ConcertsController.findByPerformer);

// Wyszukiwanie koncertów według gatunku
router.get('/concerts/genre/:genre', ConcertsController.findByGenre);

// Wyszukiwanie koncertów według ceny w przedziale
router.get('/concerts/price/:price_min/:price_max', ConcertsController.findByPriceRange);

// Wyszukiwanie koncertów według dnia
router.get('/concerts/day/:day', ConcertsController.findByDay);

//show only one concert (GET)
router.get('/concerts/:id', ConcertsController.getConcertID);

//show random concert (GET)
router.get('/concerts/random', ConcertsController.getRandom);

//add concert (POST)
router.post('/concerts', ConcertsController.addConcert);

//modyfi concert (PUT)
router.put('/concerts/:id', ConcertsController.modyfiConcert);

//delete concert (DELETE)
router.delete('/concerts/:id', ConcertsController.deleteConcert);


module.exports = router;