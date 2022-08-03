const router = require('express').Router();
const {
  getUsers, getUser, updateUser, getCurrentUser, updateAvatar,
} = require('../controllers/user');


router.get('/me', getCurrentUser);
router.get('/:id', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('/', getUsers);
// router.delete('/', deleteUser)

module.exports = router;
