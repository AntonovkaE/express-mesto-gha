const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { sendNotFoundError } = require('./utils/error');
const {
  login,
  createUser,
} = require('./controllers/user');
const auth = require('./middlewares/auth');
const { errors,
  celebrate,
  Joi
} = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
// app.use((req, res, next) => {
//   req.user = {
//     _id: '62da8198b3e1d1a53fca6734',
//   };
//   next();
// });

// var db = mongoose.connection;
//
// db.on('error', function() {
//   return console.error.bind(console, 'connection error: ');
// });
//
// db.once('open', function() {
//   var User;
//   return User = require('./user.js');
// });
//
// // Validate a user
// (function() {
//   var User = require('./models/user');
//   var me = { username: 'foo' };
//   var user = new User(me);
//   var err = user.joiValidate(me);
//   if (err) throw err;
// })();

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    age: Joi.number().integer().required().min(18),
    about: Joi.string().min(2).max(30),
  })
}), createUser);


app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/', (req, res) => {
  sendNotFoundError(res);
});
app.use(errors());

app.listen(PORT);
