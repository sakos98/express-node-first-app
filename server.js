const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs());
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.use('/user', (req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/user/${name}`));
  };
  res.show('forbidden.html');
  next();
});

app.get('/hello/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`);
});



app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' })
});

app.get('user/settings', (req, res) => {
  res.render('userSettings')
});

app.get('user/panel', (req, res) => {
  res.render('userPanel')
});

app.get('/contact', (req, res) => {
  res.render('contact')
});

app.get('/info', (req, res) => {
  res.render('info')
});

app.get('/history', (req, res) => {
  res.render('history')
});


app.use((req, res) => {
  // res.status(404).send('404 not found...');
  res.show('404.html');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

