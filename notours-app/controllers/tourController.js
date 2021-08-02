import fs from 'fs';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

import Tour from '../models/tourModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import catchAsync from '../utils/catchAsync.js';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

/**
 * Param Middleware to check ID
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} val
 * @returns
 */
export const checkID = async (req, res, next, val) => {
  console.log(`Param Middleware: Current Id is ${val}`);
  const tours = await Tour.find();
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    });
  }
  next();
};

/**
 * CheckBody Middleware
 * Check if body contains the name and price property
 * if not, send a 404 (bad request)
 * Used in post handler
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price!',
    });
  }
  next();
};

/**
 * Alias Middleware
 */
export const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

/**
 * Route Handlers - Get All Tours with Filters, Pagination, Field Limiting and Sort
 * @param {*} req
 * @param {*} res
 */
export const getAllTours = async (req, res) => {
  try {
    // Build Query

    // 1A) Filtering

    // 2) Sorting

    // 3) Field Limiting

    // 4) Pagination

    // Execute Query

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const tours = await features.query;
    // const tours = await query;

    // query.sort().select().skip().limit()

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime, // the time set from the custom middleware
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const getTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findById(id);
    // Tour.findOne({ _id: id }); this also works

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime, // the time set from the custom middleware
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

export const createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

export const createTourWithoutAsynErrorHandling = async (req, res, next) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = { ...req.body, id: newId };

  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
};

export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    await Tour.findByIdAndDelete(id);

    res.status(204).json({
      // status: No Content
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Aggragate Middleware with Group
 */

export const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id: null,
          // _id: '$difficulty',
          _id: { $toUpper: '$difficulty' }, // group by field
          numTours: { $sum: 1 }, // for each of the document that goes through this pipeline, 1 will be added to the counter
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 }, // need to use the grouped fields (-1 for descenting)
      },
      {
        $match: {
          _id: { $ne: 'EASY' }, // filter values
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Aggragate Middleware with UnWind
 */
export const getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2021

    /**
     * unwind aggregate function
     * deconstruct an array field from an input document and then give one document
     * for each array element
     */
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          }, // filter values
        },
      },
      {
        $group: {
          _id: {
            $month: '$startDates',
          },
          numTourStarts: { $sum: 1 }, // tours starting in each months
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 }, // the ones with 0 won't show up in the response
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
