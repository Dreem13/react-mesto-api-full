const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
  // eslint-disable-next-line no-unused-vars
  cardRout,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/validators');

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateCardId, deleteCard);
router.put('/cards/:cardId/likes', validateCardId, addCardLike);
router.delete('/cards/:cardId/likes', validateCardId, deleteCardLike);
// router.get('*', cardRout);

module.exports = router;
