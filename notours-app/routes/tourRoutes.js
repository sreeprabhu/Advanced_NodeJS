import express from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
} from '../controllers/tourController.js';

const router = express.Router();

/**
 * Param Middleware
 * Can Access the request parameters
 */
router.param('id', checkID);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
