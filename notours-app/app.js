import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

const PORT = 3000;

export const app = express();

/**
 * Middlewares: stands between a req and res
 * middleware to make request body available in the request
 */
app.use(express.json());

/**
 * HTTP Request Logger Middleware
 */
app.use(morgan('dev'));

/**
 * Custom Middleware
 * Middlewares in the middleware stack will apply to each and every single request
 */

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

/**
 * Routes: Middlewares which executes specific functions only for a matched url
 */

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.route('/api/v1/tours').get(getAllTours).post(createTour);

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// app.route('/api/v1/users').get(getAllUsers).post(createUser);

// userRouter.route('/').get(getAllUsers).post(createUser);
// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
