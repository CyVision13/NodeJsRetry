const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// 1) Middlewares
app.use(morgan('dev'));

//* its bcz we could use json in post method and receive data
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware11. Refactoring Our Routes 🔥  ');
  next();
});

// 3) Routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app