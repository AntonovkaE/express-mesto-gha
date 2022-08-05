const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  errors,
} = require('celebrate');
const {
  NotFoundError,
} = require('./utils/errors/NotFoundError');
const {
  login,
  createUser,
} = require('./controllers/user');
const auth = require('./middlewares/auth');
const {
  loginValidation,
  createUserValidation,
} = require('./utils/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/', () => {
  throw new NotFoundError('Страница не найдена');
});
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с таким email существует' });
  }
  res.status(statusCode).send({ message: statusCode === 500 ? 'ошибка на сервере' : message });
  return next();
});

app.listen(PORT);
