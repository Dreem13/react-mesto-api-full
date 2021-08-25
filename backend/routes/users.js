const router = require('express').Router();
const {
  // eslint-disable-next-line no-unused-vars
  getUsers, getUserById, updateUser, updateUserAvatar, getCurrentUser, userRout,
} = require('../controllers/users');
const { validateUserId, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validators');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', validateUserId, getUserById);
router.patch('/users/me', validateUpdateProfile, updateUser);
router.patch('/users/me/avatar', validateUpdateAvatar, updateUserAvatar);
// router.get('*', userRout);

module.exports = router;
