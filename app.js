const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { sendNotFoundError } = require('./utils/error');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use((req, res, next) => {
  req.user = {
    _id: '62da8198b3e1d1a53fca6734',
  };
  next();
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/', (req, res) => {
  sendNotFoundError(res);
});

app.listen(PORT);
