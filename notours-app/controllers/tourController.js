import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/**
 * Param Middleware to check ID
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} val
 * @returns
 */
export const checkID = (req, res, next, val) => {
  console.log(`Param Middleware: Current Id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    });
  }
  next();
};

/**
 * Route Handlers - All Tours
 * @param {*} req
 * @param {*} res
 */
export const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime, // the time set from the custom middleware
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

export const getTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find((tour) => tour.id === id * 1);

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

export const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

export const updateTour = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here.>',
    },
  });
};

export const deleteTour = (req, res) => {
  const { id } = req.params;

  if (id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    });
  }

  res.status(204).json({
    // status: No Content
    status: 'success',
    data: null,
  });
};
