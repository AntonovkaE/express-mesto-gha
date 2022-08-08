const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const User = require('../models/user');

const {
  NotFoundError,
} = require('../utils/errors/NotFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200)
        .send({ users });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  // const { id } = req.user._id;
  User.findById(req.user._id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      // if (!user) {
      //   throw new NotFoundError('Пользователь не найден');
      // }
      return res.status(200)
        .send({ user });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      return res.status(200).send({ user });
    })
    .catch(next);
};

// module.exports.deleteUser = (req, res) => {
//   const { id } = req.body;
//   User.findByIdAndDelete(id)
//     .then(user => {
//       return res.status(200).send("удален")
//     })
// }

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    password,
    email,
  } = req.body;
  // User.findOne({ email })
  //   .then((user) => {
  //     if (user) {
  //       res.status(409)
  //         .send({ message: 'Пользователь с таким email существует' });
  //     }
  //   });
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      avatar,
      about,
      password: hash,
    }))
    .then((user) => res.send(
      {
        name, email, avatar, about, id: user._id,
      },
    ))
    .catch(next);
};
module.exports.updateUser = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, {
    runValidators: true,
    new: true,
  })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      // if (!user) {
      //   throw new NotFoundError('Нет пользователя с таким id');
      // }
      return res.status(200)
        .send({ user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    runValidators: true,
    new: true,
  })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      // if (!user) {
      //   throw new NotFoundError('Нет пользователя с таким id');
      // }
      return res.send(user);
    })
    .catch(next);
};

module.exports.login = (req, res) => {
  const {
    email,
    password,
  } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }) });
    })
    .catch((err) => {
      res.status(401)
        .send({ message: err.message });
    });
};
