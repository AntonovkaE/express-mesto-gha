// const BAD_REQUEST_ERROR_CODE = 400;
// const UNAUTHORIZED_CODE = 401;
const DATA_NOT_FOUND_ERROR_CODE = 404;
// const DEFAULT_ERROR_CODE = 500;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DATA_NOT_FOUND_ERROR_CODE;
  }
}

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
