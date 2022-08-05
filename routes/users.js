const router = require('express').Router();

const {
  getUsers, getUser, updateUser, getCurrentUser, updateAvatar,
} = require('../controllers/user');

const {
  validationId,
  updateUserValidation,
  updateAvatarValidation,
} = require('../utils/validation');

router.get('/me', getCurrentUser);
router.get('/:id', validationId, getUser);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);
router.get('/', getUsers);
// router.delete('/', deleteUser)

module.exports = router;
