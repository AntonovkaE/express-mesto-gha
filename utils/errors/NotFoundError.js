// const BAD_REQUEST_ERROR_CODE = 400;
// // const UNAUTHORIZED_CODE = 401;
const DATA_NOT_FOUND_ERROR_CODE = 404;
// const DEFAULT_ERROR_CODE = 500;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DATA_NOT_FOUND_ERROR_CODE;
  }
}
//
// class BadRequest extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = BAD_REQUEST_ERROR_CODE;
//   }
// }
//
// class DefaultError extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = DEFAULT_ERROR_CODE;
//   }
// }

// class Unauthorized extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = UNAUTHORIZED_CODE;
//   }
// }

module.exports = { NotFoundError };

// const sendDefaultError = (res) => {
//   res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE });
// };
// const sendBadRequestError = (res) => {
//   res.status(BAD_REQUEST_ERROR_CODE).send({ message: BAD_REQUEST_MESSAGE });
// };
// const sendNotFoundError = (res) => {
//   res.status(DATA_NOT_FOUND_ERROR_CODE).send({ message: DATA_NOT_FOUND_MESSAGE });
// };
// // module.exports = {
//   BAD_REQUEST_MESSAGE,
//   BAD_REQUEST_ERROR_CODE,
//   DATA_NOT_FOUND_ERROR_CODE,
//   DEFAULT_ERROR_CODE,
//   DATA_NOT_FOUND_MESSAGE,
//   DEFAULT_ERROR_MESSAGE,
//   sendDefaultError,
//   sendBadRequestError,
//   sendNotFoundError,
// };
