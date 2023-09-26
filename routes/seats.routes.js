const express = require('express');
const router = express.Router();

const SeatsController = require('../controllers/seats.controller')

//show all seats (GET)
router.get('/', SeatsController.getAll);

//show only one seat (GET)
router.get('/:id', SeatsController.getSeatID);

//show random seats (GET)
router.get('/random', SeatsController.getRandom);

//add seat (POST)
router.post('/', SeatsController.addSeat);

//modyfi seat (PUT)
router.put('/:id', SeatsController.modyfiSeat);

//delete seat (DELETE)
router.delete('/:id', SeatsController.deleteSeat);

module.exports = router;