const express = require('express');

const router = express.Router();

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not defind yet'
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not defind yet'
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not defind yet'
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not defind yet'
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not defind yet'
  });
};

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
