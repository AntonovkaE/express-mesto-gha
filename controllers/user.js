const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const User = require('../models/user');

const { userValidation} = require('../validations/user')

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

// module.exports.getUser = (req, res) => {
//   const { id } = req.params;
//   User.findById(id)
//     .then((user) => {
//       if (!user) {
//         return sendNotFoundError(res);
//       }
//       return res.status(200).send({ user });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return sendBadRequestError(res);
//       }
//       return sendDefaultError(res);
//     });
// };

module.exports.getUser = (req, res) => {
  // joinValidation (req, res)
  const { id } = req.body;
  User.findById(id).select('+password')
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

// module.exports.deleteUser = (req, res) => {
//   const { id } = req.body;
//   User.findByIdAndDelete(id)
//     .then(user => {
//       return res.status(200).send("удален")
//     })
// }

module.exports.createUser = (req, res) => {
  joinValidation(req, res)
  const {
    name, about, avatar, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      avatar,
      about,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return sendBadRequestError(res);
      }
      return sendDefaultError(res);
    });
};

function joinValidation (req, res) {
  const { error } = userValidation(req.body);
  if (error) {
    return res.status(401).send({ "message": "error" })
  }
}

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { error } = userValidation(req.body);
  if (error) {
    return res.status(401).send({ "message": "error" })
  }
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        return sendNotFoundError(res);
      }
      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return sendBadRequestError(res);
      }
      return sendDefaultError(res);
    });
};

module.exports.updateAvatar = (req, res) => {
  joinValidation(req, res)
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  joinValidation(req, res)
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' })
      })
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
}
