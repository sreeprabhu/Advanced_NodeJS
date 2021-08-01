import express from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} from '../controllers/tourController.js';

const router = express.Router();

/**
 * Param Middleware
 * Can Access the request parameters
 */
// router.param('id', checkID);

// router.route('/').get(getAllTours).post(checkBody, createTour); // Multiple Middlewares being called here
router.route('/').get(getAllTours).post(createTour);

// Aggregate with group
router.route('/tour-stats').get(getTourStats);

// Aggregate with unwind
router.route('/monthly-tour-plan/:year').get(getMonthlyPlan);

// Aliasing
router.route('/top-cheap-tours').get(aliasTopTours, getAllTours);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
