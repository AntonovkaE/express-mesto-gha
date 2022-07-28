const BAD_REQUEST_ERROR_CODE = 400;
const DATA_NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const DATA_NOT_FOUND_MESSAGE = 'Данные не найдены';
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';

const sendDefaultError = (res) => {
  res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE });
};
const sendBadRequestError = (res) => {
  res.status(BAD_REQUEST_ERROR_CODE).send({ message: BAD_REQUEST_MESSAGE });
};
const sendNotFoundError = (res) => {
  res.status(DATA_NOT_FOUND_ERROR_CODE).send({ message: DATA_NOT_FOUND_MESSAGE });
};
module.exports = {
  BAD_REQUEST_MESSAGE,
  BAD_REQUEST_ERROR_CODE,
  DATA_NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  DATA_NOT_FOUND_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  sendDefaultError,
  sendBadRequestError,
  sendNotFoundError,
};
