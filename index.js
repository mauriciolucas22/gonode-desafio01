const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// config
app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// default middleware para major e minor
const isEmptyName = (req, res, next) => {
  if (req.query.name === undefined) {
    res.redirect('/');
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/major', isEmptyName, (req, res) => {
  res.render('major', { name: req.query.name });
});

app.get('/minor', isEmptyName, (req, res) => {
  res.render('minor', { name: req.query.name });
});

app.post('/check', (req, res) => {
  const { name, date } = req.body;

  res.redirect(`/major?name=${name}`);
});

app.listen(3000);
