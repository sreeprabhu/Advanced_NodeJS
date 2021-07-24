import fs from 'fs';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

import Tour from '../models/tourModel.js';

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
 * Route Handlers - All Tours
 * @param {*} req
 * @param {*} res
 */
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
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

export const createTour = async (req, res) => {
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
      message: 'Invalid Data Send',
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
