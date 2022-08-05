const router = require('express')
  .Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');
const {
  validationId,
  createCardValidation,
} = require('../utils/validation');

router.get('/', getCards);
router.delete('/:id', validationId, deleteCard);
router.post('/', createCardValidation, createCard);
router.put('/:id/likes', validationId, likeCard);
router.delete('/:id/likes', validationId, dislikeCard);

module.exports = router;
