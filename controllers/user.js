const User = require('../models/user');
const {
  sendDefaultError, sendBadRequestError, sendNotFoundError
} = require("../utils/error");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).send({users})
    })
    .catch(() => sendDefaultError(res))
};

module.exports.getUser = (req, res) => {
  const {id} = req.params;
  User.findById(id)
    .then(user => {
      if (!user) {
        sendNotFoundError(res)
      }
      res.status(200).send({user})
    })
    .catch(() => sendDefaultError(res))
};

module.exports.createUser = (req, res) => {
  User.create({...req.body})
    .then(user => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return sendBadRequestError(res)
      } else {
        sendDefaultError(res)
      }
    })
};

module.exports.updateUser = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.params.id, {name, about}, {new: true})
    .then(user => {
      if (!user) {
        return sendNotFoundError(res)
      }
      res.send({user})
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return sendBadRequestError(res)
      } else {
        sendDefaultError(res)
      }
    })
}

module.exports.updateAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.params.id, {avatar}, {new: true})
    .then(user => {
      if (!user) {
        return sendNotFoundError(res)
      }
      res.send({user})
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        return sendBadRequestError(res)
      } else {
        sendDefaultError(res)
      }
    })
}

