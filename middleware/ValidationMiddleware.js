const { validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.mapped() });
  }
  next();
};

module.exports = validationMiddleware;
