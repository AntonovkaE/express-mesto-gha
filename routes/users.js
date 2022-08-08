const router = require('express').Router();

const {
  getUsers, getUser, updateUser, getCurrentUser, updateAvatar,
} = require('../controllers/user');
const { validateId, validateUpdateUser, validateUpdateAvatar } = require('../utils/validation');

router.get('/me', getCurrentUser);
router.get('/:id', validateId, getUser);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);
router.get('/', getUsers);
// router.delete('/', deleteUser)

module.exports = router;
