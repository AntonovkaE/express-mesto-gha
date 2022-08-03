const router = require('express').Router();
const {
  getUsers, getUser, updateUser, updateAvatar, deleteUser,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUser);
// router.get('/:id', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
// router.delete('/', deleteUser)

module.exports = router;
