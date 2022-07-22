const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3005, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true
});



app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('/', (req, res) => {
  res.status(200);
  res.send("hello")
})
// app.use((req, res, next) => {
//   req.user = {
//     _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };
//
//   next();
// });

app.listen(3000, () => {
  console.log('Ссылка на сервер');
  console.log(PORT);
});

