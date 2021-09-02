const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error');

const { createUser, login } = require('./controllers/users');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

const { validateSignUp, validateSignIn } = require('./middlewares/validators');
const NotFoundError = require('./errors/notfound-err');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors({
  origin: 'https://frontend-mesto.nomoredomains.club',
  credentials: true,
}));

// app.use(cors);

// const allowedCors = [
//   'https://frontend-mesto.nomoredomains.club',
//   'https://api.backend-mesto.nomoredomains.club',
//   'http://localhost:3000',
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedCors.indexOf(origin) !== 1) {
//       callback(null, true);
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.use(errorLogger);

app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
