const router = require('express')
  .Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

const { validateId, validateCreateCard } = require('../utils/validation');

router.get('/', getCards);
router.delete('/:id', validateId, deleteCard);
router.post('/', validateCreateCard, createCard);
router.put('/:id/likes', validateId, likeCard);
router.delete('/:id/likes', validateId, dislikeCard);

module.exports = router;
