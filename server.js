const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
  req.io = io;
  next();
});

const artistsRouter = require('./routes/artists.routes');
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000')
});

const io = socket(server);

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
})

app.use('/api', artistsRouter);
app.use('/api', concertsRouter);
app.use('/api/seats', seatsRouter);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

io.on('connection', () => {
  console.log('New socket!')
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

mongoose.connect('mongodb://0.0.0.0:27017/NewWaveDB', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
})
db.on('error', err => console.log('Error ' + err ));

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
});

module.exports = server;