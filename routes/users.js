const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, getCurrentUser, updateAvatar,
} = require('../controllers/user');

router.get('/me', getCurrentUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').pattern(/^(ftp|http|https):\/\/[^ "]+$/),
  }),
}), updateAvatar);
router.get('/', getUsers);
// router.delete('/', deleteUser)

module.exports = router;
