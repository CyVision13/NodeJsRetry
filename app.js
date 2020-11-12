const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) Middlewares
app.use(morgan('dev'));

//* its bcz we could use json in post method and receive data
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) Route handlers

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',

    data: {
      tour
    }
  });
};

const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>>'
    }
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

app.use((req, res, next) => {
  console.log('Hello from the middleware11. Refactoring Our Routes 🔥  ');
  next();
});

// 3) Routes

app
  .route('/api/v1/tours')
  .get(getAllTour)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// 4) Start the server

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
