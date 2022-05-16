const express = require("express");
const userRoute = express.Router();

const { getAll } = require("../controllers/UserController");

userRoute.get("/", getAll);

module.exports = userRoute;
