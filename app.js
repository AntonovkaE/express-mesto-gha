const express = require('express');


const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});


const server = http.createServer((request, response) => {
  console.log('Пришёл запрос!');
  console.log(request);
  console.log(response);
});

server.listen(PORT);