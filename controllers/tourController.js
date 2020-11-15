const Tour = require('./../models/tourModel');


exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success'

    // data: {
    //   tour
    // }
  });
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.createTour = async(req, res) => {

  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  }
  catch(err) {
    res.status(400).json({
      status:'err',
      message : 'invalid data set'
    })
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>>'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
