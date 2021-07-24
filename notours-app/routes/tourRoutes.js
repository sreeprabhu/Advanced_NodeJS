import express from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} from '../controllers/tourController.js';

const router = express.Router();

/**
 * Param Middleware
 * Can Access the request parameters
 */
// router.param('id', checkID);

// router.route('/').get(getAllTours).post(checkBody, createTour); // Multiple Middlewares being called here
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
