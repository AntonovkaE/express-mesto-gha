const Card = require('../models/card');
const {
  sendDefaultError,
  sendBadRequestError,
  sendNotFoundError,
} = require('../utils/error');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => sendDefaultError(res));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return sendNotFoundError(res);
      }
      if (card.owner === req.user._id) {
        card.remove({ _id: req.params.id })
          .then((removedCard) => {
            return res.send(removedCard);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              return sendBadRequestError(res);
            }
            return sendDefaultError(res);
          });
      }
    });
};

// .then((card) => {
// res.send(req)})
//   if (req.user._id === owner) {
//   }
//   Card.findOneAndDelete({ _id: req.params.id })
//     .then((card) => {
//       if (!card) {
//         return sendNotFoundError(res);
//       }
//
//       return res.send({ card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return sendBadRequestError(res);
//       }
//       return sendDefaultError(res);
//     });
// };

module.exports.createCard = (req, res) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return sendBadRequestError(res);
      }
      return sendDefaultError(res);
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => {
    if (!card) {
      return sendNotFoundError(res);
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return sendBadRequestError(res);
    }
    return sendDefaultError(res);
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => {
    if (!card) {
      return sendNotFoundError(res);
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return sendBadRequestError(res);
    }
    return sendDefaultError(res);
  });
