const User = require('../models/user');
const {
  sendDefaultError, sendBadRequestError, sendNotFoundError,
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
      if (err.name === 'CastError') {
        return sendBadRequestError(res);
      }
      return sendDefaultError(res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return sendBadRequestError(res);
      }
      return sendDefaultError(res);
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        return sendNotFoundError(res);
      }
      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // res.status(400).send(req.user._id)
        return sendBadRequestError(res);
      }
      return sendDefaultError(res);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
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
