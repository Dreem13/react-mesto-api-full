const Card = require('../models/card');

const IncorrectError = require('../errors/incorrect-err'); // 400
const NotFoundError = require('../errors/notfound-err'); // 403
const ForbiddenError = require('../errors/forbidden-err'); // 404

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectError('Некорректные данные при создании карточки');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      if (card.owner.toString() !== userId) {
        next(new ForbiddenError('У Вас недостаточно прав для удаления карточки'));
        return;
      }
      card.deleteOne();
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new IncorrectError('Карточка с указанным id не найдена');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.addCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Невалидный id');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectError('Некорректные данные, чтобы поставить лайк');
      } else if (err.name === 'CastError') {
        throw new IncorrectError('Карточка с указанным id не найдена');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Невалидный id');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectError('Переданы некорректные данные для снятия лайка');
      } else if (err.name === 'CastError') {
        throw new IncorrectError('Карточка с указанным id не найдена');
      } else {
        next(err);
      }
    })
    .catch(next);
};

// module.exports.cardRout = (req, res) => {
//   // eslint-disable-next-line no-console
//   console.log(req, res);
//   throw new NotFoundError('Ресурс не найден');
// };
