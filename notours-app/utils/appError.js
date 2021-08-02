export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // can be used to skip showing the non operational errors to the user
    this.isOperational = true;

    // if a new Error object is created and constructor is called,
    // that function call is not gonna appear in the error stack trace and pollute it.
    Error.captureStackTrace(this, this.constructor);
  }
}
