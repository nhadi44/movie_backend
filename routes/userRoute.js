const express = require("express");
const userRoute = express.Router();

const {
  getAll,
  getOne,
  getUserByEmail,
} = require("../controllers/UserController");

userRoute.get("/", getAll);
userRoute.get("/:id", getOne);
userRoute.get("/email/:email", getUserByEmail);

module.exports = userRoute;
