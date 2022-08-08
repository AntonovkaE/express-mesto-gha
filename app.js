const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
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
const { validateSignUp, validateSignIn } = require('./utils/validation');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

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
