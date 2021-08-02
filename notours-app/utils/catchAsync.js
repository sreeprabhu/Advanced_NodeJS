/**
 * catch async errors
 * returns another function which will be the actual create tour async func
 */
export default (fn) => (req, res, next) => {
  // if any error encounters, the next global error handling middleware will be called
  fn(req, res, next).catch((err) => next(err));
};
