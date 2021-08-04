import express from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  checkID,
} from '../controllers/userController.js';
import { signUp } from '../controllers/authController.js';

const router = express.Router();

/**
 * Param Middleware
 * Can Access the request parameters
 */
router.param('id', checkID);

router.post('/signup', signUp);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
