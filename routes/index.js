const express = require("express");
const router = express.Router();
const { register } = require("../controllers/AuthController");
const { check } = require("express-validator");

const validationMiddleware = require("../middleware/ValidationMiddleware");
const paginationMiddleWare = require("../middleware/PaginationMiddleware");

const UserModel = require("../models").User;

const userRoute = require("../routes/userRoute");

router.use(paginationMiddleWare)
router.use("/", userRoute);

router.post(
  "/register",
  check("name").isLength({ min: 1 }).withMessage("Name is required"),
  check("email").custom((value) => {
    return UserModel.findOne({ where: { email: value } }).then((user) => {
      if (user) {
        return Promise.reject("Email already exists");
      }
    });
  }),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  check("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password)
      return Promise.reject("Password confirmation does not match password");
    return true;
  }),
  validationMiddleware,
  register
);

module.exports = router;
