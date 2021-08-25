const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/authorization-err');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret-test');
  } catch (err) {
    next(new AuthorizationError('Пожалуйста, авторизуйтесь'));
  }

  req.user = payload;

  next();
};
