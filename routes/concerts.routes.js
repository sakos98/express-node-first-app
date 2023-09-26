const express = require('express');
const router = express.Router();

const ConcertsController = require('../controllers/concert.controller');

//show all concerts (GET)
router.get('/concerts', ConcertsController.getAll);

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