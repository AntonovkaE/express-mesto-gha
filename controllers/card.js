const Card = require('../models/card');
const {
  NotFoundError,
} = require('../utils/error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким не существует');
      }
      if (card.owner === req.user._id) {
        return card.remove({ _id: req.params.id })
          .then((removedCard) => res.send(removedCard));
      }
    })
    .catch(next);
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

module.exports.createCard = (req, res, next) => {
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
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch(next);
};
