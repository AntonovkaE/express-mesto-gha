const User = require('../models/user');
const {
  sendDefaultError, sendBadRequestError, sendNotFoundError, BAD_REQUEST_ERROR_CODE, BAD_REQUEST_MESSAGE,
} = require('../utils/error');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(() => sendDefaultError(res));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return sendNotFoundError(res);
      }
      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return sendBadRequestError(res)
      }
      sendDefaultError(res)
    });
};

module.exports.createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: BAD_REQUEST_MESSAGE });
        // return sendBadRequestError(res);
      }
      return sendDefaultError(res);
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        return sendNotFoundError(res);
      }
      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(req.user._id)
        return sendBadRequestError(res);
      }
      return sendDefaultError(res);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return sendNotFoundError(res);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return sendBadRequestError(res);
      }
      return sendDefaultError(res);
    });
};
