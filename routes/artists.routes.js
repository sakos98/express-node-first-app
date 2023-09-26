const express = require('express');
const router = express.Router();

const ArtistsController = require('../controllers/artists.controller');

// show all artists (GET)
router.get('/artists', ArtistsController.getAll);

//show only one artist (GET)
router.get('/artists/:id', ArtistsController.getArtistsID);

//show random artist (GET)
router.get('/artists/random', ArtistsController.getRandom);

//add artist (POST)
router.post('/artists', ArtistsController.addArtist);

//modyfi artist (PUT)
router.put('/artists/:id', ArtistsController.modyfiArtist);

//delete artist (DELETE)
router.delete('/artists/:id', ArtistsController.deleteArtist);

module.exports = router;