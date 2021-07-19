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
  if (req.params.id * 1 > 10) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    });
  }
  next();
};

export const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not defined!',
  });
};

export const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not defined!',
  });
};

export const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not defined!',
  });
};

export const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not defined!',
  });
};

export const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not defined!',
  });
};
