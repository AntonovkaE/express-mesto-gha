const router = require('express').Router();
const Card = require('../models/card');
const { getCards, deleteCard, createCard } = require('../controllers/card');

router.get('/cards', getCards)
router.delete('/cards/:cardId', deleteCard)

router.post('/cards', createCard);

module.exports = router;

