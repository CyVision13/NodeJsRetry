const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync =  require('./../utils/catchAsync')

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,summery,difficulty,ratingsAverage';

  next();
};


exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  // const tour = await Tour.findOne({_id:id})
  console.log(tour);
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });

  // try {

  // } catch (err) {
  //   res.status(400).json({
  //     status: 'err',
  //     message: 'invalid data set'
  //   });
  // }
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });

  // try {

  // } catch (err) {
  //   res.status(400).json({
  //     status: 'err',
  //     message: 'invalid data set'
  //   });
  // }
});
exports.getAllTours = async (req, res) => {
  try {
    // Execute Query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .LimitField()
      .Paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'err',
      message: 'invalid data set'
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      //const tour = await Tour.findOneAndUpdate(id , req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'err',
      message: 'invalid data set'
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'err',
      message: 'invalid data set'
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: '$difficulty',
          num: { $sum: 1 }, // computing each document = 1 number and summ all of them
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingAverage' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: {
          month: '$_id'
        }
      },
      {
        $project: { _id: 0 }
      },
      {
        $sort: {
          numTourStarts: -1
        }
      },
      {
        $limit: 12
      }
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
