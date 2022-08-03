const router = require('express')
  .Router();
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.delete('/:id', deleteCard);
router.post('/', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .pattern(/^(ftp|http|https):\/\/[^ "]+$/),
    }),
}), createCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
