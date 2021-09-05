const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error');

const { createUser, login } = require('./controllers/users');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { validateSignUp, validateSignIn } = require('./middlewares/validators');
const NotFoundError = require('./errors/notfound-err');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use(cors({
//   origin: 'https://frontend-mesto.nomoredomains.club',
//   credentials: true,
// }));

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

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors);
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
