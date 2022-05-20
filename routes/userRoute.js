const express = require("express");
const userRoute = express.Router();
const UserModel = require("../models").User;
const { check } = require("express-validator");
const validation = require("../middleware/ValidationMiddleware");

const {
  getAll,
  getOne,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

userRoute.get("/", getAll);
userRoute.get("/:id", getOne);
userRoute.get("/email/:email", getUserByEmail);
userRoute.put(
  "/:id/update",
  check("name").isLength({ min: 1 }).withMessage("Name is requried"),
  check("email")
    .isEmail()
    .custom((value) => {
      return UserModel.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("Email already exists");
        }
      });
    }),
  validation,
  updateUser
);

userRoute.delete("/:id/delete", deleteUser);

module.exports = userRoute;
